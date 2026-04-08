import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Footer from '@/Components/Footer';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;

    // ✅ N7yedna useEffect li kant dayra loop f l-console
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const safeRoute = (name, fallback) => {
        try { return route(name); } catch (e) { return fallback; }
    };

    return (
        <div className="min-h-screen bg-off-white">
            
            <nav className="bg-white border-b-4 border-total-teal sticky top-0 z-50 shadow-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between italic">
                        
                        <div className="flex items-center">
                            <div className="flex shrink-0 items-center border-r border-gray-100 pr-8 h-full">
                                <Link href="/">
                                    <ApplicationLogo className="block h-10 w-auto fill-current text-total-teal" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:ms-10 sm:flex h-full items-center uppercase font-black tracking-tighter text-[11px]">
                                <NavLink 
                                    href={safeRoute('home', '/')} 
                                    active={route().current('home')}
                                    className="hover:text-total-teal transition-colors"
                                >
                                    Accueil
                                </NavLink>

                                {/* ✅ Links dyal Client/Revendeur */}
                                {user.role !== 'admin' && (
                                    <>
                                        <NavLink 
                                            href={safeRoute('orders.index', '/mes-commandes')} 
                                            active={route().current('orders.*')}
                                            className="hover:text-total-teal transition-colors"
                                        >
                                            Mes Commandes
                                        </NavLink>

                                        <NavLink 
                                            href={safeRoute('reseller.apply', '/devenir-revendeur')} 
                                            active={route().current('reseller.apply')}
                                            className="hover:text-total-teal transition-colors"
                                        >
                                            Devenir Revendeur
                                        </NavLink>
                                    </>
                                )}

                                {/* ✅ Panel Admin - Hada hua li ghadi idkhlek l-Dashboard */}
                                {user.role === 'admin' && (
                                    <div className="flex items-center space-x-6 border-l border-gray-100 pl-8 ml-4 not-italic font-sans">
                                        <NavLink 
                                            href={safeRoute('admin.resellers.index', '/admin/resellers')} 
                                            active={route().current('admin.resellers.*')}
                                            className="text-[10px] text-gray-400 hover:text-total-teal"
                                        >
                                            👥 Revendeurs
                                        </NavLink>

                                        <NavLink 
                                            href={safeRoute('admin.products.index', '/admin/products')} 
                                            active={route().current('admin.products.*')} 
                                            className="text-[10px] text-gray-400 hover:text-total-teal"
                                        >
                                            📦 Produits
                                        </NavLink>

                                        <NavLink 
                                            href={safeRoute('admin.orders.index', '/admin/orders')} 
                                            active={route().current('admin.orders.*')} 
                                            className="text-[10px] text-gray-400 hover:text-total-teal"
                                        >
                                            🛒 Commandes
                                        </NavLink>

                                        <NavLink 
                                            href={safeRoute('admin.villes-contacts.index', '/admin/villes-contacts')} 
                                            active={route().current('admin.villes-contacts.*')} 
                                            className="text-[10px] text-gray-400 hover:text-total-teal"
                                        >
                                            📍 Contacts
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ✅ Right Side (Basket & Profile) */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            
                            <Link 
                                href={safeRoute('orders.index', '/mes-commandes')}
                                className="mr-6 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-total-teal transition-all italic border-r border-gray-100 pr-6 h-8 flex items-center"
                            >
                                Mes Commandes
                            </Link>

                            <Link href="/panier" className="mr-4 p-2 bg-gray-50 rounded-xl hover:bg-gray-100 border border-gray-100 transition-all">
                                <svg className="w-5 h-5 text-total-dark" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg>
                            </Link>

                            <div className="relative ms-3 font-sans not-italic">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-total-dark px-6 py-2.5 text-[10px] font-black uppercase tracking-[2px] text-white transition hover:bg-total-teal focus:outline-none italic shadow-lg">
                                                {user.name}
                                                <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={safeRoute('profile.edit', '/profile')}>Mon Profile</Dropdown.Link>
                                        <Dropdown.Link href={safeRoute('orders.index', '/mes-commandes')}>Mes Commandes</Dropdown.Link>
                                        <div className="border-t border-gray-100"></div>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-600 font-bold w-full text-left">Déconnexion</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button onClick={() => setShowingNavigationDropdown((p) => !p)} className="p-2 text-total-teal">
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-white border-t border-gray-100'}>
                    <div className="space-y-1 pb-3 pt-2 font-black italic uppercase text-[11px]">
                        <ResponsiveNavLink href={safeRoute('home', '/')} active={route().current('home')}>Accueil</ResponsiveNavLink>
                        <ResponsiveNavLink href={safeRoute('orders.index', '/mes-commandes')} active={route().current('orders.*')}>Mes Commandes</ResponsiveNavLink>
                        {user.role !== 'admin' && (
                             <ResponsiveNavLink href={safeRoute('reseller.apply', '/devenir-revendeur')}>Devenir Revendeur</ResponsiveNavLink>
                        )}

                        {user.role === 'admin' && (
                            <>
                                <div className="px-4 py-3 text-[9px] font-black text-gray-400 border-t mt-2 not-italic font-sans">PANEL ADMINISTRATION</div>
                                <ResponsiveNavLink href={safeRoute('admin.resellers.index', '/admin/resellers')} active={route().current('admin.resellers.*')}>Gestion Revendeurs</ResponsiveNavLink>
                                <ResponsiveNavLink href={safeRoute('admin.products.index', '/admin/products')}>Gestion Produits</ResponsiveNavLink>
                                <ResponsiveNavLink href={safeRoute('admin.orders.index', '/admin/orders')} active={route().current('admin.orders.*')}>Gestion Commandes</ResponsiveNavLink>
                                <ResponsiveNavLink href={safeRoute('admin.villes-contacts.index', '/admin/villes-contacts')}>Gestion Contacts</ResponsiveNavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="border-l-8 border-total-teal pl-6 uppercase italic font-black tracking-tighter text-3xl text-total-dark">
                            {header}
                        </div>
                    </div>
                </header>
            )}

            <main className="py-10">{children}</main>
            <Footer />
        </div>
    );
}