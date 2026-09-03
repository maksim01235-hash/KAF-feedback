# Результаты тестов — KAF-feedback

**Дата запуска:** 2026-09-03 17:03
**Команда:** `npm test` (vitest run)
**Версия vitest:** v1.6.1

## Итог

- **Тестовых файлов:** 13 passed (13)
- **Тестов:** 118 passed (118)
- **Провалов:** 0
- **Длительность:** ~5.2s

---

## По файлам

| Файл | Тестов | Статус |
|------|--------|--------|
| `tests/cache.test.ts` | 15 | ✅ passed |
| `tests/time.test.ts` | 15 | ✅ passed |
| `tests/permissions.test.ts` | 7 | ✅ passed |
| `tests/validation.test.ts` | 21 | ✅ passed |
| `tests/api.test.ts` | 11 | ✅ passed |
| `tests/browser/router.test.ts` | 9 | ✅ passed |
| `tests/browser/identity.test.ts` | 10 | ✅ passed |
| `tests/browser/storage.test.ts` | 10 | ✅ passed |
| `tests/components/Avatar.test.tsx` | 4 | ✅ passed |
| `tests/components/StatusView.test.tsx` | 5 | ✅ passed |
| `tests/components/StarRating.test.tsx` | 4 | ✅ passed |
| `tests/components/QuestionForm.test.tsx` | 4 | ✅ passed |
| `tests/components/ReviewForm.test.tsx` | 3 | ✅ passed |

---

## Детально по каждому тесту

### `tests/cache.test.ts` (15)

- ✅ `shouldRefresh` > нет кэша — true
- ✅ `shouldRefresh` > свежий кэш — false
- ✅ `shouldRefresh` > кэш старше 2ч — true
- ✅ `shouldRefresh` > ровно 2ч — true (>= maxAge)
- ✅ `isCacheVersionChanged` > нет кэшированной версии — true
- ✅ `isCacheVersionChanged` > версии совпадают — false
- ✅ `isCacheVersionChanged` > версии различаются — true
- ✅ `needsFetch` > нет кэша — true
- ✅ `needsFetch` > свежий кэш и та же версия — false
- ✅ `needsFetch` > свежий кэш, но версия изменилась — true
- ✅ `needsFetch` > устаревший кэш — true даже при той же версии
- ✅ `serialize/deserialize` > круговая сериализация
- ✅ `serialize/deserialize` > null для пустой строки
- ✅ `serialize/deserialize` > null для невалидного JSON
- ✅ `serialize/deserialize` > null для некорректной структуры

### `tests/time.test.ts` (15)

- ✅ `parseIsoToMs` > парсит валидную ISO-строку UTC
- ✅ `parseIsoToMs` > возвращает NaN для невалидной строки
- ✅ `isActive` > не активна до начала
- ✅ `isActive` > активна ровно в момент начала
- ✅ `isActive` > активна во время
- ✅ `isActive` > не активна ровно в момент конца (полуинтервал)
- ✅ `isActive` > не активна после конца
- ✅ `isActive` > несколько активных одновременно
- ✅ `isActive` > возвращает false при невалидных датах
- ✅ `localDateString` > корректно учитывает смещение часового пояса
- ✅ `isToday` > площадка в тот же локальный день
- ✅ `isToday` > площадка в другой локальный день
- ✅ `filterToday` > фильтрует только площадки текущего дня
- ✅ `sortByStart` > сортирует по времени начала
- ✅ `sortByStart` > не мутирует исходный массив

### `tests/permissions.test.ts` (7)

- ✅ `canEditQuestion` > совпадение vk_user_id — true
- ✅ `canEditQuestion` > несовпадение vk_user_id — false
- ✅ `canEditQuestion` > пустой currentUserId — false
- ✅ `canEditQuestion` > пустой vk_user_id вопроса — false
- ✅ `canDeleteQuestion` > совпадение vk_user_id — true
- ✅ `canDeleteQuestion` > несовпадение — false
- ✅ `canDeleteQuestion` > пустой currentUserId — false

### `tests/validation.test.ts` (21)

- ✅ `validateName` > пустое имя — ошибка
- ✅ `validateName` > валидное имя — null
- ✅ `validateName` > недопустимые символы — ошибка
- ✅ `validateName` > слишком длинное имя — ошибка
- ✅ `validateText` > пустой текст — ошибка
- ✅ `validateText` > валидный текст — null
- ✅ `validateText` > недопустимые символы — ошибка
- ✅ `validateRating` > обязательная оценка без значения — ошибка
- ✅ `validateRating` > опциональная оценка без значения — null
- ✅ `validateRating` > валидные значения 1–5 — null
- ✅ `validateRating` > вне диапазона — ошибка
- ✅ `validateQuestionForm` > пустая форма — ошибки по name и text
- ✅ `validateQuestionForm` > валидная форма без оценки — без ошибок
- ✅ `validateQuestionForm` > валидная форма с оценкой — без ошибок
- ✅ `validateReviewForm` > отзыв без оценки — ошибка rating
- ✅ `validateReviewForm` > валидный отзыв — без ошибок
- ✅ `isWithinThrottle` > нет последней отправки — false (можно отправлять)
- ✅ `isWithinThrottle` > меньше 10 секунд — true (нельзя)
- ✅ `isWithinThrottle` > ровно 10 секунд — false (можно)
- ✅ `isWithinThrottle` > больше 10 секунд — false (можно)
- ✅ `isWithinThrottle` > учитывает кастомный интервал

### `tests/api.test.ts` (11)

- ✅ `api` > `fetchSchedule` > успешный ответ
- ✅ `api` > `fetchSchedule` > HTTP-ошибка
- ✅ `api` > `fetchSchedule` > ok: false от сервера
- ✅ `api` > `fetchSchedule` > ошибка сети
- ✅ `api` > `fetchPlatform` > передаёт параметры в URL
- ✅ `api` > POST-функции > addQuestion отправляет POST с text/plain и JSON-телом
- ✅ `api` > POST-функции > editQuestion отправляет POST с text/plain и JSON-телом
- ✅ `api` > POST-функции > deleteQuestion отправляет POST с text/plain и JSON-телом
- ✅ `api` > POST-функции > addReview отправляет POST с text/plain и JSON-телом
- ✅ `api` > `isApiConfigured` > в node-окружении (без window) → false
- ✅ `api` > BASE_URL не задан > возвращает «Сервер не настроен»

### `tests/browser/router.test.ts` (9)

- ✅ `parseHash` > пустой хэш → schedule
- ✅ `parseHash` > хэш без решётки → schedule
- ✅ `parseHash` > простой id → platform
- ✅ `parseHash` > ask/<id> → ask
- ✅ `parseHash` > review/<id> → review
- ✅ `parseHash` > неизвестный префикс → platform
- ✅ `parseHash` > обрезка пробелов вокруг хэша
- ✅ `parseHash` > ask/ без id → platform (не ask)
- ✅ `parseHash` > review/ без id → platform (не review)

### `tests/browser/identity.test.ts` (10)

- ✅ `identity profile (jsdom)` > `getStoredProfile` > пусто → null
- ✅ `identity profile (jsdom)` > `getStoredProfile` > строка (старый формат) → fallback-профиль без имени
- ✅ `identity profile (jsdom)` > `getStoredProfile` > объект (новый формат) → профиль
- ✅ `identity profile (jsdom)` > `getStoredProfile` > невалидный JSON → fallback-профиль из строки
- ✅ `identity profile (jsdom)` > `setStoredProfile` > записывает объект в localStorage
- ✅ `identity profile (jsdom)` > `isAuthenticated` > с именем → true
- ✅ `identity profile (jsdom)` > `isAuthenticated` > без имени → false
- ✅ `identity profile (jsdom)` > `isAuthenticated` > имя из пробелов → false
- ✅ `identity profile (jsdom)` > `isAuthenticated` > null → false
- ✅ `identity profile (jsdom)` > `isAuthenticated` > undefined → false

### `tests/browser/storage.test.ts` (10)

- ✅ `storage (jsdom)` > readStorage / writeStorage / removeStorage > writeStorage затем readStorage возвращает значение
- ✅ `storage (jsdom)` > readStorage / writeStorage / removeStorage > readStorage отсутствующего ключа → null
- ✅ `storage (jsdom)` > readStorage / writeStorage / removeStorage > removeStorage удаляет значение
- ✅ `storage (jsdom)` > readStorage / writeStorage / removeStorage > writeStorage перезаписывает значение
- ✅ `storage (jsdom)` > readJSON / writeJSON > writeJSON затем readJSON возвращает объект
- ✅ `storage (jsdom)` > readJSON / writeJSON > readJSON невалидного JSON → null
- ✅ `storage (jsdom)` > readJSON / writeJSON > readJSON отсутствующего ключа → null
- ✅ `storage (jsdom)` > ошибки localStorage > readStorage при ошибке getItem → null
- ✅ `storage (jsdom)` > ошибки localStorage > writeStorage при ошибке setItem → false
- ✅ `storage (jsdom)` > ошибки localStorage > removeStorage при ошибке не бросает

### `tests/components/Avatar.test.tsx` (4)

- ✅ `Avatar` > без src → placeholder с инициалом
- ✅ `Avatar` > с src → img с alt
- ✅ `Avatar` > пустое имя → инициал «?»
- ✅ `Avatar` > применяет размер

### `tests/components/StatusView.test.tsx` (5)

- ✅ `StatusView` > рендерит loading с заголовком
- ✅ `StatusView` > рендерит error с описанием
- ✅ `StatusView` > рендерит empty
- ✅ `StatusView` > рендерит action (кнопку)
- ✅ `StatusView` > не рендерит описание, если его нет

### `tests/components/StarRating.test.tsx` (4)

- ✅ `StarRating` > рендерит 5 звёзд
- ✅ `StarRating` > клик по звезде вызывает onChange с номером
- ✅ `StarRating` > disabled (readOnly) — клик не работает
- ✅ `StarRating` > заполняет звёзды до значения

### `tests/components/QuestionForm.test.tsx` (4)

- ✅ `QuestionForm` > валидная форма вызывает onSubmit
- ✅ `QuestionForm` > пустая форма при сабмите показывает ошибки
- ✅ `QuestionForm` > initialName предзаполняет поле имени
- ✅ `QuestionForm` > кнопка показывает «Сохранить» при редактировании

### `tests/components/ReviewForm.test.tsx` (3)

- ✅ `ReviewForm` > валидная форма вызывает onSubmit с rating
- ✅ `ReviewForm` > без rating при сабмите показывает ошибку
- ✅ `ReviewForm` > initialName предзаполняет поле имени

---

## Примечания

- Все 118 тестов проходят.
- В выводе присутствуют ожидаемые `stderr`-сообщения от модулей (`[KAF:storage]`, `[KAF:error]`, `[KAF:debug]`) — это логи приложения, не ошибки тестов.
- Предупреждение «The CJS build of Vite's Node API is deprecated» — не влияет на результат.
