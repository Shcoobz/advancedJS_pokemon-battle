import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/react_pokemon-battle/',
  build: {
    outDir: 'build',
  },
});
