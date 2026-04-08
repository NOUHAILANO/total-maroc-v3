import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ auth, villes_contacts }) {
    const [isEditing, setIsEditing] = useState(false);
    
    const { data, setData, post, put, reset, processing, errors } = useForm({
        id: null, 
        ville: '', 
        email: '', 
        phones: [''], 
        whatsapps: [''], 
        adresses: [''], 
        facebook: '', 
        instagram: ''
    });

    const addField = (field) => setData(field, [...data[field], '']);
    
    const removeField = (field, index) => {
        const newArr = [...data[field]];
        newArr.splice(index, 1);
        setData(field, newArr.length > 0 ? newArr : ['']);
    };

    const updateField = (field, index, value) => {
        const newArr = [...data[field]];
        newArr[index] = value;
        setData(field, newArr);
    };

    // ✅ Had l-logic kat-khalli l-bouton Modifier i-3emmar l-formulaire mzyan
    const handleEdit = (v) => {
        setIsEditing(true);
        setData({
            id: v.id,
            ville: v.ville || '',
            email: v.email || '',
            // Akkdi anaho had l-fields arrays
            phones: Array.isArray(v.phones) ? v.phones : [''],
            whatsapps: Array.isArray(v.whatsapps) ? v.whatsapps : [''],
            adresses: Array.isArray(v.adresses) ? v.adresses : [''],
            facebook: v.facebook || '',
            instagram: v.instagram || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.villes-contacts.update', data.id), { 
                onSuccess: () => { reset(); setIsEditing(false); } 
            });
        } else {
            post(route('admin.villes-contacts.store'), { 
                onSuccess: () => reset() 
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gestion des Contacts" />
            
            <div className="py-12 px-4 italic max-w-7xl mx-auto space-y-6">
                {/* Formulaire Section */}
                <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-total-teal">
                    <h2 className="text-total-teal font-black uppercase mb-6 italic">
                        {isEditing ? '📝 Modifier la ville' : '➕ Ajouter une nouvelle ville'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input 
                            type="text" 
                            placeholder="Nom de la ville" 
                            value={data.ville} 
                            onChange={e => setData('ville', e.target.value)} 
                            className="w-full rounded-md border-gray-200 uppercase font-bold italic" 
                            required 
                        />
                        
                        {/* Dynamic Fields: Adresses, Phones, Whatsapps */}
                        {['adresses', 'phones', 'whatsapps'].map((field) => (
                            <div key={field} className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{field}</label>
                                {data[field].map((val, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={val} 
                                            onChange={e => updateField(field, i, e.target.value)} 
                                            className="flex-1 rounded-md border-gray-200 text-sm" 
                                            placeholder={`Saisir ${field.slice(0,-1)}...`}
                                        />
                                        <button type="button" onClick={() => removeField(field, i)} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors">✕</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addField(field)} className="text-total-teal text-[10px] font-black uppercase hover:underline">
                                    + Ajouter {field.slice(0,-1)}
                                </button>
                            </div>
                        ))}

                        {/* Social & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Facebook URL" value={data.facebook} onChange={e => setData('facebook', e.target.value)} className="rounded-md border-gray-200 text-sm" />
                            <input type="text" placeholder="Instagram URL" value={data.instagram} onChange={e => setData('instagram', e.target.value)} className="rounded-md border-gray-200 text-sm" />
                            <input type="email" placeholder="Email de contact" value={data.email} onChange={e => setData('email', e.target.value)} className="md:col-span-2 rounded-md border-gray-200 text-sm" />
                        </div>

                        <div className="flex gap-3">
                            <button type="submit" disabled={processing} className="flex-1 bg-total-teal text-white font-black py-4 rounded-lg uppercase shadow-md active:scale-95 transition-all">
                                {isEditing ? 'Mettre à jour' : 'Enregistrer la ville'}
                            </button>
                            
                            {isEditing && (
                                <button type="button" onClick={() => { reset(); setIsEditing(false); }} className="px-6 bg-gray-200 text-gray-700 font-black py-4 rounded-lg uppercase transition-all">
                                    Annuler
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden text-[11px] border border-gray-100">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-left uppercase tracking-widest text-gray-400">Ville</th>
                                <th className="p-4 text-right uppercase tracking-widest text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {villes_contacts.map(v => (
                                <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-bold uppercase text-total-dark">{v.ville}</td>
                                    <td className="p-4 text-right space-x-6 font-black tracking-tighter">
                                        <button onClick={() => handleEdit(v)} className="text-blue-600 hover:text-blue-800 underline underline-offset-4">MODIFIER</button>
                                        <button onClick={() => { if(confirm('⚠️ Supprimer cette ville ?')) router.delete(route('admin.villes-contacts.destroy', v.id)) }} className="text-red-500 hover:text-red-700">SUPPRIMER</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}