import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function VillesIndex({ auth, villes }) {
    // Hadu les états ghir bach n-chedo dakchi li kit-kteb qbel ma n-zidouh f l-formulaire l-kbir
    const [tempPhone, setTempPhone] = useState('');
    const [tempWA, setTempWA] = useState('');
    const [tempAdresse, setTempAdresse] = useState('');

    const { data, setData, post, processing, reset, errors } = useForm({
        ville: '',
        adresses: [], // Listat khawyin f l-bedya
        whatsapps: [],
        phones: [],
        email: '',
        facebook: '',
        instagram: '',
    });

    // Function bach t-zidi item jdid l-ay lista
    const addItem = (field, value, setTemp) => {
        if (value.trim() !== '') {
            setData(field, [...data[field], value]);
            setTemp(''); // n-khwiw l-input sghir
        }
    };

    // Function bach t-ms7i item men lista
    const removeItem = (field, index) => {
        setData(field, data[field].filter((_, i) => i !== index));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.villes-contacts.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-xl text-gray-800 uppercase italic">📍 Gestion Multi-Contacts par Ville</h2>}
        >
            <Head title="Contacts Villes" />

            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nom de la Ville */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-black uppercase mb-2 italic">Nom de la Ville</label>
                                    <input type="text" value={data.ville} onChange={e => setData('ville', e.target.value)} className="w-full border-gray-200 rounded-xl focus:ring-yellow-500 font-bold" placeholder="ex: Casablanca" />
                                    {errors.ville && <div className="text-red-500 text-xs mt-1">{errors.ville}</div>}
                                </div>

                                {/* Section Téléphones */}
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <label className="block text-xs font-black uppercase mb-2">📞 Numéros Mobiles</label>
                                    <div className="flex gap-2 mb-3">
                                        <input type="text" value={tempPhone} onChange={e => setTempPhone(e.target.value)} className="flex-1 border-gray-200 rounded-lg text-sm" placeholder="06..."/>
                                        <button type="button" onClick={() => addItem('phones', tempPhone, setTempPhone)} className="bg-black text-white px-4 rounded-lg font-bold">+</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {data.phones.map((p, i) => (
                                            <span key={i} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                                {p} <button type="button" onClick={() => removeItem('phones', i)} className="ml-2 text-red-500">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Section WhatsApp */}
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <label className="block text-xs font-black uppercase mb-2">💬 WhatsApps</label>
                                    <div className="flex gap-2 mb-3">
                                        <input type="text" value={tempWA} onChange={e => setTempWA(e.target.value)} className="flex-1 border-gray-200 rounded-lg text-sm" placeholder="06..."/>
                                        <button type="button" onClick={() => addItem('whatsapps', tempWA, setTempWA)} className="bg-green-600 text-white px-4 rounded-lg font-bold">+</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {data.whatsapps.map((w, i) => (
                                            <span key={i} className="bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                                {w} <button type="button" onClick={() => removeItem('whatsapps', i)} className="ml-2 text-red-500">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Section Adresses */}
                                <div className="md:col-span-2 p-4 bg-gray-50 rounded-2xl">
                                    <label className="block text-xs font-black uppercase mb-2">🏠 Adresses / Localisations</label>
                                    <div className="flex gap-2 mb-3">
                                        <textarea value={tempAdresse} onChange={e => setTempAdresse(e.target.value)} className="flex-1 border-gray-200 rounded-lg text-sm" rows="1" placeholder="Rue, Quartier..."></textarea>
                                        <button type="button" onClick={() => addItem('adresses', tempAdresse, setTempAdresse)} className="bg-blue-600 text-white px-4 rounded-lg font-bold">+</button>
                                    </div>
                                    <div className="space-y-2">
                                        {data.adresses.map((a, i) => (
                                            <div key={i} className="bg-white border border-gray-200 p-2 rounded-lg text-xs flex justify-between items-center italic">
                                                {a} <button type="button" onClick={() => removeItem('adresses', i)} className="text-red-500 font-bold px-2">Supprimer</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Email & RS */}
                                <div>
                                    <label className="block text-xs font-black uppercase mb-2 italic text-gray-400">Email Général</label>
                                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full border-gray-200 rounded-xl" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Facebook URL" value={data.facebook} onChange={e => setData('facebook', e.target.value)} className="w-full border-gray-200 rounded-xl text-xs" />
                                    <input type="text" placeholder="Instagram URL" value={data.instagram} onChange={e => setData('instagram', e.target.value)} className="w-full border-gray-200 rounded-xl text-xs" />
                                </div>
                            </div>

                            <div className="text-right pt-4">
                                <button disabled={processing} className="bg-yellow-500 text-black px-10 py-4 rounded-2xl font-black uppercase italic hover:scale-105 transition shadow-xl">
                                    Enregistrer la Ville et ses Contacts
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Table d'affichage */}
                    <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-black text-white text-[10px] uppercase tracking-widest italic">
                                <tr>
                                    <th className="p-6">Ville / Adresses</th>
                                    <th className="p-6">Contacts</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {villes.map((v) => (
                                    <tr key={v.id} className="hover:bg-gray-50 transition">
                                        <td className="p-6">
                                            <div className="font-black text-lg uppercase italic text-yellow-600">{v.ville}</div>
                                            <div className="mt-2 space-y-1">
                                                {v.adresses?.map((adr, idx) => (
                                                    <p key={idx} className="text-[10px] text-gray-500 leading-tight">📍 {adr}</p>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-6 space-y-2">
                                            <div className="flex flex-wrap gap-1">
                                                {v.phones?.map((ph, idx) => <span key={idx} className="bg-gray-100 text-[9px] px-2 py-0.5 rounded font-bold">📞 {ph}</span>)}
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {v.whatsapps?.map((wa, idx) => <span key={idx} className="bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded font-bold">💬 {wa}</span>)}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <button className="text-red-400 hover:text-red-600 text-[10px] font-black uppercase tracking-tighter">Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}