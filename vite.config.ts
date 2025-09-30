import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  base: '/red-light-green-light',
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        '**/index.ts',
        '**/types.ts',
        '**/constants.ts',
        '**/*.d.ts',
        'src/test/**',
        'src/App.tsx',
        'src/main.tsx',
      ],
    },
  },
}))
