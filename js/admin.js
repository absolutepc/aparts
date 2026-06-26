let adminSection = 'properties';

function initAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    document.getElementById('adminGate').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    bindAdminLogin();
    return;
  }

  document.getElementById('adminGate').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'grid';
  renderAdminSection('properties');
  bindAdminNav();
}

function bindAdminLogin() {
  const form = document.getElementById('adminLoginForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value;
    const result = loginUser(email, password);

    if (result.success && result.isAdmin) {
      showToast('Добро пожаловать, администратор!', 'success');
      initAdmin();
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

function renderAdminLayoutRow(flatType, index, layout = {}) {
  const label = layout.label || getLayoutLabel(index);
  return `
    <div class="admin-layout-row" data-flat-type="${escapeHtml(flatType)}" data-layout-index="${index}">
      <div class="admin-layout-row-head">
        <strong>${escapeHtml(label)}</strong>
        <button type="button" class="btn btn-danger btn-sm admin-remove-layout-btn">Удалить</button>
      </div>
      <div class="admin-form-grid">
        <div class="form-group">
          <label>Площадь от, м²</label>
          <input type="number" name="variant_${escapeHtml(flatType)}_layout_${index}_areaMin" min="0" step="0.001" value="${layout.areaMin ?? ''}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Площадь до, м²</label>
          <input type="number" name="variant_${escapeHtml(flatType)}_layout_${index}_areaMax" min="0" step="0.001" value="${layout.areaMax ?? ''}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Цена от, ₽</label>
          <input type="number" name="variant_${escapeHtml(flatType)}_layout_${index}_price" min="0" value="${layout.price ?? ''}" placeholder="—">
        </div>
        <div class="form-group admin-form-full">
          <label>Планировка (путь к файлу)</label>
          <input type="text" name="variant_${escapeHtml(flatType)}_layout_${index}_planImg" value="${escapeHtml(layout.planImg || '')}" placeholder="img/properties/plan.jpg">
        </div>
      </div>
    </div>
  `;
}

function renderAdminFlatVariantLayouts(flatType, layouts = [{}]) {
  const rows = layouts.length ? layouts : [{}];
  return `
    <div class="admin-layout-editor">
      <p class="form-hint">Добавьте несколько планировок (А, Б, В…), если у типа есть варианты. Одна планировка — переключатель на сайте не показывается.</p>
      <div class="admin-layout-rows" data-flat-type="${escapeHtml(flatType)}">
        ${rows.map((layout, index) => renderAdminLayoutRow(flatType, index, layout)).join('')}
      </div>
      <button type="button" class="btn btn-secondary btn-sm admin-add-layout-btn" data-flat-type="${escapeHtml(flatType)}">+ Добавить планировку</button>
    </div>
  `;
}

function renderAdminFlatVariantRow(flatType) {
  const label = getFlatTypeLabel(flatType);
  return `
    <fieldset class="admin-flat-variant-row" data-flat-type="${escapeHtml(flatType)}">
      <legend>${escapeHtml(label)}</legend>
      <div class="admin-form-grid">
        <div class="form-group">
          <label>Количество квартир</label>
          <input type="number" name="variant_${escapeHtml(flatType)}_totalApartments" min="0" step="1" placeholder="—">
        </div>
        <div class="form-group">
          <label>Площадь от, м²</label>
          <input type="number" name="variant_${escapeHtml(flatType)}_areaMin" min="0" step="0.001" placeholder="—">
        </div>
        <div class="form-group">
          <label>Площадь до, м²</label>
          <input type="number" name="variant_${escapeHtml(flatType)}_areaMax" min="0" step="0.001" placeholder="—">
        </div>
        <div class="form-group">
          <label>Цена от, ₽</label>
          <input type="number" name="variant_${escapeHtml(flatType)}_price" min="0" placeholder="—">
        </div>
        <div class="form-group admin-form-full">
          ${renderAdminFlatVariantLayouts(flatType)}
        </div>
      </div>
    </fieldset>
  `;
}

function collectLayoutsForFlatType(form, flatType) {
  const container = form.querySelector(`.admin-layout-rows[data-flat-type="${flatType}"]`);
  if (!container) return [];

  const layouts = [];
  container.querySelectorAll('.admin-layout-row').forEach((row, index) => {
    const areaMin = parseArea(row.querySelector(`[name="variant_${flatType}_layout_${index}_areaMin"]`)?.value) ?? 0;
    const areaMax = parseArea(row.querySelector(`[name="variant_${flatType}_layout_${index}_areaMax"]`)?.value) ?? 0;
    const planImg = row.querySelector(`[name="variant_${flatType}_layout_${index}_planImg"]`)?.value?.trim() || '';
    const priceRaw = row.querySelector(`[name="variant_${flatType}_layout_${index}_price"]`)?.value;
    const price = priceRaw !== '' && priceRaw != null ? Number(priceRaw) : null;

    if (!planImg && !areaMin && !areaMax) return;

    const layout = {
      key: getLayoutKey(index),
      label: getLayoutLabel(index),
      areaMin,
      areaMax: areaMax || areaMin,
    };
    if (planImg) layout.planImg = planImg;
    if (Number.isFinite(price)) layout.price = price;
    layouts.push(layout);
  });

  return layouts;
}

function reindexAdminLayoutRows(container, flatType) {
  container.querySelectorAll('.admin-layout-row').forEach((row, index) => {
    row.dataset.layoutIndex = String(index);
    row.querySelector('.admin-layout-row-head strong').textContent = getLayoutLabel(index);

    const fields = [
      ['areaMin', row.querySelector('[name*="_areaMin"]')?.value ?? ''],
      ['areaMax', row.querySelector('[name*="_areaMax"]')?.value ?? ''],
      ['price', row.querySelector('[name*="_price"]')?.value ?? ''],
      ['planImg', row.querySelector('[name*="_planImg"]')?.value ?? ''],
    ];

    row.innerHTML = `
      <div class="admin-layout-row-head">
        <strong>${escapeHtml(getLayoutLabel(index))}</strong>
        <button type="button" class="btn btn-danger btn-sm admin-remove-layout-btn">Удалить</button>
      </div>
      <div class="admin-form-grid">
        <div class="form-group">
          <label>Площадь от, м²</label>
          <input type="number" name="variant_${escapeHtml(flatType)}_layout_${index}_areaMin" min="0" step="0.001" value="${fields[0][1]}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Площадь до, м²</label>
          <input type="number" name="variant_${escapeHtml(flatType)}_layout_${index}_areaMax" min="0" step="0.001" value="${fields[1][1]}" placeholder="—">
        </div>
        <div class="form-group">
          <label>Цена от, ₽</label>
          <input type="number" name="variant_${escapeHtml(flatType)}_layout_${index}_price" min="0" value="${fields[2][1]}" placeholder="—">
        </div>
        <div class="form-group admin-form-full">
          <label>Планировка (путь к файлу)</label>
          <input type="text" name="variant_${escapeHtml(flatType)}_layout_${index}_planImg" value="${escapeHtml(fields[3][1])}" placeholder="img/properties/plan.jpg">
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
      const container = form.querySelector(`.admin-layout-rows[data-flat-type="${flatType}"]`);
      if (!container) return;
      const index = container.querySelectorAll('.admin-layout-row').length;
      container.insertAdjacentHTML('beforeend', renderAdminLayoutRow(flatType, index));
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
      row.remove();
      reindexAdminLayoutRows(container, container.dataset.flatType);
    }
  });
}

function setAdminFlatVariantLayouts(form, flatType, layouts = []) {
  const container = form.querySelector(`.admin-layout-rows[data-flat-type="${flatType}"]`);
  if (!container) return;
  const rows = layouts.length ? layouts : [{}];
  container.innerHTML = rows.map((layout, index) => renderAdminLayoutRow(flatType, index, layout)).join('');
}

function collectFlatVariantsFromForm(form) {
  const variants = [];

  for (const flatType of FLAT_TYPE_KEYS) {
    const totalApartments = Number(form.querySelector(`[name="variant_${flatType}_totalApartments"]`)?.value);
    if (!totalApartments || totalApartments < 1) continue;

    const areaMin = parseArea(form.querySelector(`[name="variant_${flatType}_areaMin"]`)?.value) ?? 0;
    const areaMax = parseArea(form.querySelector(`[name="variant_${flatType}_areaMax"]`)?.value) ?? 0;
    if (areaMin && areaMax && areaMin > areaMax) {
      return { error: `Площадь «${getFlatTypeLabel(flatType)}»: минимум больше максимума` };
    }

    const priceRaw = form.querySelector(`[name="variant_${flatType}_price"]`)?.value;
    const price = priceRaw !== '' && priceRaw != null ? Number(priceRaw) : null;
    const layouts = collectLayoutsForFlatType(form, flatType);

    const variant = {
      flatType,
      totalApartments,
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
    }

    variants.push(variant);
  }

  return { variants };
}

function fillFlatVariantsForm(form, property) {
  if (!form) return;

  const variants = isComplex(property) ? getComplexFlatVariants(property) : [];
  const byType = Object.fromEntries(variants.map(variant => [variant.flatType, variant]));

  for (const flatType of FLAT_TYPE_KEYS) {
    const variant = byType[flatType];
    const totalInput = form.querySelector(`[name="variant_${flatType}_totalApartments"]`);
    const areaMinInput = form.querySelector(`[name="variant_${flatType}_areaMin"]`);
    const areaMaxInput = form.querySelector(`[name="variant_${flatType}_areaMax"]`);
    const priceInput = form.querySelector(`[name="variant_${flatType}_price"]`);

    if (totalInput) totalInput.value = variant?.totalApartments || '';
    if (areaMinInput) areaMinInput.value = variant?.areaMin || '';
    if (areaMaxInput) areaMaxInput.value = variant?.areaMax || '';
    if (priceInput) priceInput.value = variant?.price ?? '';

    const layouts = variant?.layouts?.length
      ? variant.layouts
      : (variant?.planImg || variant?.areaMin || variant?.areaMax
        ? [{
          planImg: variant.planImg,
          areaMin: variant.areaMin,
          areaMax: variant.areaMax,
          price: variant.price,
        }]
        : [{}]);
    setAdminFlatVariantLayouts(form, flatType, layouts);
  }

  if (form.flatType) {
    form.flatType.value = property.flatType || variants[0]?.flatType || '1room';
  }
}

function clearFlatVariantsForm(form) {
  if (!form) return;

  for (const flatType of FLAT_TYPE_KEYS) {
    const totalInput = form.querySelector(`[name="variant_${flatType}_totalApartments"]`);
    const areaMinInput = form.querySelector(`[name="variant_${flatType}_areaMin"]`);
    const areaMaxInput = form.querySelector(`[name="variant_${flatType}_areaMax"]`);
    const priceInput = form.querySelector(`[name="variant_${flatType}_price"]`);

    if (totalInput) totalInput.value = '';
    if (areaMinInput) areaMinInput.value = '';
    if (areaMaxInput) areaMaxInput.value = '';
    if (priceInput) priceInput.value = '';
    setAdminFlatVariantLayouts(form, flatType, [{}]);
  }

  if (form.flatType) form.flatType.value = '1room';
}

function formatComplexVariantsAdminSummary(property) {
  return getComplexFlatVariants(property)
    .map(variant => `${variant.flatTypeShortLabel} · ${variant.totalApartments}`)
    .join(', ');
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
              <div class="admin-variant-editor">
                <h3 class="admin-variant-editor-title">Типы квартир</h3>
                <p class="form-hint">Заполните параметры для каждого типа. Пустое количество — тип не будет показан на сайте.</p>
                <div id="flatVariantRows">
                  ${FLAT_TYPE_KEYS.map(renderAdminFlatVariantRow).join('')}
                </div>
                <div class="form-group">
                  <label>Основной тип для карточки</label>
                  <select name="flatType">
                    ${Object.entries(FLAT_TYPE_LABELS).map(([value, label]) => `
                      <option value="${value}">${escapeHtml(label)}</option>
                    `).join('')}
                  </select>
                </div>
              </div>
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
        clearFlatVariantsForm(form);
        if (areaInput) areaInput.value = '';
      } else {
        clearFlatVariantsForm(form);
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
    clearFlatVariantsForm(form);
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
      noMarkupYears,
      mandatoryPayment,
      img: normalizedImages.img,
      images: normalizedImages.images,
      published: formData.get('published') === 'on',
    };

    if (isComplex({ type })) {
      const variantResult = collectFlatVariantsFromForm(form);
      if (variantResult.error) {
        showToast(variantResult.error, 'error');
        return;
      }

      const variants = variantResult.variants;
      if (!variants.length) {
        showToast('Укажите хотя бы один тип квартир с количеством', 'error');
        return;
      }

      const flatType = formData.get('flatType')?.toString();
      const primary = variants.find(variant => variant.flatType === flatType) || variants[0];

      if (flatType && !variants.some(variant => variant.flatType === flatType)) {
        showToast('Основной тип должен быть среди заполненных', 'error');
        return;
      }

      property.flatVariants = variants;
      property.flatType = primary.flatType;
      property.totalApartments = primary.totalApartments;
      property.areaMin = Math.min(...variants.map(variant => Number(variant.areaMin) || 0).filter(Boolean));
      property.areaMax = Math.max(...variants.map(variant => Number(variant.areaMax) || 0).filter(Boolean));
      if (!property.areaMin) property.areaMin = primary.areaMin;
      if (!property.areaMax) property.areaMax = primary.areaMax || primary.areaMin;
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
        fillFlatVariantsForm(form, property);
        form.area.value = '';
      } else {
        form.area.value = property.area ?? '';
        clearFlatVariantsForm(form);
      }

      form.price.value = property.price ?? '';
      form.address.value = property.address || '';
      form.district.value = property.district || '';
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
