'use client';

import { useEffect, useState } from 'react';
import type { Question } from '@/types';
import { AppShell, backToSchedule } from '@/components/AppShell';
import { QuestionForm } from '@/components/QuestionForm';
import { StatusView } from '@/components/StatusView';
import { useRoute } from '@/lib/useRoute';
import { useCurrentUser } from '@/lib/useCurrentUser';
import { fetchPlatform, addQuestion, editQuestion, deleteQuestion } from '@/lib/api';
import { canEditQuestion } from '@/lib/identity';

/**
 * Страница «Задать вопрос».
 */
export default function AskPage() {
  const route = useRoute();
  const userId = useCurrentUser();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editing, setEditing] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const platformId = route.name === 'ask' ? route.platformId : '';

  useEffect(() => {
    if (!platformId || !userId) return;
    let cancelled = false;
    setLoading(true);
    fetchPlatform(platformId, userId).then((res) => {
      if (cancelled) return;
      setLoading(false);
      if (res.ok) {
        setQuestions(res.data.questions);
      } else {
        setError(res.error);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [platformId, userId]);

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

  return (
    <AppShell title="Задать вопрос" onBack={backToSchedule}>
      {loading && <StatusView kind="loading" title="Загрузка…" />}
      {error && <StatusView kind="error" title="Ошибка" description={error} />}

      {!loading && !error && (
        <>
          <QuestionForm
            platformId={platformId}
            currentUserId={userId || ''}
            editing={editing}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
          />

          {questions.length > 0 && (
            <div className="kaf-my-questions">
              <h2 className="kaf-section-title">Мои вопросы</h2>
              {questions.map((q) => (
                <div key={q.id} className="kaf-question kaf-glass">
                  <div className="kaf-question-text">{q.text}</div>
                  {canEditQuestion(q, userId) && (
                    <button
                      type="button"
                      className="kaf-link"
                      onClick={() => setEditing(q)}
                    >
                      Редактировать
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </AppShell>
  );
}
