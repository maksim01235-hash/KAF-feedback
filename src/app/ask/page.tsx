'use client';

import { AppRouter } from '@/components/AppRouter';

/**
 * Страница «Задать вопрос» (глубокая ссылка /ask#<id>).
 * Рендерит единый SPA-роутер; экран определяется хэшем.
 */
export default function AskPage() {
  return <AppRouter />;
}
