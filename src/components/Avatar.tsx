/**
 * Аватар площадки. Если URL нет — показываем заглушку с инициалом.
 */
export function Avatar({
  url,
  name,
  size = 64,
}: {
  url?: string;
  name: string;
  size?: number;
}) {
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={name}
        width={size}
        height={size}
        className="kaf-avatar"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="kaf-avatar kaf-avatar-placeholder"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}
