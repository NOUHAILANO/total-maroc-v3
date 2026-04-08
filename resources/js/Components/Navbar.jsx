import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Navbar({ auth, cartCount }) {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm h-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
                
                {/* --- Logo & Accueil --- */}
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center group">
                        <ApplicationLogo className="h-10 w-auto text-[#006666] fill-current" />
                        <div className="text-[#006666] text-xl ml-3 italic tracking-widest uppercase font-medium">
                            TOTAL <span className="font-black">TOOLS</span>
                        </div>
                    </Link>

                    <Link 
                        href="/" 
                        className="hidden lg:block text-[11px] font-black uppercase italic tracking-[0.2em] text-[#232323] hover:text-[#006666] transition-all border-b-2 border-transparent hover:border-[#006666] pb-1"
                    >
                        Accueil
                    </Link>
                </div>

                {/* --- Search Bar --- */}
                <div className="hidden md:flex flex-1 mx-12 max-w-md group">
                    <div className="relative w-full flex">
                        <input 
                            type="text" 
                            placeholder="RECHERCHER UNE RÉFÉRENCE..." 
                            className="w-full bg-gray-50 border-none rounded-l-[20px] px-6 py-2.5 text-[11px] font-bold italic focus:ring-0 transition-all"
                        />
                        <button className="bg-[#006666] text-white px-5 rounded-r-[20px] hover:bg-[#232323] transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* --- Actions --- */}
                <div className="flex items-center gap-5">
                    
                    {(!auth.user || (auth.user.role !== 'admin' && !auth.user.reseller)) && (
                        <Link 
                            href={route('reseller.apply')} 
                            className="hidden xl:flex items-center gap-2 bg-[#232323] text-white text-[10px] font-black uppercase italic px-5 py-2.5 rounded-[20px] hover:bg-[#006666] transition-all shadow-sm"
                        >
                            🤝 Revendeur
                        </Link>
                    )}

                    <Link href={route('contact.index')} className="flex items-center gap-2 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-[#006666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[11px] font-black uppercase italic tracking-widest text-[#232323] group-hover:text-[#006666]">Contact</span>
                    </Link>

                    <Link href={route('cart.index')} className="p-3 bg-gray-50 rounded-[18px] hover:bg-gray-100 transition-all relative border border-gray-100 shadow-sm group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#232323]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#006666] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <div className="flex items-center border-l border-gray-100 pl-5 gap-4">
                        {auth.user ? (
                            <div className="flex items-center gap-4">
                                <Link 
                                    href={auth.user.role === 'admin' ? route('admin.resellers.index') : route('profile.edit')} 
                                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-[22px] shadow-sm hover:shadow-md transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#232323]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-[11px] font-black uppercase italic tracking-widest text-[#232323]">
                                        {auth.user.role === 'admin' ? 'Admin' : 'Profil'}
                                    </span>
                                </Link>
                                
                                <Link 
                                    href={route('logout')} 
                                    method="post" 
                                    as="button" 
                                    className="text-[11px] font-black uppercase italic text-red-600 hover:text-red-800 transition-all border-l border-gray-200 pl-4"
                                >
                                    Quitter
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href={route('login')} className="text-[11px] font-black uppercase italic text-[#232323] hover:text-[#006666]">Connexion</Link>
                                <Link href={route('register')} className="bg-[#006666] text-white px-5 py-2.5 rounded-[20px] text-[10px] font-black uppercase italic shadow-sm hover:bg-[#232323] transition-all">S'inscrire</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}