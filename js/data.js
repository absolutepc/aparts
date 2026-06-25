const STORE_KEY = 'aparts_data_v2';
const USER_KEY = 'aparts_user';
const DEFAULT_IMG = 'img/default.svg';
const LOGO_IMG = 'img/logo.svg';

const COMPLEX_TYPES = ['jk', 'mfk'];

const FLAT_TYPE_LABELS = {
  '1room': 'Однокомнатные',
  '2room': 'Двухкомнатные',
  '3room': 'Трехкомнатные',
  euro2: 'Евродвушки',
};

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
  email: 'admin@aparts.ru',
  password: 'admin123',
};

const DEFAULT_PROPERTIES = [
  {
    id: 'jk1',
    title: 'ЖК «Северный парк»',
    description: 'Современный жилой комплекс с благоустроенной территорией, детскими площадками и подземным паркингом.',
    type: 'jk',
    totalApartments: 420,
    count1room: 120,
    count2room: 150,
    count3room: 90,
    countEuroTwo: 60,
    price: 8500000,
    address: 'ул. Северная, 15',
    district: 'САО',
    imageUrl: 'https://images.unsplash.com/photo-1545324415-ccade1effe2b?w=800&q=80',
    published: true,
  },
  {
    id: 'jk2',
    title: 'ЖК «Речной бульвар»',
    description: 'Комплекс бизнес-класса с видом на набережную, собственной инфраструктурой и охраняемой территорией.',
    type: 'jk',
    totalApartments: 280,
    count1room: 70,
    count2room: 110,
    count3room: 60,
    countEuroTwo: 40,
    price: 12400000,
    address: 'Речной бульвар, 3',
    district: 'СЗАО',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    published: true,
  },
  {
    id: 'mfk1',
    title: 'МФК «Городской квартал»',
    description: 'Многофункциональный комплекс: жильё, офисы и торговые галереи в одном пространстве.',
    type: 'mfk',
    totalApartments: 160,
    count1room: 40,
    count2room: 55,
    count3room: 35,
    countEuroTwo: 30,
    price: 9800000,
    address: 'Ленинградский пр., 39',
    district: 'САО',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
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

function formatPrice(price) {
  if (price == null || Number.isNaN(Number(price))) return 'Цена по запросу';
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
}

function isComplex(property) {
  return COMPLEX_TYPES.includes(property.type);
}

function getComplexStats(property) {
  return {
    totalApartments: Number(property.totalApartments) || 0,
    count1room: Number(property.count1room) || 0,
    count2room: Number(property.count2room) || 0,
    count3room: Number(property.count3room) || 0,
    countEuroTwo: Number(property.countEuroTwo) || 0,
  };
}

function complexHasFlatType(property, flatType) {
  const stats = getComplexStats(property);
  switch (flatType) {
    case '1room': return stats.count1room > 0;
    case '2room': return stats.count2room > 0;
    case '3room': return stats.count3room > 0;
    case 'euro2': return stats.countEuroTwo > 0;
    default: return true;
  }
}

function enrichProperty(property) {
  const defaults = DEFAULT_PROPERTIES.find(item => item.id === property.id);
  const merged = {
    ...defaults,
    ...property,
    district: property.district || defaults?.district || '',
  };

  if (isComplex(merged)) {
    merged.totalApartments = Number(merged.totalApartments) || 0;
    merged.count1room = Number(merged.count1room) || 0;
    merged.count2room = Number(merged.count2room) || 0;
    merged.count3room = Number(merged.count3room) || 0;
    merged.countEuroTwo = Number(merged.countEuroTwo) || 0;
  }

  if (!Array.isArray(merged.images) || !merged.images.length) {
    merged.images = merged.imageUrl ? [merged.imageUrl] : defaults?.images || [DEFAULT_IMG];
  }

  if (!merged.imageUrl) {
    merged.imageUrl = merged.images[0] || DEFAULT_IMG;
  }

  return merged;
}

function getPropertyImg(property) {
  if (Array.isArray(property.images) && property.images.length) {
    return property.images[0];
  }
  return property.imageUrl || DEFAULT_IMG;
}

function getPropertyImages(property) {
  if (Array.isArray(property.images) && property.images.length) {
    return property.images;
  }
  if (property.imageUrl) {
    return [property.imageUrl];
  }
  return [DEFAULT_IMG];
}

function resolveImageSrc(src) {
  if (!src) return assetPath(DEFAULT_IMG);
  if (/^(https?:|data:|\/\/)/.test(src)) return src;
  return assetPath(src);
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

function renderPropertyImg(src, alt = '') {
  const safeAlt = escapeHtml(alt);
  const resolved = resolveImageSrc(src || DEFAULT_IMG);
  const safeSrc = escapeHtml(resolved);
  const fallback = escapeHtml(assetPath(DEFAULT_IMG));
  return `<img src="${safeSrc}" alt="${safeAlt}" loading="lazy" onerror="this.src='${fallback}'">`;
}

function renderLogo(alt = 'Aparts') {
  const safeAlt = escapeHtml(alt);
  const safeSrc = escapeHtml(assetPath(LOGO_IMG));
  return `<img src="${safeSrc}" alt="${safeAlt}">`;
}

function renderComplexStatsTags(property) {
  const stats = getComplexStats(property);
  return `
    <span class="property-attr-tag">Всего: ${stats.totalApartments}</span>
    <span class="property-attr-tag">1к: ${stats.count1room}</span>
    <span class="property-attr-tag">2к: ${stats.count2room}</span>
    <span class="property-attr-tag">3к: ${stats.count3room}</span>
    <span class="property-attr-tag">Евро-2: ${stats.countEuroTwo}</span>
  `;
}

function renderComplexStatsTable(property) {
  const stats = getComplexStats(property);
  return `
    <div class="property-spec-row">
      <span class="property-spec-label">Всего квартир</span>
      <span class="property-spec-value">${stats.totalApartments}</span>
    </div>
    <div class="property-spec-row">
      <span class="property-spec-label">Однокомнатные</span>
      <span class="property-spec-value">${stats.count1room}</span>
    </div>
    <div class="property-spec-row">
      <span class="property-spec-label">Двухкомнатные</span>
      <span class="property-spec-value">${stats.count2room}</span>
    </div>
    <div class="property-spec-row">
      <span class="property-spec-label">Трёхкомнатные</span>
      <span class="property-spec-value">${stats.count3room}</span>
    </div>
    <div class="property-spec-row">
      <span class="property-spec-label">Евродвушки</span>
      <span class="property-spec-value">${stats.countEuroTwo}</span>
    </div>
  `;
}

function initStore() {
  if (!localStorage.getItem(STORE_KEY)) {
    localStorage.setItem(STORE_KEY, JSON.stringify({ properties: DEFAULT_PROPERTIES }));
  }
}

function getProperties() {
  initStore();
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const data = raw ? JSON.parse(raw) : null;
    const properties = Array.isArray(data?.properties) ? data.properties : DEFAULT_PROPERTIES;
    return properties.map(enrichProperty);
  } catch (error) {
    console.warn('Aparts: повреждённые данные, восстанавливаем по умолчанию', error);
    localStorage.removeItem(STORE_KEY);
    initStore();
    return DEFAULT_PROPERTIES.map(enrichProperty);
  }
}

function saveProperties(properties) {
  initStore();
  localStorage.setItem(STORE_KEY, JSON.stringify({ properties }));
}

function getPropertyById(id) {
  return getProperties().find(item => item.id === id) || null;
}

function getPublishedProperties(types) {
  return getProperties().filter(item => item.published !== false && types.includes(item.type));
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
