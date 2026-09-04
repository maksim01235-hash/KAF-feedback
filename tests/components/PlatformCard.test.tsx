import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlatformCard } from '@/components/PlatformCard';
import type { Platform } from '@/types';

function makePlatform(overrides: Partial<Platform> = {}): Platform {
  return {
    id: 'p1',
    name: 'Площадка',
    time_start: '2026-09-05T04:00:00Z',
    time_end: '2026-09-05T06:00:00Z',
    ...overrides,
  };
}

describe('PlatformCard', () => {
  it('без аватарок → заглушка с первой буквой названия', () => {
    render(<PlatformCard platform={makePlatform()} serverTimeMs={0} />);
    const placeholder = screen.getByLabelText('Площадка');
    expect(placeholder).toHaveClass('kaf-avatar-placeholder');
    expect(placeholder).toHaveTextContent('П');
    expect(placeholder).toHaveStyle({ width: '48px', height: '48px' });
    // Изображения нет
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('с card_avatar_url → img (не заглушка)', () => {
    render(
      <PlatformCard
        platform={makePlatform({ card_avatar_url: 'https://example.com/card.png' })}
        serverTimeMs={0}
      />
    );
    const img = screen.getByRole('img', { name: 'Площадка' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/card.png');
    expect(screen.queryByLabelText('Площадка')).not.toBeInTheDocument();
  });

  it('с avatar_url (без card_avatar_url) → img (не заглушка)', () => {
    render(
      <PlatformCard
        platform={makePlatform({ avatar_url: 'https://example.com/avatar.png' })}
        serverTimeMs={0}
      />
    );
    const img = screen.getByRole('img', { name: 'Площадка' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png');
    expect(screen.queryByLabelText('Площадка')).not.toBeInTheDocument();
  });

  it('card_avatar_url приоритетнее avatar_url', () => {
    render(
      <PlatformCard
        platform={makePlatform({
          card_avatar_url: 'https://example.com/card.png',
          avatar_url: 'https://example.com/avatar.png',
        })}
        serverTimeMs={0}
      />
    );
    const img = screen.getByRole('img', { name: 'Площадка' });
    expect(img).toHaveAttribute('src', 'https://example.com/card.png');
  });
});