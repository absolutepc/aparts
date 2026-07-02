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

function renderPropertyCardCompact(property) {
  const typeLabel = TYPE_LABELS[property.type] || property.type;
  const cardTitle = isComplex(property) ? property.title : getPropertyCardTitle(property);
  const detailHref = getPropertyDetailHref(property, { overview: true });
  const cardImg = getPropertyImg(property);
  const priceLabel = isComplex(property) ? 'от ' : '';
  const districtHtml = property.district
    ? `<p class="property-card-summary">${escapeHtml(property.district)}</p>`
    : '';

  return `
    <a href="${escapeAttr(detailHref)}" class="property-card property-card--compact" data-transition-label="${escapeAttr(cardTitle)}">
      <div class="property-image">
        ${renderPropertyImg(cardImg, cardTitle)}
      </div>
      <div class="property-info">
        <div class="property-category">${escapeHtml(typeLabel)}</div>
        <h3>${escapeHtml(cardTitle)}</h3>
        ${districtHtml}
        <div class="property-footer">
          <div class="property-price">${priceLabel}${formatPrice(property.price)}</div>
          <span class="btn btn-secondary btn-sm">Подробнее</span>
        </div>
      </div>
    </a>
  `;
}

function renderPropertiesGridCompact(properties, emptyMessage) {
  if (!properties.length) {
    return `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;
  }
  return `<div class="properties-grid properties-grid--compact">${properties.map(renderPropertyCardCompact).join('')}</div>`;
}

function renderFeaturedJkCard(property, options = {}) {
  const variants = getComplexFlatVariants(property);
  const activeVariant = variants[0];
  const showDescription = options.showDescription === true;
  const detailHref = getPropertyDetailHref(
    activeVariant ? { ...property, flatType: activeVariant.flatType } : property
  );
  const cardTitle = activeVariant
    ? getPropertyCardTitle({ ...property, flatType: activeVariant.flatType })
    : property.title;
  const activePrice = activeVariant?.price ?? property.price;
  const variantButtons = variants.map((variant, index) => `
    <button
      type="button"
      class="property-variant-btn ${index === 0 ? 'active' : ''}"
      data-index="${index}"
      aria-label="${escapeAttr(variant.flatTypeLabel)}"
    >${escapeHtml(variant.flatTypeShortLabel)}</button>
  `).join('');

  const attrsHtml = renderFeaturedVariantTags(activeVariant);
  const descriptionHtml = showDescription
    ? `<p>${escapeHtml(property.description || '')}</p>`
    : '';

  return `
    <article
      class="property-card property-card--featured-jk"
      data-property-id="${escapeAttr(property.id)}"
      data-variants="${escapeAttr(encodeURIComponent(JSON.stringify(variants)))}"
    >
      <a href="${escapeAttr(detailHref)}" class="property-card-media" data-detail-link data-transition-label="${escapeAttr(cardTitle)}">
        <div class="property-image">
          ${renderPropertyImg(getPropertyImg(property), property.title)}
        </div>
      </a>
      <div class="property-info">
        <div class="property-category">${escapeHtml(TYPE_LABELS[property.type] || TYPE_LABELS.jk)}</div>
        <h3><a href="${escapeAttr(detailHref)}" data-detail-link data-transition-label="${escapeAttr(cardTitle)}">${escapeHtml(property.title)}</a></h3>
        <div class="property-variant-picker">${variantButtons}</div>
        <div class="property-attrs">
          <span data-variant-attrs>${attrsHtml}</span>
          <span data-offering-tags>${renderPropertyOfferingTags(property)}</span>
        </div>
        ${descriptionHtml}
        <div class="property-footer">
          <div class="property-price" data-variant-price>от ${formatPrice(activePrice)}</div>
          <a href="${escapeAttr(detailHref)}" class="btn btn-secondary btn-sm" data-detail-link data-transition-label="${escapeAttr(cardTitle)}">Подробнее</a>
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

    const property = getPropertyById(card.dataset.propertyId);
    if (!property) return;

    const attrsEl = card.querySelector('[data-variant-attrs]');
    const priceEl = card.querySelector('[data-variant-price]');
    const detailLinks = card.querySelectorAll('[data-detail-link]');

    function applyVariant(variant) {
      if (!variant) return;

      const detailHref = getPropertyDetailHref({ ...property, flatType: variant.flatType });
      const cardTitle = getPropertyCardTitle({ ...property, flatType: variant.flatType });
      const price = variant.price ?? property.price;

      if (attrsEl) attrsEl.innerHTML = renderFeaturedVariantTags(variant);
      if (priceEl) priceEl.textContent = `от ${formatPrice(price)}`;
      detailLinks.forEach((link) => {
        link.href = detailHref;
        link.dataset.transitionLabel = cardTitle;
      });
    }

    card.querySelectorAll('.property-variant-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const index = Number(button.dataset.index);
        const variant = variants[index];
        if (!variant) return;

        card.querySelectorAll('.property-variant-btn').forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        applyVariant(variant);
      });
    });
  });
}

function renderFeaturedJkGrid(properties, emptyMessage, options = {}) {
  if (!properties.length) {
    return `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;
  }
  return `<div class="properties-grid">${properties.map((property) => renderFeaturedJkCard(property, options)).join('')}</div>`;
}

function renderPropertyCard(property) {
  const typeLabel = TYPE_LABELS[property.type] || property.type;
  const cardTitle = getPropertyCardTitle(property);
  const detailHref = getPropertyDetailHref(property);
  const cardImg = getPropertyImg(property);
  const districtHtml = property.district
    ? `<span class="property-attr-tag">${escapeHtml(property.district)}</span>`
    : '';
  const addressHtml = property.address
    ? `<span class="property-attr-tag">${escapeHtml(property.address)}</span>`
    : '';

  let attrsHtml = '';
  const offeringTagsHtml = renderPropertyOfferingTags(property);
  if (isComplex(property)) {
    attrsHtml = `${renderComplexStatsTags(property)}${offeringTagsHtml}`;
  } else {
    attrsHtml = `
      <span class="property-attr-tag">${formatArea(property.area)} м²</span>
      ${districtHtml}
      ${addressHtml}
      ${offeringTagsHtml}
    `;
  }

  const priceLabel = isComplex(property) ? 'от ' : '';
  const descriptionHtml = isComplex(property)
    ? ''
    : `<p>${escapeHtml(property.description || '')}</p>`;

  return `
    <a href="${escapeAttr(detailHref)}" class="property-card" data-transition-label="${escapeAttr(cardTitle)}">
      <div class="property-image">
        ${renderPropertyImg(cardImg, cardTitle)}
      </div>
      <div class="property-info">
        <div class="property-category">${escapeHtml(typeLabel)}</div>
        <h3>${escapeHtml(cardTitle)}</h3>
        <div class="property-attrs">${attrsHtml}</div>
        ${descriptionHtml}
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
