let adminSection = 'properties';

function initAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    document.getElementById('adminGate').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    bindAdminLogin();
    return;
  }

  showAdminPanel();
}

function showAdminPanel() {
  document.getElementById('adminGate').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'grid';
  renderAdminSection('properties');
  bindAdminNav();
}

function bindAdminLogin() {
  const form = document.getElementById('adminLoginForm');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value;
    const result = loginUser(email, password);

    if (result.success && result.isAdmin) {
      if (typeof playPageTransition === 'function') {
        await playPageTransition('Админ-панель');
      }
      showToast('Добро пожаловать, администратор!', 'success');
      showAdminPanel();
      return;
    }

    showToast('Неверный email или пароль', 'error');
  });
}

function bindAdminNav() {
  document.querySelectorAll('.admin-nav button').forEach(button => {
    button.addEventListener('click', () => {
      adminSection = button.dataset.section;
      document.querySelectorAll('.admin-nav button').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      renderAdminSection(adminSection);
    });
  });

  const logoutBtn = document.getElementById('adminLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutUser();
      showToast('Вы вышли из админки', 'info');
      initAdmin();
    });
  }
}

function renderAdminSection(section) {
  const main = document.getElementById('adminContent');
  if (!main) return;

  switch (section) {
    case 'dashboard':
      main.innerHTML = renderDashboard();
      break;
    case 'properties':
      main.innerHTML = renderPropertiesAdmin();
      bindPropertiesAdmin();
      break;
    default:
      main.innerHTML = renderPropertiesAdmin();
      bindPropertiesAdmin();
  }
}

function renderDashboard() {
  const properties = getProperties();
  const published = properties.filter(item => item.published !== false).length;
  const jkCount = properties.filter(item => item.type === 'jk').length;
  const mfkCount = properties.filter(item => item.type === 'mfk').length;
  const commercial = properties.filter(item => item.type === 'commercial').length;

  return `
    <div class="admin-header"><h1>Обзор</h1></div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Всего объектов</div>
        <div class="stat-value">${properties.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Опубликовано</div>
        <div class="stat-value">${published}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">ЖК</div>
        <div class="stat-value">${jkCount}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">МФК / Коммерция</div>
        <div class="stat-value">${mfkCount} / ${commercial}</div>
      </div>
    </div>
  `;
}

function renderAdminLayoutRow(flatType, index, layout = {}, sectorIndex = 0) {
  const label = layout.label || getLayoutLabel(index);
  const layoutKey = layout.key || getLayoutKey(index);
  const prefix = `sector_${sectorIndex}_variant_${flatType}_layout_${index}`;
  return `
    <div class="admin-layout-row" data-flat-type="${escapeHtml(flatType)}" data-layout-index="${index}" data-layout-key="${escapeAttr(layoutKey)}">
      <div class="admin-layout-row-head">
        <strong>${escapeHtml(label)}</strong>
        <button type="button" class="btn btn-danger btn-sm admin-remove-layout-btn">Удалить</button>
      </div>
      <input type="hidden" name="${prefix}_key" value="${escapeHtml(layoutKey)}">
      <div class="admin-form-grid">
        <div class="form-group">
          <label>Подпись</label>
          <input type="text" name="${prefix}_label" value="${escapeHtml(layout.label || label)}" placeholder="Тип-A">
        </div>
        <div class="form-group">
          <label>Площадь от, м²</label>
          <input type="number" name="${prefix}_areaMin" min="0" step="0.001" value="${layout.areaMin ?? ''}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Площадь до, м²</label>
          <input type="number" name="${prefix}_areaMax" min="0" step="0.001" value="${layout.areaMax ?? ''}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Цена от, ₽</label>
          <input type="number" name="${prefix}_price" min="0" value="${layout.price ?? ''}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Количество квартир</label>
          <input type="number" name="${prefix}_totalApartments" min="0" step="1" value="${layout.totalApartments ?? ''}" placeholder="—">
        </div>
        <div class="form-group admin-form-full">
          <label>Доступные этажи</label>
          <input type="text" name="${prefix}_availableFloors" value="${escapeHtml(formatFloorRangesInput(layout.availableFloors))}" placeholder="3-8, 12, 16-20">
          <p class="form-hint">Диапазоны через запятую: 3-8, 12, 16-20</p>
        </div>
        <div class="form-group admin-form-full">
          <label>Планировка (путь к файлу)</label>
          <input type="text" name="${prefix}_planImg" value="${escapeHtml(layout.planImg || '')}" placeholder="img/properties/plan.jpg">
        </div>
      </div>
    </div>
  `;
}

function renderAdminFlatVariantLayouts(flatType, layouts = [{}], sectorIndex = 0) {
  const rows = layouts.length ? layouts : [{}];
  return `
    <div class="admin-layout-editor">
      <p class="form-hint">Добавьте несколько планировок (А, Б, В…), если у типа есть варианты. Для каждой планировки можно указать количество квартир и доступные этажи.</p>
      <div class="admin-layout-rows" data-flat-type="${escapeHtml(flatType)}" data-sector-index="${sectorIndex}">
        ${rows.map((layout, index) => renderAdminLayoutRow(flatType, index, layout, sectorIndex)).join('')}
      </div>
      <button type="button" class="btn btn-secondary btn-sm admin-add-layout-btn" data-flat-type="${escapeHtml(flatType)}" data-sector-index="${sectorIndex}">+ Добавить планировку</button>
    </div>
  `;
}

function renderAdminFlatVariantRow(flatType, sectorIndex = 0) {
  const label = getFlatTypeLabel(flatType);
  const prefix = `sector_${sectorIndex}_variant_${flatType}`;
  return `
    <fieldset class="admin-flat-variant-row" data-flat-type="${escapeHtml(flatType)}" data-sector-index="${sectorIndex}">
      <legend>${escapeHtml(label)}</legend>
      <div class="admin-form-grid">
        <div class="form-group">
          <label>Количество квартир</label>
          <input type="number" name="${prefix}_totalApartments" min="0" step="1" placeholder="—">
        </div>
        <div class="form-group">
          <label>Площадь от, м²</label>
          <input type="number" name="${prefix}_areaMin" min="0" step="0.001" placeholder="—">
        </div>
        <div class="form-group">
          <label>Площадь до, м²</label>
          <input type="number" name="${prefix}_areaMax" min="0" step="0.001" placeholder="—">
        </div>
        <div class="form-group">
          <label>Цена от, ₽</label>
          <input type="number" name="${prefix}_price" min="0" placeholder="—">
        </div>
        <div class="form-group admin-form-full">
          ${renderAdminFlatVariantLayouts(flatType, [{}], sectorIndex)}
        </div>
      </div>
    </fieldset>
  `;
}

function renderAdminSectorPanel(sector = {}, sectorIndex = 0) {
  return `
    <section class="admin-sector-panel" data-sector-index="${sectorIndex}">
      <div class="admin-sector-panel-head">
        <div class="form-group">
          <label>Название сектора</label>
          <input type="text" name="sector_${sectorIndex}_title" value="${escapeHtml(stripSectorTitle(sector.title || ''))}" placeholder="А-Г" required>
          <input type="hidden" name="sector_${sectorIndex}_id" value="${escapeHtml(sector.id || '')}">
        </div>
        <button type="button" class="btn btn-danger btn-sm admin-remove-sector-btn">Удалить сектор</button>
      </div>
      <div class="admin-variant-editor">
        <p class="form-hint">Заполните параметры для каждого типа. Пустое количество — тип не будет показан в этом секторе. Количество можно указать для типа целиком или отдельно для каждой планировки.</p>
        <div class="admin-sector-flat-variants">
          ${FLAT_TYPE_KEYS.map(flatType => renderAdminFlatVariantRow(flatType, sectorIndex)).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderAdminFloorPriceRow(index, range = {}) {
  const prefix = `floorPrice_${index}`;
  return `
    <div class="admin-floor-price-row" data-floor-price-index="${index}">
      <div class="admin-floor-price-row-head">
        <strong>Диапазон ${index + 1}</strong>
        <button type="button" class="btn btn-danger btn-sm admin-remove-floor-price-btn">Удалить</button>
      </div>
      <div class="admin-form-grid">
        <div class="form-group">
          <label>Этаж от</label>
          <input type="number" name="${prefix}_floorMin" min="1" step="1" value="${range.floorMin ?? ''}" placeholder="3">
        </div>
        <div class="form-group">
          <label>Этаж до</label>
          <input type="number" name="${prefix}_floorMax" min="1" step="1" value="${range.floorMax ?? ''}" placeholder="8">
        </div>
        <div class="form-group">
          <label>Цена, ₽</label>
          <input type="number" name="${prefix}_price" min="0" step="1" value="${range.price ?? ''}" placeholder="9000000">
        </div>
      </div>
    </div>
  `;
}

function renderAdminFloorPricesEditor(ranges = []) {
  const rows = ranges.length ? ranges : [];
  return `
    <div class="admin-floor-prices-editor">
      <div class="admin-floor-prices-editor-head">
        <h3 class="admin-variant-editor-title">Цены по этажам</h3>
        <button type="button" class="btn btn-secondary btn-sm" id="addFloorPriceBtn">+ Добавить диапазон</button>
      </div>
      <p class="form-hint">Укажите диапазоны этажей и цену для объекта. Например: 3–8 этаж — одна цена, 9–15 — другая.</p>
      <div id="floorPriceRows">
        ${rows.length
    ? rows.map((range, index) => renderAdminFloorPriceRow(index, range)).join('')
    : '<p class="form-hint admin-floor-prices-empty">Диапазоны не заданы — используется общая цена объекта.</p>'}
      </div>
    </div>
  `;
}

function renderAdminSectorsEditor(sectors = [], floorPriceRanges = []) {
  const panels = sectors.length ? sectors : [{ title: 'A' }];
  return `
    <div class="admin-sectors-editor">
      <div class="admin-sectors-editor-head">
        <h3 class="admin-variant-editor-title">Секторы</h3>
        <button type="button" class="btn btn-secondary btn-sm" id="addSectorBtn">+ Добавить сектор</button>
      </div>
      <p class="form-hint">Разделите комплекс на секторы. В каталоге объект показывается как сейчас — по типам квартир суммарно по всем секторам.</p>
      <div id="sectorRows">
        ${panels.map((sector, index) => renderAdminSectorPanel(sector, index)).join('')}
      </div>
      ${renderAdminFloorPricesEditor(floorPriceRanges)}
      <div class="form-group">
        <label>Основной тип для карточки</label>
        <select name="flatType">
          ${Object.entries(FLAT_TYPE_LABELS).map(([value, label]) => `
            <option value="${value}">${escapeHtml(label)}</option>
          `).join('')}
        </select>
      </div>
    </div>
  `;
}

function collectLayoutsForFlatType(form, flatType, sectorIndex = 0) {
  const container = form.querySelector(`.admin-layout-rows[data-flat-type="${flatType}"][data-sector-index="${sectorIndex}"]`);
  if (!container) return [];

  const variantPrefix = `sector_${sectorIndex}_variant_${flatType}`;
  const sectorTitle = stripSectorTitle(
    form.querySelector(`[name="sector_${sectorIndex}_title"]`)?.value?.trim() || ''
  );
  const fallbackAreaMin = parseArea(form.querySelector(`[name="${variantPrefix}_areaMin"]`)?.value) ?? 0;
  const fallbackAreaMax = parseArea(form.querySelector(`[name="${variantPrefix}_areaMax"]`)?.value) ?? 0;

  const layouts = [];
  container.querySelectorAll('.admin-layout-row').forEach((row, index) => {
    const prefix = `sector_${sectorIndex}_variant_${flatType}_layout_${index}`;
    let areaMin = parseArea(row.querySelector(`[name="${prefix}_areaMin"]`)?.value) ?? 0;
    let areaMax = parseArea(row.querySelector(`[name="${prefix}_areaMax"]`)?.value) ?? 0;
    let planImg = row.querySelector(`[name="${prefix}_planImg"]`)?.value?.trim() || '';
    const label = row.querySelector(`[name="${prefix}_label"]`)?.value?.trim() || getLayoutLabel(index);
    const key = row.querySelector(`[name="${prefix}_key"]`)?.value?.trim()
      || row.dataset.layoutKey
      || getLayoutKey(index);
    const priceRaw = row.querySelector(`[name="${prefix}_price"]`)?.value;
    const price = priceRaw !== '' && priceRaw != null ? Number(priceRaw) : null;
    const totalApartments = Number(row.querySelector(`[name="${prefix}_totalApartments"]`)?.value) || 0;
    const availableFloors = parseFloorRangesInput(
      row.querySelector(`[name="${prefix}_availableFloors"]`)?.value
    );

    if (!areaMin) areaMin = fallbackAreaMin;
    if (!areaMax) areaMax = fallbackAreaMax || areaMin;

    if (!label && !planImg && !areaMin && !areaMax && !totalApartments && !availableFloors.length) return;

    const layout = {
      key,
      label,
      areaMin,
      areaMax: areaMax || areaMin,
    };
    if (sectorTitle) layout.sectorTitle = sectorTitle;
    if (planImg) layout.planImg = planImg;
    if (Number.isFinite(price)) layout.price = price;
    if (totalApartments > 0) layout.totalApartments = totalApartments;
    if (availableFloors.length) layout.availableFloors = availableFloors;
    layouts.push(layout);
  });

  return layouts;
}

function reindexAdminLayoutRows(container, flatType, sectorIndex = 0) {
  container.querySelectorAll('.admin-layout-row').forEach((row, index) => {
    row.dataset.layoutIndex = String(index);
    const prefix = `sector_${sectorIndex}_variant_${flatType}_layout_${index}`;
    const labelValue = row.querySelector('[name*="_label"]')?.value?.trim() || getLayoutLabel(index);
    const keyValue = row.querySelector('[name*="_key"]')?.value?.trim()
      || row.dataset.layoutKey
      || getLayoutKey(index);
    const fields = {
      key: keyValue,
      label: labelValue,
      areaMin: row.querySelector('[name*="_areaMin"]')?.value ?? '',
      areaMax: row.querySelector('[name*="_areaMax"]')?.value ?? '',
      price: row.querySelector('[name*="_price"]')?.value ?? '',
      totalApartments: row.querySelector('[name*="_totalApartments"]')?.value ?? '',
      availableFloors: row.querySelector('[name*="_availableFloors"]')?.value ?? '',
      planImg: row.querySelector('[name*="_planImg"]')?.value ?? '',
    };

    row.dataset.layoutKey = keyValue;
    row.innerHTML = `
      <div class="admin-layout-row-head">
        <strong>${escapeHtml(fields.label)}</strong>
        <button type="button" class="btn btn-danger btn-sm admin-remove-layout-btn">Удалить</button>
      </div>
      <input type="hidden" name="${prefix}_key" value="${escapeHtml(fields.key)}">
      <div class="admin-form-grid">
        <div class="form-group">
          <label>Подпись</label>
          <input type="text" name="${prefix}_label" value="${escapeHtml(fields.label)}" placeholder="Тип-A">
        </div>
        <div class="form-group">
          <label>Площадь от, м²</label>
          <input type="number" name="${prefix}_areaMin" min="0" step="0.001" value="${fields.areaMin}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Площадь до, м²</label>
          <input type="number" name="${prefix}_areaMax" min="0" step="0.001" value="${fields.areaMax}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Цена от, ₽</label>
          <input type="number" name="${prefix}_price" min="0" value="${fields.price}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Количество квартир</label>
          <input type="number" name="${prefix}_totalApartments" min="0" step="1" value="${fields.totalApartments}" placeholder="—">
        </div>
        <div class="form-group admin-form-full">
          <label>Доступные этажи</label>
          <input type="text" name="${prefix}_availableFloors" value="${escapeHtml(fields.availableFloors)}" placeholder="3-8, 12, 16-20">
          <p class="form-hint">Диапазоны через запятую: 3-8, 12, 16-20</p>
        </div>
        <div class="form-group admin-form-full">
          <label>Планировка (путь к файлу)</label>
          <input type="text" name="${prefix}_planImg" value="${escapeHtml(fields.planImg)}" placeholder="img/properties/plan.jpg">
        </div>
      </div>
    `;
  });
}

function bindAdminLayoutRows(form) {
  if (!form || form.dataset.layoutRowsBound === '1') return;
  form.dataset.layoutRowsBound = '1';

  form.addEventListener('click', (event) => {
    const addBtn = event.target.closest('.admin-add-layout-btn');
    if (addBtn && form.contains(addBtn)) {
      const flatType = addBtn.dataset.flatType;
      const sectorIndex = addBtn.dataset.sectorIndex || '0';
      const container = form.querySelector(`.admin-layout-rows[data-flat-type="${flatType}"][data-sector-index="${sectorIndex}"]`);
      if (!container) return;
      const index = container.querySelectorAll('.admin-layout-row').length;
      container.insertAdjacentHTML('beforeend', renderAdminLayoutRow(flatType, index, {}, Number(sectorIndex)));
      return;
    }

    const removeBtn = event.target.closest('.admin-remove-layout-btn');
    if (removeBtn && form.contains(removeBtn)) {
      const row = removeBtn.closest('.admin-layout-row');
      const container = row?.closest('.admin-layout-rows');
      if (!row || !container) return;
      if (container.querySelectorAll('.admin-layout-row').length <= 1) {
        showToast('Нужна хотя бы одна планировка', 'error');
        return;
      }
      const sectorIndex = Number(container.dataset.sectorIndex || 0);
      row.remove();
      reindexAdminLayoutRows(container, container.dataset.flatType, sectorIndex);
    }
  });
}

function setAdminFlatVariantLayouts(form, flatType, layouts = [], sectorIndex = 0) {
  const container = form.querySelector(`.admin-layout-rows[data-flat-type="${flatType}"][data-sector-index="${sectorIndex}"]`);
  if (!container) return;
  const rows = layouts.length ? layouts : [{}];
  container.innerHTML = rows.map((layout, index) => renderAdminLayoutRow(flatType, index, layout, sectorIndex)).join('');
}

function collectFlatVariantsFromSectorForm(form, sectorIndex) {
  const variants = [];

  for (const flatType of FLAT_TYPE_KEYS) {
    const prefix = `sector_${sectorIndex}_variant_${flatType}`;
    const totalRaw = form.querySelector(`[name="${prefix}_totalApartments"]`)?.value;
    const totalApartments = Number(totalRaw);
    const areaMin = parseArea(form.querySelector(`[name="${prefix}_areaMin"]`)?.value) ?? 0;
    const areaMax = parseArea(form.querySelector(`[name="${prefix}_areaMax"]`)?.value) ?? 0;
    const layouts = collectLayoutsForFlatType(form, flatType, sectorIndex);
    const layoutApartmentSum = layouts.reduce(
      (sum, layout) => sum + (Number(layout.totalApartments) || 0),
      0
    );
    const hasVariantData = (totalApartments >= 1)
      || layoutApartmentSum > 0
      || layouts.length > 0
      || areaMin > 0
      || areaMax > 0;

    if (!hasVariantData) continue;

    if (areaMin && areaMax && areaMin > areaMax) {
      return { error: `Сектор ${sectorIndex + 1}, «${getFlatTypeLabel(flatType)}»: минимум больше максимума` };
    }

    const effectiveTotal = layoutApartmentSum > 0
      ? layoutApartmentSum
      : totalApartments;

    if (!effectiveTotal || effectiveTotal < 1) {
      return {
        error: `Сектор ${sectorIndex + 1}, «${getFlatTypeLabel(flatType)}»: укажите количество квартир для типа или для каждой планировки`,
      };
    }

    const priceRaw = form.querySelector(`[name="${prefix}_price"]`)?.value;
    const price = priceRaw !== '' && priceRaw != null ? Number(priceRaw) : null;

    const variant = {
      flatType,
      totalApartments: effectiveTotal,
      areaMin,
      areaMax: areaMax || areaMin,
    };
    if (Number.isFinite(price)) variant.price = price;

    if (layouts.length > 1) {
      variant.layouts = layouts;
      variant.planImg = layouts[0]?.planImg || '';
    } else if (layouts.length === 1) {
      if (layouts[0].planImg) variant.planImg = layouts[0].planImg;
      if (layouts[0].areaMin) variant.areaMin = layouts[0].areaMin;
      if (layouts[0].areaMax) variant.areaMax = layouts[0].areaMax;
      if (layouts[0].price != null) variant.price = layouts[0].price;
      variant.layouts = layouts;
    }

    variants.push(variant);
  }

  return { variants };
}

function collectSectorsFromForm(form) {
  const sectorPanels = [...form.querySelectorAll('.admin-sector-panel')];
  const sectors = [];

  for (const panel of sectorPanels) {
    const sectorIndex = panel.dataset.sectorIndex;
    const title = form.querySelector(`[name="sector_${sectorIndex}_title"]`)?.value?.trim();
    const id = form.querySelector(`[name="sector_${sectorIndex}_id"]`)?.value?.trim()
      || generateSectorId(title || `sector-${sectorIndex}`);

    if (!title) {
      return { error: `Укажите название сектора ${Number(sectorIndex) + 1}` };
    }

    const variantResult = collectFlatVariantsFromSectorForm(form, Number(sectorIndex));
    if (variantResult.error) return variantResult;

    if (!variantResult.variants.length) {
      return { error: `В секторе «${title}» укажите хотя бы один тип квартир с количеством` };
    }

    sectors.push({
      id,
      title: formatSectorTitle(title),
      flatVariants: variantResult.variants,
    });
  }

  if (!sectors.length) {
    return { error: 'Добавьте хотя бы один сектор с типами квартир' };
  }

  return { sectors: sortSectorsAlphabetically(sectors) };
}

function collectFloorPriceRangesFromForm(form) {
  const container = form.querySelector('#floorPriceRows');
  if (!container) return [];

  const ranges = [];
  container.querySelectorAll('.admin-floor-price-row').forEach((row, index) => {
    const prefix = `floorPrice_${index}`;
    const floorMin = parseFloorNumber(row.querySelector(`[name="${prefix}_floorMin"]`)?.value);
    const floorMax = parseFloorNumber(row.querySelector(`[name="${prefix}_floorMax"]`)?.value) || floorMin;
    const price = Number(row.querySelector(`[name="${prefix}_price"]`)?.value);

    if (!floorMin && !price) return;

    ranges.push({
      floorMin,
      floorMax,
      price: Number.isFinite(price) ? price : 0,
    });
  });

  for (const range of ranges) {
    if (!range.floorMin) {
      return { error: 'Укажите этаж «от» для каждого диапазона цен' };
    }
    if (range.floorMax < range.floorMin) {
      return { error: 'В диапазоне цен этаж «до» не может быть меньше этажа «от»' };
    }
    if (!range.price || range.price <= 0) {
      return { error: 'Укажите цену для каждого диапазона этажей' };
    }
  }

  return { ranges: normalizeFloorPriceRanges(ranges) };
}

function fillFloorPricesForm(form, property) {
  const container = form.querySelector('#floorPriceRows');
  if (!container) return;

  const ranges = getPropertyFloorPriceRanges(property);
  container.innerHTML = ranges.length
    ? ranges.map((range, index) => renderAdminFloorPriceRow(index, range)).join('')
    : '<p class="form-hint admin-floor-prices-empty">Диапазоны не заданы — используется общая цена объекта.</p>';
}

function reindexAdminFloorPriceRows(container) {
  container.querySelectorAll('.admin-floor-price-row').forEach((row, index) => {
    row.dataset.floorPriceIndex = String(index);
    const prefix = `floorPrice_${index}`;
    const floorMin = row.querySelector('[name*="_floorMin"]')?.value ?? '';
    const floorMax = row.querySelector('[name*="_floorMax"]')?.value ?? '';
    const price = row.querySelector('[name*="_price"]')?.value ?? '';

    row.innerHTML = `
      <div class="admin-floor-price-row-head">
        <strong>Диапазон ${index + 1}</strong>
        <button type="button" class="btn btn-danger btn-sm admin-remove-floor-price-btn">Удалить</button>
      </div>
      <div class="admin-form-grid">
        <div class="form-group">
          <label>Этаж от</label>
          <input type="number" name="${prefix}_floorMin" min="1" step="1" value="${floorMin}" placeholder="3">
        </div>
        <div class="form-group">
          <label>Этаж до</label>
          <input type="number" name="${prefix}_floorMax" min="1" step="1" value="${floorMax}" placeholder="8">
        </div>
        <div class="form-group">
          <label>Цена, ₽</label>
          <input type="number" name="${prefix}_price" min="0" step="1" value="${price}" placeholder="9000000">
        </div>
      </div>
    `;
  });
}

function bindAdminFloorPriceRows(form) {
  if (!form || form.dataset.floorPriceRowsBound === '1') return;
  form.dataset.floorPriceRowsBound = '1';

  form.addEventListener('click', (event) => {
    if (event.target.closest('#addFloorPriceBtn') && form.contains(event.target)) {
      const container = form.querySelector('#floorPriceRows');
      if (!container) return;

      const emptyHint = container.querySelector('.admin-floor-prices-empty');
      if (emptyHint) emptyHint.remove();

      const index = container.querySelectorAll('.admin-floor-price-row').length;
      container.insertAdjacentHTML('beforeend', renderAdminFloorPriceRow(index, {}));
      return;
    }

    const removeBtn = event.target.closest('.admin-remove-floor-price-btn');
    if (!removeBtn || !form.contains(removeBtn)) return;

    const row = removeBtn.closest('.admin-floor-price-row');
    const container = row?.closest('#floorPriceRows');
    if (!row || !container) return;

    row.remove();
    reindexAdminFloorPriceRows(container);

    if (!container.querySelectorAll('.admin-floor-price-row').length) {
      container.innerHTML = '<p class="form-hint admin-floor-prices-empty">Диапазоны не заданы — используется общая цена объекта.</p>';
    }
  });
}

function fillSectorFormPanel(form, sector, sectorIndex) {
  form.querySelector(`[name="sector_${sectorIndex}_title"]`).value = stripSectorTitle(sector.title || '');
  form.querySelector(`[name="sector_${sectorIndex}_id"]`).value = sector.id || '';

  const byType = Object.fromEntries((sector.flatVariants || []).map(variant => [variant.flatType, variant]));

  for (const flatType of FLAT_TYPE_KEYS) {
    const variant = byType[flatType];
    const prefix = `sector_${sectorIndex}_variant_${flatType}`;
    const totalInput = form.querySelector(`[name="${prefix}_totalApartments"]`);
    const areaMinInput = form.querySelector(`[name="${prefix}_areaMin"]`);
    const areaMaxInput = form.querySelector(`[name="${prefix}_areaMax"]`);
    const priceInput = form.querySelector(`[name="${prefix}_price"]`);

    if (totalInput) totalInput.value = variant?.totalApartments || '';
    if (areaMinInput) areaMinInput.value = variant?.areaMin || '';
    if (areaMaxInput) areaMaxInput.value = variant?.areaMax || '';
    if (priceInput) priceInput.value = variant?.price ?? '';

    const layouts = variant?.layouts?.length
      ? variant.layouts
      : (variant?.planImg || variant?.areaMin || variant?.areaMax
        ? [{
          label: variant.layouts?.[0]?.label,
          planImg: variant.planImg,
          areaMin: variant.areaMin,
          areaMax: variant.areaMax,
          price: variant.price,
        }]
        : [{}]);
    setAdminFlatVariantLayouts(form, flatType, layouts, sectorIndex);
  }
}

function fillSectorsForm(form, property) {
  if (!form) return;

  const sectors = isComplex(property) ? getComplexSectors(property) : [{ title: 'A' }];
  const sectorRows = form.querySelector('#sectorRows');
  if (sectorRows) {
    sectorRows.innerHTML = sectors.map((sector, index) => renderAdminSectorPanel(sector, index)).join('');
    sectors.forEach((sector, index) => fillSectorFormPanel(form, sector, index));
  }

  if (form.flatType) {
    form.flatType.value = property.flatType || getComplexFlatVariants(property)[0]?.flatType || '1room';
  }

  fillFloorPricesForm(form, property);
}

function clearSectorsForm(form) {
  if (!form) return;

  const sectorRows = form.querySelector('#sectorRows');
  if (sectorRows) {
    sectorRows.innerHTML = renderAdminSectorPanel({ title: 'A' }, 0);
  }

  fillFloorPricesForm(form, {});

  if (form.flatType) form.flatType.value = '1room';
}

function reindexAdminSectorPanels(form) {
  const sectorRows = form.querySelector('#sectorRows');
  if (!sectorRows) return;

  const panels = [...sectorRows.querySelectorAll('.admin-sector-panel')];
  const saved = panels.map((panel, nextIndex) => {
    const oldIndex = panel.dataset.sectorIndex;
    const sector = {
      id: form.querySelector(`[name="sector_${oldIndex}_id"]`)?.value || '',
      title: form.querySelector(`[name="sector_${oldIndex}_title"]`)?.value || '',
      flatVariants: collectFlatVariantsFromSectorForm(form, Number(oldIndex)).variants,
    };
    return { sector, oldIndex, nextIndex };
  });

  sectorRows.innerHTML = saved.map(({ sector }, index) => renderAdminSectorPanel(sector, index)).join('');
  saved.forEach(({ sector }, index) => fillSectorFormPanel(form, sector, index));
}

function bindAdminSectorRows(form) {
  if (!form || form.dataset.sectorRowsBound === '1') return;
  form.dataset.sectorRowsBound = '1';

  form.addEventListener('click', (event) => {
    if (event.target.closest('#addSectorBtn')) {
      const sectorRows = form.querySelector('#sectorRows');
      if (!sectorRows) return;
      const nextIndex = sectorRows.querySelectorAll('.admin-sector-panel').length;
      sectorRows.insertAdjacentHTML(
        'beforeend',
        renderAdminSectorPanel({ title: String.fromCharCode(65 + nextIndex) }, nextIndex)
      );
      return;
    }

    const removeBtn = event.target.closest('.admin-remove-sector-btn');
    if (!removeBtn || !form.contains(removeBtn)) return;

    const sectorRows = form.querySelector('#sectorRows');
    const panels = sectorRows?.querySelectorAll('.admin-sector-panel') || [];
    if (panels.length <= 1) {
      showToast('Нужен хотя бы один сектор', 'error');
      return;
    }

    removeBtn.closest('.admin-sector-panel')?.remove();
    reindexAdminSectorPanels(form);
  });
}

function formatComplexVariantsAdminSummary(property) {
  const sectors = getComplexSectors(property);
  const variants = getComplexFlatVariants(property);
  const variantSummary = variants
    .map(variant => `${variant.flatTypeShortLabel} · ${variant.totalApartments}`)
    .join(', ');
  if (sectors.length > 1) {
    return `${sectors.length} сект. · ${variantSummary}`;
  }
  return variantSummary;
}

function renderPropertiesAdmin() {
  const properties = getProperties();

  return `
    <div class="admin-header">
      <h1>Объекты недвижимости</h1>
      <button class="btn btn-primary btn-sm" id="addPropertyBtn">+ Добавить объект</button>
    </div>

    <div id="propertyFormWrap" style="display:none;margin-bottom:24px">
      <div class="account-content">
        <h2 id="propertyFormTitle">Добавить объект</h2>
        <form id="propertyEditForm">
          <input type="hidden" name="editId" value="">
          <div class="admin-form-grid">
            <div class="form-group">
              <label>Название</label>
              <input type="text" name="title" required>
            </div>
            <div class="form-group">
              <label>Тип</label>
              <select name="type" required>
                <option value="jk">ЖК</option>
                <option value="mfk">МФК</option>
                <option value="commercial">Коммерческое</option>
              </select>
            </div>
            <div id="complexFields" class="admin-form-full">
              ${renderAdminSectorsEditor()}
            </div>
            <div class="form-group" id="areaField">
              <label>Площадь, м²</label>
              <input type="number" name="area" min="0.001" step="0.001">
            </div>
            <div class="form-group">
              <label>Цена, ₽</label>
              <input type="number" name="price" min="0">
            </div>
            <div class="form-group">
              <label>Адрес</label>
              <input type="text" name="address">
            </div>
            <div class="form-group">
              <label>Район</label>
              <input type="text" name="district" placeholder="ЦАО, ВАО, САО...">
            </div>
            <div class="form-group">
              <label>Застройщик</label>
              <input type="text" name="developer" value="${escapeHtml(DEFAULT_DEVELOPER)}" placeholder="Кормат строй">
            </div>
            <div class="form-group">
              <label>Общий срок рассрочки</label>
              <input type="text" name="installmentTerm" placeholder="например, 24 месяца">
            </div>
            <div class="form-group">
              <label>Срок сдачи объекта</label>
              <input type="text" name="deliveryDate" placeholder="например, 4 кв. 2026">
            </div>
            <div class="form-group">
              <label>Материнский капитал</label>
              <select name="maternityCapital">
                <option value="">—</option>
                ${Object.entries(MATERNITY_CAPITAL_OPTIONS).map(([value, label]) => `
                  <option value="${value}">${escapeHtml(label)}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Наценка</label>
              <select name="markupBasis">
                <option value="">—</option>
                ${Object.entries(MARKUP_BASIS_OPTIONS).map(([value, label]) => `
                  <option value="${value}">${escapeHtml(label)}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Без наценки</label>
              <select name="noMarkupYears" required>
                ${Object.entries(NO_MARKUP_YEARS).map(([value]) => `
                  <option value="${value}">${escapeHtml(getNoMarkupYearsFilterLabel(value))}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Обязательный платёж, ₽/м²</label>
              <select name="mandatoryPayment" required>
                ${Object.entries(MANDATORY_PAYMENT_OPTIONS).map(([value]) => `
                  <option value="${value}">${escapeHtml(getMandatoryPaymentLabel(value))}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group admin-form-full">
              <label>Изображение (путь к файлу)</label>
              <input type="text" name="img" value="" placeholder="img/properties/photo.jpg">
            </div>
            <div class="form-group admin-form-full">
              <label>Загрузить с компьютера</label>
              <input type="file" id="propertyImageFile" accept="image/*" multiple>
              <p class="form-hint">Можно выбрать несколько фото. Или положите файлы в img/properties/ и укажите пути ниже</p>
            </div>
            <div class="form-group admin-form-full">
              <label>Галерея изображений</label>
              <textarea name="images" id="propertyImagesField" rows="4" placeholder="По одному пути на строку&#10;img/properties/photo1.jpg&#10;img/properties/photo2.jpg"></textarea>
            </div>
            <div class="form-group admin-form-full" id="propertyGalleryPreviewWrap" style="display:none">
              <label>Миниатюры галереи</label>
              <div class="admin-img-gallery" id="propertyGalleryPreview"></div>
            </div>
            <div class="form-group admin-form-full">
              <label>Предпросмотр фото</label>
              <div class="admin-img-preview">
                <img id="propertyImgPreview" src="${resolveImageSrc(DEFAULT_IMG)}" alt="Предпросмотр">
              </div>
            </div>
            <div class="form-group admin-form-full">
              <label>Описание</label>
              <textarea name="description" rows="4"></textarea>
            </div>
            <div class="form-group admin-form-full">
              <label class="checkbox-label">
                <input type="checkbox" name="published" checked>
                Опубликовать на сайте
              </label>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Сохранить</button>
            <button type="button" class="btn btn-secondary" id="cancelPropertyBtn">Отмена</button>
          </div>
        </form>
      </div>
    </div>

    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Объект</th>
            <th>Тип</th>
            <th>Квартир / м²</th>
            <th>Тип квартир</th>
            <th>Район</th>
            <th>Цена</th>
            <th>Статус</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${properties.length ? properties.map(renderPropertyRow).join('') : `
            <tr><td colspan="8" class="empty-cell">Объектов пока нет</td></tr>
          `}
        </tbody>
      </table>
    </div>
  `;
}

function renderPropertyRow(property) {
  const sizeCell = isComplex(property)
    ? getComplexFlatVariants(property).reduce((sum, variant) => sum + (Number(variant.totalApartments) || 0), 0)
    : `${formatArea(property.area)} м²`;
  const breakdownCell = isComplex(property)
    ? formatComplexVariantsAdminSummary(property) || '—'
    : '—';

  return `
    <tr>
      <td>
        <div class="admin-item-title">
          <img class="admin-product-thumb" src="${escapeHtml(resolveImageSrc(getPropertyImg(property)))}" alt="">
          ${escapeHtml(property.title)}
        </div>
        <div class="admin-item-sub">${escapeHtml(property.address || '')}</div>
      </td>
      <td>${escapeHtml(TYPE_LABELS[property.type] || property.type)}</td>
      <td>${sizeCell}</td>
      <td>${breakdownCell}</td>
      <td>${escapeHtml(property.district || '—')}</td>
      <td>${formatPrice(property.price)}</td>
      <td>
        <span class="status-badge ${property.published !== false ? 'published' : 'draft'}">
          ${property.published !== false ? 'Опубликован' : 'Черновик'}
        </span>
      </td>
      <td class="admin-actions">
        <button class="btn btn-secondary btn-sm edit-property-btn" data-id="${escapeHtml(property.id)}">Изменить</button>
        <button class="btn btn-danger btn-sm delete-property-btn" data-id="${escapeHtml(property.id)}">Удалить</button>
      </td>
    </tr>
  `;
}

function bindPropertiesAdmin() {
  const formWrap = document.getElementById('propertyFormWrap');
  const form = document.getElementById('propertyEditForm');
  const addBtn = document.getElementById('addPropertyBtn');
  const cancelBtn = document.getElementById('cancelPropertyBtn');
  const typeSelect = form?.querySelector('[name="type"]');
  const imgInput = form?.querySelector('[name="img"]');
  const imagesField = document.getElementById('propertyImagesField');
  const imageFileInput = document.getElementById('propertyImageFile');
  const imagePreview = document.getElementById('propertyImgPreview');
  const galleryPreviewWrap = document.getElementById('propertyGalleryPreviewWrap');
  const galleryPreview = document.getElementById('propertyGalleryPreview');

  function getFormGalleryImages() {
    return parsePropertyImages(imagesField?.value) || [];
  }

  function setFormGalleryImages(images) {
    if (!imagesField) return;
    imagesField.value = formatPropertyImages(images);
    renderGalleryPreview();
  }

  function renderGalleryPreview() {
    if (!galleryPreview || !galleryPreviewWrap) return;

    const images = getFormGalleryImages();
    const normalized = normalizePropertyImages({
      img: images[0] || imgInput?.value.trim() || '',
      images,
    });

    if (normalized.images.length < 2) {
      galleryPreviewWrap.style.display = 'none';
      galleryPreview.innerHTML = '';
      return;
    }

    galleryPreviewWrap.style.display = '';
    const fallback = escapeAttr(assetPath(DEFAULT_IMG));
    galleryPreview.innerHTML = normalized.images.map((src, index) => `
      <div class="admin-img-gallery-item">
        <img src="${escapeAttr(resolveImageSrc(src))}" alt="Фото ${index + 1}" onerror="this.src='${fallback}'">
      </div>
    `).join('');
  }

  function syncFormMainImage(mainSrc) {
    const main = mainSrc?.trim() || '';
    if (!main || !imagesField || isPlaceholderImage(main)) return;

    const gallery = getFormGalleryImages().filter(src => !isBrokenImageSrc(src));
    const normalized = normalizePropertyImages({
      img: main,
      images: uniqueImages([main, ...gallery.filter(src => src !== main)]),
    });
    imagesField.value = formatPropertyImages(normalized.images);
    if (imgInput) imgInput.value = normalized.img;
    updatePropertyImagePreview(normalized.img);
  }

  function syncFormImgFromGallery() {
    const images = getFormGalleryImages();
    const normalized = normalizePropertyImages({
      img: images[0] || '',
      images,
    });
    if (imgInput) imgInput.value = normalized.img;
    if (imagesField) imagesField.value = formatPropertyImages(normalized.images);
    updatePropertyImagePreview(normalized.img);
  }

  function updatePropertyImagePreview(src) {
    if (!imagePreview) return;
    imagePreview.src = resolveImageSrc(src || DEFAULT_IMG);
    imagePreview.onerror = () => {
      imagePreview.src = resolveImageSrc(DEFAULT_IMG);
    };
    renderGalleryPreview();
  }

  function bindImageFields() {
    imgInput?.addEventListener('input', () => {
      syncFormMainImage(imgInput.value.trim());
    });

    imagesField?.addEventListener('input', () => {
      syncFormImgFromGallery();
    });

    imageFileInput?.addEventListener('change', async () => {
      const files = [...(imageFileInput.files || [])];
      if (!files.length) return;

      const uploaded = [];
      for (const file of files) {
        try {
          uploaded.push(await readImageFile(file));
        } catch (error) {
          if (error.message === 'not an image') {
            showToast(`Файл «${file.name}» не является изображением`, 'error');
          } else if (error.message === 'too large') {
            showToast(`Файл «${file.name}» слишком большой (макс. 2 МБ)`, 'error');
          } else {
            showToast(`Не удалось загрузить «${file.name}»`, 'error');
          }
        }
      }

      if (uploaded.length) {
        const existing = getFormGalleryImages().filter(src => !isBrokenImageSrc(src));
        const imgVal = imgInput?.value.trim() || '';
        const normalized = isPlaceholderImage(imgVal)
          ? normalizePropertyImages({ img: uploaded[0], images: [...uploaded, ...existing] })
          : normalizePropertyImages({ img: imgVal, images: [...existing, ...uploaded] });
        if (imgInput) imgInput.value = normalized.img;
        setFormGalleryImages(normalized.images);
        updatePropertyImagePreview(normalized.img);
        showToast(uploaded.length === 1 ? 'Фото добавлено в галерею' : `Добавлено фото: ${uploaded.length}`, 'success');
      }

      imageFileInput.value = '';
    });
  }

  function toggleTypeFields(clearValues = false) {
    const complexFields = document.getElementById('complexFields');
    const areaField = document.getElementById('areaField');
    const areaInput = form.querySelector('[name="area"]');
    const isCommercial = typeSelect.value === 'commercial';

    if (complexFields) complexFields.style.display = isCommercial ? 'none' : '';
    if (areaField) areaField.style.display = isCommercial ? '' : 'none';
    if (areaInput) areaInput.required = isCommercial;

    if (clearValues) {
      if (isCommercial) {
        clearSectorsForm(form);
        if (areaInput) areaInput.value = '';
      } else {
        clearSectorsForm(form);
        if (areaInput) areaInput.value = '';
      }
    }
  }

  addBtn?.addEventListener('click', () => {
    form.reset();
    form.editId.value = '';
    form.type.value = 'jk';
    form.img.value = '';
    if (imagesField) imagesField.value = '';
    form.published.checked = true;
    if (imageFileInput) imageFileInput.value = '';
    clearSectorsForm(form);
    renderGalleryPreview();
    document.getElementById('propertyFormTitle').textContent = 'Добавить объект';
    formWrap.style.display = 'block';
    toggleTypeFields();
    updatePropertyImagePreview('');
  });

  cancelBtn?.addEventListener('click', () => {
    formWrap.style.display = 'none';
  });

  typeSelect?.addEventListener('change', () => toggleTypeFields(true));
  toggleTypeFields();
  bindImageFields();
  bindAdminLayoutRows(form);
  bindAdminSectorRows(form);
  bindAdminFloorPriceRows(form);

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const type = formData.get('type');
    const priceValue = formData.get('price');

    if (!formData.get('title')?.toString().trim()) {
      showToast('Укажите название объекта', 'error');
      return;
    }

    const noMarkupYears = Number(formData.get('noMarkupYears'));
    const mandatoryPayment = Number(formData.get('mandatoryPayment'));
    if (!NO_MARKUP_YEARS[noMarkupYears]) {
      showToast('Выберите срок без наценки', 'error');
      return;
    }
    if (!MANDATORY_PAYMENT_OPTIONS[mandatoryPayment]) {
      showToast('Выберите обязательный платёж', 'error');
      return;
    }

    const galleryImages = parsePropertyImages(formData.get('images')?.toString()) || [];
    const imgField = formData.get('img')?.toString().trim() || '';
    const normalizedImages = normalizePropertyImages({
      img: galleryImages[0] || imgField,
      images: galleryImages.length ? galleryImages : (imgField ? [imgField] : []),
    });

    const property = {
      id: formData.get('editId') || generatePropertyId(),
      title: formData.get('title').toString().trim(),
      description: formData.get('description')?.toString().trim() || '',
      type,
      price: priceValue ? Number(priceValue) : null,
      address: formData.get('address')?.toString().trim() || '',
      district: formData.get('district')?.toString().trim() || '',
      developer: formData.get('developer')?.toString().trim() || DEFAULT_DEVELOPER,
      installmentTerm: formData.get('installmentTerm')?.toString().trim() || '',
      deliveryDate: formData.get('deliveryDate')?.toString().trim() || '',
      maternityCapital: formData.get('maternityCapital')?.toString() || '',
      markupBasis: formData.get('markupBasis')?.toString() || '',
      noMarkupYears,
      mandatoryPayment,
      img: normalizedImages.img,
      images: normalizedImages.images,
      published: formData.get('published') === 'on',
    };

    if (isComplex({ type })) {
      const sectorResult = collectSectorsFromForm(form);
      if (sectorResult.error) {
        showToast(sectorResult.error, 'error');
        return;
      }

      const floorPriceResult = collectFloorPriceRangesFromForm(form);
      if (floorPriceResult.error) {
        showToast(floorPriceResult.error, 'error');
        return;
      }

      const sectors = sectorResult.sectors;
      const flatVariants = mergeAggregatedFlatVariants(sectors.flatMap(sector => sector.flatVariants));
      if (!flatVariants.length) {
        showToast('Укажите хотя бы один тип квартир с количеством', 'error');
        return;
      }

      const flatType = formData.get('flatType')?.toString();
      const primary = flatVariants.find(variant => variant.flatType === flatType) || flatVariants[0];

      if (flatType && !flatVariants.some(variant => variant.flatType === flatType)) {
        showToast('Основной тип должен быть среди заполненных', 'error');
        return;
      }

      property.sectors = sectors;
      property.flatVariants = flatVariants;
      property.flatType = primary.flatType;
      property.totalApartments = flatVariants.reduce((sum, variant) => sum + (Number(variant.totalApartments) || 0), 0);
      property.areaMin = Math.min(...flatVariants.map(variant => Number(variant.areaMin) || 0).filter(Boolean));
      property.areaMax = Math.max(...flatVariants.map(variant => Number(variant.areaMax) || 0).filter(Boolean));
      if (!property.areaMin) property.areaMin = primary.areaMin;
      if (!property.areaMax) property.areaMax = primary.areaMax || primary.areaMin;

      if (floorPriceResult.ranges?.length) {
        property.floorPriceRanges = floorPriceResult.ranges;
      } else {
        delete property.floorPriceRanges;
      }
    } else {
      const area = parseArea(formData.get('area'));
      if (area == null || area <= 0) {
        showToast('Укажите корректную площадь', 'error');
        return;
      }
      property.area = area;
    }

    let properties = getProperties();
    const editId = formData.get('editId');

    if (editId) {
      properties = properties.map(item => item.id === editId ? property : item);
      showToast('Объект обновлён', 'success');
    } else {
      properties.unshift(property);
      showToast('Объект добавлен', 'success');
    }

    saveProperties(properties);
    formWrap.style.display = 'none';
    renderAdminSection('properties');
    bindPropertiesAdmin();
  });

  document.querySelectorAll('.edit-property-btn').forEach(button => {
    button.addEventListener('click', () => {
      const property = getPropertyById(button.dataset.id);
      if (!property) return;

      form.editId.value = property.id;
      form.title.value = property.title;
      form.type.value = property.type;

      if (isComplex(property)) {
        fillSectorsForm(form, property);
        form.area.value = '';
      } else {
        form.area.value = property.area ?? '';
        clearFlatVariantsForm(form);
      }

      form.price.value = property.price ?? '';
      form.address.value = property.address || '';
      form.district.value = property.district || '';
      form.developer.value = property.developer || DEFAULT_DEVELOPER;
      form.installmentTerm.value = property.installmentTerm || '';
      form.deliveryDate.value = property.deliveryDate || '';
      form.maternityCapital.value = property.maternityCapital || '';
      form.markupBasis.value = property.markupBasis || '';
      form.noMarkupYears.value = property.noMarkupYears ?? 1;
      form.mandatoryPayment.value = property.mandatoryPayment ?? 3000;
      const normalizedImages = normalizePropertyImages(property);
      form.img.value = normalizedImages.img;
      if (imagesField) {
        imagesField.value = formatPropertyImages(normalizedImages.images);
      }
      form.description.value = property.description || '';
      form.published.checked = property.published !== false;
      if (imageFileInput) imageFileInput.value = '';

      document.getElementById('propertyFormTitle').textContent = 'Редактировать объект';
      formWrap.style.display = 'block';
      toggleTypeFields();
      updatePropertyImagePreview(normalizedImages.img);
      renderGalleryPreview();
    });
  });

  document.querySelectorAll('.delete-property-btn').forEach(button => {
    button.addEventListener('click', () => {
      if (!confirm('Удалить этот объект?')) return;
      const properties = getProperties().filter(item => item.id !== button.dataset.id);
      saveProperties(properties);
      showToast('Объект удалён', 'success');
      renderAdminSection('properties');
      bindPropertiesAdmin();
    });
  });
}
