'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { ReviewForm } from '@/components/ReviewForm';
import { AuthScreen } from '@/components/AuthScreen';
import { addReview } from '@/lib/api';
import { type UserProfile } from '@/lib/identity';

/**
 * Экран «Оставить отзыв».
 * Всегда начинается с auth screen (явное согласие), даже если профиль сохранён.
 */
export function ReviewScreen({ platformId }: { platformId: string }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

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
