import { Head, Link, usePage } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';
import Footer from '@/Components/Footer';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function ProductDetails({ product }) {
    const { addToCart, cart } = useCart();
    
    // ✅ 1. Props kay-jiw men HandleInertiaRequests
    const { site_settings, translations, current_lang } = usePage().props;

    // ✅ 2. Translation function (Fixed logic)
    const t = (key) => {
        if (!key) return '';
        const lowKey = key.toLowerCase(); 
        return translations?.[current_lang]?.[lowKey] || key;
    };

    return (
        /* ✅ 3. Direction dynamic RTL/LTR 3la hsab l-lugha */
        <div className="bg-[#fcfcfc] min-h-screen font-sans text-gray-900 italic font-bold" dir={current_lang === 'AR' ? 'rtl' : 'ltr'}>
            <Head title={`${product.name} | ${site_settings?.site_name || 'Total Tools'}`} />

            {/* --- NAVBAR --- */}
            <nav className="bg-white border-b border-gray-100 h-20 flex items-center shadow-sm px-4">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                    <Link href="/" className="flex items-center">
                        <ApplicationLogo className="h-10 w-auto text-total-teal fill-current" />
                        <span className={`ml-2 uppercase tracking-widest text-xl ${current_lang === 'AR' ? 'mr-2' : ''}`}>
                            {site_settings?.site_name?.split(' ')[0] || 'Total'} <span className="text-total-teal font-black">Tools</span>
                        </span>
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        {/* ✅ Bouton change language */}
                        <Link 
                            href={route('language.change', current_lang === 'FR' ? 'AR' : 'FR')}
                            className="text-xs font-black hover:text-total-teal transition-all px-3 py-1 bg-gray-100 rounded-lg uppercase"
                        >
                            {current_lang === 'FR' ? 'AR' : 'FR'}
                        </Link>

                        <Link href={route('cart.index')} className="relative p-3 bg-gray-50 rounded-2xl hover:bg-total-teal hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-total-teal text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">{cart.length}</span>}
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* ✅ Traduction: Retour au shop */}
                <Link href={route('home')} className="text-total-teal mb-10 inline-block hover:underline uppercase text-sm tracking-widest">
                    {t('back_to_shop')} 
                </Link>

                <div className="bg-white rounded-[50px] shadow-sm border border-gray-100 flex flex-col lg:flex-row overflow-hidden">
                    <div className={`lg:w-1/2 p-12 flex items-center justify-center bg-white border-gray-50 ${current_lang === 'AR' ? 'border-l' : 'border-r'}`}>
                        <img 
                            src={product.image?.startsWith('http') ? product.image : `/storage/${product.image}`} 
                            alt={product.name}
                            className="max-h-[500px] object-contain hover:scale-105 transition duration-500"
                        />
                    </div>

                    <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col">
                        <span className="text-total-teal uppercase tracking-[0.2em] text-xs mb-4">{product.category}</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase italic mb-8 leading-tight tracking-tighter">
                            {product.name}
                        </h1>
                        
                        {/* ✅ Traduction: Currency (DH / درهم) */}
                        <div className={`text-4xl font-black text-gray-900 mb-10 italic flex items-baseline gap-2 ${current_lang === 'AR' ? 'flex-row-reverse justify-end' : ''}`}>
                             <span>{product.price}</span> 
                             <span className="text-lg uppercase">{t('currency')}</span>
                        </div>

                        <div className="prose prose-sm mb-12 text-gray-500 font-medium not-italic leading-relaxed">
                            {/* ✅ Traduction: Titre Description */}
                            <h4 className="uppercase font-black text-gray-900 mb-2 italic">{t('description_title')}</h4>
                            <p className={current_lang === 'AR' ? 'text-right' : ''}>
                                {product.description || t('no_description')}
                            </p>
                        </div>

                        <div className="mt-auto space-y-6">
                            <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 ${current_lang === 'AR' ? 'flex-row-reverse justify-end' : ''}`}>
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                {/* ✅ Traduction: Stock */}
                                {t('stock_available')}
                            </div>
                            
                            <button 
                                onClick={() => addToCart(product)}
                                className="w-full bg-[#232323] text-white py-6 rounded-[25px] font-black uppercase italic hover:bg-total-teal transition-all shadow-xl active:scale-95 text-lg tracking-widest"
                            >
                                {/* ✅ Traduction: Add to Cart */}
                                {t('add_to_cart')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}