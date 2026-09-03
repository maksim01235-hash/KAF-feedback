import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from '@/components/Avatar';

describe('Avatar', () => {
  it('без src → placeholder с инициалом', () => {
    render(<Avatar name="Иван" />);
    const placeholder = document.querySelector('.kaf-avatar-placeholder');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder?.textContent).toBe('И');
  });

  it('с src → img с alt', () => {
    render(<Avatar url="https://example.com/a.png" name="Площадка" />);
    const img = screen.getByRole('img', { name: 'Площадка' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/a.png');
  });

  it('пустое имя → инициал «?»', () => {
    render(<Avatar name="" />);
    const placeholder = document.querySelector('.kaf-avatar-placeholder');
    expect(placeholder?.textContent).toBe('?');
  });

  it('применяет размер', () => {
    render(<Avatar name="Иван" size={80} />);
    const placeholder = document.querySelector('.kaf-avatar-placeholder') as HTMLElement;
    expect(placeholder.style.width).toBe('80px');
    expect(placeholder.style.height).toBe('80px');
  });
});
