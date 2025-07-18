import { Product } from "@/app/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
    product: Product;
    quantity: number;
}

export const useCartStore = create<{
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product: Product, quantity = 1) => set((state) => {
                const existingItem = state.cart.find(item => item.product.id === product.id);
                if (existingItem) {
                    return {
                        cart: state.cart.map(item =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                    };
                }
                return { cart: [...state.cart, { product, quantity }] };
            }),
            removeFromCart: (productId: number) => set((state) => ({
                cart: state.cart.filter(item => item.product.id !== productId)
            })),
            updateQuantity: (productId: number, quantity: number) => set((state) => ({
                cart: state.cart.map(item =>
                    item.product.id === productId
                        ? { ...item, quantity: Math.max(0, quantity) }
                        : item
                ).filter(item => item.quantity > 0)
            })),
            clearCart: () => set({ cart: [] }),
            getTotalItems: () => get().cart.reduce((total, item) => total + item.quantity, 0),
            getTotalPrice: () => get().cart.reduce((total, item) => {
                const price = item.product.discounted > 0 
                    ? item.product.price - item.product.discounted 
                    : item.product.price;
                return total + (price * item.quantity);
            }, 0),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);    