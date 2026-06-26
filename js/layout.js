const NAV_ITEMS = [
  { href: 'index.html', label: 'Главная', page: 'home' },
  { href: 'complexes.html', label: 'ЖК и МФК', page: 'complexes' },
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
          <div class="logo-icon">${renderLogo(SITE_NAME)}</div>
          <span>${SITE_NAME}</span>
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
            <div class="logo-icon">${renderLogo(SITE_NAME)}</div>
            <span>${SITE_NAME}</span>
          </a>
          <p>Ваш надёжный каталог недвижимости. ЖК, МФК и коммерческие помещения с удобным управлением через админ-панель.</p>
          <div class="footer-social">
            <a href="#" aria-label="Telegram" title="Telegram"><i class="fab fa-telegram-plane"></i></a>
            <a href="#" aria-label="VK" title="VKontakte"><i class="fab fa-vk"></i></a>
            <a href="#" aria-label="WhatsApp" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            <a href="#" aria-label="Instagram" title="Instagram"><i class="fab fa-instagram"></i></a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Каталог</h4>
          <ul>
            <li><a href="complexes.html">ЖК и МФК</a></li>
            <li><a href="commercial.html">Коммерческая</a></li>
            <li><a href="index.html">Избранное</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Сервис</h4>
          <ul>
            <li><a href="admin.html">Админ-панель</a></li>
            <li><a href="admin.html">Добавить объект</a></li>
            <li><a href="complexes.html">ЖК и МФК</a></li>
            <li><a href="commercial.html">Для бизнеса</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Контакты</h4>
          <ul>
            <li><a href="tel:+74951234567">+7 (495) 123-45-67</a></li>
            <li><a href="mailto:info@dunebase.ru">info@dunebase.ru</a></li>
            <li><a href="#">Москва, ул. Примерная, 1</a></li>
            <li><a href="#">Пн–Сб: 10:00–20:00</a></li>
          </ul>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>&copy; 2026 ${SITE_NAME}. Все права защищены.</p>
        <div class="footer-payments">
          <span>Ипотека</span>
          <span>Аренда</span>
          <span>Продажа</span>
          <span>Коммерция</span>
        </div>
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

  if (typeof initPageTransition === 'function') {
    initPageTransition(getPageTransitionLabel(activePage));
  }
}
