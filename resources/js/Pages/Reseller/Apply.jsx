import React from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { CartProvider, useCart } from '@/Contexts/CartContext';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';

function ApplyContent({ auth }) {
    const { cart, clearCart } = useCart();

    const { data, setData, post, processing, errors } = useForm({
        company_name: '',
        contact_name: auth?.user?.name || '', 
        email: auth?.user?.email || '',       
        phone: '',
        address: '',
        city: '',
        tax_number: '',
    });

    const handleLogout = (e) => {
        e.preventDefault();
        if (clearCart) clearCart();
        router.post(route('logout'), {}, {
            onSuccess: () => { window.location.href = "/"; }
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('reseller.store'));
    };

    return (
        <div className="bg-[#fcfcfc] min-h-screen font-sans text-[#232323]">
            <Head title="Devenir Revendeur | TOTAL TOOLS" />

            {/* --- 🟢 NAVBAR (Style EXACT kif l-tsawer) --- */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
                    
                    {/* Left: Logo & Accueil */}
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center">
                            <ApplicationLogo className="h-10 w-auto text-[#006666] fill-current" />
                            <div className="text-[#006666] text-2xl ml-3 italic tracking-tighter uppercase font-medium">
                                TOTAL <span className="font-black">TOOLS</span>
                            </div>
                        </Link>

                        <Link 
                            href="/" 
                            className="text-[12px] font-black uppercase italic tracking-widest text-[#232323] hover:text-[#006666] transition-all"
                        >
                            Accueil
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-6">
                        {/* Contact */}
                        <Link href={route('contact.index')} className="flex items-center gap-2 group">
                            <svg className="h-5 w-5 text-gray-400 group-hover:text-[#006666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-[12px] font-black uppercase italic tracking-widest text-[#232323]">Contact</span>
                        </Link>

                        {/* Panier Icon (Rounded Box) */}
                        <Link href={route('cart.index')} className="p-3 bg-gray-50 rounded-[20px] hover:bg-gray-100 transition-all relative border border-gray-100 shadow-sm">
                            <svg className="h-6 w-6 text-[#232323]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cart?.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#006666] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {/* Profil Button */}
                        <div className="flex items-center border-l border-gray-100 pl-4 gap-4">
                            <Link href={route('profile.edit')} className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-[25px] shadow-sm hover:shadow-md transition-all">
                                <svg className="h-5 w-5 text-[#232323]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-[12px] font-black uppercase italic tracking-widest">Profil</span>
                            </Link>

                            <button onClick={handleLogout} className="text-red-600 text-[12px] font-black uppercase italic tracking-widest hover:text-red-800 transition-all ml-2">
                                Quitter
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- 🔵 MAIN CONTENT (Style matnas9 m3a Votre Panier) --- */}
            <main className="max-w-4xl mx-auto px-4 py-16">
                
                {/* Header Title Section */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-2 h-10 bg-[#006666] rounded-full"></div>
                    <h1 className="text-4xl font-light italic uppercase tracking-tighter">
                        VOTRE DEMANDE <span className="font-black text-[#006666]">REVENDEUR</span>
                    </h1>
                </div>

                {/* Form Card (Dashed Border style kif Votre Panier est vide) */}
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-[40px] p-10 shadow-sm relative overflow-hidden">
                    
                    <div className="text-center mb-10">
                        <p className="text-gray-400 text-sm font-black uppercase italic tracking-[0.3em]">
                            Formulaire de partenariat professionnel
                        </p>
                    </div>

                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Company */}
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block ml-2">Nom de l'entreprise</label>
                            <input 
                                type="text" 
                                value={data.company_name} 
                                onChange={e => setData('company_name', e.target.value)} 
                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#006666] font-bold italic text-sm"
                            />
                            {errors.company_name && <p className="text-red-500 text-[10px] mt-2 italic ml-2">{errors.company_name}</p>}
                        </div>

                        {/* ICE & Ville */}
                        <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block ml-2">ICE / Matricule Fiscal</label>
                            <input type="text" value={data.tax_number} onChange={e => setData('tax_number', e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#006666] font-bold italic text-sm" placeholder="Facultatif" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block ml-2">Ville</label>
                            <input type="text" value={data.city} onChange={e => setData('city', e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#006666] font-bold italic text-sm" />
                            {errors.city && <p className="text-red-500 text-[10px] mt-2 italic ml-2">{errors.city}</p>}
                        </div>

                        {/* Phone & Email */}
                        <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block ml-2">Téléphone</label>
                            <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#006666] font-bold italic text-sm" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block ml-2">Email Professionnel</label>
                            <input type="email" value={data.email} className="w-full bg-gray-100 border-none rounded-2xl px-6 py-4 font-bold text-gray-400 cursor-not-allowed italic text-sm" readOnly />
                        </div>

                        {/* Adresse */}
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block ml-2">Adresse Siège</label>
                            <textarea 
                                value={data.address} 
                                onChange={e => setData('address', e.target.value)} 
                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#006666] font-bold italic h-32 text-sm"
                            ></textarea>
                            {errors.address && <p className="text-red-500 text-[10px] mt-2 italic ml-2">{errors.address}</p>}
                        </div>

                        {/* Submit Button (Style teal b7al COMMENCER MES ACHATS) */}
                        <div className="md:col-span-2 flex justify-center mt-4">
                            <button 
                                type="submit"
                                disabled={processing} 
                                className="bg-[#006666] text-white px-12 py-4 rounded-[20px] font-black uppercase italic text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'Envoi...' : 'Envoyer ma demande'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function Apply(props) {
    return (
        <CartProvider>
            <ApplyContent {...props} />
        </CartProvider>
    );
}