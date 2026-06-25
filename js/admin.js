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
              <div class="admin-form-grid">
                <div class="form-group">
                  <label>Всего квартир</label>
                  <input type="number" name="totalApartments" min="0" step="1">
                </div>
                <div class="form-group">
                  <label>Однокомнатные</label>
                  <input type="number" name="count1room" min="0" step="1">
                </div>
                <div class="form-group">
                  <label>Двухкомнатные</label>
                  <input type="number" name="count2room" min="0" step="1">
                </div>
                <div class="form-group">
                  <label>Трёхкомнатные</label>
                  <input type="number" name="count3room" min="0" step="1">
                </div>
                <div class="form-group">
                  <label>Евродвушки</label>
                  <input type="number" name="countEuroTwo" min="0" step="1">
                </div>
                <div class="form-group">
                  <label>Площадь от, м²</label>
                  <input type="number" name="areaMin" min="0" step="0.1">
                </div>
                <div class="form-group">
                  <label>Площадь до, м²</label>
                  <input type="number" name="areaMax" min="0" step="0.1">
                </div>
              </div>
            </div>
            <div class="form-group" id="areaField">
              <label>Площадь, м²</label>
              <input type="number" name="area" min="1" step="0.1">
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
            <div class="form-group admin-form-full">
              <label>Фотографии</label>
              <input type="file" id="propertyImageFiles" accept="image/*" multiple>
              <p class="form-hint">Выберите одно или несколько фото с компьютера (до 2 МБ каждое)</p>
              <div class="admin-img-gallery" id="propertyImgGallery"></div>
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
            <th>Разбивка</th>
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
  const stats = isComplex(property) ? getComplexStats(property) : null;
  const sizeCell = isComplex(property)
    ? stats.totalApartments
    : `${property.area} м²`;
  const breakdownCell = isComplex(property)
    ? `1к: ${stats.count1room}, 2к: ${stats.count2room}, 3к: ${stats.count3room}, евро: ${stats.countEuroTwo}`
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

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('read failed'));
    reader.readAsDataURL(file);
  });
}

function bindPropertiesAdmin() {
  const formWrap = document.getElementById('propertyFormWrap');
  const form = document.getElementById('propertyEditForm');
  const addBtn = document.getElementById('addPropertyBtn');
  const cancelBtn = document.getElementById('cancelPropertyBtn');
  const typeSelect = form?.querySelector('[name="type"]');
  const imageFilesInput = document.getElementById('propertyImageFiles');
  const imageGallery = document.getElementById('propertyImgGallery');
  let propertyImagesDraft = [];

  function renderPropertyImagesGallery() {
    if (!imageGallery) return;

    if (!propertyImagesDraft.length) {
      imageGallery.innerHTML = '<p class="admin-img-gallery-empty">Фото не добавлены — будет показано изображение по умолчанию</p>';
      return;
    }

    imageGallery.innerHTML = propertyImagesDraft.map((src, index) => `
      <div class="admin-img-gallery-item">
        <img src="${escapeHtml(resolveImageSrc(src))}" alt="Фото ${index + 1}">
        <button type="button" class="admin-img-remove" data-index="${index}" aria-label="Удалить фото">×</button>
      </div>
    `).join('');

    imageGallery.querySelectorAll('.admin-img-remove').forEach(button => {
      button.addEventListener('click', () => {
        propertyImagesDraft.splice(Number(button.dataset.index), 1);
        renderPropertyImagesGallery();
      });
    });
  }

  function setPropertyImagesDraft(images) {
    propertyImagesDraft = Array.isArray(images) ? [...images] : [];
    renderPropertyImagesGallery();
  }

  async function handleImageFilesSelected() {
    const files = [...(imageFilesInput?.files || [])];
    if (!files.length) return;

    let added = 0;
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        showToast(`Файл «${file.name}» не является изображением`, 'error');
        continue;
      }

      if (file.size > 2 * 1024 * 1024) {
        showToast(`Файл «${file.name}» слишком большой (макс. 2 МБ)`, 'error');
        continue;
      }

      try {
        const dataUrl = await readImageFile(file);
        propertyImagesDraft.push(dataUrl);
        added += 1;
      } catch {
        showToast(`Не удалось загрузить «${file.name}»`, 'error');
      }
    }

    if (imageFilesInput) imageFilesInput.value = '';
    renderPropertyImagesGallery();

    if (added) {
      showToast(added === 1 ? 'Фото добавлено' : `Добавлено фото: ${added}`, 'success');
    }
  }

  function bindImageUpload() {
    imageFilesInput?.addEventListener('change', () => {
      handleImageFilesSelected();
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

    const totalApartmentsInput = form.querySelector('[name="totalApartments"]');
    if (totalApartmentsInput) totalApartmentsInput.required = !isCommercial;

    const complexInputs = form.querySelectorAll('#complexFields input');

    if (clearValues) {
      if (isCommercial) {
        complexInputs.forEach(input => { input.value = ''; });
      } else if (areaInput) {
        areaInput.value = '';
      }
    }
  }

  addBtn?.addEventListener('click', () => {
    form.reset();
    form.editId.value = '';
    form.type.value = 'jk';
    form.published.checked = true;
    if (imageFilesInput) imageFilesInput.value = '';
    setPropertyImagesDraft([]);
    document.getElementById('propertyFormTitle').textContent = 'Добавить объект';
    formWrap.style.display = 'block';
    toggleTypeFields();
  });

  cancelBtn?.addEventListener('click', () => {
    formWrap.style.display = 'none';
  });

  typeSelect?.addEventListener('change', () => toggleTypeFields(true));
  toggleTypeFields();
  bindImageUpload();

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const type = formData.get('type');
    const priceValue = formData.get('price');

    if (!formData.get('title')?.toString().trim()) {
      showToast('Укажите название объекта', 'error');
      return;
    }

    const images = propertyImagesDraft.length ? [...propertyImagesDraft] : [DEFAULT_IMG];
    const imageUrl = images[0];

    const property = {
      id: formData.get('editId') || generatePropertyId(),
      title: formData.get('title').toString().trim(),
      description: formData.get('description')?.toString().trim() || '',
      type,
      price: priceValue ? Number(priceValue) : null,
      address: formData.get('address')?.toString().trim() || '',
      district: formData.get('district')?.toString().trim() || '',
      imageUrl,
      images,
      published: formData.get('published') === 'on',
    };

    if (isComplex({ type })) {
      const totalApartments = Number(formData.get('totalApartments'));
      const count1room = Number(formData.get('count1room'));
      const count2room = Number(formData.get('count2room'));
      const count3room = Number(formData.get('count3room'));
      const countEuroTwo = Number(formData.get('countEuroTwo'));

      if (!totalApartments || totalApartments < 1) {
        showToast('Укажите общее количество квартир', 'error');
        return;
      }

      const sumByType = count1room + count2room + count3room + countEuroTwo;
      if (sumByType > totalApartments) {
        showToast('Сумма по типам не может превышать общее количество квартир', 'error');
        return;
      }

      property.totalApartments = totalApartments;
      property.count1room = count1room || 0;
      property.count2room = count2room || 0;
      property.count3room = count3room || 0;
      property.countEuroTwo = countEuroTwo || 0;

      const areaMin = Number(formData.get('areaMin')) || 0;
      const areaMax = Number(formData.get('areaMax')) || 0;
      if (areaMin && areaMax && areaMin > areaMax) {
        showToast('Минимальная площадь не может быть больше максимальной', 'error');
        return;
      }
      property.areaMin = areaMin;
      property.areaMax = areaMax || areaMin;
    } else {
      const area = Number(formData.get('area'));
      if (!area || area <= 0) {
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
        const stats = getComplexStats(property);
        form.totalApartments.value = stats.totalApartments || '';
        form.count1room.value = stats.count1room || '';
        form.count2room.value = stats.count2room || '';
        form.count3room.value = stats.count3room || '';
        form.countEuroTwo.value = stats.countEuroTwo || '';
        const areaRange = getComplexAreaRange(property);
        form.areaMin.value = areaRange.areaMin || '';
        form.areaMax.value = areaRange.areaMax || '';
        form.area.value = '';
      } else {
        form.area.value = property.area ?? '';
        form.totalApartments.value = '';
        form.count1room.value = '';
        form.count2room.value = '';
        form.count3room.value = '';
        form.countEuroTwo.value = '';
        form.areaMin.value = '';
        form.areaMax.value = '';
      }

      form.price.value = property.price ?? '';
      form.address.value = property.address || '';
      form.district.value = property.district || '';
      setPropertyImagesDraft(getPropertyImages(property));
      form.description.value = property.description || '';
      form.published.checked = property.published !== false;
      if (imageFilesInput) imageFilesInput.value = '';

      document.getElementById('propertyFormTitle').textContent = 'Редактировать объект';
      formWrap.style.display = 'block';
      toggleTypeFields();
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
