function initPropertyCatalog(options) {
  const { types, catalogMode = 'commercial' } = options;
  const isComplexCatalog = catalogMode === 'complex';
  const allProperties = getCatalogProperties(types);

  const areaMinInput = document.getElementById('areaMin');
  const areaMaxInput = document.getElementById('areaMax');
  const flatTypeFiltersEl = document.getElementById('flatTypeFilters');
  const flatTypeFilterGroup = document.getElementById('flatTypeFilterGroup');
  const districtFiltersEl = document.getElementById('districtFilters');
  const resultsCountEl = document.getElementById('resultsCount');
  const sortSelect = document.getElementById('sortSelect');
  const listEl = document.getElementById('propertiesList');
  const resetBtn = document.getElementById('resetFilters');
  const sidebar = document.getElementById('filtersSidebar');
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
      districts: getCheckedValues('.district-filter'),
      sort: sortSelect?.value || 'default',
    };
  }

  function filterProperties(properties, state) {
    return properties.filter(property => {
      if (isComplex(property)) {
        if (!complexMatchesCatalogFilters(property, {
          flatTypes: isComplexCatalog ? state.flatTypes : [],
          minValue: state.minValue,
          maxValue: state.maxValue,
        })) {
          return false;
        }
      } else {
        const area = Number(property.area) || 0;
        if (state.minValue != null && !Number.isNaN(state.minValue) && area < state.minValue) {
          return false;
        }
        if (state.maxValue != null && !Number.isNaN(state.maxValue) && area > state.maxValue) {
          return false;
        }
      }

      if (state.districts.length && !state.districts.includes(property.district)) {
        return false;
      }
      return true;
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
        return sorted.sort((a, b) => getComplexStats(a).totalApartments - getComplexStats(b).totalApartments);
      case 'total-desc':
        return sorted.sort((a, b) => getComplexStats(b).totalApartments - getComplexStats(a).totalApartments);
      case 'area-asc':
        if (isComplexCatalog) {
          return sorted.sort((a, b) => getComplexAreaRange(a).areaMin - getComplexAreaRange(b).areaMin);
        }
        return sorted.sort((a, b) => (a.area || 0) - (b.area || 0));
      case 'area-desc':
        if (isComplexCatalog) {
          return sorted.sort((a, b) => getComplexAreaRange(b).areaMax - getComplexAreaRange(a).areaMax);
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

  sidebar?.addEventListener('input', (event) => {
    if (event.target.matches('#areaMin, #areaMax')) applyFilters();
  });

  sidebar?.addEventListener('change', (event) => {
    if (event.target.matches('#areaMin, #areaMax, input[type="checkbox"]')) applyFilters();
  });

  sortSelect?.addEventListener('change', applyFilters);
  resetBtn?.addEventListener('click', resetFilters);

  applyFilters();
}
