import { Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, resellers }) {
    const { post } = useForm();

    const handleApprove = (id) => {
        if (confirm('Voulez-vous vraiment approuver ce revendeur ?')) {
            post(route('admin.resellers.approve', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12 px-6">
                <div className="max-w-7xl mx-auto bg-white p-8 rounded-[30px] shadow-sm">
                    <h2 className="text-2xl font-black uppercase italic mb-6">Gestion des Revendeurs</h2>
                    
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-gray-100 text-[10px] uppercase tracking-widest text-gray-400">
                                <th className="pb-4">Entreprise</th>
                                <th className="pb-4">Contact</th>
                                <th className="pb-4">Ville</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-bold">
                            {resellers.map((r) => (
                                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="py-4">{r.company_name} <br/> <span className="text-[10px] text-gray-400">ICE: {r.tax_number}</span></td>
                                    <td className="py-4">{r.contact_name} <br/> <span className="text-[10px] text-blue-500">{r.email}</span></td>
                                    <td className="py-4">{r.city}</td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] ${r.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        {r.status === 'pending' && (
                                            <button 
                                                onClick={() => handleApprove(r.id)}
                                                className="bg-black text-white px-4 py-2 rounded-xl text-xs hover:bg-yellow-500 hover:text-black transition"
                                            >
                                                Approuver
                                            </button>
                                        )}
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