import type { Platform } from '@/types';
import { isActive, isPast, formatDateRange } from '@/lib/time';
import { Avatar } from '@/components/Avatar';
import { navigate } from '@/lib/router';

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
  const dateRange = formatDateRange(platform.time_start, platform.time_end);
  const avatarUrl = platform.card_avatar_url || platform.avatar_url;

  return (
    <button
      type="button"
      className={`kaf-card${active ? ' is-active' : ''}${past ? ' is-past' : ''}`}
      onClick={() => navigate(platform.id)}
    >
      {avatarUrl ? (
        <Avatar url={avatarUrl} name={platform.name} size={48} />
      ) : (
        <div
          className="kaf-avatar kaf-avatar-placeholder"
          style={{ width: 48, height: 48 }}
          aria-label={platform.name}
        >
          {platform.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="kaf-card-body">
        <div className="kaf-card-title">{platform.name}</div>
        {platform.subtitle && (
          <div className="kaf-card-subtitle">{platform.subtitle}</div>
        )}
        <div className="kaf-card-meta">
          {dateRange && <span className="kaf-card-time">{dateRange}</span>}
          {platform.location && (
            <span className="kaf-card-location">{platform.location}</span>
          )}
        </div>
      </div>
      {active && <span className="kaf-badge">Сейчас</span>}
    </button>
  );
}
