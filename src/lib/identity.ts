import type { Question } from '@/types';
import { readStorage, writeStorage, readJSON, writeJSON } from '@/lib/storage';

/**
 * Идентификация пользователя (vk_user_id + fallback) и права на вопрос.
 * Защита от подмены не требуется (по плану).
 */

const FALLBACK_KEY = 'kaf.user';

/** Профиль пользователя: id + имя + источник. */
export interface UserProfile {
  id: string;
  name: string;
  source: 'vk' | 'fallback';
}

/** Получить vk_user_id из launch params через vk-bridge. */
export async function getVkUserId(): Promise<string | null> {
  try {
    const bridge = await import('@vkontakte/vk-bridge');
    const data = await bridge.default.send('VKWebAppGetUserInfo');
    const id = data?.id;
    if (typeof id === 'number' || typeof id === 'string') {
      return String(id);
    }
    return null;
  } catch {
    return null;
  }
}

/** Получить профиль VK (id + имя) через vk-bridge. */
export async function getVkUserProfile(): Promise<UserProfile | null> {
  try {
    const bridge = await import('@vkontakte/vk-bridge');
    const data = await bridge.default.send('VKWebAppGetUserInfo');
    const id = data?.id;
    if (typeof id !== 'number' && typeof id !== 'string') return null;
    const firstName = typeof data?.first_name === 'string' ? data.first_name : '';
    const lastName = typeof data?.last_name === 'string' ? data.last_name : '';
    const name = [firstName, lastName].filter(Boolean).join(' ').trim();
    return { id: String(id), name, source: 'vk' };
  } catch {
    return null;
  }
}

/** Получить fallback-идентификатор из localStorage. */
export function getFallbackIdentity(): string | null {
  return readStorage(FALLBACK_KEY);
}

/** Установить fallback-идентификатор в localStorage. */
export function setFallbackIdentity(id: string): boolean {
  return writeStorage(FALLBACK_KEY, id);
}

/**
 * Прочитать сохранённый профиль из localStorage.
 * Обратная совместимость: если хранится строка — считаем fallback-id без имени.
 */
export function getStoredProfile(): UserProfile | null {
  const raw = readStorage(FALLBACK_KEY);
  if (raw === null) return null;
  try {
    const parsed = JSON.parse(raw) as UserProfile;
    if (parsed && typeof parsed.id === 'string') {
      return {
        id: parsed.id,
        name: typeof parsed.name === 'string' ? parsed.name : '',
        source: parsed.source === 'vk' ? 'vk' : 'fallback',
      };
    }
  } catch {
    // не JSON — строка (старый формат)
  }
  return { id: raw, name: '', source: 'fallback' };
}

/** Сохранить профиль в localStorage. */
export function setStoredProfile(profile: UserProfile): boolean {
  return writeJSON(FALLBACK_KEY, profile);
}

/**
 * Разрешить идентификатор пользователя: vk_user_id или fallback.
 * Если vk_user_id недоступен — используем/создаём fallback.
 */
export async function resolveUserId(): Promise<string> {
  const vkId = await getVkUserId();
  if (vkId) return vkId;

  const existing = getFallbackIdentity();
  if (existing) return existing;

  const generated = `anon-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
  setFallbackIdentity(generated);
  return generated;
}

/**
 * Разрешить профиль пользователя: VK-профиль или сохранённый/fallback.
 * Если VK доступен — возвращаем профиль VK (с именем) и сохраняем его.
 */
export async function resolveUserProfile(): Promise<UserProfile> {
  const vkProfile = await getVkUserProfile();
  if (vkProfile) {
    setStoredProfile(vkProfile);
    return vkProfile;
  }

  const stored = getStoredProfile();
  if (stored) return stored;

  const generated = `anon-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
  const fallback: UserProfile = { id: generated, name: '', source: 'fallback' };
  setStoredProfile(fallback);
  return fallback;
}

/** Авторизован ли пользователь (есть ли имя). */
export function isAuthenticated(profile: UserProfile | null | undefined): boolean {
  return Boolean(profile && profile.name.trim().length > 0);
}

/** Может ли пользователь редактировать вопрос (совпадение vk_user_id). */
export function canEditQuestion(
  question: Question,
  currentUserId: string | null | undefined
): boolean {
  if (!currentUserId) return false;
  return question.vk_user_id === currentUserId;
}

/** Может ли пользователь удалять вопрос (совпадение vk_user_id). */
export function canDeleteQuestion(
  question: Question,
  currentUserId: string | null | undefined
): boolean {
  return canEditQuestion(question, currentUserId);
}
