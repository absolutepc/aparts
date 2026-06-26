function initHomePage() {
  const jkProperties = getFeaturedProperties(['jk', 'mfk'], 3);
  const commercialProperties = getFeaturedProperties(['commercial'], 3);
  const complexes = getPublishedProperties(['jk', 'mfk']);
  const commercial = getPublishedProperties(['commercial']);

  const statsEl = document.getElementById('homeStats');
  if (statsEl) {
    statsEl.textContent = `${complexes.length} комплексов (ЖК и МФК) и ${commercial.length} коммерческих предложений`;
  }

  const jkGridEl = document.getElementById('featuredJkProperties');
  if (jkGridEl) {
    jkGridEl.innerHTML = renderFeaturedJkGrid(
      jkProperties,
      'ЖК пока нет. Добавьте объекты через админ-панель.'
    );
    bindFeaturedJkCards(jkGridEl);
  }

  const commercialGridEl = document.getElementById('featuredCommercialProperties');
  if (commercialGridEl) {
    commercialGridEl.innerHTML = renderPropertiesGrid(
      commercialProperties,
      'Коммерческих объектов пока нет. Добавьте через админ-панель.'
    );
  }
}

function initComplexesPage() {
  initPropertyCatalog({
    types: ['jk', 'mfk'],
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
  return 'complexes.html';
}

function getBackLabel(property) {
  if (property.type === 'commercial') return 'Коммерческая';
  return 'ЖК и МФК';
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

  const flatTypeParam = getQueryParam('flatType');
  const selectedVariant = isComplex(property)
    ? resolveComplexCatalogVariant(property, flatTypeParam)
    : null;
  const pageTitle = selectedVariant
    ? getPropertyCardTitle({ ...property, flatType: selectedVariant.flatType })
    : property.title;

  document.title = `${pageTitle} — ${SITE_NAME}`;

  const typeLabel = TYPE_LABELS[property.type] || property.type;
  const backLink = getBackLink(property);
  const backLabel = getBackLabel(property);
  const districtRow = property.district
    ? `<div class="property-spec-row"><span class="property-spec-label">Район</span><span class="property-spec-value">${escapeHtml(property.district)}</span></div>`
    : '';
  const addressRow = property.address
    ? `<div class="property-spec-row"><span class="property-spec-label">Адрес</span><span class="property-spec-value">${escapeHtml(property.address)}</span></div>`
    : '';

  const heroPrice =
    selectedVariant?.price != null && selectedVariant.price !== ''
      ? selectedVariant.price
      : property.price;

  const specsHtml = isComplex(property)
    ? renderComplexStatsTable(property, selectedVariant)
    : `
      <div class="property-spec-row">
        <span class="property-spec-label">Площадь</span>
        <span class="property-spec-value">${formatArea(property.area)} м²</span>
      </div>
    `;

  const pricePrefix = isComplex(property) ? 'от ' : '';

  container.innerHTML = `
    <div class="container property-detail-page">
      <div class="breadcrumbs">
        <a href="index.html">Главная</a> /
        <a href="${backLink}">${backLabel}</a> /
        <span>${escapeHtml(pageTitle)}</span>
      </div>

      <div class="property-detail-hero">
        ${renderPropertyGalleryBlock(property)}
        <div class="property-detail-info">
          <div class="property-category">${escapeHtml(typeLabel)}</div>
          <h1>${escapeHtml(pageTitle)}</h1>
          <div class="property-price property-detail-price">${pricePrefix}${formatPrice(heroPrice)}</div>
          <div class="property-specs-table">
            ${specsHtml}
            ${districtRow}
            ${addressRow}
          </div>
          ${property.description ? `<p class="property-detail-desc">${escapeHtml(property.description)}</p>` : ''}
          <a href="${backLink}" class="btn btn-secondary">← Назад к списку</a>
        </div>
      </div>

      ${isComplex(property) ? renderPropertyFloorPlansBlock(property, selectedVariant?.flatType) : ''}
    </div>
  `;

  bindPropertyGallery(container, property);

  if (selectedVariant?.flatType) {
    requestAnimationFrame(() => {
      document.getElementById('floor-plan-active')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
}
