function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ'}</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function renderPropertyCard(property) {
  const typeLabel = TYPE_LABELS[property.type] || property.type;
  const districtHtml = property.district
    ? `<span class="property-attr-tag">${escapeHtml(property.district)}</span>`
    : '';
  const addressHtml = property.address
    ? `<span class="property-attr-tag">${escapeHtml(property.address)}</span>`
    : '';

  let attrsHtml = '';
  if (isComplex(property)) {
    attrsHtml = renderComplexStatsTags(property);
  } else {
    attrsHtml = `
      <span class="property-attr-tag">${property.area} м²</span>
      ${districtHtml}
      ${addressHtml}
    `;
  }

  const priceLabel = isComplex(property) ? 'от ' : '';

  return `
    <a href="property.html?id=${encodeURIComponent(property.id)}" class="property-card">
      <div class="property-image">
        ${renderPropertyImg(getPropertyImg(property), property.title)}
      </div>
      <div class="property-info">
        <div class="property-category">${escapeHtml(typeLabel)}</div>
        <h3>${escapeHtml(property.title)}</h3>
        <div class="property-attrs">${attrsHtml}</div>
        <p>${escapeHtml(property.description || '')}</p>
        <div class="property-footer">
          <div class="property-price">${priceLabel}${formatPrice(property.price)}</div>
          <span class="btn btn-secondary btn-sm">Подробнее</span>
        </div>
      </div>
    </a>
  `;
}

function renderPropertiesGrid(properties, emptyMessage) {
  if (!properties.length) {
    return `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;
  }
  return `<div class="properties-grid">${properties.map(renderPropertyCard).join('')}</div>`;
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
