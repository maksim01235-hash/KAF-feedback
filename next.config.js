/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages — корень домена, без basePath
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
