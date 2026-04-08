import { usePage } from '@inertiajs/react';

export default function Footer() {
    const { villes_contacts } = usePage().props;

    return (
        <footer className="bg-[#f9fafb] text-total-dark pt-20 pb-10 font-sans border-t-[6px] border-total-teal italic font-bold">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                
                {villes_contacts && villes_contacts.map((item, index) => (
                    <div key={index} className="space-y-6">
                        
                        {/* Ville Name */}
                        <h4 className="text-total-teal font-black uppercase text-xl border-l-4 border-total-teal pl-3 tracking-tighter not-italic">
                            {item.ville || item.nom_ville}
                        </h4>

                        <div className="space-y-5 uppercase tracking-widest text-[10px]">
                            
                            {/* Adresses Section */}
                            <div className="space-y-2">
                                <p className="text-gray-400 border-b border-gray-200 pb-1 text-[9px] font-black italic">Adresses</p>
                                {Array.isArray(item.adresses) ? item.adresses.map((adr, i) => (
                                    <p key={i} className="text-total-dark leading-relaxed font-black">{adr}</p>
                                )) : (
                                    <p className="text-total-dark leading-relaxed font-black">{item.adresse}</p>
                                )}
                            </div>

                            {/* Téléphones Section */}
                            <div className="space-y-2">
                                <p className="text-gray-400 border-b border-gray-200 pb-1 text-[9px] font-black italic">Téléphones</p>
                                {(item.phones || [item.telephone]).map((p, i) => (
                                    p && (
                                        <a key={i} href={`tel:${p}`} className="block text-total-dark hover:text-total-teal transition-colors font-black">
                                            {p}
                                        </a>
                                    )
                                ))}
                            </div>

                            {/* WhatsApp Section ✅ (Hna l-fix) */}
                            <div className="space-y-2">
                                <p className="text-green-700 border-b border-gray-200 pb-1 text-[9px] font-black italic">WhatsApp</p>
                                {(item.whatsapps || item.phones || []).map((w, i) => (
                                    w && (
                                        <a 
                                            key={i} 
                                            href={`https://wa.me/${String(w).replace(/\s+/g, '')}`} 
                                            target="_blank" 
                                            className="block text-green-700 hover:underline transition-colors font-black"
                                        >
                                            {w}
                                        </a>
                                    )
                                ))}
                            </div>

                            {/* Email Section */}
                            {item.email && (
                                <a 
                                    href={`mailto:${item.email}`} 
                                    className="flex items-center gap-2 pt-3 text-total-teal normal-case text-[11px] font-black border-t border-gray-200 mt-4"
                                >
                                    <div className="w-2 h-2 bg-total-teal rounded-full"></div>
                                    {item.email}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-200 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© {new Date().getFullYear()} TOTAL TOOLS MAROC. DESIGNED BY NOUHAILA</p>
                <div className="flex gap-6 items-center">
                    <span className="text-total-dark/60">LIVRAISON 48H SUR TOUT LE MAROC</span>
                </div>
            </div>
        </footer>
    );
}