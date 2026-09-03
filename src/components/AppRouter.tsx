'use client';

import { useEffect, useState } from 'react';
import { useRoute } from '@/lib/useRoute';
import { ScheduleScreen } from '@/components/ScheduleScreen';
import { PlatformScreen } from '@/components/PlatformScreen';
import { AskScreen } from '@/components/AskScreen';
import { ReviewScreen } from '@/components/ReviewScreen';

/**
 * Единый SPA-роутер: по текущему хэшу рендерит нужный экран.
 * Все экраны живут на одной странице (главной), переключение — по хэшу.
 *
 * Рендерится только на клиенте (после монтирования), чтобы избежать hydration
 * mismatch: на сервере хэша нет (всегда schedule), а на клиенте по хэшу может
 * быть другой экран (platform/ask/review) с кнопкой «назад» в шапке.
 */
export function AppRouter() {
  const [mounted, setMounted] = useState(false);
  const route = useRoute();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  switch (route.name) {
    case 'platform':
      return <PlatformScreen platformId={route.platformId} />;
    case 'ask':
      return <AskScreen platformId={route.platformId} />;
    case 'review':
      return <ReviewScreen platformId={route.platformId} />;
    case 'schedule':
    default:
      return <ScheduleScreen />;
  }
}
