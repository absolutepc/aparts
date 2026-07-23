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

  const forceHide = () => {
    document.body.classList.remove('page-transition-active');
    overlay.classList.remove('page-transition--visible', 'page-transition--animate', 'page-transition--ready');
    overlay.classList.add('page-transition--hide');
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
  };

  if (isNavEnter) {
    overlay.dataset.transitionMode = 'nav';
    const labelEl = overlay.querySelector('.page-transition__label');
    if (labelEl && navLabel) {
      labelEl.textContent = navLabel;
    }
    forceHide();
    return;
  }

  document.body.classList.add('page-transition-active');
  overlay.classList.add('page-transition--visible');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('page-transition--animate');

  // Если основные скрипты не отработали — не оставляем экран «Загрузка» навсегда
  window.setTimeout(() => {
    if (!document.body.classList.contains('page-transition-active')) return;
    if (overlay.classList.contains('page-transition--hide')) return;
    if (overlay.dataset.transitionMode === 'outgoing') return;
    forceHide();
  }, 5000);
})();
