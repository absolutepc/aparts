(function prepareNavigationTransition() {
  try {
    if (sessionStorage.getItem('pageTransitionNav') !== '1') return;

    const style = document.createElement('style');
    style.id = 'page-transition-nav-prep';
    style.textContent = [
      'body.page-transition-active > :not(#page-transition) { visibility: hidden !important; }',
      '#page-transition { display: flex !important; opacity: 1 !important; visibility: visible !important; }',
    ].join('');
    (document.head || document.documentElement).appendChild(style);
  } catch {
    // sessionStorage недоступен
  }
})();
