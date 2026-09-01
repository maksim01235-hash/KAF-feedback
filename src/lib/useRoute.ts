'use client';

import { useEffect, useState } from 'react';
import { currentRoute, onHashChange, type Route } from '@/lib/router';

/**
 * Хук: текущий маршрут с подпиской на изменение хэша.
 */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => currentRoute());

  useEffect(() => {
    const update = () => setRoute(currentRoute());
    const off = onHashChange(update);
    return off;
  }, []);

  return route;
}
