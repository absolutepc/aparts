function initHomePage() {
  const complexes = getPublishedProperties(['jk', 'mfk']);
  const commercial = getPublishedProperties(['commercial']);
  const featured = [...complexes.slice(0, 2), ...commercial.slice(0, 1)];

  const statsEl = document.getElementById('homeStats');
  if (statsEl) {
    statsEl.textContent = `${complexes.length} жилых комплексов и ${commercial.length} коммерческих предложений`;
  }

  const gridEl = document.getElementById('featuredProperties');
  if (gridEl) {
    gridEl.innerHTML = renderPropertiesGrid(
      featured,
      'Объектов пока нет. Добавьте первый через админ-панель.'
    );
  }
}

function initJkPage() {
  initPropertyCatalog({
    types: ['jk'],
    catalogMode: 'complex',
  });
}

function initMfkPage() {
  initPropertyCatalog({
    types: ['mfk'],
    catalogMode: 'complex',
  });
}

function initCommercialPage() {
  initPropertyCatalog({
    types: ['commercial'],
    catalogMode: 'commercial',
  });
}

function getBackLink(property) {
  if (property.type === 'commercial') return 'commercial.html';
  if (property.type === 'mfk') return 'mfk.html';
  return 'jk.html';
}

function getBackLabel(property) {
  if (property.type === 'commercial') return 'Коммерческая';
  if (property.type === 'mfk') return 'МФК';
  return 'ЖК';
}

function initPropertyPage() {
  const container = document.getElementById('propertyDetail');
  if (!container) return;

  const id = getQueryParam('id');
  if (!id) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Объект не найден</h2>
        <p>Не указан идентификатор объекта.</p>
        <a href="index.html" class="btn btn-primary">На главную</a>
      </div>
    `;
    return;
  }

  const property = getPropertyById(id);
  if (!property || property.published === false) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Объект не найден</h2>
        <p>Такого объекта нет или он не опубликован.</p>
        <a href="index.html" class="btn btn-primary">На главную</a>
      </div>
    `;
    return;
  }

  document.title = `${property.title} — Aparts`;

  const typeLabel = TYPE_LABELS[property.type] || property.type;
  const backLink = getBackLink(property);
  const backLabel = getBackLabel(property);
  const districtRow = property.district
    ? `<div class="property-spec-row"><span class="property-spec-label">Район</span><span class="property-spec-value">${escapeHtml(property.district)}</span></div>`
    : '';
  const addressRow = property.address
    ? `<div class="property-spec-row"><span class="property-spec-label">Адрес</span><span class="property-spec-value">${escapeHtml(property.address)}</span></div>`
    : '';

  const specsHtml = isComplex(property)
    ? renderComplexStatsTable(property)
    : `
      <div class="property-spec-row">
        <span class="property-spec-label">Площадь</span>
        <span class="property-spec-value">${property.area} м²</span>
      </div>
    `;

  const pricePrefix = isComplex(property) ? 'от ' : '';

  const images = getPropertyImages(property);
  const mainImage = images[0];
  const galleryHtml = images.length > 1
    ? `<div class="property-gallery-thumbs" id="propertyGalleryThumbs">
        ${images.map((src, index) => `
          <button type="button" class="property-gallery-thumb ${index === 0 ? 'active' : ''}" data-src="${escapeHtml(resolveImageSrc(src))}">
            ${renderPropertyImg(src, `${property.title} ${index + 1}`)}
          </button>
        `).join('')}
      </div>`
    : '';

  container.innerHTML = `
    <div class="container property-detail-page">
      <div class="breadcrumbs">
        <a href="index.html">Главная</a> /
        <a href="${backLink}">${backLabel}</a> /
        <span>${escapeHtml(property.title)}</span>
      </div>

      <div class="property-detail-hero">
        <div class="property-detail-image">
          <img id="propertyMainImage" src="${escapeHtml(resolveImageSrc(mainImage))}" alt="${escapeHtml(property.title)}">
          ${galleryHtml}
        </div>
        <div class="property-detail-info">
          <div class="property-category">${escapeHtml(typeLabel)}</div>
          <h1>${escapeHtml(property.title)}</h1>
          <div class="property-price property-detail-price">${pricePrefix}${formatPrice(property.price)}</div>
          <div class="property-specs-table">
            ${specsHtml}
            ${districtRow}
            ${addressRow}
          </div>
          ${property.description ? `<p class="property-detail-desc">${escapeHtml(property.description)}</p>` : ''}
          <a href="${backLink}" class="btn btn-secondary">← Назад к списку</a>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.property-gallery-thumb').forEach(button => {
    button.addEventListener('click', () => {
      const mainImageEl = document.getElementById('propertyMainImage');
      if (mainImageEl) mainImageEl.src = button.dataset.src;
      document.querySelectorAll('.property-gallery-thumb').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
    });
  });
}
