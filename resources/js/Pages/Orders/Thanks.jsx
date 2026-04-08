import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';

export default function Thanks({ order }) {
    // Status style logic
    const statusColors = {
        'en_attente': 'bg-yellow-500 text-white',
        'en_cours': 'bg-blue-500 text-white',
        'delivre': 'bg-total-teal text-white',
        'annule': 'bg-red-500 text-white'
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] font-sans italic font-bold">
            <Head title="Merci pour votre commande" />
            
            <div className="max-w-4xl mx-auto py-20 px-4">
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-16 text-center">
                    
                    <div className="mb-10 flex justify-center">
                        <ApplicationLogo className="h-16 w-auto" />
                    </div>

                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-teal-50 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-total-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4 leading-none">
                        Commande <span className="text-total-teal">Confirmée !</span>
                    </h1>
                    
                    <p className="text-gray-500 mb-12 uppercase text-xs tracking-[0.3em]">
                        Référence: <span className="text-gray-900 font-black">#TT-{order.id}</span>
                    </p>

                    {/* --- TRACKING CARD --- */}
                    <div className="max-w-md mx-auto bg-gray-50 rounded-[30px] p-8 border border-gray-100 mb-12">
                        <span className="block text-[10px] text-gray-400 uppercase mb-4 tracking-widest font-black">
                            Suivi de la commande
                        </span>
                        
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-3">
                                <span className={`w-3 h-3 rounded-full animate-pulse ${order.status === 'en_attente' ? 'bg-yellow-500' : 'bg-total-teal'}`}></span>
                                <span className="text-3xl font-black uppercase italic text-gray-900 tracking-tighter">
                                    {order.status.replace('_', ' ')}
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium">
                                {order.status === 'en_attente' 
                                    ? "Votre commande est en cours de validation par notre équipe." 
                                    : "Votre colis est en route vers votre destination."}
                            </p>
                        </div>
                    </div>

                    {/* --- ACTIONS --- */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/" 
                            className="bg-[#232323] text-white px-10 py-5 rounded-2xl uppercase text-[11px] font-black tracking-widest hover:bg-total-teal transition-all shadow-lg shadow-black/10 active:scale-95"
                        >
                            Retour à l'accueil
                        </Link>
                        <button 
                            onClick={() => window.print()}
                            className="bg-white border-2 border-gray-100 text-gray-900 px-10 py-5 rounded-2xl uppercase text-[11px] font-black tracking-widest hover:border-total-teal transition-all active:scale-95"
                        >
                            Imprimer le reçu
                        </button>
                    </div>
                </div>

                <p className="text-center mt-10 text-gray-400 text-[10px] uppercase tracking-widest leading-loose">
                    Besoin d'aide ? <br /> 
                    <span className="text-total-teal cursor-pointer">📞 05 XX XX XX XX</span> — serviceclient@totaltools.ma
                </p>
            </div>
            <Footer />
        </div>
    );
}