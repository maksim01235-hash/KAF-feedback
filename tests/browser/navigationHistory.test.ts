import { describe, it, expect, beforeEach } from 'vitest';
import {
  pushNavigation,
  popNavigation,
  peekNavigation,
  clearNavigation,
} from '@/lib/navigationHistory';

describe('navigationHistory', () => {
  beforeEach(() => {
    clearNavigation();
  });

  it('push/pop работает как стек (LIFO)', () => {
    pushNavigation('p1');
    pushNavigation('p2');
    expect(peekNavigation()).toBe('p2');
    expect(popNavigation()).toBe('p2');
    expect(popNavigation()).toBe('p1');
    expect(popNavigation()).toBeNull();
  });

  it('peek не извлекает маршрут', () => {
    pushNavigation('p1');
    expect(peekNavigation()).toBe('p1');
    expect(peekNavigation()).toBe('p1');
    expect(popNavigation()).toBe('p1');
  });

  it('пустой стек: pop → null, peek → null', () => {
    expect(popNavigation()).toBeNull();
    expect(peekNavigation()).toBeNull();
  });

  it('clear очищает стек', () => {
    pushNavigation('p1');
    pushNavigation('p2');
    clearNavigation();
    expect(peekNavigation()).toBeNull();
    expect(popNavigation()).toBeNull();
  });
});
