/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages публикует проект на подпути /KAF-feedback/.
  // basePath + assetPrefix заставляют Next.js генерировать пути ассетов
  // с префиксом /KAF-feedback/, иначе CSS/JS не загружаются (404).
  basePath: '/KAF-feedback',
  assetPrefix: '/KAF-feedback/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
