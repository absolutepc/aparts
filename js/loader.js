const SPLASH_MIN_MS = 2400;
const SPLASH_REDUCE_MS = 600;

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

function startLoaderAnimations(loader) {
  loader.classList.remove('site-loader--pending');
  loader.classList.add('site-loader--play');
}

function waitForSplashReady(loader) {
  const minMs = prefersReducedMotion() ? SPLASH_REDUCE_MS : SPLASH_MIN_MS;
  const logo = loader.querySelector('.site-loader__logo img');

  return Promise.all([
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

  document.body.classList.add('site-loader-active');
  loader.classList.add('site-loader--pending');

  loader.querySelector('.site-loader__skip')?.addEventListener('click', () => {
    hideSiteLoader(loader);
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      startLoaderAnimations(loader);
      waitForSplashReady(loader).then(() => hideSiteLoader(loader));
    });
  });
}
