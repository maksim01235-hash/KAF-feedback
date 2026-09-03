import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReviewForm } from '@/components/ReviewForm';

function renderForm(overrides: Partial<Parameters<typeof ReviewForm>[0]> = {}) {
  const onSubmit = vi.fn().mockResolvedValue(true);
  render(
    <ReviewForm platformId="abc" onSubmit={onSubmit} {...overrides} />
  );
  return { onSubmit };
}

describe('ReviewForm', () => {
  it('валидная форма вызывает onSubmit с rating', () => {
    const { onSubmit } = renderForm();
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), {
      target: { value: 'Иван' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ваш отзыв'), {
      target: { value: 'Отличный форум' },
    });
    fireEvent.click(screen.getByRole('radio', { name: '5 из 5' }));
    fireEvent.click(screen.getByRole('button', { name: 'Отправить' }));
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Иван',
      text: 'Отличный форум',
      rating: 5,
    });
  });

  it('без rating при сабмите показывает ошибку', () => {
    renderForm();
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), {
      target: { value: 'Иван' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ваш отзыв'), {
      target: { value: 'Отличный форум' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Отправить' }));
    // rating инициализируется как 0 → validateRating(0, true) → «Оценка должна быть от 1 до 5»
    expect(screen.getByText('Оценка должна быть от 1 до 5')).toBeInTheDocument();
  });

  it('initialName предзаполняет поле имени', () => {
    renderForm({ initialName: 'Пётр' });
    expect(screen.getByPlaceholderText('Ваше имя')).toHaveValue('Пётр');
  });
});
