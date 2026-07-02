const STORE_KEY = 'aparts_data_v17';
const DATA_JS_VERSION = '17';
const USER_KEY = 'aparts_user';
const SITE_NAME = 'Dune Base';
const DEFAULT_IMG = 'img/default.svg';
const LOGO_IMG = 'img/logo.svg';
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

// Исходные flatVariants «Бомонд» с подписями «Сектор …» — заполняется после DEFAULT_PROPERTIES
let JK2_SOURCE_FLAT_VARIANTS = [];

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
  6000: '6 000',
  7000: '7 000',
  8000: '8 000',
};

const DEVELOPER_LIST = ['Кормат строй', 'Квартал 777', 'Монолит', 'Фаворит 13'];

const MATERNITY_CAPITAL_OPTIONS = {
  yes: 'Да',
  no: 'Нет',
};

const MARKUP_BASIS_OPTIONS = {
  after: 'После вычета',
  before: 'До вычета',
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
    title: 'ЖК «Ан-Нур»',
    description: 'ЖК Ан Нур в Грозном — новый жилой комплекс, воплощающий комфорт, стиль и современность. Этот проект от строительной компании МОНОЛИТ обещает стать идеальным местом для жизни.',
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
    address: '​Проспект Владимира Владимировича Путина, 22/4​',
    district: 'Новый район',
    developer: 'Монолит',
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
    title: 'ЖК «Бомонд»',
    description: 'Высота потолков 310 см 2 лифта на подъезд -20 этажей -Коммерция 2 этажа-Шикарный вид на весь новый центр-Рядом будет находиться новый экзотический парк-Рядом будет расположен Детский сад , Школа.Жилищный комплекс ЖК «Бомонд» - это представительские 20 этажные жилые дома , строящиеся строительной компанией ООО « Кормат-Строй»На нижних 2 этажах здания расположены коммерческие помещения, предназначенных для размещения магазинов и офисов. Рядом есть парк, что создает дополнительные возможности для прогулок и отдыха на свежем воздухе. Имеющие садик и школа обеспечивают легкую доступность образовательных учреждений для семей с детьми. Родители могут быть спокойны, зная, что их дети находятся в шаговой доступности от них. В конечном итоге жильцы ЖК «Бомонд» могут насладиться высоким уровнем комфорта и удобств,предоставляющих этим жилым комплексом.',
    type: 'jk',
    flatType: '2room',
    totalApartments: 110,
    flatVariants: [
      { flatType: '1room', totalApartments: 55, areaMin: 43.16, areaMax: 60.65, layouts: [
        { key: 'A', label: '1A - 51.74м²', areaMin: 51.74, areaMax: 51.74, planImg: 'img/Бомонд/1А.jpg' },
        { key: 'Б', label: '1Б - 51.35м²', areaMin: 51.35, areaMax: 51.35, planImg: 'img/Бомонд/1Б.jpg' },
        { key: 'В', label: '1В - 60.65м²', areaMin: 60.65, areaMax: 60.65, planImg: 'img/Бомонд/1В.jpg' },
        { key: 'Г', label: '1Г - 60.65м²', areaMin: 60.65, areaMax: 60.65, planImg: 'img/Бомонд/1Г.jpg' },
        { key: 'Д', label: '1Д - 56.03м²', areaMin: 56.03, areaMax: 56.03, planImg: 'img/Бомонд/1Д.jpg' },
        { key: 'Е', label: '1Е - 56.06м²', areaMin: 56.06, areaMax: 56.06, planImg: 'img/Бомонд/1Е.jpg' },
        { key: 'Ж', label: '1Ж - 51.74м²', areaMin: 51.74, areaMax: 51.74, planImg: 'img/Бомонд/1Ж.jpg' },

        { key: 'И', label: '1И - 51.79м²', areaMin: 51.79, areaMax: 51.79, planImg: 'img/Бомонд/1И.jpg' },
        { key: 'К', label: '1К - 59.16м²', areaMin: 59.16, areaMax: 59.16, planImg: 'img/Бомонд/1К.jpg' },
        { key: 'Л', label: '1Л - 59.16м²', areaMin: 59.16, areaMax: 59.16, planImg: 'img/Бомонд/1Л.jpg' },
        { key: 'М', label: '1М - 59.16м²', areaMin: 59.16, areaMax: 59.16, planImg: 'img/Бомонд/1М.jpg' },
        { key: 'Н', label: '1Н - 59.16м²', areaMin: 59.16, areaMax: 59.16, planImg: 'img/Бомонд/1Н.jpg' },
        { key: 'П', label: '1П - 59.79м²', areaMin: 59.79, areaMax: 59.79, planImg: 'img/Бомонд/1П.jpg' },

        { key: 'Р', label: '1Р - 51.74м²', areaMin: 51.74, areaMax: 51.74, planImg: 'img/Бомонд/1Р.jpg' },
        { key: 'С', label: '1С - 56.06м²', areaMin: 56.06, areaMax: 56.06, planImg: 'img/Бомонд/1С.jpg' },
        { key: 'Т', label: '1Т - 56.03м²', areaMin: 56.03, areaMax: 56.03, planImg: 'img/Бомонд/1Т.jpg' },
        { key: 'У', label: '1У - 60.65м²', areaMin: 60.65, areaMax: 60.65, planImg: 'img/Бомонд/1У.jpg' },
        { key: 'Ф', label: '1Ф - 60.65м²', areaMin: 60.65, areaMax: 60.65, planImg: 'img/Бомонд/1Ф.jpg' },
        { key: 'Х', label: '1Х - 51.35м²', areaMin: 51.35, areaMax: 51.35, planImg: 'img/Бомонд/1Х.jpg' },
        { key: 'Ш', label: '1Ш - 51.74м²', areaMin: 51.74, areaMax: 51.74, planImg: 'img/Бомонд/1Ш.jpg' },

        { key: 'Ж-А', label: '1А - 43.16м²', areaMin: 43.16, areaMax: 43.16, planImg: 'img/Бомонд/ЗИ-1А.jpg' },
        { key: 'Ж-Б', label: '1Б - 46.18м²', areaMin: 46.18, areaMax: 46.18, planImg: 'img/Бомонд/ЗИ-1Б.jpg' },
        { key: 'Ж-В', label: '1В - 45.75м²', areaMin: 45.75, areaMax: 45.75, planImg: 'img/Бомонд/ЗИ-1В.jpg' },
        { key: 'Ж-Г', label: '1Г - 43.16м²', areaMin: 43.16, areaMax: 43.16, planImg: 'img/Бомонд/ЗИ-1Г.jpg' },
        { key: 'Ж-Д', label: '1Д - 53.50м²', areaMin: 53.50, areaMax: 53.50, planImg: 'img/Бомонд/ЗИ-1Д.jpg' },
        { key: 'Ж-Е', label: '1Е - 53.50м²', areaMin: 53.50, areaMax: 53.50, planImg: 'img/Бомонд/ЗИ-1Е.jpg' },
        { key: 'Ж-Ж', label: '1Ж - 47.79м²', areaMin: 47.79, areaMax: 47.79, planImg: 'img/Бомонд/ЗИ-1Ж.jpg' },
        { key: 'Ж-И', label: '1И - 50.33м²', areaMin: 50.33, areaMax: 50.33, planImg: 'img/Бомонд/ЗИ-1И.jpg' },
        { key: 'Ж-К', label: '1К - 47.75м²', areaMin: 47.75, areaMax: 47.75, planImg: 'img/Бомонд/ЗИ-1К.jpg' },

        { key: 'З-А', label: '1Ж - 47.75м²', areaMin: 47.75, areaMax: 47.75, planImg: 'img/Бомонд/ЖК-1.jpg' },
        { key: 'З-Б', label: '1Е - 50.33м²', areaMin: 50.33, areaMax: 50.33, planImg: 'img/Бомонд/ЖК-2.jpg' },
        { key: 'З-В', label: '1Д - 47.79м²', areaMin: 47.79, areaMax: 47.79, planImg: 'img/Бомонд/ЖК-3.jpg' },
        { key: 'З-Г', label: '1Г - 53.50м²', areaMin: 53.50, areaMax: 53.50, planImg: 'img/Бомонд/ЖК-4.jpg' },
        { key: 'З-Д', label: '1В - 53.50м²', areaMin: 53.50, areaMax: 53.50, planImg: 'img/Бомонд/ЖК-5.jpg' },
        { key: 'З-Е', label: '1Б - 43.16м²', areaMin: 43.16, areaMax: 43.16, planImg: 'img/Бомонд/ЖК-6.jpg' },
        { key: 'З-Ж', label: '1Б - 45.75м²', areaMin: 45.75, areaMax: 45.75, planImg: 'img/Бомонд/ЖК-7.jpg' },
        { key: 'З-И', label: '1А - 46.18м²', areaMin: 46.18, areaMax: 46.18, planImg: 'img/Бомонд/ЖК-10.jpg' },
        { key: 'З-К', label: '1Б - 43.16м²', areaMin: 43.16, areaMax: 43.16, planImg: 'img/Бомонд/ЖК-11.jpg' },

      ]  },
      
      { flatType: '2room', totalApartments: 55, areaMin: 62.34, areaMax: 85.25, layouts: [
        { key: 'A', label: '2A - 64.43м²', areaMin: 64.43, areaMax: 64.43, planImg: 'img/Бомонд/2А.jpg' },
        { key: 'Б', label: '2Б - 64.43м²', areaMin: 64.43, areaMax: 64.43, planImg: 'img/Бомонд/2Б.jpg' },

        { key: 'B', label: '2В - 85.25м²', areaMin: 85.25, areaMax: 85.25, planImg: 'img/Бомонд/2В.jpg' },
        { key: 'Г', label: '2Г - 85.25м²', areaMin: 85.25, areaMax: 85.25, planImg: 'img/Бомонд/2Г.jpg' },

        { key: 'Д', label: '2Д - 64.43м²', areaMin: 64.43, areaMax: 64.43, planImg: 'img/Бомонд/2Д.jpg' },
        { key: 'Е', label: '2Е - 64.43м²', areaMin: 64.43, areaMax: 64.43, planImg: 'img/Бомонд/2Е.jpg' },

        { key: 'Ж', label: '2A - 62.34м²', areaMin: 62.34, areaMax: 62.34, planImg: 'img/Бомонд/ЗИ-2А.jpg' },
        { key: 'И', label: '2Б - 62.34м²', areaMin: 62.34, areaMax: 62.34, planImg: 'img/Бомонд/ЗА-2Б.jpg' },

        { key: 'К', label: '2A - 62.34м²', areaMin: 62.34, areaMax: 62.34, planImg: 'img/Бомонд/ЖК-8.jpg' },
        { key: 'Л', label: '2Б - 62.34м²', areaMin: 62.34, areaMax: 62.34, planImg: 'img/Бомонд/ЖК-9.jpg' },

      ] },
    ],
    areaMin: 43.16,
    areaMax: 82.25,
    price: 71000,
    address: 'Грозный, улица Э.Э. Исмаилова, 35 стр.',
    district: 'Новый район',
    developer: 'Кормат строй',
    deliveryDate: '2027г',
    installmentTerm: '1-6 лет',
    maternityCapital: 'no',
    markupBasis: 'after',
    noMarkupYears: 1,
    mandatoryPayment: 3000,
    img: 'img/1111111.jpeg',
    images: [
      'img/Бомонд/бомонд.jpg',
      'img/Бомонд/бомонд 1.jpg',
      'img/Бомонд/бомонд 2.jpg',
      'img/Бомонд/бомонд 3.jpg',
      'img/Бомонд/бомонд 4.jpg',
      'img/Бомонд/бомонд 5.jpg',
      'img/Бомонд/бомонд 6.jpg',
      'img/Бомонд/бомонд 7.jpg',
    ],
    published: true,
  },

  {
    id: 'jk3',
    title: 'ЖК «Дубайский»',
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
    developer: 'Квартал 777',
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
    title: 'ЖК «Луч»',
    description: 'ЖК Луч в Грозном — это отличный вариант для тех, кто хочет жить в современном районе с удобной транспортной доступностью и развитой городской средой.',
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
    developer: 'Квартал 777',
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

function parseFloorNumber(value) {
  const num = Number(String(value ?? '').trim());
  return Number.isFinite(num) && num > 0 ? Math.round(num) : 0;
}

function normalizeFloorRange(range) {
  const floorMin = parseFloorNumber(range?.floorMin ?? range?.from ?? range?.min);
  const floorMax = parseFloorNumber(range?.floorMax ?? range?.to ?? range?.max) || floorMin;
  if (!floorMin) return null;
  return {
    floorMin,
    floorMax: Math.max(floorMin, floorMax),
  };
}

function normalizeFloorRanges(ranges) {
  if (!Array.isArray(ranges)) {
    if (typeof ranges === 'string') return parseFloorRangesInput(ranges);
    return [];
  }

  return ranges
    .map(normalizeFloorRange)
    .filter(Boolean)
    .sort((a, b) => a.floorMin - b.floorMin || a.floorMax - b.floorMax);
}

function parseFloorRangesInput(text) {
  const ranges = [];
  for (const part of String(text || '').split(/[,;]+/)) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const dashMatch = trimmed.match(/^(\d+)\s*[-–—]\s*(\d+)$/);
    if (dashMatch) {
      const normalized = normalizeFloorRange({
        floorMin: dashMatch[1],
        floorMax: dashMatch[2],
      });
      if (normalized) ranges.push(normalized);
      continue;
    }

    const singleMatch = trimmed.match(/^(\d+)(?:\s*этаж(?:а|е|ей|ов)?)?\.?$/i);
    if (singleMatch) {
      const normalized = normalizeFloorRange({
        floorMin: singleMatch[1],
        floorMax: singleMatch[1],
      });
      if (normalized) ranges.push(normalized);
    }
  }

  return normalizeFloorRanges(ranges);
}

function formatFloorRangesInput(ranges) {
  const normalized = normalizeFloorRanges(ranges);
  if (!normalized.length) return '';
  return normalized.map((range) => {
    if (range.floorMin === range.floorMax) return String(range.floorMin);
    return `${range.floorMin}-${range.floorMax}`;
  }).join(', ');
}

function formatFloorRangeLabel(range) {
  const normalized = normalizeFloorRange(range);
  if (!normalized) return '';
  if (normalized.floorMin === normalized.floorMax) {
    return `${normalized.floorMin} этаж`;
  }
  return `${normalized.floorMin}–${normalized.floorMax} этаж`;
}

function formatFloorRangesLabel(ranges) {
  const normalized = normalizeFloorRanges(ranges);
  if (!normalized.length) return '—';
  return normalized.map(formatFloorRangeLabel).join(', ');
}

function floorRangesOverlap(a, b) {
  const left = normalizeFloorRange(a);
  const right = normalizeFloorRange(b);
  if (!left || !right) return false;
  return left.floorMin <= right.floorMax && right.floorMin <= left.floorMax;
}

function normalizeFloorPriceRange(range) {
  const floors = normalizeFloorRange(range);
  const price = Number(range?.price);
  if (!floors || !Number.isFinite(price) || price <= 0) return null;
  return { ...floors, price };
}

function normalizeFloorPriceRanges(ranges) {
  if (!Array.isArray(ranges)) return [];
  return ranges
    .map(normalizeFloorPriceRange)
    .filter(Boolean)
    .sort((a, b) => a.floorMin - b.floorMin || a.floorMax - b.floorMax);
}

function getPropertyFloorPriceRanges(property) {
  return normalizeFloorPriceRanges(property?.floorPriceRanges);
}

function getApplicableFloorPrices(property, layout) {
  const priceRanges = getPropertyFloorPriceRanges(property);
  if (!priceRanges.length) return [];

  const layoutFloors = normalizeFloorRanges(layout?.availableFloors);
  if (!layoutFloors.length) return priceRanges;

  return priceRanges.filter((priceRange) =>
    layoutFloors.some((layoutRange) => floorRangesOverlap(layoutRange, priceRange))
  );
}

function formatFloorPriceRangeLabel(range) {
  const normalized = normalizeFloorPriceRange(range);
  if (!normalized) return '';
  return `${formatFloorRangeLabel(normalized)} — от ${formatPrice(normalized.price)}`;
}

function renderPropertyFloorPricesBlock(property, options = {}) {
  const ranges = getPropertyFloorPriceRanges(property);
  if (!ranges.length) return '';

  const compact = options.compact === true;
  const sectionClass = compact
    ? 'property-floor-prices property-floor-prices--compact'
    : 'property-floor-prices';
  const headingTag = compact ? 'h3' : 'h2';
  const subtitleHtml = compact
    ? ''
    : '<p>Стоимость зависит от выбранного этажа</p>';

  return `
    <section class="${sectionClass}">
      <div class="section-header property-floor-prices-header">
        <${headingTag}>Цены по этажам</${headingTag}>
        ${subtitleHtml}
      </div>
      <div class="property-floor-prices-table-wrap">
        <table class="property-floor-prices-table">
          <thead>
            <tr>
              <th>Этажи</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            ${ranges.map((range) => `
              <tr>
                <td>${escapeHtml(formatFloorRangeLabel(range))}</td>
                <td>от ${formatPrice(range.price)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderLayoutPriceSpecs(property, layout, variant) {
  const applicablePrices = getApplicableFloorPrices(property, layout);
  if (applicablePrices.length) {
    if (applicablePrices.length === 1) {
      return `<span class="floor-plan-spec-value">от ${formatPrice(applicablePrices[0].price)}</span>`;
    }
    return `
      <ul class="floor-plan-price-list">
        ${applicablePrices.map((range) => `
          <li>${escapeHtml(formatFloorRangeLabel(range))}: от ${formatPrice(range.price)}</li>
        `).join('')}
      </ul>
    `;
  }

  const priceValue = layout.price ?? variant.price ?? property.price;
  return `<span class="floor-plan-spec-value">от ${formatPrice(priceValue)}</span>`;
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

function resolveLayoutSectorTitle(layout) {
  const fromField = stripSectorTitle(layout?.sectorTitle || '');
  if (fromField) return fromField;
  return extractSectorTitleFromLayoutLabel(layout?.label) || '';
}

function normalizeLayoutVariant(layout, index, parentVariant = {}) {
  const key = layout?.key?.trim() || getLayoutKey(index);
  const label = String(layout?.label || '').trim() || getLayoutLabel(index);
  const sectorTitle = resolveLayoutSectorTitle(layout) || undefined;
  const areaMin = Number(layout?.areaMin) || Number(parentVariant.areaMin) || 0;
  const areaMax = Number(layout?.areaMax) || Number(parentVariant.areaMax) || areaMin;
  const price = layout?.price != null && layout.price !== '' ? Number(layout.price) : null;
  const totalApartments = Number(layout?.totalApartments) || 0;
  const planImg = String(layout?.planImg || layout?.planImage || parentVariant?.planImg || '').trim();
  const availableFloors = normalizeFloorRanges(layout?.availableFloors);

  const normalized = {
    key,
    label,
    areaMin,
    areaMax,
    totalApartments,
    availableFloors,
    planImg,
    price: Number.isFinite(price) ? price : null,
  };
  if (sectorTitle) normalized.sectorTitle = sectorTitle;
  return normalized;
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

function getMaternityCapitalLabel(value) {
  return MATERNITY_CAPITAL_OPTIONS[value] || '';
}

function getMarkupBasisLabel(value) {
  return MARKUP_BASIS_OPTIONS[value] || '';
}

function normalizePropertyOffering(property) {
  const item = { ...property };
  const years = Number(item.noMarkupYears);
  const payment = Number(item.mandatoryPayment);

  if (NO_MARKUP_YEARS[years]) item.noMarkupYears = years;
  else delete item.noMarkupYears;

  if (MANDATORY_PAYMENT_OPTIONS[payment]) item.mandatoryPayment = payment;
  else delete item.mandatoryPayment;

  const developer = String(item.developer || '').trim();
  if (developer) item.developer = developer;
  else delete item.developer;

  const installmentTerm = String(item.installmentTerm || '').trim();
  if (installmentTerm) item.installmentTerm = installmentTerm;
  else delete item.installmentTerm;

  const deliveryDate = String(item.deliveryDate || '').trim();
  if (deliveryDate) item.deliveryDate = deliveryDate;
  else delete item.deliveryDate;

  if (item.maternityCapital === true) item.maternityCapital = 'yes';
  if (item.maternityCapital === false) item.maternityCapital = 'no';
  if (MATERNITY_CAPITAL_OPTIONS[item.maternityCapital]) {
    item.maternityCapital = item.maternityCapital;
  } else {
    delete item.maternityCapital;
  }

  if (MARKUP_BASIS_OPTIONS[item.markupBasis]) {
    item.markupBasis = item.markupBasis;
  } else {
    delete item.markupBasis;
  }

  if (isComplex(item)) {
    item.floorPriceRanges = normalizeFloorPriceRanges(item.floorPriceRanges);
    if (!item.floorPriceRanges.length) delete item.floorPriceRanges;
  } else {
    delete item.floorPriceRanges;
  }

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

function renderPropertySpecRow(label, value) {
  const display = value != null && String(value).trim() !== '' ? String(value).trim() : '—';
  return `
    <div class="property-spec-row">
      <span class="property-spec-label">${escapeHtml(label)}</span>
      <span class="property-spec-value">${escapeHtml(display)}</span>
    </div>
  `;
}

function renderPropertyOfferingSpecs(property) {
  const noMarkupLabel = getNoMarkupYearsFilterLabel(property.noMarkupYears);
  const paymentLabel = getMandatoryPaymentLabel(property.mandatoryPayment);
  const rows = [
    renderPropertySpecRow('Застройщик', property.developer),
    renderPropertySpecRow('Срок сдачи объекта', property.deliveryDate),
    renderPropertySpecRow('Срок предоставления рассрочки', property.installmentTerm),
    renderPropertySpecRow('Материнский капитал', getMaternityCapitalLabel(property.maternityCapital)),
    renderPropertySpecRow('Наценка', getMarkupBasisLabel(property.markupBasis)),
  ];

  if (noMarkupLabel) {
    rows.push(renderPropertySpecRow('Без наценки', getNoMarkupYearsLabel(property.noMarkupYears)));
  }
  if (paymentLabel) {
    rows.push(renderPropertySpecRow('Обязательный платёж', paymentLabel));
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

  return savedVariants
    .map(variant => normalizeFlatVariant({
      ...defaultsByType[variant.flatType],
      ...variant,
    }))
    .filter(Boolean);
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
    .replace(/^(?:сектор\s*)+/gi, '')
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

const SECTOR_TITLE_COLLATOR = typeof Intl !== 'undefined'
  ? new Intl.Collator('ru', { sensitivity: 'base' })
  : null;

function compareSectorTitles(titleA, titleB) {
  const left = stripSectorTitle(titleA);
  const right = stripSectorTitle(titleB);
  if (!left && !right) return 0;
  if (!left) return 1;
  if (!right) return -1;
  if (SECTOR_TITLE_COLLATOR) return SECTOR_TITLE_COLLATOR.compare(left, right);
  return left.localeCompare(right, 'ru', { sensitivity: 'base', numeric: true });
}

function sortSectorsAlphabetically(sectors) {
  return [...sectors].sort((a, b) => compareSectorTitles(a.title, b.title));
}

function getConfiguredSectorTitles(layoutsConfig, preferredOrder = []) {
  const configKeys = Object.keys(layoutsConfig || {})
    .map((key) => stripSectorTitle(key))
    .filter(Boolean);
  const configKeySet = new Set(configKeys);

  if (Array.isArray(preferredOrder) && preferredOrder.length) {
    const ordered = preferredOrder
      .map((title) => stripSectorTitle(title))
      .filter((title) => configKeySet.has(title));
    const orderedSet = new Set(ordered);
    const remaining = configKeys
      .filter((title) => !orderedSet.has(title))
      .sort(compareSectorTitles);
    return [...ordered, ...remaining];
  }

  return configKeys.sort(compareSectorTitles);
}

function getJk2LayoutConfigForSector(layoutsConfig, sectorTitle) {
  const normalized = stripSectorTitle(sectorTitle);
  if (!normalized || !layoutsConfig) return null;

  if (layoutsConfig[normalized]) return layoutsConfig[normalized];

  const matchedKey = Object.keys(layoutsConfig).find(
    (key) => stripSectorTitle(key) === normalized
  );
  return matchedKey ? layoutsConfig[matchedKey] : null;
}

function getLayoutDisplayLabel(label) {
  const raw = String(label || '').trim();
  if (!raw) return '';

  const typeLabel = extractLayoutTypeFromLabel(raw);
  if (typeLabel) return typeLabel;

  const withoutSectorPrefix = raw
    .replace(/^Сектор\s+/i, '')
    .replace(/\s+Тип-.+$/i, '')
    .trim();
  return stripSectorTitle(withoutSectorPrefix) || stripSectorTitle(raw) || raw;
}

function preserveLayoutLabel(label) {
  const raw = String(label || '').trim();
  if (!raw) return '';

  if (/^Сектор\s+.+\s+Тип-/i.test(raw)) {
    return getLayoutDisplayLabel(raw);
  }

  return raw;
}

function getSectorDisplayTitle(title) {
  return stripSectorTitle(title);
}

function sanitizeLayoutLabel(label) {
  return preserveLayoutLabel(label);
}

function restoreMissingSectorVariantsFromDefaults(property) {
  if (!isComplex(property)) return property;

  const defaults = DEFAULT_PROPERTIES.find(item => item.id === property.id);
  if (!defaults || !Array.isArray(property.sectors) || !property.sectors.length) return property;

  const defaultSectors = buildSectorsFromFlatVariants(getFlatVariantsForSectorBuild(defaults));
  if (!defaultSectors.length) return property;

  let changed = false;

  property.sectors = property.sectors.map((sector) => {
    const sectorTitle = stripSectorTitle(sector?.title);
    const defaultSector = defaultSectors.find(item => stripSectorTitle(item.title) === sectorTitle);
    if (!defaultSector) return sector;

    const existingTypes = new Set((sector.flatVariants || []).map(variant => variant.flatType));
    const missingVariants = defaultSector.flatVariants.filter(variant => !existingTypes.has(variant.flatType));
    if (!missingVariants.length) return sector;

    changed = true;
    return {
      ...sector,
      flatVariants: [...(sector.flatVariants || []), ...missingVariants.map(variant => ({ ...variant }))],
    };
  });

  return changed ? repairComplexSectorData(property) : property;
}

function sanitizeComplexPropertyForStorage(property) {
  if (!isComplex(property)) return property;

  const item = { ...property };
  repairComplexSectorData(item);

  if (Array.isArray(item.sectors) && item.sectors.length) {
    item.sectors = item.sectors
      .map((sector, index) => {
        const title = stripSectorTitle(sector?.title) || String.fromCharCode(65 + index);
        if (isGeneralSectorTitle(title)) return null;

        const flatVariants = (Array.isArray(sector?.flatVariants) ? sector.flatVariants : [])
          .map((variant) => {
            const normalized = normalizeFlatVariant(variant);
            if (!normalized) return null;
            return {
              ...normalized,
              layouts: getVariantLayouts(normalized).map((layout, layoutIndex) => {
                const sectorTitle = resolveLayoutSectorTitle(layout) || undefined;
                return normalizeLayoutVariant({
                  ...layout,
                  sectorTitle,
                  label: sanitizeLayoutLabel(layout.label) || layout.label,
                }, layoutIndex, normalized);
              }),
            };
          })
          .filter(Boolean);

        if (!flatVariants.length) return null;
        return {
          id: String(sector?.id || slugifySectorId(title) || `sector-${index + 1}`).trim(),
          title,
          flatVariants,
        };
      })
      .filter(Boolean);

    item.sectors = sortSectorsAlphabetically(item.sectors);
    item.flatVariants = mergeAggregatedFlatVariants(
      item.sectors.flatMap(sector => sector.flatVariants)
    );
  } else if (Array.isArray(item.flatVariants)) {
    item.flatVariants = item.flatVariants.map((variant) => {
      const normalized = normalizeFlatVariant(variant);
      if (!normalized) return null;
      return {
        ...normalized,
        layouts: getVariantLayouts(normalized).map((layout, layoutIndex) => {
          const sectorTitle = resolveLayoutSectorTitle(layout) || undefined;
          return normalizeLayoutVariant({
            ...layout,
            sectorTitle,
            label: sanitizeLayoutLabel(layout.label) || layout.label,
          }, layoutIndex, normalized);
        }),
      };
    }).filter(Boolean);
  }

  return repairComplexSectorData(restoreMissingSectorVariantsFromDefaults(item));
}

function repairComplexSectorData(property) {
  if (!isComplex(property)) return property;

  const hasStoredSectors = Array.isArray(property.sectors) && property.sectors.length;

  if (hasStoredSectors) {
    property.sectors = property.sectors
      .map((sector, index) => normalizeSector(sector, index))
      .filter(Boolean);
  } else if (Array.isArray(property.flatVariants) && property.flatVariants.length) {
    property.sectors = buildSectorsFromFlatVariants(getFlatVariantsForSectorBuild(property));
  } else {
    property.sectors = [];
  }

  property.sectors = sortSectorsAlphabetically(property.sectors);

  if (property.sectors.length) {
    property.flatVariants = mergeAggregatedFlatVariants(
      property.sectors.flatMap(sector => sector.flatVariants)
    );
  } else if (Array.isArray(property.flatVariants)) {
    property.flatVariants = property.flatVariants.map(normalizeFlatVariant).filter(Boolean);
  }

  if (property.flatVariants?.length) {
    const primary = property.flatVariants.find(variant => variant.flatType === property.flatType)
      || property.flatVariants[0];
    property.flatType = primary.flatType;
    property.totalApartments = property.flatVariants.reduce(
      (sum, variant) => sum + (Number(variant.totalApartments) || 0),
      0
    );
    const areaMins = property.flatVariants
      .map(variant => Number(variant.areaMin) || 0)
      .filter(value => value > 0);
    const areaMaxs = property.flatVariants
      .map(variant => Number(variant.areaMax) || Number(variant.areaMin) || 0)
      .filter(value => value > 0);
    property.areaMin = areaMins.length ? Math.min(...areaMins) : primary.areaMin;
    property.areaMax = areaMaxs.length ? Math.max(...areaMaxs) : primary.areaMax;
  }

  return property;
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
      sectorTitle: resolveLayoutSectorTitle(layout) || undefined,
    }, index, sourceVariant)),
  });
}

function getFlatVariantsForSectorBuild(property) {
  const defaults = DEFAULT_PROPERTIES.find(item => item.id === property.id);
  const savedVariants = getLegacyRootFlatVariants(property);
  const baselineVariants = property.id === 'jk2' && Array.isArray(JK2_SOURCE_FLAT_VARIANTS) && JK2_SOURCE_FLAT_VARIANTS.length
    ? JK2_SOURCE_FLAT_VARIANTS
    : defaults?.flatVariants;

  if (!baselineVariants?.length) return savedVariants;

  return baselineVariants.map((defaultVariant) => {
    const saved = savedVariants.find(variant => variant.flatType === defaultVariant.flatType);
    if (!saved) return { ...defaultVariant };

    return {
      ...defaultVariant,
      ...saved,
      layouts: defaultVariant.layouts,
    };
  });
}

function buildSectorsFromFlatVariants(flatVariants) {
  const sectorMap = new Map();
  const sourceTotals = new Map();

  for (const sourceVariant of flatVariants) {
    const flatType = FLAT_TYPE_LABELS[sourceVariant?.flatType] ? sourceVariant.flatType : null;
    if (!flatType) continue;

    const normalizedVariant = normalizeFlatVariant(sourceVariant);
    if (!normalizedVariant) continue;

    sourceTotals.set(flatType, Number(sourceVariant.totalApartments ?? normalizedVariant.totalApartments) || 0);

    const rawLayouts = Array.isArray(sourceVariant.layouts) && sourceVariant.layouts.length
      ? sourceVariant.layouts
      : [{
        label: sourceVariant.planImg || sourceVariant.planImage ? '' : '',
        planImg: sourceVariant.planImg || sourceVariant.planImage,
        areaMin: sourceVariant.areaMin,
        areaMax: sourceVariant.areaMax,
        price: sourceVariant.price,
        totalApartments: sourceVariant.totalApartments,
      }];

    const layoutsBySector = new Map();

    for (const layout of rawLayouts) {
      const sectorTitle = resolveLayoutSectorTitle(layout);
      if (!sectorTitle || isGeneralSectorTitle(sectorTitle)) continue;
      if (!layoutsBySector.has(sectorTitle)) layoutsBySector.set(sectorTitle, []);
      layoutsBySector.get(sectorTitle).push({
        ...layout,
        sectorTitle,
      });
    }

    for (const [sectorTitle, sectorLayouts] of layoutsBySector) {
      if (!sectorMap.has(sectorTitle)) {
        sectorMap.set(sectorTitle, {
          title: formatSectorTitle(sectorTitle),
          flatVariantsByType: new Map(),
        });
      }

      const sectorVariant = buildSectorVariantFromLayouts(
        flatType,
        normalizedVariant,
        sectorLayouts
      );
      if (sectorVariant) {
        sectorMap.get(sectorTitle).flatVariantsByType.set(flatType, sectorVariant);
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

  if (Array.isArray(property.sectors) && property.sectors.length) {
    return sortSectorsAlphabetically(
      property.sectors
        .map((sector, index) => normalizeSector(sector, index))
        .filter(Boolean)
    );
  }

  const legacyVariants = getFlatVariantsForSectorBuild(property);
  if (!legacyVariants.length) return [];

  return buildSectorsFromFlatVariants(legacyVariants);
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
  return repairComplexSectorData(property);
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

function getPropertyDetailHref(property, options = {}) {
  const params = new URLSearchParams({ id: property.id });
  const includeFlatType = options.includeFlatType ?? !options.overview;
  if (includeFlatType && isComplex(property) && property.flatType) {
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

function mergePropertyDetails(property, defaults) {
  if (!defaults) return property;

  const item = { ...property };
  for (const key of ['developer', 'deliveryDate', 'installmentTerm', 'maternityCapital', 'markupBasis']) {
    const saved = item[key];
    const fallback = defaults[key];
    if ((saved == null || String(saved).trim() === '') && fallback != null && String(fallback).trim() !== '') {
      item[key] = fallback;
    }
  }
  return item;
}

function enrichProperty(property) {
  const defaults = DEFAULT_PROPERTIES.find(item => item.id === property.id);
  const hasSavedSectors = Array.isArray(property.sectors) && property.sectors.length;
  const merged = mergePropertyDetails({
    ...defaults,
    ...property,
    district: property.district || defaults?.district || '',
  }, defaults);

  if (hasSavedSectors) {
    merged.sectors = property.sectors;
    if (Array.isArray(property.flatVariants)) {
      merged.flatVariants = property.flatVariants;
    } else {
      delete merged.flatVariants;
    }
  }

  if (isComplex(merged)) {
    Object.assign(merged, normalizeComplexProperty(merged));
    restoreMissingSectorVariantsFromDefaults(merged);
    if (merged.id === 'jk2') {
      Object.assign(merged, applyJk2BomondDataFromConfig(merged));
    }
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
  const areaLabel = property.catalogKey
    ? formatVariantAreaRange(property)
    : formatComplexAreaRange(property);
  const areaTag = areaLabel
    ? `<span class="property-attr-tag">${areaLabel}</span>`
    : '';
  return `
    ${areaTag}
    <span class="property-attr-tag">${escapeHtml(stats.flatTypeLabel)}</span>
    <span class="property-attr-tag">${stats.totalApartments} кв.</span>
  `;
}

function renderComplexStatsTable(property, selectedVariant, options = {}) {
  if (selectedVariant) {
    return '';
  }

  let variants = getComplexFlatVariants(property);

  if (options.overview) {
    variants = variants.filter(variant => variant.flatType !== '1room' && variant.flatType !== '2room');
  }

  if (!variants.length) {
    return '';
  }

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

function renderPropertyDetailTitle(property, selectedVariant = null) {
  if (!selectedVariant) {
    return `<h1 class="property-detail-title">${escapeHtml(property.title)}</h1>`;
  }

  return `
    <h1 class="property-detail-title">
      <span class="property-detail-title-name">${escapeHtml(property.title)}</span>
      <span class="property-detail-title-type">${escapeHtml(selectedVariant.flatTypeLabel)}</span>
    </h1>
  `;
}

function renderPropertyFloorPlansBlock(property, selectedFlatType, selectedSectorId = null) {
  if (!isComplex(property)) return '';

  const allSectors = getComplexSectors(property);
  const sectors = selectedFlatType
    ? allSectors.filter(sector => sectorHasFlatType(sector, selectedFlatType))
    : allSectors;
  const selectedSector = resolveComplexSector(property, selectedSectorId, selectedFlatType);
  let variants = selectedSector
    ? selectedSector.flatVariants
    : getComplexFlatVariants(property, selectedSectorId);

  if (selectedFlatType) {
    variants = variants.filter(variant => variant.flatType === selectedFlatType);
  }

  if (!variants.length) return '';

  const sectorPickerHtml = sectors.length > 1
    ? `<div class="property-sector-block">
        <h3 class="property-sector-heading">Сектор</h3>
        <div class="property-sector-picker">
          ${sectors.map(sector => {
            const sectorLabel = getSectorDisplayTitle(sector.title);
            return `
          <button
            type="button"
            class="property-sector-btn ${selectedSector?.id === sector.id ? 'active' : ''}"
            data-sector-id="${escapeAttr(sector.id)}"
            title="${escapeAttr(sectorLabel)}"
          >${escapeHtml(sectorLabel)}</button>
        `;
          }).join('')}
        </div>
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
      const apartmentsValue = layout.totalApartments > 0
        ? layout.totalApartments
        : (variant.totalApartments || '—');
      const floorsLabel = formatFloorRangesLabel(layout.availableFloors);
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
              <span class="floor-plan-spec-label">Этажи</span>
              <span class="floor-plan-spec-value">${escapeHtml(floorsLabel)}</span>
            </li>
            <li class="floor-plan-spec-prices">
              <span class="floor-plan-spec-label">Цена</span>
              ${renderLayoutPriceSpecs(property, layout, variant)}
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
          ${selectedFlatType ? '' : `<h3>${escapeHtml(variant.flatTypeLabel)}</h3>`}
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
        <p>${selectedFlatType
          ? (sectors.length > 1 ? 'Выберите обозначение и планировку' : 'Доступные планировки')
          : (sectors.length > 1 ? 'Выберите обозначение и тип квартиры' : 'Доступные типы квартир в этом комплексе')}</p>
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
      developer: defaults.developer != null && String(defaults.developer).trim() !== ''
        ? defaults.developer
        : saved.developer,
      sectors: Array.isArray(saved.sectors) && saved.sectors.length
        ? saved.sectors
        : defaults.sectors,
      flatVariants: Array.isArray(saved.sectors) && saved.sectors.length
        ? (Array.isArray(saved.flatVariants) ? saved.flatVariants : [])
        : mergeFlatVariants(defaults.flatVariants, saved.flatVariants),
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
    'aparts_data_v16',
    'aparts_data_v15',
    'aparts_data_v14',
    'aparts_data_v13',
    'aparts_data_v12',
    'aparts_data_v11',
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
        const repaired = mergeStoredPropertiesWithDefaults(data.properties).map((property) => {
          const item = sanitizeComplexPropertyForStorage(
            normalizeComplexProperty({ ...property })
          );
          const images = repairPropertyImages(item);
          item.img = images.img;
          item.images = images.images;
          delete item.imageUrl;
          return normalizePropertyOffering(item);
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
          || JSON.stringify(property.floorPriceRanges) !== JSON.stringify(source.floorPriceRanges)
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
    const item = sanitizeComplexPropertyForStorage(
      normalizePropertyOffering(normalizeComplexProperty({ ...property }))
    );
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

// =============================================================================
// БОМОНД (jk2) — редактируйте данные здесь в data.js
// После изменений: git pull (если нужно) + Ctrl+Shift+R в браузере
//
// floorPriceRanges — цены по диапазонам этажей для всего объекта
// developer, deliveryDate, installmentTerm, maternityCapital, markupBasis — характеристики объекта
// layouts — количество квартир, этажи и подпись для каждой планировки в секторе
//   label — своё название планировки (необязательно)
//   availableFloors: строка "3-8, 12" или массив [{ floorMin: 3, floorMax: 8 }]
//
// Если указать sectors целиком — используется он вместо автосборки из flatVariants
// =============================================================================
JK2_SOURCE_FLAT_VARIANTS = JSON.parse(JSON.stringify(
  (DEFAULT_PROPERTIES.find(item => item.id === 'jk2') || {}).flatVariants || []
));

const JK2_BOMOND_DATA = {
  developer: 'Кормат строй',
  deliveryDate: '2027г',
  installmentTerm: '1-6 лет',
  maternityCapital: 'no',
  markupBasis: 'after',

  floorPriceRanges: [
    { floorMin: 3, floorMax: 5, price: 85000 },
    { floorMin: 6, floorMax: 8, price: 80000 },
    { floorMin: 9, floorMax: 11, price: 77000 },
    { floorMin: 12, floorMax: 14, price: 74000 },
    { floorMin: 15, floorMax: 19, price: 71000 },
  ],

  // Порядок секторов на странице объекта (алфавитный, одна буква = один сектор)
  sectorOrder: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'],

  // Сектор → тип квартир → ключ планировки → данные
  layouts: {
    'А': {
      '1room': {
        A: { totalApartments: 11, availableFloors: '4, 6-8, 10-14 , 17, 19' }, /* 3\5 */
        '\u0411': { totalApartments: 10, availableFloors: '4-12, 19' },  /* 3\5 */
        '\u0412': { totalApartments: 11, availableFloors: '3-8, 10-11, 13-14, 18' }, 
        '\u0413': { totalApartments: 12, availableFloors: '3-8, 10-11, 13-14, 17-18' },
        '\u0414': { totalApartments: 10, availableFloors: '3-8, 10-11, 14, 19' },
        '\u0415': { totalApartments: 10, availableFloors: '3-8, 10-11, 14, 19' },
        '\u0416': { totalApartments: 11, availableFloors: '3-8, 10-14' },
      },
      
      '2room': {
        A: { totalApartments: 1, availableFloors: '5' },  /* 3\4 */
        /*'\u0411': { totalApartments: 5, availableFloors: '5, 6-15' }, /* 3\4 */
      },
    },

    'Б': {
      '1room': {
        '\u0418': { totalApartments: 7, availableFloors: '4-5, 7-10, 18' },  /* */
        '\u041a': { totalApartments: 3, availableFloors: '5, 7, 15' },  /* */
        '\u041b': { totalApartments: 14, availableFloors: '3-11, 13-14, 17-19' },
        '\u041c': { totalApartments: 14, availableFloors: '3-14, 17-18' }, 
        '\u041d': { totalApartments: 1, availableFloors: '5' },  /* */
        '\u041f': { totalApartments: 1, availableFloors: '8' },  /* */
      },
      '2room': {
        B: { totalApartments: 2, availableFloors: '11, 17' },  /* */
        '\u0413': { totalApartments: 1, availableFloors: '8' },  /* */
      },
    },

    'В': {
      '1room': {
        '\u0420': { totalApartments: 5, availableFloors: '4-5, 7-8, 10' },  /* */
        '\u0421': { totalApartments: 3, availableFloors: '4-5, 8' },  /* */
        '\u0422': { totalApartments: 13, availableFloors: '3-11, 13-14, 17, 19' },
        '\u0423': { totalApartments: 12, availableFloors: '3-14' },
        '\u0424': { totalApartments: 12, availableFloors: '3-11, 13-15, 17' },
        '\u0425': { totalApartments: 9, availableFloors: '3-8, 11, 13, 19,' },  
        '\u0428': { totalApartments: 6, availableFloors: '4-5, 7-8, 11, 19' },  /* */
      },
      '2room': { 
        '\u0414': { totalApartments: 1, availableFloors: '19' },  /* */
        '\u0415': { totalApartments: 1, availableFloors: '19' },  /* */
      },
    },

    'Г': {
      '1room': {
        A: { totalApartments: 6, availableFloors: '4-8, 11' },
        '\u0411': { totalApartments: 10, availableFloors: '3-5, 7-8, 10-11, 14, 18-19' },  /* 3 */
        '\u0412': { totalApartments: 13, availableFloors: '3-5, 7-14, 17, 19' },
        '\u0413': { totalApartments: 14, availableFloors: '3-11, 13-14, 17-19' },
        '\u0414': { totalApartments: 14, availableFloors: '3-11, 13-14, 16-17, 19' },
        '\u0415': { totalApartments: 3, availableFloors: '3-5' },
        '\u0416': { totalApartments: 2, availableFloors: '5, 7' },
      },

      '2room': {
        A: { totalApartments: 1, availableFloors: '3' },  /* 3 */
        '\u0411': { totalApartments: 3, availableFloors: '8, 10, 19' }, /* 3 */
      },
    },

    'Д': {
      '1room': {
        '\u0418': { totalApartments: 7, availableFloors: '3-8, 19' },  /* */
        '\u041a': { totalApartments: 5, availableFloors: '3, 5, 14, 18-19' },  /* */
        '\u041b': { totalApartments: 14, availableFloors: '3-5, 7-14, 17-19' },
        '\u041c': { totalApartments: 13, availableFloors: '4-12, 14-15, 18-19' }, 
        '\u041d': { totalApartments: 14, availableFloors: '3-5, 7-8, 10-11, 13, 19' },  /* */
        '\u041f': { totalApartments: 7, availableFloors: '4-9, 19' },  /* */
      },
      '2room': {
        B: { totalApartments: 2, availableFloors: '10, 13' },  /* */
        '\u0413': { totalApartments: 4, availableFloors: '4-5, 10-11' },  /* */
      },
    },

    'Е': {
      '1room': {
        '\u0420': { totalApartments: 11, availableFloors: '3-5, 7-11, 13-14, 17' },  /* */
        '\u0421': { totalApartments: 8, availableFloors: '3-8, 11, 18' },  /* */
        '\u0422': { totalApartments: 16, availableFloors: '3-14, 16-19' },
        '\u0423': { totalApartments: 15, availableFloors: '3-14, 17-19' },
        '\u0424': { totalApartments: 15, availableFloors: '3-14, 17-19' },
        '\u0425': { totalApartments: 10, availableFloors: '4-11, 14, 19' },  
        '\u0428': { totalApartments: 11, availableFloors: '3-5, 7-9, 11, 13-14, 18-19' },  /* */
      },
      '2room': { 
        '\u0414': { totalApartments: 1, availableFloors: '3' },  /* */
        '\u0415': { totalApartments: 1, availableFloors: '11' },  /* */
      },
    },

    'Ж': {
      '1room': {
        '\u0417-\u0410': { totalApartments: 6, availableFloors: '3-5, 7-8, 19' },
        '\u0417-\u0411': { totalApartments: 7, availableFloors: '3-4, 7-8, 10, 12, 19' },
        '\u0417-\u0412': { totalApartments: 1, availableFloors: '19' },
        '\u0417-\u0413': { totalApartments: 1, availableFloors: '19' },
        '\u0417-\u0414': { totalApartments: 1, availableFloors: '19' },
        '\u0417-\u0415': { totalApartments: 1, availableFloors: '8' },
        '\u0417-\u0416': { totalApartments: 1, availableFloors: '19' },
        '\u0417-\u0418': { totalApartments: 3, availableFloors: '4-5, 8' },
        '\u0417-\u041a': { totalApartments: 3, availableFloors: '4-5, 8' },
      },
      '2room': {
        '\u041a': { totalApartments: 1, availableFloors: '3' },
        '\u041b': { totalApartments: 1, availableFloors: '3' },
      },
    },

    'З': {
      '1room': {
        '\u0416-\u0410': { totalApartments: 2, availableFloors: '4-5' },
        '\u0416-\u0411': { totalApartments: 6, availableFloors: '3-5, 8, 11, 19' },
        '\u0416-\u0412': { totalApartments: 1, availableFloors: '18' },
        '\u0416-\u0413': { totalApartments: 1, availableFloors: '3' },
        '\u0416-\u0414': { totalApartments: 1, availableFloors: '18' },
        '\u0416-\u0415': { totalApartments: 2, availableFloors: '13, 18' },
        '\u0416-\u0416': { totalApartments: 2, availableFloors: '13, 18' },
        '\u0416-\u0418': { totalApartments: 4, availableFloors: '4-5, 10, 19' },
        '\u0416-\u041a': { totalApartments: 7, availableFloors: '3-5, 8, 11, 18, 19' },
      },
      '2room': {
        '\u0416': { totalApartments: 1, availableFloors: '3' },
        '\u0418': { totalApartments: 1, availableFloors: '3' },
      },
    },

    'И': {
      '1room': {
        '\u0416-\u0410': { totalApartments: 2, availableFloors: '4-5' },
        '\u0416-\u0411': { totalApartments: 3, availableFloors: '4-5, 7' },
        '\u0416-\u0412': { totalApartments: 6, availableFloors: '3-5, 7-8, 18' },
        '\u0416-\u0413': { totalApartments: 7, availableFloors: '3-5, 7-9, 17' },
        '\u0416-\u0414': { totalApartments: 11, availableFloors: '3-8, 10-11, 14, 18-19' },
        '\u0416-\u0415': { totalApartments: 10, availableFloors: '3-8, 10-11, 18-19' },
        '\u0416-\u0416': { totalApartments: 9, availableFloors: '3-8, 13, 18-19' },
        '\u0416-\u0418': { totalApartments: 8, availableFloors: '3-5, 7-9, 18-19' },
        '\u0416-\u041a': { totalApartments: 9, availableFloors: '3-5, 7-8, 11, 14, 18-19' },
      },
      '2room': {
        '\u0416': { totalApartments: 1, availableFloors: '3' },
        '\u0418': { totalApartments: 2, availableFloors: '8, 17' },
      },
    },

    'К': {
      '1room': {
        '\u0416-\u0410': { totalApartments: 8, availableFloors: '3-5, 7-8, 11, 18-19' },
        '\u0416-\u0411': { totalApartments: 8, availableFloors: '3-5, 7-8, 11, 18-19' },
        '\u0416-\u0412': { totalApartments: 12, availableFloors: '3-11, 14, 18-19' },
        '\u0416-\u0413': { totalApartments: 11, availableFloors: '3-5, 7-11, 14, 18-19 ' },
        '\u0416-\u0414': { totalApartments: 12, availableFloors: '3-11, 14, 18-19' },
        '\u0416-\u0415': { totalApartments: 5, availableFloors: '3-5, 7-8' },
        '\u0416-\u0416': { totalApartments: 5, availableFloors: '4-5, 7-8, 19' },
        '\u0416-\u0418': { totalApartments: 1, availableFloors: '5' },
        '\u0416-\u041a': { totalApartments: 2, availableFloors: '4-5' },
      },
      '2room': {
        '\u041a': { totalApartments: 1, availableFloors: '3' },
        '\u041b': { totalApartments: 1, availableFloors: '3' },
      },
    },
  },

  // Опционально: полная структура sectors (если заполнить — layouts игнорируется)
  sectors: null,
};

function getJk2LayoutDetailConfig(sectorTitle, flatType, layoutKey) {
  const sectorConfig = JK2_BOMOND_DATA.layouts?.[stripSectorTitle(sectorTitle)];
  if (!sectorConfig) return null;
  const flatConfig = sectorConfig[flatType];
  if (!flatConfig) return null;
  return flatConfig[layoutKey] ?? flatConfig[String(layoutKey)] ?? null;
}

function resolveLayoutAvailableFloors(detail, layout) {
  if (detail?.availableFloors != null) {
    return typeof detail.availableFloors === 'string'
      ? parseFloorRangesInput(detail.availableFloors)
      : normalizeFloorRanges(detail.availableFloors);
  }
  return normalizeFloorRanges(layout?.availableFloors);
}

function distributeApartmentsAcrossLayouts(total, layoutCount) {
  const count = Math.max(0, Number(total) || 0);
  const slots = Math.max(1, Number(layoutCount) || 1);
  const result = new Array(slots).fill(0);
  for (let index = 0; index < count; index += 1) {
    result[index % slots] += 1;
  }
  return result;
}

function buildJk2SectorsFromLayoutConfig(sourceVariants) {
  const layoutLookup = new Map();

  for (const variant of sourceVariants || []) {
    const flatType = FLAT_TYPE_LABELS[variant?.flatType] ? variant.flatType : null;
    if (!flatType) continue;
    if (!layoutLookup.has(flatType)) layoutLookup.set(flatType, new Map());

    for (const layout of variant.layouts || []) {
      if (!layout?.key) continue;
      layoutLookup.get(flatType).set(String(layout.key), layout);
    }
  }

  const sectors = [];
  const layoutsConfig = JK2_BOMOND_DATA.layouts || {};
  const sectorTitles = getConfiguredSectorTitles(layoutsConfig, JK2_BOMOND_DATA.sectorOrder);

  for (const sectorTitle of sectorTitles) {
    const flatTypesConfig = getJk2LayoutConfigForSector(layoutsConfig, sectorTitle);
    if (!flatTypesConfig) continue;
    const flatVariantsByType = new Map();

    for (const [flatType, layoutsForType] of Object.entries(flatTypesConfig || {})) {
      if (!FLAT_TYPE_LABELS[flatType]) continue;

      const sourceMap = layoutLookup.get(flatType);
      const sourceVariant = (sourceVariants || []).find(variant => variant.flatType === flatType);
      if (!sourceMap || !sourceVariant) continue;

      const sectorLayouts = [];
      for (const [layoutKey, detail] of Object.entries(layoutsForType || {})) {
        const sourceLayout = sourceMap.get(String(layoutKey));
        if (!sourceLayout) continue;

        sectorLayouts.push({
          ...sourceLayout,
          sectorTitle,
          label: detail?.label ? String(detail.label).trim() : sourceLayout.label,
        });
      }

      if (!sectorLayouts.length) continue;

      const sectorVariant = buildSectorVariantFromLayouts(flatType, sourceVariant, sectorLayouts);
      if (sectorVariant) flatVariantsByType.set(flatType, sectorVariant);
    }

    if (!flatVariantsByType.size) continue;

    sectors.push({
      id: slugifySectorId(formatSectorTitle(sectorTitle)) || `sector-${sectors.length + 1}`,
      title: formatSectorTitle(sectorTitle),
      flatVariants: [...flatVariantsByType.values()],
    });
  }

  return sortSectorsAlphabetically(sectors);
}

function buildJk2SectorsFromExplicitData(sectorsData) {
  return sortSectorsAlphabetically(sectorsData
    .map((sector, index) => {
      const title = formatSectorTitle(sector?.title || String.fromCharCode(65 + index));
      const flatVariants = (Array.isArray(sector?.flatVariants) ? sector.flatVariants : [])
        .map((variant) => normalizeFlatVariant({
          ...variant,
          layouts: (variant?.layouts || []).map((layout, layoutIndex) => normalizeLayoutVariant({
            ...layout,
            availableFloors: typeof layout?.availableFloors === 'string'
              ? parseFloorRangesInput(layout.availableFloors)
              : layout?.availableFloors,
          }, layoutIndex, variant)),
        }))
        .filter(Boolean);

      if (!flatVariants.length) return null;
      return {
        id: String(sector?.id || slugifySectorId(title) || `sector-${index + 1}`).trim(),
        title,
        flatVariants,
      };
    })
    .filter(Boolean));
}

function applyJk2LayoutDetailsToSectors(sectors) {
  return sectors.map((sector) => {
    const sectorTitle = stripSectorTitle(sector.title);
    const flatVariants = (sector.flatVariants || []).map((variant) => {
      const rawLayouts = getVariantLayouts(variant);
      const distributed = distributeApartmentsAcrossLayouts(
        variant.totalApartments,
        rawLayouts.length
      );

      const layouts = rawLayouts.map((layout, index) => {
        const detail = getJk2LayoutDetailConfig(sectorTitle, variant.flatType, layout.key);
        const totalApartments = detail?.totalApartments ?? layout.totalApartments ?? distributed[index] ?? 0;
        const customLabel = detail?.label ? String(detail.label).trim() : '';
        return normalizeLayoutVariant({
          ...layout,
          label: customLabel || layout.label,
          totalApartments,
          availableFloors: resolveLayoutAvailableFloors(detail, layout),
          sectorTitle: sectorTitle || resolveLayoutSectorTitle(layout) || undefined,
        }, index, variant);
      });

      const layoutApartmentSum = layouts.reduce(
        (sum, layout) => sum + (Number(layout.totalApartments) || 0),
        0
      );

      return normalizeFlatVariant({
        ...variant,
        totalApartments: layoutApartmentSum > 0 ? layoutApartmentSum : variant.totalApartments,
        layouts,
      });
    }).filter(Boolean);

    return { ...sector, flatVariants };
  });
}

function getJk2PropertyDetailsFromConfig() {
  const config = JK2_BOMOND_DATA;
  const details = {};
  for (const key of ['developer', 'deliveryDate', 'installmentTerm', 'maternityCapital', 'markupBasis']) {
    const value = config?.[key];
    if (value != null && String(value).trim() !== '') {
      details[key] = value;
    }
  }
  return details;
}

function applyJk2BomondDataFromConfig(property) {
  if (property?.id !== 'jk2') return property;

  const defaults = DEFAULT_PROPERTIES.find(item => item.id === 'jk2');
  const source = {
    ...defaults,
    ...property,
    flatVariants: JK2_SOURCE_FLAT_VARIANTS.length
      ? JK2_SOURCE_FLAT_VARIANTS
      : (defaults?.flatVariants || property.flatVariants),
  };

  let sectors = Array.isArray(JK2_BOMOND_DATA.sectors) && JK2_BOMOND_DATA.sectors.length
    ? buildJk2SectorsFromExplicitData(JK2_BOMOND_DATA.sectors)
    : (JK2_BOMOND_DATA.layouts && Object.keys(JK2_BOMOND_DATA.layouts).length
      ? buildJk2SectorsFromLayoutConfig(source.flatVariants)
      : buildSectorsFromFlatVariants(getFlatVariantsForSectorBuild(source)));

  sectors = sortSectorsAlphabetically(applyJk2LayoutDetailsToSectors(sectors));

  const item = {
    ...source,
    ...getJk2PropertyDetailsFromConfig(),
    floorPriceRanges: normalizeFloorPriceRanges(JK2_BOMOND_DATA.floorPriceRanges),
    sectors,
  };

  return repairComplexSectorData(item);
}

function applyJk2BomondDefaultsToCatalog() {
  const jk2 = DEFAULT_PROPERTIES.find(item => item.id === 'jk2');
  if (!jk2) return;
  Object.assign(jk2, applyJk2BomondDataFromConfig(jk2));
}

applyJk2BomondDefaultsToCatalog();
initStore();
