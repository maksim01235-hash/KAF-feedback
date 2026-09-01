# КАФ'26 — VK Mini App

VK Mini App для Красноярского астрономического форума «КАФ'26»: расписание площадок, вопросы и отзывы, авторизация через VK ID.

## Стек

- **Фронтенд:** Next.js (TypeScript), статический экспорт, многоэкранный SPA с хэш-роутингом, мобильная адаптация.
- **UI:** `@vkontakte/vkui` (тема liquid glass) + `@vkontakte/icons` + кастомный CSS. Markdown: `react-markdown`.
- **Бэкенд:** Google Apps Script (веб-апп), данные в Google Таблице.
- **Публикация:** GitHub Pages (корень домена, без basePath).

## Структура проекта

```
.
├── apps-script/          # Бэкенд Google Apps Script (Code.gs, appsscript.json, README)
├── src/
│   ├── app/              # Страницы (расписание, площадка, вопрос, отзыв, авторизация)
│   ├── components/       # UI-компоненты
│   ├── lib/              # Логика (api, cache, identity, router, storage, time, validation)
│   ├── styles/           # Глобальные стили (liquid glass)
│   └── types/            # Типы данных
├── tests/                # Юнит-тесты (vitest)
└── .github/workflows/    # CI для GitHub Pages
```

## 1. Настройка Google Таблицы

Создайте Google Таблицу с листами:

### Лист «площадки»

| id | name | subtitle | location | time_start | time_end | speaker | speaker_title | description | avatar_url |
|----|------|----------|----------|------------|----------|---------|---------------|-------------|------------|

- `id` — уникальный идентификатор площадки (используется в хэш-роутинге `#<id>`).
- `time_start`, `time_end` — **ISO 8601 UTC без смещения**, например `2026-09-01T04:00:00Z`.
- `description` — Markdown-текст.
- `avatar_url` — опционально.

### Лист «вопросы»

| id | platform_id | vk_user_id | name | text | rating | created_at |
|----|-------------|------------|------|------|--------|------------|

- `rating` — 1–5, может быть пустым (вопрос).
- `created_at` — ISO 8601 UTC.

### Лист «отзывы»

| id | platform_id | vk_user_id | name | text | rating | created_at |
|----|-------------|------------|------|------|--------|------------|

- `rating` — 1–5, обязателен.

### Служебный лист «версия кеша»

- Ячейка `A1` — строка версии кеша (например `2026-09-01`). При изменении расписания обновите это значение — клиенты принудительно перезагрузят данные.

> **Детальный формат каждой ячейки** (тип, обязательность, примеры значений, пример заполненной строки) — см. [`apps-script/README.md`](apps-script/README.md#требования-к-google-таблице).

## 2. Написание и развёртывание GAS

Подробно — в [`apps-script/README.md`](apps-script/README.md) (там же — детальный формат ячеек таблицы и описание `appsscript.json`).

Кратко:

1. Откройте `apps-script/Code.gs` в редакторе Apps Script.
2. Добавьте в проект файл `appsscript.json` (манифест: часовой пояс UTC, права доступа, настройки веб-аппа). Без него скрипт может работать в неверном часовом поясе и без нужных прав.
3. Привяжите скрипт к вашей Google Таблице.
4. **Deploy → New deployment → Web app**.
5. **Execute as:** `Me`, **Who has access:** `Anyone`.
6. Скопируйте URL веб-аппа — он понадобится как `NEXT_PUBLIC_APPS_SCRIPT_URL`.

## 3. Настройка Next.js

### Зависимости

```bash
npm install
```

### Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните (без секретов):

```bash
# URL веб-аппа Google Apps Script
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec

# ID VK Mini App
NEXT_PUBLIC_VK_APP_ID=123456
```

## 4. Локальный запуск и отладка

```bash
npm run dev
```

Откройте `http://localhost:3000`. Хэш-роутинг:

- `#` — расписание
- `#<platformId>` — страница площадки
- `#ask/<platformId>` — форма вопроса
- `#review/<platformId>` — форма отзыва
- `#auth` — авторизация

## 5. Сборка и публикация на GitHub Pages

```bash
npm run build
```

Статический экспорт появится в `out/`. Публикация на GitHub Pages выполняется автоматически через GitHub Actions (`.github/workflows/deploy.yml`) при push в `main`.

## 6. Подключение как VK Mini App

1. Создайте VK Mini App в кабинете разработчика VK.
2. Укажите URL вашего GitHub Pages (корень домена).
3. Укажите `NEXT_PUBLIC_VK_APP_ID` — ID приложения.
4. Глубокая ссылка: `vk.com/app<id>#<platformId>`.

## 7. Эксплуатация

- **Обновление расписания:** редактируйте лист «площадки» в Google Таблице.
- **«Версия кеша»:** после изменения расписания обновите ячейку `A1` на листе «версия кеша» — клиенты принудительно перезагрузят данные (кэш 2 часа).
- **Администрирование:** вопросы и отзывы хранятся в таблице; редактирование/удаление вопросов доступно автору (по `vk_user_id`).

## Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

## Безопасность

- В репозитории нет секретов. Все ключи и URL задаются через переменные окружения.
- Идентификация пользователя — `vk_user_id` из launch params (vk-bridge), fallback на localStorage. Защита от подмены не требуется.
- Задержка отправок (вопрос/отзыв) — минимум 10 секунд (клиент + GAS).
