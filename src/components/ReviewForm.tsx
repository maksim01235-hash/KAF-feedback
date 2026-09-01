'use client';

import { useState } from 'react';
import { validateReviewForm, isWithinThrottle } from '@/lib/validation';
import { readStorage, writeStorage } from '@/lib/storage';
import { StarRating } from '@/components/StarRating';
import { navigate } from '@/lib/router';

const LAST_KEY = 'kaf.lastReviewAt';
const DRAFT_KEY = 'kaf.reviewDraft';

/**
 * Форма отзыва: имя, текст, 5 звёзд (обязательно).
 * Задержка 10 секунд между отправками.
 */
export function ReviewForm({
  platformId,
  onSubmit,
}: {
  platformId: string;
  onSubmit: (input: {
    name: string;
    text: string;
    rating: number;
  }) => Promise<boolean>;
}) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [throttleMsg, setThrottleMsg] = useState('');

  function handleSubmit() {
    const errs = validateReviewForm({ name, text, rating });
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
        <span className="kaf-field-label">Отзыв</span>
        <textarea
          className="kaf-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ваш отзыв"
          rows={4}
          maxLength={2000}
        />
        {errors.text && <span className="kaf-error">{errors.text}</span>}
      </label>

      <div className="kaf-field">
        <span className="kaf-field-label">Оценка (обязательно)</span>
        <StarRating value={rating} onChange={setRating} />
        {errors.rating && <span className="kaf-error">{errors.rating}</span>}
      </div>

      {throttleMsg && <div className="kaf-error">{throttleMsg}</div>}

      <div className="kaf-form-actions">
        <button
          type="submit"
          className="kaf-btn kaf-btn-primary"
          disabled={sending}
        >
          {sending ? 'Отправка…' : 'Отправить'}
        </button>
      </div>
    </form>
  );
}
