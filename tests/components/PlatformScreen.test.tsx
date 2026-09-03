import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlatformScreen } from '@/components/PlatformScreen';

vi.mock('@/lib/useCurrentUser', () => ({
  useCurrentUser: () => 'user1',
}));

vi.mock('@/lib/api', () => ({
  fetchPlatform: vi.fn(),
  deleteQuestion: vi.fn(),
}));

import { fetchPlatform } from '@/lib/api';

const platformData = {
  platform: {
    id: 'abc',
    name: 'Площадка А',
    time_start: 1,
    time_end: 2,
  },
  questions: [
    {
      id: 'q1',
      platform_id: 'abc',
      vk_user_id: 'user1',
      name: 'Иван',
      text: 'Мой вопрос',
      created_at: '2026-09-01T00:00:00Z',
    },
  ],
  serverTime: 123,
};

describe('PlatformScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it('отображает вопросы из данных площадки', async () => {
    (fetchPlatform as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      data: platformData,
    });
    render(<PlatformScreen platformId="abc" />);
    expect(await screen.findByText('Мой вопрос')).toBeInTheDocument();
    expect(screen.getByText('Площадка А')).toBeInTheDocument();
  });

  it('показывает ошибку при неудачном запросе без кэша', async () => {
    (fetchPlatform as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      error: 'Ошибка сервера (500)',
    });
    render(<PlatformScreen platformId="abc" />);
    expect(await screen.findByText('Ошибка загрузки')).toBeInTheDocument();
  });

  it('при 404 без кэша показывает понятное сообщение про GAS', async () => {
    (fetchPlatform as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      error:
        'Сервер не отвечает (404). Проверьте настройки GAS: доступ «Anyone» и URL /exec.',
    });
    render(<PlatformScreen platformId="abc" />);
    expect(await screen.findByText('Ошибка загрузки')).toBeInTheDocument();
    expect(
      screen.getByText(/Сервер не отвечает \(404\)/)
    ).toBeInTheDocument();
  });

  it('показывает кэш сразу, если он есть', async () => {
    // Кэш с вопросом
    window.localStorage.setItem(
      'kaf.platform.abc',
      JSON.stringify({ data: platformData, savedAt: Date.now() })
    );
    // Запрос ещё не завершился
    (fetchPlatform as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise(() => {})
    );
    render(<PlatformScreen platformId="abc" />);
    expect(await screen.findByText('Мой вопрос')).toBeInTheDocument();
  });

  it('показывает индикатор «Обновление…» при фоновом обновлении кэша', async () => {
    window.localStorage.setItem(
      'kaf.platform.abc',
      JSON.stringify({ data: platformData, savedAt: Date.now() })
    );
    // Запрос ещё не завершился — кэш показан, идёт фоновое обновление
    (fetchPlatform as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise(() => {})
    );
    render(<PlatformScreen platformId="abc" />);
    expect(await screen.findByText('Обновление…')).toBeInTheDocument();
    // Контент кэша не блокируется
    expect(screen.getByText('Мой вопрос')).toBeInTheDocument();
  });

  it('при ошибке сети/404 показывает кэш (не ошибку)', async () => {
    window.localStorage.setItem(
      'kaf.platform.abc',
      JSON.stringify({ data: platformData, savedAt: Date.now() })
    );
    (fetchPlatform as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      error: 'Ошибка сервера (500)',
    });
    render(<PlatformScreen platformId="abc" />);
    // Кэш показан, ошибка не отображается
    expect(await screen.findByText('Мой вопрос')).toBeInTheDocument();
    expect(screen.queryByText('Ошибка загрузки')).not.toBeInTheDocument();
  });

  it('при первом открытии (без кэша) показывает вопросы из свежих данных', async () => {
    // Кэша нет — данные приходят только от сервера.
    (fetchPlatform as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      data: platformData,
    });
    render(<PlatformScreen platformId="abc" />);
    expect(await screen.findByText('Мой вопрос')).toBeInTheDocument();
    expect(screen.getByText('Площадка А')).toBeInTheDocument();
    // Индикатор «Обновление…» не показывается (кэша не было).
    expect(screen.queryByText('Обновление…')).not.toBeInTheDocument();
  });

  it('свежие данные с вопросами заменяют устаревший кэш без вопросов', async () => {
    // Устаревший кэш без вопросов.
    const staleData = {
      platform: platformData.platform,
      questions: [],
      serverTime: 123,
    };
    window.localStorage.setItem(
      'kaf.platform.abc',
      JSON.stringify({ data: staleData, savedAt: Date.now() })
    );
    // Свежие данные с вопросами.
    (fetchPlatform as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      data: platformData,
    });
    render(<PlatformScreen platformId="abc" />);
    // После загрузки свежих данных вопросы отображаются.
    expect(await screen.findByText('Мой вопрос')).toBeInTheDocument();
  });
});
