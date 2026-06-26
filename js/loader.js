const SPLASH_SESSION_KEY = 'dune_splash_seen';
const SPLASH_MIN_MS = 2000;
const SPLASH_REDUCE_MS = 450;

function shouldShowSiteLoader() {
  try {
    return !sessionStorage.getItem(SPLASH_SESSION_KEY);
  } catch {
    return true;
  }
}

function markSplashSeen() {
  try {
    sessionStorage.setItem(SPLASH_SESSION_KEY, '1');
  } catch {
    // sessionStorage недоступен
  }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function waitForLogo(logo) {
  if (!logo) return Promise.resolve();
  if (logo.complete) return Promise.resolve();
  return new Promise((resolve) => {
    logo.addEventListener('load', resolve, { once: true });
    logo.addEventListener('error', resolve, { once: true });
  });
}

async function waitForSplashReady(loader) {
  const minMs = prefersReducedMotion() ? SPLASH_REDUCE_MS : SPLASH_MIN_MS;
  const logo = loader.querySelector('.site-loader__logo img');

  await Promise.all([
    new Promise((resolve) => setTimeout(resolve, minMs)),
    document.fonts?.ready ?? Promise.resolve(),
    waitForLogo(logo),
  ]);
}

function hideSiteLoader(loader) {
  if (!loader || loader.classList.contains('site-loader--hide')) return;

  loader.classList.add('site-loader--hide');
  loader.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('site-loader-active');

  const cleanup = () => loader.remove();
  loader.addEventListener('transitionend', cleanup, { once: true });
  setTimeout(cleanup, 900);
}

function initSiteLoader() {
  const loader = document.getElementById('site-loader');
  if (!loader) return;

  if (!shouldShowSiteLoader()) {
    loader.remove();
    return;
  }

  document.body.classList.add('site-loader-active');
  markSplashSeen();

  loader.querySelector('.site-loader__skip')?.addEventListener('click', () => {
    hideSiteLoader(loader);
  });

  waitForSplashReady(loader).then(() => hideSiteLoader(loader));
}
