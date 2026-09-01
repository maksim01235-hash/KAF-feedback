# Журнал изменений агентов

> Этот файл ведёт агент-исполнитель.
> Новые записи добавляются в начало.
> Не удаляй предыдущие записи.
> Не записывай сюда секреты, токены, `.env`-значения, cookies, credentials или приватные ключи.

## Текущий статус

TASK-20260901-01 выполнен, ожидает подтверждения пользователя перед коммитом.

---

## История

## 2026-09-01 12:50 — TASK-20260901-01 — Скаффолд Next.js-проекта и общая база

**План:** `PLAN-20260901-01`  
**Ветка:** `ai/feature-kaf-feedback`  
**Статус:** `needs-review`  
**Коммит:** `a32511e` (push ожидает настройки remote origin)

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