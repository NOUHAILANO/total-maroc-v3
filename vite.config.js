import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    // Zidi had l-partie darori bach i-t7el mouchkil dial [::1]
    server: {
        host: 'localhost',
        hmr: {
            host: 'localhost',
        },
    },
});