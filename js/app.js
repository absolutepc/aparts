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

function renderFeaturedJkCard(property) {
  const variants = getComplexFlatVariants(property);
  const activeVariant = variants[0];
  const variantButtons = variants.map((variant, index) => `
    <button
      type="button"
      class="property-variant-btn ${index === 0 ? 'active' : ''}"
      data-index="${index}"
      aria-label="${escapeAttr(variant.flatTypeLabel)}"
    >${escapeHtml(variant.flatTypeShortLabel)}</button>
  `).join('');

  const attrsHtml = renderFeaturedVariantTags(activeVariant);

  return `
    <article
      class="property-card property-card--featured-jk"
      data-property-id="${escapeAttr(property.id)}"
      data-variants="${escapeAttr(encodeURIComponent(JSON.stringify(variants)))}"
    >
      <a href="property.html?id=${encodeURIComponent(property.id)}" class="property-card-media">
        <div class="property-image">
          ${renderPropertyImg(getPropertyImg(property), property.title)}
        </div>
      </a>
      <div class="property-info">
        <div class="property-category">${escapeHtml(TYPE_LABELS.jk)}</div>
        <h3><a href="property.html?id=${encodeURIComponent(property.id)}">${escapeHtml(property.title)}</a></h3>
        <div class="property-variant-picker">${variantButtons}</div>
        <div class="property-attrs" data-variant-attrs>${attrsHtml}</div>
        <p>${escapeHtml(property.description || '')}</p>
        <div class="property-footer">
          <div class="property-price">от ${formatPrice(property.price)}</div>
          <a href="property.html?id=${encodeURIComponent(property.id)}" class="btn btn-secondary btn-sm">Подробнее</a>
        </div>
      </div>
    </article>
  `;
}

function renderFeaturedVariantTags(variant) {
  if (!variant) return '';
  const areaLabel = formatVariantAreaRange(variant);
  return `
    ${areaLabel ? `<span class="property-attr-tag">${areaLabel}</span>` : ''}
    <span class="property-attr-tag">${escapeHtml(variant.flatTypeLabel)}</span>
    <span class="property-attr-tag">${variant.totalApartments} кв.</span>
  `;
}

function bindFeaturedJkCards(container) {
  container?.querySelectorAll('.property-card--featured-jk').forEach(card => {
    let variants = [];
    try {
      variants = JSON.parse(decodeURIComponent(card.dataset.variants || '%5B%5D'));
    } catch (error) {
      console.warn(`${SITE_NAME}: не удалось прочитать варианты квартир`, error);
      return;
    }

    const attrsEl = card.querySelector('[data-variant-attrs]');

    card.querySelectorAll('.property-variant-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const index = Number(button.dataset.index);
        const variant = variants[index];
        if (!variant || !attrsEl) return;

        card.querySelectorAll('.property-variant-btn').forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        attrsEl.innerHTML = renderFeaturedVariantTags(variant);
      });
    });
  });
}

function renderFeaturedJkGrid(properties, emptyMessage) {
  if (!properties.length) {
    return `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;
  }
  return `<div class="properties-grid">${properties.map(renderFeaturedJkCard).join('')}</div>`;
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
      <span class="property-attr-tag">${formatArea(property.area)} м²</span>
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
