import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionForm } from '@/components/QuestionForm';

function renderForm(overrides: Partial<Parameters<typeof QuestionForm>[0]> = {}) {
  const onSubmit = vi.fn().mockResolvedValue(true);
  render(
    <QuestionForm
      platformId="abc"
      currentUserId="user1"
      onSubmit={onSubmit}
      {...overrides}
    />
  );
  return { onSubmit };
}

describe('QuestionForm', () => {
  it('валидная форма вызывает onSubmit', () => {
    const { onSubmit } = renderForm();
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), {
      target: { value: 'Иван' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ваш вопрос'), {
      target: { value: 'Как дела?' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Отправить' }));
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Иван',
      text: 'Как дела?',
      rating: undefined,
    });
  });

  it('пустая форма при сабмите показывает ошибки', () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: 'Отправить' }));
    expect(screen.getByText('Введите имя')).toBeInTheDocument();
    expect(screen.getByText('Введите текст')).toBeInTheDocument();
  });

  it('initialName предзаполняет поле имени', () => {
    renderForm({ initialName: 'Пётр' });
    expect(screen.getByPlaceholderText('Ваше имя')).toHaveValue('Пётр');
  });

  it('кнопка показывает «Сохранить» при редактировании', () => {
    renderForm({
      editing: {
        id: 'q1',
        platform_id: 'abc',
        vk_user_id: 'user1',
        name: 'Иван',
        text: 'Вопрос',
        created_at: '2026-09-01T00:00:00Z',
      },
    });
    expect(screen.getByRole('button', { name: 'Сохранить' })).toBeInTheDocument();
  });

  it('при отправке показывает индикатор «Отправка…» и отключает кнопку', () => {
    // Сбрасываем throttle-ключ, чтобы не блокировалась отправка.
    window.localStorage.clear();
    // onSubmit не завершается — форма остаётся в состоянии sending.
    const onSubmit = vi.fn().mockReturnValue(new Promise(() => {}));
    render(
      <QuestionForm
        platformId="abc"
        currentUserId="user1"
        onSubmit={onSubmit}
      />
    );
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), {
      target: { value: 'Иван' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ваш вопрос'), {
      target: { value: 'Как дела?' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Отправить' }));
    // Кнопка показывает «Отправка…» и отключена.
    const btn = screen.getByRole('button', { name: 'Отправка…' });
    expect(btn).toBeDisabled();
  });
});
