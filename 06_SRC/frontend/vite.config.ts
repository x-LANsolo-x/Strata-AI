import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Configure the '@' alias to point to the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true, // Makes test utilities like 'expect' globally available
    environment: 'jsdom', // Simulates browser environment for React components
    setupFiles: './src/setupTests.ts', // File to run before each test file (e.g., for @testing-library/jest-dom)
    css: false, // Disable CSS processing for tests
  },
});
