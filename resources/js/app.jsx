import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { CartProvider } from '@/Contexts/CartContext';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
        .then(module => {
            const Page = module.default;
            // هنا نلفو الصفحة بـ CartProvider
            return (props) => (
                <CartProvider>
                    <Page {...props} />
                </CartProvider>
            );
        }),
    setup({ el, App, props }) {
        const root = createRoot(el);
        // هاد App دابا هو الـ wrapper لي فيه CartProvider
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});