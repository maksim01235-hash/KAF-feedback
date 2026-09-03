/**
 * История навигации приложения на основе sessionStorage.
 * Позволяет кнопке «назад» возвращаться на предыдущую страницу внутри приложения,
 * а не всегда на расписание.
 */

const KEY = 'kaf.navHistory';
const isBrowser = typeof window !== 'undefined';

function readStack(): string[] {
  if (!isBrowser) return [];
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === 'string')
      : [];
  } catch {
    return [];
  }
}

function writeStack(stack: string[]): void {
  if (!isBrowser) return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(stack));
  } catch {
    // Игнорируем (например, приватный режим или недоступное хранилище).
  }
}

/** Добавить маршрут (хэш) в историю навигации. */
export function pushNavigation(route: string): void {
  const stack = readStack();
  stack.push(route);
  writeStack(stack);
}

/** Извлечь последний маршрут из истории. Возвращает null, если стек пуст. */
export function popNavigation(): string | null {
  const stack = readStack();
  const prev = stack.pop();
  writeStack(stack);
  return prev ?? null;
}

/** Очистить историю навигации. */
export function clearNavigation(): void {
  writeStack([]);
}
