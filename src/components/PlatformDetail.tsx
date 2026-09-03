'use client';

import type { Platform, Question } from '@/types';
import { isActive } from '@/lib/time';
import { Avatar } from '@/components/Avatar';
import { Markdown } from '@/components/Markdown';
import { StarRating } from '@/components/StarRating';
import { navigate } from '@/lib/router';
import { canEditQuestion } from '@/lib/identity';
import { setEditingQuestion } from '@/lib/editingState';

function formatTime(ms: string | number | null | undefined): string {
  if (ms === null || ms === undefined) return '';
  const num = typeof ms === 'number' ? ms : Date.parse(ms);
  if (Number.isNaN(num)) return '';
  const d = new Date(num);
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Детальная страница площадки.
 */
export function PlatformDetail({
  platform,
  questions,
  serverTimeMs,
  currentUserId,
  onDeleteQuestion,
}: {
  platform: Platform;
  questions: Question[];
  serverTimeMs: number;
  currentUserId: string | null;
  onDeleteQuestion?: (id: string) => Promise<boolean>;
}) {
  const active = isActive(platform, serverTimeMs);
  const start = formatTime(platform.time_start);
  const end = formatTime(platform.time_end);

  return (
    <div className="kaf-detail">
      <div className="kaf-detail-head kaf-glass">
        <div className="kaf-detail-head-info">
          <h1 className="kaf-title">{platform.name}</h1>
          {platform.subtitle && (
            <div className="kaf-subtitle">{platform.subtitle}</div>
          )}
          {active && <span className="kaf-badge">Сейчас идёт</span>}
        </div>
      </div>

      {(start || end || platform.location) && (
        <div className="kaf-detail-meta kaf-glass">
          {start && end && (
            <div className="kaf-detail-meta-item">
              <span className="kaf-detail-meta-label">Время</span>
              <span>
                {start} — {end}
              </span>
            </div>
          )}
          {platform.location && (
            <div className="kaf-detail-meta-item">
              <span className="kaf-detail-meta-label">Место</span>
              <span>{platform.location}</span>
            </div>
          )}
        </div>
      )}

      {(platform.speaker || platform.speaker_title) && (
        <div className="kaf-detail-speaker kaf-glass">
          <Avatar
            url={platform.avatar_url}
            name={platform.speaker || platform.name}
            size={56}
          />
          <div className="kaf-detail-speaker-info">
            {platform.speaker && (
              <div className="kaf-detail-speaker-name">{platform.speaker}</div>
            )}
            {platform.speaker_title && (
              <div className="kaf-detail-speaker-title">
                {platform.speaker_title}
              </div>
            )}
          </div>
        </div>
      )}

      {platform.description && (
        <div className="kaf-detail-description kaf-glass">
          <Markdown content={platform.description} />
        </div>
      )}

      {questions.length > 0 && (
        <div className="kaf-detail-questions">
          <h2 className="kaf-section-title">Мои вопросы</h2>
          {questions.map((q) => (
            <div key={q.id} className="kaf-question kaf-glass">
              <div className="kaf-question-text">{q.text}</div>
              {q.rating ? (
                <div className="kaf-question-rating">
                  <StarRating value={q.rating} readOnly />
                </div>
              ) : null}
              {canEditQuestion(q, currentUserId) && (
                <div className="kaf-question-actions">
                  <button
                    type="button"
                    className="kaf-link"
                    onClick={() => {
                      setEditingQuestion(q);
                      navigate(`ask/${platform.id}`);
                    }}
                  >
                    Редактировать
                  </button>
                  <button
                    type="button"
                    className="kaf-link kaf-link-danger"
                    onClick={async () => {
                      if (!window.confirm('Удалить вопрос?')) return;
                      if (onDeleteQuestion && (await onDeleteQuestion(q.id))) {
                        // список обновляется родителем
                      }
                    }}
                  >
                    Удалить
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="kaf-fab">
        <button
          type="button"
          className="kaf-btn kaf-btn-primary"
          onClick={() => navigate(`ask/${platform.id}`)}
        >
          Задать вопрос
        </button>
        <button
          type="button"
          className="kaf-btn kaf-btn-secondary"
          onClick={() => navigate(`review/${platform.id}`)}
        >
          Оставить отзыв
        </button>
      </div>
    </div>
  );
}
