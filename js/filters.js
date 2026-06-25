function initPropertyCatalog(options) {
  const { types, showRoomsFilter } = options;
  const allProperties = getPublishedProperties(types);

  const areaMinInput = document.getElementById('areaMin');
  const areaMaxInput = document.getElementById('areaMax');
  const roomsFiltersEl = document.getElementById('roomsFilters');
  const roomsFilterGroup = document.getElementById('roomsFilterGroup');
  const districtFiltersEl = document.getElementById('districtFilters');
  const resultsCountEl = document.getElementById('resultsCount');
  const sortSelect = document.getElementById('sortSelect');
  const listEl = document.getElementById('propertiesList');
  const resetBtn = document.getElementById('resetFilters');
  const sidebar = document.getElementById('filtersSidebar');

  if (roomsFilterGroup) {
    roomsFilterGroup.style.display = showRoomsFilter ? '' : 'none';
  }

  function renderCheckboxGroup(container, values, cssClass) {
    if (!container) return;
    if (!values.length) {
      container.innerHTML = '<span class="filter-empty">Нет данных</span>';
      return;
    }
    container.innerHTML = values.map(value => {
      const label = cssClass === 'rooms-filter'
        ? (value === '4+' ? '4+ комн.' : `${value} комн.`)
        : value;
      return `
      <label>
        <input type="checkbox" value="${escapeHtml(value)}" class="${cssClass}">
        ${escapeHtml(label)}
      </label>
    `;
    }).join('');
  }

  renderCheckboxGroup(roomsFiltersEl, showRoomsFilter ? getUniqueRoomOptions(allProperties) : [], 'rooms-filter');
  renderCheckboxGroup(districtFiltersEl, getUniqueDistricts(allProperties), 'district-filter');

  function getCheckedValues(selector) {
    return [...document.querySelectorAll(selector)]
      .filter(input => input.checked)
      .map(input => input.value);
  }

  function getFilterState() {
    return {
      areaMin: areaMinInput?.value ? Number(areaMinInput.value) : null,
      areaMax: areaMaxInput?.value ? Number(areaMaxInput.value) : null,
      rooms: showRoomsFilter ? getCheckedValues('.rooms-filter') : [],
      districts: getCheckedValues('.district-filter'),
      sort: sortSelect?.value || 'default',
    };
  }

  function matchesRooms(property, selectedRooms) {
    if (!selectedRooms.length || property.rooms == null) return true;
    return selectedRooms.some(value => {
      if (value === '4+') return property.rooms >= 4;
      return property.rooms === Number(value);
    });
  }

  function filterProperties(properties, state) {
    return properties.filter(property => {
      if (state.areaMin != null && !Number.isNaN(state.areaMin) && property.area < state.areaMin) {
        return false;
      }
      if (state.areaMax != null && !Number.isNaN(state.areaMax) && property.area > state.areaMax) {
        return false;
      }
      if (state.districts.length && !state.districts.includes(property.district)) {
        return false;
      }
      if (showRoomsFilter && state.rooms.length && !matchesRooms(property, state.rooms)) {
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
      case 'area-asc':
        return sorted.sort((a, b) => a.area - b.area);
      case 'area-desc':
        return sorted.sort((a, b) => b.area - a.area);
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
    if (event.target.matches('input[type="checkbox"]')) applyFilters();
  });

  sortSelect?.addEventListener('change', applyFilters);
  resetBtn?.addEventListener('click', resetFilters);

  applyFilters();
}
