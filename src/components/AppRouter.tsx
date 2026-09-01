'use client';

import { useRoute } from '@/lib/useRoute';
import { ScheduleScreen } from '@/components/ScheduleScreen';
import { PlatformScreen } from '@/components/PlatformScreen';
import { AskScreen } from '@/components/AskScreen';
import { ReviewScreen } from '@/components/ReviewScreen';
import { AuthScreen } from '@/components/AuthScreen';

/**
 * Единый SPA-роутер: по текущему хэшу рендерит нужный экран.
 * Все экраны живут на одной странице (главной), переключение — по хэшу.
 */
export function AppRouter() {
  const route = useRoute();

  switch (route.name) {
    case 'platform':
      return <PlatformScreen platformId={route.platformId} />;
    case 'ask':
      return <AskScreen platformId={route.platformId} />;
    case 'review':
      return <ReviewScreen platformId={route.platformId} />;
    case 'auth':
      return <AuthScreen />;
    case 'schedule':
    default:
      return <ScheduleScreen />;
  }
}
