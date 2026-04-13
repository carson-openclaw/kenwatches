// auth.js — Shared authentication module for KenWatches
// Include this AFTER nav.html is loaded into the page

let currentUser = null;
let currentMainTab = 'login';
let currentSubTab = 'email';

function showAuthModal(tab) {
  hideBookmarkSignupPrompt();
  hideAuthModal();
  document.getElementById('authModal').style.display = 'flex';
  if (tab === 'register') {
    switchMainTab('register');
  } else {
    switchMainTab('login');
  }
}

function showLoginModal() { showAuthModal('login'); }
function showRegisterModal() { showAuthModal('register'); }

function hideAuthModal() {
  document.getElementById('authModal').style.display = 'none';
}

function switchMainTab(tab) {
  currentMainTab = tab;
  document.querySelectorAll('.auth-main-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.auth-main-tab:nth-child(${tab === 'login' ? 1 : 2})`).classList.add('active');
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
  // Clear messages
  showMessage(document.getElementById('loginMessage'), '', '');
  showMessage(document.getElementById('registerMessage'), '', '');
}

function switchSubTab(type) {
  currentSubTab = type;
  document.querySelectorAll('.auth-sub-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('subTab' + type.charAt(0).toUpperCase() + type.slice(1)).classList.add('active');
  document.querySelectorAll('.auth-field-email').forEach(el => el.style.display = type === 'email' ? 'block' : 'none');
  document.querySelectorAll('.auth-field-phone').forEach(el => el.style.display = type === 'phone' ? 'block' : 'none');
}

function showMessage(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  el.className = 'auth-message ' + type;
  el.style.display = 'block';
}

async function checkAuth() {
  try {
    const res = await fetch('/api/me');
    if (res.ok) {
      const data = await res.json();
      currentUser = data.user;
      window.currentUser = currentUser;
    } else {
      currentUser = null;
      window.currentUser = null;
    }
  } catch {
    currentUser = null;
    window.currentUser = null;
  }
  updateAuthButtons();
}

function updateAuthButtons() {
  // Auth section when logged out
  const authOut = document.getElementById('authButtonsOut');
  // Auth section when logged in
  const authIn = document.getElementById('authButtonsIn');
  const userName = document.getElementById('userName');
  const navBookmarks = document.getElementById('navBookmarks');

  if (currentUser) {
    if (authOut) authOut.style.display = 'none';
    if (authIn) authIn.style.display = 'flex';
    if (userName) userName.textContent = currentUser.name;
    if (navBookmarks) navBookmarks.style.display = '';
  } else {
    if (authOut) authOut.style.display = 'flex';
    if (authIn) authIn.style.display = 'none';
    if (navBookmarks) navBookmarks.style.display = 'none';
  }
}

async function login(event) {
  if (event) event.preventDefault();
  const messageEl = document.getElementById('loginMessage');
  
  let loginValue;
  if (currentSubTab === 'email') {
    loginValue = document.getElementById('loginEmail').value.trim();
  } else {
    loginValue = document.getElementById('loginPhone').value.trim();
  }
  const password = document.getElementById('loginPassword').value;
  
  if (!loginValue || !password) {
    showMessage(messageEl, 'Please fill in all fields', 'error');
    return;
  }
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: loginValue, password })
    });
    const data = await response.json();
    if (response.ok) {
      showMessage(messageEl, 'Login successful!', 'success');
      setTimeout(() => {
        hideAuthModal();
        window.location.reload();
      }, 800);
    } else {
      showMessage(messageEl, data.error || 'Login failed', 'error');
    }
  } catch (err) {
    showMessage(messageEl, 'Network error', 'error');
  }
}

async function register(event) {
  if (event) event.preventDefault();
  const name = document.getElementById('registerName').value.trim();
  const email = currentSubTab === 'email' ? document.getElementById('registerEmail').value.trim() : '';
  const phone = currentSubTab === 'phone' ? document.getElementById('registerPhone').value.trim() : '';
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  const messageEl = document.getElementById('registerMessage');

  if (!name) {
    showMessage(messageEl, 'Name is required', 'error');
    return;
  }
  if (!email && !phone) {
    showMessage(messageEl, 'Email or phone is required', 'error');
    return;
  }
  if (password.length < 6) {
    showMessage(messageEl, 'Password must be at least 6 characters', 'error');
    return;
  }
  if (password !== confirmPassword) {
    showMessage(messageEl, 'Passwords do not match', 'error');
    return;
  }

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, password })
    });
    const data = await response.json();
    if (response.ok) {
      showMessage(messageEl, 'Account created!', 'success');
      setTimeout(() => {
        hideAuthModal();
        window.location.reload();
      }, 800);
    } else {
      showMessage(messageEl, data.error || 'Registration failed', 'error');
    }
  } catch (err) {
    showMessage(messageEl, 'Network error', 'error');
  }
}

async function logout() {
  try {
    await fetch('/api/logout', { method: 'POST' });
    currentUser = null;
    window.currentUser = null;
    window.location.reload();
  } catch (err) {
    console.error('Logout error:', err);
  }
}

function handleNavBookmarks(event) {
  event.preventDefault();
  if (currentUser) {
    window.location.href = 'bookmarks.html';
  } else {
    showBookmarkSignupPrompt();
  }
}

function showBookmarkSignupPrompt() {
  let overlay = document.getElementById('bookmarkSignupOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'bookmarkSignupOverlay';
    overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:3000;align-items:center;justify-content:center;';
    overlay.innerHTML = `
      <div style="background:#1a1a1a;border-radius:16px;padding:2.5rem;max-width:400px;width:90%;text-align:center;border:1px solid #333;">
        <i class="fas fa-heart" style="font-size:2.5rem;color:#ff4757;margin-bottom:1rem;display:block;"></i>
        <h2 style="font-size:1.5rem;margin-bottom:0.8rem;color:#f0f0f0;">Login Required</h2>
        <p style="color:#999;margin-bottom:1.5rem;line-height:1.5;">You need to be logged in to save watches to your bookmarks.</p>
        <button onclick="showAuthModal('login');hideBookmarkSignupPrompt();" style="display:block;width:100%;padding:1rem;background:#c49a6c;color:#000;border:none;border-radius:50px;font-size:1.1rem;font-weight:600;cursor:pointer;margin-bottom:0.8rem;">Login</button>
        <button onclick="showAuthModal('register');hideBookmarkSignupPrompt();" style="display:block;width:100%;padding:1rem;background:transparent;color:#c49a6c;border:2px solid #c49a6c;border-radius:50px;font-size:1.1rem;font-weight:600;cursor:pointer;margin-bottom:0.8rem;">Create Account</button>
        <button onclick="hideBookmarkSignupPrompt()" style="background:none;border:none;color:#888;cursor:pointer;font-size:0.95rem;padding:0.5rem;">Cancel</button>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
}

function hideBookmarkSignupPrompt() {
  const overlay = document.getElementById('bookmarkSignupOverlay');
  if (overlay) overlay.style.display = 'none';
}

// Initialize: check auth, attach form handlers, move modal to body
function initAuth() {
  // Move modal from nav to body so it's not constrained by nav CSS
  const modal = document.getElementById('authModal');
  if (modal && modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }

  checkAuth();
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  if (loginForm) loginForm.addEventListener('submit', login);
  if (registerForm) registerForm.addEventListener('submit', register);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideAuthModal();
    hideBookmarkSignupPrompt();
  }
});
