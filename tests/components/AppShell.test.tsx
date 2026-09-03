import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppShell } from '@/components/AppShell';

describe('AppShell', () => {
  it('рендерит заголовок и кнопку «назад» с SVG-иконкой', () => {
    render(<AppShell title="Тест">content</AppShell>);
    expect(screen.getByText('Тест')).toBeInTheDocument();
    const back = screen.getByRole('button', { name: 'Назад' });
    expect(back).toBeInTheDocument();
    // SVG-иконка (не текстовый символ ←)
    expect(back.querySelector('svg')).toBeInTheDocument();
    expect(back.textContent).not.toBe('←');
  });

  it('вызывает onBack по клику', () => {
    const onBack = vi.fn();
    render(<AppShell title="Тест" onBack={onBack}>content</AppShell>);
    fireEvent.click(screen.getByRole('button', { name: 'Назад' }));
    expect(onBack).toHaveBeenCalledOnce();
  });

  it('рендерит children', () => {
    render(<AppShell title="Тест"><div data-testid="child">hello</div></AppShell>);
    expect(screen.getByTestId('child')).toHaveTextContent('hello');
  });

  it('без title — не рендерит header', () => {
    const { container } = render(<AppShell>content</AppShell>);
    expect(container.querySelector('.kaf-header')).toBeNull();
  });
});
