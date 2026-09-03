'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import {
  getVkUserProfile,
  getStoredProfile,
  setStoredProfile,
  type UserProfile,
} from '@/lib/identity';

/**
 * Auth-gate: экран авторизации через VK ID.
 * При успехе сохраняет профиль и вызывает onAuthed(profile).
 */
export function AuthScreen({
  onAuthed,
}: {
  onAuthed: (profile: UserProfile) => void;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>(
    'idle'
  );
  const [message, setMessage] = useState('');

  async function handleAuth() {
    setStatus('loading');
    setMessage('');
    const vkProfile = await getVkUserProfile();
    if (vkProfile) {
      setStoredProfile(vkProfile);
      setStatus('ok');
      setMessage(`Вы вошли как ${vkProfile.name || `пользователь VK (id ${vkProfile.id})`}`);
      onAuthed(vkProfile);
      return;
    }
    const stored = getStoredProfile();
    if (stored) {
      setStatus('ok');
      setMessage('Не удалось получить данные VK. Используется локальный профиль.');
      onAuthed(stored);
      return;
    }
    setStatus('error');
    setMessage('Не удалось авторизоваться через VK ID.');
  }

  return (
    <AppShell title="Авторизация">
      <div className="kaf-auth">
        <button
          type="button"
          className="kaf-btn kaf-btn-primary kaf-btn-lg"
          onClick={handleAuth}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Проверка…' : 'Авторизоваться через VK ID'}
        </button>

        {status === 'ok' && (
          <div className="kaf-auth-ok kaf-glass">{message}</div>
        )}
        {status === 'error' && (
          <div className="kaf-auth-error kaf-glass">{message}</div>
        )}

        <div className="kaf-privacy kaf-glass">
          <h3 className="kaf-section-title">Конфиденциальность</h3>
          <p>
            Приложение использует ваш идентификатор VK для привязки вопросов и
            отзывов. Мы не публикуем ваши личные данные и не передаём их третьим
            лицам. Вопросы и отзывы видны организаторам форума.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
