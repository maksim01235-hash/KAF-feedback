import { describe, it, expect } from 'vitest';
import type { ScheduleResponse } from '@/types';
import {
  shouldRefresh,
  isCacheVersionChanged,
  needsFetch,
  serialize,
  deserialize,
  DEFAULT_MAX_AGE_MS,
} from '@/lib/cache';

function makeSchedule(version = 'v1'): ScheduleResponse {
  return {
    platforms: [],
    cacheVersion: version,
    serverTime: Date.parse('2026-09-01T12:00:00Z'),
  };
}

function makeCached(version = 'v1', savedAt = 1_000_000) {
  return { data: makeSchedule(version), savedAt };
}

describe('shouldRefresh', () => {
  it('нет кэша — true', () => {
    expect(shouldRefresh(null, 1_000_000)).toBe(true);
  });

  it('свежий кэш — false', () => {
    const cached = makeCached('v1', 1_000_000);
    expect(shouldRefresh(cached, 1_000_000 + 1000)).toBe(false);
  });

  it('кэш старше 2ч — true', () => {
    const cached = makeCached('v1', 1_000_000);
    expect(shouldRefresh(cached, 1_000_000 + DEFAULT_MAX_AGE_MS)).toBe(true);
  });

  it('ровно 2ч — true (>= maxAge)', () => {
    const cached = makeCached('v1', 1_000_000);
    expect(shouldRefresh(cached, 1_000_000 + DEFAULT_MAX_AGE_MS)).toBe(true);
  });
});

describe('isCacheVersionChanged', () => {
  it('нет кэшированной версии — true', () => {
    expect(isCacheVersionChanged(undefined, 'v2')).toBe(true);
  });

  it('версии совпадают — false', () => {
    expect(isCacheVersionChanged('v1', 'v1')).toBe(false);
  });

  it('версии различаются — true', () => {
    expect(isCacheVersionChanged('v1', 'v2')).toBe(true);
  });
});

describe('needsFetch', () => {
  it('нет кэша — true', () => {
    expect(needsFetch(null, 'v1', 1_000_000)).toBe(true);
  });

  it('свежий кэш и та же версия — false', () => {
    const cached = makeCached('v1', 1_000_000);
    expect(needsFetch(cached, 'v1', 1_000_000 + 1000)).toBe(false);
  });

  it('свежий кэш, но версия изменилась — true', () => {
    const cached = makeCached('v1', 1_000_000);
    expect(needsFetch(cached, 'v2', 1_000_000 + 1000)).toBe(true);
  });

  it('устаревший кэш — true даже при той же версии', () => {
    const cached = makeCached('v1', 1_000_000);
    expect(
      needsFetch(cached, 'v1', 1_000_000 + DEFAULT_MAX_AGE_MS)
    ).toBe(true);
  });
});

describe('serialize/deserialize', () => {
  it('круговая сериализация', () => {
    const cached = makeCached('v1', 123456);
    const raw = serialize(cached);
    const back = deserialize(raw);
    expect(back).toEqual(cached);
  });

  it('null для пустой строки', () => {
    expect(deserialize(null)).toBeNull();
    expect(deserialize('')).toBeNull();
  });

  it('null для невалидного JSON', () => {
    expect(deserialize('{not json')).toBeNull();
  });

  it('null для некорректной структуры', () => {
    expect(deserialize('{"foo":1}')).toBeNull();
  });
});
