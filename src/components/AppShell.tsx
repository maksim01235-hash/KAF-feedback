import type { ReactNode } from 'react';

/**
 * Базовый каркас приложения: безопасные отступы и контейнер.
 * Полноценный AppShell с навигацией появится в TASK-07.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return <div className="kaf-app">{children}</div>;
}
