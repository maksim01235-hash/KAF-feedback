'use client';

import { useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { PlatformCard } from '@/components/PlatformCard';
import { StatusView } from '@/components/StatusView';
import { useSchedule } from '@/lib/useSchedule';
import { filterToday, sortByStart } from '@/lib/time';
import { navigate } from '@/lib/router';

function getTzOffset(): number {
  return new Date().getTimezoneOffset();
}

/**
 * Экран «Расписание» (главная).
 */
export function ScheduleScreen() {
  const schedule = useSchedule();
  const [onlyToday, setOnlyToday] = useState(false);

  const tzOffset = useMemo(() => getTzOffset(), []);

  const platforms = useMemo(() => {
    if (schedule.status !== 'ready') return [];
    let list = schedule.data.platforms;
    if (onlyToday) {
      list = filterToday(list, schedule.data.serverTime, tzOffset);
    }
    return sortByStart(list);
  }, [schedule, onlyToday, tzOffset]);

  return (
    <AppShell title="КАФ'26">
      {schedule.status === 'loading' && (
        <StatusView kind="loading" title="Загрузка расписания…" />
      )}

      {schedule.status === 'error' && (
        <StatusView
          kind="error"
          title="Не удалось загрузить расписание"
          description={schedule.message}
          action={
            <button
              type="button"
              className="kaf-btn kaf-btn-primary"
              onClick={() => window.location.reload()}
            >
              Повторить
            </button>
          }
        />
      )}

      {schedule.status === 'ready' && (
        <>
          <div className="kaf-toolbar">
            <label className="kaf-toggle">
              <input
                type="checkbox"
                checked={onlyToday}
                onChange={(e) => setOnlyToday(e.target.checked)}
              />
              <span>Только сегодня</span>
            </label>
            <button
              type="button"
              className="kaf-link"
              onClick={() => navigate('auth')}
            >
              Войти
            </button>
          </div>

          {platforms.length === 0 ? (
            <StatusView
              kind="empty"
              title="Площадок пока нет"
              description="Расписание появится ближе к форуму."
            />
          ) : (
            <div className="kaf-list">
              {platforms.map((p) => (
                <PlatformCard
                  key={p.id}
                  platform={p}
                  serverTimeMs={schedule.data.serverTime}
                />
              ))}
            </div>
          )}
        </>
      )}
    </AppShell>
  );
}
