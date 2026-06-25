function initHomePage() {
  const residential = getPublishedProperties(['apartment', 'studio']);
  const commercial = getPublishedProperties(['commercial']);
  const featured = [...residential.slice(0, 2), ...commercial.slice(0, 1)];

  const statsEl = document.getElementById('homeStats');
  if (statsEl) {
    statsEl.textContent = `${residential.length} жилых и ${commercial.length} коммерческих предложений`;
  }

  const gridEl = document.getElementById('featuredProperties');
  if (gridEl) {
    gridEl.innerHTML = renderPropertiesGrid(
      featured,
      'Объектов пока нет. Добавьте первый через админ-панель.'
    );
  }
}

function initApartmentsPage() {
  const properties = getPublishedProperties(['apartment', 'studio']);
  const gridEl = document.getElementById('propertiesList');
  if (gridEl) {
    gridEl.innerHTML = renderPropertiesGrid(
      properties,
      'Пока нет опубликованных объектов в этом разделе.'
    );
  }
}

function initCommercialPage() {
  const properties = getPublishedProperties(['commercial']);
  const gridEl = document.getElementById('propertiesList');
  if (gridEl) {
    gridEl.innerHTML = renderPropertiesGrid(
      properties,
      'Пока нет опубликованных объектов в этом разделе.'
    );
  }
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
  const backLink = property.type === 'commercial' ? 'commercial.html' : 'apartments.html';
  const backLabel = property.type === 'commercial' ? 'Коммерческая' : 'Квартиры и студии';
  const roomsRow = property.type !== 'commercial' && property.rooms != null
    ? `<div class="property-spec-row"><span class="property-spec-label">Комнат</span><span class="property-spec-value">${property.rooms}</span></div>`
    : '';
  const addressRow = property.address
    ? `<div class="property-spec-row"><span class="property-spec-label">Адрес</span><span class="property-spec-value">${escapeHtml(property.address)}</span></div>`
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
          ${renderPropertyImg(getPropertyImg(property), property.title)}
        </div>
        <div class="property-detail-info">
          <div class="property-category">${escapeHtml(typeLabel)}</div>
          <h1>${escapeHtml(property.title)}</h1>
          <div class="property-price property-detail-price">${formatPrice(property.price)}</div>
          <div class="property-specs-table">
            <div class="property-spec-row">
              <span class="property-spec-label">Площадь</span>
              <span class="property-spec-value">${property.area} м²</span>
            </div>
            ${roomsRow}
            ${addressRow}
          </div>
          ${property.description ? `<p class="property-detail-desc">${escapeHtml(property.description)}</p>` : ''}
          <a href="${backLink}" class="btn btn-secondary">← Назад к списку</a>
        </div>
      </div>
    </div>
  `;
}
