import type { ReactNode } from 'react';

/**
 * Универсальное состояние экрана: загрузка, ошибка, пусто.
 */
export function StatusView({
  kind,
  title,
  description,
  action,
}: {
  kind: 'loading' | 'error' | 'empty';
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="kaf-status">
      <div className={`kaf-status-icon kaf-status-${kind}`} aria-hidden="true">
        {kind === 'loading' ? '…' : kind === 'error' ? '!' : '∅'}
      </div>
      <div className="kaf-status-title">{title}</div>
      {description && <div className="kaf-status-desc">{description}</div>}
      {action && <div className="kaf-status-action">{action}</div>}
    </div>
  );
}
