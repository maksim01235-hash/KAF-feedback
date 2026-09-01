'use client';

import { useState } from 'react';
import type { Question } from '@/types';
import { validateQuestionForm, isWithinThrottle } from '@/lib/validation';
import { readStorage, writeStorage } from '@/lib/storage';
import { StarRating } from '@/components/StarRating';
import { navigate } from '@/lib/router';

const LAST_KEY = 'kaf.lastQuestionAt';
const DRAFT_KEY = 'kaf.questionDraft';

/**
 * Форма вопроса: имя, текст, 5 звёзд (опционально).
 * Задержка 10 секунд между отправками.
 */
export function QuestionForm({
  platformId,
  currentUserId,
  editing,
  initialName,
  onSubmit,
  onDelete,
}: {
  platformId: string;
  currentUserId: string;
  editing?: Question | null;
  initialName?: string;
  onSubmit: (input: {
    name: string;
    text: string;
    rating?: number;
  }) => Promise<boolean>;
  onDelete?: () => Promise<boolean>;
}) {
  const [name, setName] = useState(editing?.name || initialName || '');
  const [text, setText] = useState(editing?.text || '');
  const [rating, setRating] = useState<number | undefined>(editing?.rating);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [throttleMsg, setThrottleMsg] = useState('');

  function handleSubmit() {
    const errs = validateQuestionForm({ name, text, rating });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const last = Number(readStorage(LAST_KEY) || 0);
    if (isWithinThrottle(last, Date.now())) {
      setThrottleMsg('Подождите 10 секунд перед следующей отправкой');
      return;
    }
    setThrottleMsg('');

    setSending(true);
    onSubmit({ name: name.trim(), text: text.trim(), rating })
      .then((ok) => {
        if (ok) {
          writeStorage(LAST_KEY, String(Date.now()));
          writeStorage(DRAFT_KEY, '');
          navigate(platformId);
        }
      })
      .finally(() => setSending(false));
  }

  return (
    <form
      className="kaf-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className="kaf-field">
        <span className="kaf-field-label">Имя</span>
        <input
          className="kaf-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          maxLength={60}
        />
        {errors.name && <span className="kaf-error">{errors.name}</span>}
      </label>

      <label className="kaf-field">
        <span className="kaf-field-label">Вопрос</span>
        <textarea
          className="kaf-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ваш вопрос"
          rows={4}
          maxLength={2000}
        />
        {errors.text && <span className="kaf-error">{errors.text}</span>}
      </label>

      <div className="kaf-field">
        <span className="kaf-field-label">Оценка (необязательно)</span>
        <StarRating value={rating || 0} onChange={setRating} />
        {errors.rating && <span className="kaf-error">{errors.rating}</span>}
      </div>

      {throttleMsg && <div className="kaf-error">{throttleMsg}</div>}

      <div className="kaf-form-actions">
        <button
          type="submit"
          className="kaf-btn kaf-btn-primary"
          disabled={sending}
        >
          {sending ? 'Отправка…' : editing ? 'Сохранить' : 'Отправить'}
        </button>
        {editing && onDelete && (
          <button
            type="button"
            className="kaf-btn kaf-btn-danger"
            disabled={sending}
            onClick={async () => {
              if (onDelete && (await onDelete())) navigate(platformId);
            }}
          >
            Удалить
          </button>
        )}
      </div>
    </form>
  );
}
