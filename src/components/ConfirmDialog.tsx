'use client';

/**
 * Кастомная модальная плашка подтверждения действия (вместо window.confirm).
 * Стилистика — liquid glass приложения.
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Удалить',
  cancelLabel = 'Отмена',
  danger = true,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="kaf-confirm-overlay" onClick={onCancel}>
      <div
        className="kaf-confirm kaf-glass"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="kaf-confirm-title">{title}</div>
        {message && <div className="kaf-confirm-message">{message}</div>}
        <div className="kaf-confirm-actions">
          <button
            type="button"
            className="kaf-btn kaf-btn-secondary"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`kaf-btn ${danger ? 'kaf-btn-danger' : 'kaf-btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
