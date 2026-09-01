import type { Metadata, Viewport } from 'next';
import '@vkontakte/vkui/dist/vkui.css';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'КАФ\'26 — Красноярский астрономический форум',
  description:
    'Расписание площадок, вопросы и отзывы Красноярского астрономического форума «КАФ\'26».',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
