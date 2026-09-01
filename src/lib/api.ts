import type {
  ApiResult,
  PlatformResponse,
  Question,
  Review,
  ScheduleResponse,
} from '@/types';
import { logger } from '@/lib/logger';

/**
 * Клиент Google Apps Script.
 * Все запросы идут на NEXT_PUBLIC_APPS_SCRIPT_URL.
 */

const BASE_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || '';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/** Базовый GET-запрос к GAS. */
async function get<T>(params: Record<string, string>): Promise<ApiResult<T>> {
  if (!BASE_URL) {
    logger.error('api.get: NEXT_PUBLIC_APPS_SCRIPT_URL не задан');
    return { ok: false, error: 'Сервер не настроен' };
  }
  const url = new URL(BASE_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      logger.error('api.get http', res.status);
      return { ok: false, error: `Ошибка сервера (${res.status})` };
    }
    const json = (await res.json()) as { ok: boolean; data?: T; error?: string };
    if (!json.ok) {
      return { ok: false, error: json.error || 'Ошибка сервера' };
    }
    return { ok: true, data: json.data as T };
  } catch (err) {
    logger.error('api.get network', err);
    return { ok: false, error: 'Нет соединения с сервером' };
  }
}

/** Базовый POST-запрос к GAS. */
async function post<T>(body: Record<string, unknown>): Promise<ApiResult<T>> {
  if (!BASE_URL) {
    logger.error('api.post: NEXT_PUBLIC_APPS_SCRIPT_URL не задан');
    return { ok: false, error: 'Сервер не настроен' };
  }
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      logger.error('api.post http', res.status);
      return { ok: false, error: `Ошибка сервера (${res.status})` };
    }
    const json = (await res.json()) as { ok: boolean; data?: T; error?: string };
    if (!json.ok) {
      return { ok: false, error: json.error || 'Ошибка сервера' };
    }
    return { ok: true, data: json.data as T };
  } catch (err) {
    logger.error('api.post network', err);
    return { ok: false, error: 'Нет соединения с сервером' };
  }
}

/** Получить расписание. */
export function fetchSchedule(): Promise<ApiResult<ScheduleResponse>> {
  logger.debug('api.fetchSchedule');
  return get<ScheduleResponse>({ action: 'schedule' });
}

/** Получить площадку и вопросы пользователя. */
export function fetchPlatform(
  id: string,
  vkUserId: string
): Promise<ApiResult<PlatformResponse>> {
  logger.debug('api.fetchPlatform', id);
  return get<PlatformResponse>({
    action: 'platform',
    id,
    vk_user_id: vkUserId,
  });
}

/** Добавить вопрос. */
export function addQuestion(input: {
  platform_id: string;
  vk_user_id: string;
  name: string;
  text: string;
  rating?: number;
}): Promise<ApiResult<{ question: Question }>> {
  logger.debug('api.addQuestion');
  return post<{ question: Question }>({ action: 'add_question', ...input });
}

/** Редактировать вопрос. */
export function editQuestion(input: {
  id: string;
  vk_user_id: string;
  name: string;
  text: string;
  rating?: number;
}): Promise<ApiResult<{ id: string }>> {
  logger.debug('api.editQuestion', input.id);
  return post<{ id: string }>({ action: 'edit_question', ...input });
}

/** Удалить вопрос. */
export function deleteQuestion(
  id: string,
  vkUserId: string
): Promise<ApiResult<{ id: string }>> {
  logger.debug('api.deleteQuestion', id);
  return post<{ id: string }>({ action: 'delete_question', id, vk_user_id: vkUserId });
}

/** Добавить отзыв. */
export function addReview(input: {
  platform_id: string;
  vk_user_id: string;
  name: string;
  text: string;
  rating: number;
}): Promise<ApiResult<{ review: Review }>> {
  logger.debug('api.addReview');
  return post<{ review: Review }>({ action: 'add_review', ...input });
}

/** Доступен ли API (задан ли URL). */
export function isApiConfigured(): boolean {
  return Boolean(BASE_URL) && isBrowser();
}
