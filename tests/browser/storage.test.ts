import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  readStorage,
  writeStorage,
  removeStorage,
  readJSON,
  writeJSON,
  readSession,
  writeSession,
  writeSessionJSON,
} from '@/lib/storage';

describe('storage (jsdom)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('readStorage / writeStorage / removeStorage', () => {
    it('writeStorage затем readStorage возвращает значение', () => {
      expect(writeStorage('k', 'v')).toBe(true);
      expect(readStorage('k')).toBe('v');
    });

    it('readStorage отсутствующего ключа → null', () => {
      expect(readStorage('missing')).toBe(null);
    });

    it('removeStorage удаляет значение', () => {
      writeStorage('k', 'v');
      removeStorage('k');
      expect(readStorage('k')).toBe(null);
    });

    it('writeStorage перезаписывает значение', () => {
      writeStorage('k', 'a');
      writeStorage('k', 'b');
      expect(readStorage('k')).toBe('b');
    });
  });

  describe('readJSON / writeJSON', () => {
    it('writeJSON затем readJSON возвращает объект', () => {
      const obj = { a: 1, b: 'x' };
      expect(writeJSON('k', obj)).toBe(true);
      expect(readJSON<{ a: number; b: string }>('k')).toEqual(obj);
    });

    it('readJSON невалидного JSON → null', () => {
      window.localStorage.setItem('k', '{not json');
      expect(readJSON('k')).toBe(null);
    });

    it('readJSON отсутствующего ключа → null', () => {
      expect(readJSON('missing')).toBe(null);
    });
  });

  describe('sessionStorage (readSession / writeSession / writeSessionJSON)', () => {
    beforeEach(() => {
      window.sessionStorage.clear();
    });

    it('writeSession затем readSession возвращает значение', () => {
      expect(writeSession('k', 'v')).toBe(true);
      expect(readSession('k')).toBe('v');
    });

    it('readSession отсутствующего ключа → null', () => {
      expect(readSession('missing')).toBe(null);
    });

    it('writeSessionJSON затем readSession возвращает JSON-строку', () => {
      const obj = { id: 'x', name: 'Иван' };
      expect(writeSessionJSON('k', obj)).toBe(true);
      expect(JSON.parse(readSession('k') as string)).toEqual(obj);
    });
  });

  describe('ошибки localStorage', () => {
    it('readStorage при ошибке getItem → null', () => {
      const spy = vi
        .spyOn(Storage.prototype, 'getItem')
        .mockImplementation(() => {
          throw new Error('denied');
        });
      expect(readStorage('k')).toBe(null);
      spy.mockRestore();
    });

    it('writeStorage при ошибке setItem → false', () => {
      const spy = vi
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {
          throw new Error('denied');
        });
      expect(writeStorage('k', 'v')).toBe(false);
      spy.mockRestore();
    });

    it('removeStorage при ошибке не бросает', () => {
      const spy = vi
        .spyOn(Storage.prototype, 'removeItem')
        .mockImplementation(() => {
          throw new Error('denied');
        });
      expect(() => removeStorage('k')).not.toThrow();
      spy.mockRestore();
    });
  });
});
