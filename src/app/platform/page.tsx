'use client';

import { AppRouter } from '@/components/AppRouter';

/**
 * Страница площадки (глубокая ссылка /platform#<id>).
 * Рендерит единый SPA-роутер; экран определяется хэшем.
 */
export default function PlatformPage() {
  return <AppRouter />;
}
