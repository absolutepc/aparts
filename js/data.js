const STORE_KEY = 'aparts_data_v18';
const DATA_JS_VERSION = '18';
const USER_KEY = 'aparts_user';
const SITE_NAME = 'Dune Base';
const DEFAULT_IMG = 'img/default.svg';
const LOGO_IMG = 'img/logo.svg';
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

// Исходные flatVariants ЖК/МФК — заполняется после DEFAULT_PROPERTIES
const COMPLEX_SOURCE_FLAT_VARIANTS = {};

const COMPLEX_TYPES = ['jk', 'mfk'];

const FLAT_TYPE_LABELS = {
  '1room': 'Однокомнатные',
  '2room': 'Двухкомнатные',
  '3room': 'Трёхкомнатные',
  '4room': 'Четырёхкомнатные',
  euro2: 'Евродвушки',
  penthouse: 'Пентхаусы',
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
  9000: '9 000',
  10000: '10 000',
  11000: '11 000',
  12000: '12 000',
};

const DEVELOPER_LIST = ['Кормат строй', 'Квартал 777', 'Монолит', 'Фаворит 13', 'СК Экология'];

const MATERNITY_CAPITAL_OPTIONS = {
  yes: 'Да',
  no: 'Нет',
};

const MARKUP_BASIS_OPTIONS = {
  after: 'После вычета',
  before: 'До вычета',
};

const RECALCULATION_OPTIONS = {
  yes: 'Да',
  no: 'Нет',
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
    description: 'ЖК Ан Нур Грозный ЖК Ан Нур в Грозном – Жилой комплекс представляет собой впечатляющее сочетание восточного стиля и современных технологий в строительстве. Этот комплекс является одним из визитных карточек города и привлекает внимание как местных жителей, так и туристов.Архитектурный дизайн Ан Нур в Грозном воплощает в себе величие и элегантность восточных традиций. Здания комплекса возвышаются над Грозным с изящными куполами, изысканными арками и изогнутыми линиями, характерными для восточного стиля. Фасады зданий украшены красивыми резными узорами и узнаваемыми орнаментами, которые придают комплексу неповторимый вид.Одним из особых элементов ЖК Ан Нур является внутренний двор, оформленный в традиционном восточном стиле. Этот уютный и красиво оформленный двор становится местом отдыха и общения для жителей комплекса.',
    type: 'jk',
    flatType: '1room',
    totalApartments: 120,
    flatVariants: [
      { flatType: '1room', totalApartments: 58, areaMin: 52, areaMax: 67,layouts: [
        { key: 'Ж', label: '1И - 61м²', areaMin: 61, areaMax: 61, planImg: 'img/luch/1E.jpg' },

        { key: 'A', label: '1A - 67м²', areaMin: 67, areaMax: 67, planImg: 'img/luch/1A.jpg' },
        { key: 'Б', label: '1Б - 53м²', areaMin: 53, areaMax: 53, planImg: 'img/luch/1B.jpg' },
        { key: 'В', label: '1В - 52м²', areaMin: 52, areaMax: 52, planImg: 'img/luch/1V.jpg' },
        { key: 'Г', label: '1Г - 66м²', areaMin: 66, areaMax: 66, planImg: 'img/luch/1G.jpg' },

        { key: 'З', label: '1Г - 59м²', areaMin: 59, areaMax: 59, planImg: 'img/luch/1E.jpg' },

        { key: 'Д-A', label: '1A - 67м²', areaMin: 67, areaMax: 67, planImg: 'img/luch/1A.jpg' },
        { key: 'Д-Б', label: '1Б - 53м²', areaMin: 53, areaMax: 53, planImg: 'img/luch/1B.jpg' },
        { key: 'Д-В', label: '1В - 52м²', areaMin: 52, areaMax: 52, planImg: 'img/luch/1V.jpg' },
        { key: 'Д-Г', label: '1Г - 66м²', areaMin: 66, areaMax: 66, planImg: 'img/luch/1G.jpg' },

        { key: 'Д', label: '1Б - 52м²', areaMin: 52, areaMax: 52, planImg: 'img/luch/1G.jpg' },
        { key: 'Е', label: '1В - 53м²', areaMin: 53, areaMax: 53, planImg: 'img/luch/1D.jpg' },
        { key: 'Ё', label: '1Г - 67м²', areaMin: 67, areaMax: 67, planImg: 'img/luch/1E.jpg' },

        { key: 'И', label: '1Д - 61м²', areaMin: 61, areaMax: 61, planImg: 'img/luch/1E.jpg' },
        { key: 'Й', label: '1Е - 59м²', areaMin: 59, areaMax: 59, planImg: 'img/luch/1E.jpg' },
        { key: 'К', label: '1Ж - 59м²', areaMin: 59, areaMax: 59, planImg: 'img/luch/1E.jpg' },
        { key: 'Л', label: '1И - 61м²', areaMin: 61, areaMax: 61, planImg: 'img/luch/1E.jpg' },

      ]  },

      { flatType: '2room', totalApartments: 54, areaMin: 57, areaMax: 84, layouts: [
        { key: 'Д', label: '2В - 82м²', areaMin: 82, areaMax: 82, planImg: 'img/luch/1G.jpg' },
        { key: 'Е', label: '2Б - 84м²', areaMin: 84, areaMax: 84, planImg: 'img/luch/1D.jpg' },
        { key: 'Ё', label: '2Г - 82м²', areaMin: 82, areaMax: 82, planImg: 'img/luch/1E.jpg' },
        { key: 'Ж', label: '2Д - 84м²', areaMin: 84, areaMax: 84, planImg: 'img/luch/1G.jpg' },
        { key: 'З', label: '2Ж - 78м²', areaMin: 78, areaMax: 78, planImg: 'img/luch/1D.jpg' },
        { key: 'И', label: '2К - 80м²', areaMin: 80, areaMax: 80, planImg: 'img/luch/1E.jpg' },
        { key: 'Й', label: '2Л - 81м²', areaMin: 81, areaMax: 81, planImg: 'img/luch/1D.jpg' },
        { key: 'К', label: '2Н - 78м²', areaMin: 78, areaMax: 78, planImg: 'img/luch/1E.jpg' },

        { key: 'A', label: '2A - 58м²', areaMin: 58, areaMax: 58, planImg: 'img/luch/2A.jpg' },
        { key: 'Б', label: '2Б - 57м²', areaMin: 57, areaMax: 57, planImg: 'img/luch/2B.jpg' },

        { key: 'Д-A', label: '2A - 58м²', areaMin: 58, areaMax: 58, planImg: 'img/luch/2A.jpg' },
        { key: 'Д-Б', label: '2Б - 57м²', areaMin: 57, areaMax: 57, planImg: 'img/luch/2B.jpg' },

        { key: 'Л', label: '2Б - 84м²', areaMin: 84, areaMax: 84, planImg: 'img/luch/1E.jpg' },
        { key: 'М', label: '2В - 82м²', areaMin: 82, areaMax: 82, planImg: 'img/luch/1E.jpg' },
        { key: 'Н', label: '2Г - 82м²', areaMin: 82, areaMax: 82, planImg: 'img/luch/1E.jpg' },
        { key: 'О', label: '2Д - 84м²', areaMin: 84, areaMax: 84, planImg: 'img/luch/1E.jpg' },
        { key: 'П', label: '2Ж - 78м²', areaMin: 78, areaMax: 78, planImg: 'img/luch/1E.jpg' },
        { key: 'Р', label: '2И - 74м²', areaMin: 74, areaMax: 74, planImg: 'img/luch/1E.jpg' },
        { key: 'С', label: '2К - 81м²', areaMin: 81, areaMax: 81, planImg: 'img/luch/1E.jpg' },
        { key: 'Т', label: '2Л - 80м²', areaMin: 80, areaMax: 80, planImg: 'img/luch/1E.jpg' },
        { key: 'У', label: '2Н - 78м²', areaMin: 78, areaMax: 78, planImg: 'img/luch/1E.jpg' },

        { key: 'B', label: '2А - 57м²', areaMin: 57, areaMax: 57, planImg: 'img/luch/2V.jpg' },
        { key: 'Г', label: '2Б - 58м²', areaMin: 58, areaMax: 58, planImg: 'img/luch/2G.jpg' },
      ] },

      { flatType: '3room', totalApartments: 10, areaMin: 93, areaMax: 95, layouts: [
        { key: 'A', label: '3A - 94м²', areaMin: 94, areaMax: 94, planImg: 'img/luch/2A.jpg' },
        { key: 'Б', label: '3Б - 93м²', areaMin: 93, areaMax: 93, planImg: 'img/luch/2B.jpg' },

        { key: 'B', label: '3Б - 95м²', areaMin: 95, areaMax: 95, planImg: 'img/luch/2V.jpg' },

        { key: 'Д-A', label: '3A - 94м²', areaMin: 94, areaMax: 94, planImg: 'img/luch/2A.jpg' },
        { key: 'Д-Б', label: '3Б - 93м²', areaMin: 93, areaMax: 93, planImg: 'img/luch/2B.jpg' },


      ] },
    ],
    areaMin: 52,
    areaMax: 95,
    price: 90000,
    address: '​Проспект В.В. Путина, 22/4​',
    district: 'Новый район',
    developer: 'Монолит',
    noMarkupYears: 1,
    mandatoryPayment: 10000,
    img: 'img/Ан-Нур/Ан-нур 1.jpg',
    images: [
      'img/Ан-Нур/Ан-нур 1.jpg',
      'img/Ан-Нур/Ан-нур.jpg',
      'img/Ан-Нур/Ан-нур 3.jpg',
      'img/Ан-Нур/Ан-нур 4.jpg',
      'img/Ан-Нур/Ан-нур 5.jpg',
      'img/Ан-Нур/Ан-нур 10.jpg',
      'img/Ан-Нур/Ан-нур 8.jpg',
      'img/Ан-Нур/Ан-нур 9.jpg',
      'img/Ан-Нур/Ан-нур 7.jpg',
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
    installmentTerm: 'до 6 лет',
    maternityCapital: 'no',
    markupBasis: 'after',
    recalculation: 'no',
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
    type: 'jk',
    flatType: 'euro2',
    totalApartments: 75,
    flatVariants: [
      { flatType: 'euro2', totalApartments: 30, areaMin: 50.6, areaMax: 65, layouts: [
        { key: '5-В', label: '1В — 53.3м²', areaMin: 53.3, areaMax: 53.3 },
        { key: '5-Ж', label: '1Ж — 60.8м²', areaMin: 60.8, areaMax: 60.8 },

        { key: '6-A', label: '1A — 51.7м²', areaMin: 51.7, areaMax: 51.7, planImg: 'img/Дубайский/1A.jpg' },
        { key: '6-Г', label: '1Г — 50.6м²', areaMin: 50.6, areaMax: 50.6 },
        { key: '6-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '6-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '6-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },

        { key: '7-A', label: '1A — 51.7м²', areaMin: 51.7, areaMax: 51.7, planImg: 'img/Дубайский/1A.jpg' },
        { key: '7-В', label: '1В — 53.3м²', areaMin: 53.3, areaMax: 53.3 },
        { key: '7-Г', label: '1Г — 50.6м²', areaMin: 50.6, areaMax: 50.6 },
        { key: '7-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '7-Ж', label: '1Ж — 60.8м²', areaMin: 60.8, areaMax: 60.8 },
        { key: '7-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '7-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },

        { key: '8-A', label: '1A — 51.7м²', areaMin: 51.7, areaMax: 51.7, planImg: 'img/Дубайский/1A.jpg' },
        { key: '8-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '8-Ж', label: '1Ж — 60.8м²', areaMin: 60.8, areaMax: 60.8 },
        { key: '8-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '8-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },

        { key: '9-A', label: '1A — 51.7м²', areaMin: 51.7, areaMax: 51.7, planImg: 'img/Дубайский/1A.jpg' },
        { key: '9-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '9-Ж', label: '1Ж — 60.8м²', areaMin: 60.8, areaMax: 60.8 },

        { key: '10-A', label: '1A — 51.7м²', areaMin: 51.7, areaMax: 51.7, planImg: 'img/Дубайский/1A.jpg' },
        { key: '10-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '10-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '10-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },

        { key: '12-В', label: '1В — 53.3м²', areaMin: 53.3, areaMax: 53.3 },
        { key: '12-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '12-Е', label: '1Е — 60.8м²', areaMin: 60.8, areaMax: 60.8 },

        { key: '13-Ж', label: '1Ж — 60.8м²', areaMin: 60.8, areaMax: 60.8 },
        { key: '13-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '13-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },

        { key: '14-A', label: '1A — 51.7м²', areaMin: 51.7, areaMax: 51.7, planImg: 'img/Дубайский/1A.jpg' },
        { key: '14-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },
        { key: '14-Е', label: '1Е — 60.8м²', areaMin: 60.8, areaMax: 60.8 },

        { key: '15-A', label: '1A — 51.7м²', areaMin: 51.7, areaMax: 51.7, planImg: 'img/Дубайский/1A.jpg' },
        { key: '15-В', label: '1В — 53.3м²', areaMin: 53.3, areaMax: 53.3 },
        { key: '15-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '15-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },

        { key: '16-В', label: '1В — 53.3м²', areaMin: 53.3, areaMax: 53.3 },
        { key: '16-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '16-Ж', label: '1Ж — 60.8м²', areaMin: 60.8, areaMax: 60.8 },
        { key: '16-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '16-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },
        
        { key: '17-В', label: '1В — 53.3м²', areaMin: 53.3, areaMax: 53.3 },
        { key: '17-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '17-Е', label: '1Е — 60.8м²', areaMin: 60.8, areaMax: 60.8 },
        { key: '17-Ж', label: '1Ж — 60.8м²', areaMin: 60.8, areaMax: 60.8 },
        { key: '17-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '17-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },

        { key: '18-A', label: '1A — 51.7м²', areaMin: 51.7, areaMax: 51.7, planImg: 'img/Дубайский/1A.jpg' },
        { key: '18-В', label: '1В — 53.3м²', areaMin: 53.3, areaMax: 53.3 },
        { key: '18-Г', label: '1Г — 50.6м²', areaMin: 50.6, areaMax: 50.6 },
        { key: '18-Ж', label: '1Ж — 60.8м²', areaMin: 60.8, areaMax: 60.8 },
        { key: '18-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '18-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },

        { key: '19-В', label: '1В — 53.3м²', areaMin: 53.3, areaMax: 53.3 },
        { key: '19-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '19-Е', label: '1Е — 60.8м²', areaMin: 52.3, areaMax: 52.3 },
        { key: '19-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '19-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },

        { key: '26-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '26-Ж', label: '1Ж — 60.8м²', areaMin: 60.8, areaMax: 60.8 },
        { key: '26-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '26-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },

        { key: '27-A', label: '1A — 51.7м²', areaMin: 51.7, areaMax: 51.7, planImg: 'img/Дубайский/1A.jpg' },
        { key: '27-Г', label: '1Г — 50.6м²', areaMin: 50.6, areaMax: 50.6 },
        { key: '27-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '27-Ж', label: '1Ж — 60.8м²', areaMin: 60.8, areaMax: 60.8 },
        { key: '27-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '27-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },

        { key: '28-В', label: '1В — 53.3м²', areaMin: 53.3, areaMax: 53.3 },
        { key: '28-Д', label: '1Д — 65м²', areaMin: 65, areaMax: 65 },
        { key: '28-Ж', label: '1Ж — 60.8м²', areaMin: 60.8, areaMax: 60.8 },
        { key: '28-И', label: '1И — 63.5м²', areaMin: 63.5, areaMax: 63.5 },
        { key: '28-К', label: '1К — 58.9м²', areaMin: 58.9, areaMax: 58.9 },
      ] },

      { flatType: 'penthouse', totalApartments: 11, areaMin: 239.7, areaMax: 239.7, layouts: [

        { key: '10-A', label: 'Пентхаус 239.7 м²', areaMin: 239.7, areaMax: 239.7 },

        { key: '13-Б', label: 'Пентхаус 239.7 м²', areaMin: 239.7, areaMax: 239.7 },

        { key: '14-A', label: 'Пентхаус 239.7 м²', areaMin: 239.7, areaMax: 239.7 },

        { key: '15-A', label: 'Пентхаус 239.7 м²', areaMin: 239.7, areaMax: 239.7 },
        { key: '15-Б', label: 'Пентхаус 239.7 м²', areaMin: 239.7, areaMax: 239.7 },

        { key: '17-A', label: 'Пентхаус 239.7 м²', areaMin: 239.7, areaMax: 239.7 },
        { key: '17-Б', label: 'Пентхаус 239.7 м²', areaMin: 239.7, areaMax: 239.7 },

        { key: '18-A', label: 'Пентхаус 239.7 м²', areaMin: 239.7, areaMax: 239.7 },
        { key: '18-Б', label: 'Пентхаус 239.7 м²', areaMin: 239.7, areaMax: 239.7 },

        { key: '19-A', label: 'Пентхаус 239.7 м²', areaMin: 239.7, areaMax: 239.7 },
        { key: '19-Б', label: 'Пентхаус 239.7 м²', areaMin: 239.7, areaMax: 239.7 },

      ] },
    ],
    areaMin: 50.6,
    areaMax: 239.7,
    price: 98000,
    address: 'В.В.Путина 001',
    district: 'Новый район',
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
    description: 'ЖК «Луч» — это современный жилой комплекс семейного типа, расположенный в престижном районе Минутка, всего в нескольких минутах от центра города. Комплекс состоит из трех 20-этажных кирпичных домов, каждый из которых имеет 2 подъезда и 3 скоростных лифта, подключенных к резервным генераторам, что обеспечивает бесперебойную работу даже при отключении электричества.',
    type: 'jk',
    flatType: '1room',
    totalApartments: 163,
    flatVariants: [
      { flatType: '1room', totalApartments: 42, areaMin: 43.8, areaMax: 48,layouts: [
        { key: '1-A', label: '1A - 48м²', areaMin: 48, areaMax: 48, planImg: 'img/luch/1A.jpg' },
        { key: '1-Б', label: '1Б - 46.1м²', areaMin: 46.1, areaMax: 46.1, planImg: 'img/luch/1B.jpg' },
        { key: '1-В', label: '1В - 43.8м²', areaMin: 43.8, areaMax: 43.8, planImg: 'img/luch/1V.jpg' },
        { key: '1-Г', label: '1Г - 43.8м²', areaMin: 43.8, areaMax: 43.8, planImg: 'img/luch/1G.jpg' },
        { key: '1-Д', label: '1Д - 46.1м²', areaMin: 46.1, areaMax: 46.1, planImg: 'img/luch/1D.jpg' },
        { key: '1-E', label: '1E - 48м²', areaMin: 48, areaMax: 48, planImg: 'img/luch/1E.jpg' },

        { key: '2-A', label: '1A - 48м²', areaMin: 48, areaMax: 48, planImg: 'img/luch/1A.jpg' },
        { key: '2-Б', label: '1Б - 46.1м²', areaMin: 46.1, areaMax: 46.1, planImg: 'img/luch/1B.jpg' },
        { key: '2-В', label: '1В - 43.8м²', areaMin: 43.8, areaMax: 43.8, planImg: 'img/luch/1V.jpg' },
        { key: '2-Г', label: '1Г - 43.8м²', areaMin: 43.8, areaMax: 43.8, planImg: 'img/luch/1G.jpg' },
        { key: '2-Д', label: '1Д - 46.1м²', areaMin: 46.1, areaMax: 46.1, planImg: 'img/luch/1D.jpg' },
        { key: '2-E', label: '1E - 48м²', areaMin: 48, areaMax: 48, planImg: 'img/luch/1E.jpg' },

        { key: '3-A', label: '1A - 48м²', areaMin: 48, areaMax: 48, planImg: 'img/luch/1A.jpg' },
        { key: '3-Б', label: '1Б - 46.1м²', areaMin: 46.1, areaMax: 46.1, planImg: 'img/luch/1B.jpg' },
        { key: '3-В', label: '1В - 43.8м²', areaMin: 43.8, areaMax: 43.8, planImg: 'img/luch/1V.jpg' },
        { key: '3-Г', label: '1Г - 43.8м²', areaMin: 43.8, areaMax: 43.8, planImg: 'img/luch/1G.jpg' },
        { key: '3-Д', label: '1Д - 46.1м²', areaMin: 46.1, areaMax: 46.1, planImg: 'img/luch/1D.jpg' },
        { key: '3-E', label: '1E - 48м²', areaMin: 48, areaMax: 48, planImg: 'img/luch/1E.jpg' },
      ]  },
      { flatType: '2room', totalApartments: 121, areaMin: 54.7, areaMax: 74.8, layouts: [
        { key: '1-A', label: '2A - 54.7м²', areaMin: 54.7, areaMax: 54.7, planImg: 'img/luch/2A.jpg' },
        { key: '1-Б', label: '2Б - 68.88м²', areaMin: 62.88, areaMax: 62.88, planImg: 'img/luch/2B.jpg' },
        { key: '1-B', label: '2В - 74.8м²', areaMin: 74.8, areaMax: 74.8, planImg: 'img/luch/2V.jpg' },
        { key: '1-Г', label: '2Г - 69м²', areaMin: 69, areaMax: 69, planImg: 'img/luch/2G.jpg' },
        { key: '1-Д', label: '2Д - 69м²', areaMin: 69, areaMax: 69, planImg: 'img/luch/2D.jpg' },
        { key: '1-Е', label: '2Е - 74.8м²', areaMin: 74.8, areaMax: 74.8, planImg: 'img/luch/2E.jpg' },
        { key: '1-Ж', label: '2Ж - 62.88м²', areaMin: 62.88, areaMax: 62.88, planImg: 'img/luch/2J.jpg' },
        { key: '1-И', label: '2И - 54.7м²', areaMin: 54.7, areaMax: 54.7, planImg: 'img/luch/2I.jpg' },

        { key: '2-A', label: '2A - 54.7м²', areaMin: 54.7, areaMax: 54.7, planImg: 'img/luch/2A.jpg' },
        { key: '2-Б', label: '2Б - 68.88м²', areaMin: 62.88, areaMax: 62.88, planImg: 'img/luch/2B.jpg' },
        { key: '2-B', label: '2В - 74.8м²', areaMin: 74.8, areaMax: 74.8, planImg: 'img/luch/2V.jpg' },
        { key: '2-Г', label: '2Г - 69м²', areaMin: 69, areaMax: 69, planImg: 'img/luch/2G.jpg' },
        { key: '2-Д', label: '2Д - 69м²', areaMin: 69, areaMax: 69, planImg: 'img/luch/2D.jpg' },
        { key: '2-Е', label: '2Е - 74.8м²', areaMin: 74.8, areaMax: 74.8, planImg: 'img/luch/2E.jpg' },
        { key: '2-Ж', label: '2Ж - 62.88м²', areaMin: 62.88, areaMax: 62.88, planImg: 'img/luch/2J.jpg' },
        { key: '2-И', label: '2И - 54.7м²', areaMin: 54.7, areaMax: 54.7, planImg: 'img/luch/2I.jpg' },

        { key: '3-A', label: '2A - 54.7м²', areaMin: 54.7, areaMax: 54.7, planImg: 'img/luch/2A.jpg' },
        { key: '3-Б', label: '2Б - 68.88м²', areaMin: 62.88, areaMax: 62.88, planImg: 'img/luch/2B.jpg' },
        { key: '3-B', label: '2В - 74.8м²', areaMin: 74.8, areaMax: 74.8, planImg: 'img/luch/2V.jpg' },
        { key: '3-Г', label: '2Г - 69м²', areaMin: 69, areaMax: 69, planImg: 'img/luch/2G.jpg' },
        { key: '3-Д', label: '2Д - 69м²', areaMin: 69, areaMax: 69, planImg: 'img/luch/2D.jpg' },
        { key: '3-Е', label: '2Е - 74.8м²', areaMin: 74.8, areaMax: 74.8, planImg: 'img/luch/2E.jpg' },
        { key: '3-Ж', label: '2Ж - 62.88м²', areaMin: 62.88, areaMax: 62.88, planImg: 'img/luch/2J.jpg' },
        { key: '3-И', label: '2И - 54.7м²', areaMin: 54.7, areaMax: 54.7, planImg: 'img/luch/2I.jpg' },
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
      'img/luch/1A.jpg',

    ],
    published: true,
  },

  {
    id: 'jk5',
    title: 'ЖК «Ривьера»',
    description: 'ЖК Ривьера Грозный — жилой комплекс от строительной компании высокого класса: четыре монолитных 28-этажных дома у реки Сунжа. Комплекс расположен вблизи улицы Первомайской, рядом с набережной, которая будет благоустроена. Покупателям доступны 1- и 2-комнатные квартиры с потолками 3 метра и лоджиями. Предусмотрена рассрочка без первоначального взноса сроком до 5 лет. Архитектура и технические характеристики: Все четыре башни комплекса возводятся по монолитной технологии. Монолитный железобетонный каркас обеспечивает высокую несущую способность, хорошую звукоизоляцию между этажами и долгий срок эксплуатации здания.',
    type: 'jk',
    flatType: '1room',
    totalApartments: 2,
    flatVariants: [
      { flatType: '1room', totalApartments: 200, areaMin: 35.9, areaMax: 48.95, layouts: [
        { key: '1К-1', label: '1К-1 38.76м²', areaMin: 38.76, areaMax: 38.76, planImg: 'img/ривьера/1К-1.jpg' },
        { key: '1К-2', label: '1К-2 38.76м²', areaMin: 38.76, areaMax: 38.76, planImg: 'img/ривьера/1К-2.jpg' },
        { key: '1К-3', label: '1К-3 38.72м²', areaMin: 38.72, areaMax: 38.72, planImg: 'img/ривьера/1К-3.jpg' },
        { key: '1К-4', label: '1К-4 38.72м²', areaMin: 38.72, areaMax: 38.72, planImg: 'img/ривьера/1К-4.jpg' },
        { key: '1К-5', label: '1К-5 44.96м²', areaMin: 44.96, areaMax: 44.96, planImg: 'img/ривьера/1К-5.jpg' },
        { key: '1К-6', label: '1К-6 35.90м²', areaMin: 35.90, areaMax: 35.90, planImg: 'img/ривьера/1К-6.jpg' },
        { key: '1К-7', label: '1К-7 48.95м²', areaMin: 48.95, areaMax: 48.95, planImg: 'img/ривьера/1К-7.jpg' },
        { key: '1К-8', label: '1К-8 42.63м²', areaMin: 42.63, areaMax: 42.63, planImg: 'img/ривьера/1К-8.jpg' },
      ] },

      { flatType: '2room', totalApartments: 100, areaMin: 63.9, areaMax: 64.13, layouts: [
        { key: '2К-1', label: '2К-1 64.13м²', areaMin: 64.13, areaMax: 64.13, planImg: 'img/ривьера/2К-1.jpg' },
        { key: '2К-2', label: '2К-2 63.90м²', areaMin: 63.90, areaMax: 63.90, planImg: 'img/ривьера/2К-2.jpg' },
      ] },
      
    ],
    areaMin: 35.90,
    areaMax: 64.13,
    price: 5000,
    address: 'Грозный, ул. Кабардинская',
    district: 'Центр',
    developer: 'СК Экология',
    noMarkupYears: 1,
    mandatoryPayment: 5000,
    img: 'img/ривьера/rivyera.jpg',
    images: [
      'img/ривьера/rivyera 1.jpg',
      'img/ривьера/rivyera 2.jpg',
      'img/ривьера/rivyera 3.jpg',
      'img/ривьера/rivyera 4.jpg',
      'img/ривьера/rivyera 5.jpg',
      'img/ривьера/rivyera 6.jpg',
      'img/ривьера/rivyera 7.jpg',
      'img/ривьера/rivyera 8.jpg',
      'img/ривьера/rivyera 9.jpg',
    ],
    published: true,
  },

  {
    id: 'jk6',
    title: 'ЖК «Блэк Рок»',
    description: 'ЖК Блэк Рок в Грозном выполнен в стиле хай-тек, что подчеркивается элегантными линиями, высококачественными материалами и инновационными решениями в архитектуре. Комплекс состоит из семи секций, шесть из которых – это жилые дома с просторными квартирами, а одна секция отведена под современное офисное здание. Это создает уникальную синергию работы и жизни, позволяя жителям наслаждаться всеми удобствами в одном месте. Высокий уровень комфорта и безопасност. Каждый жилой дом в Black Rock в Грозном оснащен передовыми системами безопасности и автоматизации. Это включает в себя круглосуточное видеонаблюдение, системы контроля доступа и умные домофоны, обеспечивающие максимальный уровень безопасности для всех жителей. Инновационные решения в архитектуре и строительстве делают проживание в комплексе комфортным и удобным.',
    type: 'jk',
    flatType: '1room',
    totalApartments: 2,
    flatVariants: [
      { flatType: '1room', totalApartments: 200, areaMin: 51.4, areaMax: 56.6, layouts: [
        { key: '1-Б', label: '1Б 50м²', areaMin: 50, areaMax: 50, planImg: 'img/ривьера/1К-1.jpg' },
        { key: '1-В', label: '1В 51.4м²', areaMin: 51.4, areaMax: 51.4, planImg: 'img/ривьера/1К-2.jpg' },

        { key: '2-А', label: '1А 51.7м²', areaMin: 51.7, areaMax: 51.7, planImg: 'img/ривьера/1К-1.jpg' },

        { key: '7-Б', label: '1Б 51.4м²', areaMin: 51.4, areaMax: 51.4, planImg: 'img/ривьера/1К-1.jpg' },
      ] },

      { flatType: 'euro2', totalApartments: 100, areaMin: 83, areaMax: 83, layouts: [
        { key: '1-А', label: '2А(e) 83м²', areaMin: 83, areaMax: 83, planImg: 'img/ривьера/2К-1.jpg' },
        { key: '1-Б', label: '2Б(e) 83м²', areaMin: 83, areaMax: 83, planImg: 'img/ривьера/2К-2.jpg' },

        { key: '2-Г', label: '2Г(e) 84.7м²', areaMin: 84.7, areaMax: 84.7, planImg: 'img/ривьера/2К-2.jpg' },
        { key: '2-Д', label: '2Д(e) 84.7м²', areaMin: 84.7, areaMax: 84.7, planImg: 'img/ривьера/2К-2.jpg' },

        { key: '4-А', label: '1А(e) 56.6м²', areaMin: 56.6, areaMax: 56.6, planImg: 'img/ривьера/2К-2.jpg' },
        { key: '4-Д', label: '1Д(e) 56.6м²', areaMin: 56.6, areaMax: 56.6, planImg: 'img/ривьера/2К-2.jpg' },

        { key: '5-А', label: '1А(e) 56.6м²', areaMin: 56.6, areaMax: 56.6, planImg: 'img/ривьера/2К-2.jpg' },
        { key: '5-Д', label: '1Д(e) 56.6м²', areaMin: 56.6, areaMax: 56.6, planImg: 'img/ривьера/2К-2.jpg' },

        { key: '6-А', label: '1А(e) 56.6м²', areaMin: 56.6, areaMax: 56.6, planImg: 'img/ривьера/2К-2.jpg' },
        { key: '6-Д', label: '1Д(e) 56.6м²', areaMin: 56.6, areaMax: 56.6, planImg: 'img/ривьера/2К-2.jpg' },

        { key: '7-А', label: '2А(e) 72.1м²', areaMin: 72.1, areaMax: 72.1, planImg: 'img/ривьера/2К-2.jpg' },
      ] },

      { flatType: '2room', totalApartments: 100, areaMin: 78.3, areaMax: 78.8, layouts: [
        { key: '1-В', label: '2В 77.9м²', areaMin: 77.9, areaMax: 77.9, planImg: 'img/ривьера/2К-1.jpg' },
        { key: '1-Г', label: '2Г 78.3м²', areaMin: 78.3, areaMax: 78.3, planImg: 'img/ривьера/2К-2.jpg' },
        { key: '1-Д', label: '2Д 78.8м²', areaMin: 78.8, areaMax: 78.8, planImg: 'img/ривьера/2К-2.jpg' },

        { key: '2-Д', label: '2Д 62.4м²', areaMin: 62.4, areaMax: 62.4, planImg: 'img/ривьера/2К-2.jpg' },

        { key: '4-А', label: '2А 77.9м²', areaMin: 77.9, areaMax: 77.9, planImg: 'img/ривьера/2К-2.jpg' },
        { key: '4-Г', label: '2Г 77.9м²', areaMin: 77.9, areaMax: 77.9, planImg: 'img/ривьера/2К-2.jpg' },

        { key: '5-А', label: '2А 77.9м²', areaMin: 77.9, areaMax: 77.9, planImg: 'img/ривьера/2К-2.jpg' },
        { key: '5-Г', label: '2Г 77.9м²', areaMin: 77.9, areaMax: 77.9, planImg: 'img/ривьера/2К-2.jpg' },

        { key: '6-А', label: '2А 77.9м²', areaMin: 77.9, areaMax: 77.9, planImg: 'img/ривьера/2К-2.jpg' },
        { key: '6-Г', label: '2Г 77.9м²', areaMin: 77.9, areaMax: 77.9, planImg: 'img/ривьера/2К-2.jpg' },

        { key: '7-В', label: '2В 77.9м²', areaMin: 77.9, areaMax: 77.9, planImg: 'img/ривьера/2К-2.jpg' },
        { key: '7-Г', label: '2Г 78.3м²', areaMin: 78.3, areaMax: 78.3, planImg: 'img/ривьера/2К-2.jpg' },
        { key: '7-Д', label: '2Д 78.8м²', areaMin: 78.8, areaMax: 78.8, planImg: 'img/ривьера/2К-2.jpg' },
      ] },

      { flatType: '3room', totalApartments: 100, areaMin: 110.4, areaMax: 110.4, layouts: [
        { key: '7-Б', label: '3Б(e) 110.4м²', areaMin: 110.4, areaMax: 110.4, planImg: 'img/ривьера/2К-2.jpg' },
      ] },
    ],
    areaMin: 51.4,
    areaMax: 110.4,
    price: 88000,
    address: 'Пешеходный бульвар, 17 сектор',
    district: 'Новый Район',
    developer: 'Квартал 777',
    noMarkupYears: 1,
    mandatoryPayment: 5000,
    img: 'img/БлэкРок/BR.jpg',
    images: [
      'img/БлэкРок/BR 1.jpg',
      'img/БлэкРок/BR 2.jpg',
      'img/БлэкРок/BR 3.jpg',
      'img/БлэкРок/BR 4.jpg',
      'img/БлэкРок/BR 5.jpg',
      'img/БлэкРок/BR 6.jpg',
      'img/БлэкРок/BR 7.jpg',
      'img/БлэкРок/BR 8.jpg',
      'img/БлэкРок/BR 9.jpg',
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

function formatFloorRangeCompactLabel(range) {
  const normalized = normalizeFloorRange(range);
  if (!normalized) return '';
  if (normalized.floorMin === normalized.floorMax) {
    return String(normalized.floorMin);
  }
  return `${normalized.floorMin}–${normalized.floorMax}`;
}

function formatFloorRangesLabel(ranges) {
  const normalized = normalizeFloorRanges(ranges);
  if (!normalized.length) return '—';
  return normalized.map(formatFloorRangeLabel).join(', ');
}

function formatFloorRangesCompactLabel(ranges) {
  const normalized = normalizeFloorRanges(ranges);
  if (!normalized.length) return '—';
  return normalized.map(formatFloorRangeCompactLabel).join(', ');
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

const FLOOR_PRICE_TO_OFFSET = 2000;

function getFloorPriceToOffset(property) {
  const custom = Number(property?.floorPriceToOffset);
  if (Number.isFinite(custom) && custom >= 0) return custom;
  return FLOOR_PRICE_TO_OFFSET;
}

function getFloorPriceTo(price, property = null) {
  const value = Number(price);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value + getFloorPriceToOffset(property);
}

function formatFloorPriceFromLabel(fromPrice) {
  const from = Number(fromPrice);
  if (!Number.isFinite(from) || from <= 0) return '';
  return `от ${formatPrice(from)}`;
}

function formatFloorPriceToLabel(fromPrice, property = null) {
  const to = getFloorPriceTo(fromPrice, property);
  if (to == null) return '';
  return `до ${formatPrice(to)}`;
}

function formatFloorPriceFromTo(fromPrice, property = null) {
  const fromLabel = formatFloorPriceFromLabel(fromPrice);
  const toLabel = formatFloorPriceToLabel(fromPrice, property);
  if (!fromLabel || !toLabel) return '';
  return `${fromLabel} ${toLabel}`;
}

function normalizeSectorPriceGroup(group) {
  if (!group || !Array.isArray(group.sectors) || !group.sectors.length) return null;

  const sectors = group.sectors
    .map((sector) => stripSectorTitle(sector))
    .filter(Boolean);
  if (!sectors.length) return null;

  const full = Number(group.full);
  const installment30 = Number(group.installment30);
  const noDownPayment = Number(group.noDownPayment);
  if (![full, installment30, noDownPayment].every((price) => Number.isFinite(price) && price > 0)) {
    return null;
  }

  return { sectors, full, installment30, noDownPayment };
}

function normalizeSectorPriceGroups(groups) {
  if (!Array.isArray(groups)) return [];
  return groups.map(normalizeSectorPriceGroup).filter(Boolean);
}

function getPropertySectorPriceGroups(property) {
  return normalizeSectorPriceGroups(property?.sectorPriceGroups);
}

function getSectorPriceGroupForSector(property, sectorTitle) {
  const normalized = stripSectorTitle(sectorTitle);
  if (!normalized) return null;

  return getPropertySectorPriceGroups(property).find((group) =>
    group.sectors.some((sector) => stripSectorTitle(sector) === normalized)
  ) || null;
}

function getMinSectorFullPrice(property) {
  const groups = getPropertySectorPriceGroups(property);
  if (!groups.length) return null;
  return Math.min(...groups.map((group) => group.full));
}

function formatSectorPriceGroupLabel(group) {
  return group.sectors.map((sector) => getSectorDisplayTitle(formatSectorTitle(sector))).join(', ');
}

function renderPropertySectorPricesBlock(property, options = {}) {
  const groups = getPropertySectorPriceGroups(property);
  if (!groups.length) return '';

  const compact = options.compact === true;
  const sectionClass = compact
    ? 'property-floor-prices property-floor-prices--compact property-sector-prices'
    : 'property-floor-prices property-sector-prices';
  const headingTag = compact ? 'h3' : 'h2';
  const subtitleHtml = compact
    ? ''
    : '<p>Стоимость зависит от сектора и формы оплаты</p>';

  return `
    <section class="${sectionClass}">
      <div class="section-header property-floor-prices-header">
        <${headingTag}>Цены по секторам</${headingTag}>
        ${subtitleHtml}
      </div>
      <div class="property-floor-prices-table-wrap">
        <table class="property-floor-prices-table property-sector-prices-table">
          <thead>
            <tr>
              <th>Сектор</th>
              <th>Полная оплата</th>
              <th>Рассрочка 30%</th>
              <th>Без взноса</th>
            </tr>
          </thead>
          <tbody>
            ${groups.map((group) => `
              <tr>
                <td>${escapeHtml(formatSectorPriceGroupLabel(group))}</td>
                <td>${formatPrice(group.full)}</td>
                <td>${formatPrice(group.installment30)}</td>
                <td>${formatPrice(group.noDownPayment)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderPropertyPricesBlock(property, options = {}) {
  const sectorPrices = renderPropertySectorPricesBlock(property, options);
  if (sectorPrices) return sectorPrices;
  return renderPropertyFloorPricesBlock(property, options);
}

function getFloorPriceColumnLabels(property) {
  const from = property?.floorPriceColumnLabels?.from;
  const to = property?.floorPriceColumnLabels?.to;
  return {
    from: from != null && String(from).trim() !== '' ? String(from).trim() : 'Старопром',
    to: to != null && String(to).trim() !== '' ? String(to).trim() : 'Угловые',
  };
}

function renderPropertyFloorPricesBlock(property, options = {}) {
  const ranges = getPropertyFloorPriceRanges(property);
  if (!ranges.length) return '';

  const compact = options.compact === true;
  const columnLabels = getFloorPriceColumnLabels(property);
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
              <th>${escapeHtml(columnLabels.from)}</th>
              <th class="property-floor-prices-table-col-corner">${escapeHtml(columnLabels.to)}</th>
            </tr>
          </thead>
          <tbody>
            ${ranges.map((range) => `
              <tr>
                <td>${escapeHtml(formatFloorRangeLabel(range))}</td>
                <td>${formatFloorPriceFromLabel(range.price)}</td>
                <td class="property-floor-prices-table-col-corner">${formatFloorPriceToLabel(range.price, property)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderLayoutPriceSpecs(property, layout, variant) {
  const sectorGroup = getSectorPriceGroupForSector(property, resolveLayoutSectorTitle(layout));
  if (sectorGroup) {
    return `<span class="floor-plan-spec-value floor-plan-spec-value--multiline">Полная оплата: ${formatPrice(sectorGroup.full)}<br>Рассрочка 30%: ${formatPrice(sectorGroup.installment30)}<br>Без взноса: ${formatPrice(sectorGroup.noDownPayment)}</span>`;
  }

  const applicablePrices = getApplicableFloorPrices(property, layout);
  if (!applicablePrices.length) {
    return '';
  }

  const prices = applicablePrices.map((range) => Number(range.price)).filter((price) => price > 0);
  if (!prices.length) {
    return '';
  }

  const minPrice = Math.min(...prices);
  const maxToPrice = getFloorPriceTo(Math.max(...prices), property);
  if (maxToPrice == null) {
    return '';
  }

  return `<span class="floor-plan-spec-value">от ${formatPrice(minPrice)} до ${formatPrice(maxToPrice)}</span>`;
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
    case 'penthouse': return Number(property.countPenthouse) || 0;
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
    case 'penthouse': return 'Пентхаус';
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
  const description = String(layout?.description || '').trim();

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
  if (description) {
    normalized.description = description;
    if (layout?.descriptionManual === true) normalized.descriptionManual = true;
  }
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

function getRecalculationLabel(value) {
  return RECALCULATION_OPTIONS[value] || '';
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

  if (item.recalculation === true) item.recalculation = 'yes';
  if (item.recalculation === false) item.recalculation = 'no';
  if (RECALCULATION_OPTIONS[item.recalculation]) {
    item.recalculation = item.recalculation;
  } else {
    delete item.recalculation;
  }

  if (isComplex(item)) {
    item.sectorPriceGroups = normalizeSectorPriceGroups(item.sectorPriceGroups);
    if (!item.sectorPriceGroups.length) delete item.sectorPriceGroups;
    item.floorPriceRanges = normalizeFloorPriceRanges(item.floorPriceRanges);
    if (!item.floorPriceRanges.length) delete item.floorPriceRanges;
  } else {
    delete item.sectorPriceGroups;
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
  const paymentLabel = getMandatoryPaymentLabel(property.mandatoryPayment);
  const rows = [
    renderPropertySpecRow('Застройщик', property.developer),
    renderPropertySpecRow('Срок сдачи объекта', property.deliveryDate),
    renderPropertySpecRow('Срок предоставления рассрочки', property.installmentTerm),
    renderPropertySpecRow('Без наценки', getNoMarkupYearsLabel(property.noMarkupYears)),
    renderPropertySpecRow('Наценка', getMarkupBasisLabel(property.markupBasis)),
    renderPropertySpecRow('Перерасчет', getRecalculationLabel(property.recalculation)),
    renderPropertySpecRow('Материнский капитал', getMaternityCapitalLabel(property.maternityCapital)),
    renderPropertySpecRow('Обязательный платёж', paymentLabel),
    renderPropertySpecRow('Район', property.district),
    renderPropertySpecRow('Адрес', property.address),
  ];

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
  ? new Intl.Collator('ru', { sensitivity: 'base', numeric: true })
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

function sortSectorsByPreferredOrder(sectors, preferredOrder = []) {
  if (!Array.isArray(sectors) || !sectors.length) return sectors || [];
  if (!Array.isArray(preferredOrder) || !preferredOrder.length) {
    return sortSectorsAlphabetically(sectors);
  }

  const orderMap = new Map(
    preferredOrder
      .map((title) => stripSectorTitle(title))
      .filter(Boolean)
      .map((title, index) => [title, index])
  );

  return [...sectors].sort((a, b) => {
    const left = stripSectorTitle(a.title);
    const right = stripSectorTitle(b.title);
    const leftIndex = orderMap.has(left) ? orderMap.get(left) : Number.MAX_SAFE_INTEGER;
    const rightIndex = orderMap.has(right) ? orderMap.get(right) : Number.MAX_SAFE_INTEGER;
    if (leftIndex !== rightIndex) return leftIndex - rightIndex;
    return compareSectorTitles(left, right);
  });
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

function getComplexLayoutConfigForSector(layoutsConfig, sectorTitle) {
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
            const sectorTitle = stripSectorTitle(title);
            return {
              ...normalized,
              layouts: getVariantLayouts(normalized).map((layout, layoutIndex) => {
                const layoutKey = resolveConfigLayoutKey(
                  item.id,
                  sectorTitle,
                  normalized.flatType,
                  layout,
                  layoutIndex
                );
                return normalizeLayoutVariant({
                  ...layout,
                  key: layoutKey,
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

    item.sectors = sortSectorsByPreferredOrder(
      item.sectors,
      COMPLEX_PROPERTY_CONFIGS[item.id]?.sectorOrder
    );
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
  const sourceVariants = COMPLEX_SOURCE_FLAT_VARIANTS[property.id];
  const baselineVariants = Array.isArray(sourceVariants) && sourceVariants.length
    ? sourceVariants
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
    const sectors = property.sectors
      .map((sector, index) => normalizeSector(sector, index))
      .filter(Boolean);
    const config = COMPLEX_PROPERTY_CONFIGS[property?.id];
    return sortSectorsByPreferredOrder(sectors, config?.sectorOrder);
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
    delete item.countPenthouse;
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
  delete item.countPenthouse;

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
  for (const key of ['developer', 'deliveryDate', 'installmentTerm', 'maternityCapital', 'markupBasis', 'recalculation']) {
    const saved = item[key];
    const fallback = defaults[key];
    if ((saved == null || String(saved).trim() === '') && fallback != null && String(fallback).trim() !== '') {
      item[key] = fallback;
    }
  }
  return item;
}

function preservePropertyContentFields(target, source) {
  if (!target || !source) return target;

  for (const key of ['title', 'description', 'address', 'district', 'price', 'published']) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }

  return target;
}

function isAutoGeneratedLayoutDescription(description) {
  const text = String(description || '').trim();
  if (!text) return false;
  if (/^(Светлая|Продуманная|Комфортная|Функциональная|Современная|Уютная)\s+(однокомнатная|двухкомнатная)/i.test(text)) {
    return true;
  }
  if (/в секторе\s+[А-ЯA-Z]/i.test(text)) return true;
  if (/доступна на этажах/i.test(text)) return true;
  if (/^(Однокомнатная|Двухкомнатная),/i.test(text)) return true;
  if (/Планировка с .+/i.test(text) && /(высота потолков|Потолки) 3,1 м/i.test(text)) return true;
  if (/^(Удобная|Продуманное|Комфортная|Функциональная|Просторная|Светлая|Удачная) (планировка|пространство)/i.test(text)) {
    return true;
  }
  if (/логичная зонировка/i.test(text)) return true;
  return false;
}

function shouldPreserveSavedLayoutDescription(savedEntry) {
  if (!savedEntry?.description) return false;
  if (savedEntry.descriptionManual === true) return true;
  return !isAutoGeneratedLayoutDescription(savedEntry.description);
}

function buildLayoutDescriptionLookup(property) {
  return buildSavedLayoutLookup(property);
}

function buildSavedLayoutLookup(property) {
  const lookup = new Map();
  if (!property || !isComplex(property)) return lookup;

  const sectors = Array.isArray(property.sectors) && property.sectors.length
    ? property.sectors
    : getComplexSectors(property);

  for (const sector of sectors) {
    const sectorKey = stripSectorTitle(sector.title).toLowerCase();
    for (const variant of sector.flatVariants || []) {
      for (const layout of getVariantLayouts(variant)) {
        if (!layout?.key) continue;
        lookup.set(`${sectorKey}|${variant.flatType}|${layout.key}`, {
          label: String(layout.label || '').trim(),
          description: String(layout.description || '').trim(),
          descriptionManual: layout.descriptionManual === true,
          planImg: String(layout.planImg || '').trim(),
          areaMin: layout.areaMin,
          areaMax: layout.areaMax,
          totalApartments: layout.totalApartments,
          availableFloors: layout.availableFloors,
          price: layout.price,
        });
      }
    }
  }

  return lookup;
}

function getConfiguredLayoutKeys(propertyId, sectorTitle, flatType) {
  const config = COMPLEX_PROPERTY_CONFIGS[propertyId];
  if (!config?.layouts) return [];
  const sectorConfig = getComplexLayoutConfigForSector(config.layouts, sectorTitle);
  const flatConfig = sectorConfig?.[flatType];
  if (!flatConfig) return [];
  return Object.keys(flatConfig);
}

function resolveConfigLayoutKey(propertyId, sectorTitle, flatType, layout, index) {
  const existingKey = String(layout?.key || '').trim();
  const configuredKeys = getConfiguredLayoutKeys(propertyId, sectorTitle, flatType);
  if (configuredKeys.length) {
    if (existingKey && configuredKeys.includes(existingKey)) return existingKey;
    if (configuredKeys[index] != null) return String(configuredKeys[index]);
  }
  return existingKey || getLayoutKey(index);
}

function mergeSavedLayoutDescriptions(targetProperty, savedProperty) {
  return mergeSavedLayoutData(targetProperty, savedProperty);
}

function mergeSavedLayoutData(targetProperty, savedProperty) {
  if (!targetProperty?.sectors?.length || !savedProperty) return targetProperty;

  const lookup = buildSavedLayoutLookup(savedProperty);
  if (!lookup.size) return targetProperty;

  return {
    ...targetProperty,
    sectors: targetProperty.sectors.map((sector) => ({
      ...sector,
      flatVariants: (sector.flatVariants || []).map((variant) => {
        const sectorKey = stripSectorTitle(sector.title).toLowerCase();
        const layouts = getVariantLayouts(variant).map((layout) => {
          const savedEntry = lookup.get(`${sectorKey}|${variant.flatType}|${layout.key}`);
          if (!savedEntry) return layout;

          const merged = { ...layout };
          if (savedEntry.label) merged.label = savedEntry.label;
          if (shouldPreserveSavedLayoutDescription(savedEntry)) {
            merged.description = savedEntry.description;
            merged.descriptionManual = savedEntry.descriptionManual === true;
          }
          if (savedEntry.planImg) merged.planImg = savedEntry.planImg;
          if (Number(savedEntry.areaMin) > 0) merged.areaMin = Number(savedEntry.areaMin);
          if (Number(savedEntry.areaMax) > 0) merged.areaMax = Number(savedEntry.areaMax);
          if (Number(savedEntry.totalApartments) > 0) {
            merged.totalApartments = Number(savedEntry.totalApartments);
          }
          if (Array.isArray(savedEntry.availableFloors) && savedEntry.availableFloors.length) {
            merged.availableFloors = savedEntry.availableFloors;
          }
          if (savedEntry.price != null && savedEntry.price !== '') {
            merged.price = savedEntry.price;
          }
          return merged;
        });

        return normalizeFlatVariant({
          ...variant,
          layouts,
        });
      }).filter(Boolean),
    })),
  };
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
    if (COMPLEX_PROPERTY_CONFIGS[merged.id]) {
      Object.assign(merged, applyComplexConfigFromRegistry(merged));
      preservePropertyContentFields(merged, property);
    }
  }

  const repaired = repairPropertyImages(merged);
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

function hasAdminUploadedImages(property) {
  const gallery = Array.isArray(property?.images) ? property.images : [];
  return gallery.some(src => typeof src === 'string' && /^data:image\//i.test(src))
    || /^data:image\//i.test(String(property?.img || property?.imageUrl || ''));
}

function getDefaultImagesForProperty(propertyId) {
  const defaults = DEFAULT_PROPERTIES.find(item => item.id === propertyId);
  const config = COMPLEX_PROPERTY_CONFIGS[propertyId];
  return {
    img: config?.img ?? defaults?.img ?? '',
    images: config?.images ?? defaults?.images,
  };
}

function repairPropertyImages(property) {
  if (hasAdminUploadedImages(property)) {
    return normalizePropertyImages(property);
  }

  const defaultImages = getDefaultImagesForProperty(property?.id);
  const defaultNormalized = normalizePropertyImages(defaultImages);
  const defaultValid = defaultNormalized.images.filter(src => !isBrokenImageSrc(src));

  if (COMPLEX_PROPERTY_CONFIGS[property?.id] && defaultValid.length) {
    return defaultNormalized;
  }

  const normalized = normalizePropertyImages(property);
  const needsRepair = normalized.images.every(isBrokenImageSrc);
  const savedValid = normalized.images.filter(src => !isBrokenImageSrc(src));

  if (defaultValid.length && (needsRepair || !savedValid.length)) {
    return defaultNormalized;
  }

  return normalized;
}

function normalizePropertyImages(property) {
  const mainField = String(property?.img || property?.imageUrl || '').trim();
  const gallery = Array.isArray(property?.images)
    ? property.images.map(src => String(src).trim()).filter(Boolean)
    : [];

  let combined;
  if (gallery.length) {
    combined = uniqueImages(gallery);
    if (mainField && !combined.includes(mainField)) {
      combined = uniqueImages([mainField, ...combined]);
    }
  } else if (mainField) {
    combined = [mainField];
  } else {
    combined = [];
  }

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
  const hideFlatTypeStats = property?.id === 'jk1' || property?.id === 'jk3'|| property?.id === 'jk6';
  if (selectedVariant || hideFlatTypeStats) {
    return '';
  }

  let variants = getComplexFlatVariants(property);

  if (options.overview) {
    variants = variants.filter(variant => variant.flatType !== '1room' && variant.flatType !== '2room' && variant.flatType !== 'euro2' && variant.flatType !== '3room');
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
        <h3 class="property-sector-heading">${escapeHtml(String(property?.sectorHeading || '').trim() || 'Сектор')}</h3>
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
      const floorsLabel = formatFloorRangesCompactLabel(layout.availableFloors);
      const priceSpecsHtml = renderLayoutPriceSpecs(property, layout, variant);
      const layoutDescription = String(layout.description || '').trim();
      const layoutDescriptionHtml = layoutDescription
        ? `<li class="floor-plan-spec-description">
            <span class="floor-plan-spec-value floor-plan-spec-value--multiline">${escapeHtml(layoutDescription)}</span>
          </li>`
        : '';
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
            ${priceSpecsHtml ? `
            <li class="floor-plan-spec-prices">
              <span class="floor-plan-spec-label">Цена</span>
              ${priceSpecsHtml}
            </li>` : ''}
            ${layoutDescriptionHtml}
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

  const floorPlansSubtitle = selectedFlatType
    ? (sectors.length > 1 ? 'Выберите обозначение и планировку' : 'Доступные планировки')
    : (sectors.length > 1 ? '' : 'Доступные типы квартир в этом комплексе');

  return `
    <section class="property-floor-plans" data-property-id="${escapeAttr(property.id)}">
      <div class="section-header property-floor-plans-header">
        <h2>Планировки квартир</h2>
        ${floorPlansSubtitle ? `<p>${floorPlansSubtitle}</p>` : ''}
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
      recalculation: COMPLEX_PROPERTY_CONFIGS[defaults.id]?.forceOfferingFromConfig
        && COMPLEX_PROPERTY_CONFIGS[defaults.id]?.recalculation
        ? COMPLEX_PROPERTY_CONFIGS[defaults.id].recalculation
        : (saved.recalculation ?? defaults.recalculation),
      description: Object.prototype.hasOwnProperty.call(saved, 'description')
        ? saved.description
        : defaults.description,
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

  const recentKeys = ['aparts_data_v17'];
  for (const key of recentKeys) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;

    try {
      const data = JSON.parse(raw);
      if (Array.isArray(data?.properties)) {
        const merged = mergeStoredPropertiesWithDefaults(data.properties);
        saveProperties(merged.map(enrichProperty));
        return;
      }
    } catch {
      // пробуем следующий ключ
    }
  }

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
          || property.description !== (source.description ?? '')
          || property.img !== source.img
          || JSON.stringify(property.images) !== JSON.stringify(source.images)
          || property.flatType !== source.flatType
          || JSON.stringify(property.flatVariants) !== JSON.stringify(source.flatVariants)
          || JSON.stringify(property.sectors) !== JSON.stringify(source.sectors)
          || JSON.stringify(property.floorPriceRanges) !== JSON.stringify(source.floorPriceRanges)
          || JSON.stringify(property.sectorPriceGroups) !== JSON.stringify(source.sectorPriceGroups)
          || source.count1room != null
          || source.count2room != null
          || source.count3room != null
          || source.countEuroTwo != null
          || source.countPenthouse != null;
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
// ЖК / МФК — редактируйте данные здесь в data.js (COMPLEX_PROPERTY_CONFIGS)
// После изменений: git pull (если нужно) + Ctrl+Shift+R в браузере
//
// forceOfferingFromConfig — принудительно брать характеристики из конфига (jk2)
// floorPriceRanges — цены по диапазонам этажей
// sectorPriceGroups — цены по секторам (полная оплата / рассрочка 30% / без взноса)
// layouts — количество квартир, этажи и подпись для каждой планировки в секторе
// sectors — полная структура секторов (если заполнить — layouts игнорируется)
// =============================================================================
const COMPLEX_PROPERTY_CONFIGS = {
  jk1: {
  forceOfferingFromConfig: true,
  developer: 'Монолит',
  img: 'img/Ан-Нур/Ан-нур 1.jpg',
  images: [
    'img/Ан-Нур/Ан-нур 1.jpg',
    'img/Ан-Нур/Ан-нур.jpg',
    'img/Ан-Нур/Ан-нур 3.jpg',
    'img/Ан-Нур/Ан-нур 4.jpg',
    'img/Ан-Нур/Ан-нур 5.jpg',
    'img/Ан-Нур/Ан-нур 10.jpg',
    'img/Ан-Нур/Ан-нур 8.jpg',
    'img/Ан-Нур/Ан-нур 7.jpg',
    'img/Ан-Нур/Ан-нур 9.jpg',
  ],
  deliveryDate: '2027г',
  installmentTerm: 'до 6 лет',
  maternityCapital: 'no',
  markupBasis: 'after',
  recalculation: 'no',

  // Сектор → полная оплата / рассрочка 30% / без взноса
  sectorPriceGroups: [
    { sectors: ['Б', 'В', 'Г'], full: 90000, installment30: 100000, noDownPayment: 107000 },
    { sectors: ['Д', 'Е'], full: 100000, installment30: 110000, noDownPayment: 107000 },
    { sectors: ['Ж'], full: 110000, installment30: 120000, noDownPayment: 130000 },
  ],

  // Порядок секторов на странице объекта
  sectorOrder: ['Б', 'В', 'Г', 'Д', 'Е', 'Ж'],

  // Сектор → тип квартир → ключ планировки → данные (по flatVariants выше)
  layouts: {
    'Б': {
      '1room': {
        '\u0416': { totalApartments: 2, availableFloors: '15-16' },
      },
      '2room': {
        '\u0414': { totalApartments: 4, availableFloors: '12-13, 15-16' },
        '\u0415': { totalApartments: 4, availableFloors: '10, 14-16' },
        '\u0401': { totalApartments: 1, availableFloors: '16' },
        '\u0416': { totalApartments: 3, availableFloors: '12, 14-15' },
        '\u0417': { totalApartments: 1, availableFloors: '12' },
        '\u0418': { totalApartments: 3, availableFloors: '14-16' },
        '\u0419': { totalApartments: 4, availableFloors: '10, 13, 15-16' },
        '\u041a': { totalApartments: 1, availableFloors: '16' },
      },
    },

    'В': {
      '1room': {
        A: {},
        '\u0411': {},
        '\u0412': {},
        '\u0413': {},
      },
      '2room': {
        A: {},
        '\u0411': {},
      },
      '3room': {
        A: {},
        '\u0411': {},
      },
    },

    'Г': {
      '1room': {
        '\u0417': {},
      },
      '3room': {
        B: {},
      },
    },

    'Д': {
      '1room': {
        'Д-A': {},
        'Д-Б': {},
        'Д-В': {},
        'Д-Г': {},
      },
      '2room': {
        'Д-A': {},
        'Д-Б': {},
      },
      '3room': {
        'Д-A': {},
        'Д-Б': {},
      },
    },

    'Е': {
      '1room': {
        '\u0418': {},
        '\u0419': {},
        '\u041a': {},
        '\u041b': {},
      },
      '2room': {
        '\u041b': {},
        '\u041c': {},
        '\u041d': {},
        '\u041e': {},
        '\u041f': {},
        '\u0420': {},
        '\u0421': {},
        '\u0422': {},
        '\u0423': {},
      },
    },

    'Ж': {
      '1room': {
        '\u0414': {},
        '\u0415': {},
        '\u0401': {},
      },
      '2room': {
        B: {},
        '\u0413': {},
      },
    },
  },

  // Опционально: полная структура sectors (если заполнить — layouts игнорируется)
  sectors: null,
  },

  jk2: {
  forceOfferingFromConfig: true,
  developer: 'Кормат строй',
  deliveryDate: '2027г',
  installmentTerm: 'до 6 лет',
  maternityCapital: 'no',
  markupBasis: 'after',
  recalculation: 'no',

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
  },

  jk3: {
    developer: 'Квартал 777',
    noMarkupYears: 1,
    mandatoryPayment: 5000,
    sectorHeading: 'Дом',
    deliveryDate: '2027г',
    installmentTerm: 'до 6 лет',
    maternityCapital: 'no',
    markupBasis: 'after',
    recalculation: 'no',

    // Порядок домов на странице объекта
    sectorOrder: ['5', '6', '7', '8', '9', '10', '12', '13', '14', '15', '16', '17', '18', '19', '26', '27', '28'],

    // Дом → тип квартир → ключ планировки → данные (по flatVariants выше)
    layouts: {
      '5': {
        'euro2': {
          '5-В': {totalApartments: 1, availableFloors: '3'},
          '5-Ж': {totalApartments: 1, availableFloors: '7'},
        },
      },

      '6': {
        'euro2': {
          '6-A': {totalApartments: 1, availableFloors: '8'},
          '6-Г': {totalApartments: 1, availableFloors: '9'},
          '6-Д': {totalApartments: 2, availableFloors: '8-9'},
          '6-И': {totalApartments: 3, availableFloors: '2, 8-9'},
          '6-К': {totalApartments: 1, availableFloors: '9'},
        },
      },

      '7': {
        'euro2': {
          '7-A': {totalApartments: 2, availableFloors: '6,8'},
          '7-В': {totalApartments: 1, availableFloors: '8'},
          '7-Г': {totalApartments: 1, availableFloors: '9'},
          '7-Д': {totalApartments: 2, availableFloors: '4'},
          '7-Ж': {totalApartments: 2, availableFloors: '8'},
          '7-И': {totalApartments: 7, availableFloors: '4-6, 8-9'},
          '7-К': {totalApartments: 3, availableFloors: '8, 9'},
        },
      },

      '8': {
        'euro2': {
          '8-A': {totalApartments: 1, availableFloors: '5'},
          '8-Д': {totalApartments: 1, availableFloors: '7'},
          '8-Ж': {totalApartments: 1, availableFloors: '5'},
          '8-И': {totalApartments: 10, availableFloors: '2-5, 8-9'},
          '8-К': {totalApartments: 7, availableFloors: '4, 6-9'},
        },
      },

      '9': {
        'euro2': {
          '9-A': {totalApartments: 1, availableFloors: '3'},
          '9-Ж': {totalApartments: 2, availableFloors: '5, 9'},
          '9-И': {totalApartments: 1, availableFloors: '8'},
        },
      },

      '10': {
        'euro2': {
          '10-A': {totalApartments: 1, availableFloors: '7'},
          '10-Д': {totalApartments: 1, availableFloors: '9'},
          '10-И': {totalApartments: 4, availableFloors: '2-3, 5, 9'},
          '10-К': {totalApartments: 2, availableFloors: '9'},
        },
        'penthouse': {
          '10-A': {totalApartments: 1, availableFloors: '10'},
        },
      },

      '12': {
        'euro2': {
          '12-В': {totalApartments: 1, availableFloors: '8'},
          '12-Д': {totalApartments: 1, availableFloors: '3'},
          '12-Е': {totalApartments: 1, availableFloors: '6'},
        },
      },

      '13': {
        'euro2': {
          '13-Ж': {totalApartments: 1, availableFloors: '3'},
          '13-И': {totalApartments: 1, availableFloors: '3'},
          '13-К': {totalApartments: 2, availableFloors: '8-9'},
        },
        'penthouse': {
          '13-Б': {totalApartments: 1, availableFloors: '10'},
        },
      },

      '14': {
        'euro2': {
          '14-A': {totalApartments: 1, availableFloors: '8'},
          '14-Е': {totalApartments: 1, availableFloors: '6'},
          '14-К': {totalApartments: 2, availableFloors: '7-8'},
        },
        'penthouse': {
          '14-A': {totalApartments: 1, availableFloors: '10'},
        },
      },

      '15': {
        'euro2': {
          '15-A': {totalApartments: 2, availableFloors: '2'},
          '15-В': {totalApartments: 2, availableFloors: '5, 8'},
          '15-Д': {totalApartments: 1, availableFloors: '4'},
          '15-И': {totalApartments: 1, availableFloors: '9'},
        },
        'penthouse': {
          '15-A': {totalApartments: 1, availableFloors: '10'},
          '15-Б': {totalApartments: 1, availableFloors: '10'},
        },
      },

      '16': {
        'euro2': {
          '16-В': {totalApartments: 1, availableFloors: '8'},
          '16-Д': {totalApartments: 1, availableFloors: '9'},
          '16-Ж': {totalApartments: 4, availableFloors: '2, 6-7'},
          '16-И': {totalApartments: 1, availableFloors: '9'},
          '16-К': {totalApartments: 2, availableFloors: '2, 9'},
        },
      },

      '17': {
        'euro2': {
          '17-В': {totalApartments: 4, availableFloors: '2-3, 6-7'},
          '17-Д': {totalApartments: 1, availableFloors: '4'},
          '17-Е': {totalApartments: 1, availableFloors: '7'},
          '17-Ж': {totalApartments: 1, availableFloors: '8'},
          '17-И': {totalApartments: 2, availableFloors: '8'},
          '17-К': {totalApartments: 6, availableFloors: '4, 6, 8-9'},
        },
        'penthouse': {
          '17-A': {totalApartments: 1, availableFloors: '10'},
          '17-Б': {totalApartments: 1, availableFloors: '10'},
        },
      },

      '18': {
        'euro2': {
          '18-A': {totalApartments: 3, availableFloors: '3-4, 6'},
          '18-В': {totalApartments: 4, availableFloors: '2, 4, 6'},
          '18-Г': {totalApartments: 1, availableFloors: '9'},
          '18-Ж': {totalApartments: 2, availableFloors: '7-8'},
          '18-И': {totalApartments: 4, availableFloors: '4, 8-9'},
          '18-К': {totalApartments: 6, availableFloors: '6, 8-9'},
        },
        'penthouse': {
          '18-A': {totalApartments: 1, availableFloors: '10'},
          '18-Б': {totalApartments: 1, availableFloors: '10'},
        },
      },

      '19': {
        'euro2': {
          '19-В': {totalApartments: 8, availableFloors: '2-8'},
          '19-Д': {totalApartments: 4, availableFloors: '3-5, 9'},
          '19-Е': {totalApartments: 1, availableFloors: '2'},
          '19-И': {totalApartments: 3, availableFloors: '6, 8-9'},
          '19-К': {totalApartments: 2, availableFloors: '8-9'},
        },
        'penthouse': {
          '19-A': {totalApartments: 1, availableFloors: '10'},
          '19-Б': {totalApartments: 1, availableFloors: '10'},
        },
      },

      '26': {
        'euro2': {
          '26-Д': {totalApartments: 1, availableFloors: '9'},
          '26-Ж': {totalApartments: 1, availableFloors: '6'},
          '26-И': {totalApartments: 4, availableFloors: '2, 8-9'},
          '26-К': {totalApartments: 6, availableFloors: '4-6, 8-9'},
        },
      },

      '27': {
        'euro2': {
          '27-A': {totalApartments: 4, availableFloors: '4, 7-8'},
          '27-Г': {totalApartments: 2, availableFloors: '9'},
          '27-Д': {totalApartments: 3, availableFloors: '6-7'},
          '27-Ж': {totalApartments: 3, availableFloors: '2, 6, 8'},
          '27-И': {totalApartments: 5, availableFloors: '7-9'},
          '27-К': {totalApartments: 5, availableFloors: '4-5, 7-9'},
        },
      },

      '28': {
        'euro2': {
          '28-В': {totalApartments: 1, availableFloors: '6'},
          '28-Д': {totalApartments: 2, availableFloors: '7'},
          '28-Ж': {totalApartments: 6, availableFloors: '4-6'},
          '28-И': {totalApartments: 5, availableFloors: '4, 6, 9'},
          '28-К': {totalApartments: 2, availableFloors: '9'},
        },
      },
    },

    sectors: null,
    floorPriceRanges: null,
  },

  jk4: {
  forceOfferingFromConfig: true,
  developer: 'Квартал 777',
  deliveryDate: '3 квартал 2028г',
  installmentTerm: 'до 6 лет',
  maternityCapital: 'yes',
  markupBasis: 'after',
  recalculation: 'no',
  noMarkupYears: 2,
  mandatoryPayment: 4000,

  floorPriceRanges: [
    { floorMin: 3, floorMax: 5, price: 80000 },
    { floorMin: 6, floorMax: 8, price: 75000 },
    { floorMin: 9, floorMax: 11, price: 70000 },
    { floorMin: 12, floorMax: 18, price: 65000 },
  ],
  floorPriceColumnLabels: { from: 'Двор', to: 'Видовые' },

  // Порядок секторов на странице объекта (дом 1, 2, 3)
  sectorOrder: ['1', '2', '3'],

  // Сектор → тип квартир → ключ планировки → данные (по flatVariants выше)
  layouts: {
    '1': {
      '1room': {
        '1-A': { totalApartments: 1, availableFloors: '19' },
        '1-E': { totalApartments: 1, availableFloors: '19' },
      },
      '2room': {
        '1-A': { totalApartments: 1, availableFloors: '19' },
        '1-B': { totalApartments: 3, availableFloors: '17-19' },
        '1-Г': { totalApartments: 8, availableFloors: '3, 5, 8, 10, 16-19' },
        '1-Д': { totalApartments: 5, availableFloors: '5, 8, 17-19' },
        '1-Е': { totalApartments: 3, availableFloors: '17-19' },
        '1-И': { totalApartments: 1, availableFloors: '3' },
      },
    },

    '2': {
      '1room': {
        '2-A': { totalApartments: 1, availableFloors: '8' },
        '2-Б': { totalApartments: 2, availableFloors: '18-19' },
        '2-Д': { totalApartments: 3, availableFloors: '4, 8, 19' },
        '2-E': { totalApartments: 1, availableFloors: '19' },
      },
      '2room': {
        '2-Б': { totalApartments: 2, availableFloors: '18-19' },
        '2-B': { totalApartments: 9, availableFloors: '3,5, 10-11, 14, 16-19' },
        '2-Г': { totalApartments: 8, availableFloors: '4, 7-8, 11, 16-19' },
        '2-Д': { totalApartments: 4, availableFloors: '16-19' },
        '2-Е': { totalApartments: 7, availableFloors: '10-11, 14, 16-19' },
        '2-Ж': { totalApartments: 2, availableFloors: '18-19' },
        '2-И': { totalApartments: 1, availableFloors: '19' },
      },
    },

    '3': {
      '1room': {
        '3-A': { totalApartments: 2, availableFloors: '5, 19' },
        '3-Б': { totalApartments: 3, availableFloors: '6, 11, 18' },
        '3-В': { totalApartments: 1, availableFloors: '8' },
        '3-Г': { totalApartments: 1, availableFloors: '8' },
        '3-Д': { totalApartments: 3, availableFloors: '3, 7, 19' },
        '3-E': { totalApartments: 3, availableFloors: '3, 5, 19' },
      },
      '2room': {
        '3-Б': { totalApartments: 2, availableFloors: '5, 18' },
        '3-B': { totalApartments: 12, availableFloors: '6, 8-11, 13-19' },
        '3-Г': { totalApartments: 10, availableFloors: '4, 6, 8, 10-11, 15-19' },
        '3-Д': { totalApartments: 7, availableFloors: '5, 8, 11, 16-19' },
        '3-Е': { totalApartments: 10, availableFloors: '4, 8-11, 15-19' },
        '3-Ж': { totalApartments: 4, availableFloors: '6, 8, 18-19' },
        '3-И': { totalApartments: 1, availableFloors: '19' },
      },
    },
  },

  sectors: null,
  },

  jk5: {
  forceOfferingFromConfig: true,
  developer: 'СК Экология',
  deliveryDate: '2029г',
  installmentTerm: 'до 5 лет',
  maternityCapital: 'yes',
  markupBasis: 'after',
  recalculation: 'no',
  noMarkupYears: 1,
  mandatoryPayment: 5000,

  floorPriceRanges: [
    { floorMin: 5, floorMax: 11, price: 65000 },
    { floorMin: 12, floorMax: 18, price: 62000 },
    { floorMin: 19, floorMax: 28, price: 59000 },
  ],
  floorPriceColumnLabels: { from: 'Стандарт', to: 'Видовые' },
  floorPriceToOffset: 3000,
  sectorHeading: 'Дом',

  sectorOrder: ['2', '3'],

  layouts: {
    '2': {
      '1room': {
        '1К-1': { totalApartments: 22, availableFloors: '7-28' },
        '1К-2': { totalApartments: 20, availableFloors: '6-18, 21-28' },
        '1К-3': { totalApartments: 23, availableFloors: '6-28' },
        '1К-4': { totalApartments: 21, availableFloors: '6-11, 13-18, 20-28' },
        '1К-5': { totalApartments: 18, availableFloors: '8-14, 16-18, 21-28' },
        '1К-6': { totalApartments: 20, availableFloors: '7-17, 20-28' },
        '1К-7': { totalApartments: 19, availableFloors: '8-11, 14-28' },
        '1К-8': { totalApartments: 22, availableFloors: '7-28' },
      },

      '2room': {
        '2К-1': { totalApartments: 17, availableFloors: '9, 11, 13-19, 21-28' },
        '2К-2': { totalApartments: 20, availableFloors: '9-28' },

      },
    },

    '3': {
      '1room': {
        '1К-1': { totalApartments: 22, availableFloors: '7-22, 24-28' },
        '1К-2': { totalApartments: 22, availableFloors: '6-18, 20-28' },
        '1К-3': { totalApartments: 20, availableFloors: '8-22, 24-28' },
        '1К-4': { totalApartments: 23, availableFloors: '6-28' },
        '1К-5': { totalApartments: 20, availableFloors: '6, 8-11, 13-18, 20-28' },
        '1К-6': { totalApartments: 19, availableFloors: '7-11, 13-18, 21-28' },
        '1К-7': { totalApartments: 18, availableFloors: '9-12, 14-18, 20-28' },
        '1К-8': { totalApartments: 22, availableFloors: '6-18, 20-28' },
      },

      '2room': {
        '2К-1': { totalApartments: 16, availableFloors: '9-12, 14, 16-19, 21, 23-28' },
        '2К-2': { totalApartments: 14, availableFloors: '10-11, 15-18, 21-28' },

      },
    },
  },

  sectors: null,
  },

  jk6: {
  forceOfferingFromConfig: true,
  developer: 'Квартал 777',
  deliveryDate: '3 квартал 2027г',
  installmentTerm: 'до 6 лет',
  maternityCapital: 'yes',
  markupBasis: 'after',
  recalculation: 'no',
  noMarkupYears: 1,
  mandatoryPayment: 5000,

  floorPriceRanges: [
    { floorMin: 4, floorMax: 5, price: 103000 },
    { floorMin: 6, floorMax: 8, price: 98000 },
    { floorMin: 9, floorMax: 11, price: 93000 },
    { floorMin: 10, floorMax: 23, price: 88000 },
  ],
  floorPriceColumnLabels: { from: 'Двор', to: 'Видовые' },
  floorPriceToOffset: 5000,
  sectorHeading: 'Сектор',

  sectorOrder: ['1', '2', '4', '5', '6', '7'],

  layouts: {
    '1': {
      '1room': {
        '1-Б': { totalApartments: 22, availableFloors: '7-28' },
        '1-В': { totalApartments: 20, availableFloors: '6-18, 21-28' },
      },

      'euro2': {
        '1-Б': { totalApartments: 22, availableFloors: '7-28' },
        '1-В': { totalApartments: 20, availableFloors: '6-18, 21-28' },
      },

      '2room': {
        '1-В': { totalApartments: 17, availableFloors: '9, 11, 13-19, 21-28' },
        '1-Г': { totalApartments: 20, availableFloors: '9-28' },
        '1-Д': { totalApartments: 20, availableFloors: '9-28' },
      },
    },

    '2': {
      '1room': {
        '2-А': { totalApartments: 22, availableFloors: '7-28' },
      },

      'euro2': {
        '2-Г': { totalApartments: 22, availableFloors: '7-28' },
        '2-Д': { totalApartments: 20, availableFloors: '6-18, 21-28' },
      },

      '2room': {
        '2-Д': { totalApartments: 17, availableFloors: '9, 11, 13-19, 21-28' },
      },
    },

    '4': {
      'euro2': {
        '4-А': { totalApartments: 22, availableFloors: '7-28' },
        '4-Д': { totalApartments: 20, availableFloors: '6-18, 21-28' },
      },

      '2room': {
        '4-А': { totalApartments: 17, availableFloors: '9, 11, 13-19, 21-28' },
        '4-Г': { totalApartments: 17, availableFloors: '9, 11, 13-19, 21-28' },
      },
    },

    '5': {
      'euro2': {
        '5-А': { totalApartments: 22, availableFloors: '7-28' },
        '5-Д': { totalApartments: 20, availableFloors: '6-18, 21-28' },
      },

      '2room': {
        '5-А': { totalApartments: 17, availableFloors: '9, 11, 13-19, 21-28' },
        '5-Г': { totalApartments: 17, availableFloors: '9, 11, 13-19, 21-28' },
      },
    },

    '6': {
      'euro2': {
        '6-А': { totalApartments: 22, availableFloors: '7-28' },
        '6-Д': { totalApartments: 20, availableFloors: '6-18, 21-28' },
      },

      '2room': {
        '6-А': { totalApartments: 17, availableFloors: '9, 11, 13-19, 21-28' },
        '6-Г': { totalApartments: 17, availableFloors: '9, 11, 13-19, 21-28' },
      },
    },

    '7': {
      '1room': {
        '7-Б': { totalApartments: 22, availableFloors: '7-28' },
      },

      'euro2': {
        '7-А': { totalApartments: 22, availableFloors: '7-28' },
      },

      '2room': {
        '7-В': { totalApartments: 17, availableFloors: '9, 11, 13-19, 21-28' },
        '7-Г': { totalApartments: 20, availableFloors: '9-28' },
        '7-Д': { totalApartments: 20, availableFloors: '9-28' },
      },

      '3room': {
        '7-Б': { totalApartments: 17, availableFloors: '9, 11, 13-19, 21-28' },
      },
    },
  },

  sectors: null,
  },
};

for (const complexId of Object.keys(COMPLEX_PROPERTY_CONFIGS)) {
  COMPLEX_SOURCE_FLAT_VARIANTS[complexId] = JSON.parse(JSON.stringify(
    (DEFAULT_PROPERTIES.find(item => item.id === complexId) || {}).flatVariants || []
  ));
}

function getComplexLayoutDetailConfig(sectorTitle, flatType, layoutKey, config) {
  const sectorConfig = config?.layouts?.[stripSectorTitle(sectorTitle)];
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

function layoutKeyMatchesSector(layoutKey, sectorTitle) {
  const sector = stripSectorTitle(sectorTitle);
  const key = String(layoutKey || '').trim();
  if (!sector || !key) return false;
  const prefix = key.split('-')[0];
  return stripSectorTitle(prefix) === sector;
}

function buildComplexSectorsFromLayoutConfig(sourceVariants, config) {
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
  const layoutsConfig = config?.layouts || {};
  const sectorTitles = getConfiguredSectorTitles(layoutsConfig, config?.sectorOrder);

  for (const sectorTitle of sectorTitles) {
    const flatTypesConfig = getComplexLayoutConfigForSector(layoutsConfig, sectorTitle);
    if (!flatTypesConfig) continue;
    const flatVariantsByType = new Map();

    for (const [flatType, layoutsForType] of Object.entries(flatTypesConfig || {})) {
      if (!FLAT_TYPE_LABELS[flatType]) continue;

      const sourceMap = layoutLookup.get(flatType);
      const sourceVariant = (sourceVariants || []).find(variant => variant.flatType === flatType);
      if (!sourceMap || !sourceVariant) continue;

      const configuredEntries = Object.entries(layoutsForType || {});
      const sectorLayouts = [];
      for (const [layoutKey, detail] of configuredEntries) {
        const sourceLayout = sourceMap.get(String(layoutKey));
        if (!sourceLayout) continue;

        sectorLayouts.push({
          ...sourceLayout,
          sectorTitle,
          label: detail?.label ? String(detail.label).trim() : sourceLayout.label,
        });
      }

      if (!sectorLayouts.length) {
        const sourceForSector = [...sourceMap.entries()]
          .filter(([layoutKey]) => layoutKeyMatchesSector(layoutKey, sectorTitle));

        sourceForSector.forEach(([layoutKey, sourceLayout], index) => {
          const detail = layoutsForType?.[layoutKey]
            || configuredEntries[index]?.[1]
            || {};
          sectorLayouts.push({
            ...sourceLayout,
            sectorTitle,
            label: detail?.label ? String(detail.label).trim() : sourceLayout.label,
          });
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

  return sortSectorsByPreferredOrder(sectors, config?.sectorOrder);
}

function buildComplexSectorsFromExplicitData(sectorsData) {
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

function applyComplexLayoutDetailsToSectors(sectors, config) {
  return sectors.map((sector) => {
    const sectorTitle = stripSectorTitle(sector.title);
    const flatVariants = (sector.flatVariants || []).map((variant) => {
      const rawLayouts = getVariantLayouts(variant);
      const distributed = distributeApartmentsAcrossLayouts(
        variant.totalApartments,
        rawLayouts.length
      );

      const layouts = rawLayouts.map((layout, index) => {
        const detail = getComplexLayoutDetailConfig(sectorTitle, variant.flatType, layout.key, config);
        const totalApartments = detail?.totalApartments ?? layout.totalApartments ?? distributed[index] ?? 0;
        const customLabel = detail?.label ? String(detail.label).trim() : '';
        const customDescription = detail?.description ? String(detail.description).trim() : '';
        const layoutWithoutDescription = { ...layout };
        delete layoutWithoutDescription.description;
        delete layoutWithoutDescription.descriptionManual;
        return normalizeLayoutVariant({
          ...layoutWithoutDescription,
          label: customLabel || layout.label,
          ...(customDescription ? { description: customDescription, descriptionManual: true } : {}),
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

function getComplexPropertyDetailsFromConfig(config) {
  const details = {};
  for (const key of ['developer', 'deliveryDate', 'installmentTerm', 'maternityCapital', 'markupBasis', 'recalculation']) {
    const value = config?.[key];
    if (value != null && String(value).trim() !== '') {
      details[key] = value;
    }
  }
  return details;
}

function applyComplexConfigFromRegistry(property) {
  const config = COMPLEX_PROPERTY_CONFIGS[property?.id];
  if (!config || !isComplex(property)) return property;

  const defaults = DEFAULT_PROPERTIES.find(item => item.id === property.id);
  const sourceVariants = COMPLEX_SOURCE_FLAT_VARIANTS[property.id];
  const source = {
    ...defaults,
    ...property,
    flatVariants: Array.isArray(sourceVariants) && sourceVariants.length
      ? sourceVariants
      : (defaults?.flatVariants || property.flatVariants),
  };

  let sectors = Array.isArray(config.sectors) && config.sectors.length
    ? buildComplexSectorsFromExplicitData(config.sectors)
    : (config.layouts && Object.keys(config.layouts).length
      ? buildComplexSectorsFromLayoutConfig(source.flatVariants, config)
      : buildSectorsFromFlatVariants(getFlatVariantsForSectorBuild(source)));

  sectors = sortSectorsByPreferredOrder(
    applyComplexLayoutDetailsToSectors(sectors, config),
    config?.sectorOrder
  );

  const item = { ...source, sectors };

  if (config.sectorHeading) {
    item.sectorHeading = String(config.sectorHeading).trim();
  } else {
    delete item.sectorHeading;
  }

  if (config.forceOfferingFromConfig) {
    Object.assign(item, getComplexPropertyDetailsFromConfig(config));
    item.recalculation = config.recalculation || 'no';
    if (config.sectorPriceGroups) {
      item.sectorPriceGroups = normalizeSectorPriceGroups(config.sectorPriceGroups);
      delete item.floorPriceRanges;
    } else if (config.floorPriceRanges) {
      item.floorPriceRanges = normalizeFloorPriceRanges(config.floorPriceRanges);
      delete item.sectorPriceGroups;
    }
    if (config.floorPriceColumnLabels) {
      item.floorPriceColumnLabels = {
        from: String(config.floorPriceColumnLabels.from || '').trim() || 'Старопром',
        to: String(config.floorPriceColumnLabels.to || '').trim() || 'Угловые',
      };
    } else {
      delete item.floorPriceColumnLabels;
    }
    if (config.floorPriceToOffset != null) {
      item.floorPriceToOffset = Number(config.floorPriceToOffset) || 0;
    } else {
      delete item.floorPriceToOffset;
    }
  } else {
    const details = getComplexPropertyDetailsFromConfig(config);
    for (const [key, value] of Object.entries(details)) {
      if (item[key] == null || String(item[key]).trim() === '') {
        item[key] = value;
      }
    }
    if (config.noMarkupYears != null && item.noMarkupYears == null) {
      item.noMarkupYears = config.noMarkupYears;
    }
    if (config.mandatoryPayment != null && item.mandatoryPayment == null) {
      item.mandatoryPayment = config.mandatoryPayment;
    }
  }

  const images = repairPropertyImages({
    ...item,
    ...getDefaultImagesForProperty(property.id),
  });
  item.img = images.img;
  item.images = images.images;

  return preservePropertyContentFields(
    mergeSavedLayoutData(repairComplexSectorData(item), property),
    property
  );
}

function applyComplexDefaultsToCatalog() {
  for (const complexId of Object.keys(COMPLEX_PROPERTY_CONFIGS)) {
    const property = DEFAULT_PROPERTIES.find(item => item.id === complexId);
    if (!property) continue;
    Object.assign(property, applyComplexConfigFromRegistry(property));
  }
}

applyComplexDefaultsToCatalog();
initStore();
