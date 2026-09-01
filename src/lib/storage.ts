/**
 * Безопасные обёртки над localStorage.
 * Работают только в браузере; в SSR/Node возвращают null/undefined без ошибок.
 */

const isBrowser = typeof window !== 'undefined';

/** Прочитать значение из localStorage. Возвращает null, если недоступно или отсутствует. */
export function readStorage(key: string): string | null {
  if (!isBrowser) return null;
  try {
    return window.localStorage.getItem(key);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[KAF:storage] read failed', key, err);
    return null;
  }
}

/** Записать значение в localStorage. Возвращает true при успехе. */
export function writeStorage(key: string, value: string): boolean {
  if (!isBrowser) return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[KAF:storage] write failed', key, err);
    return false;
  }
}

/** Удалить значение из localStorage. */
export function removeStorage(key: string): void {
  if (!isBrowser) return;
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[KAF:storage] remove failed', key, err);
  }
}

/** Прочитать JSON-значение. Возвращает null при отсутствии или ошибке парсинга. */
export function readJSON<T>(key: string): T | null {
  const raw = readStorage(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[KAF:storage] JSON parse failed', key, err);
    return null;
  }
}

/** Записать JSON-значение. */
export function writeJSON<T>(key: string, value: T): boolean {
  try {
    return writeStorage(key, JSON.stringify(value));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[KAF:storage] JSON stringify failed', key, err);
    return false;
  }
}
