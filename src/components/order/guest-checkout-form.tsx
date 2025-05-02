"use client";

import { Contact } from "./contact";
import { Button } from "../ui/button";
import { BagSummary } from "./bag-summary";
import { DeliveryAddress } from "./delivery-address";
import type { CartItemType } from "@/lib/schemas";
import Spinner from "@/components/spinner";
import { useEffect, useState } from "react";

export const GuestCheckoutForm: React.FC = () => {
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

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Guest Checkout</h1>
            </header>

            {isLoading ? <Spinner /> : <BagSummary items={cart} />}

            <DeliveryAddress />
            <Contact />

            <div className="text-right">
                <Button>Next</Button>
            </div>
        </div>
    );
};
