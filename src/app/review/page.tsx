'use client';

import { AppShell, backToSchedule } from '@/components/AppShell';
import { ReviewForm } from '@/components/ReviewForm';
import { useRoute } from '@/lib/useRoute';
import { useCurrentUser } from '@/lib/useCurrentUser';
import { addReview } from '@/lib/api';

/**
 * Страница «Оставить отзыв».
 */
export default function ReviewPage() {
  const route = useRoute();
  const userId = useCurrentUser();
  const platformId = route.name === 'review' ? route.platformId : '';

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

  return (
    <AppShell title="Оставить отзыв" onBack={backToSchedule}>
      <ReviewForm platformId={platformId} onSubmit={handleSubmit} />
    </AppShell>
  );
}
