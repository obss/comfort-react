import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        include: ['@emotion/react', '@emotion/styled'],
    },
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            include: '**/*.{js,jsx,tsx}',
        }),
    ],
    base: '/comfort-react/',
    build: {
        outDir: 'storybook-dist',
    },
});
