'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { ReviewForm } from '@/components/ReviewForm';
import { AuthScreen } from '@/components/AuthScreen';
import { addReview } from '@/lib/api';
import { getInitialProfile, type UserProfile } from '@/lib/identity';

/**
 * Экран «Оставить отзыв».
 * В VK auth screen показывается только один раз за сессию (если профиль не сохранён).
 * Вне VK auth не показывается — используется стабильный анонимный профиль на время сессии.
 */
export function ReviewScreen({ platformId }: { platformId: string }) {
  const [profile, setProfile] = useState<UserProfile | null>(() =>
    getInitialProfile()
  );

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

  if (!profile) {
    return <AuthScreen onAuthed={(p) => setProfile(p)} />;
  }

  return (
    <AppShell title="Оставить отзыв">
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
