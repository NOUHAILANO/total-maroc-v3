import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ auth, products, filters }) {
    const [search, setSearch] = useState(filters.search || '');

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

    // Simple pagination handler – works everywhere
    const goToPage = (page) => {
        if (page === products.current_page) return;
        router.get(route('admin.products.index'), {
            page: page,
            search: filters.search,
            category: filters.category
        }, {
            preserveState: true,
            replace: true
        });
    };

    // Generate page numbers to display (with ellipsis logic, same as Laravel)
    const getPageNumbers = () => {
        const current = products.current_page;
        const last = products.last_page;
        const delta = 2; // number of pages to show on each side of current
        const range = [];
        for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
            range.push(i);
        }
        if (current - delta > 2) {
            range.unshift('...');
        }
        if (current + delta < last - 1) {
            range.push('...');
        }
        range.unshift(1);
        if (last !== 1) range.push(last);
        return range;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-10 bg-total-teal rounded-full"></div>
                        <h2 className="font-black text-3xl text-total-dark uppercase italic tracking-tighter">
                            📦 Gestion du Stock
                        </h2>
                    </div>
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
                                                <img 
                                                    src={product.image 
                                                        ? (product.image.startsWith('http') 
                                                            ? product.image 
                                                            : `/storage/${product.image}`) 
                                                        : '/images/placeholder.png'} 
                                                    className="w-12 h-12 object-contain border rounded-xl shadow-sm bg-gray-50"
                                                    alt={product.name}
                                                    onError={(e) => {
                                                        if (e.target.src.includes('/storage/') && !e.target.src.includes('placeholder')) {
                                                            e.target.src = '/images/placeholder.png';
                                                        }
                                                        e.target.onerror = null;
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

                        {/* ✅ PAGINATION – Same professional style, works everywhere */}
                        {products.last_page > 1 && (
                            <div className="bg-gray-50 px-6 py-4 flex items-center justify-center gap-2 border-t">
                                {/* Previous button */}
                                {products.current_page > 1 && (
                                    <button
                                        onClick={() => goToPage(products.current_page - 1)}
                                        className="px-4 py-2 border rounded-lg text-[11px] font-black transition-all duration-200 bg-white text-gray-600 hover:bg-total-teal hover:text-white border-gray-200 shadow-sm"
                                    >
                                        &laquo; Précédent
                                    </button>
                                )}

                                {/* Page numbers with ellipsis */}
                                {getPageNumbers().map((page, idx) => {
                                    if (page === '...') {
                                        return (
                                            <span
                                                key={`ellipsis-${idx}`}
                                                className="px-4 py-2 border rounded-lg text-[11px] font-black opacity-30 cursor-not-allowed bg-white text-gray-600 border-gray-200 shadow-sm"
                                            >
                                                ...
                                            </span>
                                        );
                                    }
                                    const isActive = page === products.current_page;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`px-4 py-2 border rounded-lg text-[11px] font-black transition-all duration-200 ${
                                                isActive
                                                ? 'bg-total-dark text-white border-total-dark shadow-lg scale-110 z-10'
                                                : 'bg-white text-gray-600 hover:bg-total-teal hover:text-white border-gray-200 shadow-sm'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                {/* Next button */}
                                {products.current_page < products.last_page && (
                                    <button
                                        onClick={() => goToPage(products.current_page + 1)}
                                        className="px-4 py-2 border rounded-lg text-[11px] font-black transition-all duration-200 bg-white text-gray-600 hover:bg-total-teal hover:text-white border-gray-200 shadow-sm"
                                    >
                                        Suivant &raquo;
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}