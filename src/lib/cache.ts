import type { ScheduleResponse } from '@/types';

/**
 * Логика кэширования расписания.
 * Кэш живёт 2 часа + принудительное обновление по «версии кеша».
 */

export const DEFAULT_MAX_AGE_MS = 2 * 60 * 60 * 1000; // 2 часа

export interface CachedSchedule {
  /** Данные расписания. */
  data: ScheduleResponse;
  /** Время сохранения кэша (epoch ms). */
  savedAt: number;
}

/** Старше ли кэш maxAgeMs → нужно обновить. */
export function shouldRefresh(
  cached: CachedSchedule | null,
  nowMs: number,
  maxAgeMs = DEFAULT_MAX_AGE_MS
): boolean {
  if (!cached) return true;
  return nowMs - cached.savedAt >= maxAgeMs;
}

/** Изменилась ли версия кеша → нужно обновить. */
export function isCacheVersionChanged(
  cachedVersion: string | undefined,
  serverVersion: string
): boolean {
  if (!cachedVersion) return true;
  return cachedVersion !== serverVersion;
}

/** Комбинированная проверка: нужно ли запрашивать данные. */
export function needsFetch(
  cached: CachedSchedule | null,
  serverVersion: string,
  nowMs: number,
  maxAgeMs = DEFAULT_MAX_AGE_MS
): boolean {
  if (shouldRefresh(cached, nowMs, maxAgeMs)) return true;
  if (cached && isCacheVersionChanged(cached.data.cacheVersion, serverVersion)) {
    return true;
  }
  return false;
}

/** Сериализация кэша для localStorage. */
export function serialize(cached: CachedSchedule): string {
  return JSON.stringify(cached);
}

/** Десериализация кэша из localStorage. Возвращает null при ошибке. */
export function deserialize(raw: string | null): CachedSchedule | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CachedSchedule;
    if (
      !parsed ||
      typeof parsed.savedAt !== 'number' ||
      !parsed.data ||
      !Array.isArray(parsed.data.platforms)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
