import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStoredProfile,
  setStoredProfile,
  isAuthenticated,
  type UserProfile,
} from '@/lib/identity';

describe('identity profile (jsdom)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  describe('getStoredProfile', () => {
    it('пусто → null', () => {
      expect(getStoredProfile()).toBe(null);
    });

    it('строка (старый формат) → fallback-профиль без имени', () => {
      window.sessionStorage.setItem('kaf.user', 'anon-123');
      expect(getStoredProfile()).toEqual({
        id: 'anon-123',
        name: '',
        source: 'fallback',
      });
    });

    it('объект (новый формат) → профиль', () => {
      const profile: UserProfile = {
        id: '123',
        name: 'Иван',
        source: 'vk',
      };
      window.sessionStorage.setItem('kaf.user', JSON.stringify(profile));
      expect(getStoredProfile()).toEqual(profile);
    });

    it('невалидный JSON → fallback-профиль из строки', () => {
      window.sessionStorage.setItem('kaf.user', '{broken');
      expect(getStoredProfile()).toEqual({
        id: '{broken',
        name: '',
        source: 'fallback',
      });
    });
  });

  describe('setStoredProfile', () => {
    it('записывает объект в sessionStorage', () => {
      const profile: UserProfile = {
        id: '456',
        name: 'Пётр',
        source: 'vk',
      };
      expect(setStoredProfile(profile)).toBe(true);
      expect(getStoredProfile()).toEqual(profile);
    });
  });

  describe('isAuthenticated', () => {
    it('с именем → true', () => {
      expect(isAuthenticated({ id: '1', name: 'Иван', source: 'vk' })).toBe(
        true
      );
    });

    it('без имени → false', () => {
      expect(
        isAuthenticated({ id: '1', name: '', source: 'fallback' })
      ).toBe(false);
    });

    it('имя из пробелов → false', () => {
      expect(
        isAuthenticated({ id: '1', name: '   ', source: 'fallback' })
      ).toBe(false);
    });

    it('null → false', () => {
      expect(isAuthenticated(null)).toBe(false);
    });

    it('undefined → false', () => {
      expect(isAuthenticated(undefined)).toBe(false);
    });
  });
});
