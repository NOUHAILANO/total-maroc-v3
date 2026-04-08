import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Contact({ auth, settings }) {
    // Initialisaci l-form b l-ma3loumat li jaw men l-back-end
    // Ila kant chi key ma-kaynach (null), kanc-7etto string khawi ''
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        email: settings.email || '',
        phone: settings.phone || '',
        whatsapp: settings.whatsapp || '',
        address: settings.address || '',
        facebook: settings.facebook || '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Smitek f route hiya admin.settings.update (kima derti f web.php)
        post(route('admin.settings.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-xl text-gray-800 leading-tight uppercase italic tracking-tighter">⚙️ Paramètres de Contact</h2>}
        >
            <Head title="Configuration Contact" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Success Message */}
                    {recentlySuccessful && (
                        <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 font-bold uppercase text-xs rounded-r-xl animate-pulse">
                            ✅ Les modifications ont été enregistrées !
                        </div>
                    )}

                    <form onSubmit={submit} className="bg-white shadow-2xl rounded-[40px] overflow-hidden border-b-[12px] border-yellow-500">
                        <div className="p-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                
                                {/* --- SECTION 1: CANAUX DIRECTS --- */}
                                <div className="space-y-6">
                                    <h3 className="text-gray-900 font-black uppercase italic text-sm border-l-8 border-black pl-3 mb-8">Canaux de Communication</h3>
                                    
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-2">Email Professionnel</label>
                                        <input 
                                            type="email" 
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full border-2 border-gray-100 rounded-2xl focus:border-yellow-500 focus:ring-0 transition font-bold"
                                            placeholder="ex: contact@totaltools.ma"
                                        />
                                        {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold italic">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-2">Téléphone Fixe / Standard</label>
                                        <input 
                                            type="text" 
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className="w-full border-2 border-gray-100 rounded-2xl focus:border-yellow-500 focus:ring-0 transition font-bold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-2">WhatsApp Business</label>
                                        <input 
                                            type="text" 
                                            value={data.whatsapp}
                                            onChange={e => setData('whatsapp', e.target.value)}
                                            className="w-full border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:ring-0 transition font-bold"
                                            placeholder="Ex: 212600000000"
                                        />
                                        <p className="text-[9px] text-gray-400 mt-1 italic font-medium">* Sans le "+" (Ex: 212...)</p>
                                    </div>
                                </div>

                                {/* --- SECTION 2: PRESENCE ET LOCALISATION --- */}
                                <div className="space-y-6">
                                    <h3 className="text-gray-900 font-black uppercase italic text-sm border-l-8 border-yellow-500 pl-3 mb-8">Identité & Réseaux</h3>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-2">Lien Page Facebook</label>
                                        <input 
                                            type="text" 
                                            value={data.facebook}
                                            onChange={e => setData('facebook', e.target.value)}
                                            className="w-full border-2 border-gray-100 rounded-2xl focus:border-blue-600 focus:ring-0 transition font-bold"
                                            placeholder="https://facebook.com/votrepage"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-2">Adresse du Siège</label>
                                        <textarea 
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                            className="w-full border-2 border-gray-100 rounded-2xl focus:border-yellow-500 focus:ring-0 transition font-bold"
                                            rows="4"
                                            placeholder="Adresse complète du magasin..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-50 flex justify-between items-center">
                                <p className="text-[10px] text-gray-400 font-black italic max-w-xs uppercase leading-tight">
                                    Ces informations seront affichées automatiquement dans le footer du site et la page contact.
                                </p>
                                
                                <button 
                                    disabled={processing}
                                    className="bg-black text-white px-12 py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-xl active:scale-95 disabled:opacity-50"
                                >
                                    {processing ? 'Mise à jour...' : '🚀 Enregistrer'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}