import { useCart } from '@/Contexts/CartContext';
import { Link } from '@inertiajs/react';

export default function CartDrawer({ isOpen, onClose }) {
    const { cart, total, subtotal, discount, removeFromCart } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute right-0 top-0 h-full w-4/5 max-w-md bg-white shadow-xl h-screen flex flex-col">
                <div className="p-6 border-b flex justify-between items-center bg-gray-900 text-white">
                    <h2 className="font-black uppercase italic">Votre Panier</h2>
                    <button onClick={onClose} className="text-2xl text-yellow-500 font-bold">&times;</button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.length > 0 ? cart.map(item => (
                        <div key={item.id} className="flex gap-4 border-b pb-4">
                            <img src={item.image.startsWith('http') ? item.image : `/storage/${item.image}`} className="w-16 h-16 object-contain" />
                            <div className="flex-1">
                                <h4 className="text-sm font-bold uppercase line-clamp-1">{item.name}</h4>
                                <p className="text-blue-700 font-black">{item.price} DH x {item.qty}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs font-bold">Supprimer</button>
                        </div>
                    )) : (
                        <p className="text-center text-gray-500 mt-10 uppercase italic font-bold">Le panier est vide</p>
                    )}
                </div>

                <div className="p-6 bg-gray-50 border-t space-y-3">
                    <div className="flex justify-between text-sm">
                        <span>Sous-total:</span>
                        <span className="font-bold">{subtotal.toFixed(2)} DH</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between text-red-600 text-sm font-black italic">
                            <span>PROMO (-10%):</span>
                            <span>-{discount.toFixed(2)} DH</span>
                        </div>
                    )}
                    <div className="flex justify-between text-xl font-black border-t pt-2">
                        <span>TOTAL:</span>
                        <span className="text-blue-900">{total.toFixed(2)} DH</span>
                    </div>
                    <Link href="/checkout" onClick={onClose} className="block w-full bg-yellow-500 text-center py-4 font-black uppercase rounded-xl hover:bg-black hover:text-white transition mt-4">
                        Commander
                    </Link>
                </div>
            </div>
        </div>
    );
}