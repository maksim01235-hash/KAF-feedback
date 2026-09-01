/**
 * Хэш-роутинг для статического экспорта.
 * Глубокая ссылка: vk.com/app<id>#<platformId>
 *
 * Формат хэша:
 *   ''            → расписание (главная)
 *   '#<platformId>' → страница площадки
 *   '#ask/<platformId>' → форма вопроса
 *   '#review/<platformId>' → форма отзыва
 *   '#auth'       → авторизация
 */

export type Route =
  | { name: 'schedule' }
  | { name: 'platform'; platformId: string }
  | { name: 'ask'; platformId: string }
  | { name: 'review'; platformId: string }
  | { name: 'auth' };

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

  if (clean === 'auth') return { name: 'auth' };

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

/** Навигация: установить хэш. */
export function navigate(hash: string): void {
  if (!isBrowser) return;
  window.location.hash = hash;
}

/** Подписка на изменение хэша. Возвращает функцию отписки. */
export function onHashChange(cb: () => void): () => void {
  if (!isBrowser) return () => {};
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
}
