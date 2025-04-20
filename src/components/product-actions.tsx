"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { CartItemType } from "@/lib/schemas";

export default function ProductAction({
    cartItem,
}: {
    cartItem: CartItemType;
}) {
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
            const newItem = { ...cartItem };
            const updatedCart = [...prevCart, newItem];
            return updatedCart;
        });
    };

    return (
        <div className="flex gap-4 mt-4 justify-start">
            <Button className="px-6 max-w-xs" size="lg" onClick={addToCart}>
                <Link href="/cart" className="w-full">
                    Add to Cart
                </Link>
            </Button>
        </div>
    );
}
