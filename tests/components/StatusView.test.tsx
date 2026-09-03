import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusView } from '@/components/StatusView';

describe('StatusView', () => {
  it('рендерит loading с заголовком', () => {
    render(<StatusView kind="loading" title="Загрузка…" />);
    expect(screen.getByText('Загрузка…')).toBeInTheDocument();
    expect(screen.getByText('…')).toBeInTheDocument();
  });

  it('рендерит error с описанием', () => {
    render(
      <StatusView kind="error" title="Ошибка" description="Что-то пошло не так" />
    );
    expect(screen.getByText('Ошибка')).toBeInTheDocument();
    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument();
    expect(screen.getByText('!')).toBeInTheDocument();
  });

  it('рендерит empty', () => {
    render(<StatusView kind="empty" title="Пусто" />);
    expect(screen.getByText('Пусто')).toBeInTheDocument();
    expect(screen.getByText('∅')).toBeInTheDocument();
  });

  it('рендерит action (кнопку)', () => {
    render(
      <StatusView
        kind="error"
        title="Ошибка"
        action={<button type="button">Повторить</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Повторить' })).toBeInTheDocument();
  });

  it('не рендерит описание, если его нет', () => {
    render(<StatusView kind="loading" title="Загрузка…" />);
    expect(screen.queryByText(/описание/i)).not.toBeInTheDocument();
  });
});
