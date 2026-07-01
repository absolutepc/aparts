const STORE_KEY = 'aparts_data_v11';
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
  '4room': 'Четырёхкомнатные',
  euro2: 'Евродвушки',
};

const FLAT_TYPE_KEYS = Object.keys(FLAT_TYPE_LABELS);

const NO_MARKUP_YEARS = {
  1: '1 год',
  2: '2 года',
};

const MANDATORY_PAYMENT_OPTIONS = {
  3000: '3 000',
  4000: '4 000',
  5000: '5 000',
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
      { flatType: '1room', totalApartments: 58, areaMin: 52, areaMax: 67,layouts: [
        { key: 'A', label: 'Сектор В|Д Тип-A', areaMin: 67, areaMax: 67, planImg: 'img/luch/1A.jpg' },
        { key: 'Б', label: 'Сектор В|Д Тип-Б', areaMin: 53, areaMax: 53, planImg: 'img/luch/1B.jpg' },
        { key: 'В', label: 'Сектор В|Д Тип-В', areaMin: 52, areaMax: 52, planImg: 'img/luch/1V.jpg' },
        { key: 'Г', label: 'Сектор В|Д Тип-Г', areaMin: 66, areaMax: 66, planImg: 'img/luch/1G.jpg' },

        { key: 'Д', label: 'Сектор Ж Тип-Б', areaMin: 52, areaMax: 52, planImg: 'img/luch/1G.jpg' },
        { key: 'Е', label: 'Сектор Ж Тип-В', areaMin: 53, areaMax: 53, planImg: 'img/luch/1D.jpg' },
        { key: 'Ё', label: 'Сектор Ж Тип-Г', areaMin: 67, areaMax: 67, planImg: 'img/luch/1E.jpg' },

        { key: 'Ж', label: 'Сектор Б Тип-И', areaMin: 61, areaMax: 61, planImg: 'img/luch/1E.jpg' },

        { key: 'З', label: 'Сектор Г Тип-Г', areaMin: 59, areaMax: 59, planImg: 'img/luch/1E.jpg' },

        { key: 'И', label: 'Сектор Е Тип-Д', areaMin: 61, areaMax: 61, planImg: 'img/luch/1E.jpg' },
        { key: 'Й', label: 'Сектор Е Тип-Е', areaMin: 59, areaMax: 59, planImg: 'img/luch/1E.jpg' },
        { key: 'К', label: 'Сектор Е Тип-Ж', areaMin: 59, areaMax: 59, planImg: 'img/luch/1E.jpg' },
        { key: 'Л', label: 'Сектор Е Тип-И', areaMin: 61, areaMax: 61, planImg: 'img/luch/1E.jpg' },

      ]  },

      { flatType: '2room', totalApartments: 54, areaMin: 57, areaMax: 84, layouts: [
        { key: 'A', label: 'Сектор В|Д Тип-A', areaMin: 58, areaMax: 58, planImg: 'img/luch/2A.jpg' },
        { key: 'Б', label: 'Сектор В|Д Тип-Б', areaMin: 57, areaMax: 57, planImg: 'img/luch/2B.jpg' },

        { key: 'B', label: 'Сектор Ж Тип-А', areaMin: 57, areaMax: 57, planImg: 'img/luch/2V.jpg' },
        { key: 'Г', label: 'Сектор Ж Тип-Б', areaMin: 58, areaMax: 58, planImg: 'img/luch/2G.jpg' },

        { key: 'Д', label: 'Сектор Б Тип-В', areaMin: 82, areaMax: 82, planImg: 'img/luch/1G.jpg' },
        { key: 'Е', label: 'Сектор Б Тип-Б', areaMin: 84, areaMax: 84, planImg: 'img/luch/1D.jpg' },
        { key: 'Ё', label: 'Сектор Б Тип-Г', areaMin: 82, areaMax: 82, planImg: 'img/luch/1E.jpg' },
        { key: 'Ж', label: 'Сектор Б Тип-Д', areaMin: 84, areaMax: 84, planImg: 'img/luch/1G.jpg' },
        { key: 'З', label: 'Сектор Б Тип-Ж', areaMin: 78, areaMax: 78, planImg: 'img/luch/1D.jpg' },
        { key: 'И', label: 'Сектор Б Тип-К', areaMin: 80, areaMax: 80, planImg: 'img/luch/1E.jpg' },
        { key: 'Й', label: 'Сектор Б Тип-Л', areaMin: 81, areaMax: 81, planImg: 'img/luch/1D.jpg' },
        { key: 'К', label: 'Сектор Б Тип-Н', areaMin: 78, areaMax: 78, planImg: 'img/luch/1E.jpg' },

        { key: 'Л', label: 'Сектор Е Тип-Б', areaMin: 84, areaMax: 84, planImg: 'img/luch/1E.jpg' },
        { key: 'М', label: 'Сектор Е Тип-В', areaMin: 82, areaMax: 82, planImg: 'img/luch/1E.jpg' },
        { key: 'Н', label: 'Сектор Е Тип-Г', areaMin: 82, areaMax: 82, planImg: 'img/luch/1E.jpg' },
        { key: 'О', label: 'Сектор Е Тип-Д', areaMin: 84, areaMax: 84, planImg: 'img/luch/1E.jpg' },
        { key: 'П', label: 'Сектор Е Тип-Ж', areaMin: 78, areaMax: 78, planImg: 'img/luch/1E.jpg' },
        { key: 'Р', label: 'Сектор Е Тип-И', areaMin: 74, areaMax: 74, planImg: 'img/luch/1E.jpg' },
        { key: 'С', label: 'Сектор Е Тип-К', areaMin: 81, areaMax: 81, planImg: 'img/luch/1E.jpg' },
        { key: 'Т', label: 'Сектор Е Тип-Л', areaMin: 80, areaMax: 80, planImg: 'img/luch/1E.jpg' },
        { key: 'У', label: 'Сектор Е Тип-Н', areaMin: 78, areaMax: 78, planImg: 'img/luch/1E.jpg' },
      ] },

      { flatType: '3room', totalApartments: 10, areaMin: 93, areaMax: 95, layouts: [
        { key: 'A', label: 'Сектор В|Д Тип-A', areaMin: 94, areaMax: 94, planImg: 'img/luch/2A.jpg' },
        { key: 'Б', label: 'Сектор В|Д Тип-Б', areaMin: 93, areaMax: 93, planImg: 'img/luch/2B.jpg' },

        { key: 'B', label: 'Сектор Г Тип-Б', areaMin: 95, areaMax: 95, planImg: 'img/luch/2V.jpg' },
      ] },
    ],
    areaMin: 52,
    areaMax: 95,
    price: 90000,
    address: 'В.В.Путина 001',
    district: 'Новый Район',
    noMarkupYears: 1,
    mandatoryPayment: 5000,
    img: 'img/Ан-Нур/zkce-_S0DR-uHLYhQ42LmDihuwCc8DA9TBOkbC3OnO3gx_xMSm4H97gd8Fm6oXHNQUJ_BjNgjVfM8oAVuaFex-5r.jpg',
    images: [
      'img/Ан-Нур/wCYKz4htObP5MvEWcjJe9vAa6lOZtHk6_QyKtxXqScG5_vY6C3Aj8XEDMg7k2ZV3xA4SoAQswLg9PFmh4q97i1CK.jpg',
      'img/Ан-Нур/SsXxF6na521hu_tBGzPp-yXM6_oYwgku8WeOGcVk5ZKbvKLD-I9xv-KhdGBJVfzZTY5PoJdu5FLFMnxsX0u_te41.jpg',
      'img/Ан-Нур/tVVKaTIKy3Ml1dlOiyg_BMqtHZPs07xGlHAdX74nTV0iSbuU3Ryssm3x00ZF9tuE6309UiBmQfQ3rnMsFLOMFb_D.jpg',
      'img/Ан-Нур/lrjRLoyH8TapAdBLyxFOFYS7ysVJkE9u7iKl-50rszu3Kt5jKdErplY4yEQsPhECT4BywWiYtgxBhn4LMetLxLj6.jpg'
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
      { flatType: '1room', totalApartments: 55, areaMin: 43.16, areaMax: 60.65, layouts: [
        { key: 'A', label: 'Сектор А-Г Тип-A', areaMin: 51.74, areaMax: 51.74, planImg: 'img/Бомонд/1А.jpg' },
        { key: 'Б', label: 'Сектор А-Г Тип-Б', areaMin: 51.35, areaMax: 51.35, planImg: 'img/Бомонд/1Б.jpg' },
        { key: 'В', label: 'Сектор А-Г Тип-В', areaMin: 60.65, areaMax: 60.65, planImg: 'img/Бомонд/1В.jpg' },
        { key: 'Г', label: 'Сектор А-Г Тип-Г', areaMin: 60.65, areaMax: 60.65, planImg: 'img/Бомонд/1Г.jpg' },
        { key: 'Д', label: 'Сектор А-Г Тип-Д', areaMin: 56.03, areaMax: 56.03, planImg: 'img/Бомонд/1Д.jpg' },
        { key: 'Е', label: 'Сектор А-Г Тип-Е', areaMin: 56.06, areaMax: 56.06, planImg: 'img/Бомонд/1Е.jpg' },
        { key: 'Ж', label: 'Сектор А-Г Тип-Ж', areaMin: 51.74, areaMax: 51.74, planImg: 'img/Бомонд/1Ж.jpg' },

        { key: 'И', label: 'Сектор Б-Д Тип-И', areaMin: 51.79, areaMax: 51.79, planImg: 'img/Бомонд/1И.jpg' },
        { key: 'К', label: 'Сектор Б-Д Тип-К', areaMin: 59.16, areaMax: 59.16, planImg: 'img/Бомонд/1К.jpg' },
        { key: 'Л', label: 'Сектор Б-Д Тип-Л', areaMin: 59.16, areaMax: 59.16, planImg: 'img/Бомонд/1Л.jpg' },
        { key: 'М', label: 'Сектор Б-Д Тип-М', areaMin: 59.16, areaMax: 59.16, planImg: 'img/Бомонд/1М.jpg' },
        { key: 'Н', label: 'Сектор Б-Д Тип-Н', areaMin: 59.16, areaMax: 59.16, planImg: 'img/Бомонд/1Н.jpg' },
        { key: 'П', label: 'Сектор Б-Д Тип-П', areaMin: 59.79, areaMax: 59.79, planImg: 'img/Бомонд/1П.jpg' },

        { key: 'Р', label: 'Сектор В-Е Тип-Р', areaMin: 51.74, areaMax: 51.74, planImg: 'img/Бомонд/1Р.jpg' },
        { key: 'С', label: 'Сектор В-Е Тип-С', areaMin: 56.06, areaMax: 56.06, planImg: 'img/Бомонд/1С.jpg' },
        { key: 'Т', label: 'Сектор В-Е Тип-Т', areaMin: 56.03, areaMax: 56.03, planImg: 'img/Бомонд/1Т.jpg' },
        { key: 'У', label: 'Сектор В-Е Тип-У', areaMin: 60.65, areaMax: 60.65, planImg: 'img/Бомонд/1У.jpg' },
        { key: 'Ф', label: 'Сектор В-Е Тип-Ф', areaMin: 60.65, areaMax: 60.65, planImg: 'img/Бомонд/1Ф.jpg' },
        { key: 'Х', label: 'Сектор В-Е Тип-Х', areaMin: 51.35, areaMax: 51.35, planImg: 'img/Бомонд/1Х.jpg' },
        { key: 'Ш', label: 'Сектор В-Е Тип-Ш', areaMin: 51.74, areaMax: 51.74, planImg: 'img/Бомонд/1Ш.jpg' },

        { key: 'Ж-А', label: 'Сектор Ж-К Тип-А', areaMin: 43.16, areaMax: 43.16, planImg: 'img/luch/1A.jpg' },
        { key: 'Ж-Б', label: 'Сектор Ж-К Тип-Б', areaMin: 46.18, areaMax: 46.18, planImg: 'img/luch/1B.jpg' },
        { key: 'Ж-В', label: 'Сектор Ж-К Тип-В', areaMin: 45.75, areaMax: 45.75, planImg: 'img/luch/1V.jpg' },
        { key: 'Ж-Г', label: 'Сектор Ж-К Тип-Г', areaMin: 43.16, areaMax: 43.16, planImg: 'img/luch/1G.jpg' },
        { key: 'Ж-Д', label: 'Сектор Ж-К Тип-Д', areaMin: 53.50, areaMax: 53.50, planImg: 'img/luch/1G.jpg' },
        { key: 'Ж-Е', label: 'Сектор Ж-К Тип-Е', areaMin: 53.50, areaMax: 53.50, planImg: 'img/luch/1D.jpg' },
        { key: 'Ж-Ж', label: 'Сектор Ж-К Тип-Ж', areaMin: 47.79, areaMax: 47.79, planImg: 'img/luch/1E.jpg' },
        { key: 'Ж-И', label: 'Сектор Ж-К Тип-И', areaMin: 50.33, areaMax: 50.33, planImg: 'img/luch/1D.jpg' },
        { key: 'Ж-К', label: 'Сектор Ж-К Тип-К', areaMin: 47.75, areaMax: 47.75, planImg: 'img/luch/1E.jpg' },

        { key: 'З-А', label: 'Сектор З-И Тип-А', areaMin: 43.16, areaMax: 43.16, planImg: 'img/luch/1A.jpg' },
        { key: 'З-Б', label: 'Сектор З-И Тип-Б', areaMin: 46.18, areaMax: 46.18, planImg: 'img/luch/1B.jpg' },
        { key: 'З-В', label: 'Сектор З-И Тип-В', areaMin: 45.75, areaMax: 45.75, planImg: 'img/luch/1V.jpg' },
        { key: 'З-Г', label: 'Сектор З-И Тип-Г', areaMin: 43.16, areaMax: 43.16, planImg: 'img/luch/1G.jpg' },
        { key: 'З-Д', label: 'Сектор З-И Тип-Д', areaMin: 53.50, areaMax: 53.50, planImg: 'img/luch/1G.jpg' },
        { key: 'З-Е', label: 'Сектор З-И Тип-Е', areaMin: 53.50, areaMax: 53.50, planImg: 'img/luch/1D.jpg' },
        { key: 'З-Ж', label: 'Сектор З-И Тип-Ж', areaMin: 47.79, areaMax: 47.79, planImg: 'img/luch/1E.jpg' },
        { key: 'З-И', label: 'Сектор З-И Тип-И', areaMin: 50.33, areaMax: 50.33, planImg: 'img/luch/1D.jpg' },
        { key: 'З-К', label: 'Сектор З-И Тип-К', areaMin: 47.75, areaMax: 47.75, planImg: 'img/luch/1E.jpg' },

      ]  },
      
      { flatType: '2room', totalApartments: 55, areaMin: 62.34, areaMax: 85.25, layouts: [
        { key: 'A', label: 'Сектор А-Г Тип-A', areaMin: 64.43, areaMax: 64.43, planImg: 'img/Бомонд/2А.jpg' },
        { key: 'Б', label: 'Сектор А-Г Тип-Б', areaMin: 64.43, areaMax: 64.43, planImg: 'img/Бомонд/2Б.jpg' },

        { key: 'B', label: 'Сектор Б-Д Тип-В', areaMin: 85.25, areaMax: 85.25, planImg: 'img/Бомонд/2В.jpg' },
        { key: 'Г', label: 'Сектор Б-Д Тип-Г', areaMin: 85.25, areaMax: 85.25, planImg: 'img/Бомонд/2Г.jpg' },

        { key: 'Д', label: 'Сектор В-Е Тип-Д', areaMin: 64.43, areaMax: 64.43, planImg: 'img/Бомонд/2Д.jpg' },
        { key: 'Е', label: 'Сектор В-Е Тип-Е', areaMin: 64.43, areaMax: 64.43, planImg: 'img/Бомонд/2Е.jpg' },

        { key: 'Ж', label: 'Сектор Ж-К Тип-A', areaMin: 62.34, areaMax: 62.34, planImg: 'img/luch/2A.jpg' },
        { key: 'И', label: 'Сектор Ж-К Тип-Б', areaMin: 62.34, areaMax: 62.34, planImg: 'img/luch/2B.jpg' },

        { key: 'К', label: 'Сектор З-И Тип-A', areaMin: 62.34, areaMax: 62.34, planImg: 'img/luch/2A.jpg' },
        { key: 'Л', label: 'Сектор З-И Тип-Б', areaMin: 62.34, areaMax: 62.34, planImg: 'img/luch/2B.jpg' },

      ] },
    ],
    areaMin: 35,
    areaMax: 120,
    price: 71000,
    address: 'В.В.Путина 001',
    district: 'Новый Проспект',
    noMarkupYears: 2,
    mandatoryPayment: 3000,
    img: 'img/1111111.jpeg',
    images: [
      '',
      '',
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
    price: 98000,
    address: 'В.В.Путина 001',
    district: 'САО',
    noMarkupYears: 1,
    mandatoryPayment: 5000,
    img: 'img/eAqRhD17Bf2ScTaaYF0mk8uGCSr7mKfeaiU0prAym2EAScR2bw8PJ9c2bg08c4REWbijEhXdYlrNYWjM8IKaXTSd.jpg',
    images: [
      'img/eAqRhD17Bf2ScTaaYF0mk8uGCSr7mKfeaiU0prAym2EAScR2bw8PJ9c2bg08c4REWbijEhXdYlrNYWjM8IKaXTSd.jpg',
      'img/UpeIcL-raLgBmiX_y4MzKlqJRXfNEY3bLSNBavOOZauKEJ5ufXlaELh-5dAtA-Bk2KInur9zpmnf91RVrJ1ijJaL.jpg',
    ],
    published: true,
  },
  
  {
    id: 'jk4',
    title: '«Луч»',
    description: 'Современный жилой комплекс с благоустроенной территорией, детскими площадками и подземным паркингом.',
    type: 'jk',
    flatType: '1room',
    totalApartments: 163,
    flatVariants: [
      { flatType: '1room', totalApartments: 42, areaMin: 43.8, areaMax: 48,layouts: [
        { key: 'A', label: 'Вариант A', areaMin: 48, areaMax: 48, planImg: 'img/luch/1A.jpg' },
        { key: 'Б', label: 'Вариант Б', areaMin: 46.1, areaMax: 46.1, planImg: 'img/luch/1B.jpg' },
        { key: 'В', label: 'Вариант В', areaMin: 43.8, areaMax: 43.8, planImg: 'img/luch/1V.jpg' },
        { key: 'Г', label: 'Вариант Г', areaMin: 43.8, areaMax: 43.8, planImg: 'img/luch/1G.jpg' },
        { key: 'Д', label: 'Вариант Д', areaMin: 46.1, areaMax: 46.1, planImg: 'img/luch/1D.jpg' },
        { key: 'E', label: 'Вариант E', areaMin: 48, areaMax: 48, planImg: 'img/luch/1E.jpg' },
      ]  },
      { flatType: '2room', totalApartments: 121, areaMin: 54.7, areaMax: 74.8, layouts: [
        { key: 'A', label: 'Вариант A', areaMin: 54.7, areaMax: 54.7, planImg: 'img/luch/2A.jpg' },
        { key: 'Б', label: 'Вариант Б', areaMin: 62.88, areaMax: 62.88, planImg: 'img/luch/2B.jpg' },
        { key: 'B', label: 'Вариант В', areaMin: 74.8, areaMax: 74.8, planImg: 'img/luch/2V.jpg' },
        { key: 'Г', label: 'Вариант Г', areaMin: 69, areaMax: 69, planImg: 'img/luch/2G.jpg' },
        { key: 'Д', label: 'Вариант Д', areaMin: 69, areaMax: 69, planImg: 'img/luch/2D.jpg' },
        { key: 'Е', label: 'Вариант Е', areaMin: 74.8, areaMax: 74.8, planImg: 'img/luch/2E.jpg' },
        { key: 'Ж', label: 'Вариант Ж', areaMin: 62.88, areaMax: 62.88, planImg: 'img/luch/2J.jpg' },
        { key: 'И', label: 'Вариант И', areaMin: 54.7, areaMax: 54.7, planImg: 'img/luch/2I.jpg' },
      ] },
    ],
    areaMin: 43.8,
    areaMax: 74.8,
    price: 65000,
    address: 'Проспект А.А. Кадырова 201',
    district: 'Байсангуровский',
    noMarkupYears: 2,
    mandatoryPayment: 4000,
    img: 'img/luch/luch.jpg',
    images: [
      'img/luch/luch 1.jpg',
      'img/luch/luch 2.jpg',
      'img/luch/luch 3.jpg',
      'img/luch/luch 4.jpg',
      'img/luch/luch 5.jpg',
      'img/luch/luch 6.jpg',
      'img/luch/luch 7.jpg',
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
    noMarkupYears: 1,
    mandatoryPayment: 3000,
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
    noMarkupYears: 2,
    mandatoryPayment: 4000,
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
    noMarkupYears: 1,
    mandatoryPayment: 5000,
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
    case '4room': return '4к';
    case 'euro2': return 'Евро-2';
    default: return getFlatTypeLabel(flatType);
  }
}

function getLayoutKey(index) {
  return String.fromCharCode(65 + index);
}

function getLayoutLabel(index) {
  return `Вариант ${getLayoutKey(index)}`;
}

function normalizeLayoutVariant(layout, index, parentVariant = {}) {
  const key = layout?.key?.trim() || getLayoutKey(index);
  const label = extractLayoutTypeFromLabel(layout?.label) || layout?.label?.trim() || getLayoutLabel(index);
  const areaMin = Number(layout?.areaMin) || Number(parentVariant.areaMin) || 0;
  const areaMax = Number(layout?.areaMax) || Number(parentVariant.areaMax) || areaMin;
  const price = layout?.price != null && layout.price !== '' ? Number(layout.price) : null;
  const totalApartments = Number(layout?.totalApartments) || 0;
  const planImg = String(layout?.planImg || layout?.planImage || parentVariant?.planImg || '').trim();

  return {
    key,
    label,
    areaMin,
    areaMax,
    totalApartments,
    planImg,
    price: Number.isFinite(price) ? price : null,
  };
}

function getVariantLayouts(variant) {
  if (!variant) return [];
  if (Array.isArray(variant.layouts) && variant.layouts.length) {
    return variant.layouts;
  }
  return [normalizeLayoutVariant({
    planImg: variant.planImg,
    areaMin: variant.areaMin,
    areaMax: variant.areaMax,
    price: variant.price,
    totalApartments: variant.totalApartments,
  }, 0, variant)];
}

function variantHasMultipleLayouts(variant) {
  return getVariantLayouts(variant).length > 1;
}

function getNoMarkupYearsLabel(years) {
  return NO_MARKUP_YEARS[Number(years)] || '';
}

function getNoMarkupYearsFilterLabel(years) {
  const label = getNoMarkupYearsLabel(years);
  return label ? `Без наценки: ${label}` : '';
}

function getMandatoryPaymentLabel(amount) {
  const value = Number(amount);
  const formatted = MANDATORY_PAYMENT_OPTIONS[value];
  return formatted ? `${formatted} ₽/м²` : '';
}

function normalizePropertyOffering(property) {
  const item = { ...property };
  const years = Number(item.noMarkupYears);
  const payment = Number(item.mandatoryPayment);

  if (NO_MARKUP_YEARS[years]) item.noMarkupYears = years;
  else delete item.noMarkupYears;

  if (MANDATORY_PAYMENT_OPTIONS[payment]) item.mandatoryPayment = payment;
  else delete item.mandatoryPayment;

  return item;
}

function propertyMatchesOfferingFilters(property, filters = {}) {
  const noMarkupYears = Array.isArray(filters.noMarkupYears) ? filters.noMarkupYears : [];
  const mandatoryPayments = Array.isArray(filters.mandatoryPayments) ? filters.mandatoryPayments : [];

  if (noMarkupYears.length && !noMarkupYears.includes(String(property.noMarkupYears))) {
    return false;
  }
  if (mandatoryPayments.length && !mandatoryPayments.includes(String(property.mandatoryPayment))) {
    return false;
  }
  return true;
}

function renderPropertyOfferingTags(property) {
  const noMarkupLabel = getNoMarkupYearsFilterLabel(property.noMarkupYears);
  const paymentLabel = getMandatoryPaymentLabel(property.mandatoryPayment);
  const tags = [];

  if (noMarkupLabel) {
    tags.push(`<span class="property-attr-tag">${escapeHtml(noMarkupLabel)}</span>`);
  }
  if (paymentLabel) {
    tags.push(`<span class="property-attr-tag">Обяз. платёж: ${escapeHtml(paymentLabel)}</span>`);
  }

  return tags.join('');
}

function renderPropertyOfferingSpecs(property) {
  const noMarkupLabel = getNoMarkupYearsFilterLabel(property.noMarkupYears);
  const paymentLabel = getMandatoryPaymentLabel(property.mandatoryPayment);
  const rows = [];

  if (noMarkupLabel) {
    rows.push(`
      <div class="property-spec-row">
        <span class="property-spec-label">Без наценки</span>
        <span class="property-spec-value">${escapeHtml(getNoMarkupYearsLabel(property.noMarkupYears))}</span>
      </div>
    `);
  }
  if (paymentLabel) {
    rows.push(`
      <div class="property-spec-row">
        <span class="property-spec-label">Обязательный платёж</span>
        <span class="property-spec-value">${escapeHtml(paymentLabel)}</span>
      </div>
    `);
  }

  return rows.join('');
}

function normalizeFlatVariant(variant) {
  const flatType = FLAT_TYPE_LABELS[variant?.flatType] ? variant.flatType : null;
  if (!flatType) return null;

  const areaMin = Number(variant.areaMin) || 0;
  const areaMax = Number(variant.areaMax) || areaMin;
  const price = variant?.price != null && variant.price !== '' ? Number(variant.price) : null;

  const baseVariant = {
    flatType,
    flatTypeLabel: getFlatTypeLabel(flatType),
    flatTypeShortLabel: getFlatTypeShortLabel(flatType),
    totalApartments: Number(variant.totalApartments) || 0,
    areaMin,
    areaMax,
    planImg: String(variant?.planImg || variant?.planImage || '').trim(),
    price: Number.isFinite(price) ? price : null,
  };

  let layouts = [];
  if (Array.isArray(variant.layouts) && variant.layouts.length) {
    layouts = variant.layouts
      .map((layout, index) => normalizeLayoutVariant(layout, index, baseVariant))
      .filter(Boolean);
  }

  if (!layouts.length) {
    layouts = [normalizeLayoutVariant({
      key: 'A',
      label: 'Вариант A',
      planImg: baseVariant.planImg,
      areaMin: baseVariant.areaMin,
      areaMax: baseVariant.areaMax,
      price: baseVariant.price,
      totalApartments: baseVariant.totalApartments,
    }, 0, baseVariant)];
  }

  return {
    ...baseVariant,
    planImg: layouts[0]?.planImg || baseVariant.planImg,
    layouts,
  };
}

function getVariantPlanImg(property, variant, layoutIndex = 0, variantIndex = 0) {
  const layouts = getVariantLayouts(variant);
  const layout = layouts[layoutIndex] || layouts[0];
  if (layout?.planImg && !isBrokenImageSrc(layout.planImg)) {
    return layout.planImg;
  }

  if (variant?.planImg && !isBrokenImageSrc(variant.planImg)) {
    return variant.planImg;
  }

  const images = getPropertyImages(property).filter(src => !isBrokenImageSrc(src));
  if (images[variantIndex]) return images[variantIndex];
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

function extractSectorTitleFromLayoutLabel(label) {
  const match = String(label || '').match(/^Сектор\s+(.+?)\s+Тип-/i);
  return match ? match[1].trim() : null;
}

function extractLayoutTypeFromLabel(label) {
  const match = String(label || '').match(/Тип-(.+)$/i);
  return match ? `Тип-${match[1].trim()}` : String(label || '').trim();
}

function slugifySectorId(title) {
  const slug = String(title || '')
    .toLowerCase()
    .replace(/\|/g, '-')
    .replace(/[^a-zа-яё0-9]+/gi, '-')
    .replace(/^-|-$/g, '');
  return slug ? `sector-${slug}` : 'sector-default';
}

function stripSectorTitle(title) {
  return String(title || '')
    .trim()
    .replace(/^(?:сектор\s+)+/gi, '')
    .trim();
}

function formatSectorTitle(title) {
  const value = stripSectorTitle(title);
  return value || 'A';
}

function isGeneralSectorTitle(title) {
  const normalized = stripSectorTitle(title).toLowerCase();
  return normalized === 'общий'
    || normalized === 'основной'
    || normalized === 'основной сектор';
}

function getLayoutDisplayLabel(label) {
  return extractLayoutTypeFromLabel(label) || String(label || '').trim();
}

function getSectorDisplayTitle(title) {
  return stripSectorTitle(title);
}

function generateSectorId(title) {
  return `${slugifySectorId(title)}-${Date.now().toString(36)}`;
}

function getLegacyRootFlatVariants(property) {
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

function buildSectorVariantFromLayouts(flatType, sourceVariant, layouts) {
  const areaMins = layouts.map(layout => Number(layout.areaMin) || 0).filter(value => value > 0);
  const areaMaxs = layouts.map(layout => Number(layout.areaMax) || Number(layout.areaMin) || 0).filter(value => value > 0);
  const totalLayouts = getVariantLayouts(sourceVariant).length || 1;
  const totalApartments = layouts.reduce((sum, layout) => sum + (Number(layout.totalApartments) || 0), 0)
    || Math.max(1, Math.round((Number(sourceVariant.totalApartments) || 0) * layouts.length / totalLayouts));

  return normalizeFlatVariant({
    flatType,
    totalApartments,
    areaMin: areaMins.length ? Math.min(...areaMins) : sourceVariant.areaMin,
    areaMax: areaMaxs.length ? Math.max(...areaMaxs) : sourceVariant.areaMax,
    price: sourceVariant.price,
    layouts: layouts.map((layout, index) => normalizeLayoutVariant({
      ...layout,
      label: extractLayoutTypeFromLabel(layout.label) || layout.label,
    }, index, sourceVariant)),
  });
}

function buildSectorsFromFlatVariants(flatVariants) {
  const sectorMap = new Map();
  const sourceTotals = new Map();

  for (const sourceVariant of flatVariants.map(normalizeFlatVariant).filter(Boolean)) {
    sourceTotals.set(sourceVariant.flatType, Number(sourceVariant.totalApartments) || 0);
    const layouts = getVariantLayouts(sourceVariant);
    const layoutsBySector = new Map();

    for (const layout of layouts) {
      const sectorTitle = extractSectorTitleFromLayoutLabel(layout.label);
      if (!sectorTitle || isGeneralSectorTitle(sectorTitle)) continue;
      if (!layoutsBySector.has(sectorTitle)) layoutsBySector.set(sectorTitle, []);
      layoutsBySector.get(sectorTitle).push(layout);
    }

    for (const [sectorTitle, sectorLayouts] of layoutsBySector) {
      if (!sectorMap.has(sectorTitle)) {
        sectorMap.set(sectorTitle, {
          title: formatSectorTitle(sectorTitle),
          flatVariantsByType: new Map(),
        });
      }

      const sectorVariant = buildSectorVariantFromLayouts(
        sourceVariant.flatType,
        sourceVariant,
        sectorLayouts
      );
      if (sectorVariant) {
        sectorMap.get(sectorTitle).flatVariantsByType.set(sourceVariant.flatType, sectorVariant);
      }
    }
  }

  const sectors = [...sectorMap.values()]
    .map((sector, index) => ({
      id: slugifySectorId(sector.title) || `sector-${index + 1}`,
      title: sector.title,
      flatVariants: [...sector.flatVariantsByType.values()],
    }))
    .filter(sector => sector.flatVariants.length && !isGeneralSectorTitle(sector.title));

  for (const [flatType, targetTotal] of sourceTotals) {
    const sectorVariants = sectors
      .map(sector => sector.flatVariants.find(variant => variant.flatType === flatType))
      .filter(Boolean);
    if (!sectorVariants.length || !targetTotal) continue;

    const weights = sectorVariants.map(variant => getVariantLayouts(variant).length || 1);
    const weightSum = weights.reduce((sum, value) => sum + value, 0) || sectorVariants.length;
    let assigned = 0;

    sectorVariants.forEach((variant, index) => {
      let totalApartments;
      if (index === sectorVariants.length - 1) {
        totalApartments = targetTotal - assigned;
      } else {
        totalApartments = Math.round(targetTotal * weights[index] / weightSum);
        assigned += totalApartments;
      }
      variant.totalApartments = Math.max(0, totalApartments);
    });
  }

  return sortSectorsAlphabetically(sectors);
}

function normalizeSector(sector, index = 0) {
  const title = formatSectorTitle(sector?.title || String.fromCharCode(65 + index));
  if (isGeneralSectorTitle(title)) return null;

  const id = String(sector?.id || slugifySectorId(title) || `sector-${index + 1}`).trim();
  const flatVariants = (Array.isArray(sector?.flatVariants) ? sector.flatVariants : [])
    .map(normalizeFlatVariant)
    .filter(Boolean);

  if (!flatVariants.length) return null;
  return { id, title, flatVariants };
}

function getComplexSectors(property) {
  if (!isComplex(property)) return [];

  let sectors = [];

  if (Array.isArray(property.sectors) && property.sectors.length) {
    sectors = property.sectors
      .map((sector, index) => normalizeSector(sector, index))
      .filter(Boolean);
  } else {
    const legacyVariants = getLegacyRootFlatVariants(property);
    if (legacyVariants.length) {
      sectors = buildSectorsFromFlatVariants(legacyVariants);
    }
  }

  return sortSectorsAlphabetically(sectors);
}

function getComplexSectorById(property, sectorId) {
  if (!sectorId) return null;
  return getComplexSectors(property).find(sector => sector.id === sectorId) || null;
}

function sectorHasFlatType(sector, flatType) {
  return sector?.flatVariants?.some(variant => variant.flatType === flatType);
}

function resolveComplexSector(property, sectorParam, flatTypeParam) {
  const sectors = getComplexSectors(property);
  if (!sectors.length) return null;

  const fromParam = getComplexSectorById(property, sectorParam);
  if (fromParam) return fromParam;

  if (flatTypeParam) {
    const withFlatType = sectors.find(sector => sectorHasFlatType(sector, flatTypeParam));
    if (withFlatType) return withFlatType;
  }

  return sectors[0];
}

function mergeAggregatedFlatVariants(variantsList) {
  const byType = new Map();

  for (const variant of variantsList.map(normalizeFlatVariant).filter(Boolean)) {
    const existing = byType.get(variant.flatType);
    if (!existing) {
      byType.set(variant.flatType, {
        ...variant,
        layouts: [...getVariantLayouts(variant)],
      });
      continue;
    }

    existing.totalApartments = (Number(existing.totalApartments) || 0) + (Number(variant.totalApartments) || 0);

    const nextAreaMin = Number(variant.areaMin) || 0;
    const nextAreaMax = Number(variant.areaMax) || nextAreaMin;
    if (nextAreaMin) {
      existing.areaMin = existing.areaMin
        ? Math.min(Number(existing.areaMin) || nextAreaMin, nextAreaMin)
        : nextAreaMin;
    }
    if (nextAreaMax) {
      existing.areaMax = Math.max(Number(existing.areaMax) || nextAreaMax, nextAreaMax);
    }

    existing.layouts.push(...getVariantLayouts(variant));
  }

  return [...byType.values()]
    .map(normalizeFlatVariant)
    .filter(Boolean);
}

function syncAggregatedFlatVariantsFromSectors(property) {
  const sectors = getComplexSectors(property);
  if (!sectors.length) return property;

  property.sectors = sectors;
  property.flatVariants = mergeAggregatedFlatVariants(sectors.flatMap(sector => sector.flatVariants));

  const primary = property.flatVariants.find(variant => variant.flatType === property.flatType)
    || property.flatVariants[0];
  if (primary) {
    property.flatType = primary.flatType;
    property.totalApartments = primary.totalApartments;
    property.areaMin = primary.areaMin;
    property.areaMax = primary.areaMax;
  }

  return property;
}

function getComplexFlatVariants(property, sectorId = null) {
  if (!isComplex(property)) return [];

  if (sectorId) {
    const sector = getComplexSectorById(property, sectorId);
    return sector ? sector.flatVariants : [];
  }

  const sectors = getComplexSectors(property);
  if (sectors.length) {
    return mergeAggregatedFlatVariants(sectors.flatMap(sector => sector.flatVariants));
  }

  return getLegacyRootFlatVariants(property);
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
  }

  syncAggregatedFlatVariantsFromSectors(item);

  const primary = item.flatVariants?.find(variant => variant.flatType === item.flatType)
    || item.flatVariants?.[0];
  if (primary) {
    item.flatType = primary.flatType;
    item.totalApartments = primary.totalApartments;
    item.areaMin = primary.areaMin;
    item.areaMax = primary.areaMax;
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

function buildComplexCatalogListing(property, variant) {
  return {
    ...property,
    catalogKey: `${property.id}:${variant.flatType}`,
    flatType: variant.flatType,
    totalApartments: variant.totalApartments,
    areaMin: variant.areaMin,
    areaMax: variant.areaMax,
    price: variant.price ?? property.price,
    flatVariants: [variant],
    listingPlanImg: getVariantPlanImg(property, variant, 0),
  };
}

function expandCatalogListings(properties) {
  return properties.flatMap(property => {
    if (!isComplex(property)) return [property];
    return getComplexFlatVariants(property).map(variant =>
      buildComplexCatalogListing(property, variant)
    );
  });
}

function catalogListingMatchesFilters(listing, filters = {}) {
  const flatTypes = Array.isArray(filters.flatTypes) ? filters.flatTypes : [];
  const filterMin = filters.minValue ?? null;
  const filterMax = filters.maxValue ?? null;
  const districts = Array.isArray(filters.districts) ? filters.districts : [];

  if (isComplex(listing)) {
    if (flatTypes.length && !flatTypes.includes(listing.flatType)) return false;
    if (!variantMatchesAreaFilter(listing, filterMin, filterMax)) return false;
  } else {
    const area = Number(listing.area) || 0;
    if (filterMin != null && !Number.isNaN(filterMin) && area < filterMin) return false;
    if (filterMax != null && !Number.isNaN(filterMax) && area > filterMax) return false;
  }

  if (districts.length && !districts.includes(listing.district)) return false;
  return propertyMatchesOfferingFilters(listing, filters);
}

function getPropertyCardTitle(property) {
  if (isComplex(property)) {
    const label = getFlatTypeLabel(property.flatType);
    return label ? `${property.title} — ${label}` : property.title;
  }
  return property.title;
}

function getPropertyDetailHref(property) {
  const params = new URLSearchParams({ id: property.id });
  if (isComplex(property) && property.flatType) {
    params.set('flatType', property.flatType);
  }
  return `property.html?${params.toString()}`;
}

function getComplexVariantByFlatType(property, flatType) {
  if (!isComplex(property) || !flatType) return null;
  return getComplexFlatVariants(property).find((variant) => variant.flatType === flatType) || null;
}

function resolveComplexCatalogVariant(property, flatTypeParam) {
  const variants = getComplexFlatVariants(property);
  if (!variants.length) return null;
  const fromParam = getComplexVariantByFlatType(property, flatTypeParam);
  if (fromParam) return fromParam;
  return variants[0];
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

  return normalizePropertyOffering(merged);
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

function renderComplexStatsTable(property, selectedVariant) {
  if (selectedVariant) {
    return `
      <div class="property-spec-row">
        <span class="property-spec-label">Тип квартир</span>
        <span class="property-spec-value">${escapeHtml(selectedVariant.flatTypeLabel)}</span>
      </div>
      <div class="property-spec-row">
        <span class="property-spec-label">Площадь квартир</span>
        <span class="property-spec-value">${formatVariantAreaRange(selectedVariant) || '—'}</span>
      </div>
      <div class="property-spec-row">
        <span class="property-spec-label">Количество</span>
        <span class="property-spec-value">${selectedVariant.totalApartments}</span>
      </div>
    `;
  }

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

function renderPropertyFloorPlansBlock(property, selectedFlatType, selectedSectorId = null) {
  if (!isComplex(property)) return '';

  const sectors = getComplexSectors(property);
  const selectedSector = resolveComplexSector(property, selectedSectorId, selectedFlatType);
  const variants = selectedSector
    ? selectedSector.flatVariants
    : getComplexFlatVariants(property, selectedSectorId);
  if (!variants.length) return '';

  const sectorPickerHtml = sectors.length > 1
    ? `<div class="property-sector-picker">
        ${sectors.map(sector => `
          <button
            type="button"
            class="property-sector-btn ${selectedSector?.id === sector.id ? 'active' : ''}"
            data-sector-id="${escapeAttr(sector.id)}"
          >${escapeHtml(getSectorDisplayTitle(sector.title))}</button>
        `).join('')}
      </div>`
    : '';

  const cardsHtml = variants.map((variant, index) => {
    const layouts = getVariantLayouts(variant);
    const hasMultipleLayouts = layouts.length > 1;
    const isActive = selectedFlatType && variant.flatType === selectedFlatType;
    const activeClass = isActive ? ' floor-plan-card--active' : '';
    const activeId = isActive ? ' id="floor-plan-active"' : '';

    const layoutPanelsHtml = layouts.map((layout, layoutIndex) => {
      const planImg = getVariantPlanImg(property, variant, layoutIndex, index);
      const layoutLabel = getLayoutDisplayLabel(layout.label);
      const areaLabel = formatVariantAreaRange(layout) || formatVariantAreaRange(variant) || '—';
      const priceValue = layout.price ?? variant.price ?? property.price;
      const apartmentsValue = layout.totalApartments || variant.totalApartments;
      const hiddenClass = layoutIndex === 0 ? '' : ' floor-plan-layout-panel--hidden';

      return `
        <div class="floor-plan-layout-panel${hiddenClass}" data-layout-key="${escapeAttr(layout.key)}">
          <div class="floor-plan-image">
            ${renderPropertyImg(planImg, `Планировка ${layoutLabel}`)}
          </div>
          <ul class="floor-plan-specs">
            <li>
              <span class="floor-plan-spec-label">Планировка</span>
              <span class="floor-plan-spec-value">${escapeHtml(layoutLabel)}</span>
            </li>
            <li>
              <span class="floor-plan-spec-label">Площадь</span>
              <span class="floor-plan-spec-value">${areaLabel}</span>
            </li>
            <li>
              <span class="floor-plan-spec-label">Доступно квартир</span>
              <span class="floor-plan-spec-value">${apartmentsValue}</span>
            </li>
            <li>
              <span class="floor-plan-spec-label">Цена</span>
              <span class="floor-plan-spec-value">от ${formatPrice(priceValue)}</span>
            </li>
          </ul>
        </div>
      `;
    }).join('');

    const layoutPickerHtml = hasMultipleLayouts
      ? `<div class="floor-plan-layout-picker">
          ${layouts.map((layout, layoutIndex) => `
            <button
              type="button"
              class="floor-plan-layout-btn ${layoutIndex === 0 ? 'active' : ''}"
              data-layout-key="${escapeAttr(layout.key)}"
            >${escapeHtml(getLayoutDisplayLabel(layout.label))}</button>
          `).join('')}
        </div>`
      : '';

    return `
      <article class="floor-plan-card${activeClass}"${activeId} data-flat-type="${escapeAttr(variant.flatType)}">
        <div class="floor-plan-info">
          <h3>${escapeHtml(variant.flatTypeLabel)}</h3>
          ${layoutPickerHtml}
          <div class="floor-plan-layout-panels">${layoutPanelsHtml}</div>
        </div>
      </article>
    `;
  }).join('');

  return `
    <section class="property-floor-plans" data-property-id="${escapeAttr(property.id)}">
      <div class="section-header property-floor-plans-header">
        <h2>Планировки квартир</h2>
        <p>${sectors.length > 1 ? 'Выберите тип квартиры' : 'Доступные типы квартир в этом комплексе'}</p>
      </div>
      ${sectorPickerHtml}
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
      sectors: Array.isArray(saved.sectors) && saved.sectors.length
        ? saved.sectors
        : defaults.sectors,
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

  const legacyKeys = [
    'aparts_data_v10',
    'aparts_data_v9',
    'aparts_data_v8',
    'aparts_data_v7',
    'aparts_data_v6',
    'aparts_data_v5',
    'aparts_data_v4',
    'aparts_data_v3',
    'aparts_data_v2',
    'aparts_data_v1',
  ];
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
          || JSON.stringify(property.sectors) !== JSON.stringify(source.sectors)
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
    const item = normalizePropertyOffering(normalizeComplexProperty({ ...property }));
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
