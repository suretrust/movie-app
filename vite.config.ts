import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-utils/setupTests.ts',
    coverage: {
      exclude: [
        'src/test-utils/*',
        'src/main.tsx',
        'src/App.tsx',
        './eslint.config.js',
        './vite.config.ts',
        './src/vite-env.d.ts',
      ],
    },
  },
});
