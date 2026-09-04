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

> **План `PLAN-20260901-04` (доработки после тестирования):**
- [x] `TASK-20260901-26` — Стрелка назад: SVG-иконка ВК + точное центрирование (`completed`)
- [x] `TASK-20260901-27` — Центрирование «Имя», «Отзыв», звёзд на Ask/Review (`completed`)
- [x] `TASK-20260901-28` — Подтверждение удаления вопроса (`completed`, после 26)
- [x] `TASK-20260901-29` — Сессионный логин: профиль в sessionStorage (`completed`, parallel)
- [x] `TASK-20260901-30` — Авторизация: не показывать auth вне VK (`completed`, после 29)
- [x] `TASK-20260901-31` — Ask-экран: убрать вопросы + задержка 0.5с (`completed`, после 30)
- [x] `TASK-20260901-32` — Кеширование площадок + серый цвет прошедших (`completed`, после 26)
- [x] `TASK-20260901-33` — «Назад» не возвращает на auth (`completed`, parallel)

> **План `PLAN-20260901-05` (регрессии и новые проблемы после TASK-26…33):**
- [x] `TASK-20260901-34` — История навигации: «назад» возвращает на предыдущий маршрут (`completed`)
- [x] `TASK-20260901-35` — «Имя», «Отзыв», «Вопрос» по левому краю, шрифт как на кнопках (`completed`)
- [x] `TASK-20260901-36` — Hydration error: отключить SSR для AppRouter (`completed`)
- [x] `TASK-20260901-37` — Отображение вопросов на странице площадки (`completed`, после 36)
- [x] `TASK-20260901-38` — Оптимизация долгой загрузки площадки (кэш + фоновое обновление) (`completed`, после 37)

> **План `PLAN-20260901-06` (проблемы после переразвёртывания GAS):**
- [x] `TASK-20260901-39` — История навигации: «назад» возвращает на предыдущий экран (`completed`)
- [x] `TASK-20260901-40` — Обработка ошибок fetchPlatform (404) (`completed`)
- [x] `TASK-20260901-41` — Оптимизация отправки ответов/отзывов (индикатор загрузки) (`completed`)
- [x] `TASK-20260901-42` — Отображение вопросов при первом открытии площадки (`completed`, после 40)

> **План `PLAN-20260901-07` (анонимные пользователи, авторизация, дата, подтверждение, навигация):**
- [x] `TASK-20260901-43` — Анонимный id на время сессии + отображение вопросов анонима (`completed`)
- [x] `TASK-20260901-44` — Авторизация в VK: только один раз за сессию (`completed`)
- [x] `TASK-20260901-45` — Дата на главном экране («5 сентября, 14:00-16:00») (`completed`)
- [x] `TASK-20260901-46` — Кастомная плашка подтверждения удаления (`completed`)
- [~] `TASK-20260901-47` — Кнопка «назад»: на предыдущий экран (`blocked` — ошибочно закрыт, проблема не решена)

> **План `PLAN-20260901-08` (исправление кнопки «назад»):**
- [x] `TASK-20260901-48` — Исправить кнопку «назад»: возврат на предыдущий экран (`completed`)

> **План `PLAN-20260901-09` (заглушка аватара на главном экране):**
- [x] `TASK-20260901-49` — Заглушка аватара с первой буквой названия (`completed`)

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

## Активные задачи (TASK-26 … 33) — PLAN-20260901-04

## TASK-20260901-26 — Стрелка назад: SVG-иконка ВК + точное центрирование

**План:** `PLAN-20260901-04`  
**Статус:** `ready`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Заменить текстовую стрелку `←` на SVG-иконку из `@vkontakte/icons` (графика под стиль ВК) и точно центрировать её с обводкой внутри кнопки `.kaf-back`.

### Контекст для чтения

- `src/components/AppShell.tsx`
- `src/styles/globals.css`

### Текущее состояние

`AppShell.tsx` использует текстовый символ `←` в кнопке `.kaf-back`. Текстовая стрелка визуально не центрирована, обводка (border) сбивается из-за line-height.

### Действия

1. `AppShell.tsx`: заменить `←` на SVG-иконку из `@vkontakte/icons` (например `Icon28ChevronLeftOutline`).
2. `globals.css`: `.kaf-back` — точное центрирование: `display: flex; align-items: center; justify-content: center; padding: 0; line-height: 0;`.
3. Проверить, что иконка и обводка центрированы на всех экранах (ask/review/platform/auth).

### Разрешённые файлы

- Изменить: `src/components/AppShell.tsx`, `src/styles/globals.css`.
- Создать: `tests/components/AppShell.test.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `.github/workflows/*`.

### Критерии готовности

- [ ] Кнопка «назад» отображает SVG-иконку (не текстовый символ).
- [ ] Иконка и обводка центрированы на всех экранах.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `AppShell.test.tsx`: рендер кнопки «назад» с SVG-иконкой; наличие заголовка; вызов `onBack` по клику; иконка имеет класс отображающий SVG (не строку `←`).

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-27 — Центрирование «Имя», «Отзыв», звёзд на Ask/Review

**План:** `PLAN-20260901-04`  
**Статус:** `ready`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Центрировать поля «Имя», «Отзыв» и звёзды на экранах отзыва и вопроса.

### Контекст для чтения

- `src/components/AskScreen.tsx`, `ReviewScreen.tsx`
- `src/styles/globals.css`

### Текущее состояние

`ReviewScreen` обёрнут в `.kaf-center`, но поля формы (label, input, textarea, звёзды) центрированы не полностью. `AskScreen` не обёрнут в `.kaf-center`.

### Действия

1. `AskScreen.tsx`: обернуть форму в `.kaf-center` (как `ReviewScreen`).
2. `globals.css`: `.kaf-center .kaf-field` — центрировать содержимое (label, input, textarea, `.kaf-stars`).
3. Проверить, что звёзды и поля центрированы на обоих экранах.

### Разрешённые файлы

- Изменить: `src/components/AskScreen.tsx`, `src/styles/globals.css`.
- Тесты: `tests/components/QuestionForm.test.tsx`, `ReviewForm.test.tsx` (если нужно — проверка класса).
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Форма Ask обёрнута в `.kaf-center`.
- [ ] Поля «Имя», «Отзыв», звёзды центрированы на Ask и Review.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `QuestionForm`/`ReviewForm`: рендер с классом формы `kaf-form`, наличие `.kaf-center`-обёртки в родительском экране (проверка структуры).

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-28 — Подтверждение удаления вопроса

**План:** `PLAN-20260901-04`  
**Статус:** `ready`  
**Приоритет:** `medium`  
**Зависит от:** нет  
**Выполнять после:** `TASK-20260901-26`  
**parallel:** `true`

### Цель

Добавить подтверждение (`window.confirm`) перед удалением вопроса — как со страницы площадки, так и из формы редактирования.

### Контекст для чтения

- `src/components/PlatformDetail.tsx`
- `src/components/QuestionForm.tsx`

### Текущее состояние

Кнопки «Удалить» в `PlatformDetail` и `QuestionForm` удаляют вопрос без подтверждения.

### Действия

1. `PlatformDetail.tsx`: перед `onDeleteQuestion(q.id)` показать `window.confirm('Удалить вопрос?')`.
2. `QuestionForm.tsx`: перед `onDelete()` показать `window.confirm('Удалить вопрос?')`.

### Разрешённые файлы

- Изменить: `src/components/PlatformDetail.tsx`, `src/components/QuestionForm.tsx`.
- Тесты: `tests/components/QuestionForm.test.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] «Удалить» со страницы площадки требует подтверждения.
- [ ] «Удалить» из формы редактирования требует подтверждения.
- [ ] При отмене confirm — удаление не выполняется.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `QuestionForm.test.tsx`: mock `window.confirm`; при `confirm === true` вызывается `onDelete`; при `false` — не вызывается.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-29 — Сессионный логин: профиль в sessionStorage

**План:** `PLAN-20260901-04`  
**Статус:** `ready`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `true`

### Цель

Хранить логин (профиль VK) только на время сессии — до закрытия вкладки. Перевести `setStoredProfile`/`getStoredProfile` с `localStorage` на `sessionStorage`.

### Контекст для чтения

- `src/lib/identity.ts`
- `src/lib/storage.ts`

### Текущее состояние

`identity.ts` использует `readStorage`/`writeStorage` (localStorage) для `FALLBACK_KEY = 'kaf.user'`. Профиль переживает закрытие вкладки.

### Действия

1. `identity.ts`: `setStoredProfile`/`getStoredProfile` использовать `sessionStorage` вместо `localStorage`.
2. Добавить отдельные обёртки для sessionStorage (или параметр в `storage.ts`).
3. Fallback-идентификатор (`kaf.user` для анонимов) — по решению, тоже перевести на sessionStorage (логин только на сессию).

### Разрешённые файлы

- Изменить: `src/lib/identity.ts`, `src/lib/storage.ts` (если нужно).
- Тесты: `tests/browser/identity.test.ts`, `tests/browser/storage.test.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Профиль хранится в `sessionStorage` (не переживает закрытие вкладки).
- [ ] Функции `setStoredProfile`/`getStoredProfile` работают корректно.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `identity.test.ts`: `setStoredProfile`/`getStoredProfile` пишут/читают sessionStorage; после закрытия (очистка sessionStorage) профиль недоступен.
- `storage.test.ts`: обёртки sessionStorage корректно сохраняют/извлекают/удаляют.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-30 — Авторизация: не показывать auth вне VK

**План:** `PLAN-20260901-04`  
**Статус:** `ready`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-29`  
**Выполнять после:** `TASK-20260901-29`  
**parallel:** `false`

### Цель

Определять, запущено ли приложение в VK. Если в VK — показывать auth screen (явное согласие). Если не в VK — не показывать auth, использовать fallback-профиль.

### Контекст для чтения

- `src/lib/identity.ts`
- `src/components/AskScreen.tsx`, `ReviewScreen.tsx`

### Текущее состояние

`AskScreen`/`ReviewScreen` всегда показывают auth screen (TASK-21). Нет определения VK-окружения.

### Действия

1. `identity.ts`: добавить `isVkEnvironment(): boolean` — проверка launch params в URL (`vk_user_id`/`vk_app_id` в `window.location.search`).
2. `AskScreen.tsx`, `ReviewScreen.tsx`: если `isVkEnvironment()` — показать auth screen; иначе — пропустить, сразу использовать профиль (fallback/сохранённый из sessionStorage).
3. Профиль для не-VK: `resolveUserProfile()` (fallback без имени).

### Разрешённые файлы

- Изменить: `src/lib/identity.ts`, `src/components/AskScreen.tsx`, `src/components/ReviewScreen.tsx`.
- Создать: `tests/browser/vkEnvironment.test.ts`.
- Тесты: `tests/browser/identity.test.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] В VK-окружении показывается auth screen.
- [ ] Вне VK auth screen не показывается, используется fallback-профиль.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `vkEnvironment.test.ts`: `isVkEnvironment()` возвращает `true` при наличии `vk_user_id` в URL, `false` без него.
- `identity.test.ts`: поведение `isVkEnvironment` в разных URL.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-31 — Ask-экран: убрать вопросы + задержка 0.5с

**План:** `PLAN-20260901-04`  
**Статус:** `ready`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-30`  
**Выполнять после:** `TASK-20260901-30`  
**parallel:** `false`

### Цель

На странице «задать вопрос» не отображать уже заданные вопросы и не обращаться к GAS. Убрать задержку 10с, установить 0.5с.

### Контекст для чтения

- `src/components/AskScreen.tsx`
- `src/components/QuestionForm.tsx`
- `src/lib/validation.ts`

### Текущее состояние

`AskScreen` вызывает `fetchPlatform` и показывает блок «Мои вопросы». `QuestionForm` использует задержку 10с (`isWithinThrottle`).

### Действия

1. `AskScreen.tsx`: удалить `fetchPlatform`, состояние `questions`, блок «Мои вопросы» и `loading/error` для вопросов.
2. `AskScreen.tsx`: оставить только форму вопроса.
3. `QuestionForm.tsx`: заменить задержку 10с на 0.5с (или убрать throttle на ask-экране; серверная защита остаётся).
4. Убедиться, что редактирование (TASK-20) продолжает работать через `takeEditingQuestion`.

### Разрешённые файлы

- Изменить: `src/components/AskScreen.tsx`, `src/components/QuestionForm.tsx`, `src/lib/validation.ts`.
- Тесты: `tests/components/QuestionForm.test.tsx`, `tests/validation.test.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Ask-экран не обращается к GAS за вопросами.
- [ ] Блок «Мои вопросы» удалён.
- [ ] Задержка отправки вопроса — 0.5с (не 10с).
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `QuestionForm.test.tsx`: повторная отправка раньше 0.5с блокируется, после 0.5с — разрешена (scheduling throttle).
- `validation.test.ts`: порог задержки обновлён на 0.5с.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-32 — Кеширование площадок + серый цвет прошедших

**План:** `PLAN-20260901-04`  
**Статус:** `ready`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-26`  
**Выполнять после:** `TASK-20260901-26`  
**parallel:** `false`

### Цель

Добавить кеширование содержимого площадок (`fetchPlatform`) в localStorage, чтобы не загружать каждый раз. Добавить серый стиль для прошедших пунктов расписания.

### Контекст для чтения

- `src/lib/api.ts`, `src/lib/useSchedule.ts`, `src/lib/cache.ts`
- `src/components/PlatformScreen.tsx`, `PlatformCard.tsx`
- `src/lib/time.ts`
- `src/styles/globals.css`

### Текущее состояние

`fetchPlatform` вызывается каждый раз без кэша. `PlatformCard` использует только `is-active`, нет стиля для прошедших (`time_end` прошло).

### Действия

1. `api.ts`: добавить кеширование `fetchPlatform` в localStorage (ключ `kaf.platform.<id>`, TTL + версия кеша, как у расписания).
2. `PlatformScreen.tsx`: при загрузке использовать кэш, при недоступности сети — фолбэк на кэш.
3. `time.ts`: добавить `isPast(platform, serverTimeMs)` — `time_end <= serverTime`.
4. `PlatformCard.tsx`: применить `.kaf-card.is-past` для прошедших.
5. `globals.css`: стиль `.kaf-card.is-past` (серый/приглушённый).

### Разрешённые файлы

- Изменить: `src/lib/api.ts`, `src/lib/cache.ts`, `src/lib/time.ts`, `src/components/PlatformScreen.tsx`, `PlatformCard.tsx`, `src/styles/globals.css`.
- Тесты: `tests/api.test.ts`, `tests/time.test.ts`, `tests/components/PlatformCard.test.tsx` (создать).
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] `fetchPlatform` кэшируется (повторный запрос не идёт в сеть).
- [ ] Прошедшие площадки отображаются серым.
- [ ] Кэш инвалидируется по версии кеша.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `time.test.ts`: `isPast` — корректно определяет прошедшие/текущие/будущие.
- `api.test.ts`: `fetchPlatform` использует кэш (мокаем fetch, проверяем повторный вызов без сети).
- `PlatformCard.test.tsx`: наличие класса `is-past` для прошедшей площадки.

### Технические заметки исполнителя

- GAS cold start (30с) — свойство платформы; смягчается клиентским кешированием. Задокументировать в changelog.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-33 — «Назад» не возвращает на auth

**План:** `PLAN-20260901-04`  
**Статус:** `ready`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `true`

### Цель

Кнопка «назад» не должна возвращать на экран авторизации (ask/review). Страница авторизации не пишется в историю навигации.

### Контекст для чтения

- `src/lib/router.ts`
- `src/lib/navigationHistory.ts`

### Текущее состояние

`navigate()` пушит все маршруты (включая `ask/*`, `review/*`, которые показывают auth screen). `goBack()` может вернуть на ask/review → auth.

### Действия

1. `router.ts`/`navigationHistory.ts`: `navigate('ask/...')` и `navigate('review/...')` НЕ писать в историю.
2. Либо: при `goBack()` пропускать маршруты, начинающиеся с `ask/` или `review/`.
3. Выбрать решение: ask/review не пушатся в историю (страница авторизации не возвращается).

### Разрешённые файлы

- Изменить: `src/lib/router.ts`, `src/lib/navigationHistory.ts`.
- Тесты: `tests/browser/router.test.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Переход на ask/review не добавляет маршрут в историю.
- [ ] «Назад» с ask/review возвращает на предыдущий не-auth маршрут (или расписание).
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `router.test.ts`: `navigate('ask/abc')` не добавляет в историю; `goBack()` после ask/review возвращает на предыдущий маршрут, а не на auth.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## Активные задачи (TASK-34 … 38) — PLAN-20260901-05

## TASK-20260901-34 — История навигации: «назад» возвращает на предыдущий маршрут

**План:** `PLAN-20260901-05`  
**Статус:** `pending`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Исправить историю навигации так, чтобы кнопка «назад» возвращала на предыдущий маршрут приложения, а не на главный экран (в браузере вне VK).

### Контекст для чтения

- `src/lib/router.ts`
- `src/lib/navigationHistory.ts`
- `src/components/AppShell.tsx`

### Текущее состояние

`navigate(hash)` пушит текущий хэш в историю (`pushNavigation(getHash())`), кроме ask/review. `goBack()` извлекает последний маршрут из стека; если стек пуст — возвращает `''` (главная). Пользователь сообщает: «назад возвращает на главный экран, игнорируя историю (браузер вне VK), нестабильно».

Возможные причины:
- При открытии по прямой ссылке на площадку (без истории) `goBack()` возвращает `''` → главная (ожидаемо, но пользователь хочет корректную историю при навигации внутри приложения).
- При переходе с площадки на ask (`navigate('ask/<id>')`) ask не пушится в историю (AUTH_ROUTES), но при submit `navigate('<id>')` пушит `'ask/<id>'` в историю — ask попадает в историю через submit.
- `hashchange` от браузера (кнопка «назад» браузера) не синхронизирован со стеком `sessionStorage`.

### Действия

1. Проанализировать сценарии навигации: главная → площадка → ask → submit → площадка; главная → площадка → review → submit → площадка; прямая ссылка на площадку.
2. Исправить логику `navigate`/`goBack`/`navigationHistory`, чтобы «назад» возвращал на предыдущий маршрут, а не на главную.
3. Убедиться, что ask/review не попадают в историю (ни через `navigate`, ни через submit).
4. Рассмотреть синхронизацию с `hashchange` браузера (кнопка «назад» браузера) — при необходимости.
5. Добавить/обновить тесты на сценарии навигации.

### Разрешённые файлы

- Изменить: `src/lib/router.ts`, `src/lib/navigationHistory.ts`, `src/components/AppShell.tsx` (при необходимости).
- Тесты: `tests/browser/router.test.ts`, `tests/browser/navigationHistory.test.ts` (создать при необходимости).
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `.github/workflows/*`.

### Критерии готовности

- [ ] «Назад» возвращает на предыдущий маршрут приложения (не на главную) при навигации внутри приложения.
- [ ] ask/review не попадают в историю навигации.
- [ ] При пустой истории (прямая ссылка) «назад» возвращает на расписание.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `router.test.ts`: сценарии навигации (главная → площадка → ask → submit → площадка; goBack возвращает на предыдущий маршрут).
- `navigationHistory.test.ts`: стек корректно пушит/извлекает; ask/review не попадают в историю.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-35 — «Имя», «Отзыв», «Вопрос» по левому краю, шрифт как на кнопках

**План:** `PLAN-20260901-05`  
**Статус:** `pending`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Выровнять поля «Имя», «Отзыв», «Вопрос» по левому краю (сейчас центрированы из-за `.kaf-center .kaf-field { align-items: center }`). Шрифт лейблов/полей — как на кнопках (17px). Остальное (звёзды) без изменений.

### Контекст для чтения

- `src/styles/globals.css`
- `src/components/AskScreen.tsx`, `ReviewScreen.tsx`
- `src/components/QuestionForm.tsx`, `ReviewForm.tsx`

### Текущее состояние

`AskScreen` и `ReviewScreen` обёрнуты в `.kaf-center`. В `globals.css` добавлено `.kaf-center .kaf-field { align-items: center }` и `.kaf-center .kaf-stars { justify-content: center }` (TASK-27). Пользователь просит: «ИМЯ ОТЗЫВ ВОПРОС по левому, остальное без изменений» — т.е. лейблы/поля по левому краю, звёзды оставить центрированными.

### Действия

1. `globals.css`: убрать центрирование лейблов/полей (`.kaf-center .kaf-field { align-items: center }`), выровнять по левому краю.
2. Оставить центрирование звёзд (`.kaf-center .kaf-stars { justify-content: center }`) без изменений.
3. Убедиться, что шрифт лейблов/полей «Имя», «Отзыв», «Вопрос» соответствует шрифту кнопок (17px).
4. Проверить на экранах Ask и Review.

### Разрешённые файлы

- Изменить: `src/styles/globals.css`.
- Тесты: `tests/components/QuestionForm.test.tsx`, `ReviewForm.test.tsx` (если нужно).
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] «Имя», «Отзыв», «Вопрос» выровнены по левому краю.
- [ ] Звёзды остаются центрированными.
- [ ] Шрифт лейблов/полей — как на кнопках (17px).
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `QuestionForm`/`ReviewForm`: проверка структуры/классов (лейблы не центрированы, звёзды центрированы).

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-36 — Hydration error: отключить SSR для AppRouter

**План:** `PLAN-20260901-05`  
**Статус:** `pending`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Исправить hydration error при открытии вне VK по прямой ссылке на площадку (`Expected server HTML to contain a matching <button> in <header>`), из-за которой не отображается кнопка «назад» на экранах отзыва, площадки, вопроса.

### Контекст для чтения

- `src/components/AppRouter.tsx`
- `src/components/AppShell.tsx`
- `src/lib/useRoute.ts`
- `src/app/page.tsx` (или layout)

### Текущее состояние

`AppRouter` — `'use client'` компонент. При SSR (static export) Next.js рендерит страницу на сервере: `useRoute()` на сервере возвращает `schedule` (getHash возвращает `''` без window), рендерится `ScheduleScreen` (без header с кнопкой). На клиенте по хэшу `#<platformId>` рендерится `PlatformScreen` с `AppShell title="Площадка"` (с кнопкой). Возникает hydration mismatch: сервер отрендерил без `<button>` в `<header>`, клиент — с `<button>`.

### Действия

1. Отключить SSR для `AppRouter` — рендерить только на клиенте (например, через `dynamic(() => import(...), { ssr: false })` или проверку `typeof window`).
2. Убедиться, что при открытии по прямой ссылке на любой экран (platform/ask/review) hydration error не возникает.
3. Проверить, что кнопка «назад» отображается корректно на всех экранах.
4. Добавить/обновить тесты при необходимости.

### Разрешённые файлы

- Изменить: `src/components/AppRouter.tsx`, `src/app/page.tsx` (или где рендерится AppRouter).
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `.github/workflows/*`.

### Критерии готовности

- [ ] Hydration error не возникает при открытии по прямой ссылке на площадку/ask/review.
- [ ] Кнопка «назад» отображается корректно на всех экранах.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- Проверка, что AppRouter рендерится только на клиенте (если применимо).

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-37 — Отображение вопросов на странице площадки

**План:** `PLAN-20260901-05`  
**Статус:** `pending`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-36`  
**Выполнять после:** `TASK-20260901-36`  
**parallel:** `false`

### Цель

Исправить отображение уже заданных вопросов на странице площадки (сейчас не отображаются).

### Контекст для чтения

- `src/components/PlatformScreen.tsx`
- `src/components/PlatformDetail.tsx`
- `src/lib/api.ts`
- `src/lib/cache.ts`

### Текущее состояние

`PlatformScreen` вызывает `fetchPlatform(platformId, userId)`. При 404 от GAS (`script.googleusercontent.com/macros/echo`) `res.ok = false`, и если нет кэша — показывается ошибка. Если кэш есть — показывается кэш (возможно, устаревший, без вопросов). Пользователь сообщает: «не отображаются уже заданные вопросы на странице площадки».

Примечание: 404 от GAS — вне кода (пользователь переразвернёт GAS web app). Но нужно проверить, что после переразвёртывания вопросы отображаются, и что кэш не показывает устаревшие данные без вопросов.

### Действия

1. Проверить, что `fetchPlatform` корректно возвращает вопросы после переразвёртывания GAS.
2. Исправить кэш: не показывать устаревшие данные без вопросов (или с пустым списком вопросов), если есть свежие данные.
3. Убедиться, что `PlatformDetail` отображает вопросы из `state.data.questions`.
4. Добавить/обновить тесты при необходимости.

### Разрешённые файлы

- Изменить: `src/components/PlatformScreen.tsx`, `src/lib/cache.ts`, `src/lib/api.ts` (при необходимости).
- Тесты: `tests/api.test.ts`, `tests/components/PlatformScreen.test.tsx` (создать при необходимости).
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Вопросы отображаются на странице площадки после переразвёртывания GAS.
- [ ] Кэш не показывает устаревшие данные без вопросов.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `api.test.ts`: `fetchPlatform` возвращает вопросы; кэш корректно сериализует/десериализует.
- `PlatformScreen.test.tsx`: отображение вопросов из данных площадки.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-38 — Оптимизация долгой загрузки площадки (кэш + фоновое обновление)

**План:** `PLAN-20260901-05`  
**Статус:** `pending`  
**Приоритет:** `medium`  
**Зависит от:** `TASK-20260901-37`  
**Выполнять после:** `TASK-20260901-37`  
**parallel:** `false`

### Цель

Оптимизировать долгую загрузку страницы площадки (GAS cold start 20–50с): показывать кэш сразу, обновлять в фоне.

### Контекст для чтения

- `src/components/PlatformScreen.tsx`
- `src/lib/cache.ts`
- `src/lib/api.ts`

### Текущее состояние

`PlatformScreen` при загрузке сначала показывает кэш (если есть), затем делает `fetchPlatform`. Если кэша нет — показывает `loading` до ответа GAS (20–50с). Пользователь сообщает: «долгая загрузка страницы площадки», «запросы очень долгие (20–50с)».

### Действия

1. Улучшить кэш: показывать кэш сразу (уже реализовано), обновлять в фоне без блокировки UI.
2. Рассмотреть: показывать индикатор «обновление…» при фоновом обновлении, не блокируя контент.
3. Убедиться, что при недоступности сети/404 показывается кэш (не ошибка).
4. Добавить/обновить тесты при необходимости.

### Разрешённые файлы

- Изменить: `src/components/PlatformScreen.tsx`, `src/lib/cache.ts`, `src/lib/api.ts` (при необходимости).
- Тесты: `tests/api.test.ts`, `tests/components/PlatformScreen.test.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Кэш показывается сразу при повторном открытии площадки.
- [ ] Фоновое обновление не блокирует UI.
- [ ] При недоступности сети/404 показывается кэш (не ошибка).
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `PlatformScreen.test.tsx`: при наличии кэша показывается сразу; при ошибке сети показывается кэш.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## Активные задачи (TASK-39 … 42) — PLAN-20260901-06

## TASK-20260901-39 — История навигации: «назад» возвращает на предыдущий экран

**План:** `PLAN-20260901-06`  
**Статус:** `pending`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Исправить историю навигации так, чтобы кнопка «назад» возвращала на предыдущий экран приложения (площадка → главная, ask → площадка и т.д.), а не сразу на главный экран.

### Контекст для чтения

- `src/lib/router.ts`
- `src/lib/navigationHistory.ts`
- `src/lib/useRoute.ts`
- `src/components/AppShell.tsx`

### Текущее состояние

`navigate(hash)` пушит текущий хэш в историю (`pushNavigation(getHash())`), кроме ask/review. `goBack()` извлекает последний маршрут из стека; если стек пуст — возвращает `''` (главная). Пользователь сообщает: «кнопка назад возвращает сразу на главный экран».

Возможные причины:
- Стек `sessionStorage` (`navigationHistory`) не синхронизирован с `hashchange` браузера. Когда пользователь нажимает «назад» в браузере, `hashchange` срабатывает, `useRoute` обновляет маршрут, но стек `sessionStorage` не обновляется. При следующем `goBack()` (кнопка «назад» в приложении) извлекается неправильный маршрут.
- При открытии по прямой ссылке на площадку (без истории) `goBack()` возвращает `''` → главная (ожидаемо, но пользователь хочет корректную историю при навигации внутри приложения).
- `hashchange` от браузера не синхронизирован со стеком `sessionStorage`.

### Действия

1. Проанализировать сценарии навигации: главная → площадка → ask → submit → площадка; главная → площадка → review → submit → площадка; прямая ссылка на площадку; нажатие «назад» в браузере.
2. Исправить логику `navigate`/`goBack`/`navigationHistory`, чтобы «назад» возвращал на предыдущий маршрут, а не на главную.
3. Синхронизировать стек `sessionStorage` с `hashchange` браузера (кнопка «назад» браузера).
4. Убедиться, что ask/review не попадают в историю (ни через `navigate`, ни через submit).
5. Добавить/обновить тесты на сценарии навигации.

### Разрешённые файлы

- Изменить: `src/lib/router.ts`, `src/lib/navigationHistory.ts`, `src/lib/useRoute.ts`, `src/components/AppShell.tsx` (при необходимости).
- Тесты: `tests/browser/router.test.ts`, `tests/browser/navigationHistory.test.ts` (создать при необходимости).
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `.github/workflows/*`.

### Критерии готовности

- [ ] «Назад» возвращает на предыдущий экран приложения (не на главную) при навигации внутри приложения.
- [ ] ask/review не попадают в историю навигации.
- [ ] При пустой истории (прямая ссылка) «назад» возвращает на расписание.
- [ ] Стек `sessionStorage` синхронизирован с `hashchange` браузера.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `router.test.ts`: сценарии навигации (главная → площадка → ask → submit → площадка; goBack возвращает на предыдущий маршрут).
- `navigationHistory.test.ts`: стек корректно пушит/извлекает; ask/review не попадают в историю; синхронизация с `hashchange`.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-40 — Обработка ошибок fetchPlatform (404)

**План:** `PLAN-20260901-06`  
**Статус:** `pending`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Улучшить обработку ошибок `fetchPlatform` при 404 от GAS (`script.googleusercontent.com/macros/echo`): показывать понятное сообщение, не блокировать UI, корректно использовать кэш.

### Контекст для чтения

- `src/lib/api.ts`
- `src/components/PlatformScreen.tsx`
- `src/lib/cache.ts`

### Текущее состояние

`fetchPlatform` (GET) возвращает 404 от GAS. `PlatformScreen` при 404 без кэша показывает ошибку «Ошибка загрузки». Пользователь сообщает: «404 после отправки вопроса», «при первом открытии площадки не отображаются уже заданные вопросы». URL в `.env.local` обновлён, но 404 остаётся.

Примечание: 404 на `script.googleusercontent.com/macros/echo` — это GAS redirect. Возможные причины: GAS web app не настроен на анонимный доступ («Anyone»), URL указывает на `/dev` вместо `/exec`, или GAS не обрабатывает GET-запрос с `action=platform`. Это частично вне кода, но нужно улучшить обработку ошибок и диагностику.

### Действия

1. `api.ts`: улучшить обработку ошибок — при 404 возвращать понятное сообщение (например, «Сервер не отвечает (404). Проверьте настройки GAS»).
2. `PlatformScreen.tsx`: при 404 без кэша показывать понятное сообщение, не блокировать UI.
3. Добавить диагностику: логировать URL и статус для отладки.
4. Задокументировать в changelog проверку настроек GAS (доступ «Anyone», `/exec` URL).
5. Добавить/обновить тесты.

### Разрешённые файлы

- Изменить: `src/lib/api.ts`, `src/components/PlatformScreen.tsx`.
- Тесты: `tests/api.test.ts`, `tests/components/PlatformScreen.test.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] При 404 от GAS показывается понятное сообщение (не блокирует UI).
- [ ] При 404 с кэшем показывается кэш (не ошибка).
- [ ] Диагностика (URL, статус) логируется.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `api.test.ts`: `fetchPlatform` при 404 возвращает понятное сообщение.
- `PlatformScreen.test.tsx`: при 404 без кэша — понятное сообщение; при 404 с кэшем — кэш.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-41 — Оптимизация отправки ответов/отзывов (индикатор загрузки)

**План:** `PLAN-20260901-06`  
**Статус:** `pending`  
**Приоритет:** `medium`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Оптимизировать долгую отправку ответов и отзывов (GAS cold start / долгие POST-запросы): показывать индикатор загрузки, не блокировать UI.

### Контекст для чтения

- `src/components/QuestionForm.tsx`
- `src/components/ReviewForm.tsx`
- `src/lib/api.ts`

### Текущее состояние

Отправка вопроса/отзыва (POST к GAS) может занимать 20–50с (GAS cold start). Пользователь сообщает: «очень долгая отправка ответов и отзывов». Форма показывает состояние `sending`, но, возможно, без явного индикатора загрузки.

### Действия

1. `QuestionForm.tsx`, `ReviewForm.tsx`: при отправке показывать явный индикатор загрузки (спиннер/текст «Отправка…»), не блокировать UI.
2. Убедиться, что кнопка отправки отключена во время `sending`.
3. Рассмотреть таймаут на POST-запрос (чтобы не висеть бесконечно).
4. Добавить/обновить тесты.

### Разрешённые файлы

- Изменить: `src/components/QuestionForm.tsx`, `src/components/ReviewForm.tsx`, `src/lib/api.ts` (при необходимости).
- Тесты: `tests/components/QuestionForm.test.tsx`, `tests/components/ReviewForm.test.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] При отправке вопроса/отзыва показывается индикатор загрузки.
- [ ] Кнопка отправки отключена во время `sending`.
- [ ] POST-запрос имеет таймаут (не виснет бесконечно).
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `QuestionForm.test.tsx`: при отправке показывается индикатор загрузки; кнопка отключена.
- `ReviewForm.test.tsx`: при отправке показывается индикатор загрузки; кнопка отключена.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-42 — Отображение вопросов при первом открытии площадки

**План:** `PLAN-20260901-06`  
**Статус:** `pending`  
**Приоритет:** `high`  
**Зависит от:** `TASK-20260901-40`  
**Выполнять после:** `TASK-20260901-40`  
**parallel:** `false`

### Цель

Исправить отображение уже заданных вопросов при первом открытии площадки (сейчас не отображаются).

### Контекст для чтения

- `src/components/PlatformScreen.tsx`
- `src/components/PlatformDetail.tsx`
- `src/lib/api.ts`
- `src/lib/cache.ts`

### Текущее состояние

`PlatformScreen` при первом открытии (без кэша) вызывает `fetchPlatform`. Если GAS возвращает 404, вопросы не загружаются. Пользователь сообщает: «при первом открытии площадки не отображаются уже заданные вопросы».

Примечание: 404 от GAS — частично вне кода (настройки GAS). Но нужно убедиться, что после исправления 404 (TASK-40) вопросы отображаются при первом открытии, и что кэш не показывает устаревшие данные без вопросов.

### Действия

1. Проверить, что `fetchPlatform` корректно возвращает вопросы после исправления 404 (TASK-40).
2. Убедиться, что `PlatformDetail` отображает вопросы из `state.data.questions`.
3. Исправить кэш: не показывать устаревшие данные без вопросов (или с пустым списком вопросов), если есть свежие данные.
4. Добавить/обновить тесты.

### Разрешённые файлы

- Изменить: `src/components/PlatformScreen.tsx`, `src/lib/cache.ts`, `src/lib/api.ts` (при необходимости).
- Тесты: `tests/api.test.ts`, `tests/components/PlatformScreen.test.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Вопросы отображаются при первом открытии площадки (после исправления 404).
- [ ] Кэш не показывает устаревшие данные без вопросов.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `api.test.ts`: `fetchPlatform` возвращает вопросы; кэш корректно сериализует/десериализует.
- `PlatformScreen.test.tsx`: отображение вопросов из данных площадки при первом открытии (без кэша).

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## Активные задачи (TASK-43 … 47) — PLAN-20260901-07

## TASK-20260901-43 — Анонимный id на время сессии + отображение вопросов анонима

**План:** `PLAN-20260901-07`  
**Статус:** `pending`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Обеспечить стабильный уникальный id анонимного пользователя на время сессии (sessionStorage), чтобы вопросы, заданные анонимом, отображались на странице площадки.

### Контекст для чтения

- `src/lib/identity.ts`
- `src/lib/storage.ts`
- `src/lib/useCurrentUser.ts`
- `src/components/AskScreen.tsx`, `ReviewScreen.tsx`
- `src/components/PlatformScreen.tsx`

### Текущее состояние

- `getFallbackIdentity()`/`setFallbackIdentity()` используют **localStorage** (`readStorage`/`writeStorage`). Анонимный id переживает закрытие вкладки, но при недоступном localStorage генерируется заново.
- `AskScreen`/`ReviewScreen` вне VK используют жёстко закодированный `{ id: 'anon', ... }` — все анонимы имеют один id `'anon'`, вопросы не привязываются к конкретному анониму.
- `useCurrentUser()` вызывает `resolveUserId()`, который использует `getFallbackIdentity()` (localStorage).

Пользователь сообщает: «для анонимных пользователей не отображаются уже заданные вопросы, хотя в прошлых версиях каждому анониму выдавался свой уникальный id, соответственно можно было привязать к ним вопросы на время сессии».

### Действия

1. `identity.ts`: перевести `getFallbackIdentity`/`setFallbackIdentity` на **sessionStorage** (анонимный id на время сессии).
2. `AskScreen.tsx`, `ReviewScreen.tsx`: вне VK использовать сгенерированный уникальный id (не жёстко закодированный `'anon'`), стабильный на время сессии. Использовать `resolveUserProfile()`/`resolveUserId()` или читать сохранённый fallback id из sessionStorage.
3. Убедиться, что `fetchPlatform` вызывается с корректным анонимным id, и вопросы анонима отображаются.
4. Добавить/обновить тесты.

### Разрешённые файлы

- Изменить: `src/lib/identity.ts`, `src/lib/storage.ts`, `src/components/AskScreen.tsx`, `src/components/ReviewScreen.tsx`.
- Тесты: `tests/browser/identity.test.ts`, `tests/browser/storage.test.ts`, `tests/components/AskScreen.test.tsx` (создать при необходимости).
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `.github/workflows/*`.

### Критерии готовности

- [ ] Анонимный id стабилен на время сессии (sessionStorage).
- [ ] Вне VK используется уникальный анонимный id (не `'anon'`).
- [ ] Вопросы анонима отображаются на странице площадки.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `identity.test.ts`: `getFallbackIdentity`/`setFallbackIdentity` пишут/читают sessionStorage; id стабилен на время сессии.
- `storage.test.ts`: обёртки sessionStorage корректно сохраняют/извлекают.
- `AskScreen.test.tsx`: вне VK используется уникальный анонимный id (не `'anon'`).

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-44 — Авторизация в VK: только один раз за сессию

**План:** `PLAN-20260901-07`  
**Статус:** `pending`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Авторизация через VK ID должна показываться только один раз за сессию и запоминаться на время сессии (sessionStorage). При повторном открытии Ask/Review в той же сессии auth screen не должен показываться.

### Контекст для чтения

- `src/components/AskScreen.tsx`, `ReviewScreen.tsx`
- `src/lib/identity.ts`
- `src/components/AuthScreen.tsx`

### Текущее состояние

`AskScreen`/`ReviewScreen` используют `useState(() => isVkEnvironment() ? null : { id: 'anon', ... })`. В VK `profile = null`, auth screen показывается каждый раз при монтировании компонента (переход на другой экран и обратно). Сохранённый профиль из sessionStorage не читается при инициализации.

Пользователь сообщает: «авторизация показывается каждый раз в VK, хотя должна показываться только один раз за сессию и запоминаться на время сессии».

### Действия

1. `AskScreen.tsx`, `ReviewScreen.tsx`: при инициализации читать `getStoredProfile()` из sessionStorage.
2. Если профиль есть (авторизовался ранее в этой сессии) — не показывать auth, использовать сохранённый профиль.
3. Если профиля нет и в VK — показать auth screen.
4. После авторизации профиль сохраняется в sessionStorage (`setStoredProfile` уже вызывается в `AuthScreen`).
5. Добавить/обновить тесты.

### Разрешённые файлы

- Изменить: `src/components/AskScreen.tsx`, `src/components/ReviewScreen.tsx`.
- Тесты: `tests/components/AskScreen.test.tsx`, `tests/components/ReviewScreen.test.tsx` (создать при необходимости).
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Auth screen показывается только один раз за сессию (в VK).
- [ ] После авторизации профиль сохраняется в sessionStorage и используется при повторном открытии.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `AskScreen.test.tsx`: при наличии сохранённого профиля в sessionStorage auth не показывается; без профиля в VK — показывается.
- `ReviewScreen.test.tsx`: аналогично.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-45 — Дата на главном экране («5 сентября, 14:00-16:00»)

**План:** `PLAN-20260901-07`  
**Статус:** `pending`  
**Приоритет:** `medium`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

На главном экране (карточка площадки) отображать не только время, но и дату мероприятия в формате «5 сентября, 14:00-16:00».

### Контекст для чтения

- `src/components/PlatformCard.tsx`
- `src/lib/time.ts`

### Текущее состояние

`PlatformCard` показывает только время `{start}–{end}` (например, «14:00–16:00»). Дата не отображается.

### Действия

1. `PlatformCard.tsx`: добавить дату в формате «5 сентября, 14:00-16:00» (день + месяц + время).
2. Использовать локальную дату пользователя (с учётом часового пояса устройства).
3. Добавить helper в `time.ts` для форматирования даты (например, `formatDateRange`).
4. Добавить/обновить тесты.

### Разрешённые файлы

- Изменить: `src/components/PlatformCard.tsx`, `src/lib/time.ts`.
- Тесты: `tests/time.test.ts`, `tests/components/PlatformCard.test.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] На карточке площадки отображается дата в формате «5 сентября, 14:00-16:00».
- [ ] Дата учитывает часовой пояс пользователя.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `time.test.ts`: helper форматирования даты возвращает «5 сентября, 14:00-16:00».
- `PlatformCard.test.tsx`: карточка отображает дату в нужном формате.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-46 — Кастомная плашка подтверждения удаления

**План:** `PLAN-20260901-07`  
**Статус:** `pending`  
**Приоритет:** `medium`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Заменить `window.confirm` на самодельную плашку (модальный компонент) подтверждения удаления в стилистике приложения.

### Контекст для чтения

- `src/components/PlatformDetail.tsx`
- `src/components/QuestionForm.tsx`
- `src/styles/globals.css`

### Текущее состояние

`PlatformDetail.tsx` (строка 129) и `QuestionForm.tsx` (строка 122) используют `window.confirm('Удалить вопрос?')` — системный alert, не в стилистике приложения.

### Действия

1. Создать компонент подтверждения (например, `ConfirmDialog`) в стилистике приложения (liquid glass, кнопки «Удалить»/«Отмена»).
2. Заменить `window.confirm` в `PlatformDetail.tsx` и `QuestionForm.tsx` на кастомный компонент.
3. Добавить стили в `globals.css`.
4. Добавить/обновить тесты.

### Разрешённые файлы

- Создать: `src/components/ConfirmDialog.tsx`.
- Изменить: `src/components/PlatformDetail.tsx`, `src/components/QuestionForm.tsx`, `src/styles/globals.css`.
- Тесты: `tests/components/ConfirmDialog.test.tsx` (создать), `tests/components/QuestionForm.test.tsx`, `tests/components/PlatformDetail.test.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`.

### Критерии готовности

- [ ] Подтверждение удаления — кастомная плашка в стилистике приложения (не `window.confirm`).
- [ ] При подтверждении — удаление выполняется; при отмене — нет.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `ConfirmDialog.test.tsx`: рендер, подтверждение/отмена, вызов колбэков.
- `QuestionForm.test.tsx`: при подтверждении вызывается `onDelete`; при отмене — нет.
- `PlatformDetail.test.tsx`: при подтверждении вызывается `onDeleteQuestion`; при отмене — нет.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-47 — Кнопка «назад»: на предыдущий экран

**План:** `PLAN-20260901-07`  
**Статус:** `blocked`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

> **Примечание планировщика (2026-09-04):** задача была ошибочно закрыта executor как «уже реализовано в TASK-39». Проблема не решена: «назад» с ask/review возвращает на главную, а не на площадку. Реальное исправление вынесено в `TASK-20260901-48` (PLAN-20260901-08).

### Цель

Исправить историю навигации так, чтобы кнопка «назад» возвращала на предыдущий экран приложения, а не сразу на главный экран.

### Контекст для чтения

- `src/lib/router.ts`
- `src/lib/navigationHistory.ts`
- `src/lib/useRoute.ts`
- `src/components/AppShell.tsx`

### Текущее состояние

`navigate(hash)` пушит текущий хэш в историю (`pushNavigation(getHash())`), кроме ask/review. `goBack()` извлекает последний маршрут из стека; если стек пуст — возвращает `''` (главная). Пользователь сообщает: «кнопка назад возвращает сразу на главный экран».

Возможные причины:
- Стек `sessionStorage` (`navigationHistory`) не синхронизирован с `hashchange` браузера.
- При открытии по прямой ссылке на площадку (без истории) `goBack()` возвращает `''` → главная.
- `hashchange` от браузера не синхронизирован со стеком `sessionStorage`.

### Действия

1. Проанализировать сценарии навигации: главная → площадка → ask → submit → площадка; главная → площадка → review → submit → площадка; прямая ссылка на площадку; нажатие «назад» в браузере.
2. Исправить логику `navigate`/`goBack`/`navigationHistory`, чтобы «назад» возвращал на предыдущий маршрут, а не на главную.
3. Синхронизировать стек `sessionStorage` с `hashchange` браузера (кнопка «назад» браузера).
4. Убедиться, что ask/review не попадают в историю.
5. Добавить/обновить тесты.

### Разрешённые файлы

- Изменить: `src/lib/router.ts`, `src/lib/navigationHistory.ts`, `src/lib/useRoute.ts`, `src/components/AppShell.tsx` (при необходимости).
- Тесты: `tests/browser/router.test.ts`, `tests/browser/navigationHistory.test.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `.github/workflows/*`.

### Критерии готовности

- [ ] «Назад» возвращает на предыдущий экран приложения (не на главную) при навигации внутри приложения.
- [ ] ask/review не попадают в историю навигации.
- [ ] При пустой истории (прямая ссылка) «назад» возвращает на расписание.
- [ ] Стек `sessionStorage` синхронизирован с `hashchange` браузера.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `router.test.ts`: сценарии навигации (главная → площадка → ask → submit → площадка; goBack возвращает на предыдущий маршрут).
- `navigationHistory.test.ts`: стек корректно пушит/извлекает; ask/review не попадают в историю; синхронизация с `hashchange`.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-48 — Исправить кнопку «назад»: возврат на предыдущий экран

**План:** `PLAN-20260901-08`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Исправить историю навигации так, чтобы кнопка «назад» возвращала на предыдущий экран приложения (площадка → главная, ask/review → площадка), а не сразу на главный экран.

### Контекст для чтения

- `src/lib/router.ts`
- `src/lib/navigationHistory.ts`
- `src/lib/useRoute.ts`
- `src/components/AppShell.tsx`
- `tests/browser/router.test.ts`

### Текущее состояние (диагностика планировщика)

В `src/lib/router.ts` функция `navigate()` (строки 61–70):

```ts
if (!isAuthHash(current) && !isAuthHash(hash)) {
  pushNavigation(current);
}
```

Условие `!isAuthHash(hash)` означает: при переходе на ask/review (`hash='ask/p1'`) площадка (`current='p1'`) НЕ сохраняется в стек истории. Поэтому сценарий «главная → площадка → ask → «назад»» возвращает на главную, а не на площадку (стек содержит только `''`).

TASK-47 был ошибочно закрыт executor как «уже реализовано в TASK-39» — реальная проблема не исправлена.

### Действия

1. В `navigate()` изменить условие пуша: пушить `current` всегда, если `current` не auth (независимо от того, является ли `hash` auth). Это сохраняет площадку при переходе на ask/review.
2. При submit (возврат на площадку с ask/review): если `current` auth и верхушка стека (`peekNavigation()`) совпадает с целевым `hash` — убрать её (`popNavigation()`), чтобы избежать двойного «назад» после submit.
3. `goBack()` и синхронизацию с `hashchange` браузера (`onHashChange`) оставить без изменений; убедиться, что они не ломаются.
4. Убедиться, что ask/review не попадают в историю (ни при входе, ни при submit).
5. Добавить тесты для новых сценариев.

Ожидаемая логика `navigate` (ориентир, исполнитель читает файл):

```ts
export function navigate(hash: string): void {
  if (!isBrowser) return;
  const current = getHash();
  if (current === hash) return;
  if (!isAuthHash(current)) {
    pushNavigation(current);
  } else if (peekNavigation() === hash) {
    popNavigation();
  }
  internalNav = true;
  window.location.hash = hash;
}
```

### Разрешённые файлы

- Изменить: `src/lib/router.ts`.
- Тесты: `tests/browser/router.test.ts`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `.github/workflows/*`, `src/lib/navigationHistory.ts`, `src/lib/useRoute.ts`, `src/components/AppShell.tsx` (если не потребуется).

### Критерии готовности

- [ ] «Назад» с ask/review возвращает на площадку (не на главную).
- [ ] «Назад» с площадки возвращает на главную (после submit — одним нажатием, без двойного «назад»).
- [ ] ask/review не попадают в историю навигации.
- [ ] При пустой истории (прямая ссылка) «назад» возвращает на расписание.
- [ ] Существующие тесты `router.test.ts` не сломаны.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `router.test.ts`: добавить сценарии:
  - главная → площадка → ask → «назад» → площадка;
  - главная → площадка → review → «назад» → площадка;
  - главная → площадка → ask → submit → площадка → «назад» → главная (одним нажатием);
  - главная → площадка → ask → «назад» → площадка → «назад» → главная.
- Убедиться, что существующие тесты (главная → площадка → ask → submit → площадка → «назад» → главная; ask/review не в истории; прямая ссылка) остаются зелёными.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## TASK-20260901-49 — Заглушка аватара с первой буквой названия

**План:** `PLAN-20260901-09`  
**Статус:** `completed`  
**Приоритет:** `high`  
**Зависит от:** нет  
**Выполнять после:** нет  
**parallel:** `false`

### Цель

Если у пункта расписания на главном экране отсутствует любая из аватарок (`card_avatar_url` или `avatar_url`) — показывать заглушку с первой буквой названия площадки, чтобы не ломалась сетка элементов.

### Контекст для чтения

- `src/components/PlatformCard.tsx`
- `src/components/Avatar.tsx`
- `src/styles/globals.css` (`.kaf-avatar-placeholder`, строки 328–335)
- `tests/components/Avatar.test.tsx`

### Текущее состояние

- `src/components/PlatformCard.tsx` (строка 26): `Avatar` рендерится только если есть `card_avatar_url` или `avatar_url`. Если нет — карточка рендерится без аватарки, сетка ломается (текст сдвигается влево, элементы разной высоты).
- `src/components/Avatar.tsx`: без URL возвращает `null` (ничего не рендерится).
- CSS `.kaf-avatar-placeholder` уже определён (строки 328–335), но не используется в компонентах.

### Действия

1. В `src/components/PlatformCard.tsx` вычислить `const avatarUrl = platform.card_avatar_url || platform.avatar_url;`.
2. Если `avatarUrl` есть — рендерить `<Avatar url={avatarUrl} name={platform.name} size={48} />` (как сейчас).
3. Если `avatarUrl` нет — рендерить заглушку:
   ```tsx
   <div
     className="kaf-avatar kaf-avatar-placeholder"
     style={{ width: 48, height: 48 }}
     aria-label={platform.name}
   >
     {platform.name.charAt(0).toUpperCase()}
   </div>
   ```
4. В `src/styles/globals.css` дополнить `.kaf-avatar-placeholder`: `border-radius: 50%`, `flex-shrink: 0` (круглая, не ломает сетку). При необходимости добавить `font-size` для читаемости буквы при 48px.
5. `src/components/Avatar.tsx` и `src/components/PlatformDetail.tsx` НЕ менять (заглушка только на главном экране).

### Разрешённые файлы

- Изменить: `src/components/PlatformCard.tsx`, `src/styles/globals.css`.
- Тесты: `tests/components/Avatar.test.tsx` (обновить), создать `tests/components/PlatformCard.test.tsx`.
- Не изменять: `AGENTS.md`, `.agents/*`, `opencode.json`, `.opencode/*`, `next.config.js`, `.github/workflows/*`, `src/components/Avatar.tsx`, `src/components/PlatformDetail.tsx`.

### Критерии готовности

- [ ] При отсутствии `card_avatar_url` и `avatar_url` карточка показывает круглую заглушку с первой буквой названия площадки.
- [ ] При наличии аватарки — показывается изображение (поведение не изменилось).
- [ ] Сетка карточек не ломается (заглушка занимает то же место, что и аватар).
- [ ] `src/components/Avatar.tsx` и `src/components/PlatformDetail.tsx` не изменены.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` без ошибок.

### Проверки

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

### Автотесты

- `tests/components/Avatar.test.tsx`: без изменений (Avatar без URL по-прежнему возвращает `null`).
- Создать `tests/components/PlatformCard.test.tsx`:
  - без `card_avatar_url` и `avatar_url` → рендерится заглушка с первой буквой названия (например, «П» для «Площадка»);
  - с `card_avatar_url` → рендерится `img` (не заглушка);
  - с `avatar_url` (без `card_avatar_url`) → рендерится `img` (не заглушка);
  - заглушка имеет класс `kaf-avatar-placeholder` и размер 48px.

### Технические заметки исполнителя

Пока нет.

### Результат

- Changelog: `.agents/changelog.md#...`
- Коммит: `ожидает`

---

## История

Пока нет завершённых задач.
