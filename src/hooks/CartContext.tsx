'use client'
import { CarDetails } from "@/components/CarCard";
import { Car } from "@/types/types";
import React, { createContext, ReactNode, useContext, useState} from "react";

interface CartContextType {
    cart: CarDetails[];
    addToCart: (car: Car) => void;
    removeFromCart: (car: Car) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CarDetails[]>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("cart");
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    });

    const addToCart = (car: Car) => {
        const stored = localStorage.getItem("cart");
        const currentCart = stored ? JSON.parse(stored) : [];

        if (!cart.some(item => item.id === car.id)) {
            const updated = [...currentCart, car];
            localStorage.setItem("cart", JSON.stringify(updated));
            setCart(updated);
        }
    };

    const removeFromCart = (car: Car) => {
        const stored = localStorage.getItem("cart");
        const currentCart = stored ? JSON.parse(stored) : [];

        const updated = currentCart.filter((item: Car) => item.id !== car.id);
        localStorage.setItem("cart", JSON.stringify(updated));
        setCart(updated);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
