"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { GuestCheckoutForm } from "@/components/order/guest-checkout-form";
import Spinner from "@/components/spinner";
import { useEffect, useState } from "react";
import { CartItemType } from "@/lib/schemas";

export default function Page() {
    const [cart, setCart] = useState<CartItemType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (err) {
                console.error("Error parsing cart:", err);
                setCart([]);
            }
        }

        setIsLoading(false);
    }, []);

    const clearCart = () => {
        localStorage.removeItem("cart");
        setTimeout(() => {
            window.dispatchEvent(new Event("cartUpdated"));
        }, 0);
        setCart([]);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 min-h-screen">
            <Link
                href="/"
                className="inline-flex items-center text-sm mb-6 hover:underline"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Home
            </Link>

            {isLoading ? (
                <Spinner />
            ) : (
                <GuestCheckoutForm items={cart} clearCart={clearCart} />
            )}
        </div>
    );
}
