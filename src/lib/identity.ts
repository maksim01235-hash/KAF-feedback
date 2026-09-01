import type { Question } from '@/types';
import { readStorage, writeStorage } from '@/lib/storage';

/**
 * Идентификация пользователя (vk_user_id + fallback) и права на вопрос.
 * Защита от подмены не требуется (по плану).
 */

const FALLBACK_KEY = 'kaf.user';

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

/** Получить fallback-идентификатор из localStorage. */
export function getFallbackIdentity(): string | null {
  return readStorage(FALLBACK_KEY);
}

/** Установить fallback-идентификатор в localStorage. */
export function setFallbackIdentity(id: string): boolean {
  return writeStorage(FALLBACK_KEY, id);
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
