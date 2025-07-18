import { Product } from "@/app/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useFavoriteStore = create<{
    favorites: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: number) => void;
    toggleFavorite: (product: Product) => void;
    isFavorite: (productId: number) => boolean;
    clearFavorites: () => void;
    getFavoritesCount: () => number;
}>()(
    persist(
        (set, get) => ({
            favorites: [],
            addToFavorites: (product: Product) => set((state) => {
                const exists = state.favorites.find(item => item.id === product.id);
                if (!exists) {
                    return { favorites: [...state.favorites, product] };
                }
                return state;
            }),
            removeFromFavorites: (productId: number) => set((state) => ({
                favorites: state.favorites.filter(item => item.id !== productId)
            })),
            toggleFavorite: (product: Product) => set((state) => {
                const exists = state.favorites.find(item => item.id === product.id);
                if (exists) {
                    return { favorites: state.favorites.filter(item => item.id !== product.id) };
                }
                return { favorites: [...state.favorites, product] };
            }),
            isFavorite: (productId: number) => {
                return get().favorites.some(item => item.id === productId);
            },
            clearFavorites: () => set({ favorites: [] }),
            getFavoritesCount: () => get().favorites.length,
        }),
        {
            name: 'favorites-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
