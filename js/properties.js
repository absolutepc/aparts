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
    jkGridEl.innerHTML = renderPropertiesGridCompact(
      jkProperties,
      'ЖК пока нет. Добавьте объекты через админ-панель.'
    );
  }

  const commercialGridEl = document.getElementById('featuredCommercialProperties');
  if (commercialGridEl) {
    commercialGridEl.innerHTML = renderPropertiesGridCompact(
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

function bindFloorPlanLayoutPickers(root) {
  root?.querySelectorAll('.floor-plan-card').forEach((card) => {
    const buttons = card.querySelectorAll('.floor-plan-layout-btn');
    const panels = card.querySelectorAll('.floor-plan-layout-panel');
    if (buttons.length < 2 || !panels.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const layoutKey = button.dataset.layoutKey;
        buttons.forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        panels.forEach((panel) => {
          panel.classList.toggle(
            'floor-plan-layout-panel--hidden',
            panel.dataset.layoutKey !== layoutKey
          );
        });
      });
    });
  });
}

function bindPropertySectorPicker(root, property, selectedFlatType) {
  const section = root?.querySelector('.property-floor-plans');
  const picker = section?.querySelector('.property-sector-picker');
  if (!picker) return;

  picker.querySelectorAll('.property-sector-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const sectorId = button.dataset.sectorId;
      const params = new URLSearchParams(window.location.search);
      params.set('sector', sectorId);
      if (selectedFlatType) params.set('flatType', selectedFlatType);
      else params.delete('flatType');

      const nextUrl = `${window.location.pathname}?${params.toString()}`;
      const floorPlansHtml = renderPropertyFloorPlansBlock(property, selectedFlatType, sectorId);
      section.outerHTML = floorPlansHtml;
      const newSection = root.querySelector('.property-floor-plans');
      bindFloorPlanLayoutPickers(root);
      bindPropertySectorPicker(root, property, selectedFlatType);
      window.history.replaceState(null, '', nextUrl);

      requestAnimationFrame(() => {
        newSection?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  });
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
  const sectorParam = getQueryParam('sector');
  const selectedSector = isComplex(property)
    ? resolveComplexSector(property, sectorParam, flatTypeParam)
    : null;
  const selectedVariant = isComplex(property) && flatTypeParam
    ? (selectedSector?.flatVariants.find(variant => variant.flatType === flatTypeParam)
      || resolveComplexCatalogVariant(property, flatTypeParam))
    : null;
  const pageTitle = selectedVariant
    ? getPropertyCardTitle({ ...property, flatType: selectedVariant.flatType })
    : property.title;

  if (typeof updatePageTransitionLabel === 'function') {
    updatePageTransitionLabel(pageTitle);
  }

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
            ${renderPropertyOfferingSpecs(property)}
            ${districtRow}
            ${addressRow}
          </div>
          ${property.description ? `<p class="property-detail-desc">${escapeHtml(property.description)}</p>` : ''}
          <a href="${backLink}" class="btn btn-secondary">← Назад к списку</a>
        </div>
      </div>

      ${isComplex(property)
        ? renderPropertyFloorPlansBlock(property, selectedVariant?.flatType, selectedSector?.id)
          + renderPropertyFloorPricesBlock(property)
        : ''}
    </div>
  `;

  bindPropertyGallery(container, property);
  bindFloorPlanLayoutPickers(container);
  bindPropertySectorPicker(container, property, selectedVariant?.flatType);

  if (selectedVariant?.flatType) {
    requestAnimationFrame(() => {
      document.getElementById('floor-plan-active')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
}