"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface CartItemType {
    id: string;
    name: string;
    brand: string;
    price: number;
    imageLink: string;
}

export default function ProductAction({ product }: { product: CartItemType }) {
    const [cart, setCart] = useState<CartItemType[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (err) {
                console.log(err);
                setCart([]);
            }
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log("Cart updated:", cart);
        }
    }, [cart]);

    const addToCart = () => {
        setCart((prevCart) => {
            const newProduct = { ...product, id: Math.random().toString() };
            const updatedCart = [...prevCart, newProduct];
            console.log(updatedCart);
            return updatedCart;
        });
    };

    return (
        <div className="space-y-3">
            <Button
                className="w-full py-6 taxt-base"
                size="lg"
                onClick={addToCart}
            >
                ADD TO CART
            </Button>
        </div>
    );
}
