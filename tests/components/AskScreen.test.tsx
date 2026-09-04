import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AskScreen } from '@/components/AskScreen';

vi.mock('@/lib/api', () => ({
  addQuestion: vi.fn(),
  editQuestion: vi.fn(),
  deleteQuestion: vi.fn(),
}));

vi.mock('@/lib/editingState', () => ({
  takeEditingQuestion: () => null,
}));

describe('AskScreen', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.localStorage.clear();
  });

  it('вне VK использует уникальный анонимный id (не «anon») и не показывает auth', () => {
    // В jsdom нет VK launch params → isVkEnvironment() === false
    render(<AskScreen platformId="abc" />);
    // Auth не показывается
    expect(
      screen.queryByText('Авторизоваться через VK ID')
    ).not.toBeInTheDocument();
    // Форма вопроса отображается
    expect(screen.getByPlaceholderText('Ваше имя')).toBeInTheDocument();
    // В sessionStorage сохранён уникальный анонимный id (не «anon»)
    const stored = JSON.parse(
      window.sessionStorage.getItem('kaf.user') as string
    );
    expect(stored.id).toMatch(/^anon-/);
    expect(stored.id).not.toBe('anon');
  });

  it('в VK без сохранённого профиля показывает auth', () => {
    const originalSearch = window.location.search;
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?vk_app_id=123' },
      writable: true,
    });
    try {
      render(<AskScreen platformId="abc" />);
      expect(
        screen.getByText('Авторизоваться через VK ID')
      ).toBeInTheDocument();
    } finally {
      Object.defineProperty(window, 'location', {
        value: { ...window.location, search: originalSearch },
        writable: true,
      });
    }
  });

  it('в VK с сохранённым профилем не показывает auth', () => {
    const originalSearch = window.location.search;
    Object.defineProperty(window, 'location', {
      value: { ...window.location, search: '?vk_app_id=123' },
      writable: true,
    });
    window.sessionStorage.setItem(
      'kaf.user',
      JSON.stringify({ id: 'vk-1', name: 'Иван', source: 'vk' })
    );
    try {
      render(<AskScreen platformId="abc" />);
      expect(
        screen.queryByText('Авторизоваться через VK ID')
      ).not.toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ваше имя')).toBeInTheDocument();
    } finally {
      Object.defineProperty(window, 'location', {
        value: { ...window.location, search: originalSearch },
        writable: true,
      });
    }
  });
});
