# Aparts — каталог недвижимости

Личный сайт на **HTML + CSS + JavaScript** (как [gran-pc](https://github.com/absolutepc/gran-pc)).

## Возможности

- Раздел **Квартиры и студии** — площадь (м²) и количество комнат
- Раздел **Коммерческая недвижимость**
- **Админ-панель** — добавление, редактирование и удаление объектов
- Данные хранятся в `localStorage` браузера

## Запуск

Сайт статический, **Node.js не нужен**.

### Вариант 1 — просто открыть файл

Откройте `index.html` в браузере двойным кликом.

### Вариант 2 — через VS Code (рекомендуется)

1. Откройте папку проекта в VS Code
2. Установите расширение **Live Server**
3. Правый клик по `index.html` → **Open with Live Server**

### Вариант 3 — через Python

```bash
python -m http.server 8000
```

Откройте http://localhost:8000

## Страницы

| Файл | Описание |
|------|----------|
| `index.html` | Главная |
| `apartments.html` | Квартиры и студии |
| `commercial.html` | Коммерческая недвижимость |
| `property.html?id=...` | Карточка объекта |
| `admin.html` | Админ-панель |

## Админка

- URL: `admin.html`
- **Email:** `admin@aparts.ru`
- **Пароль:** `admin123`

## Структура

```
aparts/
├── index.html
├── apartments.html
├── commercial.html
├── property.html
├── admin.html
├── css/style.css
├── js/
│   ├── data.js        # данные и localStorage
│   ├── layout.js      # шапка и подвал
│   ├── app.js         # карточки и утилиты
│   ├── properties.js  # страницы каталога
│   └── admin.js       # админ-панель
└── img/
```

## Git

```bash
git add .
git commit -m "Описание изменений"
git push
```

Для публикации в интернет можно использовать GitHub Pages — включите Pages в настройках репозитория, источник: ветка `main`, папка `/ (root)`.
