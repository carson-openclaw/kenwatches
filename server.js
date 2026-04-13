const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Data files
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const BOOKMARKS_FILE = path.join(__dirname, 'data', 'bookmarks.json');

// Ensure data directory exists
(async () => {
  try {
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    // Initialize files if they don't exist
    try { await fs.access(USERS_FILE); } catch { await fs.writeFile(USERS_FILE, '[]'); }
    try { await fs.access(BOOKMARKS_FILE); } catch { await fs.writeFile(BOOKMARKS_FILE, '[]'); }
  } catch (err) {
    console.error('Failed to initialize data files:', err);
  }
})();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(session({
  secret: 'kenwatches-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

// Helper: read users
async function readUsers() {
  const data = await fs.readFile(USERS_FILE, 'utf8');
  return JSON.parse(data);
}

// Helper: write users
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Helper: read bookmarks
async function readBookmarks() {
  const data = await fs.readFile(BOOKMARKS_FILE, 'utf8');
  return JSON.parse(data);
}

// Helper: write bookmarks
async function writeBookmarks(bookmarks) {
  await fs.writeFile(BOOKMARKS_FILE, JSON.stringify(bookmarks, null, 2));
}

// Helper: get current user from session
function getCurrentUser(req) {
  return req.session.userId ? { id: req.session.userId, name: req.session.userName, email: req.session.userEmail, phone: req.session.userPhone } : null;
}

// API Routes

// Register
app.post('/api/register', async (req, res) => {
  const { email, phone, password, name } = req.body;
  // At least one of email or phone required
  if (!phone && !email) {
    return res.status(400).json({ error: 'Phone or email required' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  if (!name) {
    return res.status(400).json({ error: 'Name required' });
  }
  try {
    const users = await readUsers();
    // Check for duplicate email or phone
    if (email && users.some(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    if (phone && users.some(u => u.phone === phone)) {
      return res.status(400).json({ error: 'Phone already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      email: email || null,
      phone: phone || null,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    await writeUsers(users);
    // Auto-login
    req.session.userId = newUser.id;
    req.session.userName = newUser.name;
    req.session.userEmail = newUser.email;
    req.session.userPhone = newUser.phone;
    res.status(201).json({ message: 'Registration successful', user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ error: 'Login and password required' });
  }
  try {
    const users = await readUsers();
    const user = users.find(u => u.email === login || u.phone === login);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.userPhone = user.phone;
    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});

// Get current user
app.get('/api/me', (req, res) => {
  const user = getCurrentUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ user });
});

// Get user's bookmarks
app.get('/api/bookmarks', async (req, res) => {
  const user = getCurrentUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const bookmarks = await readBookmarks();
    const userBookmarks = bookmarks.filter(b => b.userId === user.id);
    res.json({ bookmarks: userBookmarks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Toggle bookmark
app.post('/api/bookmarks', async (req, res) => {
  const user = getCurrentUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const { watchId } = req.body;
  if (!watchId) {
    return res.status(400).json({ error: 'watchId required' });
  }
  try {
    const bookmarks = await readBookmarks();
    const existingIndex = bookmarks.findIndex(b => b.userId === user.id && b.watchId === watchId);
    if (existingIndex >= 0) {
      // Remove
      bookmarks.splice(existingIndex, 1);
      await writeBookmarks(bookmarks);
      res.json({ bookmarked: false, message: 'Bookmark removed' });
    } else {
      // Add
      const newBookmark = {
        userId: user.id,
        watchId,
        addedAt: new Date().toISOString()
      };
      bookmarks.push(newBookmark);
      await writeBookmarks(bookmarks);
      res.json({ bookmarked: true, message: 'Bookmark added' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve HTML files (fallback for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});