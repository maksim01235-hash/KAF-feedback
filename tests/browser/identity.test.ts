import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStoredProfile,
  setStoredProfile,
  getFallbackIdentity,
  setFallbackIdentity,
  getOrCreateFallbackProfile,
  getInitialProfile,
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

  describe('getFallbackIdentity / setFallbackIdentity (sessionStorage)', () => {
    it('пусто → null', () => {
      expect(getFallbackIdentity()).toBe(null);
    });

    it('setFallbackIdentity пишет в sessionStorage и читается обратно', () => {
      expect(setFallbackIdentity('anon-xyz')).toBe(true);
      expect(getFallbackIdentity()).toBe('anon-xyz');
      // id стабилен на время сессии (sessionStorage)
      expect(window.sessionStorage.getItem('kaf.user')).toBeTruthy();
    });

    it('id стабилен на время сессии (не пересоздаётся)', () => {
      const first = getOrCreateFallbackProfile().id;
      const second = getOrCreateFallbackProfile().id;
      expect(second).toBe(first);
    });
  });

  describe('getOrCreateFallbackProfile', () => {
    it('создаёт уникальный анонимный id (не «anon») и сохраняет в sessionStorage', () => {
      const profile = getOrCreateFallbackProfile();
      expect(profile.source).toBe('fallback');
      expect(profile.id).toMatch(/^anon-/);
      expect(profile.id).not.toBe('anon');
      // сохранён в sessionStorage
      expect(getStoredProfile()).toEqual(profile);
    });

    it('возвращает сохранённый профиль, если он есть', () => {
      const existing: UserProfile = {
        id: 'saved-id',
        name: '',
        source: 'fallback',
      };
      setStoredProfile(existing);
      expect(getOrCreateFallbackProfile()).toEqual(existing);
    });
  });

  describe('getInitialProfile', () => {
    it('вне VK возвращает стабильный анонимный профиль', () => {
      // В jsdom нет VK launch params → isVkEnvironment() === false
      const profile = getInitialProfile();
      expect(profile).not.toBeNull();
      expect(profile?.source).toBe('fallback');
      expect(profile?.id).toMatch(/^anon-/);
    });

    it('в VK без сохранённого профиля → null (показать auth)', () => {
      // Эмулируем VK launch params
      const originalSearch = window.location.search;
      Object.defineProperty(window, 'location', {
        value: { ...window.location, search: '?vk_app_id=123' },
        writable: true,
      });
      try {
        expect(getInitialProfile()).toBe(null);
      } finally {
        Object.defineProperty(window, 'location', {
          value: { ...window.location, search: originalSearch },
          writable: true,
        });
      }
    });

    it('в VK с сохранённым профилем → профиль (auth не показывается)', () => {
      const originalSearch = window.location.search;
      Object.defineProperty(window, 'location', {
        value: { ...window.location, search: '?vk_app_id=123' },
        writable: true,
      });
      const profile: UserProfile = {
        id: 'vk-1',
        name: 'Иван',
        source: 'vk',
      };
      setStoredProfile(profile);
      try {
        expect(getInitialProfile()).toEqual(profile);
      } finally {
        Object.defineProperty(window, 'location', {
          value: { ...window.location, search: originalSearch },
          writable: true,
        });
      }
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
