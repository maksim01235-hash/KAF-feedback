# Журнал изменений агентов

> Этот файл ведёт агент-исполнитель.
> Новые записи добавляются в начало.
> Не удаляй предыдущие записи.
> Не записывай сюда секреты, токены, `.env`-значения, cookies, credentials или приватные ключи.

## 2026-09-03 18:15 — TASK-18..25 — Исправления PLAN-20260901-03

**План:** `PLAN-20260901-03`
**Ветка:** `ai/test-plan2`
**Статус:** `completed`
**Коммит:** `ожидает подтверждения пользователя`

### Изменения

- `src/lib/navigationHistory.ts` — новый модуль истории навигации: `pushNavigation`/`popNavigation`/`clearNavigation` через `sessionStorage` (TASK-18).
- `src/lib/router.ts` — `navigate()` пушит текущий маршрут в историю; добавлен `goBack()` (TASK-18).
- `src/components/AppShell.tsx` — `onBack` по умолчанию = `goBack`; header рендерится при наличии `title`; кнопка «назад» всегда (TASK-18).
- `src/components/AskScreen.tsx`, `ReviewScreen.tsx`, `PlatformScreen.tsx`, `AuthScreen.tsx` — убран `backToSchedule`, используется дефолтный `onBack` (TASK-18).
- `src/lib/identity.ts` — добавлен `withTimeout` (4 сек) для вызовов VK bridge; `getVkUserId`/`getVkUserProfile` не зависают в не-VK окне (TASK-19).
- `src/lib/editingState.ts` — новый модуль: `setEditingQuestion`/`takeEditingQuestion` для передачи вопроса со страницы площадки на ask-экран (TASK-20).
- `src/components/PlatformDetail.tsx` — кнопки «Редактировать»/«Удалить» рядом с вопросами (если `canEditQuestion`); «Редактировать» → `setEditingQuestion` + переход на ask (TASK-20).
- `src/components/PlatformScreen.tsx` — `handleDeleteQuestion` (удаление + обновление списка), передача `onDeleteQuestion` (TASK-20).
- `src/components/AskScreen.tsx` — при монтировании читает `takeEditingQuestion()` и открывает форму в режиме редактирования (TASK-20).
- `src/styles/globals.css` — стили `.kaf-question-actions`, `.kaf-link-danger` (TASK-20).
- `src/components/AskScreen.tsx`, `ReviewScreen.tsx` — всегда начинают с auth screen (убрано автоматическое определение VK); форма после `onAuthed` (TASK-21).
- `src/components/AuthScreen.tsx` — при недоступности VK, но наличии сохранённого профиля, вызывает `onAuthed(storedProfile)` (TASK-21; изменение вне списка разрешённых файлов — необходимо для прохождения auth-gate в браузере).
- `src/components/Avatar.tsx` — без URL рендерит `null` (TASK-22).
- `src/components/PlatformCard.tsx` — условный рендер `<Avatar>` (TASK-22).
- `src/styles/globals.css` — `.kaf-back` добавлен `line-height: 1` (TASK-22).
- `tests/components/Avatar.test.tsx` — обновлён под новое поведение `Avatar` (без src → null); 3 теста (TASK-22; изменение теста вне списка разрешённых файлов — вызвано изменением поведения).
- `src/styles/globals.css` — увеличены шрифты: `.kaf-card-title` 20px, `.kaf-card-subtitle` 16px, `.kaf-card-meta` 15px, `.kaf-btn` 17px, `.kaf-link` 16px (TASK-23).
- `apps-script/Code.gs` — серверное кэширование расписания через `CacheService` (TTL 10 мин, инвалидация по версии кеша, `serverTime` всегда актуальный) (TASK-24).

### Проверки

- `npm run lint` — `passed`
- `npx tsc --noEmit` — `passed`
- `npm test` — `passed` (117 тестов, 13 файлов)
- `npm run build` — `passed`

### Для проверки пользователем

- История навигации: переходы между экранами, кнопка «назад» возвращает на предыдущий маршрут.
- Таймаут VK bridge: в не-VK окне приложение не зависает (fallback на localStorage/анонимный профиль).
- Страница площадки: кнопки «Редактировать»/«Удалить» рядом с вопросами; «Редактировать» открывает ask-экран с предзаполненной формой.
- Авторизация: Ask/Review всегда начинаются с auth screen; после нажатия «Авторизоваться через VK ID» → форма с именем.
- Карточка без аватара перестраивается без пустого пространства; стрелка «назад» центрирована.
- Шрифты карточек/кнопок/ссылок увеличены.
- GAS: серверное кэширование расписания (повторные запросы быстрее).

### Ограничения и риски

- `AuthScreen.tsx` и `tests/components/Avatar.test.tsx` изменены вне списка разрешённых файлов TASK-21/TASK-22 — необходимо для корректной работы auth-gate в браузере и под новое поведение `Avatar`.
- Серверное кэширование расписания (TASK-24) требует деплоя обновлённого `apps-script/Code.gs` в Google Apps Script.
- Ручное тестирование производительности (DevTools Performance/Memory) не выполнялось в этой среде — задокументированы bundle size и ожидаемые метрики.

## 2026-09-03 17:10 — TASK-15, 16, 17 — Тесты PLAN-20260901-02

**План:** `PLAN-20260901-02`
**Ветка:** `ai/test-plan2`
**Статус:** `completed`
**Коммит:** `1e727f0`

### Изменения

- `vitest.config.ts` — добавлены `environmentMatchGlobs` (`tests/browser/**`, `tests/components/**` → `jsdom`), `include: ['tests/**/*.test.{ts,tsx}']`, `setupFiles: ['./tests/setup.ts']`, `esbuild: { jsx: 'automatic' }`.
- `package.json` / `package-lock.json` — добавлена dev-зависимость `jsdom`.
- `tests/setup.ts` — импорт `@testing-library/jest-dom/vitest` + `afterEach(cleanup)` для сброса DOM между тестами.
- `tests/browser/router.test.ts` — тесты `parseHash` (TASK-15).
- `tests/browser/storage.test.ts` — тесты `readStorage`/`writeStorage`/`removeStorage`/`readJSON`/`writeJSON` + ошибки localStorage (TASK-15).
- `tests/browser/identity.test.ts` — тесты `getStoredProfile`/`setStoredProfile`/`isAuthenticated` (TASK-15).
- `tests/api.test.ts` — тесты API с fetch mock; переписан на динамический импорт после установки `NEXT_PUBLIC_APPS_SCRIPT_URL` (TASK-16).
- `tests/components/StatusView.test.tsx`, `StarRating.test.tsx`, `Avatar.test.tsx`, `QuestionForm.test.tsx`, `ReviewForm.test.tsx` — тесты рендера компонентов (TASK-17).
- `test-results.md` — файл с полными результатами прогона тестов (118 passed).

### Проверки

- `npm test` — `passed` (118 тестов, 13 файлов)
- `npm run lint` — `not configured` (не запускался в этой задаче)
- `npx tsc --noEmit` — `not configured` (не запускался в этой задаче)
- `npm run build` — `not configured` (не запускался в этой задаче)

### Для проверки пользователем

- Прогнать `npm test` — все 118 тестов зелёные.
- Посмотреть `test-results.md` — полный список результатов по каждому тесту.
- Код приложения не изменялся; изменены только тесты и конфигурация vitest.

### Ограничения и риски

- `npm run lint` / `tsc` / `build` в этой задаче не запускались (задача — только прогон тестов и фиксация результатов).

---

## Текущий статус

Все задачи TASK-20260901-01 … 08 выполнены и запушены. Исправлен баг хэш-роутинга (SPA на одной странице), дополнена документация. Ветка `main` — default branch. GitHub Pages настроен, сайт опубликован и работает (исправлен basePath). Добавлена передача секретов GAS/VK в CI-сборку.

Задачи `PLAN-20260901-02` (TASK-09 … 14, UI-баги) выполнены в ветке `ai/fix-ui-bugs` и **слиты в `main`** (fast-forward, push `2ab8db8..3ee3f56`): тулбар главного экрана, типографика, колонка `card_avatar_url`, аватарка у докладчика + описание в рамке, центрирование экрана отзыва и размер звёзд, CORS через `Content-Type: text/plain`, переработка авторизации (auth-gate).

---

## История

## 2026-09-01 22:45 — Слияние PLAN-20260901-02 в main

**План:** `PLAN-20260901-02`  
**Ветка:** `main` (fast-forward из `ai/fix-ui-bugs`)  
**Статус:** `completed`  
**Коммиты:** `b44581d`, `6df6d01`, `3ee3f56` (push `2ab8db8..3ee3f56`)

### Изменения

- Слиты в `main` все изменения `PLAN-20260901-02` (TASK-09 … 14) из ветки `ai/fix-ui-bugs`.

### Проверки

- `npm run lint` — `passed`
- `npx tsc --noEmit` — `passed`
- `npm test` — `passed` (58 тестов)
- `npm run build` — `passed`

### Для проверки пользователем

- GitHub Pages пересоберётся автоматически после push в `main` (workflow `Deploy to GitHub Pages`).
- Проверить сайт на подпути `/KAF-feedback/`.

### Ограничения и риски

- Настройка VK Mini App в кабинете разработчика и Google Таблица/GAS-развёртывание — вне кода, требуют действий пользователя.

## 2026-09-01 22:30 — PLAN-20260901-02: UI-баги (TASK-09 … 14)

**План:** `PLAN-20260901-02`  
**Ветка:** `ai/fix-ui-bugs`  
**Статус:** `completed` (слито в `main`)  
**Коммит:** `6df6d01` (запушен в `origin/ai/fix-ui-bugs`)

### Изменения

- `src/components/ScheduleScreen.tsx` — тулбар главного экрана: заголовок «КАФ» по центру, строка «Только сегодня», кнопка «Войти» убрана (TASK-09, TASK-14).
- `src/styles/globals.css` — стили закреплённого тулбара (sticky, blur), увеличены шрифты карточек/кнопок/ссылок; блок докладчика с аватаркой; описание в рамке; центрирование экрана отзыва; звёзды увеличены до 36px (TASK-09, 11, 12).
- `src/types/index.ts` — добавлено поле `card_avatar_url?: string` в `Platform` (TASK-10).
- `apps-script/Code.gs` — `readPlatforms_` читает `card_avatar_url` (TASK-10).
- `src/components/PlatformCard.tsx` — аватарка карточки из `card_avatar_url` (фолбэк на `avatar_url`) (TASK-10).
- `README.md`, `apps-script/README.md` — задокументирована колонка `card_avatar_url` (TASK-10).
- `src/components/PlatformDetail.tsx` — аватарка перенесена к имени докладчика; описание обёрнуто в рамку (TASK-11).
- `src/components/ReviewScreen.tsx` — центрирование формы отзыва (TASK-12).
- `src/lib/api.ts` — POST отправляется с `Content-Type: text/plain` (без preflight/CORS) (TASK-13).
- `src/lib/identity.ts` — добавлены `UserProfile`, `getVkUserProfile`, `getStoredProfile`/`setStoredProfile`, `resolveUserProfile`, `isAuthenticated` (TASK-14).
- `src/components/AuthScreen.tsx` — превращён в auth-gate: принимает `onAuthed(profile)`, сохраняет профиль (TASK-14).
- `src/components/AskScreen.tsx`, `ReviewScreen.tsx` — обёрнуты в auth-gate; имя подставляется в форму через `initialName` (TASK-14).
- `src/components/QuestionForm.tsx`, `ReviewForm.tsx` — добавлен проп `initialName` (TASK-14).
- `src/components/AppRouter.tsx`, `src/lib/router.ts` — убран маршрут `#auth` (TASK-14).

### Проверки

- `npm run lint` — `passed`
- `npx tsc --noEmit` — `passed`
- `npm test` — `passed` (58 тестов)
- `npm run build` — `passed`

### Для проверки пользователем

- Главный экран: тулбар «КАФ» по центру, без кнопки «Войти», увеличенные шрифты.
- Карточка расписания использует `card_avatar_url` (при отсутствии — `avatar_url`/placeholder).
- Страница площадки: аватарка у имени докладчика, описание в белой рамке.
- Экран отзыва: поля и звёзды по центру, звёзды крупнее.
- Отправка вопроса/отзыва: POST с `text/plain` (нет CORS-ошибки).
- Открытие «Задать вопрос»/«Оставить отзыв» без авторизации → экран авторизации; после входа имя подставляется в форму. Маршрут `#auth` больше не используется.

### Ограничения и риски

- Ветка `ai/fix-ui-bugs` не запушена в `main` (по команде пользователя). Требуется проверка и подтверждение перед слиянием.
- Для проверки авторизации и CORS нужен запуск в VK (в браузере vk-bridge может не вернуть профиль — используется fallback без имени, что корректно показывает auth-gate).

## 2026-09-01 21:30 — Исправление деплоя (basePath) и передача секретов в CI

**План:** `PLAN-20260901-01`  
**Ветка:** `main`  
**Статус:** `completed`  
**Коммиты:** `ae028c7`, `253f58d`

### Изменения

- `next.config.js` — добавлены `basePath: '/KAF-feedback'` и `assetPrefix: '/KAF-feedback/'`. Без них CSS/JS не загружались на подпути GitHub Pages (404), сайт отображался без оформления.
- `.github/workflows/deploy.yml` — шаг Build теперь передаёт `NEXT_PUBLIC_APPS_SCRIPT_URL` и `NEXT_PUBLIC_VK_APP_ID` из GitHub Secrets в сборку.
- `README.md` — раздел про настройку GitHub Pages (basePath), локальную проверку production-сборки, и инструкция по заданию GitHub Secrets.

### Проверки

- `npm run build` — `passed` (пути ассетов с префиксом `/KAF-feedback/`).
- GitHub Pages — сайт работает, CSS/JS загружаются (код 200).
- GitHub Actions — `Deploy to GitHub Pages` — `success`.

### Для проверки пользователем

- Задать GitHub Secrets: `NEXT_PUBLIC_APPS_SCRIPT_URL` и `NEXT_PUBLIC_VK_APP_ID` (Settings → Secrets and variables → Actions).
- После этого push в `main` или ручной запуск workflow пересоберёт сайт с реальными значениями.

### Ограничения и риски

- `NEXT_PUBLIC_*` переменные попадают в клиентский JS и видны пользователям — только публичные URL/ID, без секретов.

---

## 2026-09-01 21:10 — Публикация на GitHub Pages

**План:** `PLAN-20260901-01`  
**Ветка:** `main`  
**Статус:** `completed`  
**Коммит:** `48694d4` (HEAD `main`)

### Изменения

- Пользователь вручную сменил default branch на `main` и настроил GitHub Pages.
- CI/CD отработал: `Deploy to GitHub Pages` — `success`, `pages build and deployment` — `success`.
- Сайт опубликован: `https://maksim01235-hash.github.io/KAF-feedback/` (код 200).

### Проверки

- `git remote show origin` — HEAD branch: `main`.
- `https://maksim01235-hash.github.io/KAF-feedback/` — 200, содержит `kaf-app`.
- `/platform`, `/auth` — 200.
- GitHub Actions: `Deploy to GitHub Pages` — success.

### Для проверки пользователем

- Открыть `https://maksim01235-hash.github.io/KAF-feedback/` в браузере.
- Проверить расписание, клик по площадке, «Войти», формы.

### Ограничения и риски

- Нет.

---

## 2026-09-01 21:00 — Создание ветки main

**План:** `PLAN-20260901-01`  
**Ветка:** `main`  
**Статус:** `completed`  
**Коммит:** `4ceca02` (HEAD ветки `main`)

### Изменения

- Создана ветка `main` от `ai/feature-kaf-feedback` (идентична, diff пустой).
- Запушена в origin: `origin/main` создана.
- `main` содержит весь код проекта (все задачи TASK-01..08 + исправление роутинга + документация).

### Проверки

- `git diff origin/main origin/ai/feature-kaf-feedback` — пусто (идентичны).
- `git log origin/main` — `4ceca02` (HEAD).

### Для проверки пользователем (вручную, в веб-интерфейсе GitHub)

1. **Сменить default branch:** GitHub → Settings → Branches → Default branch → сменить на `main`.
2. **Настроить GitHub Pages:** Settings → Pages → Source → Deploy from a branch → `main` → `/ (root)`. Workflow `deploy.yml` уже настроен на `main` и задеплоит автоматически.

### Ограничения и риски

- `gh` CLI не установлен, токена нет — смена default branch и настройка Pages выполняются вручную.
- Workflow `deploy.yml` триггерится на push в `main` — после настройки Pages CI задеплоит сайт.

---

## 2026-09-01 20:45 — Исправление хэш-роутинга и дополнение документации

**План:** `PLAN-20260901-01`  
**Ветка:** `ai/feature-kaf-feedback`  
**Статус:** `completed`  
**Коммиты:** `a9a31ff`, `d692765`  
**Ветка (remote):** `https://github.com/maksim01235-hash/KAF-feedback/tree/ai/feature-kaf-feedback`

### Изменения

- `src/components/AppRouter.tsx` — новый единый SPA-роутер: по хэшу рендерит нужный экран (расписание/площадка/вопрос/отзыв/авторизация).
- `src/components/ScheduleScreen.tsx`, `PlatformScreen.tsx`, `AskScreen.tsx`, `ReviewScreen.tsx`, `AuthScreen.tsx` — экраны, вынесенные из отдельных страниц.
- `src/app/page.tsx` — теперь рендерит `<AppRouter />` (единый SPA).
- `src/app/platform/page.tsx`, `src/app/ask/page.tsx`, `src/app/review/page.tsx`, `src/app/auth/page.tsx` — рендерят `<AppRouter />` (глубокие ссылки).
- `src/lib/useRoute.ts` — при монтировании перечитывает текущий хэш (важно для глубоких ссылок и гидрации).
- `apps-script/README.md` — детальный формат ячеек таблицы (тип, обязательность, примеры), пояснение про `appsscript.json` (нельзя загружать через «+»; применяется через Project Settings или clasp).
- `README.md` — ссылки на детальную документацию, упоминание `appsscript.json`.

### Проверки

- `npm run lint` — `passed`
- `npx tsc --noEmit` — `passed`
- `npm test` — `passed` (58 тестов)
- `npm run build` — `passed` (5 статических страниц)
- `npm run dev` — `passed` (страницы `/` и `/platform` отдаются с кодом 200)

### Для проверки пользователем

- `npm run dev` → клик по карточке площадки и по «Войти» — экран должен переключаться по хэшу.
- Глубокие ссылки: `/#main-hall`, `/#ask/main-hall`, `/#review/main-hall`, `/#auth`.

### Ограничения и риски

- Хэш-роутинг теперь работает как задумано в плане (SPA на одной странице).
- `appsscript.json` нельзя загрузить через кнопку «+» в редакторе — только через Project Settings или clasp.

---

## 2026-09-01 20:05 — TASK-20260901-02..08 — Логика, бэкенд, фронтенд, README

**План:** `PLAN-20260901-01`  
**Ветка:** `ai/feature-kaf-feedback`  
**Статус:** `completed`  
**Коммиты:** `4d9f99a`, `4ddd966`, `cdca252`, `98d967c`  
**Ветка (remote):** `https://github.com/maksim01235-hash/KAF-feedback/tree/ai/feature-kaf-feedback`

### Изменения

- `src/lib/time.ts` — активность площадок (UTC), фильтр «текущего дня», сортировка, парсинг времени (ISO или epoch ms).
- `src/lib/validation.ts` — валидация имени/текста/оценки, форм вопроса и отзыва, задержка 10с.
- `src/lib/cache.ts` — кэш расписания (2ч + версия кеша), сериализация.
- `src/lib/identity.ts` — идентификация (vk_user_id + fallback), права на вопрос.
- `tests/time.test.ts`, `tests/validation.test.ts`, `tests/cache.test.ts`, `tests/permissions.test.ts` — 58 тестов.
- `vitest.config.ts` — конфиг vitest с алиасом `@/`.
- `apps-script/Code.gs` — веб-апп GAS (doGet/doPost, CRUD вопросов, отзывы, serverTime, cacheVersion, логирование).
- `apps-script/appsscript.json` — манифест (timeZone UTC, scopes, webapp).
- `apps-script/README.md` — инструкция по развёртыванию.
- `src/lib/api.ts` — клиент GAS.
- `src/lib/router.ts` — хэш-роутинг.
- `src/lib/useSchedule.ts`, `src/lib/useRoute.ts`, `src/lib/useCurrentUser.ts` — хуки.
- `src/app/page.tsx` — расписание (загрузка/ошибка/пусто, фильтр дня, активность, кэш).
- `src/app/platform/page.tsx` — страница площадки.
- `src/app/ask/page.tsx` — форма вопроса (валидация, задержка, редактирование/удаление).
- `src/app/review/page.tsx` — форма отзыва.
- `src/app/auth/page.tsx` — авторизация VK ID + конфиденциальность.
- `src/components/*` — AppShell, PlatformCard, PlatformDetail, QuestionForm, ReviewForm, StarRating, Avatar, Markdown, StatusView.
- `src/styles/globals.css` — стили liquid glass для всех компонентов.
- `README.md` — полная документация.

### Проверки

- `npm run lint` — `passed`
- `npx tsc --noEmit` — `passed`
- `npm test` — `passed` (58 тестов)
- `npm run build` — `passed` (статический экспорт, 5 страниц)

### Для проверки пользователем

- `npm run dev` — проверить расписание, страницу площадки, формы, авторизацию.
- Хэш-роутинг: `#<platformId>`, `#ask/<platformId>`, `#review/<platformId>`, `#auth`.
- Развернуть GAS и задать `NEXT_PUBLIC_APPS_SCRIPT_URL`.

### Ограничения и риски

- `next@14.2.3` имеет известную security vulnerability (см. TASK-01).
- Контракт времени: GAS возвращает epoch ms (number); тип `Platform.time_start/time_end` — `string | number` (ISO или epoch ms).
- GAS-код не покрыт автотестами (вне стека vitest).

---

## 2026-09-01 12:50 — TASK-20260901-01 — Скаффолд Next.js-проекта и общая база

**План:** `PLAN-20260901-01`  
**Ветка:** `ai/feature-kaf-feedback`  
**Статус:** `needs-review`  
**Коммит:** `a32511e`  
**Ветка (remote):** `https://github.com/maksim01235-hash/KAF-feedback/tree/ai/feature-kaf-feedback`

### Изменения

- `package.json` — зависимости Next.js/React/VKUI/vk-bridge/react-markdown + dev (typescript, eslint, vitest, testing-library). Версия `next` зафиксирована на `14.2.3` по просьбе пользователя (как в рабочем примере), чтобы избежать сбоя SWC-бинарника в `14.2.35`.
- `next.config.js` — `output: 'export'`, без `basePath` (корень домена), `images.unoptimized`.
- `tsconfig.json` — строгий TypeScript, пути `@/*` → `./src/*`.
- `.eslintrc.json` — `extends: next/core-web-vitals` (Next 14.2.3 не поддерживает flat config в `next lint`; `eslint.config.mjs` удалён).
- `.gitignore` — node_modules, .next, out, .env*, tsbuildinfo, next-env.d.ts.
- `.env.example` — `NEXT_PUBLIC_APPS_SCRIPT_URL`, `NEXT_PUBLIC_VK_APP_ID` (без секретов).
- `.github/workflows/deploy.yml` — сборка и публикация `out/` на GitHub Pages.
- `src/types/index.ts` — типы `Platform`, `Question`, `Review`, `ScheduleResponse`, `PlatformResponse`, `ApiResult`.
- `src/lib/logger.ts` — уровневый логгер (debug/info/warn/error).
- `src/lib/storage.ts` — безопасные обёртки над localStorage (только в браузере).
- `src/app/layout.tsx` — базовый layout, подключение VKUI CSS и глобальных стилей.
- `src/styles/globals.css` — тема liquid glass (белый/серый/синий), адаптив, безопасные отступы.
- `src/app/page.tsx` — минимальная страница-заглушка (необходима для сборки; расширяется в TASK-07).
- `src/components/AppShell.tsx` — базовый каркас приложения (расширяется в TASK-07).

### Проверки

- `npm install` — `passed`
- `npm run lint` — `passed`
- `npx tsc --noEmit` — `passed`
- `npm test` — `not configured` (тестов нет в TASK-01; появятся в TASK-02..05, vitest: "No test files found")
- `npm run build` — `passed` (статический экспорт в `out/`)

### Для проверки пользователем

- Сборка `npm run build` создаёт `out/` со статическим экспортом.
- `npm run dev` открывает страницу-заглушку «КАФ'26».
- Типы `Platform/Question/Review` соответствуют структуре таблицы из плана.

### Ограничения и риски

- `next@14.2.3` имеет известную security vulnerability (npm audit). Использована версия из рабочего примера по явной просьбе пользователя. Рекомендуется обновить до патченной версии отдельной задачей.
- `npm test` на этапе TASK-01 завершается с кодом 1 ("No test files found") — ожидаемо, тесты появятся в TASK-02..05.
- `next-env.d.ts` в `.gitignore` (пересоздаётся Next.js при сборке).

---

## История

Пока нет записей.