'use client';

import { useEffect, useState } from 'react';
import { AppShell, backToSchedule } from '@/components/AppShell';
import { ReviewForm } from '@/components/ReviewForm';
import { StatusView } from '@/components/StatusView';
import { AuthScreen } from '@/components/AuthScreen';
import { addReview } from '@/lib/api';
import {
  isAuthenticated,
  resolveUserProfile,
  type UserProfile,
} from '@/lib/identity';

/**
 * Экран «Оставить отзыв».
 * Если пользователь не авторизован (нет имени) — показывается auth-gate.
 */
export function ReviewScreen({ platformId }: { platformId: string }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    resolveUserProfile().then((p) => {
      if (cancelled) return;
      setProfile(p);
      setProfileLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const userId = profile?.id || null;

  async function handleSubmit(input: {
    name: string;
    text: string;
    rating: number;
  }): Promise<boolean> {
    if (!platformId || !userId) return false;
    const res = await addReview({
      platform_id: platformId,
      vk_user_id: userId,
      ...input,
    });
    return res.ok;
  }

  if (!profileLoaded) {
    return (
      <AppShell title="Оставить отзыв" onBack={backToSchedule}>
        <StatusView kind="loading" title="Загрузка…" />
      </AppShell>
    );
  }

  if (!isAuthenticated(profile)) {
    return <AuthScreen onAuthed={(p) => setProfile(p)} />;
  }

  return (
    <AppShell title="Оставить отзыв" onBack={backToSchedule}>
      <div className="kaf-center">
        <ReviewForm
          platformId={platformId}
          initialName={profile?.name}
          onSubmit={handleSubmit}
        />
      </div>
    </AppShell>
  );
}
