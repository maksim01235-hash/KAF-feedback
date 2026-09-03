import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from '@/components/Avatar';

describe('Avatar', () => {
  it('без src → ничего не рендерится', () => {
    const { container } = render(<Avatar name="Иван" />);
    expect(container.querySelector('.kaf-avatar')).toBeNull();
  });

  it('с src → img с alt', () => {
    render(<Avatar url="https://example.com/a.png" name="Площадка" />);
    const img = screen.getByRole('img', { name: 'Площадка' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/a.png');
  });

  it('применяет размер', () => {
    render(<Avatar url="https://example.com/a.png" name="Площадка" size={80} />);
    const img = screen.getByRole('img', { name: 'Площадка' }) as HTMLElement;
    expect(img.style.width).toBe('80px');
    expect(img.style.height).toBe('80px');
  });
});
