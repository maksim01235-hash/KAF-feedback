import type { Question } from '@/types';

/**
 * Модульное состояние «вопроса для редактирования».
 * Позволяет передать выбранный вопрос со страницы площадки на ask-экран
 * (разные маршруты SPA), не прибегая к глобальному стейт-менеджеру.
 */
let editingQuestion: Question | null = null;

/** Установить вопрос для редактирования (перед переходом на ask-экран). */
export function setEditingQuestion(q: Question | null): void {
  editingQuestion = q;
}

/** Получить вопрос для редактирования и сбросить его. */
export function takeEditingQuestion(): Question | null {
  const q = editingQuestion;
  editingQuestion = null;
  return q;
}
