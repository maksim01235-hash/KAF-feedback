import type { Platform } from '@/types';
import { isActive, isPast } from '@/lib/time';
import { Avatar } from '@/components/Avatar';
import { navigate } from '@/lib/router';

function formatTime(ms: string | number | null | undefined): string {
  if (ms === null || ms === undefined) return '';
  const num = typeof ms === 'number' ? ms : Date.parse(ms);
  if (Number.isNaN(num)) return '';
  const d = new Date(num);
  return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Карточка площадки в списке расписания.
 */
export function PlatformCard({
  platform,
  serverTimeMs,
}: {
  platform: Platform;
  serverTimeMs: number;
}) {
  const active = isActive(platform, serverTimeMs);
  const past = isPast(platform, serverTimeMs);
  const start = formatTime(platform.time_start);
  const end = formatTime(platform.time_end);

  return (
    <button
      type="button"
      className={`kaf-card${active ? ' is-active' : ''}${past ? ' is-past' : ''}`}
      onClick={() => navigate(platform.id)}
    >
      {(platform.card_avatar_url || platform.avatar_url) && (
        <Avatar
          url={platform.card_avatar_url || platform.avatar_url}
          name={platform.name}
          size={48}
        />
      )}
      <div className="kaf-card-body">
        <div className="kaf-card-title">{platform.name}</div>
        {platform.subtitle && (
          <div className="kaf-card-subtitle">{platform.subtitle}</div>
        )}
        <div className="kaf-card-meta">
          {start && end && (
            <span className="kaf-card-time">
              {start}–{end}
            </span>
          )}
          {platform.location && (
            <span className="kaf-card-location">{platform.location}</span>
          )}
        </div>
      </div>
      {active && <span className="kaf-badge">Сейчас</span>}
    </button>
  );
}
