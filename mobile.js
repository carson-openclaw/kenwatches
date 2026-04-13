// Mobile menu - loaded after nav.html is injected
function toggleMobileMenu() {
  const btn = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('mobileOverlay');
  const drawer = document.getElementById('mobileDrawer');
  if (!btn || !drawer) return;

  const isOpen = drawer.classList.contains('active');
  if (isOpen) {
    closeMobileMenu();
  } else {
    btn.classList.add('active');
    overlay.classList.add('active');
    drawer.style.display = 'block';
    requestAnimationFrame(() => drawer.classList.add('active'));
    document.body.style.overflow = 'hidden';
    // Sync mobile lang
    const desktopLang = document.getElementById('languageSelect');
    const mobileLang = document.getElementById('mobileLanguageSelect');
    if (desktopLang && mobileLang) mobileLang.value = desktopLang.value;
    // Sync auth
    syncMobileAuth();
  }
}

function closeMobileMenu() {
  const btn = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('mobileOverlay');
  const drawer = document.getElementById('mobileDrawer');
  if (!btn) return;
  btn.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  if (drawer) {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { drawer.style.display = 'none'; }, 300);
  }
}

function handleMobileLangChange(lang) {
  const desktopLang = document.getElementById('languageSelect');
  if (desktopLang) {
    desktopLang.value = lang;
    desktopLang.dispatchEvent(new Event('change'));
  }
}

function syncMobileAuth() {
  var authIn = document.getElementById('authButtonsIn');
  var mobileOut = document.getElementById('mobileAuthOut');
  var mobileIn = document.getElementById('mobileAuthIn');
  var mobileName = document.getElementById('mobileUserName');
  if (!mobileOut || !mobileIn) return;

  var isLoggedIn = authIn && authIn.style.display !== 'none';
  if (isLoggedIn) {
    mobileOut.style.display = 'none';
    mobileIn.style.display = 'block';
    var nameEl = document.getElementById('userName');
    if (mobileName && nameEl) mobileName.textContent = nameEl.textContent;
  } else {
    mobileOut.style.display = 'block';
    mobileIn.style.display = 'none';
  }
}

// Close on escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMobileMenu();
});

// Highlight active page in drawer
(function() {
  var currentPage = location.pathname.split('/').pop() || 'index.html';
  var check = setInterval(function() {
    var links = document.querySelectorAll('.mobile-drawer .mobile-nav-links a');
    if (links.length) {
      links.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href && href.indexOf(currentPage) !== -1) {
          link.style.color = '#c49a6c';
        }
      });
      clearInterval(check);
    }
  }, 200);
})();
