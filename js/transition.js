const PAGE_TRANSITION_KEY = 'pageTransitionLabel';
const PAGE_TRANSITION_NAV_KEY = 'pageTransitionNav';
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
let pageTransitionNavigating = false;
let pageTransitionOutgoing = false;
let pageTransitionIntroPromise = null;
let pageTransitionCleanupTimer = null;
let pageTransitionHideCleanup = null;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getTransitionDurationMs() {
  return prefersReducedMotion() ? PAGE_TRANSITION_REDUCE_MS : PAGE_TRANSITION_MIN_MS;
}

function storeNavigationTransition(label) {
  try {
    sessionStorage.setItem(PAGE_TRANSITION_KEY, label);
    sessionStorage.setItem(PAGE_TRANSITION_NAV_KEY, '1');
  } catch {
    // sessionStorage недоступен
  }
}

function normalizeHref(href) {
  if (!href) return '';
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return '';
  const file = url.pathname.split('/').pop() || '';
  if (!file || file === '/') return 'index.html';
  return file;
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

function cancelPageTransitionCleanup() {
  if (pageTransitionCleanupTimer) {
    clearTimeout(pageTransitionCleanupTimer);
    pageTransitionCleanupTimer = null;
  }

  if (pageTransitionHideCleanup) {
    const overlay = getPageTransitionOverlay();
    if (overlay) {
      overlay.removeEventListener('transitionend', pageTransitionHideCleanup);
    }
    pageTransitionHideCleanup = null;
  }
}

function setPageTransitionLabel(label) {
  const overlay = getPageTransitionOverlay();
  const labelEl = overlay?.querySelector('.page-transition__label');
  if (labelEl && label) labelEl.textContent = label;
}

function updatePageTransitionLabel(label) {
  setPageTransitionLabel(label);
}

function restartProgressBar(overlay) {
  const progress = overlay?.querySelector('.page-transition__progress');
  if (!progress) return;
  progress.replaceWith(progress.cloneNode(true));
}

function resetTransitionVisuals(overlay) {
  if (!overlay) return;

  overlay.classList.remove('page-transition--animate', 'page-transition--ready');
  overlay.querySelectorAll('.page-transition__logo, .page-transition__label, .page-transition__progress').forEach((el) => {
    el.style.opacity = '';
    el.style.transform = '';
    el.style.filter = '';
    el.style.animation = '';
  });

  restartProgressBar(overlay);
}

function startTransitionAnimations(overlay) {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      overlay.classList.add('page-transition--animate');
      void overlay.offsetWidth;
      requestAnimationFrame(() => resolve(performance.now()));
    });
  });
}

function waitForTransitionDuration(startedAt) {
  const minMs = getTransitionDurationMs();
  const elapsed = performance.now() - startedAt;
  const remaining = minMs - elapsed;
  if (remaining <= 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, remaining));
}

function waitForInitialTransition(overlay) {
  const minMs = getTransitionDurationMs();
  const logo = overlay?.querySelector('.page-transition__logo img');
  const logoReady = !logo || logo.complete
    ? Promise.resolve()
    : new Promise((resolve) => {
      logo.addEventListener('load', resolve, { once: true });
      logo.addEventListener('error', resolve, { once: true });
    });

  const animationDone = new Promise((resolve) => {
    setTimeout(resolve, minMs);
  });

  return Promise.all([logoReady, animationDone]);
}

async function waitForIntroFinished() {
  if (pageTransitionIntroPromise) {
    await pageTransitionIntroPromise;
  }
}

function showPageTransition(label, { animate = true } = {}) {
  const overlay = getPageTransitionOverlay();
  if (!overlay) return null;

  cancelPageTransitionCleanup();

  overlay.style.transition = 'none';
  overlay.style.opacity = '';
  overlay.style.visibility = '';
  setPageTransitionLabel(label);
  overlay.classList.remove('page-transition--hide');
  overlay.classList.add('page-transition--visible');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('page-transition-active');

  resetTransitionVisuals(overlay);
  void overlay.offsetWidth;
  overlay.style.transition = '';

  if (animate) {
    return overlay;
  }

  overlay.classList.add('page-transition--ready');
  return overlay;
}

function hidePageTransition(overlay) {
  if (!overlay || overlay.classList.contains('page-transition--hide')) return;

  cancelPageTransitionCleanup();

  overlay.classList.remove('page-transition--visible', 'page-transition--animate', 'page-transition--ready');
  overlay.classList.add('page-transition--hide');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.dataset.transitionMode = '';
  document.body.classList.remove('page-transition-active');

  const cleanup = () => {
    pageTransitionCleanupTimer = null;
    pageTransitionHideCleanup = null;
  };

  pageTransitionHideCleanup = cleanup;
  overlay.addEventListener('transitionend', cleanup, { once: true });
  pageTransitionCleanupTimer = setTimeout(cleanup, 700);
}

async function navigateWithTransition(href, label) {
  if (pageTransitionOutgoing) return;

  await waitForIntroFinished();

  pageTransitionOutgoing = true;
  pageTransitionNavigating = true;
  storeNavigationTransition(label);

  const overlay = showPageTransition(label, { animate: true });
  if (!overlay) {
    window.location.href = href;
    return;
  }

  overlay.dataset.transitionMode = 'outgoing';

  const startedAt = await startTransitionAnimations(overlay);
  await waitForTransitionDuration(startedAt);
  window.location.href = href;
}

async function playPageTransition(label) {
  await waitForIntroFinished();
  pageTransitionNavigating = true;

  const overlay = showPageTransition(label, { animate: true });
  if (!overlay) {
    pageTransitionNavigating = false;
    return;
  }

  const startedAt = await startTransitionAnimations(overlay);
  await waitForTransitionDuration(startedAt);
  hidePageTransition(overlay);
  pageTransitionNavigating = false;
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
    event.stopPropagation();
    navigateWithTransition(link.href, getLabelFromLink(link, link.href));
  }, true);
}

async function finishPageTransition(defaultLabel) {
  if (pageTransitionFinishing) return;
  pageTransitionFinishing = true;

  const overlay = getPageTransitionOverlay();
  if (!overlay) {
    document.body.classList.remove('page-transition-active');
    pageTransitionIntroPromise = Promise.resolve();
    return;
  }

  pageTransitionIntroPromise = (async () => {
    try {
      const isNavEnter = overlay.dataset.transitionMode === 'nav';
      const labelEl = overlay.querySelector('.page-transition__label');
      const currentLabel = labelEl?.textContent.trim() || defaultLabel || 'Dune Base';

      if (pageTransitionNavigating || overlay.dataset.transitionMode === 'outgoing') {
        return;
      }

      if (!overlay.classList.contains('page-transition--visible')) {
        showPageTransition(currentLabel, { animate: true });
        await startTransitionAnimations(overlay);
      } else if (!overlay.classList.contains('page-transition--animate')
        && !overlay.classList.contains('page-transition--ready')) {
        await startTransitionAnimations(overlay);
      }

      await waitForInitialTransition(overlay);

      if (pageTransitionNavigating || overlay.dataset.transitionMode === 'outgoing') {
        return;
      }

      hidePageTransition(overlay);
    } catch (error) {
      console.warn(`${typeof SITE_NAME !== 'undefined' ? SITE_NAME : 'Dune Base'}: ошибка анимации перехода`, error);
      if (!pageTransitionNavigating) hidePageTransition(overlay);
    }
  })();

  await pageTransitionIntroPromise;
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

bindPageTransitionLinks(document);
