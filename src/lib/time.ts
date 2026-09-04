import type { Platform } from '@/types';

/**
 * Логика времени и активности площадок.
 * Время в таблице — ISO 8601 UTC без смещения. GAS нормализует в UTC epoch ms.
 */

/** Парсинг времени в epoch ms. Принимает ISO-строку UTC или уже число (epoch ms). */
export function parseIsoToMs(iso: string | number): number {
  if (typeof iso === 'number') return Number.isNaN(iso) ? NaN : iso;
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? NaN : ms;
}

/**
 * Активна ли площадка в момент serverTime (UTC).
 * Активность: time_start <= serverTime < time_end.
 */
export function isActive(platform: Platform, serverTimeMs: number): boolean {
  const start = parseIsoToMs(platform.time_start);
  const end = parseIsoToMs(platform.time_end);
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  return start <= serverTimeMs && serverTimeMs < end;
}

/**
 * Прошла ли площадка (завершилась) к моменту serverTime (UTC).
 * Прошедшая: serverTime >= time_end.
 */
export function isPast(platform: Platform, serverTimeMs: number): boolean {
  const end = parseIsoToMs(platform.time_end);
  if (Number.isNaN(end)) return false;
  return serverTimeMs >= end;
}

/**
 * Локальная дата пользователя (YYYY-MM-DD) из serverTime + смещение устройства.
 * tzOffsetMinutes — смещение в минутах (getTimezoneOffset() возвращает обратный знак).
 */
export function localDateString(
  serverTimeMs: number,
  tzOffsetMinutes: number
): string {
  const localMs = serverTimeMs - tzOffsetMinutes * 60 * 1000;
  const d = new Date(localMs);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Проходит ли площадка в «текущий день» пользователя.
 * Сравниваем локальную дату начала площадки с локальной датой serverTime.
 */
export function isToday(
  platform: Platform,
  serverTimeMs: number,
  tzOffsetMinutes: number
): boolean {
  const start = parseIsoToMs(platform.time_start);
  if (Number.isNaN(start)) return false;
  return (
    localDateString(start, tzOffsetMinutes) ===
    localDateString(serverTimeMs, tzOffsetMinutes)
  );
}

/** Фильтр площадок по «текущему дню». */
export function filterToday(
  platforms: Platform[],
  serverTimeMs: number,
  tzOffsetMinutes: number
): Platform[] {
  return platforms.filter((p) => isToday(p, serverTimeMs, tzOffsetMinutes));
}

/** Сортировка площадок по времени начала (по возрастанию). */
export function sortByStart(platforms: Platform[]): Platform[] {
  return [...platforms].sort((a, b) => {
    const aMs = parseIsoToMs(a.time_start);
    const bMs = parseIsoToMs(b.time_start);
    if (Number.isNaN(aMs)) return 1;
    if (Number.isNaN(bMs)) return -1;
    return aMs - bMs;
  });
}

/**
 * Форматировать диапазон времени площадки как «5 сентября, 14:00-16:00».
 * Использует локальную дату/время пользователя (с учётом часового пояса устройства).
 * При невалидных датах возвращает пустую строку.
 */
export function formatDateRange(
  timeStart: string | number,
  timeEnd: string | number
): string {
  const start = parseIsoToMs(timeStart);
  const end = parseIsoToMs(timeEnd);
  if (Number.isNaN(start) || Number.isNaN(end)) return '';
  const startDate = new Date(start);
  const endDate = new Date(end);
  const datePart = startDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
  const startTime = startDate.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = endDate.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${datePart}, ${startTime}-${endTime}`;
}
