function initHomePage() {
  const allComplexes = getPublishedProperties(['jk', 'mfk']);
  const commercialProperties = getFeaturedProperties(['commercial'], 3);
  const commercial = getPublishedProperties(['commercial']);
  const featuredLimit = 3;
  let showAllComplexes = false;

  const statsEl = document.getElementById('homeStats');
  if (statsEl) {
    statsEl.textContent = `${allComplexes.length} комплексов (ЖК и МФК) и ${commercial.length} коммерческих предложений`;
  }

  const jkGridEl = document.getElementById('featuredJkProperties');
  const toggleBtn = document.getElementById('toggleAllJkBtn');

  function renderJkGrid() {
    if (!jkGridEl) return;

    const list = showAllComplexes ? allComplexes : allComplexes.slice(0, featuredLimit);
    jkGridEl.innerHTML = renderPropertiesGridCompact(
      list,
      'ЖК пока нет. Добавьте объекты через админ-панель.'
    );

    if (toggleBtn && allComplexes.length > featuredLimit) {
      toggleBtn.hidden = false;
      toggleBtn.textContent = showAllComplexes
        ? 'Свернуть'
        : `Показать все ЖК и МФК (${allComplexes.length})`;
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      showAllComplexes = !showAllComplexes;
      renderJkGrid();
    });
  }

  renderJkGrid();

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

  const backLink = getBackLink(property);
  const backLabel = getBackLabel(property);

  const heroPrice =
    selectedVariant?.price != null && selectedVariant.price !== ''
      ? selectedVariant.price
      : (getMinSectorFullPrice(property) ?? property.price);

  const isOverview = isComplex(property) && !flatTypeParam;

  const specsHtml = isComplex(property)
    ? renderComplexStatsTable(property, selectedVariant, { overview: isOverview })
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
          ${renderPropertyDetailTitle(property, selectedVariant)}
          <div class="property-detail-head">
            <div class="property-price property-detail-price">${pricePrefix}${formatPrice(heroPrice)}</div>
            <a href="${backLink}" class="btn btn-secondary">← Назад к списку</a>
          </div>
          <div class="property-specs-table">
            ${renderPropertyOfferingSpecs(property)}
            ${specsHtml}
          </div>
          ${isComplex(property) ? renderPropertyPricesBlock(property, { compact: true }) : ''}
        </div>
      </div>

      ${isComplex(property)
        ? renderPropertyFloorPlansBlock(property, selectedVariant?.flatType, selectedSector?.id)
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