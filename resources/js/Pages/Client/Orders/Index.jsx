import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, orders }) {
    // Fonction bach n-akhdo l-lon dial l-badge 3la hsab l-statut
    const getStatusStyle = (status) => {
        switch (status) {
            case 'en_attente': return 'bg-gray-100 text-gray-600 border-gray-200';
            case 'en_cours': return 'bg-total-teal/10 text-total-teal border-total-teal/20';
            case 'delivre': return 'bg-total-dark text-white border-total-dark';
            default: return 'bg-red-100 text-red-600 border-red-200';
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mes Commandes" />

            <div className="py-12 max-w-5xl mx-auto px-4 italic">
                {/* Header Style TOTAL */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-2 h-10 bg-total-teal rounded-full"></div>
                    <h2 className="font-black text-3xl text-total-dark uppercase tracking-tighter">
                        Historique des <span className="text-total-teal">Commandes</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {orders.length > 0 ? orders.map((order) => (
                        <div key={order.id} className="bg-white border rounded-[30px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                            
                            <div className="flex items-center gap-6">
                                {/* Icon sghira dial pack */}
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                                    📦
                                </div>
                                <div>
                                    <h3 className="font-black text-lg text-total-dark uppercase">#TT-{order.id}</h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                                        Passée le {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total</p>
                                    <p className="font-black text-total-teal text-lg">{order.total} DH</p>
                                </div>

                                {/* Badge dial l-statut */}
                                <div className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                                    {order.status.replace('_', ' ')}
                                </div>

                                {/* Link l-page dial Tracking */}
                                <Link 
                                    href={route('orders.show', order.id)}
                                    className="bg-total-dark text-white p-3 rounded-full hover:bg-total-teal transition shadow-lg group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 bg-gray-50 rounded-[40px] border border-dashed border-gray-300">
                            <p className="text-gray-400 font-bold italic">Vous n'avez pas encore passé de commande.</p>
                            <Link href="/shop" className="mt-4 inline-block text-total-teal font-black uppercase text-xs hover:underline underline-offset-4">
                                Commencer mes achats →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}