const PAGE_TRANSITION_KEY = 'pageTransitionLabel';
const PAGE_TRANSITION_MIN_MS = 1800;
const PAGE_TRANSITION_REDUCE_MS = 500;
const PAGE_TRANSITION_NAV_MS = 520;

const PAGE_LABELS_BY_HREF = {
  'index.html': 'Главная',
  'complexes.html': 'ЖК и МФК',
  'commercial.html': 'Коммерческая',
  'property.html': 'Объект',
  'admin.html': 'Админ-панель',
};

const PAGE_LABELS_BY_PAGE = {
  home: 'Главная',
  complexes: 'ЖК и МФК',
  commercial: 'Коммерческая',
  admin: 'Админ-панель',
};

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getStoredTransitionLabel() {
  try {
    const label = sessionStorage.getItem(PAGE_TRANSITION_KEY);
    if (label) sessionStorage.removeItem(PAGE_TRANSITION_KEY);
    return label;
  } catch {
    return null;
  }
}

function storeTransitionLabel(label) {
  try {
    sessionStorage.setItem(PAGE_TRANSITION_KEY, label);
  } catch {
    // sessionStorage недоступен
  }
}

function normalizeHref(href) {
  if (!href) return '';
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return '';
  return url.pathname.split('/').pop() || 'index.html';
}

function getLabelFromHref(href) {
  const file = normalizeHref(href);
  return PAGE_LABELS_BY_HREF[file] || 'Dune Base';
}

function getLabelFromLink(link, href) {
  const customLabel = link?.dataset?.transitionLabel?.trim();
  if (customLabel) return customLabel;
  return getLabelFromHref(href);
}

function isTransitionLink(link) {
  if (!link || link.target === '_blank' || link.hasAttribute('download')) return false;
  if (link.closest('#page-transition')) return false;

  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  return Boolean(normalizeHref(href));
}

function ensurePageTransitionOverlay() {
  let overlay = document.getElementById('page-transition');
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.id = 'page-transition';
  overlay.className = 'page-transition';
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-live', 'polite');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="page-transition__inner">
      <div class="page-transition__logo">
        <img src="img/logo.svg" alt="">
      </div>
      <p class="page-transition__label">Dune Base</p>
      <div class="page-transition__progress" aria-hidden="true">
        <span class="page-transition__progress-bar"></span>
      </div>
    </div>
  `;
  document.body.prepend(overlay);
  return overlay;
}

function setPageTransitionLabel(label) {
  const overlay = ensurePageTransitionOverlay();
  const labelEl = overlay.querySelector('.page-transition__label');
  if (labelEl && label) labelEl.textContent = label;
}

function updatePageTransitionLabel(label) {
  setPageTransitionLabel(label);
}

function waitForTransitionAssets(overlay) {
  const minMs = prefersReducedMotion() ? PAGE_TRANSITION_REDUCE_MS : PAGE_TRANSITION_MIN_MS;
  const logo = overlay.querySelector('.page-transition__logo img');
  const logoReady = !logo || logo.complete
    ? Promise.resolve()
    : new Promise((resolve) => {
      logo.addEventListener('load', resolve, { once: true });
      logo.addEventListener('error', resolve, { once: true });
    });

  const fontsReady = document.fonts?.ready
    ? Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 800)),
    ])
    : Promise.resolve();

  return Promise.all([
    new Promise((resolve) => setTimeout(resolve, minMs)),
    logoReady,
    fontsReady,
  ]);
}

function hidePageTransition(overlay) {
  if (!overlay || overlay.classList.contains('page-transition--hide')) return;

  overlay.classList.add('page-transition--hide');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('page-transition-active');

  const cleanup = () => overlay.remove();
  overlay.addEventListener('transitionend', cleanup, { once: true });
  setTimeout(cleanup, 800);
}

function showPageTransition(label) {
  const overlay = ensurePageTransitionOverlay();
  setPageTransitionLabel(label);
  overlay.classList.remove('page-transition--hide');
  overlay.classList.add('page-transition--visible');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('page-transition-active');

  requestAnimationFrame(() => {
    overlay.classList.add('page-transition--animate');
  });

  return overlay;
}

function navigateWithTransition(href, label) {
  const overlay = showPageTransition(label);
  storeTransitionLabel(label);

  setTimeout(() => {
    window.location.href = href;
  }, prefersReducedMotion() ? 180 : PAGE_TRANSITION_NAV_MS);
}

let pageTransitionLinksBound = false;

function bindPageTransitionLinks(root = document) {
  if (pageTransitionLinksBound) return;
  pageTransitionLinksBound = true;

  root.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href]');
    if (!isTransitionLink(link)) return;

    const href = link.href;
    const label = getLabelFromLink(link, href);
    event.preventDefault();
    navigateWithTransition(href, label);
  });
}

function initPageTransition(defaultLabel) {
  const overlay = ensurePageTransitionOverlay();
  const label = getStoredTransitionLabel() || defaultLabel || 'Dune Base';
  setPageTransitionLabel(label);

  document.body.classList.add('page-transition-active');
  overlay.classList.add('page-transition--visible');
  overlay.setAttribute('aria-hidden', 'false');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add('page-transition--animate');
      waitForTransitionAssets(overlay).then(() => hidePageTransition(overlay));
    });
  });

  bindPageTransitionLinks(document);
}

function getPageTransitionLabel(activePage) {
  if (!activePage) return 'Объект';
  return PAGE_LABELS_BY_PAGE[activePage]
    || NAV_ITEMS?.find((item) => item.page === activePage)?.label
    || 'Dune Base';
}
