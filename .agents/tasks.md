# Задачи для агента-исполнителя

> Этот файл ведёт агент-планировщик.
> Исполнитель меняет только статусы задач, добавляет технические уточнения и ссылки на commit/changelog.
> Задачи выполняются только при наличии активного утверждённого плана в `.agents/plan.md`.

## Очередь

- [ ] `TASK-20260901-01` — Скаффолд Next.js-проекта и общая база (`completed`)
- [ ] `TASK-20260901-02` — Логика времени и активности площадок (`completed`, parallel после 01)
- [ ] `TASK-20260901-03` — Логика валидации форм (`completed`, parallel после 01)
- [ ] `TASK-20260901-04` — Логика кэширования расписания (`completed`, parallel после 01)
- [ ] `TASK-20260901-05` — Логика идентификации и прав (`completed`, parallel после 01)
- [ ] `TASK-20260901-06` — Бэкенд Google Apps Script (`completed`, parallel после 01)
- [ ] `TASK-20260901-07` — Фронтенд: страницы, компоненты, хэш-роутинг, состояния (`completed`, после 02–05)
- [ ] `TASK-20260901-08` — README и финальная интеграция (`completed`, после 06–07)

> **План `PLAN-20260901-02` (UI-баги):**
- [x] `TASK-20260901-09` — Тулбар главного экрана и типографика (`completed`, без «Войти»)
- [x] `TASK-20260901-10` — Отдельная колонка аватарки карточки (`completed`, parallel после 09)
- [x] `TASK-20260901-11` — Экран площадки: аватарка у докладчика + описание в рамке (`completed`, после 09)
- [x] `TASK-20260901-12` — Экран отзыва: центрирование и размер звёзд (`completed`, после 11)
- [x] `TASK-20260901-13` — Исправление CORS на отправке вопроса/отзыва (`completed`, parallel)
- [x] `TASK-20260901-14` — Переработка авторизации (`completed`, после 12)

---

## TASK-20260901-01 — Скаффолд Next.js-проекта и общая база

**План:** `PLAN-20260901-01`  
**Статус:** `needs-review`  
**Приоритет:** `high`  
**Зависит от:** `нет`  
**Выполнять после:** `нет`  
**parallel:** `false`

### Цель

Рабочий Next.js-проект со статическим экспортом, настроенными зависимостями, типами, утилитами логирования/хранилища, переменными окружения и CI для GitHub Pages.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`
- `.agents/tasks.md`
- `.agents/changelog.md`
- `opencode.json`

### Текущее состояние

Проект пустой (greenfield): `package.json` отсутствует, git-репозитория нет. Только агентская обвязка.

### Действия

1. `package.json` с зависимостями: `next`, `react`, `react-dom`, `@vkontakte/vkui`, `@vkontakte/icons`, `@vkontakte/vk-bridge`, `react-markdown`; dev: `typescript`, `@types/react`, `@types/node`, `eslint`, `eslint-config-next`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`.
2. `next.config.js`: `output: 'export'`, без `basePath` (корень домена).
3. `tsconfig.json` (строгий), `next-env.d.ts`, `eslint.config.mjs`, `.gitignore`, `.env.example` (без секретов: `NEXT_PUBLIC_APPS_SCRIPT_URL`, `NEXT_PUBLIC_VK_APP_ID`).
4. `.github/workflows/deploy.yml` — сборка и публикация `out/` на GitHub Pages.
5. `src/types/index.ts` — типы `Platform`, `Question`, `Review`, `ScheduleResponse`, `ApiResult`.
6. `src/lib/logger.ts` — уровневый логгер (debug/info/warn/error), максимум логов на ранних этапах.
7. `src/lib/storage.ts` — безопасные обёртки над localStorage (только в браузере).
8. `src/app/layout.tsx` — базовый layout, подключение VKUI и глобальных стилей.
9. `src/styles/globals.css` — базовая тема liquid glass (белый/серый/синий).

### Разрешённые файлы

- Создать: `package.json`, `next.config.js`, `tsconfig.json`, `next-env.d.ts`, `eslint.config.mjs`, `.gitignore`, `.env.example`, `.github/workflows/deploy.yml`, `src/types/index.ts`, `src/lib/logger.ts`, `src/lib/storage.ts`, `src/app/layout.tsx`, `src/styles/globals.css`.
- Не изменять: `AGENTS.md`, `opencode.json`, `.opencode/*`, `.agents/*`.

### Критерии готовности

- [ ] `npm install` проходит.
- [ ] `npm run build` собирает статический экспорт в `out/`.
- [ ] `npx tsc --noEmit` без ошибок.
- [ ] `npm run lint` без ошибок.
- [ ] Типы `Platform/Question/Review` соответствуют структуре таблицы из плана.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

- Версия `next` зафиксирована на `14.2.3` (как в рабочем примере пользователя) — в `14.2.35` SWC-бинарник не загружался ("not a valid Win32 application").
- `next lint` в 14.2.3 не поддерживает flat config → создан `.eslintrc.json` (`next/core-web-vitals`), `eslint.config.mjs` удалён.
- Добавлены `src/app/page.tsx` и `src/components/AppShell.tsx` (минимальные заглушки, необходимы для сборки; расширяются в TASK-07).
- `npm test` на этом этапе: "No test files found" (тесты появятся в TASK-02..05).

### Результат

- Changelog: `.agents/changelog.md#2026-09-01-1250`
- Коммит: `ожидает`

---

## TASK-20260901-02 — Логика времени и активности площадок

**План:** `PLAN-20260901-01`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-01`  
**Выполнять после:** `TASK-20260901-01`  
**parallel:** `true`

### Цель

Чистые функции определения активности площадок по UTC и фильтра «текущего дня», покрытые тестами.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `src/types/index.ts`
- `src/lib/time.ts` (создать)

### Текущее состояние

Времени-логики нет.

### Действия

1. `src/lib/time.ts`:
   - `isActive(platform, serverTimeMs)` — `time_start <= serverTime < time_end` (UTC).
   - `isToday(platform, serverTimeMs, tzOffsetMinutes)` — локальная дата пользователя из serverTime + смещение устройства.
   - `filterToday(platforms, serverTimeMs, tzOffsetMinutes)`.
   - `sortByStart(platforms)`.
   - Парсинг ISO-строк UTC в epoch ms.
2. `tests/time.test.ts` — активность (до/во время/после, несколько активных), границы суток, сортировка.

### Разрешённые файлы

- Создать: `src/lib/time.ts`, `tests/time.test.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`.

### Критерии готовности

- [ ] Все сценарии активности покрыты тестами.
- [ ] `npm test` зелёный.
- [ ] `npx tsc --noEmit` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-03 — Логика валидации форм

**План:** `PLAN-20260901-01`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-01`  
**Выполнять после:** `TASK-20260901-01`  
**parallel:** `true`

### Цель

Чистые функции валидации полей вопросов и отзывов, покрытые тестами.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `src/types/index.ts`
- `src/lib/validation.ts` (создать)

### Текущее состояние

Валидации нет.

### Действия

1. `src/lib/validation.ts`:
   - `validateName`, `validateText` — непустые, простой текст и цифры.
   - `validateRating(rating, required)` — 1–5, обязательность для отзыва, опциональность для вопроса.
   - `validateQuestionForm`, `validateReviewForm` — возвращают ошибки по полям.
   - `isWithinThrottle(lastSentAt, nowMs, minIntervalMs=10000)` — задержка 10с.
2. `tests/validation.test.ts` — пустые поля, типы данных, диапазон оценки, задержка.

### Разрешённые файлы

- Создать: `src/lib/validation.ts`, `tests/validation.test.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`.

### Критерии готовности

- [ ] Валидация вопросов и отзывов покрыта тестами.
- [ ] `npm test` зелёный.
- [ ] `npx tsc --noEmit` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-04 — Логика кэширования расписания

**План:** `PLAN-20260901-01`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-01`  
**Выполнять после:** `TASK-20260901-01`  
**parallel:** `true`

### Цель

Чистые функции кэширования расписания (2ч + «версия кеша»), покрытые тестами.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `src/types/index.ts`
- `src/lib/cache.ts` (создать)

### Текущее состояние

Кэша нет.

### Действия

1. `src/lib/cache.ts`:
   - `shouldRefresh(cached, nowMs, maxAgeMs=2h)` — старше 2ч → обновить.
   - `isCacheVersionChanged(cachedVersion, serverVersion)` — версия кеша изменилась → обновить.
   - `needsFetch(cached, serverVersion, nowMs)` — комбинация.
   - `serialize/deserialize` для localStorage.
2. `tests/cache.test.ts` — свежий/устаревший кэш, смена версии, границы 2ч.

### Разрешённые файлы

- Создать: `src/lib/cache.ts`, `tests/cache.test.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`.

### Критерии готовности

- [ ] Кэш-логика покрыта тестами.
- [ ] `npm test` зелёный.
- [ ] `npx tsc --noEmit` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-05 — Логика идентификации и прав

**План:** `PLAN-20260901-01`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-01`  
**Выполнять после:** `TASK-20260901-01`  
**parallel:** `true`

### Цель

Чистые функции идентификации пользователя (vk_user_id + fallback) и прав на вопрос, покрытые тестами.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `src/types/index.ts`
- `src/lib/identity.ts` (создать)

### Текущее состояние

Идентификации нет.

### Действия

1. `src/lib/identity.ts`:
   - `getVkUserId()` — из launch params через `@vkontakte/vk-bridge`.
   - `getFallbackIdentity()` / `setFallbackIdentity()` — localStorage.
   - `resolveUserId()` — vk_user_id или fallback.
   - `canEditQuestion(question, currentUserId)` — `question.vk_user_id === currentUserId`.
   - `canDeleteQuestion(question, currentUserId)`.
2. `tests/permissions.test.ts` — права редактирования/удаления по vk_user_id (совпадение/несовпадение/пустой).

### Разрешённые файлы

- Создать: `src/lib/identity.ts`, `tests/permissions.test.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`.

### Критерии готовности

- [ ] Права по vk_user_id покрыты тестами.
- [ ] `npm test` зелёный.
- [ ] `npx tsc --noEmit` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-06 — Бэкенд Google Apps Script

**План:** `PLAN-20260901-01`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-01`  
**Выполнять после:** `TASK-20260901-01`  
**parallel:** `true`

### Цель

Рабочий веб-апп GAS: чтение расписания, CRUD вопросов, добавление отзывов, serverTime, cacheVersion, логирование.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `src/types/index.ts` (контракт данных)
- `apps-script/Code.gs`, `apps-script/appsscript.json` (создать)

### Текущее состояние

Бэкенда нет.

### Действия

1. `apps-script/Code.gs`:
   - `doGet(e)` — `action=schedule` (все площадки + `cacheVersion` + `serverTime` UTC), `action=platform&id=X` (площадка + вопросы пользователя по `vk_user_id`), `action=questions&platform_id=X&vk_user_id=Y`.
   - `doPost(e)` — `add_question`, `edit_question`, `delete_question` (проверка `vk_user_id`), `add_review`. Тело JSON из `e.postData.contents`.
   - Чтение листов «площадки», «вопросы», «отзывы»; нормализация времени ISO UTC → epoch ms.
   - Чтение «версии кеша» из служебной ячейки/листа.
   - `Logger.log`/`console.log` на каждом шаге.
   - Возврат JSON через `ContentService`.
2. `apps-script/appsscript.json` — манифест (timeZone UTC, scopes для SpreadsheetApp).
3. `apps-script/README.md` — как развернуть веб-апп (Deploy → Web app, execute as me, доступ).

### Разрешённые файлы

- Создать: `apps-script/Code.gs`, `apps-script/appsscript.json`, `apps-script/README.md`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`.

### Критерии готовности

- [ ] `doGet`/`doPost` реализуют все действия из плана.
- [ ] Время нормализуется в UTC epoch ms; `serverTime` и `cacheVersion` возвращаются.
- [ ] Удаление вопроса — физическое; редактирование/удаление проверяет `vk_user_id`.
- [ ] Код не содержит секретов.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-07 — Фронтенд: страницы, компоненты, хэш-роутинг, состояния

**План:** `PLAN-20260901-01`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-01`, `TASK-20260901-02`, `TASK-20260901-03`, `TASK-20260901-04`, `TASK-20260901-05`  
**Выполнять после:** `TASK-20260901-02..05`  
**parallel:** `false`

### Цель

Полный пользовательский интерфейс: расписание, страница площадки, формы вопроса/отзыва, авторизация; хэш-роутинг; все состояния UI; интеграция localStorage и API.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `src/types/index.ts`, `src/lib/*` (api, cache, storage, identity, time, validation, router, logger)
- `src/app/*`, `src/components/*` (создать)

### Текущее состояние

Фронтенда нет.

### Действия

1. `src/lib/api.ts` — клиент GAS (`fetchSchedule`, `fetchPlatform`, `addQuestion`, `editQuestion`, `deleteQuestion`, `addReview`), обработка ошибок/недоступности.
2. `src/lib/router.ts` — чтение `window.location.hash` → текущий экран и `platformId`; навигация.
3. `src/app/page.tsx` — расписание: загрузка, пусто, сетевая ошибка, недоступность GAS; сортировка, фильтр дня, активность; кэш.
4. `src/app/platform/page.tsx` — площадка: время/место, аватар (placeholder), имя/регалии, Markdown-описание, плавающие кнопки «задать вопрос»/«оставить отзыв», список своих вопросов, неизвестный ID.
5. `src/app/ask/page.tsx` — форма вопроса (имя, текст, 5 звёзд опц.), валидация, задержка 10с, localStorage, редактирование/удаление своих вопросов.
6. `src/app/review/page.tsx` — форма отзыва (имя, текст, 5 звёзд обяз.), валидация, задержка 10с, localStorage.
7. `src/app/auth/page.tsx` — кнопка «Авторизоваться через VK ID», плашка конфиденциальности.
8. `src/components/*` — PlatformCard, PlatformDetail, QuestionForm, ReviewForm, StarRating, Avatar, Markdown, StatusView, AppShell.
9. `src/styles/globals.css` — liquid glass (белый/серый/синий), адаптив, безопасные отступы.
10. Интеграция localStorage-ключей: `kaf.schedule`, `kaf.user`, `kaf.questions.*`, `kaf.reviews.*`, `kaf.lastQuestionAt`, `kaf.lastReviewAt`.

### Разрешённые файлы

- Создать: `src/lib/api.ts`, `src/lib/router.ts`, `src/app/page.tsx`, `src/app/platform/page.tsx`, `src/app/ask/page.tsx`, `src/app/review/page.tsx`, `src/app/auth/page.tsx`, `src/components/*`, `src/styles/globals.css`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`.

### Критерии готовности

- [ ] Все экраны и состояния UI реализованы.
- [ ] Хэш-роутинг работает (`#<platformId>`).
- [ ] Валидация, задержка 10с, localStorage-ограничения работают.
- [ ] `npm run build` собирает статический экспорт.
- [ ] `npx tsc --noEmit` и `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-08 — README и финальная интеграция

**План:** `PLAN-20260901-01`  
**Статус:** `completed`  
**Приоритет:** `medium`  
**Зависит от:** `TASK-20260901-06`, `TASK-20260901-07`  
**Выполнять после:** `TASK-20260901-07`  
**parallel:** `false`

### Цель

Полный README с инструкциями и финальная проверка всего проекта.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `package.json`, `next.config.js`, `.env.example`, `apps-script/*`, `src/*`

### Текущее состояние

README нет.

### Действия

1. `README.md`:
   - Настройка Google Таблицы (листы, поля, типы данных, «версия кеша»).
   - Написание и развёртывание GAS (веб-апп, доступ, URL).
   - Настройка Next.js, зависимости, переменные окружения (без секретов).
   - Локальный запуск и отладка.
   - Сборка и публикация на GitHub Pages.
   - Подключение как VK Mini App (URL, параметры).
   - Эксплуатация: обновление расписания, «версия кеша», администрирование.
2. Финальная интеграция: проверить связку API ↔ UI ↔ кэш ↔ идентификация.
3. Запустить все проверки и зафиксировать результат.

### Разрешённые файлы

- Создать: `README.md`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`.

### Критерии готовности

- [ ] README покрывает все разделы из плана.
- [ ] Все проверки зелёные.
- [ ] Нет секретов в репозитории.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-09 — Тулбар главного экрана и типографика

**План:** `PLAN-20260901-02`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `нет`  
**Выполнять после:** `нет`  
**parallel:** `false`

### Цель

На главном экране — закреплённый полупрозрачный тулбар (liquid glass) с надписью «КАФ» по центру большим шрифтом и галочкой «только сегодня» (кнопки «Войти» нет); увеличены шрифты для читаемости.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`
- `.agents/tasks.md`
- `.agents/changelog.md`
- `src/components/ScheduleScreen.tsx`
- `src/styles/globals.css`

### Текущее состояние

`ScheduleScreen` рендерит `AppShell title="КАФ'26"` + `kaf-toolbar` (не закреплён, без надписи «КАФ»). Шрифты мелкие. В тулбаре есть кнопка «Войти» (по решению `PLAN-20260901-02` её убрать).

### Действия

1. В `ScheduleScreen.tsx` заменить `AppShell title="КАФ'26"` на закреплённый тулбар:
   - Надпись «КАФ» по центру, большим шрифтом.
   - Строка с «Только сегодня» (слева). Кнопки «Войти» **нет** (авторизация теперь внутри экранов вопроса/отзыва — TASK-14).
   - Тулбар `position: sticky; top: 0`, полупрозрачный с `backdrop-filter: blur` (liquid glass).
2. В `globals.css` добавить стили тулбара (`.kaf-toolbar`, `.kaf-toolbar-title`, `.kaf-toolbar-row` и т.п.).
3. Увеличить базовые шрифты главного экрана: карточки (`.kaf-card-title`, `.kaf-card-subtitle`, `.kaf-card-meta`), переключатель (`.kaf-toggle`), кнопки (`.kaf-btn`, `.kaf-link`).

### Разрешённые файлы

- Изменить: `src/components/ScheduleScreen.tsx`, `src/styles/globals.css`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `.github/workflows/*`.

### Критерии готовности

- [ ] Тулбар закреплён вверху, полупрозрачный с размытием.
- [ ] «КАФ» по центру и большим шрифтом.
- [ ] «Только сегодня» в тулбаре; кнопки «Войти» нет.
- [ ] Шрифты главного экрана увеличены и читаемы.
- [ ] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-10 — Отдельная колонка аватарки карточки расписания

**План:** `PLAN-20260901-02`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-09`  
**Выполнять после:** `TASK-20260901-09`  
**parallel:** `true`

### Цель

Аватарка карточки расписания берётся из отдельной колонки `card_avatar_url`, а не из `avatar_url` (который предназначен для страницы площадки).

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `src/types/index.ts`
- `apps-script/Code.gs`
- `src/components/PlatformCard.tsx`
- `README.md`, `apps-script/README.md`

### Текущее состояние

`PlatformCard` использует `platform.avatar_url`. В типе `Platform` и в GAS `readPlatforms_` нет поля `card_avatar_url`.

### Действия

1. `src/types/index.ts` — добавить `card_avatar_url?: string` в `Platform`.
2. `apps-script/Code.gs` — в `readPlatforms_` читать `card_avatar_url` (аналогично `avatar_url`).
3. `src/components/PlatformCard.tsx` — использовать `platform.card_avatar_url` вместо `platform.avatar_url`.
4. `README.md`, `apps-script/README.md` — задокументировать колонку `card_avatar_url` (лист «площадки»).

### Разрешённые файлы

- Изменить: `src/types/index.ts`, `apps-script/Code.gs`, `src/components/PlatformCard.tsx`, `README.md`, `apps-script/README.md`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] `Platform` имеет `card_avatar_url`.
- [ ] GAS возвращает `card_avatar_url`.
- [ ] `PlatformCard` использует `card_avatar_url` (placeholder при отсутствии).
- [ ] Документация обновлена.
- [ ] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-11 — Экран площадки: аватарка у имени докладчика + описание в рамке

**План:** `PLAN-20260901-02`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-09`  
**Выполнять после:** `TASK-20260901-09`  
**parallel:** `false`

### Цель

На странице площадки аватарка (`avatar_url`) отображается рядом с именем докладчика (`speaker`), а не с названием площадки; описание выделено в белую рамку со скруглениями.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `src/components/PlatformDetail.tsx`
- `src/styles/globals.css`

### Текущее состояние

`PlatformDetail` показывает аватарку рядом с `platform.name` в `kaf-detail-head`; `<Markdown>` рендерится без обёртки `kaf-glass`.

### Действия

1. В `PlatformDetail.tsx`:
   - Убрать аватарку из шапки площадки (`kaf-detail-head`), оставить название.
   - В блок докладчика (`kaf-detail-speaker`) добавить аватарку (`platform.avatar_url`) рядом с `speaker`/`speaker_title`.
2. Обернуть `<Markdown content={platform.description} />` в блок `kaf-glass` (как `kaf-detail-meta`, `kaf-detail-speaker`).
3. В `globals.css` добавить/обновить стили блока докладчика с аватаркой (`.kaf-detail-speaker` с flex-раскладкой) и рамки описания.

### Разрешённые файлы

- Изменить: `src/components/PlatformDetail.tsx`, `src/styles/globals.css`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Аватарка рядом с именем докладчика (использует `avatar_url`).
- [ ] Описание в белой рамке со скруглениями (`kaf-glass`).
- [ ] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-12 — Экран отзыва: центрирование и размер звёзд

**План:** `PLAN-20260901-02`  
**Статус:** `completed`  
**Приоритет:** `medium`  
**Зависит от:** `TASK-20260901-11`  
**Выполнять после:** `TASK-20260901-11`  
**parallel:** `false`

### Цель

На экране отзыва поля «Имя», «Отзыв» и звёзды центрированы; звёзды увеличены по размеру.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `src/components/ReviewForm.tsx`
- `src/styles/globals.css`

### Текущее состояние

`ReviewForm` — форма с левым выравниванием, звёзды 28px.

### Действия

1. В `ReviewForm.tsx` — добавить класс/обёртку для центрирования полей «Имя», «Отзыв» и звёзд.
2. В `globals.css`:
   - Центрировать поля формы отзыва (`.kaf-field` с центрированием).
   - Увеличить размер звёзд (`.kaf-star` font-size до ~40px).

### Разрешённые файлы

- Изменить: `src/components/ReviewForm.tsx`, `src/styles/globals.css`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] «Имя», «Отзыв» и звёзды центрированы.
- [ ] Звёзды увеличены по размеру.
- [ ] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-13 — Исправление CORS на отправке вопроса/отзыва

**План:** `PLAN-20260901-02`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `нет`  
**Выполнять после:** `нет`  
**parallel:** `true`

### Цель

Устранить CORS-ошибку при POST (отправка вопроса/отзыва) — запрос должен быть «простым» (без preflight).

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `src/lib/api.ts`

### Текущее состояние

`post()` в `api.ts` отправляет `Content-Type: application/json` → GAS не обрабатывает OPTIONS preflight → CORS-ошибка (`No 'Access-Control-Allow-Origin' header`).

### Действия

1. В `api.ts` `post()` изменить заголовок `Content-Type` с `application/json` на `text/plain`.
2. Убедиться, что тело остаётся JSON-строкой (GAS `doPost` парсит `e.postData.contents` как JSON — работает с `text/plain`).
3. Проверить, что GET-запросы не затронуты.

### Разрешённые файлы

- Изменить: `src/lib/api.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `apps-script/Code.gs`, `next.config.js`.

### Критерии готовности

- [ ] POST отправляется с `Content-Type: text/plain`.
- [ ] GAS-код не изменён (парсинг JSON в `doPost` сохранён).
- [ ] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-14 — Переработка авторизации

**План:** `PLAN-20260901-02`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-12`  
**Выполнять после:** `TASK-20260901-12`  
**parallel:** `false`

### Цель

Убрать кнопку «Войти» из тулбара; страница авторизации появляется только при открытии «задать вопрос»/«оставить отзыв»; имя подтягивается после авторизации и подставляется в форму.

### Контекст для чтения

- `AGENTS.md`
- `.agents/plan.md`, `.agents/tasks.md`, `.agents/changelog.md`
- `src/lib/identity.ts`, `src/lib/useCurrentUser.ts`
- `src/components/AuthScreen.tsx`, `AskScreen.tsx`, `ReviewScreen.tsx`, `QuestionForm.tsx`, `ReviewForm.tsx`, `AppRouter.tsx`, `ScheduleScreen.tsx`

### Текущее состояние

`AuthScreen` — отдельный маршрут `#auth`, получает только id, имя не сохраняет. Формы не проверяют авторизацию, имя пустое. В тулбаре есть кнопка «Войти».

### Действия

1. `identity.ts`:
   - Добавить тип `UserProfile = { id: string; name: string; source: 'vk' | 'fallback' }`.
   - `getVkUserProfile()` — из `VKWebAppGetUserInfo` (id + `first_name`/`last_name`).
   - `getStoredProfile()` / `setStoredProfile()` — хранить объект в `kaf.user` (обратная совместимость: если строка — считать fallback-id без имени).
   - `resolveUserProfile()` — VK-профиль или сохранённый/fallback.
   - `isAuthenticated(profile)` — есть ли имя.
2. `AuthScreen.tsx` — превратить в auth-gate: принимает `onAuthed(profile)`, при успехе сохраняет профиль и вызывает `onAuthed`.
3. `AskScreen.tsx`, `ReviewScreen.tsx` — обернуть форму в auth-gate; при отсутствии профиля с именем показывать экран авторизации; после авторизации передать имя в форму.
4. `QuestionForm.tsx`, `ReviewForm.tsx` — добавить `initialName` для предзаполнения.
5. `ScheduleScreen.tsx` — убрать кнопку «Войти» из тулбара (обновление TASK-09).
6. `AppRouter.tsx` — убрать маршрут `#auth` (авторизация теперь внутри Ask/Review).

### Разрешённые файлы

- Изменить: `src/lib/identity.ts`, `src/components/AuthScreen.tsx`, `AskScreen.tsx`, `ReviewScreen.tsx`, `QuestionForm.tsx`, `ReviewForm.tsx`, `ScheduleScreen.tsx`, `AppRouter.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `apps-script/Code.gs`.

### Критерии готовности

- [ ] Кнопка «Войти» убрана из тулбара.
- [ ] При открытии Ask/Review без авторизации показывается экран авторизации.
- [ ] После авторизации имя подтягивается и подставляется в форму.
- [ ] Маршрут `#auth` убран из роутера.
- [ ] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## История

Пока нет завершённых задач.
