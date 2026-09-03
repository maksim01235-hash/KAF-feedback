import { describe, it, expect, beforeEach, afterEach, beforeAll, vi } from 'vitest';
import type { ApiResult } from '@/types';

const TEST_URL = 'https://script.google.com/macros/s/xxx/exec';

type ApiModule = typeof import('@/lib/api');

let api: ApiModule;

function mockFetchResponse(body: unknown, ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  } as Response);
}

beforeAll(async () => {
  vi.resetModules();
  vi.stubEnv('NEXT_PUBLIC_APPS_SCRIPT_URL', TEST_URL);
  api = await import('@/lib/api');
});

describe('api', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('fetchSchedule', () => {
    it('успешный ответ', async () => {
      const data = { platforms: [], cacheVersion: '1', serverTime: 123 };
      global.fetch = mockFetchResponse({ ok: true, data });
      const res = await api.fetchSchedule();
      expect(res.ok).toBe(true);
      if (res.ok) expect(res.data).toEqual(data);
    });

    it('HTTP-ошибка', async () => {
      global.fetch = mockFetchResponse({}, false, 500);
      const res = await api.fetchSchedule();
      expect(res.ok).toBe(false);
      if (!res.ok) expect(res.error).toContain('500');
    });

    it('ok: false от сервера', async () => {
      global.fetch = mockFetchResponse({ ok: false, error: 'boom' });
      const res = await api.fetchSchedule();
      expect(res.ok).toBe(false);
      if (!res.ok) expect(res.error).toBe('boom');
    });

    it('ошибка сети', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('network'));
      const res = await api.fetchSchedule();
      expect(res.ok).toBe(false);
      if (!res.ok) expect(res.error).toContain('Нет соединения');
    });
  });

  describe('fetchPlatform', () => {
    it('передаёт параметры в URL', async () => {
      const data = { platform: {}, questions: [], serverTime: 1 };
      global.fetch = mockFetchResponse({ ok: true, data });
      await api.fetchPlatform('abc', 'user1');
      const url = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(String(url)).toContain('action=platform');
      expect(String(url)).toContain('id=abc');
      expect(String(url)).toContain('vk_user_id=user1');
    });
  });

  describe('POST-функции', () => {
    it.each([
      ['addQuestion', 'add_question'],
      ['editQuestion', 'edit_question'],
      ['deleteQuestion', 'delete_question'],
      ['addReview', 'add_review'],
    ])('%s отправляет POST с text/plain и JSON-телом', async (name, action) => {
      global.fetch = mockFetchResponse({ ok: true, data: {} });
      const args: Record<string, unknown> = {
        platform_id: 'abc',
        vk_user_id: 'user1',
        name: 'Иван',
        text: 'текст',
      };
      if (name === 'editQuestion') args.id = 'q1';
      if (name === 'deleteQuestion') {
        await api.deleteQuestion('q1', 'user1');
      } else if (name === 'addReview') {
        await api.addReview({ ...args, rating: 5 } as Parameters<typeof api.addReview>[0]);
      } else if (name === 'addQuestion') {
        await api.addQuestion(args as Parameters<typeof api.addQuestion>[0]);
      } else {
        await api.editQuestion(args as Parameters<typeof api.editQuestion>[0]);
      }

      const call = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
      const [url, init] = call;
      expect(String(url)).toBe(TEST_URL);
      expect(init.method).toBe('POST');
      expect(init.headers['Content-Type']).toBe('text/plain');
      const body = JSON.parse(init.body);
      expect(body.action).toBe(action);
    });
  });

  describe('isApiConfigured', () => {
    it('в node-окружении (без window) → false', () => {
      expect(api.isApiConfigured()).toBe(false);
    });
  });

  describe('BASE_URL не задан', () => {
    it('возвращает «Сервер не настроен»', async () => {
      vi.resetModules();
      vi.stubEnv('NEXT_PUBLIC_APPS_SCRIPT_URL', '');
      const apiNoUrl = await import('@/lib/api');
      const res: ApiResult<unknown> = await apiNoUrl.fetchSchedule();
      expect(res.ok).toBe(false);
      if (!res.ok) expect(res.error).toBe('Сервер не настроен');
    });
  });
});
