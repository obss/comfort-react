import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
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
