import React, { useState, useEffect } from 'react';
import { Link, Head, usePage, router } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';

const translations = {
    FR: {
        time: "Sam - Jeu 8:00 - 19:00",
        delivery: "Livraison 48h partout au Maroc",
        follow: "Suivez-nous",
        contact: "Contact",
        reseller_pro: "🌟 Partenaire Pro",
        reseller_pending: "⏳ Demande en attente",
        reseller_apply: "🤝 Devenir Revendeur",
        quitter: "Quitter",
        connexion: "Connexion",
        inscription: "Inscription",
        quality: "Qualité Professionnelle",
        hero_title: "ÉQUIPEZ-VOUS",
        hero_subtitle: "COMME UN PRO.",
        hero_desc: "Découvrez la performance brute avec la gamme complète TOTAL. Conçue pour les professionnels, accessible pour tous.",
        explore: "Explorer la Gamme",
        warranty: "Garantie 1 An",
        new: "Nouveau",
        stock: "Stock Disponible",
        morocco: "Maroc Entier",
        rayons: "Rayons",
        all_products: "Tous les produits",
        pro_tools: "L'Outillage",
        references: "RÉFÉRENCES",
        details: "Voir Détails",
        reseller_price: "Prix Revendeur",
        no_products: "Aucun produit trouvé",
        my_orders: "Mes Commandes",
        categories: [
            "ACCESSOIRES", "ÉCHELLE ET ESCABEAU", "MOYENS DE RANGEMENT",
            "OUTILS À MAIN", "OUTILS ÉLECTRIQUES", "SÉCURITÉ",
            "CONSTRUCTION", "PEINTURE", "OUTILS À BATTERIE",
            "JARDINAGE", "SOUDURE", "POMPAGE"
        ]
    },
    AR: {
        time: "السبت - الخميس 8:00 - 19:00",
        delivery: "توصيل في 48 ساعة لجميع مدن المغرب",
        follow: "تابعونا",
        contact: "اتصل بنا",
        reseller_pro: "🌟 شريك محترف",
        reseller_pending: "⏳ الطلب قيد الانتظار",
        reseller_apply: "🤝 كن موزعاً لنا",
        quitter: "خروج",
        connexion: "تسجيل الدخول",
        inscription: "إنشاء حساب",
        quality: "جودة احترافية",
        hero_title: "تجهز كـ",
        hero_subtitle: "المحترفين.",
        hero_desc: "اكتشف القوة والأداء مع مجموعة توتال الكاملة. مصممة للمحترفين ومتاحة للجميع.",
        explore: "اكتشف المجموعة",
        warranty: "ضمان لمدة سنة",
        new: "جديد",
        stock: "المخزون متوفر",
        morocco: "كل المغرب",
        rayons: "الأقسام",
        all_products: "جميع المنتجات",
        pro_tools: "معدات",
        references: "منتج",
        details: "عرض التفاصيل",
        reseller_price: "ثمن الموزع",
        no_products: "لم يتم العثور على أي منتج",
        my_orders: "طلباتي",
        categories: [
            "إكسسوارات", "سلالم", "وسائل التخزين",
            "أدوات يدوية", "أدوات كهربائية", "السلامة",
            "البناء", "الصباغة", "أدوات البطارية",
            "البستنة", "التلحيم", "المضخات"
        ]
    }
};

function WelcomeContent({ auth, products, filters, canLogin, canRegister }) {
    const { addToCart, cart, clearCart } = useCart();
    const { site_settings, locale } = usePage().props;

    const [lang, setLang] = useState(locale?.toUpperCase() || localStorage.getItem('app_lang') || 'FR');
    const t = translations[lang];

    useEffect(() => {
        localStorage.setItem('app_lang', lang);
        document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang.toLowerCase();
    }, [lang]);

    const isApprovedReseller = auth.user?.reseller?.status === 'approved';
    const isPendingReseller = auth.user?.reseller?.status === 'pending';

    const handleLogout = (e) => {
        e.preventDefault();
        if (clearCart) clearCart();
        router.post(route('logout'), {}, {
            onSuccess: () => { window.location.href = "/"; }
        });
    };

    // Helper function to generate correct image URL
    const getImageUrl = (imagePath) => {
        if (!imagePath) return 'https://placehold.co/400x400?text=TOTAL+Tool';
        if (imagePath.startsWith('http')) return imagePath;
        // Remove any 'products/' prefix to avoid double
        const cleanPath = imagePath.replace(/^products\//, '');
        return `/storage/products/${cleanPath}`;
    };

    return (
        <div className={`bg-[#fcfcfc] min-h-screen font-sans text-gray-900 italic font-bold ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
            <Head title={`${site_settings?.site_name || 'Total Tools'} | Vente Outillage`} />

            {/* --- TOP BAR --- */}
            <div className="bg-[#232323] text-white text-[10px] md:text-xs py-2.5 px-4 flex justify-between items-center tracking-widest uppercase font-black">
                <div className="flex gap-4 items-center">
                    <span>🕒 {t.time}</span>
                    <span className="hidden md:inline italic text-total-teal border-l border-white/20 pl-4">
                        {site_settings?.phone ? `📞 ${site_settings.phone}` : `🚚 ${t.delivery}`}
                    </span>
                </div>

                <div className="flex gap-6 items-center uppercase font-black">
                    <div className="relative group cursor-pointer flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full hover:bg-total-teal transition-all">
                        <span className="text-[9px]">🌐</span>
                        <span>{lang}</span>
                        <div className="absolute top-full right-0 mt-1 w-24 bg-white text-gray-900 rounded-xl shadow-xl hidden group-hover:block z-[100] overflow-hidden border border-gray-100">
                            <Link
                                href={route('language.change', 'FR')}
                                onClick={() => { setLang('FR'); localStorage.setItem('app_lang', 'FR'); }}
                                className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-50 no-underline text-gray-900"
                            > Français </Link>
                            <Link
                                href={route('language.change', 'AR')}
                                onClick={() => { setLang('AR'); localStorage.setItem('app_lang', 'AR'); }}
                                className="block px-4 py-2 hover:bg-gray-100 no-underline text-gray-900"
                            > العربية </Link>
                        </div>
                    </div>
                    <span className="hover:text-total-teal cursor-pointer transition hidden sm:inline">{t.follow}</span>
                </div>
            </div>

            {/* --- MAIN NAVBAR --- */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 flex justify-between h-20 items-center">
                    <Link href="/" className="flex items-center group">
                        <ApplicationLogo className="h-10 w-auto" />
                        <div className={`text-[#006666] text-xl ${lang === 'AR' ? 'mr-3' : 'ml-3'} italic tracking-widest uppercase font-medium`}>
                            TOTAL <span className="font-black">TOOLS</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        {auth.user && auth.user.role !== 'admin' && (
                            <Link href={route('orders.index')} className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest hover:text-total-teal transition-all group px-2 border-r border-gray-100 pr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-total-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                {t.my_orders}
                            </Link>
                        )}

                        <Link href={route('contact.index')} className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest hover:text-total-teal transition-all group px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-total-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {t.contact}
                        </Link>

                        {auth.user && auth.user.role !== 'admin' && (
                            <div className="hidden lg:flex items-center border-l border-gray-100 pl-4">
                                {isApprovedReseller ? (
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest text-total-teal bg-teal-50 px-4 py-2 rounded-full border border-teal-100">
                                        {t.reseller_pro}
                                    </div>
                                ) : isPendingReseller ? (
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100 animate-pulse">
                                        {t.reseller_pending}
                                    </div>
                                ) : (
                                    <Link href={route('reseller.apply')} className="flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest text-total-teal hover:text-gray-900 transition-all border border-total-teal/20 px-4 py-2 rounded-full">
                                        {t.reseller_apply}
                                    </Link>
                                )}
                            </div>
                        )}

                        <Link href={route('cart.index')} className="relative p-3 bg-gray-50 rounded-2xl hover:bg-total-teal hover:text-white transition-all shadow-sm border border-gray-100 group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cart?.length > 0 && (
                                <span className={`absolute -top-1 ${lang === 'AR' ? '-left-1' : '-right-1'} bg-total-teal text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-white`}>
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        <div className={`flex items-center border-l border-gray-100 ${lang === 'AR' ? 'pr-4 mr-2' : 'pl-4 ml-2'}`}>
                            {auth.user ? (
                                <div className="flex items-center gap-4">
                                    <Link href={auth.user.role === 'admin' ? route('admin.products.index') : route('profile.edit')} className="p-3 bg-gray-50 rounded-2xl hover:bg-total-teal hover:text-white transition-all shadow-sm border border-gray-100 flex items-center gap-2 group">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="text-[10px] font-black uppercase hidden md:inline">
                                            {auth.user.role === 'admin' ? 'Dashboard' : 'Profil'}
                                        </span>
                                    </Link>
                                    <button onClick={handleLogout} className="text-red-600 italic hover:text-red-800 transition uppercase font-black text-[10px] tracking-tighter">
                                        {t.quitter}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href={route('login')} className="bg-total-teal text-white px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase italic shadow-md hover:bg-gray-900 transition-all whitespace-nowrap">
                                        {t.connexion}
                                    </Link>
                                    <Link href={route('register')} className="bg-gray-100 text-gray-800 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase italic hover:bg-gray-200 transition-all border border-gray-200 whitespace-nowrap">
                                        {t.inscription}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <div className="relative bg-[#f3f4f6] rounded-[50px] overflow-hidden min-h-[480px] flex flex-col md:flex-row items-center shadow-sm border border-gray-100 group">
                    <div className="relative z-20 p-10 md:p-16 flex-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-8 h-[2px] bg-total-teal"></span>
                            <span className="text-total-teal text-[10px] font-black uppercase tracking-[0.2em]">{t.quality}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 italic uppercase leading-none tracking-tighter mb-6">
                            {t.hero_title} <br />
                            <span className="text-total-teal">{t.hero_subtitle}</span>
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base mb-8 font-medium max-w-sm leading-relaxed italic">{t.hero_desc}</p>
                        <div className="flex gap-4">
                            <button className="bg-[#232323] text-white px-8 py-4 rounded-2xl font-black uppercase italic hover:bg-total-teal transition-all shadow-lg text-xs">
                                {t.explore}
                            </button>
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
                                <span className="text-xl">🛠️</span>
                                <span className="text-[9px] font-black uppercase text-gray-400">{t.warranty}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative h-full w-full min-h-[350px] flex items-center justify-center p-10">
                        <div className="absolute inset-0 bg-total-teal/5 rounded-full scale-75 blur-3xl"></div>
                        <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-700">
                                <img src="storage\app\public\products\LOGO.png" alt="Hero Product" className="max-h-[380px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]" />
                            </div>
                        <div className={`absolute top-10 ${lang === 'AR' ? 'left-10' : 'right-10'} bg-white p-4 rounded-3xl shadow-xl border border-gray-50 hidden lg:block animate-bounce`}>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase leading-none">{t.new}</p>
                                <p className="text-xl font-black text-total-teal leading-none">2026</p>
                            </div>
                        </div>
                        <div className={`absolute bottom-10 ${lang === 'AR' ? 'right-0' : 'left-0'} bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white hidden lg:flex items-center gap-3`}>
                            <div className="w-10 h-10 bg-total-teal/10 rounded-full flex items-center justify-center text-total-teal">✅</div>
                            <div>
                                <p className="text-[10px] font-black uppercase leading-none">{t.stock}</p>
                                <p className="text-[9px] text-gray-400 italic font-bold">{t.morocco}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- PRODUCTS SECTION --- */}
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
                <aside className="w-full lg:w-72">
                    <h3 className={`font-black text-2xl mb-8 italic uppercase ${lang === 'AR' ? 'border-r-[6px] pr-4' : 'border-l-[6px] pl-4'} border-total-teal text-gray-900 tracking-tighter`}>{t.rayons}</h3>
                    <div className="bg-white border border-gray-100 rounded-[30px] p-8 shadow-sm">
                        <ul className="space-y-4 text-[11px] text-gray-500 font-black uppercase tracking-tight">
                            <li className="mb-4 pb-4 border-b border-gray-50">
                                <Link href={route('home')} className="text-total-teal hover:text-gray-900 flex items-center gap-2">
                                    🏠 {t.all_products}
                                </Link>
                            </li>
                            {t.categories.map((cat, i) => (
                                <li key={i} className="group">
                                    <Link href={route('home')} data={{ category: cat }} preserveState preserveScroll className={`flex items-center gap-3 transition-all hover:translate-x-2 ${filters?.category === cat ? 'text-total-teal' : 'hover:text-total-teal'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full transition ${filters?.category === cat ? 'bg-total-teal' : 'bg-gray-200'}`}></span>
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <section className="flex-1">
                    <div className="mb-12 flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-gray-100 pb-6">
                        <h2 className="text-5xl font-black text-gray-900 italic uppercase tracking-tighter leading-none">
                            {filters?.category ? filters.category : t.pro_tools} <span className="text-total-teal">Pro</span>
                        </h2>
                        <div className="bg-white border border-gray-100 px-4 py-2 rounded-full text-[9px] font-black text-gray-400 tracking-widest italic uppercase">
                            {products.length} {t.references}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {products.length > 0 ? products.map((product) => (
                            <div key={`${product.id}-${product.updated_at}`} className="bg-white border border-gray-100 rounded-[40px] overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full">
                                {/* IMAGE AVEC CHEMIN CORRIGÉ */}
                                <div className="h-64 bg-white p-10 flex items-center justify-center shrink-0">
                                    <img
                                        src={getImageUrl(product.image)}
                                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/400x400?text=TOTAL+Tool';
                                        }}
                                    />
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="font-black text-gray-800 h-12 line-clamp-2 uppercase italic text-sm mb-4 leading-tight group-hover:text-total-teal transition">
                                        {product.name}
                                    </h3>
                                    <Link href={route('products.show', product.id)} className="mb-6 text-[10px] text-center border-2 border-gray-100 py-2 rounded-xl hover:bg-gray-50 hover:border-total-teal transition-all uppercase tracking-widest font-black">
                                        {t.details}
                                    </Link>
                                    <div className="mt-auto flex justify-between items-center border-t border-gray-50 pt-6">
                                        <div className="flex flex-col">
                                            {isApprovedReseller ? (
                                                <>
                                                    <span className="text-[9px] text-total-teal font-black uppercase tracking-tighter">{t.reseller_price}</span>
                                                    <span className="text-2xl font-black text-total-teal">{product.reseller_price} <small className="text-[10px]">DH</small></span>
                                                    <span className="text-[10px] line-through text-gray-400 italic font-medium">{product.price} DH</span>
                                                </>
                                            ) : (
                                                <span className="text-2xl font-black text-gray-900">{product.price} <small className="text-[10px]">DH</small></span>
                                            )}
                                        </div>
                                        <button onClick={() => addToCart(product)} className="bg-[#232323] hover:bg-total-teal text-white p-4 rounded-2xl transition-all shadow-lg active:scale-95">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full py-20 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                                <p className="text-gray-300 font-black text-xl uppercase italic">{t.no_products}</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default function Welcome(props) {
    return <WelcomeContent {...props} />;
}