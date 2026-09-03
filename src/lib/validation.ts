/**
 * Валидация полей вопросов и отзывов.
 * Простой текст и цифры; оценка 1–5; задержка отправок 10 секунд.
 */

export interface QuestionFormValues {
  name: string;
  text: string;
  rating?: number;
}

export interface ReviewFormValues {
  name: string;
  text: string;
  rating: number;
}

export type FieldErrors = Record<string, string>;

const NAME_MAX = 60;
const TEXT_MAX = 2000;

/** Есть ли управляющие символы (включая \n, \t, \r; обычный пробел разрешён). */
function hasControlChars(value: string): boolean {
  // eslint-disable-next-line no-control-regex
  return /[\u0000-\u0008\u0009\u000A\u000B\u000C\u000D\u000E-\u001F\u007F]/.test(
    value
  );
}

/** Имя: непустое, простой текст и цифры, без управляющих символов. */
export function validateName(name: string): string | null {
  if (hasControlChars(name)) return 'Имя содержит недопустимые символы';
  const trimmed = name.trim();
  if (!trimmed) return 'Введите имя';
  if (trimmed.length > NAME_MAX) return `Имя не длиннее ${NAME_MAX} символов`;
  // Разрешаем буквы (в т.ч. кириллицу), цифры, пробелы и базовые знаки препинания.
  if (!/^[\p{L}\p{N}\s.,!?()\-'"]+$/u.test(trimmed)) {
    return 'Имя содержит недопустимые символы';
  }
  return null;
}

/** Текст: непустой, простой текст и цифры. */
export function validateText(text: string): string | null {
  if (hasControlChars(text)) return 'Текст содержит недопустимые символы';
  const trimmed = text.trim();
  if (!trimmed) return 'Введите текст';
  if (trimmed.length > TEXT_MAX) return `Текст не длиннее ${TEXT_MAX} символов`;
  if (!/^[\p{L}\p{N}\s.,!?()\-'":;%#@+*/\\]+$/u.test(trimmed)) {
    return 'Текст содержит недопустимые символы';
  }
  return null;
}

/**
 * Оценка 1–5.
 * required=true — обязательна (отзыв); required=false — опциональна (вопрос).
 */
export function validateRating(
  rating: number | undefined,
  required: boolean
): string | null {
  if (rating === undefined || rating === null) {
    return required ? 'Поставьте оценку' : null;
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return 'Оценка должна быть от 1 до 5';
  }
  return null;
}

/** Валидация формы вопроса. Возвращает ошибки по полям. */
export function validateQuestionForm(values: QuestionFormValues): FieldErrors {
  const errors: FieldErrors = {};
  const nameErr = validateName(values.name);
  if (nameErr) errors.name = nameErr;
  const textErr = validateText(values.text);
  if (textErr) errors.text = textErr;
  const ratingErr = validateRating(values.rating, false);
  if (ratingErr) errors.rating = ratingErr;
  return errors;
}

/** Валидация формы отзыва. Возвращает ошибки по полям. */
export function validateReviewForm(values: ReviewFormValues): FieldErrors {
  const errors: FieldErrors = {};
  const nameErr = validateName(values.name);
  if (nameErr) errors.name = nameErr;
  const textErr = validateText(values.text);
  if (textErr) errors.text = textErr;
  const ratingErr = validateRating(values.rating, true);
  if (ratingErr) errors.rating = ratingErr;
  return errors;
}

/**
 * Прошла ли задержка с последней отправки.
 * minIntervalMs по умолчанию 500 (0.5 секунды).
 */
export function isWithinThrottle(
  lastSentAt: number | null | undefined,
  nowMs: number,
  minIntervalMs = 500
): boolean {
  if (lastSentAt === null || lastSentAt === undefined) return false;
  return nowMs - lastSentAt < minIntervalMs;
}
