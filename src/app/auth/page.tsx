'use client';

import { AppRouter } from '@/components/AppRouter';

/**
 * Страница авторизации (глубокая ссылка /auth).
 * Рендерит единый SPA-роутер; экран определяется хэшем.
 */
export default function AuthPage() {
  return <AppRouter />;
}
