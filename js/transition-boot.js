(function bootPageTransition() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  document.body.classList.add('page-transition-active');
  overlay.classList.add('page-transition--visible', 'page-transition--animate');
  overlay.setAttribute('aria-hidden', 'false');

  try {
    const label = sessionStorage.getItem('pageTransitionLabel');
    if (label) {
      const labelEl = overlay.querySelector('.page-transition__label');
      if (labelEl) labelEl.textContent = label;
      sessionStorage.removeItem('pageTransitionLabel');
    }
  } catch {
    // sessionStorage недоступен
  }
})();
