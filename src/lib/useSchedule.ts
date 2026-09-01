'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ScheduleResponse } from '@/types';
import { fetchSchedule } from '@/lib/api';
import { needsFetch, deserialize, serialize } from '@/lib/cache';
import { readStorage, writeStorage } from '@/lib/storage';
import { logger } from '@/lib/logger';

const SCHEDULE_KEY = 'kaf.schedule';

export type ScheduleState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: ScheduleResponse };

/**
 * Загрузка расписания с кэшем (2ч + версия кеша).
 */
export function useSchedule(): ScheduleState {
  const [state, setState] = useState<ScheduleState>({ status: 'loading' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    const cached = deserialize(readStorage(SCHEDULE_KEY));
    const now = Date.now();

    // Если кэш свежий и версия не изменилась — используем его сразу.
    if (cached && !needsFetch(cached, cached.data.cacheVersion, now)) {
      logger.debug('useSchedule: use cache');
      setState({ status: 'ready', data: cached.data });
      return;
    }

    const res = await fetchSchedule();
    if (!res.ok) {
      // При ошибке сети показываем кэш, если он есть.
      if (cached) {
        logger.warn('useSchedule: fetch failed, fallback to cache');
        setState({ status: 'ready', data: cached.data });
        return;
      }
      setState({ status: 'error', message: res.error });
      return;
    }

    writeStorage(SCHEDULE_KEY, serialize({ data: res.data, savedAt: Date.now() }));
    setState({ status: 'ready', data: res.data });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return state;
}
