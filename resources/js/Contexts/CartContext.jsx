import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { usePage } from '@inertiajs/react'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. Jib props mn usePage nichan
    const page = usePage(); 
    const props = page?.props || {};
    const auth = props.auth || {};
    
    // 2. Reseller status logic
    const isApprovedReseller = useMemo(() => {
        return auth?.user?.reseller?.status === 'approved';
    }, [auth]);

    // 3. LocalStorage Cart logic
    const [cart, setCart] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('total_tools_cart_v3');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('total_tools_cart_v3', JSON.stringify(cart));
    }, [cart]);

    // 4. Dynamic Pricing logic
    const getProductPrice = (product) => {
        const resellerP = Number(product.reseller_price);
        const normalP = Number(product.price);
        return (isApprovedReseller && resellerP > 0) ? resellerP : normalP;
    };

    const addToCart = (product) => {
        const targetPrice = getProductPrice(product);
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id 
                        ? { ...item, qty: (item.qty || 1) + 1, price: targetPrice } 
                        : item
                );
            }
            return [...prev, { ...product, qty: 1, price: targetPrice }];
        });
    };

    const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
    
    const updateQty = (id, qty) => {
        setCart(prev => prev.map(i => {
            if (i.id === id) {
                const targetPrice = getProductPrice(i); 
                return { ...i, qty: Math.max(1, qty), price: targetPrice };
            }
            return i;
        }));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('total_tools_cart_v3');
    };

    // 5. Auto-recalculating subtotal
    const subtotal = useMemo(() => {
        return cart.reduce((acc, item) => {
            const activePrice = getProductPrice(item);
            return acc + (Number(activePrice) * (item.qty || 1));
        }, 0);
    }, [cart, isApprovedReseller]);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQty, 
            clearCart, 
            subtotal, 
            total: subtotal, 
            isApprovedReseller,
            getProductPrice 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};