# Бэкенд Google Apps Script (КАФ'26)

Веб-апп Google Apps Script — серверная часть VK Mini App «КАФ'26». Хранит данные в Google Таблице и отдаёт их фронтенду по HTTP.

## Структура

- `Code.gs` — вся логика веб-аппа (doGet / doPost).
- `appsscript.json` — манифест (timeZone UTC, scopes, настройки веб-аппа).

## Требования к Google Таблице

Таблица должна содержать листы:

### Лист «площадки»
Заголовки (первая строка):

| id | name | subtitle | location | time_start | time_end | speaker | speaker_title | description | avatar_url |
|----|------|----------|----------|------------|----------|---------|---------------|-------------|------------|

- `id` — уникальный идентификатор площадки (используется в хэш-роутинге `#<id>`).
- `time_start`, `time_end` — ISO 8601 UTC без смещения, например `2026-09-01T04:00:00Z`.
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

## Развёртывание веб-аппа

1. Откройте `Code.gs` в редакторе Apps Script (script.google.com).
2. Вставьте код `Code.gs` и `appsscript.json`.
3. Привяжите скрипт к вашей Google Таблице (Ресурсы → Привязать скрипт, или создайте скрипт из таблицы).
4. Нажмите **Deploy → New deployment**.
5. Выберите тип **Web app**.
6. **Execute as:** `Me` (владелец скрипта).
7. **Who has access:** `Anyone` (анонимный доступ).
8. Скопируйте URL веб-аппа — он понадобится фронтенду (`NEXT_PUBLIC_APPS_SCRIPT_URL`).

## API

### GET

- `?action=schedule` — все площадки + `cacheVersion` + `serverTime` (UTC epoch ms).
- `?action=platform&id=X&vk_user_id=Y` — площадка + вопросы пользователя Y.
- `?action=questions&platform_id=X&vk_user_id=Y` — вопросы пользователя Y по площадке X.

### POST (JSON в теле)

- `{ action: 'add_question', platform_id, vk_user_id, name, text, rating? }`
- `{ action: 'edit_question', id, vk_user_id, name, text, rating? }` — только автор.
- `{ action: 'delete_question', id, vk_user_id }` — только автор, физическое удаление.
- `{ action: 'add_review', platform_id, vk_user_id, name, text, rating }`

Ответы — JSON вида `{ ok: true, data: ... }` или `{ ok: false, error: '...' }`.

## Логирование

На каждом шаге вызываются `Logger.log` / `console.log`. Логи смотрите в **Выполнения (Executions)** редактора Apps Script.
