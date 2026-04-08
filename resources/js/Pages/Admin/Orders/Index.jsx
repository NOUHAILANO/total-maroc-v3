import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ auth, orders }) {
    const updateStatus = (id, status) => {
        router.patch(route('admin.orders.updateStatus', id), { status });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gestion des Commandes" />
            <div className="py-12 max-w-7xl mx-auto px-4 font-sans italic font-bold">
                <h2 className="text-3xl font-black uppercase mb-6 border-l-4 border-total-teal pl-4">
                    Liste des <span className="text-total-teal">Commandes</span>
                </h2>
                
                <div className="bg-white rounded-[30px] shadow-sm border overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b text-[10px] uppercase text-gray-400 tracking-widest">
                            <tr>
                                <th className="p-4">ID / Date</th>
                                <th className="p-4">Client</th>
                                <th className="p-4 text-total-teal">📞 Téléphone</th> {/* ✅ Colonne jdida */}
                                <th className="p-4">Total</th>
                                <th className="p-4">Statut</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                    <td className="p-4 text-sm">
                                        <div className="font-black">#TT-{order.id}</div>
                                        <div className="text-[9px] text-gray-400 not-italic font-normal">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm uppercase">{order.user?.name}</td>
                                    
                                    {/* ✅ Affichage dial Téléphone */}
                                    <td className="p-4">
                                        <span className="text-sm font-black text-total-dark italic">
                                            {order.phone || 'Pas de numéro'} 
                                        </span>
                                    </td>

                                    <td className="p-4 text-sm font-black text-total-teal">{order.total} DH</td>
                                    
                                    <td className="p-4">
                                        <select 
                                            value={order.status} 
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            className="text-[10px] uppercase font-black rounded-xl border-gray-200 focus:border-total-teal focus:ring-0 transition"
                                        >
                                            <option value="en_attente">En attente</option>
                                            <option value="en_cours">En cours</option>
                                            <option value="delivre">Délivré</option>
                                            <option value="annule">Annulé</option>
                                        </select>
                                    </td>
                                    
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => {
                                                if(confirm('Supprimer cette commande ?')) {
                                                    router.delete(route('admin.orders.destroy', order.id))
                                                }
                                            }} 
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {orders.length === 0 && (
                        <div className="p-20 text-center text-gray-400 italic">
                            Aucune commande pour le moment.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}