/**
 * Звёздный рейтинг 1–5.
 */
export function StarRating({
  value,
  onChange,
  readOnly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="kaf-stars" role={readOnly ? undefined : 'radiogroup'}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        return (
          <button
            key={n}
            type="button"
            className={`kaf-star${filled ? ' is-filled' : ''}`}
            disabled={readOnly}
            onClick={() => onChange?.(n)}
            aria-label={`${n} из 5`}
            aria-checked={readOnly ? undefined : n === value}
            role={readOnly ? undefined : 'radio'}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
