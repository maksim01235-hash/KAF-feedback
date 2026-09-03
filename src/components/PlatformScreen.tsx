'use client';

import { useEffect, useState } from 'react';
import type { PlatformResponse } from '@/types';
import { AppShell } from '@/components/AppShell';
import { PlatformDetail } from '@/components/PlatformDetail';
import { StatusView } from '@/components/StatusView';
import { useCurrentUser } from '@/lib/useCurrentUser';
import { fetchPlatform, deleteQuestion } from '@/lib/api';

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

  async function handleDeleteQuestion(id: string): Promise<boolean> {
    if (!userId) return false;
    const res = await deleteQuestion(id, userId);
    if (res.ok) {
      setState((prev) =>
        prev.status === 'ready'
          ? {
              ...prev,
              data: {
                ...prev.data,
                questions: prev.data.questions.filter((q) => q.id !== id),
              },
            }
          : prev
      );
    }
    return res.ok;
  }

  return (
    <AppShell title="Площадка">
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
          onDeleteQuestion={handleDeleteQuestion}
        />
      )}
    </AppShell>
  );
}
