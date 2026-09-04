import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlatformDetail } from '@/components/PlatformDetail';
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

describe('PlatformDetail', () => {
  it('отображает дату в едином формате «Н сентября, ЧЧ:ММ-ЧЧ:ММ»', () => {
    render(
      <PlatformDetail
        platform={makePlatform()}
        questions={[]}
        serverTimeMs={0}
        currentUserId={null}
      />
    );
    // Единая строка с названием месяца (не «05.09»)
    const time = screen.getByText(/^\d{1,2} сентября, \d{2}:\d{2}-\d{2}:\d{2}$/);
    expect(time).toBeInTheDocument();
    expect(time.textContent).toContain('сентября');
    // Нет раздельного формата «05.09, ... — 05.09, ...»
    expect(screen.queryByText(/05\.09/)).not.toBeInTheDocument();
  });

  it('не отображает блок «Время» при невалидных датах', () => {
    render(
      <PlatformDetail
        platform={makePlatform({ time_start: 'bad', time_end: 'bad' })}
        questions={[]}
        serverTimeMs={0}
        currentUserId={null}
      />
    );
    expect(screen.queryByText('Время')).not.toBeInTheDocument();
  });

  it('отображает «Место», если даты невалидны, но место есть', () => {
    render(
      <PlatformDetail
        platform={makePlatform({
          time_start: 'bad',
          time_end: 'bad',
          location: 'Актовый зал',
        })}
        questions={[]}
        serverTimeMs={0}
        currentUserId={null}
      />
    );
    expect(screen.getByText('Место')).toBeInTheDocument();
    expect(screen.getByText('Актовый зал')).toBeInTheDocument();
    expect(screen.queryByText('Время')).not.toBeInTheDocument();
  });

  it('отображает нижний бар с кнопкой «Задать вопрос» на всю ширину', () => {
    render(
      <PlatformDetail
        platform={makePlatform()}
        questions={[]}
        serverTimeMs={0}
        currentUserId={null}
      />
    );
    const bar = document.querySelector('.kaf-bottom-bar');
    expect(bar).not.toBeNull();
    const askButton = screen.getByRole('button', { name: 'Задать вопрос' });
    expect(askButton).toHaveClass('kaf-btn-primary');
    expect(askButton).toHaveClass('kaf-btn-lg');
  });

  it('отображает кнопку «Оставить отзыв» по правому краю без акцента', () => {
    render(
      <PlatformDetail
        platform={makePlatform()}
        questions={[]}
        serverTimeMs={0}
        currentUserId={null}
      />
    );
    const reviewButton = screen.getByRole('button', {
      name: 'Оставить отзыв',
    });
    expect(reviewButton).toHaveClass('kaf-review-fab');
    expect(reviewButton).toHaveClass('kaf-btn-secondary');
  });
});