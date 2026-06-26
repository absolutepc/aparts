(function bootPageTransition() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

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

  const prepStyle = document.getElementById('page-transition-nav-prep');
  if (prepStyle) prepStyle.remove();

  if (isNavEnter) {
    overlay.dataset.transitionMode = 'nav';
  }

  document.body.classList.add('page-transition-active');
  overlay.classList.add('page-transition--visible');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('page-transition--animate');
})();
