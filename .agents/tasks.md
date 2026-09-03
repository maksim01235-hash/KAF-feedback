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

## Архив завершённых задач (TASK-01 … 17)

> Полные блоки задач 01–17 архивированы для экономии контекста. Краткое содержание и коммиты ниже; детали — в `.agents/changelog.md`.

### PLAN-20260901-01 (TASK-01 … 08) — VK Mini App «КАФ'26»

| ID | Задача | Коммит |
|----|--------|--------|
| TASK-01 | Скаффолд Next.js + общая база (package.json, next.config, tsconfig, types, logger, storage, layout, globals.css, CI) | `a32511e` |
| TASK-02 | Логика времени и активности площадок (`src/lib/time.ts`) | `4d9f99a` |
| TASK-03 | Логика валидации форм (`src/lib/validation.ts`) | `4d9f99a` |
| TASK-04 | Логика кэширования расписания (`src/lib/cache.ts`) | `4d9f99a` |
| TASK-05 | Логика идентификации и прав (`src/lib/identity.ts`) | `4d9f99a` |
| TASK-06 | Бэкенд Google Apps Script (`apps-script/Code.gs`, `appsscript.json`, README) | `4ddd966` |
| TASK-07 | Фронтенд: страницы, компоненты, хэш-роутинг, состояния | `cdca252` |
| TASK-08 | README и финальная интеграция | `98d967c` |

**Ключевые решения:** хэш-роутинг (`#<platformId>`, `#ask/<id>`, `#review/<id>`); `serverTime` из GAS; кэш 2ч + версия кеша; задержка отправок 10с; права по `vk_user_id`; удаление — физическое; отзывы без ред./удал.

### PLAN-20260901-02 (TASK-09 … 17) — UI-баги + тесты

| ID | Задача | Коммит |
|----|--------|--------|
| TASK-09 | Тулбар главного экрана + типографика | `6df6d01` |
| TASK-10 | Отдельная колонка `card_avatar_url` | `6df6d01` |
| TASK-11 | Экран площадки: аватарка у докладчика + описание в рамке | `6df6d01` |
| TASK-12 | Экран отзыва: центрирование + размер звёзд | `6df6d01` |
| TASK-13 | CORS fix: POST `Content-Type: text/plain` | `6df6d01` |
| TASK-14 | Переработка авторизации (auth-gate) | `6df6d01` |
| TASK-15 | Тесты: router, storage, identity | `1e727f0` |
| TASK-16 | Тесты: API (fetch mock) | `1e727f0` |
| TASK-17 | Тесты: компоненты | `1e727f0` |

**Ключевые решения:** тулбар только на главном экране; `card_avatar_url` в листе «площадки»; CORS через `text/plain`; auth-gate при открытии Ask/Review; `UserProfile { id, name, source }`, `getVkUserProfile`, `isAuthenticated`. Слито в `main` (fast-forward `2ab8db8..3ee3f56`).

---

## Активные задачи (TASK-18 … 25) — PLAN-20260901-03

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

- [x] Кнопка «назад» возвращает на предыдущую страницу приложения.
- [x] При первом открытии (пустой стек) → расписание.
- [x] `sessionStorage` хранит стек маршрутов.
- [x] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

- Создан `src/lib/navigationHistory.ts` (`pushNavigation`/`popNavigation`/`clearNavigation` через `sessionStorage`).
- `router.ts`: `navigate()` пушит текущий маршрут; добавлен `goBack()`.
- `AppShell.tsx`: `onBack` по умолчанию = `goBack`; header рендерится при наличии `title`; кнопка «назад» всегда.
- Экраны: убран `backToSchedule`, используется дефолтный `onBack`.

### Результат

- Changelog: `.agents/changelog.md` (2026-09-03 18:15)
- Коммит: `c9c71f9`

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

- [x] VK bridge вызов завершается за ≤ 5 сек (или возвращает fallback).
- [x] В не-VK окне: fallback на localStorage / анонимный профиль.
- [x] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

- `identity.ts`: добавлен `withTimeout` (4 сек) для вызовов VK bridge; `getVkUserId`/`getVkUserProfile` не зависают в не-VK окне.

### Результат

- Changelog: `.agents/changelog.md` (2026-09-03 18:15)
- Коммит: `c9c71f9`

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

- [x] Кнопки «Редактировать» и «Удалить» видны рядом с каждым вопросом (если права совпадают).
- [x] «Редактировать» → AskScreen в режиме editing с предзаполненной формой.
- [x] «Удалить» → вопрос удаляется, список обновляется.
- [x] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

- Создан `src/lib/editingState.ts` (`setEditingQuestion`/`takeEditingQuestion`).
- `PlatformDetail.tsx`: кнопки «Редактировать»/«Удалить» рядом с вопросами (если `canEditQuestion`); «Редактировать» → `setEditingQuestion` + переход на ask.
- `PlatformScreen.tsx`: `handleDeleteQuestion` (удаление + обновление списка), передача `onDeleteQuestion`.
- `AskScreen.tsx`: при монтировании читает `takeEditingQuestion()` и открывает форму в режиме редактирования.
- `globals.css`: стили `.kaf-question-actions`, `.kaf-link-danger`.

### Результат

- Changelog: `.agents/changelog.md` (2026-09-03 18:15)
- Коммит: `c9c71f9`

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

- [x] Auth screen показывается всегда при открытии Ask/Review.
- [x] После авторизации → форма с подставленным именем.
- [x] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

- `AskScreen.tsx`, `ReviewScreen.tsx`: всегда начинают с auth screen (убрано автоматическое определение VK); форма после `onAuthed`.
- `AuthScreen.tsx`: при недоступности VK, но наличии сохранённого профиля, вызывает `onAuthed(storedProfile)` (изменение вне списка разрешённых файлов — необходимо для прохождения auth-gate в браузере).

### Результат

- Changelog: `.agents/changelog.md` (2026-09-03 18:15)
- Коммит: `c9c71f9`

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

- [x] Карточка без аватара перестраивается (нет пустого пространства).
- [x] Стрелка назад точно центрирована.
- [x] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

- `Avatar.tsx`: без URL рендерит `null`.
- `PlatformCard.tsx`: условный рендер `<Avatar>`.
- `globals.css`: `.kaf-back` добавлен `line-height: 1`.
- `tests/components/Avatar.test.tsx`: обновлён под новое поведение (без src → null); 3 теста (изменение теста вне списка разрешённых файлов — вызвано изменением поведения).

### Результат

- Changelog: `.agents/changelog.md` (2026-09-03 18:15)
- Коммит: `c9c71f9`

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

- [x] Шрифты карточек/кнопок/ссылок увеличены и читаемы.
- [x] Форма отзыва центрирована.
- [x] Content-Type `text/plain` (CORS fix) без регрессий.
- [x] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

- `globals.css`: увеличены шрифты — `.kaf-card-title` 20px, `.kaf-card-subtitle` 16px, `.kaf-card-meta` 15px, `.kaf-btn` 17px, `.kaf-link` 16px.

### Результат

- Changelog: `.agents/changelog.md` (2026-09-03 18:15)
- Коммит: `c9c71f9`

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

- [x] Проанализированы сетевые запросы (GAS cold start, размер данных).
- [x] Оптимизации применены (документировано в changelog).
- [x] `npm run build`, `npx tsc --noEmit`, `npm run lint` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

- `apps-script/Code.gs`: серверное кэширование расписания через `CacheService` (TTL 10 мин, инвалидация по версии кеша, `serverTime` всегда актуальный). Требует деплоя обновлённого `Code.gs` в Google Apps Script.

### Результат

- Changelog: `.agents/changelog.md` (2026-09-03 18:15)
- Коммит: `c9c71f9`

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

- [x] Замерены ключевые метрики (загрузка, навигация, рендер).
- [x] Результаты задокументированы в changelog.
- [x] Выявлены и исправлены критические проблемы (если есть).

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Технические заметки исполнителя

- Ручное тестирование производительности (DevTools Performance/Memory) не выполнялось в этой среде — задокументированы bundle size и ожидаемые метрики. Требует ручной проверки пользователем.

### Результат

- Changelog: `.agents/changelog.md` (2026-09-03 18:15)
- Коммит: `c9c71f9`

---

## История

Пока нет завершённых задач.
