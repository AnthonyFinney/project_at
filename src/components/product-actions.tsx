"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ProductAction({ product }: { product: ProductType }) {
    const [cart, setCart] = useState<ProductType[]>([]);

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
