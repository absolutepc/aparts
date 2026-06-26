(function bootPageTransition() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  document.body.classList.add('page-transition-active');
  overlay.classList.add('page-transition--visible');
  overlay.setAttribute('aria-hidden', 'false');

  let isNavEnter = false;
  let navLabel = '';

  try {
    isNavEnter = sessionStorage.getItem('pageTransitionNav') === '1';
    navLabel = sessionStorage.getItem('pageTransitionLabel') || '';
    if (isNavEnter) {
      sessionStorage.removeItem('pageTransitionNav');
      sessionStorage.removeItem('pageTransitionLabel');
    }
  } catch {
    // sessionStorage недоступен
  }

  const labelEl = overlay.querySelector('.page-transition__label');
  if (labelEl && navLabel) {
    labelEl.textContent = navLabel;
  }

  if (isNavEnter) {
    overlay.dataset.transitionMode = 'nav';
  }

  overlay.classList.add('page-transition--animate');
})();
