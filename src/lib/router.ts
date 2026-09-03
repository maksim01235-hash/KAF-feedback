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

import { pushNavigation, popNavigation } from '@/lib/navigationHistory';

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

/** Навигация: установить хэш. Перед переходом сохраняет текущий маршрут в историю. */
export function navigate(hash: string): void {
  if (!isBrowser) return;
  pushNavigation(getHash());
  window.location.hash = hash;
}

/** Вернуться на предыдущий маршрут приложения. Если истории нет — на расписание. */
export function goBack(): void {
  if (!isBrowser) return;
  const prev = popNavigation();
  window.location.hash = prev === null ? '' : prev;
}

/** Подписка на изменение хэша. Возвращает функцию отписки. */
export function onHashChange(cb: () => void): () => void {
  if (!isBrowser) return () => {};
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
}
