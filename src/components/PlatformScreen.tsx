'use client';

import { useEffect, useState } from 'react';
import type { PlatformResponse } from '@/types';
import { AppShell, backToSchedule } from '@/components/AppShell';
import { PlatformDetail } from '@/components/PlatformDetail';
import { StatusView } from '@/components/StatusView';
import { useCurrentUser } from '@/lib/useCurrentUser';
import { fetchPlatform } from '@/lib/api';

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'notfound' }
  | { status: 'ready'; data: PlatformResponse };

/**
 * Экран «Площадка».
 */
export function PlatformScreen({ platformId }: { platformId: string }) {
  const userId = useCurrentUser();
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    if (!platformId) {
      setState({ status: 'notfound' });
      return;
    }
    let cancelled = false;
    setState({ status: 'loading' });
    fetchPlatform(platformId, userId || '').then((res) => {
      if (cancelled) return;
      if (!res.ok) {
        setState({ status: 'error', message: res.error });
        return;
      }
      setState({ status: 'ready', data: res.data });
    });
    return () => {
      cancelled = true;
    };
  }, [platformId, userId]);

  return (
    <AppShell title="Площадка" onBack={backToSchedule}>
      {state.status === 'loading' && (
        <StatusView kind="loading" title="Загрузка…" />
      )}
      {state.status === 'error' && (
        <StatusView
          kind="error"
          title="Ошибка загрузки"
          description={state.message}
        />
      )}
      {state.status === 'notfound' && (
        <StatusView
          kind="empty"
          title="Площадка не найдена"
          description="Проверьте ссылку."
        />
      )}
      {state.status === 'ready' && (
        <PlatformDetail
          platform={state.data.platform}
          questions={state.data.questions}
          serverTimeMs={state.data.serverTime}
          currentUserId={userId}
        />
      )}
    </AppShell>
  );
}
