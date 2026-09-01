import type { ReactNode } from 'react';
import { navigate } from '@/lib/router';

/**
 * Базовый каркас приложения: безопасные отступы, контейнер и шапка.
 */
export function AppShell({
  children,
  title,
  onBack,
}: {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
}) {
  return (
    <div className="kaf-app">
      {(title || onBack) && (
        <header className="kaf-header">
          {onBack && (
            <button
              type="button"
              className="kaf-back"
              onClick={onBack}
              aria-label="Назад"
            >
              ←
            </button>
          )}
          {title && <span className="kaf-header-title">{title}</span>}
        </header>
      )}
      {children}
    </div>
  );
}

/** Кнопка «назад» к расписанию. */
export function backToSchedule() {
  navigate('');
}
