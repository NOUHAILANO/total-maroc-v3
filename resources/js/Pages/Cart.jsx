import React, { useEffect, useState } from 'react'; 
import { Link, Head, usePage } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext'; 
import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';

export default function Cart() {
    const { cart, removeFromCart, updateQty, clearCart } = useCart();
    
    // ✅ 1. Props reactive men usePage
    const { auth, site_settings, translations, current_lang } = usePage().props;
    
    // ✅ 2. Logic dial Traduction
    const t = (key) => {
        if (!key) return '';
        const lowKey = key.toLowerCase();
        return translations?.[current_lang]?.[lowKey] || key;
    };
    
    const [localCart, setLocalCart] = useState(cart);

    useEffect(() => {
        setLocalCart(cart);
    }, [cart]);

    // Check wach l-user 3ndo status approved
    const isApprovedReseller = auth?.user?.reseller?.status === 'approved';

    // ✅ 3. Calcul dyal Subtotal b l-prix l-mousha7 (reseller_price)
    const currentSubtotal = localCart.reduce((acc, item) => {
        // Kan-tأkdo dima wach l-prix jay Number bach may-traxh mouchkil f l-calcul
        const price = isApprovedReseller ? (item.reseller_price || item.price) : item.price;
        return acc + (Number(price) * (item.qty || 1));
    }, 0);

    const currentTotal = currentSubtotal;

    return (
        <div className="bg-[#fcfcfc] min-h-screen font-sans italic font-bold" dir={current_lang === 'AR' ? 'rtl' : 'ltr'}>
            <Head title={`${t('panier')} | ${site_settings?.site_name || 'Total Tools'}`} />

            {/* --- NAVBAR --- */}
            <nav className="bg-white border-b h-20 flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center">
                        <ApplicationLogo className="h-10 w-auto" />
                        <span className={`ml-2 text-xl uppercase italic ${current_lang === 'AR' ? 'mr-2' : ''}`}>
                            {site_settings?.site_name?.split(' ')[0] || 'Total'} <span className="text-total-teal font-black">Tools</span>
                        </span>
                    </Link>
                    
                    <Link href="/" className="text-[10px] font-black uppercase tracking-widest hover:text-total-teal transition-colors">
                        {t('accueil')}
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <Link 
                        href={route('language.change', current_lang === 'FR' ? 'AR' : 'FR')}
                        className="text-xs font-black hover:text-total-teal transition-all px-3 py-1 bg-gray-100 rounded-lg uppercase"
                    >
                        {current_lang === 'FR' ? 'AR' : 'FR'}
                    </Link>

                    <Link href="/" className="text-xs uppercase hover:text-total-teal transition font-black tracking-tighter">
                        {current_lang === 'AR' ? `← ${t('retour_au_shopping')}` : `← ${t('retour_au_shopping')}`}
                    </Link>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-black italic uppercase mb-10 border-l-8 border-total-teal pl-4 tracking-tighter">
                    {t('votre')} <span className="text-total-teal">{t('panier')}</span>
                </h1>

                {localCart.length === 0 ? (
                    <div className="bg-white border-2 border-dashed rounded-[40px] p-20 text-center shadow-sm">
                        <p className="text-gray-400 text-xl uppercase mb-6 font-black">
                            {t('panier_vide')}
                        </p>
                        <Link href="/" className="bg-total-teal text-white px-8 py-4 rounded-2xl uppercase text-sm font-black hover:bg-gray-900 transition shadow-lg inline-block">
                            {t('commencer_achats')}
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {localCart.map((item) => {
                                // ✅ 4. Match l-prix l-mounassib l l-affichage
                                const activePrice = isApprovedReseller ? (item.reseller_price || item.price) : item.price;
                                
                                return (
                                    <div key={item.id} className="bg-white border rounded-[30px] p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition">
                                        <img 
                                            src={item.image?.startsWith('http') ? item.image : `/storage/${item.image}`} 
                                            className="w-24 h-24 object-contain rounded-xl bg-gray-50"
                                            alt={item.name}
                                        />
                                        <div className="flex-1">
                                            <h3 className="uppercase text-sm font-black line-clamp-1">{item.name}</h3>
                                            
                                            <div className={`flex items-center gap-2 mt-1 ${current_lang === 'AR' ? 'flex-row-reverse justify-end' : ''}`}>
                                                <p className="text-total-teal text-lg font-black">{activePrice} {t('currency')}</p>
                                                
                                                {/* ✅ Bayen badge "Prix Pro" ila kan revendeur o 3ndo prix khass */}
                                                {isApprovedReseller && item.reseller_price && (
                                                    <span className="text-[9px] bg-teal-50 text-total-teal px-2 py-0.5 rounded border border-teal-100 uppercase">
                                                        {t('prix_pro')}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border-2 border-gray-100 rounded-xl bg-gray-50 overflow-hidden" dir="ltr">
                                                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-4 py-2 hover:bg-total-teal hover:text-white transition font-black">-</button>
                                                    <span className="px-4 font-black text-sm border-x border-gray-200">{item.qty}</span>
                                                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-4 py-2 hover:bg-total-teal hover:text-white transition font-black">+</button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-[10px] uppercase hover:text-red-700 font-black tracking-tighter underline underline-offset-4">
                                                    {t('supprimer')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            
                            <button onClick={clearCart} className="text-gray-400 text-[10px] uppercase hover:text-red-500 mt-4 px-4 transition font-black tracking-widest flex items-center gap-2">
                                <span>🗑️</span> {t('vider_le_panier')}
                            </button>
                        </div>

                        <aside className="bg-[#232323] text-white rounded-[40px] p-8 h-fit lg:sticky lg:top-24 shadow-xl">
                            <h2 className="text-2xl font-black uppercase italic mb-8 border-b border-gray-700 pb-4 tracking-tighter">
                                {t('resume')}
                            </h2>
                            
                            <div className="space-y-4 text-sm uppercase tracking-wider">
                                <div className={`flex justify-between ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                    <span className="text-gray-400 font-medium">{t('sous_total')}</span>
                                    <span className="font-black">{currentTotal.toFixed(2)} {t('currency')}</span>
                                </div>
                                <div className={`flex justify-between ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                    <span className="text-gray-400 font-medium">{t('livraison')}</span>
                                    <span className="text-total-teal font-black">{t('gratuite')}</span>
                                </div>
                                <div className="pt-6 mt-6 border-t border-gray-700 flex justify-between items-baseline">
                                    <span className="font-black text-lg">{t('total')}</span>
                                    <span className={`text-3xl font-black text-total-teal italic tracking-tighter flex items-baseline gap-2 ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                        {currentTotal.toFixed(2)} <small className="text-xs uppercase">{t('currency')}</small>
                                    </span>
                                </div>
                            </div>

                            <Link href={route('checkout')} className="block w-full bg-total-teal text-white text-center py-5 rounded-2xl mt-10 font-black uppercase italic hover:bg-white hover:text-total-teal transition-all shadow-lg active:scale-95">
                                {t('passer_a_la_caisse')}
                            </Link>
                        </aside>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}