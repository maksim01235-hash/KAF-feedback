'use client';

import { useEffect, useState } from 'react';
import { currentRoute, onHashChange, type Route } from '@/lib/router';

/**
 * Хук: текущий маршрут с подпиской на изменение хэша.
 */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => currentRoute());

  useEffect(() => {
    // При монтировании перечитываем текущий хэш (важно для глубоких ссылок
    // и гидрации: на сервере хэша нет, а на клиенте он уже может быть задан).
    setRoute(currentRoute());
    const update = () => setRoute(currentRoute());
    const off = onHashChange(update);
    return off;
  }, []);

  return route;
}
