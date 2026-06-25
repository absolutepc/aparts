const STORE_KEY = 'aparts_data_v1';
const USER_KEY = 'aparts_user';
const DEFAULT_IMG = 'img/default.svg';
const LOGO_IMG = 'img/logo.svg';

function assetPath(relativePath) {
  const base = window.location.pathname.replace(/[^/]*$/, '');
  return `${base}${relativePath}`;
}

const TYPE_LABELS = {
  apartment: 'Квартира',
  studio: 'Студия',
  commercial: 'Коммерческое',
};

const ADMIN_CREDENTIALS = {
  email: 'admin@aparts.ru',
  password: 'admin123',
};

const DEFAULT_PROPERTIES = [
  {
    id: 'prop1',
    title: '2-комнатная квартира на Арбате',
    description: 'Светлая квартира в историческом центре с высокими потолками и видом на двор.',
    type: 'apartment',
    area: 68,
    rooms: 2,
    price: 18500000,
    address: 'ул. Арбат, 12',
    district: 'ЦАО',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    published: true,
  },
  {
    id: 'prop2',
    title: 'Студия у метро Сокольники',
    description: 'Компактная студия с современным ремонтом, идеально для одного или пары.',
    type: 'studio',
    area: 28,
    rooms: 1,
    price: 7200000,
    address: 'ул. Стромынка, 18',
    district: 'ВАО',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    published: true,
  },
  {
    id: 'prop3',
    title: 'Офисное помещение в БЦ',
    description: 'Открытая планировка, отдельный вход, подходит под офис или шоурум.',
    type: 'commercial',
    area: 120,
    rooms: null,
    price: 25000000,
    address: 'Ленинградский пр., 39',
    district: 'САО',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    published: true,
  },
  {
    id: 'prop4',
    title: '3-комнатная квартира в Хорошёво',
    description: 'Просторная квартира рядом с парком, свежий ремонт, панорамные окна.',
    type: 'apartment',
    area: 92,
    rooms: 3,
    price: 21500000,
    address: 'ул. Народного Ополчения, 44',
    district: 'СЗАО',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
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

function enrichProperty(property) {
  const defaults = DEFAULT_PROPERTIES.find(item => item.id === property.id);
  const merged = {
    ...defaults,
    ...property,
    district: property.district || defaults?.district || '',
  };

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

function getUniqueRoomOptions(properties) {
  const rooms = properties
    .map(item => item.rooms)
    .filter(value => value != null);
  const unique = [...new Set(rooms)].sort((a, b) => a - b);
  const hasFourPlus = unique.some(value => value >= 4);
  const base = unique.filter(value => value < 4);
  if (hasFourPlus) base.push('4+');
  return base.map(String);
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
