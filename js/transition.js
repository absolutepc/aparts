const PAGE_TRANSITION_KEY = 'pageTransitionLabel';
const PAGE_TRANSITION_MIN_MS = 2600;
const PAGE_TRANSITION_REDUCE_MS = 650;

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

let pageTransitionLinksBound = false;
let pageTransitionFinishing = false;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

function getPageTransitionOverlay() {
  return document.getElementById('page-transition');
}

function setPageTransitionLabel(label) {
  const overlay = getPageTransitionOverlay();
  const labelEl = overlay?.querySelector('.page-transition__label');
  if (labelEl && label) labelEl.textContent = label;
}

function updatePageTransitionLabel(label) {
  setPageTransitionLabel(label);
}

function restartTransitionAnimations(overlay) {
  if (!overlay) return;

  overlay.classList.remove('page-transition--animate');
  const progressBar = overlay.querySelector('.page-transition__progress-bar');
  if (progressBar) {
    progressBar.style.width = '0';
    progressBar.style.animation = 'none';
  }

  void overlay.offsetWidth;

  if (progressBar) {
    progressBar.style.width = '';
    progressBar.style.animation = '';
  }

  overlay.classList.add('page-transition--animate');
}

function waitForTransitionAssets(overlay) {
  const minMs = prefersReducedMotion() ? PAGE_TRANSITION_REDUCE_MS : PAGE_TRANSITION_MIN_MS;
  const logo = overlay?.querySelector('.page-transition__logo img');
  const logoReady = !logo || logo.complete
    ? Promise.resolve()
    : new Promise((resolve) => {
      logo.addEventListener('load', resolve, { once: true });
      logo.addEventListener('error', resolve, { once: true });
    });

  const animationDone = new Promise((resolve) => {
    const bar = overlay?.querySelector('.page-transition__progress-bar');
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      resolve();
    };

    setTimeout(finish, minMs);
    if (bar && !prefersReducedMotion()) {
      bar.addEventListener('animationend', finish, { once: true });
    }
  });

  return Promise.all([logoReady, animationDone]);
}

function showPageTransition(label) {
  let overlay = getPageTransitionOverlay();
  if (!overlay) return null;

  setPageTransitionLabel(label);
  overlay.classList.remove('page-transition--hide');
  overlay.classList.add('page-transition--visible');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('page-transition-active');
  restartTransitionAnimations(overlay);

  return overlay;
}

function hidePageTransition(overlay) {
  if (!overlay || overlay.classList.contains('page-transition--hide')) return;

  overlay.classList.remove('page-transition--visible', 'page-transition--animate');
  overlay.classList.add('page-transition--hide');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('page-transition-active');
}

async function navigateWithTransition(href, label) {
  const overlay = showPageTransition(label);
  if (!overlay) {
    window.location.href = href;
    return;
  }

  storeTransitionLabel(label);
  await waitForTransitionAssets(overlay);
  window.location.href = href;
}

function bindPageTransitionLinks(root = document) {
  if (pageTransitionLinksBound) return;
  pageTransitionLinksBound = true;

  root.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href]');
    if (!isTransitionLink(link)) return;

    event.preventDefault();
    navigateWithTransition(link.href, getLabelFromLink(link, link.href));
  });
}

async function finishPageTransition(defaultLabel) {
  if (pageTransitionFinishing) return;
  pageTransitionFinishing = true;

  const overlay = getPageTransitionOverlay();
  if (!overlay) {
    bindPageTransitionLinks(document);
    return;
  }

  const labelEl = overlay.querySelector('.page-transition__label');
  if (labelEl && defaultLabel && !labelEl.textContent.trim()) {
    setPageTransitionLabel(defaultLabel);
  }

  if (!overlay.classList.contains('page-transition--visible')) {
    showPageTransition(labelEl?.textContent.trim() || defaultLabel || 'Dune Base');
  }

  await waitForTransitionAssets(overlay);
  hidePageTransition(overlay);
  bindPageTransitionLinks(document);
}

function initPageTransition(defaultLabel) {
  finishPageTransition(defaultLabel);
}

function getPageTransitionLabel(activePage) {
  if (!activePage) return 'Объект';
  return PAGE_LABELS_BY_PAGE[activePage]
    || NAV_ITEMS?.find((item) => item.page === activePage)?.label
    || 'Dune Base';
}
