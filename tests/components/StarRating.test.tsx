import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StarRating } from '@/components/StarRating';

describe('StarRating', () => {
  it('рендерит 5 звёзд', () => {
    render(<StarRating value={0} />);
    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(5);
  });

  it('клик по звезде вызывает onChange с номером', () => {
    const onChange = vi.fn();
    render(<StarRating value={0} onChange={onChange} />);
    const stars = screen.getAllByRole('radio');
    fireEvent.click(stars[2]); // третья звезда → 3
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('disabled (readOnly) — клик не работает', () => {
    const onChange = vi.fn();
    render(<StarRating value={3} readOnly onChange={onChange} />);
    const stars = screen.getAllByRole('button');
    expect(stars).toHaveLength(5);
    fireEvent.click(stars[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('заполняет звёзды до значения', () => {
    render(<StarRating value={3} />);
    const stars = screen.getAllByRole('radio');
    expect(stars[0]).toHaveClass('is-filled');
    expect(stars[1]).toHaveClass('is-filled');
    expect(stars[2]).toHaveClass('is-filled');
    expect(stars[3]).not.toHaveClass('is-filled');
    expect(stars[4]).not.toHaveClass('is-filled');
  });
});
