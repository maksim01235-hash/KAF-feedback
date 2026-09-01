import { describe, it, expect } from 'vitest';
import type { Question } from '@/types';
import { canEditQuestion, canDeleteQuestion } from '@/lib/identity';

function makeQuestion(vkUserId: string): Question {
  return {
    id: 'q1',
    platform_id: 'p1',
    vk_user_id: vkUserId,
    name: 'Иван',
    text: 'Вопрос',
    created_at: '2026-09-01T04:00:00Z',
  };
}

describe('canEditQuestion', () => {
  it('совпадение vk_user_id — true', () => {
    const q = makeQuestion('123');
    expect(canEditQuestion(q, '123')).toBe(true);
  });

  it('несовпадение vk_user_id — false', () => {
    const q = makeQuestion('123');
    expect(canEditQuestion(q, '456')).toBe(false);
  });

  it('пустой currentUserId — false', () => {
    const q = makeQuestion('123');
    expect(canEditQuestion(q, null)).toBe(false);
    expect(canEditQuestion(q, undefined)).toBe(false);
    expect(canEditQuestion(q, '')).toBe(false);
  });

  it('пустой vk_user_id вопроса — false', () => {
    const q = makeQuestion('');
    expect(canEditQuestion(q, '')).toBe(false);
    expect(canEditQuestion(q, '123')).toBe(false);
  });
});

describe('canDeleteQuestion', () => {
  it('совпадение vk_user_id — true', () => {
    const q = makeQuestion('123');
    expect(canDeleteQuestion(q, '123')).toBe(true);
  });

  it('несовпадение — false', () => {
    const q = makeQuestion('123');
    expect(canDeleteQuestion(q, '999')).toBe(false);
  });

  it('пустой currentUserId — false', () => {
    const q = makeQuestion('123');
    expect(canDeleteQuestion(q, null)).toBe(false);
  });
});
