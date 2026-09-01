'use client';

import { AppRouter } from '@/components/AppRouter';

/**
 * Страница «Оставить отзыв» (глубокая ссылка /review#<id>).
 * Рендерит единый SPA-роутер; экран определяется хэшем.
 */
export default function ReviewPage() {
  return <AppRouter />;
}
