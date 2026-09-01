'use client';

import { AppRouter } from '@/components/AppRouter';

/**
 * Главная страница — единый SPA с хэш-роутингом.
 * Все экраны (расписание, площадка, вопрос, отзыв, авторизация)
 * рендерятся здесь в зависимости от текущего хэша.
 */
export default function HomePage() {
  return <AppRouter />;
}
