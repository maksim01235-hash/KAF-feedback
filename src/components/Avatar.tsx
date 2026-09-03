/**
 * Аватар площадки. Если URL нет — ничего не рендерим (карточка перестраивается без изображения).
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
  if (!url) return null;
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
