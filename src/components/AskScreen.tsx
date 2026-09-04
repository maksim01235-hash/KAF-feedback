'use client';

import { useEffect, useState } from 'react';
import type { Question } from '@/types';
import { AppShell } from '@/components/AppShell';
import { QuestionForm } from '@/components/QuestionForm';
import { AuthScreen } from '@/components/AuthScreen';
import { addQuestion, editQuestion, deleteQuestion } from '@/lib/api';
import { getInitialProfile, type UserProfile } from '@/lib/identity';
import { takeEditingQuestion } from '@/lib/editingState';

/**
 * Экран «Задать вопрос».
 * В VK auth screen показывается только один раз за сессию (если профиль не сохранён).
 * Вне VK auth не показывается — используется стабильный анонимный профиль на время сессии.
 */
export function AskScreen({ platformId }: { platformId: string }) {
  const [profile, setProfile] = useState<UserProfile | null>(() =>
    getInitialProfile()
  );
  const [editing, setEditing] = useState<Question | null>(null);

  const userId = profile?.id || null;

  // Если пришли со страницы площадки с выбранным вопросом — открываем его в режиме редактирования.
  useEffect(() => {
    const q = takeEditingQuestion();
    if (q && q.platform_id === platformId) {
      setEditing(q);
    }
  }, [platformId]);

  async function handleSubmit(input: {
    name: string;
    text: string;
    rating?: number;
  }): Promise<boolean> {
    if (!platformId || !userId) return false;
    if (editing) {
      const res = await editQuestion({
        id: editing.id,
        vk_user_id: userId,
        ...input,
      });
      return res.ok;
    }
    const res = await addQuestion({
      platform_id: platformId,
      vk_user_id: userId,
      ...input,
    });
    return res.ok;
  }

  async function handleDelete(): Promise<boolean> {
    if (!editing || !userId) return false;
    const res = await deleteQuestion(editing.id, userId);
    return res.ok;
  }

  if (!profile) {
    return <AuthScreen onAuthed={(p) => setProfile(p)} />;
  }

  return (
    <AppShell title="Задать вопрос">
      <div className="kaf-center">
        <QuestionForm
          platformId={platformId}
          currentUserId={userId || ''}
          editing={editing}
          initialName={profile?.name}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      </div>
    </AppShell>
  );
}
