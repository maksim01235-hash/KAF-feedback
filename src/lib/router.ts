/**
 * Хэш-роутинг для статического экспорта.
 * Глубокая ссылка: vk.com/app<id>#<platformId>
 *
 * Формат хэша:
 *   ''            → расписание (главная)
 *   '#<platformId>' → страница площадки
 *   '#ask/<platformId>' → форма вопроса
 *   '#review/<platformId>' → форма отзыва
 */

import { pushNavigation, popNavigation, peekNavigation } from '@/lib/navigationHistory';

export type Route =
  | { name: 'schedule' }
  | { name: 'platform'; platformId: string }
  | { name: 'ask'; platformId: string }
  | { name: 'review'; platformId: string };

const isBrowser = typeof window !== 'undefined';

/** Прочитать текущий хэш (без '#'). */
export function getHash(): string {
  if (!isBrowser) return '';
  return window.location.hash.replace(/^#/, '');
}

/** Разобрать хэш в маршрут. */
export function parseHash(hash: string): Route {
  const clean = hash.replace(/^#/, '').trim();
  if (!clean) return { name: 'schedule' };

  const parts = clean.split('/');
  if (parts[0] === 'ask' && parts[1]) {
    return { name: 'ask', platformId: parts[1] };
  }
  if (parts[0] === 'review' && parts[1]) {
    return { name: 'review', platformId: parts[1] };
  }
  // Иначе считаем, что это platformId
  return { name: 'platform', platformId: clean };
}

/** Текущий маршрут. */
export function currentRoute(): Route {
  return parseHash(getHash());
}

/** Маршруты, которые не пишутся в историю (экран авторизации). */
const AUTH_ROUTES = ['ask/', 'review/'];

/** Является ли хэш маршрутом авторизации (ask/review). */
function isAuthHash(hash: string): boolean {
  return AUTH_ROUTES.some((prefix) => hash.startsWith(prefix));
}

/** Навигация: установить хэш. Перед переходом сохраняет текущий маршрут в историю.
 *  Текущий маршрут пушится всегда, если он не ask/review (экран авторизации не
 *  возвращается кнопкой «назад»). Это сохраняет площадку при переходе на ask/review.
 *  При submit (возврат на площадку с ask/review), если верхушка стека совпадает с
 *  целевым маршрутом — убираем её, чтобы избежать двойного «назад» после submit. */
export function navigate(hash: string): void {
  if (!isBrowser) return;
  const current = getHash();
  if (current === hash) return; // переход на тот же маршрут — no-op
  if (!isAuthHash(current)) {
    pushNavigation(current);
  } else if (peekNavigation() === hash) {
    // Возврат с ask/review на площадку: верхушка стека уже содержит площадку —
    // убираем её, чтобы «назад» после submit не возвращал на неё повторно.
    popNavigation();
  }
  internalNav = true;
  window.location.hash = hash;
}

/** Вернуться на предыдущий маршрут приложения. Если истории нет — на расписание. */
export function goBack(): void {
  if (!isBrowser) return;
  const prev = popNavigation();
  const target = prev === null ? '' : prev;
  if (getHash() === target) return; // уже на целевом маршруте
  internalNav = true;
  window.location.hash = target;
}

// Флаг: изменение хэша инициировано самим приложением (navigate/goBack),
// а не браузером (кнопки «назад»/«вперёд»). Используется для синхронизации
// стека sessionStorage с историей браузера.
let internalNav = false;
// Предыдущий хэш до последнего изменения — нужен для восстановления стека
// при переходе «вперёд» браузером.
let prevHash = isBrowser ? getHash() : '';

/** Подписка на изменение хэша. Возвращает функцию отписки.
 *  Синхронизирует стек sessionStorage с историей браузера: при «назад» браузера
 *  извлекает маршрут из стека, при «вперёд» — восстанавливает источник. */
export function onHashChange(cb: () => void): () => void {
  if (!isBrowser) return () => {};
  const handler = () => {
    const hash = getHash();
    if (internalNav) {
      internalNav = false;
    } else {
      // Изменение хэша браузером (кнопки «назад»/«вперёд»).
      if (!isAuthHash(hash)) {
        const top = peekNavigation();
        if (top === hash) {
          // Возврат на известную позицию — извлекаем её из стека.
          popNavigation();
        } else if (!isAuthHash(prevHash)) {
          // Переход «вперёд» на новую позицию — восстанавливаем источник.
          pushNavigation(prevHash);
        }
      }
    }
    prevHash = hash;
    cb();
  };
  window.addEventListener('hashchange', handler);
  return () => window.removeEventListener('hashchange', handler);
}
