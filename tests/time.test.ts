import { describe, it, expect } from 'vitest';
import type { Platform } from '@/types';
import {
  parseIsoToMs,
  isActive,
  isToday,
  filterToday,
  sortByStart,
  localDateString,
  formatDateRange,
} from '@/lib/time';

function makePlatform(overrides: Partial<Platform> = {}): Platform {
  return {
    id: 'p1',
    name: 'Площадка',
    time_start: '2026-09-01T04:00:00Z',
    time_end: '2026-09-01T06:00:00Z',
    ...overrides,
  };
}

describe('parseIsoToMs', () => {
  it('парсит валидную ISO-строку UTC', () => {
    const ms = parseIsoToMs('2026-09-01T04:00:00Z');
    expect(Number.isNaN(ms)).toBe(false);
    expect(ms).toBe(Date.parse('2026-09-01T04:00:00Z'));
  });

  it('возвращает NaN для невалидной строки', () => {
    expect(Number.isNaN(parseIsoToMs('not-a-date'))).toBe(true);
  });
});

describe('isActive', () => {
  const p = makePlatform();

  it('не активна до начала', () => {
    expect(isActive(p, Date.parse('2026-09-01T03:59:59Z'))).toBe(false);
  });

  it('активна ровно в момент начала', () => {
    expect(isActive(p, Date.parse('2026-09-01T04:00:00Z'))).toBe(true);
  });

  it('активна во время', () => {
    expect(isActive(p, Date.parse('2026-09-01T05:00:00Z'))).toBe(true);
  });

  it('не активна ровно в момент конца (полуинтервал)', () => {
    expect(isActive(p, Date.parse('2026-09-01T06:00:00Z'))).toBe(false);
  });

  it('не активна после конца', () => {
    expect(isActive(p, Date.parse('2026-09-01T07:00:00Z'))).toBe(false);
  });

  it('несколько активных одновременно', () => {
    const a = makePlatform({
      id: 'a',
      time_start: '2026-09-01T04:00:00Z',
      time_end: '2026-09-01T08:00:00Z',
    });
    const b = makePlatform({
      id: 'b',
      time_start: '2026-09-01T05:00:00Z',
      time_end: '2026-09-01T07:00:00Z',
    });
    const now = Date.parse('2026-09-01T06:00:00Z');
    expect(isActive(a, now)).toBe(true);
    expect(isActive(b, now)).toBe(true);
  });

  it('возвращает false при невалидных датах', () => {
    const bad = makePlatform({ time_start: 'bad', time_end: 'bad' });
    expect(isActive(bad, Date.now())).toBe(false);
  });
});

describe('localDateString', () => {
  it('корректно учитывает смещение часового пояса', () => {
    // 2026-09-01T00:00:00Z при UTC+7 (offset -420) → 2026-09-01
    const ms = Date.parse('2026-09-01T00:00:00Z');
    expect(localDateString(ms, -420)).toBe('2026-09-01');
    // при UTC-7 (offset +420) → 2026-08-31
    expect(localDateString(ms, 420)).toBe('2026-08-31');
  });
});

describe('isToday', () => {
  it('площадка в тот же локальный день', () => {
    const p = makePlatform({ time_start: '2026-09-01T04:00:00Z' });
    const now = Date.parse('2026-09-01T12:00:00Z');
    // UTC+7: начало 11:00, now 19:00 — один день
    expect(isToday(p, now, -420)).toBe(true);
  });

  it('площадка в другой локальный день', () => {
    const p = makePlatform({ time_start: '2026-09-01T04:00:00Z' });
    const now = Date.parse('2026-09-02T12:00:00Z');
    expect(isToday(p, now, -420)).toBe(false);
  });
});

describe('filterToday', () => {
  it('фильтрует только площадки текущего дня', () => {
    const today = makePlatform({ id: 't', time_start: '2026-09-01T04:00:00Z' });
    const other = makePlatform({ id: 'o', time_start: '2026-09-05T04:00:00Z' });
    const now = Date.parse('2026-09-01T12:00:00Z');
    const result = filterToday([today, other], now, -420);
    expect(result.map((p) => p.id)).toEqual(['t']);
  });
});

describe('sortByStart', () => {
  it('сортирует по времени начала', () => {
    const late = makePlatform({ id: 'late', time_start: '2026-09-01T10:00:00Z' });
    const early = makePlatform({ id: 'early', time_start: '2026-09-01T04:00:00Z' });
    const mid = makePlatform({ id: 'mid', time_start: '2026-09-01T07:00:00Z' });
    expect(sortByStart([late, early, mid]).map((p) => p.id)).toEqual([
      'early',
      'mid',
      'late',
    ]);
  });

  it('не мутирует исходный массив', () => {
    const arr = [
      makePlatform({ id: 'b', time_start: '2026-09-01T10:00:00Z' }),
      makePlatform({ id: 'a', time_start: '2026-09-01T04:00:00Z' }),
    ];
    sortByStart(arr);
    expect(arr[0].id).toBe('b');
  });
});

describe('formatDateRange', () => {
  it('форматирует как «5 сентября, 14:00-16:00» (структура)', () => {
    // 2026-09-05T14:00:00Z — локальное время зависит от часового пояса устройства,
    // поэтому проверяем структуру и месяц, а не конкретные часы.
    const result = formatDateRange(
      '2026-09-05T14:00:00Z',
      '2026-09-05T16:00:00Z'
    );
    // День и месяц (генитив) + диапазон времени
    expect(result).toMatch(/^\d{1,2} сентября, \d{2}:\d{2}-\d{2}:\d{2}$/);
    expect(result).toContain('сентября');
  });

  it('диапазон времени соответствует разнице в 2 часа', () => {
    const result = formatDateRange(
      '2026-09-05T14:00:00Z',
      '2026-09-05T16:00:00Z'
    );
    const match = result.match(/(\d{2}:\d{2})-(\d{2}:\d{2})$/);
    expect(match).not.toBeNull();
    const [start, end] = [match![1], match![2]];
    const startMin = parseInt(start.split(':')[0], 10) * 60 + parseInt(start.split(':')[1], 10);
    const endMin = parseInt(end.split(':')[0], 10) * 60 + parseInt(end.split(':')[1], 10);
    expect(endMin - startMin).toBe(120);
  });

  it('возвращает пустую строку при невалидных датах', () => {
    expect(formatDateRange('bad', '2026-09-05T16:00:00Z')).toBe('');
    expect(formatDateRange('2026-09-05T14:00:00Z', 'bad')).toBe('');
    expect(formatDateRange('bad', 'bad')).toBe('');
  });
});
