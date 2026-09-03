# Задачи для агента-исполнителя

> Этот файл ведёт агент-планировщик.
> Исполнитель меняет только статусы задач, добавляет технические уточнения и ссылки на commit/changelog.
> Задачи выполняются только при наличии активного утверждённого плана в `.agents/plan.md`.

## Очередь

- [x] `TASK-20260901-01` — Скаффолд Next.js-проекта и общая база (`completed`)
- [x] `TASK-20260901-02` — Логика времени и активности площадок (`completed`, parallel после 01)
- [x] `TASK-20260901-03` — Логика валидации форм (`completed`, parallel после 01)
- [x] `TASK-20260901-04` — Логика кэширования расписания (`completed`, parallel после 01)
- [x] `TASK-20260901-05` — Логика идентификации и прав (`completed`, parallel после 01)
- [x] `TASK-20260901-06` — Бэкенд Google Apps Script (`completed`, parallel после 01)
- [x] `TASK-20260901-07` — Фронтенд: страницы, компоненты, хэш-роутинг, состояния (`completed`, после 02–05)
- [x] `TASK-20260901-08` — README и финальная интеграция (`completed`, после 06–07)

> **План `PLAN-20260901-02` (UI-баги):**
- [x] `TASK-20260901-09` — Тулбар главного экрана и типографика (`completed`, без «Войти»)
- [x] `TASK-20260901-10` — Отдельная колонка аватарки карточки (`completed`, parallel после 09)
- [x] `TASK-20260901-11` — Экран площадки: аватарка у докладчика + описание в рамке (`completed`, после 09)
- [x] `TASK-20260901-12` — Экран отзыва: центрирование и размер звёзд (`completed`, после 11)
- [x] `TASK-20260901-13` — Исправление CORS на отправке вопроса/отзыва (`completed`, parallel)
- [x] `TASK-20260901-14` — Переработка авторизации (`completed`, после 12)

> **Тесты (`PLAN-20260901-02`):**
- [x] `TASK-20260901-15` — Тесты: router, storage, identity (чистые функции + jsdom) (`completed`)
- [x] `TASK-20260901-16` — Тесты: API (с fetch mock) (`completed`, parallel)
- [x] `TASK-20260901-17` — Тесты: компоненты (StatusView, StarRating, Avatar, QuestionForm, ReviewForm) (`completed`, после 15)

> **План `PLAN-20260901-03` (исправления после тестирования):**
- [x] `TASK-20260901-18` — История навигации + кнопка «назад» (`completed`)
- [x] `TASK-20260901-19` — Таймаут VK bridge (`completed`, parallel)
- [x] `TASK-20260901-20` — Кнопки ред./удал. на странице площадки + унифицированная страница редактирования (`completed`, после 18)
- [x] `TASK-20260901-21` — Авторизация: всегда показывать auth screen (`completed`, после 19)
- [x] `TASK-20260901-22` — Карточка без аватара + стрелка назад (центрирование) (`completed`, parallel)
- [x] `TASK-20260901-23` — Шрифты, центрирование, проверка Content-Type (`completed`, parallel)
- [x] `TASK-20260901-24` — Анализ и оптимизация скорости (`completed`, после 18–23)
- [x] `TASK-20260901-25` — Тестирование производительности (`completed`, после 24)

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

## TASK-20260901-15 — Тесты: router, storage, identity (чистые функции + jsdom)

**План:** `PLAN-20260901-02`  
**Статус:** `completed`
**Приоритет:** `medium`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `true`

### Цель

Написать тесты для `lib/router.ts` (`parseHash`), `lib/storage.ts` (все функции), `lib/identity.ts` (`getStoredProfile`, `setStoredProfile`, `isAuthenticated`).

### Контекст для чтения

- `src/lib/router.ts`, `src/lib/storage.ts`, `src/lib/identity.ts`
- `vitest.config.ts`, `tests/time.test.ts` (формат)

### Текущее состояние

Тесты есть только для `time`, `cache`, `permissions` (canEdit/canDelete), `validation`. Модули `router`, `storage`, `identity` (profile/auth) не покрыты.

### Действия

1. В `vitest.config.ts` добавить `environmentMatchGlobs`: `tests/browser/**` → `jsdom`, остальные → `node`.
2. Создать `tests/browser/router.test.ts`:
   - `parseHash('')` → `{ name: 'schedule' }`
   - `parseHash('#abc')` → `{ name: 'platform', platformId: 'abc' }`
   - `parseHash('#ask/abc')` → `{ name: 'ask', platformId: 'abc' }`
   - `parseHash('#review/abc')` → `{ name: 'review', platformId: 'abc' }`
   - `parseHash('#unknown')` → `{ name: 'platform', platformId: 'unknown' }`
   - Edge cases: `parseHash('  #abc  ')`, `parseHash('ask/')` (без id).
3. Создать `tests/browser/storage.test.ts`:
   - `readStorage`/`writeStorage`/`removeStorage` в jsdom.
   - `readJSON`/`writeJSON` с валидным и невалидным JSON.
   - Ошибки localStorage (mock `getItem` to throw).
4. Создать `tests/browser/identity.test.ts`:
   - `getStoredProfile`: пусто, строка (старый формат), объект (новый формат).
   - `setStoredProfile`: запись объекта.
   - `isAuthenticated`: с именем, без имени, null, undefined.
   - Обратная совместимость: строка → `{ id, name: '', source: 'fallback' }`.

### Разрешённые файлы

- Создать: `tests/browser/router.test.ts`, `tests/browser/storage.test.ts`, `tests/browser/identity.test.ts`.
- Изменить: `vitest.config.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `.github/workflows/*`.

### Критерии готовности

- [ ] Все тесты проходят: `npm test`.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build` без ошибок.

### Проверки

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-16 — Тесты: API (с fetch mock)

**План:** `PLAN-20260901-02`  
**Статус:** `completed`
**Приоритет:** `medium`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `true`

### Цель

Написать тесты для `lib/api.ts` с моком `fetch`.

### Контекст для чтения

- `src/lib/api.ts`, `vitest.config.ts`, `tests/time.test.ts` (формат)

### Текущее состояние

Модуль `api.ts` не покрыт тестами. Содержит GET/POST обёртки, публичные функции `fetchSchedule`, `fetchPlatform`, `addQuestion`, `editQuestion`, `deleteQuestion`, `addReview`, `isApiConfigured`.

### Действия

1. Создать `tests/api.test.ts` (node env).
2. Мокнуть `global.fetch` через `vi.fn()`.
3. Тесты:
   - `fetchSchedule`: успешный ответ, ошибка HTTP, ошибка сети, `ok: false`.
   - `fetchPlatform`: параметры в URL.
   - `addQuestion`/`editQuestion`/`deleteQuestion`/`addReview`: проверить `method: 'POST'`, headers `Content-Type: text/plain`, body JSON.
   - `isApiConfigured`: true/false в зависимости от env.
   - Ошибка `BASE_URL` не задан → `{ ok: false, error: 'Сервер не настроен' }`.

### Разрешённые файлы

- Создать: `tests/api.test.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Все тесты проходят: `npm test`.
- [ ] Проверен Content-Type `text/plain` (CORS fix).
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build` без ошибок.

### Проверки

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-17 — Тесты: компоненты (StatusView, StarRating, Avatar, QuestionForm, ReviewForm)

**План:** `PLAN-20260901-02`  
**Статус:** `completed`
**Приоритет:** `medium`  
**Зависит от:** `TASK-20260901-15`  
**Выполнять после:** `TASK-20260901-15`  
**parallel:** `false`

### Цель

Написать тесты рендера для ключевых компонентов с `@testing-library/react` + jsdom.

### Контекст для чтения

- `src/components/StatusView.tsx`, `StarRating.tsx`, `Avatar.tsx`, `QuestionForm.tsx`, `ReviewForm.tsx`
- `vitest.config.ts`, `tests/time.test.ts` (формат)

### Текущее состояние

`@testing-library/react` и `@testing-library/jest-dom` установлены, но не используются. Ни один компонент не протестирован.

### Действия

1. Создать `tests/components/StatusView.test.tsx`:
   - Рендер по `status`/`kind`: loading, error, success.
   - Проверить текст кнопки.
2. Создать `tests/components/StarRating.test.tsx`:
   - Рендер 5 звёзд.
   - Клик по звезде вызывает `onChange`.
   - `disabled` — клик не работает.
3. Создать `tests/components/Avatar.test.tsx`:
   - Без src → placeholder.
   - С src → img.
   - Ошибка загрузки → fallback (емодзи).
4. Создать `tests/components/QuestionForm.test.tsx`:
   - Валидная форма → кнопка активна.
   - Пустая → disabled + подсказки.
   - `initialName` предзаполнен.
5. Создать `tests/components/ReviewForm.test.tsx`:
   - Валидная форма → кнопка активна.
   - Без rating → disabled.
   - `initialName` предзаполнен.
6. Мокнуть `@/lib/api` (vi.mock) для QuestionForm/ReviewForm.

### Разрешённые файлы

- Создать: `tests/components/*.test.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Все тесты проходят: `npm test`.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build` без ошибок.

### Проверки

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-18 — История навигации + кнопка «назад»

**План:** `PLAN-20260901-03`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Реализовать историю навигации приложения (стек в `sessionStorage`) и кнопку «назад», которая возвращает на предыдущую страницу внутри приложения.

### Контекст для чтения

- `src/lib/router.ts`, `src/components/AppShell.tsx`
- `src/components/AskScreen.tsx`, `ReviewScreen.tsx`, `PlatformScreen.tsx`
- `src/styles/globals.css`

### Текущее состояние

`navigate()` просто ставит `window.location.hash`. Кнопка «назад» = `backToSchedule()` = `navigate('')` (всегда на расписание).

### Действия

1. Создать `src/lib/navigationHistory.ts`:
   - `pushNavigation(route: string)` — добавляет маршрут в стек `sessionStorage`.
   - `goBack()` — извлекает последний маршрут из стека; если пусто → `navigate('')`.
   - Ключ: `kaf.navHistory`.
2. `router.ts`: `navigate()` вызывает `pushNavigation()` перед установкой хэша.
3. `AppShell.tsx`: `onBack` по умолчанию = `goBack()`. Убрать `backToSchedule()`.
4. Все экраны: убрать `backToSchedule`, использовать дефолтный `onBack`.

### Разрешённые файлы

- Создать: `src/lib/navigationHistory.ts`.
- Изменить: `src/lib/router.ts`, `src/components/AppShell.tsx`, `AskScreen.tsx`, `ReviewScreen.tsx`, `PlatformScreen.tsx`, `AuthScreen.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `.github/workflows/*`.

### Критерии готовности

- [ ] Кнопка «назад» возвращает на предыдущую страницу приложения.
- [ ] При первом открытии (пустой стек) → расписание.
- [ ] `sessionStorage` хранит стек маршрутов.
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

## TASK-20260901-19 — Таймаут VK bridge

**План:** `PLAN-20260901-03`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `true`

### Цель

Добавить таймаут 3–5 сек на вызовы VK bridge (`VKWebAppGetUserInfo`), чтобы приложение не зависало в не-VK окне.

### Контекст для чтения

- `src/lib/identity.ts`

### Текущее состояние

`getVkUserId()` и `getVkUserProfile()` используют `bridge.default.send('VKWebAppGetUserInfo')` без таймаута. В не-VK окне bridge может "висеть" бесконечно.

### Действия

1. В `identity.ts` обернуть `bridge.default.send('VKWebAppGetUserInfo')` в `Promise.race` с таймаутом 3–5 сек.
2. При таймауте → fallback на localStorage / анонимный профиль.
3. Добавить helper `withTimeout<T>(promise, ms, fallback)` для переиспользования.

### Разрешённые файлы

- Изменить: `src/lib/identity.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] VK bridge вызов завершается за ≤ 5 сек (или возвращает fallback).
- [ ] В не-VK окне: fallback на localStorage / анонимный профиль.
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

## TASK-20260901-20 — Кнопки ред./удал. на странице площадки + унифицированная страница редактирования

**План:** `PLAN-20260901-03`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-18`  
**Выполнять после:** `TASK-20260901-18`  
**parallel:** `false`

### Цель

На странице площадки рядом с каждым вопросом — кнопки «Редактировать» и «Удалить». Кнопка «Редактировать» открывает AskScreen в режиме editing (унифицированная страница редактирования).

### Контекст для чтения

- `src/components/PlatformDetail.tsx`, `PlatformScreen.tsx`, `AskScreen.tsx`
- `src/lib/router.ts`, `src/lib/identity.ts`
- `src/types/index.ts`

### Текущее состояние

`PlatformDetail` показывает вопросы без кнопок. AskScreen поддерживает editing через проп `editing` (вопрос + кнопки «Сохранить»/«Удалить»).

### Действия

1. `PlatformDetail.tsx`: рядом с каждым вопросом — кнопки «Редактировать» и «Удалить» (если `canEditQuestion(q, currentUserId)`).
2. «Редактировать» → передать editing-вопрос в AskScreen. Вариант: через `editingQuestion` state в `PlatformScreen`, который передаётся в `AskScreen` через роутер (state) или через модульную переменную.
3. «Удалить» → вызов `deleteQuestion()` + обновление списка в `PlatformDetail`.
4. `AskScreen.tsx`: принять `editing` проп (или через модульную переменную). В режиме editing: предзаполнить форму, кнопка «Сохранить» + «Удалить».
5. `globals.css`: стили для кнопок внутри `.kaf-question`.

### Разрешённые файлы

- Изменить: `src/components/PlatformDetail.tsx`, `PlatformScreen.tsx`, `AskScreen.tsx`, `src/styles/globals.css`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Кнопки «Редактировать» и «Удалить» видны рядом с каждым вопросом (если права совпадают).
- [ ] «Редактировать» → AskScreen в режиме editing с предзаполненной формой.
- [ ] «Удалить» → вопрос удаляется, список обновляется.
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

## TASK-20260901-21 — Авторизация: всегда показывать auth screen

**План:** `PLAN-20260901-03`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-19`  
**Выполнять после:** `TASK-20260901-19`  
**parallel:** `false`

### Цель

Auth-gate в AskScreen и ReviewScreen **всегда** показывает экран авторизации перед отправкой вопроса/отзыва (явное согласие), даже если профиль сохранён в localStorage.

### Контекст для чтения

- `src/components/AskScreen.tsx`, `ReviewScreen.tsx`, `AuthScreen.tsx`
- `src/lib/identity.ts`

### Текущее состояние

`resolveUserProfile()` автоматически через VK bridge → если bridge доступен → профиль с именем → `isAuthenticated()` = `true` → auth-gate пропущен.

### Действия

1. `AskScreen.tsx`, `ReviewScreen.tsx`: **всегда** начинать с auth screen (убрать автоматическое определение VK).
2. Auth screen показывается всегда (даже если профиль сохранён).
3. После нажатия «Авторизоваться через VK ID» → VK bridge → сохранение → форма.
4. Если имя уже было сохранено ранее → подставить в форму через `initialName`.

### Разрешённые файлы

- Изменить: `src/components/AskScreen.tsx`, `ReviewScreen.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Auth screen показывается всегда при открытии Ask/Review.
- [ ] После авторизации → форма с подставленным именем.
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

## TASK-20260901-22 — Карточка без аватара + стрелка назад (центрирование)

**План:** `PLAN-20260901-03`  
**Статус:** `completed`  
**Приоритет:** `medium`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `true`

### Цель

Если нет ни одного аватара — карточка перестраивается без изображения. Стрелка назад точно центрирована.

### Контекст для чтения

- `src/components/Avatar.tsx`, `PlatformCard.tsx`
- `src/styles/globals.css`

### Текущее состояние

`Avatar` рендерит placeholder (инициал) без URL. `.kaf-back` имеет `align-items: center; justify-content: center`, но `←` может требовать `line-height: 1`.

### Действия

1. `Avatar.tsx`: если нет URL — рендерить `null` (ничего).
2. `PlatformCard.tsx`: условный рендер `<Avatar>`.
3. `globals.css`: `.kaf-back` — добавить `line-height: 1`.

### Разрешённые файлы

- Изменить: `src/components/Avatar.tsx`, `PlatformCard.tsx`, `src/styles/globals.css`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Карточка без аватара перестраивается (нет пустого пространства).
- [ ] Стрелка назад точно центрирована.
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

## TASK-20260901-23 — Шрифты, центрирование, проверка Content-Type

**План:** `PLAN-20260901-03`  
**Статус:** `completed`  
**Приоритет:** `medium`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `true`

### Цель

Увеличить шрифты карточек/кнопок/ссылок. Проверить центрирование формы отзыва. Проверить Content-Type `text/plain` (CORS fix).

### Контекст для чтения

- `src/styles/globals.css`, `src/lib/api.ts`

### Текущее состояние

Шрифты мелкие (14–16px). `.kaf-center` стилизует форму отзыва. `api.ts` отправляет `Content-Type: text/plain`.

### Действия

1. `globals.css`: увеличить `.kaf-card-title` (→ 18–20px), `.kaf-card-subtitle` (→ 15–16px), `.kaf-card-meta` (→ 14–15px), `.kaf-btn` (→ 16–18px), `.kaf-link` (→ 15–16px).
2. `globals.css`: проверить `.kaf-center` (стиль для центрирования формы отзыва).
3. `api.ts`: проверить, что Content-Type `text/plain` (CORS fix) — без регрессий.

### Разрешённые файлы

- Изменить: `src/styles/globals.css`.
- Не изменять: `src/lib/api.ts` (проверка, не изменение), `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Шрифты карточек/кнопок/ссылок увеличены и читаемы.
- [ ] Форма отзыва центрирована.
- [ ] Content-Type `text/plain` (CORS fix) без регрессий.
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

## TASK-20260901-24 — Анализ и оптимизация скорости

**План:** `PLAN-20260901-03`  
**Статус:** `completed`  
**Приоритет:** `medium`  
**Зависит от:** `TASK-20260901-18`  
**Выполнять после:** `TASK-20260901-18`  
**parallel:** `false`

### Цель

Проанализировать и оптимизировать скорость работы: сетевые запросы (GAS), внутренняя логика (кэширование, рендер), общая производительность.

### Контекст для чтения

- `src/lib/api.ts`, `src/lib/useSchedule.ts`, `src/lib/cache.ts`
- `apps-script/Code.gs`

### Текущее состояние

GAS cold start (первый запрос 5–15 сек). Кэш расписания 2ч. Каждый переход на страницу площадки → fetch. Каждый переход на Ask/Review → fetch.

### Действия

1. Проанализировать DevTools Network (или логи) для определения узких мест.
2. Оптимизация GAS: кэширование на стороне сервера, уменьшение объёма данных.
3. Оптимизация клиента: дебаунсинг, предзагрузка, оптимизация рендера.
4. Документировать результаты в changelog.

### Разрешённые файлы

- Изменить: `src/lib/api.ts`, `src/lib/useSchedule.ts`, `apps-script/Code.gs` (при необходимости).
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Проанализированы сетевые запросы (GAS cold start, размер данных).
- [ ] Оптимизации применены (документировано в changelog).
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

## TASK-20260901-25 — Тестирование производительности

**План:** `PLAN-20260901-03`  
**Статус:** `completed`  
**Приоритет:** `medium`  
**Зависит от:** `TASK-20260901-24`  
**Выполнять после:** `TASK-20260901-24`  
**parallel:** `false`

### Цель

Протестировать производительность приложения: скорость загрузки, время отклика, использование памяти.

### Контекст для чтения

- `src/lib/api.ts`, `src/lib/useSchedule.ts`, `src/lib/cache.ts`
- DevTools Performance/Memory

### Текущее состояние

Нет бенчмарков. Ожидаемое: GAS cold start 5–15 сек, кэш 2ч, fast client render.

### Действия

1. Запустить DevTools Performance (запись профиля) при навигации.
2. Замерить: время загрузки расписания, время перехода на страницу площадки, время открытия формы.
3. Проверить: memory leaks (многократная навигация), bundle size.
4. Документировать результаты в changelog.

### Разрешённые файлы

- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.
- Только анализ и документация.

### Критерии готовности

- [ ] Замерены ключевые метрики (загрузка, навигация, рендер).
- [ ] Результаты задокументированы в changelog.
- [ ] Выявлены и исправлены критические проблемы (если есть).

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
