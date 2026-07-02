function getPropertyGalleryImages(property) {
  return getPropertyImages(property).filter(Boolean);
}

function renderPropertyGalleryBlock(property) {
  const images = getPropertyGalleryImages(property);
  const mainSrc = resolveImageSrc(getPropertyImg(property));
  const fallback = escapeAttr(assetPath(DEFAULT_IMG));
  const safeTitle = escapeHtml(property.title);

  const thumbsHtml = images.length > 1
    ? `<div class="property-gallery-thumbs" id="propertyGalleryThumbs">
        ${images.map((src, index) => {
          const resolved = resolveImageSrc(src);
          return `
            <button
              type="button"
              class="property-gallery-thumb ${index === 0 ? 'active' : ''}"
              data-index="${index}"
              aria-label="Фото ${index + 1}"
            >
              <img src="${escapeAttr(resolved)}" alt="" loading="lazy" onerror="this.src='${fallback}'">
            </button>
          `;
        }).join('')}
      </div>`
    : '';

  return `
    <div class="property-detail-image" id="propertyGallery">
      <img id="propertyMainImage" src="${escapeAttr(mainSrc)}" alt="${safeTitle}" onerror="this.src='${fallback}'">
      ${thumbsHtml}
    </div>
  `;
}

function bindPropertyGallery(root, property) {
  const images = getPropertyGalleryImages(property);
  const gallery = root.querySelector('#propertyGallery');
  const main = root.querySelector('#propertyMainImage');
  const thumbs = root.querySelector('#propertyGalleryThumbs');

  if (!gallery || !main || !thumbs || images.length < 2) return;

  thumbs.addEventListener('click', (event) => {
    const button = event.target.closest('.property-gallery-thumb');
    if (!button || !thumbs.contains(button)) return;

    const index = Number(button.dataset.index);
    const src = images[index];
    if (!src) return;

    main.src = resolveImageSrc(src);
    thumbs.querySelectorAll('.property-gallery-thumb').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
  });
}
