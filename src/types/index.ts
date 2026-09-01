/**
 * Общие типы данных проекта «КАФ'26».
 * Контракт данных между фронтендом (Next.js) и бэкендом (Google Apps Script).
 */

/** Площадка форума (лист «площадки»). */
export interface Platform {
  /** Уникальный идентификатор площадки (используется в хэш-роутинге). */
  id: string;
  /** Название площадки. */
  name: string;
  /** Короткое описание / подзаголовок. */
  subtitle?: string;
  /** Место проведения. */
  location?: string;
  /** Начало (ISO 8601 UTC, без смещения). */
  time_start: string;
  /** Конец (ISO 8601 UTC, без смещения). */
  time_end: string;
  /** Имя ведущего / спикера. */
  speaker?: string;
  /** Регалии / должность ведущего. */
  speaker_title?: string;
  /** Markdown-описание площадки. */
  description?: string;
  /** URL аватара (опционально). */
  avatar_url?: string;
}

/** Вопрос пользователя (лист «вопросы»). */
export interface Question {
  /** Уникальный идентификатор вопроса. */
  id: string;
  /** ID площадки, к которой относится вопрос. */
  platform_id: string;
  /** Идентификатор автора (vk_user_id или fallback). */
  vk_user_id: string;
  /** Имя автора. */
  name: string;
  /** Текст вопроса. */
  text: string;
  /** Оценка 1–5 (опционально для вопроса). */
  rating?: number;
  /** Время создания (ISO 8601 UTC). */
  created_at: string;
}

/** Отзыв пользователя (лист «отзывы»). */
export interface Review {
  /** Уникальный идентификатор отзыва. */
  id: string;
  /** ID площадки, к которой относится отзыв. */
  platform_id: string;
  /** Идентификатор автора (vk_user_id или fallback). */
  vk_user_id: string;
  /** Имя автора. */
  name: string;
  /** Текст отзыва. */
  text: string;
  /** Оценка 1–5 (обязательна для отзыва). */
  rating: number;
  /** Время создания (ISO 8601 UTC). */
  created_at: string;
}

/** Ответ бэкенда на запрос расписания. */
export interface ScheduleResponse {
  /** Все площадки. */
  platforms: Platform[];
  /** Версия кеша расписания (для принудительного обновления). */
  cacheVersion: string;
  /** Текущее время сервера в UTC epoch ms. */
  serverTime: number;
}

/** Ответ бэкенда на запрос площадки. */
export interface PlatformResponse {
  /** Площадка. */
  platform: Platform;
  /** Вопросы пользователя по этой площадке. */
  questions: Question[];
  /** Текущее время сервера в UTC epoch ms. */
  serverTime: number;
}

/** Универсальный результат API-запроса. */
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
