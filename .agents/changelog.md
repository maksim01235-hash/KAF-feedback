# Журнал изменений агентов

> Этот файл ведёт агент-исполнитель.
> Новые записи добавляются в начало.
> Не удаляй предыдущие записи.
> Не записывай сюда секреты, токены, `.env`-значения, cookies, credentials или приватные ключи.

## Текущий статус

Все задачи TASK-20260901-01 … 08 выполнены и запушены. Исправлен баг хэш-роутинга (SPA на одной странице), дополнена документация. Ветка `main` создана и стала default branch. GitHub Pages настроен и сайт опубликован: `https://maksim01235-hash.github.io/KAF-feedback/`.

---

## История

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