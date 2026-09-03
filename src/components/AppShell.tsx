import type { ReactNode } from 'react';
import { goBack } from '@/lib/router';

/**
 * Базовый каркас приложения: безопасные отступы, контейнер и шапка.
 * Кнопка «назад» по умолчанию возвращает на предыдущий маршрут приложения.
 */
export function AppShell({
  children,
  title,
  onBack = goBack,
}: {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
}) {
  return (
    <div className="kaf-app">
      {title && (
        <header className="kaf-header">
          <button
            type="button"
            className="kaf-back"
            onClick={onBack}
            aria-label="Назад"
          >
            ←
          </button>
          <span className="kaf-header-title">{title}</span>
        </header>
      )}
      {children}
    </div>
  );
}
