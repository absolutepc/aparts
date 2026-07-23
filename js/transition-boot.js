(function bootPageTransition() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) {
    document.body.classList.remove('page-transition-active');
    return;
  }

  // Контент всегда видим при загрузке. Оверлей только при клике-навигации.
  const forceShowContent = () => {
    document.body.classList.remove('page-transition-active');
    overlay.classList.remove('page-transition--visible', 'page-transition--animate', 'page-transition--ready');
    overlay.classList.add('page-transition--hide');
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.dataset.transitionMode = '';
  };

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

  if (isNavEnter) {
    const labelEl = overlay.querySelector('.page-transition__label');
    if (labelEl && navLabel) labelEl.textContent = navLabel;
  }

  forceShowContent();
})();
