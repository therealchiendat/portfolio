import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps asset URLs relative, so the build works on
// https://<user>.github.io/portfolio/ and on a custom domain alike.
export default defineConfig({
  base: './',
  plugins: [react()],
});
