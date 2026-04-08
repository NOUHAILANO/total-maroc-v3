import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ auth, products, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    // ✅ Debounce search bach mayb9ash y-reloadi f ay 7arf t-kteb
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(route('admin.products.index'), { search: search }, {
                    preserveState: true,
                    replace: true
                });
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleDelete = (id) => {
        if (confirm('Wach mtiyqna bghiti t-msey7i had l-produit?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center w-full">
                    {/* ✅ Titre b style TOTAL */}
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-10 bg-total-teal rounded-full"></div>
                        <h2 className="font-black text-3xl text-total-dark uppercase italic tracking-tighter">
                            📦 Gestion du Stock
                        </h2>
                    </div>

                    {/* ✅ Le Bouton "Ajouter" b style TOTAL */}
                    <Link 
                        href={route('admin.products.create')} 
                        className="inline-flex items-center gap-3 bg-total-dark text-white font-black uppercase italic text-[11px] tracking-[2px] px-8 py-4 rounded-full shadow-xl hover:bg-total-teal transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                    >
                        <span>+ Ajouter Produit</span>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            }
        >
            <Head title="Admin - Produits" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Search Bar */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="🔍 Qleb b smiya..."
                            className="w-full md:w-1/3 border-gray-300 rounded-md shadow-sm focus:border-total-teal focus:ring-total-teal"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Désignation</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Prix</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Stock</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 italic">
                                {products.data && products.data.length > 0 ? (
                                    products.data.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {/* ✅ Logic dyal l-image fixée bach t-looki f products folder */}
                                                <img 
                                                    src={product.image 
                                                        ? (product.image.startsWith('http') 
                                                            ? product.image 
                                                            : `/storage/products/${product.image}`) 
                                                        : '/images/placeholder.png'} 
                                                    className="w-12 h-12 object-contain border rounded-xl shadow-sm bg-gray-50"
                                                    alt={product.name}
                                                    onError={(e) => {
                                                        // Ila mad khdmatch f products, i-jarreb f storage nishan
                                                        if (e.target.src.includes('/storage/products/')) {
                                                            e.target.src = `/storage/${product.image}`;
                                                        } else {
                                                            e.target.onerror = null; 
                                                            e.target.src = '/images/placeholder.png';
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-black text-total-dark uppercase text-sm">{product.name}</td>
                                            <td className="px-6 py-4 text-total-teal font-black">
                                                {parseFloat(product.price).toFixed(2)} DH
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${product.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                    {product.stock} pcs
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-black space-x-4 text-right">
                                                <Link href={route('admin.products.edit', product.id)} className="text-total-teal hover:underline uppercase text-[10px]">Modifier</Link>
                                                <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline uppercase text-[10px]">Supprimer</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic">
                                            Aucun produit trouvé.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="bg-gray-50 px-6 py-4 flex items-center justify-center gap-2 border-t">
                            {products.links && products.links.length > 3 && products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 border rounded-lg text-[10px] font-black transition-all ${
                                        link.active ? 'bg-total-teal text-white border-total-teal shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}