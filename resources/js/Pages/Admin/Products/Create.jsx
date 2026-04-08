import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    // 1. Initialisation dyal l-form m3a discount_percentage
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        category: '', 
        image: null,
        description: '',
        price: '',
        discount_percentage: '', // ✅ Zadna hada f blast reseller_price
        stock: 0,
    });

    const categoriesList = [
        "ACCESSOIRES", "ÉCHELLE ET ESCABEAU", "MOYENS DE RANGEMENT", 
        "OUTILS À MAIN", "OUTILS ÉLECTRIQUES", "SÉCURITÉ", 
        "CONSTRUCTION", "PEINTURE", "OUTILS À BATTERIE", 
        "JARDINAGE", "SOUDURE", "POMPAGE"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 italic uppercase">Ajouter un nouveau produit</h2>}
        >
            <Head title="Ajouter Produit" />

            <div className="py-12 bg-gray-50">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-[20px] p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Nom & Catégorie Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Nom du produit */}
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-500 mb-1">Désignation (Nom)</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-total-teal focus:border-total-teal transition-all"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="ex: Meuleuse 115mm"
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>

                                {/* Catégorie Select */}
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-500 mb-1">Catégorie</label>
                                    <select
                                        className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-total-teal focus:border-total-teal transition-all"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                    >
                                        <option value="">Choisir une catégorie</option>
                                        {categoriesList.map((cat, i) => (
                                            <option key={i} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-200">
                                <label className="block text-xs font-black uppercase text-gray-500 mb-2">Photo du produit</label>
                                <input
                                    type="file"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-700 transition-all cursor-pointer"
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                {errors.image && <div className="text-red-500 text-xs mt-1 font-bold">{errors.image}</div>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-500 mb-1">Description (Optionnel)</label>
                                <textarea
                                    className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-total-teal focus:border-total-teal"
                                    rows="3"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                ></textarea>
                            </div>

                            {/* Prix & Remise & Stock Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Prix Public */}
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-500 mb-1">Prix Public (DH)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-total-teal focus:border-total-teal"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        placeholder="0.00"
                                    />
                                    {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                                </div>

                                {/* % Remise Revendeur */}
                                <div>
                                    <label className="block text-xs font-black uppercase text-total-teal mb-1">Remise Revendeur (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            className="mt-1 block w-full border-total-teal rounded-lg shadow-sm focus:ring-total-teal focus:border-total-teal bg-teal-50/30"
                                            value={data.discount_percentage}
                                            onChange={e => setData('discount_percentage', e.target.value)}
                                            placeholder="ex: 25"
                                        />
                                        <span className="absolute right-3 top-3 text-total-teal font-bold">%</span>
                                    </div>
                                    {errors.discount_percentage && <div className="text-red-500 text-xs mt-1">{errors.discount_percentage}</div>}
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-500 mb-1">Stock</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-total-teal focus:border-total-teal"
                                        value={data.stock}
                                        onChange={e => setData('stock', e.target.value)}
                                    />
                                    {errors.stock && <div className="text-red-500 text-xs mt-1">{errors.stock}</div>}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center justify-end mt-8 border-t border-gray-100 pt-6">
                                <Link href={route('admin.products.index')} className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-8 hover:text-gray-600 transition">Annuler</Link>
                                <button
                                    type="submit"
                                    className="bg-total-teal hover:bg-gray-900 text-white font-black py-4 px-10 rounded-full shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-tighter"
                                    disabled={processing}
                                >
                                    {processing ? 'Enregistrement...' : 'Sauvegarder'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}