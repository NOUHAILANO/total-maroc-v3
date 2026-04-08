import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';
import { useEffect } from 'react';

export default function Checkout({ auth }) {
    const { cart, total, subtotal, discount, clearCart, isApprovedReseller } = useCart();
    const { translations, current_lang } = usePage().props;
    
    const t = (key) => {
        if (!key) return '';
        const lowKey = key.toLowerCase();
        return translations?.[current_lang]?.[lowKey] || key;
    };

    const { data, setData, post, processing, errors } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        phone: '',
        address: '',
        city: '',
        cart: cart, 
    });

    useEffect(() => {
        setData('cart', cart);
    }, [cart]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.store'), {
            onSuccess: () => {
                clearCart();
            },
            preserveScroll: true,
        });
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] uppercase font-black italic" dir={current_lang === 'AR' ? 'rtl' : 'ltr'}>
                <h2 className="text-2xl mb-6 text-gray-900">{t('panier_vide')}</h2>
                <Link href="/" className="bg-total-teal text-white px-8 py-4 rounded-2xl hover:bg-gray-900 transition-all shadow-lg">
                    {t('retour_au_shopping')}
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#fcfcfc] min-h-screen pb-20 font-sans italic font-bold" dir={current_lang === 'AR' ? 'rtl' : 'ltr'}>
            <Head title={`${t('checkout')} | Total Tools`} />
            
            <div className="bg-white border-b border-gray-100 py-6 mb-10 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center group">
                        <div className="text-gray-800 font-light text-2xl tracking-widest uppercase">
                            TOTAL <span className="font-black text-total-teal">TOOLS</span>
                        </div>
                    </Link>
                    <span className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">
                        {current_lang === 'AR' ? 'دفع آمن' : 'Checkout Sécurisé'}
                    </span>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                <div className="lg:col-span-7">
                    <h2 className={`text-3xl font-black mb-8 italic uppercase border-total-teal text-gray-900 tracking-tighter ${current_lang === 'AR' ? 'border-r-[6px] pr-4' : 'border-l-[6px] pl-4'}`}>
                        {t('informations')} <span className="text-total-teal">{t('livraison')}</span>
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-1">
                                    <label className={`block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest ${current_lang === 'AR' ? 'text-right' : ''}`}>
                                        {t('nom_complet')}
                                    </label>
                                    <input value={data.name} onChange={e => setData('name', e.target.value)} type="text" className={`w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:border-total-teal focus:ring-0 transition-all font-bold ${current_lang === 'AR' ? 'text-right' : ''}`} required />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>
                                <div>
                                    <label className={`block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest ${current_lang === 'AR' ? 'text-right' : ''}`}>
                                        {t('telephone')}
                                    </label>
                                    <input value={data.phone} onChange={e => setData('phone', e.target.value)} type="tel" className={`w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:border-total-teal focus:ring-0 transition-all font-bold ${current_lang === 'AR' ? 'text-right' : ''}`} placeholder="06XXXXXXXX" required />
                                    {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className={`block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest ${current_lang === 'AR' ? 'text-right' : ''}`}>
                                        {t('adresse')}
                                    </label>
                                    <textarea value={data.address} onChange={e => setData('address', e.target.value)} className={`w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:border-total-teal focus:ring-0 transition-all font-bold ${current_lang === 'AR' ? 'text-right' : ''}`} rows="3" required></textarea>
                                    {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address}</div>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className={`block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest ${current_lang === 'AR' ? 'text-right' : ''}`}>
                                        {t('ville')}
                                    </label>
                                    <input value={data.city} onChange={e => setData('city', e.target.value)} type="text" className={`w-full border-2 border-gray-50 bg-gray-50 rounded-2xl p-4 focus:border-total-teal focus:ring-0 transition-all font-bold ${current_lang === 'AR' ? 'text-right' : ''}`} required />
                                    {errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
                                </div>
                            </div>
                        </div>

                        <div className={`bg-gray-900 p-6 rounded-[30px] border border-gray-800 flex items-start gap-4 shadow-lg ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                            <span className="text-2xl">🚚</span>
                            <div className={current_lang === 'AR' ? 'text-right' : ''}>
                                <p className="font-black text-total-teal uppercase text-sm tracking-tight">{t('paiement_livraison')}</p>
                                <p className="text-gray-400 text-[10px] italic font-medium">{t('livraison_express_desc')}</p>
                            </div>
                        </div>

                        <button disabled={processing} className="w-full bg-[#232323] text-white font-black py-6 rounded-[30px] text-xl hover:bg-total-teal transition-all shadow-xl active:scale-95 uppercase tracking-widest italic group">
                            {processing ? t('traitement') : (
                                <span className={`flex items-center justify-center gap-3 ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                    {t('confirmer_commande')} 
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 group-hover:translate-x-2 transition-transform ${current_lang === 'AR' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            )}
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-5">
                    <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden sticky top-32">
                        <div className="bg-[#232323] text-white p-8">
                            <h3 className={`font-black uppercase italic tracking-widest flex justify-between items-center text-sm ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                {t('votre_commande')}
                                <span className="bg-total-teal text-[10px] px-3 py-1 rounded-full">{cart.length} {t('articles')}</span>
                            </h3>
                        </div>
                        <div className="p-8">
                            <div className="max-h-80 overflow-y-auto mb-8 space-y-6 pr-2 scrollbar-thin">
                                {cart.map(item => {
                                    // ✅ Déclarya l-activePrice hna bach t-kon accessible f west l-loop
                                    const activePrice = item.current_price || item.price;

                                    return (
                                        <div key={item.id} className={`flex gap-4 items-center border-b border-gray-50 pb-6 last:border-0 ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                            <div className="w-20 h-20 bg-gray-50 rounded-[20px] p-3 shrink-0 flex items-center justify-center border border-gray-100">
                                                <img src={item.image?.startsWith('http') ? item.image : `/storage/${item.image}`} className="max-h-full max-w-full object-contain mix-blend-multiply" alt={item.name} />
                                            </div>
                                            <div className={`flex-1 ${current_lang === 'AR' ? 'text-right' : 'text-left'}`}>
                                                <h4 className="text-[11px] font-black uppercase line-clamp-2 leading-tight text-gray-800 mb-1">{item.name}</h4>
                                                <p className="text-total-teal text-[10px] font-black">{t('qte')}: {item.qty}</p>
                                                {isApprovedReseller && <span className="text-[8px] text-teal-600 italic">Prix Revendeur Appliqué</span>}
                                            </div>
                                            <span className="font-black text-sm text-gray-900 whitespace-nowrap">
                                                {(Number(activePrice) * item.qty).toFixed(2)} {t('currency')}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="space-y-4 pt-6 border-t-2 border-gray-50">
                                <div className={`flex justify-between text-gray-400 text-xs font-black uppercase tracking-widest ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                    <span>{t('sous_total')}</span>
                                    <span className="text-gray-900">{subtotal.toFixed(2)} {t('currency')}</span>
                                </div>
                                {discount > 0 && (
                                    <div className={`flex justify-between text-red-500 text-xs font-black uppercase tracking-widest italic ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                        <span>{t('remise')}</span>
                                        <span>-{discount.toFixed(2)} {t('currency')}</span>
                                    </div>
                                )}
                                <div className={`flex justify-between text-xs font-black uppercase tracking-widest ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                    <span className="text-gray-400">{t('livraison')}</span>
                                    <span className="text-total-teal">{t('gratuite')}</span>
                                </div>
                                <div className={`flex justify-between text-4xl font-black border-t-4 border-gray-900 pt-6 mt-6 ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                    <span className="italic tracking-tighter">{t('total')}</span>
                                    <div className={`flex items-baseline gap-2 ${current_lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                        <span className="text-gray-900 tracking-tighter">{total.toFixed(2)}</span>
                                        <small className="text-xs text-total-teal uppercase">{t('currency')}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}