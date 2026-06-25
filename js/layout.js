const NAV_ITEMS = [
  { href: 'index.html', label: 'Главная', page: 'home' },
  { href: 'apartments.html', label: 'Квартиры и студии', page: 'apartments' },
  { href: 'commercial.html', label: 'Коммерческая', page: 'commercial' },
];

function renderHeader(activePage) {
  const navLinks = NAV_ITEMS.map(item =>
    `<a href="${item.href}" class="${item.page === activePage ? 'active' : ''}">${item.label}</a>`
  ).join('');

  return `
    <header class="site-header">
      <div class="container header-inner">
        <a href="index.html" class="logo">
          <div class="logo-icon">${renderPropertyImg('img/default.svg', 'Aparts')}</div>
          <span>Aparts</span>
        </a>
        <nav class="main-nav" id="mainNav">${navLinks}</nav>
        <div class="header-actions">
          <a href="admin.html" class="btn btn-secondary btn-sm">Админ</a>
        </div>
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Меню">☰</button>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <div class="logo-icon">${renderPropertyImg('img/default.svg', 'Aparts')}</div>
            <span>Aparts</span>
          </a>
          <p>Личный каталог квартир, студий и коммерческих помещений.</p>
        </div>
        <div class="footer-col">
          <h4>Разделы</h4>
          <ul>
            <li><a href="apartments.html">Квартиры и студии</a></li>
            <li><a href="commercial.html">Коммерческая</a></li>
            <li><a href="admin.html">Админ-панель</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; 2026 Aparts. Все права защищены.</p>
      </div>
    </footer>
  `;
}

function initLayout(activePage) {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = renderHeader(activePage);
  if (footerEl) footerEl.innerHTML = renderFooter();

  const menuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mainNav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  }
}
