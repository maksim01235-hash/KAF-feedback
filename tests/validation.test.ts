import { describe, it, expect } from 'vitest';
import {
  validateName,
  validateText,
  validateRating,
  validateQuestionForm,
  validateReviewForm,
  isWithinThrottle,
} from '@/lib/validation';

describe('validateName', () => {
  it('пустое имя — ошибка', () => {
    expect(validateName('')).not.toBeNull();
    expect(validateName('   ')).not.toBeNull();
  });

  it('валидное имя — null', () => {
    expect(validateName('Иван')).toBeNull();
    expect(validateName('Иван Петров')).toBeNull();
    expect(validateName('Иван123')).toBeNull();
  });

  it('недопустимые символы — ошибка', () => {
    expect(validateName('Иван<script>')).not.toBeNull();
    expect(validateName('Иван\n')).not.toBeNull();
  });

  it('слишком длинное имя — ошибка', () => {
    expect(validateName('а'.repeat(61))).not.toBeNull();
  });
});

describe('validateText', () => {
  it('пустой текст — ошибка', () => {
    expect(validateText('')).not.toBeNull();
  });

  it('валидный текст — null', () => {
    expect(validateText('Как пройти на площадку?')).toBeNull();
    expect(validateText('Оценка 5 из 5')).toBeNull();
  });

  it('недопустимые символы — ошибка', () => {
    expect(validateText('текст <b>html</b>')).not.toBeNull();
  });
});

describe('validateRating', () => {
  it('обязательная оценка без значения — ошибка', () => {
    expect(validateRating(undefined, true)).not.toBeNull();
  });

  it('опциональная оценка без значения — null', () => {
    expect(validateRating(undefined, false)).toBeNull();
  });

  it('валидные значения 1–5 — null', () => {
    for (let i = 1; i <= 5; i++) {
      expect(validateRating(i, true)).toBeNull();
    }
  });

  it('вне диапазона — ошибка', () => {
    expect(validateRating(0, true)).not.toBeNull();
    expect(validateRating(6, true)).not.toBeNull();
    expect(validateRating(2.5, true)).not.toBeNull();
  });
});

describe('validateQuestionForm', () => {
  it('пустая форма — ошибки по name и text', () => {
    const errors = validateQuestionForm({ name: '', text: '' });
    expect(errors.name).toBeDefined();
    expect(errors.text).toBeDefined();
  });

  it('валидная форма без оценки — без ошибок', () => {
    const errors = validateQuestionForm({ name: 'Иван', text: 'Вопрос?' });
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('валидная форма с оценкой — без ошибок', () => {
    const errors = validateQuestionForm({
      name: 'Иван',
      text: 'Вопрос?',
      rating: 4,
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

describe('validateReviewForm', () => {
  it('отзыв без оценки — ошибка rating', () => {
    const errors = validateReviewForm({ name: 'Иван', text: 'Отзыв', rating: 0 });
    expect(errors.rating).toBeDefined();
  });

  it('валидный отзыв — без ошибок', () => {
    const errors = validateReviewForm({
      name: 'Иван',
      text: 'Отзыв',
      rating: 5,
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

describe('isWithinThrottle', () => {
  it('нет последней отправки — false (можно отправлять)', () => {
    expect(isWithinThrottle(null, Date.now())).toBe(false);
    expect(isWithinThrottle(undefined, Date.now())).toBe(false);
  });

  it('меньше 0.5 секунды — true (нельзя)', () => {
    const now = 1_000_000;
    expect(isWithinThrottle(now - 200, now)).toBe(true);
  });

  it('ровно 0.5 секунды — false (можно)', () => {
    const now = 1_000_000;
    expect(isWithinThrottle(now - 500, now)).toBe(false);
  });

  it('больше 0.5 секунды — false (можно)', () => {
    const now = 1_000_000;
    expect(isWithinThrottle(now - 1500, now)).toBe(false);
  });

  it('учитывает кастомный интервал', () => {
    const now = 1_000_000;
    expect(isWithinThrottle(now - 5000, now, 30000)).toBe(true);
    expect(isWithinThrottle(now - 35000, now, 30000)).toBe(false);
  });
});
