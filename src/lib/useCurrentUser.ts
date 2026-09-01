'use client';

import { useEffect, useState } from 'react';
import { resolveUserId } from '@/lib/identity';

/**
 * Хук: текущий идентификатор пользователя (vk_user_id или fallback).
 */
export function useCurrentUser(): string | null {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    resolveUserId().then((id) => {
      if (!cancelled) setUserId(id);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return userId;
}
