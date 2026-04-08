import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, order }) {
    // Had l-array kiy-rsem l-marahil
    const steps = [
        { id: 'en_attente', label: 'Commande Reçue', icon: '📝' },
        { id: 'en_cours', label: 'En Préparation', icon: '🛠️' },
        { id: 'delivre', label: 'Livrée', icon: '✅' },
    ];

    // Trouver l'index dial l-statut actuel
    const currentStepIndex = steps.findIndex(s => s.id === order.status);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Suivi Commande #${order.id}`} />

            <div className="py-12 max-w-4xl mx-auto px-4 italic">
                {/* Header b style TOTAL */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-2 h-10 bg-total-teal rounded-full"></div>
                    <h2 className="font-black text-3xl text-total-dark uppercase">
                        Suivi de <span className="text-total-teal">Commande</span>
                    </h2>
                </div>

                <div className="bg-white rounded-[40px] shadow-2xl border p-8 md:p-12">
                    {/* Infos Commande */}
                    <div className="flex justify-between items-center mb-12 border-b pb-6">
                        <div>
                            <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Numéro de commande</p>
                            <p className="text-2xl font-black text-total-dark">#TT-{order.id}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Date</p>
                            <p className="font-black text-total-dark">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* ✅ Stepper (L-khit dial Tracking) */}
                    <div className="relative flex justify-between items-center">
                        {/* Barre de fond */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
                        {/* Barre active (Teal) */}
                        <div 
                            className="absolute top-1/2 left-0 h-1 bg-total-teal -translate-y-1/2 z-0 transition-all duration-1000"
                            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((step, index) => {
                            const isCompleted = index <= currentStepIndex;
                            const isCurrent = index === currentStepIndex;

                            return (
                                <div key={step.id} className="relative z-10 flex flex-col items-center">
                                    <div className={`
                                        w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500
                                        ${isCompleted ? 'bg-total-teal border-total-teal text-white shadow-lg' : 'bg-white border-gray-200 text-gray-300'}
                                        ${isCurrent ? 'scale-125 ring-4 ring-total-teal/20' : ''}
                                    `}>
                                        <span className="text-xl">{isCompleted ? '✓' : index + 1}</span>
                                    </div>
                                    <p className={`mt-4 text-[10px] uppercase font-black tracking-tighter ${isCompleted ? 'text-total-dark' : 'text-gray-300'}`}>
                                        {step.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Message de statut */}
                    <div className="mt-16 bg-gray-50 rounded-3xl p-6 text-center border border-dashed border-gray-200">
                        <p className="text-total-dark font-medium">
                            {order.status === 'en_attente' && "Votre commande est en attente de validation par notre équipe."}
                            {order.status === 'en_cours' && "Bonne nouvelle ! Nous préparons vos outils Total avec soin."}
                            {order.status === 'delivre' && "Votre colis a été livré. Merci de votre confiance !"}
                        </p>
                    </div>

                    {/* Button Back to Shop b style TOTAL */}
                    <div className="mt-10 text-center">
                        <button onClick={() => window.history.back()} className="text-[11px] font-black uppercase text-total-teal hover:underline tracking-widest">
                            ← Retour vers mes commandes
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}