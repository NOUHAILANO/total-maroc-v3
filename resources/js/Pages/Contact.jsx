import { useForm, Head, usePage, Link } from '@inertiajs/react'; // ✅ Zadna Link
import Footer from '@/Components/Footer';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useCart } from '@/Contexts/CartContext';

export default function Contact() {
    const { cart } = useCart();
    
    // ✅ 1. Récupération dial l-hadra m-traduite + site_settings
    const { site_settings, translations, current_lang } = usePage().props;
    
    const t = (key) => {
        if (!key) return '';
        const lowKey = key.toLowerCase();
        return translations?.[current_lang]?.[lowKey] || key;
    };

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '', email: '', message: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'), { 
            onSuccess: () => reset(),
            preserveScroll: true 
        });
    };

    return (
        /* ✅ 2. dir={...} bach t-qleb l-interface f L3arbia */
        <div className="bg-[#fcfcfc] min-h-screen font-sans text-gray-900 italic font-bold" dir={current_lang === 'AR' ? 'rtl' : 'ltr'}>
            <Head title={`${t('contact')} | ${site_settings?.site_name || 'Total Tools'}`} />

            {/* --- NAVBAR --- */}
            <nav className="bg-white border-b border-gray-100 h-20 flex items-center shadow-sm px-4">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center">
                            <ApplicationLogo className="h-10 w-auto text-total-teal fill-current" />
                            <span className={`ml-2 uppercase tracking-widest text-xl ${current_lang === 'AR' ? 'mr-2' : ''}`}>
                                {site_settings?.site_name?.split(' ')[0] || 'Total'} <span className="text-total-teal font-black">Tools</span>
                            </span>
                        </Link>

                        {/* ✅ Link ACCUEIL / الرئيسية */}
                        <Link 
                            href="/" 
                            className="text-[10px] font-black uppercase tracking-widest hover:text-total-teal transition-colors"
                        >
                            {current_lang === 'AR' ? 'الرئيسية' : 'ACCUEIL'}
                        </Link>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {/* Switch Language Button */}
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

            <div className="max-w-2xl mx-auto py-16 px-4">
                <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border-b-[12px] border-total-teal">
                    
                    {/* --- HEADER --- */}
                    <div className="bg-[#232323] p-10 text-center relative overflow-hidden">
                        <div className={`absolute top-0 p-4 opacity-10 ${current_lang === 'AR' ? 'left-0' : 'right-0'}`}>
                            <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                        </div>
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">
                            {current_lang === 'AR' ? 'اتصل بـ' : 'Contactez '} 
                            <span className="text-total-teal">{current_lang === 'AR' ? 'فريقنا' : "l'Équipe"}</span>
                        </h2>
                        <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] mt-2 font-black">
                            {current_lang === 'AR' ? 'رد مضمون في أقل من 24 ساعة' : 'Réponse garantie sous 24h'}
                        </p>
                    </div>

                    {/* --- FORM --- */}
                    <form onSubmit={submit} className="p-10 space-y-6">
                        <div>
                            <label className={`block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest ${current_lang === 'AR' ? 'mr-2 text-right' : 'ml-2'}`}>
                                {current_lang === 'AR' ? 'الاسم الكامل' : 'Votre Nom'}
                            </label>
                            <input 
                                type="text" 
                                placeholder={current_lang === 'AR' ? 'مثال: نهيلة ...' : "EX: NOUHAILA ..."} 
                                className={`w-full p-5 rounded-2xl bg-gray-50 border-2 border-gray-50 focus:border-total-teal focus:ring-0 focus:bg-white transition-all uppercase font-black placeholder:text-gray-300 shadow-inner ${current_lang === 'AR' ? 'text-right' : 'text-left'}`}
                                onChange={e => setData('name', e.target.value)} 
                                value={data.name}
                            />
                            {errors.name && <p className="text-red-500 text-[10px] mt-1 font-black uppercase">{errors.name}</p>}
                        </div>

                        <div>
                            <label className={`block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest ${current_lang === 'AR' ? 'mr-2 text-right' : 'ml-2'}`}>
                                {current_lang === 'AR' ? 'البريد الإلكتروني' : 'Email Professionnel'}
                            </label>
                            <input 
                                type="email" 
                                placeholder="EMAIL@EXAMPLE.COM" 
                                className={`w-full p-5 rounded-2xl bg-gray-50 border-2 border-gray-50 focus:border-total-teal focus:ring-0 focus:bg-white transition-all uppercase font-black placeholder:text-gray-300 shadow-inner ${current_lang === 'AR' ? 'text-right' : 'text-left'}`}
                                onChange={e => setData('email', e.target.value)} 
                                value={data.email}
                            />
                            {errors.email && <p className="text-red-500 text-[10px] mt-1 font-black uppercase">{errors.email}</p>}
                        </div>
                        
                        <div>
                            <label className={`block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest ${current_lang === 'AR' ? 'mr-2 text-right' : 'ml-2'}`}>
                                {current_lang === 'AR' ? 'رسالتك' : 'Message'}
                            </label>
                            <textarea 
                                placeholder={current_lang === 'AR' ? 'كيف يمكننا مساعدتك؟' : "COMMENT POUVONS-NOUS VOUS AIDER ?"} 
                                rows="5"
                                className={`w-full p-5 rounded-2xl bg-gray-50 border-2 border-gray-50 focus:border-total-teal focus:ring-0 focus:bg-white transition-all uppercase font-black placeholder:text-gray-300 shadow-inner ${current_lang === 'AR' ? 'text-right' : 'text-left'}`}
                                onChange={e => setData('message', e.target.value)} 
                                value={data.message}
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-[10px] mt-1 font-black uppercase">{errors.message}</p>}
                        </div>

                        <button 
                            disabled={processing}
                            className="group w-full bg-[#232323] hover:bg-total-teal text-white font-black py-6 rounded-3xl transition-all shadow-xl active:scale-95 uppercase tracking-[0.2em] italic flex items-center justify-center gap-3"
                        >
                            {processing ? (
                                current_lang === 'AR' ? 'جاري الإرسال...' : 'Envoi en cours...'
                            ) : (
                                <>
                                    {current_lang === 'AR' ? 'إرسال الرسالة' : 'Envoyer le Message'}
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 group-hover:translate-x-1 transition-transform ${current_lang === 'AR' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* --- INFO MINI-FOOTER --- */}
                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                        {current_lang === 'AR' ? 'أو اتصل بنا مباشرة على:' : 'Ou appelez-nous directement au :'} <span className="text-total-teal italic decoration-2 underline tracking-normal">05 XX XX XX XX</span>
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}