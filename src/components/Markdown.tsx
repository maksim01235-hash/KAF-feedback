'use client';

import ReactMarkdown from 'react-markdown';

/**
 * Рендер Markdown-описания площадки.
 */
export function Markdown({ content }: { content?: string }) {
  if (!content) return null;
  return (
    <div className="kaf-markdown">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
