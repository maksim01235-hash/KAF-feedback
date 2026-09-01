'use client';

import { useEffect } from 'react';

/**
 * Инициализация vk-bridge при старте приложения.
 * Обязательно для корректной работы VK Mini App (VKWebAppInit).
 * Вызывается один раз при монтировании.
 */
export function VkBridgeInit() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const bridge = await import('@vkontakte/vk-bridge');
        await bridge.default.send('VKWebAppInit');
      } catch {
        // Вне VK (обычный браузер) инициализация не требуется.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
