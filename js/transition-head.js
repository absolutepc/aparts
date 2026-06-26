(function prepareNavigationTransition() {
  try {
    if (sessionStorage.getItem('pageTransitionNav') !== '1') return;

    const style = document.createElement('style');
    style.id = 'page-transition-nav-prep';
    style.textContent = [
      'body.page-transition-active { overflow: auto !important; }',
      'body.page-transition-active > :not(#page-transition) { visibility: visible !important; }',
      '#page-transition { display: none !important; opacity: 0 !important; visibility: hidden !important; }',
    ].join('');
    (document.head || document.documentElement).appendChild(style);
  } catch {
    // sessionStorage недоступен
  }
})();
