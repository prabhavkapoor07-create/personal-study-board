import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// NOTE: if/when you deploy this under a GitHub Pages subpath
// (e.g. username.github.io/personal-study-board/react-app/),
// set `base: '/personal-study-board/react-app/'` below.
export default defineConfig({
  plugins: [react()],
});
