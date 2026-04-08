import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ auth, product }) {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        category: product.category || '',
        description: product.description || '',
        price: product.price,
        discount_percentage: product.discount_percentage || 0,
        stock: product.stock,
        image: null,
        _method: 'put',
    });

    const categoriesList = [
        "ACCESSOIRES", "ÉCHELLE ET ESCABEAU", "MOYENS DE RANGEMENT",
        "OUTILS À MAIN", "OUTILS ÉLECTRIQUES", "SÉCURITÉ",
        "CONSTRUCTION", "PEINTURE", "OUTILS À BATTERIE",
        "JARDINAGE", "SOUDURE", "POMPAGE"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    };

    const calculatedResellerPrice = data.price - (data.price * (data.discount_percentage / 100));

    // Local state to handle image load errors without infinite loop
    const [imgSrc, setImgSrc] = useState(product.image ? `/storage/${product.image}` : null);

    const handleImageError = () => {
        // Fallback to a simple gray box with text (no external file)
        setImgSrc(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-xl text-gray-800 italic uppercase tracking-tighter">Modifier : {product.name}</h2>}
        >
            <Head title={`Modifier ${product.name}`} />

            <div className="py-12 bg-gray-50">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-[20px] p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Row 1: Name + Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-400 mb-1">Désignation</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-total-teal focus:border-total-teal"
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-400 mb-1">Catégorie</label>
                                    <select
                                        className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-total-teal focus:border-total-teal"
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

                            {/* Row 2: Discount + Reseller Price Preview */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-400 mb-1">Remise (%)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.discount_percentage}
                                        onChange={e => setData('discount_percentage', e.target.value)}
                                        className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm"
                                    />
                                    {errors.discount_percentage && <div className="text-red-500 text-xs mt-1">{errors.discount_percentage}</div>}
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-400 mb-1">Prix revendeur (calculé)</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={calculatedResellerPrice.toFixed(2) + ' DH'}
                                        className="mt-1 block w-full bg-gray-100 border-gray-200 rounded-lg shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Image section */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <label className="block text-xs font-black uppercase text-gray-400 mb-2">Image du produit</label>
                                {product.image && (
                                    <div className="mb-4">
                                        <p className="text-[10px] text-gray-400 uppercase mb-1">Image Actuelle :</p>
                                        {imgSrc ? (
                                            <img
                                                src={imgSrc}
                                                alt="Product"
                                                className="w-20 h-20 object-contain rounded-lg border border-white shadow-sm bg-white"
                                                onError={handleImageError}
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                                                Pas d'image
                                            </div>
                                        )}
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={e => setData('image', e.target.files[0])}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white"
                                />
                                {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-400 mb-1">Description</label>
                                <textarea
                                    className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-total-teal"
                                    rows="3"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                            </div>

                            {/* Price & Stock */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-400 mb-1">Prix public (DH)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm"
                                    />
                                    {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase text-gray-400 mb-1">Stock</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={e => setData('stock', e.target.value)}
                                        className="mt-1 block w-full border-gray-200 rounded-lg shadow-sm"
                                    />
                                    {errors.stock && <div className="text-red-500 text-xs mt-1">{errors.stock}</div>}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center justify-end mt-8 pt-6 border-t border-gray-100">
                                <Link href={route('admin.products.index')} className="text-xs font-black text-gray-400 uppercase mr-8 hover:text-gray-600 transition">Annuler</Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-total-teal hover:bg-gray-900 text-white font-black py-4 px-10 rounded-full shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-tighter"
                                >
                                    {processing ? 'Mise à jour...' : 'Mettre à jour'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}