/* ===================================================
   app.js - Navigation, Theme, hljs, Mobile
   Requires per-page:
     window.BASE         = '../'   (or './'  for index)
     window.PAGES        = './'    (or './pages/' for index)
     window.CURRENT_PAGE = 'sql-block1' | 'home' | etc.
=================================================== */

(function () {

  /* ================================================
     THEME
  ================================================ */
  var THEME_KEY = 'lp-theme';
  var HLJS_DARK = 'https://cdn.jsdelivr.net/npm/@catppuccin/highlightjs@0.0.6/css/catppuccin-mocha.css';
  var HLJS_LIGHT = 'https://cdn.jsdelivr.net/npm/@catppuccin/highlightjs@0.0.6/css/catppuccin-latte.css';

  function isDarkActive() {
    var html = document.documentElement;
    if (html.classList.contains('dark')) return true;
    if (html.classList.contains('light')) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    var html = document.documentElement;
    html.classList.remove('dark', 'light');
    if (theme === 'dark') html.classList.add('dark');
    if (theme === 'light') html.classList.add('light');

    var dark = isDarkActive();

    /* Swap hljs stylesheet */
    var link = document.getElementById('hljs-theme-css');
    if (link) link.href = dark ? HLJS_DARK : HLJS_LIGHT;

    /* Update toggle pill & icon */
    var icon = document.getElementById('theme-icon');
    if (icon) icon.className = 'ti ' + (dark ? 'ti-moon' : 'ti-sun');
  }

  window.toggleTheme = function () {
    var next = isDarkActive() ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  };

  /* Apply immediately to reduce flicker */
  applyTheme(localStorage.getItem(THEME_KEY) || 'system');


  /* ================================================
     prism.JS  (injected dynamically)
  ================================================ */
  function loadPrism() {
    // 1 — Catppuccin CSS (Mocha dark / Latte light)
    if (!document.getElementById('prism-theme-css')) {
      var link = document.createElement('link');
      link.id = 'prism-theme-css';
      link.rel = 'stylesheet';
      link.href = isDarkActive()
        ? 'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-one-dark.css'
        : 'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-one-light.css';
      document.head.appendChild(link);
    }

    // 2 — Prism core + SQL-Sprache
    if (!window.Prism) {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-core.min.js';
      script.onload = function () {
        var sql = document.createElement('script');
        sql.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-sql.min.js';
        sql.onload = function () { Prism.highlightAll(); };
        document.head.appendChild(sql);
      };
      document.head.appendChild(script);
    } else {
      Prism.highlightAll();
    }
  }


  /* ================================================
     PROGRESS TRACKING
  ================================================ */
  var QUIZ_PAGES = ['sql-block1', 'sql-block2', 'sql-block3', 'sql-block4', 'sql-block5'];

  window.markComplete = function (pageId) {
    var done = JSON.parse(localStorage.getItem('lp-progress') || '{}');
    done[pageId] = true;
    localStorage.setItem('lp-progress', JSON.stringify(done));
    updateProgressBar();
    refreshBadges();
  };

  function updateProgressBar() {
    var done = JSON.parse(localStorage.getItem('lp-progress') || '{}');
    var count = QUIZ_PAGES.filter(function (p) { return done[p]; }).length;
    var pct = Math.round((count / QUIZ_PAGES.length) * 100);
    var bar = document.getElementById('prog-bar');
    var label = document.getElementById('prog-pct');
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = pct + '%';
  }

  function refreshBadges() {
    var done = JSON.parse(localStorage.getItem('lp-progress') || '{}');
    QUIZ_PAGES.forEach(function (id) {
      /* Status badge on index page */
      var badge = document.getElementById('status-' + id);
      if (badge && done[id]) {
        badge.className = 'badge badge-done';
        badge.textContent = 'Abgeschlossen';
      }
      /* sql-block-link on index page */
      var blockLink = document.querySelector('[data-block="' + id + '"]');
      if (blockLink && done[id]) blockLink.classList.add('done');
    });
  }


  /* ================================================
     SIDEBAR BUILDER
  ================================================ */
  var sqlGroupOpen = false;

  window.toggleSqlNav = function () {
    sqlGroupOpen = !sqlGroupOpen;
    var subnav = document.getElementById('sql-subnav');
    var header = document.getElementById('sql-nav-header');
    if (subnav) subnav.style.display = sqlGroupOpen ? 'block' : 'none';
    if (header) header.classList.toggle('open', sqlGroupOpen);
  };

  function buildSidebar() {
  var nav = document.getElementById('app-nav');
  if (!nav) return;

  var cur      = window.CURRENT_PAGE || '';
  var B        = window.BASE  || '../';
  var P        = window.PAGES || './';
  var dark     = isDarkActive();
  sqlGroupOpen = cur.indexOf('sql-block') === 0;

  var mainItems = [
    { id: 'home',  label: 'Übersicht',           icon: 'ti-home',          href: B + 'index.html' },
    { id: 'm117',  label: 'M117 - Netzwerk',      icon: 'ti-network',       href: P + 'm117.html'  },
    { id: 'm122',  label: 'M122 - Scriptsprache', icon: 'ti-code',          href: P + 'm122.html'  },
    { id: 'm319',  label: 'M319 - Applikationen', icon: 'ti-device-desktop',href: P + 'm319.html'  },
    { id: 'm187',  label: 'M187 - ICT-Benutzerendgeräte',      icon: 'ti-server',        href: P + 'm187.html'  },
    { id: 'm162',  label: 'M162 - DB Design',     icon: 'ti-database-plus', href: P + 'm162.html'  }
  ];

    var sqlItems = [
      { id: 'sql-block1', label: 'DDL',                         icon: 'ti-search', href: P + 'sql-block1.html' },
      { id: 'sql-block2', label: 'DML',                         icon: 'ti-chart-bar', href: P + 'sql-block2.html' },
      { id: 'sql-block3', label: 'SELECT &amp; WHERE',          icon: 'ti-git-merge', href: P + 'sql-block3.html' },
      { id: 'sql-block4', label: 'Sortieren &amp; Aggregieren', icon: 'ti-edit', href: P + 'sql-block4.html' },
      { id: 'sql-block5', label: 'JOINs',                       icon: 'ti-hammer', href: P + 'sql-block5.html' }
    ];

  var html = '';

  // Logo + Theme Button
  html += '<div class="sidebar-logo">';
  html += '<div class="sidebar-logo-inner">';
  html += '<div><p>IT Grundlagen</p><span>Lernplattform</span></div>';
  html += '<button class="theme-btn" onclick="toggleTheme()" title="Erscheinungsbild wechseln">';
  html += '<i class="ti ' + (dark ? 'ti-moon' : 'ti-sun') + '" id="theme-icon"></i>';
  html += '</button>';
  html += '</div>';
  html += '</div>';

  // Main nav
  html += '<div class="nav-label">Navigation</div>';
  mainItems.forEach(function (item) {
    var active = item.id === cur ? ' active' : '';
    html += '<a class="nav-item' + active + '" href="' + item.href + '">';
    html += '<i class="ti ' + item.icon + '"></i> ' + item.label;
    html += '</a>';
  });

  // SQL collapsible group
  html += '<button class="nav-sql-header' + (sqlGroupOpen ? ' open' : '') + '" ';
  html += 'id="sql-nav-header" onclick="toggleSqlNav()" aria-expanded="' + sqlGroupOpen + '">';
  html += '<div class="nav-sql-inner"><i class="ti ti-database"></i><span>M164 - SQL</span></div>';
  html += '<i class="ti ti-chevron-down nav-sql-chevron"></i>';
  html += '</button>';

  html += '<div id="sql-subnav" style="display:' + (sqlGroupOpen ? 'block' : 'none') + '">';
  sqlItems.forEach(function (item) {
    var active = item.id === cur ? ' active' : '';
    html += '<a class="nav-item nav-sub' + active + '" href="' + item.href + '">';
    html += '<i class="ti ' + item.icon + '"></i> ' + item.label;
    html += '</a>';
  });
  html += '</div>';

  // Progress bar
  html += '<div class="progress-section">';
  html += '<div class="progress-label"><span>Fortschritt SQL</span><span id="prog-pct">0%</span></div>';
  html += '<div class="progress-bar"><div class="progress-fill" id="prog-bar"></div></div>';
  html += '</div>';

  nav.innerHTML = html;
  updateProgressBar();
  refreshBadges();
}


  /* ================================================
     MOBILE
  ================================================ */
var lastScroll = 0;

function setupMobile() {
  var burger = document.createElement('button');
  burger.className = 'hamburger';
  burger.setAttribute('aria-label', 'Navigation öffnen');
  burger.innerHTML = '<i class="ti ti-menu-2"></i>';
  burger.addEventListener('click', toggleMobileNav);
  document.body.appendChild(burger);

  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.addEventListener('click', toggleMobileNav);
  document.body.appendChild(overlay);

  lastScroll = window.scrollY;

  window.addEventListener('scroll', function () {
    var sidebar = document.querySelector('.sidebar');
    if (sidebar && sidebar.classList.contains('mobile-open')) return;

    var current = window.scrollY;
    if (current <= 10) {
      burger.classList.remove('hidden');
    } else if (current > lastScroll) {
      burger.classList.add('hidden');
    } else {
      burger.classList.remove('hidden');
    }
    lastScroll = current;
  }, { passive: true });
}

window.toggleMobileNav = function () {
  var sidebar = document.querySelector('.sidebar');
  var overlay = document.querySelector('.sidebar-overlay');
  var burger  = document.querySelector('.hamburger');
  if (sidebar) sidebar.classList.toggle('mobile-open');
  if (overlay) overlay.classList.toggle('visible');

  var isOpen = sidebar && sidebar.classList.contains('mobile-open');
  if (burger) {
    burger.innerHTML = isOpen
      ? '<i class="ti ti-x"></i>'
      : '<i class="ti ti-menu-2"></i>';
    burger.setAttribute('aria-label', isOpen ? 'Navigation schliessen' : 'Navigation öffnen');
  }

  if (!isOpen) {
    lastScroll = window.scrollY;
  }
};


  /* ================================================
     FOOTER DISCLAIMER
  ================================================ */
  function addFooter() {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.textContent =
      'Für die Subdomains von bbzwinf.ch sind die Lernenden des BBZW Sursee verantwortlich. '
      + 'Es handelt sich hierbei um Testversionen. Weder die Lernenden noch andere Personen '
      + 'oder Organisationen übernehmen irgendeine Haftung für die Webseite, Verlinkungen, '
      + 'Inhalte oder Downloads.';
    document.body.appendChild(footer);
  }


  /* ================================================
     INIT
  ================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    buildSidebar();
    setupMobile();
    loadPrism();
    addFooter();
  });

})();
