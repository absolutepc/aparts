function initPropertyCatalog(options) {
  const { types, catalogMode = 'commercial' } = options;
  const isComplexCatalog = catalogMode === 'complex';
  const baseProperties = getCatalogProperties(types);
  const allProperties = isComplexCatalog
    ? expandCatalogListings(baseProperties)
    : baseProperties;

  const areaMinInput = document.getElementById('areaMin');
  const areaMaxInput = document.getElementById('areaMax');
  const flatTypeFiltersEl = document.getElementById('flatTypeFilters');
  const flatTypeFilterGroup = document.getElementById('flatTypeFilterGroup');
  const noMarkupFiltersEl = document.getElementById('noMarkupFilters');
  const mandatoryPaymentFiltersEl = document.getElementById('mandatoryPaymentFilters');
  const maternityCapitalFiltersEl = document.getElementById('maternityCapitalFilters');
  const discountsFiltersEl = document.getElementById('discountsFilters');
  const deliveryDateFiltersEl = document.getElementById('deliveryDateFilters');
  const districtFiltersEl = document.getElementById('districtFilters');
  const resultsCountEl = document.getElementById('resultsCount');
  const sortSelect = document.getElementById('sortSelect');
  const listEl = document.getElementById('propertiesList');
  const resetBtn = document.getElementById('resetFilters');
  const sidebar = document.getElementById('filtersSidebar');
  const filtersToggle = document.getElementById('filtersToggle');
  const filtersActiveCount = document.getElementById('filtersActiveCount');
  const areaFilterGroup = document.getElementById('areaFilterGroup');

  if (flatTypeFilterGroup) {
    flatTypeFilterGroup.style.display = isComplexCatalog ? '' : 'none';
  }

  if (areaFilterGroup) {
    const label = areaFilterGroup.querySelector('label');
    if (label) {
      label.textContent = 'Площадь, м²';
    }
  }

  function isMobileFiltersViewport() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function setFiltersExpanded(expanded) {
    if (!sidebar || !filtersToggle) return;
    sidebar.classList.toggle('is-collapsed', !expanded);
    filtersToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  function countActiveFilters(state) {
    let count = 0;
    if (state.minValue != null && !Number.isNaN(state.minValue)) count += 1;
    if (state.maxValue != null && !Number.isNaN(state.maxValue)) count += 1;
    count += state.flatTypes.length;
    count += state.noMarkupYears.length;
    count += state.mandatoryPayments.length;
    count += state.maternityCapitals.length;
    count += state.discounts.length;
    count += state.deliveryDates.length;
    count += state.districts.length;
    return count;
  }

  function updateFiltersActiveCount(state = getFilterState()) {
    if (!filtersActiveCount) return;
    const count = countActiveFilters(state);
    if (count > 0) {
      filtersActiveCount.hidden = false;
      filtersActiveCount.textContent = String(count);
    } else {
      filtersActiveCount.hidden = true;
      filtersActiveCount.textContent = '';
    }
  }

  function renderCheckboxGroup(container, items, cssClass) {
    if (!container) return;
    if (!items.length) {
      container.innerHTML = '<span class="filter-empty">Нет данных</span>';
      return;
    }
    container.innerHTML = items.map(item => `
      <label>
        <input type="checkbox" value="${escapeHtml(item.value)}" class="${cssClass}">
        ${escapeHtml(item.label)}
      </label>
    `).join('');
  }

  if (isComplexCatalog && flatTypeFiltersEl) {
    renderCheckboxGroup(flatTypeFiltersEl, Object.entries(FLAT_TYPE_LABELS).map(([value, label]) => ({
      value,
      label,
    })), 'flat-type-filter');
  }

  renderCheckboxGroup(
    noMarkupFiltersEl,
    Object.entries(NO_MARKUP_YEARS).map(([value, label]) => ({
      value,
      label: getNoMarkupYearsFilterLabel(value),
    })),
    'no-markup-filter'
  );

  renderCheckboxGroup(
    mandatoryPaymentFiltersEl,
    Object.entries(MANDATORY_PAYMENT_OPTIONS).map(([value, label]) => ({
      value,
      label: getMandatoryPaymentLabel(value),
    })),
    'mandatory-payment-filter'
  );

  renderCheckboxGroup(
    maternityCapitalFiltersEl,
    Object.entries(MATERNITY_CAPITAL_OPTIONS).map(([value, label]) => ({
      value,
      label: getMaternityCapitalLabel(value),
    })),
    'maternity-capital-filter'
  );

  renderCheckboxGroup(
    discountsFiltersEl,
    Object.entries(DISCOUNT_FILTER_OPTIONS).map(([value, label]) => ({
      value,
      label: getDiscountFilterLabel(value),
    })),
    'discounts-filter'
  );

  const uniqueDeliveryDates = [...new Set(allProperties.map(p => p.deliveryDate).filter(Boolean))].sort();
  renderCheckboxGroup(
    deliveryDateFiltersEl,
    uniqueDeliveryDates.map(value => ({ value, label: value })),
    'delivery-date-filter'
  );

  renderCheckboxGroup(
    districtFiltersEl,
    getUniqueDistricts(allProperties).map(value => ({ value, label: value })),
    'district-filter'
  );

  function getCheckedValues(selector) {
    return [...document.querySelectorAll(selector)]
      .filter(input => input.checked)
      .map(input => input.value);
  }

  function getFilterState() {
    const minRaw = areaMinInput?.value?.trim() || '';
    const maxRaw = areaMaxInput?.value?.trim() || '';

    return {
      minValue: minRaw ? parseArea(minRaw) : null,
      maxValue: maxRaw ? parseArea(maxRaw) : null,
      flatTypes: isComplexCatalog ? getCheckedValues('.flat-type-filter') : [],
      noMarkupYears: getCheckedValues('.no-markup-filter'),
      mandatoryPayments: getCheckedValues('.mandatory-payment-filter'),
      maternityCapitals: getCheckedValues('.maternity-capital-filter'),
      discounts: getCheckedValues('.discounts-filter'),
      deliveryDates: getCheckedValues('.delivery-date-filter'),
      districts: getCheckedValues('.district-filter'),
      sort: sortSelect?.value || 'default',
    };
  }

  function filterProperties(properties, state) {
    return properties.filter(property => {
      if (isComplexCatalog) {
        return catalogListingMatchesFilters(property, {
          flatTypes: state.flatTypes,
          minValue: state.minValue,
          maxValue: state.maxValue,
          noMarkupYears: state.noMarkupYears,
          mandatoryPayments: state.mandatoryPayments,
          maternityCapitals: state.maternityCapitals,
          discounts: state.discounts,
          deliveryDates: state.deliveryDates,
          districts: state.districts,
        });
      }

      const area = Number(property.area) || 0;
      if (state.minValue != null && !Number.isNaN(state.minValue) && area < state.minValue) {
        return false;
      }
      if (state.maxValue != null && !Number.isNaN(state.maxValue) && area > state.maxValue) {
        return false;
      }

      if (state.districts.length && !state.districts.includes(property.district)) {
        return false;
      }

      return propertyMatchesOfferingFilters(property, {
        noMarkupYears: state.noMarkupYears,
        mandatoryPayments: state.mandatoryPayments,
        maternityCapitals: state.maternityCapitals,
        discounts: state.discounts,
        deliveryDates: state.deliveryDates,
      });
    });
  }

  function sortProperties(properties, sortValue) {
    const sorted = [...properties];
    switch (sortValue) {
      case 'price-asc':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-desc':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'total-asc':
        return sorted.sort((a, b) => (
          (Number(a.totalApartments) || getComplexStats(a).totalApartments)
          - (Number(b.totalApartments) || getComplexStats(b).totalApartments)
        ));
      case 'total-desc':
        return sorted.sort((a, b) => (
          (Number(b.totalApartments) || getComplexStats(b).totalApartments)
          - (Number(a.totalApartments) || getComplexStats(a).totalApartments)
        ));
      case 'area-asc':
        if (isComplexCatalog) {
          return sorted.sort((a, b) => (
            (Number(a.areaMin) || getComplexAreaRange(a).areaMin)
            - (Number(b.areaMin) || getComplexAreaRange(b).areaMin)
          ));
        }
        return sorted.sort((a, b) => (a.area || 0) - (b.area || 0));
      case 'area-desc':
        if (isComplexCatalog) {
          return sorted.sort((a, b) => (
            (Number(b.areaMax) || getComplexAreaRange(b).areaMax)
            - (Number(a.areaMax) || getComplexAreaRange(a).areaMax)
          ));
        }
        return sorted.sort((a, b) => (b.area || 0) - (a.area || 0));
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
      default:
        return sorted;
    }
  }

  function applyFilters() {
    const state = getFilterState();
    const filtered = sortProperties(filterProperties(allProperties, state), state.sort);

    if (resultsCountEl) {
      resultsCountEl.textContent = `Найдено: ${filtered.length}`;
    }

    if (listEl) {
      listEl.innerHTML = renderPropertiesGrid(
        filtered,
        'По выбранным фильтрам ничего не найдено. Попробуйте изменить параметры.'
      );
    }

    updateFiltersActiveCount(state);
  }

  function resetFilters() {
    if (areaMinInput) areaMinInput.value = '';
    if (areaMaxInput) areaMaxInput.value = '';
    if (sortSelect) sortSelect.value = 'default';
    document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(input => {
      input.checked = false;
    });
    applyFilters();
  }

  filtersToggle?.addEventListener('click', () => {
    if (!isMobileFiltersViewport()) return;
    const expanded = filtersToggle.getAttribute('aria-expanded') === 'true';
    setFiltersExpanded(!expanded);
  });

  window.addEventListener('resize', () => {
    if (!isMobileFiltersViewport()) {
      setFiltersExpanded(true);
    } else if (sidebar && !sidebar.classList.contains('is-collapsed') && filtersToggle?.getAttribute('aria-expanded') !== 'true') {
      setFiltersExpanded(false);
    }
  });

  sidebar?.addEventListener('input', (event) => {
    if (event.target.matches('#areaMin, #areaMax')) applyFilters();
  });

  sidebar?.addEventListener('change', (event) => {
    if (event.target.matches('#areaMin, #areaMax, input[type="checkbox"]')) applyFilters();
  });

  sortSelect?.addEventListener('change', applyFilters);
  resetBtn?.addEventListener('click', resetFilters);

  if (!isMobileFiltersViewport()) {
    setFiltersExpanded(true);
  }

  applyFilters();
}
