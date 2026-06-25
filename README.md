# Недвижимость — личный сайт-каталог

Сайт для публикации квартир, студий и коммерческих помещений с админ-панелью.

## Возможности

- Раздел **Квартиры и студии** с параметрами: площадь (м²) и количество комнат
- Раздел **Коммерческая недвижимость** (без поля «комнаты»)
- **Админ-панель** для добавления, редактирования и удаления объектов
- Карточки объектов с ценой, адресом и фото

## Стек

- Next.js 16 (App Router)
- TypeScript + Tailwind CSS
- Prisma + SQLite

## Быстрый старт

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run db:seed
npm run dev
```

Сайт: [http://localhost:3000](http://localhost:3000)

Админка: [http://localhost:3000/admin](http://localhost:3000/admin)

**Пароль по умолчанию:** `admin` (меняется через `ADMIN_PASSWORD` в `.env`)

## Переменные окружения

| Переменная | Описание |
|------------|----------|
| `DATABASE_URL` | Путь к SQLite базе (`file:./dev.db`) |
| `ADMIN_PASSWORD` | Пароль для входа в админку |
| `ADMIN_SECRET` | Секрет для подписи сессии |

## Структура

```
src/
├── app/
│   ├── apartments/      # Квартиры и студии
│   ├── commercial/        # Коммерческая недвижимость
│   ├── property/[id]/     # Карточка объекта
│   └── admin/             # Админ-панель
├── components/
└── lib/
prisma/
└── schema.prisma          # Модель Property
```

## Деплой

Для продакшена рекомендуется PostgreSQL (Neon, Supabase) вместо SQLite.
Vercel поддерживает деплой Next.js напрямую из GitHub.
