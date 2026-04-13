// i18n.js - Shared translation system for all pages
var currentLang = localStorage.getItem('lang') ||
  (navigator.language.startsWith('zh') ?
    (navigator.language.includes('TW') || navigator.language.includes('HK') ? 'zh-TW' : 'zh-CN') :
    'en');
var translations = {};

async function loadTranslation(lang) {
  if (translations[lang]) return;
  try {
    var response = await fetch('translations/' + lang + '.json');
    if (!response.ok) throw new Error('Failed to load ' + lang + '.json');
    translations[lang] = await response.json();
  } catch (err) {
    console.error('Translation load error for ' + lang + ':', err);
  }
}

function applyTranslations(lang) {
  if (!translations[lang]) {
    lang = 'en';
  }
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = (lang === 'zh-TW' || lang === 'zh-CN') ? 'zh' : lang;

  var titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) {
    var titleKey = titleEl.getAttribute('data-i18n');
    document.title = translations[lang]?.[titleKey] || translations.en?.[titleKey] || document.title;
  }

  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    el.textContent = translations[lang]?.[key] || translations.en?.[key] || el.textContent;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = translations[lang]?.[key] || translations.en?.[key] || el.placeholder;
  });

  // Sync desktop lang selector
  var select = document.getElementById('languageSelect');
  if (select) select.value = lang;
  // Sync mobile lang selector
  var mobileSelect = document.getElementById('mobileLanguageSelect');
  if (mobileSelect) mobileSelect.value = lang;
}

// Initialize translations after DOM + nav load
function initI18n() {
  var langSelect = document.getElementById('languageSelect');
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener('change', function(e) {
      applyTranslations(e.target.value);
    });
  }

  Promise.all([
    loadTranslation('en'),
    loadTranslation('zh-TW'),
    loadTranslation('zh-CN')
  ]).then(function() {
    applyTranslations(currentLang);
  }).catch(function() {
    applyTranslations('en');
  });
}
