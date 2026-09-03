import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    environment: 'node',
    environmentMatchGlobs: [
      ['tests/browser/**', 'jsdom'],
      ['tests/components/**', 'jsdom'],
    ],
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['./tests/setup.ts'],
  },
});
