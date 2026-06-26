const STORE_KEY = 'aparts_data_v9';
const USER_KEY = 'aparts_user';
const SITE_NAME = 'Dune Base';
const DEFAULT_IMG = 'img/default.svg';
const LOGO_IMG = 'img/logo.svg';
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const COMPLEX_TYPES = ['jk', 'mfk'];

const FLAT_TYPE_LABELS = {
  '1room': 'Однокомнатные',
  '2room': 'Двухкомнатные',
  '3room': 'Трёхкомнатные',
  euro2: 'Евродвушки',
};

const FLAT_TYPE_KEYS = Object.keys(FLAT_TYPE_LABELS);

function assetPath(relativePath) {
  const base = window.location.pathname.replace(/[^/]*$/, '');
  return `${base}${relativePath}`;
}

const TYPE_LABELS = {
  jk: 'ЖК',
  mfk: 'МФК',
  commercial: 'Коммерческое',
};

const ADMIN_CREDENTIALS = {
  email: 'admin@dunebase.ru',
  password: 'admin123',
};

const DEFAULT_PROPERTIES = [
  {
    id: 'jk1',
    title: '«Ан-Нур»',
    description: 'Современный жилой комплекс с благоустроенной территорией, детскими площадками и подземным паркингом.',
    type: 'jk',
    flatType: '1room',
    totalApartments: 120,
    flatVariants: [
      { flatType: '1room', totalApartments: 120, areaMin: 28, areaMax: 42, planImg: 'aparts/img/Ан-Нур/zkce-_S0DR-uHLYhQ42LmDihuwCc8DA9TBOkbC3OnO3gx_xMSm4H97gd8Fm6oXHNQUJ_BjNgjVfM8oAVuaFex-5r.jpg' },
      { flatType: '2room', totalApartments: 150, areaMin: 45, areaMax: 65, planImg: 'aparts/img/Ан-Нур/SsXxF6na521hu_tBGzPp-yXM6_oYwgku8WeOGcVk5ZKbvKLD-I9xv-KhdGBJVfzZTY5PoJdu5FLFMnxsX0u_te41.jpg' },
      { flatType: '3room', totalApartments: 90, areaMin: 70, areaMax: 95, planImg: 'aparts/img/Ан-Нур/tVVKaTIKy3Ml1dlOiyg_BMqtHZPs07xGlHAdX74nTV0iSbuU3Ryssm3x00ZF9tuE6309UiBmQfQ3rnMsFLOMFb_D.jpg' },
      { flatType: 'euro2', totalApartments: 60, areaMin: 38, areaMax: 52, planImg: 'aparts/img/Ан-Нур/lrjRLoyH8TapAdBLyxFOFYS7ysVJkE9u7iKl-50rszu3Kt5jKdErplY4yEQsPhECT4BywWiYtgxBhn4LMetLxLj6.jpg' },
    ],
    areaMin: 28,
    areaMax: 95,
    price: 8500000,
    address: 'В.В.Путина 001',
    district: 'САО',
    img: 'aparts/img/Ан-Нур/zkce-_S0DR-uHLYhQ42LmDihuwCc8DA9TBOkbC3OnO3gx_xMSm4H97gd8Fm6oXHNQUJ_BjNgjVfM8oAVuaFex-5r.jpg',
    images: [
      'iaparts/img/Ан-Нур/wCYKz4htObP5MvEWcjJe9vAa6lOZtHk6_QyKtxXqScG5_vY6C3Aj8XEDMg7k2ZV3xA4SoAQswLg9PFmh4q97i1CK.jpg',
      'aparts/img/Ан-Нур/SsXxF6na521hu_tBGzPp-yXM6_oYwgku8WeOGcVk5ZKbvKLD-I9xv-KhdGBJVfzZTY5PoJdu5FLFMnxsX0u_te41.jpg',
      'aparts/img/Ан-Нур/tVVKaTIKy3Ml1dlOiyg_BMqtHZPs07xGlHAdX74nTV0iSbuU3Ryssm3x00ZF9tuE6309UiBmQfQ3rnMsFLOMFb_D.jpg',
      'aparts/img/Ан-Нур/lrjRLoyH8TapAdBLyxFOFYS7ysVJkE9u7iKl-50rszu3Kt5jKdErplY4yEQsPhECT4BywWiYtgxBhn4LMetLxLj6.jpg'
    ],
    published: true,
  },
  {
    id: 'jk2',
    title: '«Бомонд»',
    description: 'Комплекс бизнес-класса с видом на набережную, собственной инфраструктурой и охраняемой территорией.',
    type: 'jk',
    flatType: '2room',
    totalApartments: 110,
    flatVariants: [
      { flatType: '1room', totalApartments: 70, areaMin: 35, areaMax: 48 },
      { flatType: '2room', totalApartments: 110, areaMin: 52, areaMax: 78 },
      { flatType: '3room', totalApartments: 60, areaMin: 80, areaMax: 120 },
      { flatType: 'euro2', totalApartments: 40, areaMin: 42, areaMax: 58 },
    ],
    areaMin: 35,
    areaMax: 120,
    price: 12400000,
    address: 'В.В.Путина 001',
    district: 'СЗАО',
    img: 'aparts/img/1111111.jpeg',
    images: [
      'img/properties/jk2.jpg',
      'img/properties/jk2-2.jpg',
    ],
    published: true,
  },
  {
    id: 'jk3',
    title: '«Дубайский»',
    description: 'Жилой комплекс с разными планировками и развитой инфраструктурой на территории.',
    type: 'mfk',
    flatType: '2room',
    totalApartments: 55,
    flatVariants: [
      { flatType: '1room', totalApartments: 40, areaMin: 30, areaMax: 44 },
      { flatType: '2room', totalApartments: 55, areaMin: 48, areaMax: 68 },
      { flatType: '3room', totalApartments: 35, areaMin: 72, areaMax: 85 },
      { flatType: 'euro2', totalApartments: 30, areaMin: 40, areaMax: 55 },
    ],
    areaMin: 30,
    areaMax: 85,
    price: 9800000,
    address: 'В.В.Путина 001',
    district: 'САО',
    img: 'aparts/img/eAqRhD17Bf2ScTaaYF0mk8uGCSr7mKfeaiU0prAym2EAScR2bw8PJ9c2bg08c4REWbijEhXdYlrNYWjM8IKaXTSd.jpg',
    images: [
      'aparts/img/eAqRhD17Bf2ScTaaYF0mk8uGCSr7mKfeaiU0prAym2EAScR2bw8PJ9c2bg08c4REWbijEhXdYlrNYWjM8IKaXTSd.jpg',
      'aparts/img/UpeIcL-raLgBmiX_y4MzKlqJRXfNEY3bLSNBavOOZauKEJ5ufXlaELh-5dAtA-Bk2KInur9zpmnf91RVrJ1ijJaL.jpg',
    ],
    published: true,
  },
  {
    id: 'comm1',
    title: 'Офисное помещение в БЦ',
    description: 'Открытая планировка, отдельный вход, подходит под офис или шоурум.',
    type: 'commercial',
    area: 120,
    price: 25000000,
    address: 'Ленинградский пр., 39',
    district: 'САО',
    img: 'img/properties/comm1.jpg',
    images: [
      'img/properties/comm1.jpg',
    ],
    published: true,
  },
  {
    id: 'comm2',
    title: 'Торговое помещение на первой линии',
    description: 'Высокий пешеходный трафик, витринные окна, готовность к открытию.',
    type: 'commercial',
    area: 85,
    price: 18500000,
    address: 'ул. Тверская, 12',
    district: 'ЦАО',
    img: 'img/default.svg',
    images: ['img/default.svg'],
    published: true,
  },
  {
    id: 'comm3',
    title: 'Помещение свободного назначения',
    description: 'Универсальная планировка, отдельный вход, подойдёт под сервис или retail.',
    type: 'commercial',
    area: 210,
    price: 32000000,
    address: 'Ленинградский пр., 39',
    district: 'САО',
    img: 'img/default.svg',
    images: ['img/default.svg'],
    published: true,
  },
];

function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(text) {
  if (text == null) return '';
  return String(text).replace(/"/g, '&quot;');
}

function formatPrice(price) {
  if (price == null || Number.isNaN(Number(price))) return 'Цена по запросу';
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
}

function formatArea(value) {
  const num = Number(value);
  if (Number.isNaN(num) || num <= 0) return '';
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(num);
}

function parseArea(value) {
  if (value == null || value === '') return null;
  const normalized = String(value).trim().replace(',', '.');
  const num = Number(normalized);
  return Number.isFinite(num) ? num : null;
}

function isComplex(property) {
  return COMPLEX_TYPES.includes(property.type);
}

function getLegacyCountForFlatType(property, flatType) {
  switch (flatType) {
    case '1room': return Number(property.count1room) || 0;
    case '2room': return Number(property.count2room) || 0;
    case '3room': return Number(property.count3room) || 0;
    case 'euro2': return Number(property.countEuroTwo) || 0;
    default: return 0;
  }
}

function inferFlatTypeFromLegacy(property) {
  const ranked = FLAT_TYPE_KEYS
    .map(flatType => ({
      flatType,
      count: getLegacyCountForFlatType(property, flatType),
    }))
    .sort((a, b) => b.count - a.count);

  return ranked[0]?.count > 0 ? ranked[0].flatType : '1room';
}

function getFlatTypeLabel(flatType) {
  return FLAT_TYPE_LABELS[flatType] || flatType || '';
}

function getFlatTypeShortLabel(flatType) {
  switch (flatType) {
    case '1room': return '1к';
    case '2room': return '2к';
    case '3room': return '3к';
    case 'euro2': return 'Евро-2';
    default: return getFlatTypeLabel(flatType);
  }
}

function normalizeFlatVariant(variant) {
  const flatType = FLAT_TYPE_LABELS[variant?.flatType] ? variant.flatType : null;
  if (!flatType) return null;

  const areaMin = Number(variant.areaMin) || 0;
  const areaMax = Number(variant.areaMax) || areaMin;
  const price = variant?.price != null && variant.price !== '' ? Number(variant.price) : null;

  return {
    flatType,
    flatTypeLabel: getFlatTypeLabel(flatType),
    flatTypeShortLabel: getFlatTypeShortLabel(flatType),
    totalApartments: Number(variant.totalApartments) || 0,
    areaMin,
    areaMax,
    planImg: String(variant?.planImg || variant?.planImage || '').trim(),
    price: Number.isFinite(price) ? price : null,
  };
}

function getVariantPlanImg(property, variant, index = 0) {
  if (variant?.planImg && !isBrokenImageSrc(variant.planImg)) {
    return variant.planImg;
  }

  const images = getPropertyImages(property).filter(src => !isBrokenImageSrc(src));
  if (images[index]) return images[index];
  if (images[0]) return images[0];
  return DEFAULT_IMG;
}

function mergeFlatVariants(defaultVariants, savedVariants) {
  if (!Array.isArray(savedVariants) || !savedVariants.length) return defaultVariants;
  if (!Array.isArray(defaultVariants) || !defaultVariants.length) return savedVariants;

  const defaultsByType = Object.fromEntries(
    defaultVariants.map(variant => [variant.flatType, variant])
  );

  return savedVariants.map(variant => ({
    ...defaultsByType[variant.flatType],
    ...variant,
  }));
}

function formatVariantAreaRange(variant) {
  if (!variant) return '';
  const areaMin = Number(variant.areaMin) || 0;
  const areaMax = Number(variant.areaMax) || areaMin;
  if (!areaMin && !areaMax) return '';
  if (areaMin && areaMax && areaMin !== areaMax) {
    return `${formatArea(areaMin)}–${formatArea(areaMax)} м²`;
  }
  return `${formatArea(areaMin || areaMax)} м²`;
}

function getComplexFlatVariants(property) {
  if (!isComplex(property)) return [];

  if (Array.isArray(property.flatVariants) && property.flatVariants.length) {
    const seen = new Set();
    return property.flatVariants
      .map(normalizeFlatVariant)
      .filter(variant => {
        if (!variant || seen.has(variant.flatType)) return false;
        seen.add(variant.flatType);
        return true;
      });
  }

  const flatType = FLAT_TYPE_LABELS[property.flatType] ? property.flatType : '1room';
  return [{
    flatType,
    flatTypeLabel: getFlatTypeLabel(flatType),
    flatTypeShortLabel: getFlatTypeShortLabel(flatType),
    totalApartments: Number(property.totalApartments) || 0,
    areaMin: Number(property.areaMin) || 0,
    areaMax: Number(property.areaMax) || Number(property.areaMin) || 0,
  }];
}

function normalizeComplexProperty(property) {
  if (!isComplex(property)) {
    const item = { ...property };
    delete item.flatType;
    delete item.count1room;
    delete item.count2room;
    delete item.count3room;
    delete item.countEuroTwo;
    return item;
  }

  const item = { ...property };
  const hasLegacyCounts = FLAT_TYPE_KEYS.some(flatType => getLegacyCountForFlatType(item, flatType) > 0);
  let flatType = FLAT_TYPE_LABELS[item.flatType] ? item.flatType : inferFlatTypeFromLegacy(item);

  if (!FLAT_TYPE_LABELS[item.flatType] && hasLegacyCounts) {
    item.totalApartments = getLegacyCountForFlatType(item, flatType) || Number(item.totalApartments) || 0;
  } else {
    item.totalApartments = Number(item.totalApartments) || 0;
  }

  item.flatType = flatType;
  item.areaMin = Number(item.areaMin) || 0;
  item.areaMax = Number(item.areaMax) || Number(item.areaMin) || 0;

  if (Array.isArray(item.flatVariants) && item.flatVariants.length) {
    const seen = new Set();
    item.flatVariants = item.flatVariants
      .map(normalizeFlatVariant)
      .filter(variant => {
        if (!variant || seen.has(variant.flatType)) return false;
        seen.add(variant.flatType);
        return true;
      });

    const primary = item.flatVariants.find(variant => variant.flatType === item.flatType)
      || item.flatVariants[0];
    if (primary) {
      item.flatType = primary.flatType;
      item.totalApartments = primary.totalApartments;
      item.areaMin = primary.areaMin;
      item.areaMax = primary.areaMax;
    }
  }

  delete item.count1room;
  delete item.count2room;
  delete item.count3room;
  delete item.countEuroTwo;

  return item;
}

function getComplexStats(property) {
  const normalized = normalizeComplexProperty(property);
  return {
    flatType: normalized.flatType,
    flatTypeLabel: getFlatTypeLabel(normalized.flatType),
    totalApartments: Number(normalized.totalApartments) || 0,
  };
}

function getComplexAreaRange(property) {
  const variants = getComplexFlatVariants(property);
  if (variants.length) {
    const mins = variants
      .map(variant => Number(variant.areaMin) || 0)
      .filter(value => value > 0);
    const maxs = variants
      .map(variant => Number(variant.areaMax) || Number(variant.areaMin) || 0)
      .filter(value => value > 0);

    return {
      areaMin: mins.length ? Math.min(...mins) : 0,
      areaMax: maxs.length ? Math.max(...maxs) : 0,
    };
  }

  const areaMin = Number(property.areaMin) || 0;
  const areaMax = Number(property.areaMax) || areaMin;
  return { areaMin, areaMax };
}

function variantMatchesAreaFilter(variant, filterMin, filterMax) {
  if (filterMin == null && filterMax == null) return true;

  const areaMin = Number(variant?.areaMin) || 0;
  const areaMax = Number(variant?.areaMax) || areaMin;
  if (!areaMin && !areaMax) return true;

  const rangeMin = areaMin || areaMax;
  const rangeMax = areaMax || areaMin;

  if (filterMin != null && !Number.isNaN(filterMin) && rangeMax < filterMin) return false;
  if (filterMax != null && !Number.isNaN(filterMax) && rangeMin > filterMax) return false;
  return true;
}

function complexMatchesAreaFilter(property, filterMin, filterMax) {
  if (filterMin == null && filterMax == null) return true;

  if (!isComplex(property)) {
    const area = Number(property.area) || 0;
    if (!area) return true;
    if (filterMin != null && !Number.isNaN(filterMin) && area < filterMin) return false;
    if (filterMax != null && !Number.isNaN(filterMax) && area > filterMax) return false;
    return true;
  }

  const variants = getComplexFlatVariants(property);
  if (!variants.length) {
    const { areaMin, areaMax } = getComplexAreaRange(property);
    return variantMatchesAreaFilter({ areaMin, areaMax }, filterMin, filterMax);
  }

  return variants.some(variant => variantMatchesAreaFilter(variant, filterMin, filterMax));
}

function complexMatchesCatalogFilters(property, filters = {}) {
  if (!isComplex(property)) return false;

  const flatTypes = Array.isArray(filters.flatTypes) ? filters.flatTypes : [];
  const filterMin = filters.minValue ?? null;
  const filterMax = filters.maxValue ?? null;
  const hasFlatFilter = flatTypes.length > 0;
  const hasAreaFilter = filterMin != null || filterMax != null;

  if (!hasFlatFilter && !hasAreaFilter) return true;

  const variants = getComplexFlatVariants(property);
  return variants.some(variant => {
    const flatOk = !hasFlatFilter || flatTypes.includes(variant.flatType);
    const areaOk = !hasAreaFilter || variantMatchesAreaFilter(variant, filterMin, filterMax);
    return flatOk && areaOk;
  });
}

function formatComplexAreaRange(property) {
  const { areaMin, areaMax } = getComplexAreaRange(property);
  if (!areaMin && !areaMax) return '';
  if (areaMin && areaMax && areaMin !== areaMax) {
    return `${formatArea(areaMin)}–${formatArea(areaMax)} м²`;
  }
  return `${formatArea(areaMin || areaMax)} м²`;
}

function complexHasFlatType(property, flatType) {
  if (!isComplex(property)) return false;
  return getComplexFlatVariants(property).some(variant => variant.flatType === flatType);
}

function enrichProperty(property) {
  const defaults = DEFAULT_PROPERTIES.find(item => item.id === property.id);
  const merged = {
    ...defaults,
    ...property,
    district: property.district || defaults?.district || '',
  };

  if (isComplex(merged)) {
    Object.assign(merged, normalizeComplexProperty(merged));
  }

  const repaired = repairPropertyImages({
    ...merged,
    img: property.img ?? property.imageUrl ?? '',
    images: Array.isArray(property.images) ? property.images : undefined,
  });
  merged.img = repaired.img;
  merged.images = repaired.images;
  delete merged.imageUrl;

  return merged;
}

function uniqueImages(list) {
  const seen = new Set();
  return list.filter(src => {
    if (!src || seen.has(src)) return false;
    seen.add(src);
    return true;
  });
}

function isPlaceholderImage(src) {
  return !src || src === DEFAULT_IMG;
}

function isBrokenImageSrc(src) {
  return isPlaceholderImage(src)
    || (typeof src === 'string' && /unsplash\.com/i.test(src));
}

function repairPropertyImages(property) {
  const defaults = DEFAULT_PROPERTIES.find(item => item.id === property.id);
  const normalized = normalizePropertyImages(property);
  const needsRepair = normalized.images.every(isBrokenImageSrc);

  if (needsRepair && defaults) {
    return normalizePropertyImages({
      ...property,
      img: defaults.img,
      images: defaults.images,
    });
  }

  return normalized;
}

function normalizePropertyImages(property) {
  const mainField = String(property?.img || property?.imageUrl || '').trim();
  const gallery = Array.isArray(property?.images)
    ? property.images.map(src => String(src).trim()).filter(Boolean)
    : [];

  // Порядок в галерее — главный; поле img синхронизируется с images[0]
  let combined = uniqueImages([
    ...gallery,
    ...(mainField ? [mainField] : []),
  ]);

  const realImages = combined.filter(src => !isBrokenImageSrc(src));
  if (realImages.length) {
    combined = realImages;
  }

  if (!combined.length) {
    combined = [DEFAULT_IMG];
  }

  return {
    img: combined[0],
    images: combined,
  };
}

function buildPropertyImages(property) {
  return normalizePropertyImages(property).images;
}

function parsePropertyImages(raw) {
  if (!raw || !raw.trim()) return undefined;
  const images = raw.trim().split('\n').map(line => line.trim()).filter(Boolean);
  return images.length ? images : undefined;
}

function formatPropertyImages(images) {
  if (!images?.length) return '';
  return images.join('\n');
}

function getPropertyImg(property) {
  return normalizePropertyImages(property).img;
}

function getPropertyImages(property) {
  return normalizePropertyImages(property).images;
}

function resolveImageSrc(src) {
  if (!src) return assetPath(DEFAULT_IMG);
  if (/^(https?:|data:|\/\/)/.test(src)) return src;
  return assetPath(src);
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith('image/')) {
      reject(new Error('not an image'));
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      reject(new Error('too large'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('read failed'));
    reader.readAsDataURL(file);
  });
}

function renderPropertyImg(src, alt = '') {
  const resolved = resolveImageSrc(src || DEFAULT_IMG);
  const safeAlt = escapeHtml(alt);
  const safeSrc = escapeAttr(resolved);
  const fallback = escapeAttr(assetPath(DEFAULT_IMG));
  return `<img src="${safeSrc}" alt="${safeAlt}" loading="lazy" onerror="this.src='${fallback}'">`;
}

function renderLogo(alt = SITE_NAME) {
  const safeAlt = escapeHtml(alt);
  const safeSrc = escapeHtml(assetPath(LOGO_IMG));
  return `<img src="${safeSrc}" alt="${safeAlt}">`;
}

function renderComplexStatsTags(property) {
  const stats = getComplexStats(property);
  const areaLabel = formatComplexAreaRange(property);
  const areaTag = areaLabel
    ? `<span class="property-attr-tag">${areaLabel}</span>`
    : '';
  return `
    ${areaTag}
    <span class="property-attr-tag">${escapeHtml(stats.flatTypeLabel)}</span>
    <span class="property-attr-tag">${stats.totalApartments} кв.</span>
  `;
}

function renderComplexStatsTable(property) {
  const variants = getComplexFlatVariants(property);

  if (variants.length > 1) {
    return variants.map(variant => `
      <div class="property-spec-row">
        <span class="property-spec-label">${escapeHtml(variant.flatTypeLabel)}</span>
        <span class="property-spec-value">${variant.totalApartments} кв. · ${formatVariantAreaRange(variant) || '—'}</span>
      </div>
    `).join('');
  }

  const stats = getComplexStats(property);
  return `
    <div class="property-spec-row">
      <span class="property-spec-label">Тип квартир</span>
      <span class="property-spec-value">${escapeHtml(stats.flatTypeLabel) || '—'}</span>
    </div>
    <div class="property-spec-row">
      <span class="property-spec-label">Площадь квартир</span>
      <span class="property-spec-value">${formatComplexAreaRange(property) || '—'}</span>
    </div>
    <div class="property-spec-row">
      <span class="property-spec-label">Количество</span>
      <span class="property-spec-value">${stats.totalApartments}</span>
    </div>
  `;
}

function renderPropertyFloorPlansBlock(property) {
  if (!isComplex(property)) return '';

  const variants = getComplexFlatVariants(property);
  if (!variants.length) return '';

  const cardsHtml = variants.map((variant, index) => {
    const planImg = getVariantPlanImg(property, variant, index);
    const areaLabel = formatVariantAreaRange(variant) || '—';
    const priceValue = variant.price ?? property.price;

    return `
      <article class="floor-plan-card">
        <div class="floor-plan-image">
          ${renderPropertyImg(planImg, `Планировка ${variant.flatTypeLabel}`)}
        </div>
        <div class="floor-plan-info">
          <h3>${escapeHtml(variant.flatTypeLabel)}</h3>
          <ul class="floor-plan-specs">
            <li>
              <span class="floor-plan-spec-label">Тип квартир</span>
              <span class="floor-plan-spec-value">${escapeHtml(variant.flatTypeLabel)}</span>
            </li>
            <li>
              <span class="floor-plan-spec-label">Площадь</span>
              <span class="floor-plan-spec-value">${areaLabel}</span>
            </li>
            <li>
              <span class="floor-plan-spec-label">Доступно квартир</span>
              <span class="floor-plan-spec-value">${variant.totalApartments}</span>
            </li>
            <li>
              <span class="floor-plan-spec-label">Цена</span>
              <span class="floor-plan-spec-value">от ${formatPrice(priceValue)}</span>
            </li>
          </ul>
        </div>
      </article>
    `;
  }).join('');

  return `
    <section class="property-floor-plans">
      <div class="section-header property-floor-plans-header">
        <h2>Планировки квартир</h2>
        <p>Доступные типы квартир в этом комплексе</p>
      </div>
      <div class="floor-plans-list">${cardsHtml}</div>
    </section>
  `;
}

function mergeStoredPropertiesWithDefaults(stored) {
  if (!Array.isArray(stored) || !stored.length) {
    return DEFAULT_PROPERTIES.map(item => ({ ...item }));
  }

  const storedById = new Map(stored.map(item => [item.id, item]));
  const defaultIds = new Set(DEFAULT_PROPERTIES.map(item => item.id));
  const merged = DEFAULT_PROPERTIES.map(defaults => {
    const saved = storedById.get(defaults.id);
    if (!saved) return { ...defaults };

    return {
      ...defaults,
      ...saved,
      type: defaults.type,
      published: saved.published ?? defaults.published,
      flatVariants: mergeFlatVariants(defaults.flatVariants, saved.flatVariants),
    };
  });

  for (const item of stored) {
    if (!defaultIds.has(item.id)) merged.push(item);
  }

  return merged;
}

function initStore() {
  migrateStore();
  if (!localStorage.getItem(STORE_KEY)) {
    localStorage.setItem(STORE_KEY, JSON.stringify({ properties: DEFAULT_PROPERTIES }));
  }
}

function migrateStore() {
  if (localStorage.getItem(STORE_KEY)) return;

  const legacyKeys = ['aparts_data_v8', 'aparts_data_v7', 'aparts_data_v6', 'aparts_data_v5', 'aparts_data_v4', 'aparts_data_v3', 'aparts_data_v2', 'aparts_data_v1'];
  for (const key of legacyKeys) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;

    try {
      const data = JSON.parse(raw);
      if (Array.isArray(data?.properties)) {
        const repaired = mergeStoredPropertiesWithDefaults(data.properties).map(property => {
          const item = normalizeComplexProperty({ ...property });
          const images = repairPropertyImages(item);
          item.img = images.img;
          item.images = images.images;
          delete item.imageUrl;
          return item;
        });
        localStorage.setItem(STORE_KEY, JSON.stringify({ properties: repaired }));
        return;
      }
    } catch {
      // пробуем следующий ключ
    }
  }
}

function getProperties() {
  initStore();
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const data = raw ? JSON.parse(raw) : null;
    const stored = Array.isArray(data?.properties) ? data.properties : DEFAULT_PROPERTIES;
    const merged = mergeStoredPropertiesWithDefaults(stored);
    const enriched = merged.map(enrichProperty);

    const needsPersist = merged.length !== stored.length
      || enriched.some((property) => {
        const source = stored.find(item => item.id === property.id);
        if (!source) return true;
        return property.type !== source.type
          || property.img !== source.img
          || JSON.stringify(property.images) !== JSON.stringify(source.images)
          || property.flatType !== source.flatType
          || JSON.stringify(property.flatVariants) !== JSON.stringify(source.flatVariants)
          || source.count1room != null
          || source.count2room != null
          || source.count3room != null
          || source.countEuroTwo != null;
      })
      || stored.some(item => !merged.some(property => property.id === item.id));

    if (needsPersist) {
      saveProperties(enriched);
    }

    return enriched;
  } catch (error) {
    console.warn(`${SITE_NAME}: повреждённые данные, восстанавливаем по умолчанию`, error);
    localStorage.removeItem(STORE_KEY);
    initStore();
    return DEFAULT_PROPERTIES.map(enrichProperty);
  }
}

function saveProperties(properties) {
  initStore();
  const normalized = properties.map(property => {
    const item = normalizeComplexProperty({ ...property });
    const images = repairPropertyImages(item);
    item.img = images.img;
    item.images = images.images;
    delete item.imageUrl;
    return item;
  });
  localStorage.setItem(STORE_KEY, JSON.stringify({ properties: normalized }));
}

function getPropertyById(id) {
  return getProperties().find(item => item.id === id) || null;
}

function getPublishedProperties(types) {
  return getProperties().filter(item => item.published !== false && types.includes(item.type));
}

function getFeaturedProperties(types, limit = 3) {
  const published = getPublishedProperties(types);
  if (published.length >= limit) return published.slice(0, limit);

  const fallback = DEFAULT_PROPERTIES
    .filter(item => item.published !== false && types.includes(item.type))
    .map(item => enrichProperty({ ...item }));

  const combined = [...published];
  for (const item of fallback) {
    if (combined.length >= limit) break;
    if (!combined.some(existing => existing.id === item.id)) combined.push(item);
  }

  return combined.slice(0, limit);
}

function getCatalogProperties(types) {
  const all = getProperties();
  const allIds = new Set(all.map(item => item.id));
  const published = all.filter(item => item.published !== false && types.includes(item.type));
  const byId = new Map(published.map(item => [item.id, item]));

  for (const defaults of DEFAULT_PROPERTIES) {
    if (!types.includes(defaults.type)) continue;
    if (defaults.published === false) continue;
    if (byId.has(defaults.id)) continue;
    if (allIds.has(defaults.id)) continue;
    byId.set(defaults.id, enrichProperty({ ...defaults }));
  }

  if (byId.size) return [...byId.values()];

  return DEFAULT_PROPERTIES
    .filter(item => item.published !== false && types.includes(item.type))
    .map(item => enrichProperty({ ...item }));
}

function getUniqueDistricts(properties) {
  return [...new Set(
    properties
      .map(item => item.district)
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b, 'ru'));
}

function generatePropertyId() {
  return `prop${Date.now()}`;
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

function loginUser(email, password) {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const user = { email, role: 'admin', name: 'Администратор' };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return { success: true, isAdmin: true, user };
  }
  return { success: false, isAdmin: false };
}

function logoutUser() {
  localStorage.removeItem(USER_KEY);
}

initStore();
