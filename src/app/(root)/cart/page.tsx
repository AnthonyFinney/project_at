"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart-item";
import { CartItemType } from "@/lib/schemas";

export default function Page() {
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

    const removeFromCart = (id: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(
                (item) => item.productId !== id
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const shipping = cart.length > 0 ? 10 : 0;
    const total = subtotal + shipping;

    return (
        <div className="mx-auto px-4 py-8 min-h-screen">
            <Link
                href="/"
                className="inline-flex items-center text-sm mb-6 hover:underline"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Home
            </Link>

            <h1 className="text-2xl font-bold mb-6">YOUR CART SUMMARY</h1>

            {cart.length === 0 ? (
                <div className="bg-blue-100 p-4 flex items-start gap-3 rounded">
                    <Info className="h-6 w-6 text-blue-500 mt-0.5" />
                    <p>Your bag is empty</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <CartItem
                                key={item.productId}
                                item={item}
                                onRemove={() => removeFromCart(item.productId)}
                            />
                        ))}
                    </div>

                    <div className="bg-white p-6 h-fit">
                        <h2 className="text-lg font-medium mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>£{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>£{shipping.toFixed(2)}</span>
                            </div>
                            <div className="pt-3 border-t flex justify-between font-medium">
                                <span>Total</span>
                                <span>£{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button className="w-full bg-black hover:bg-black/70">
                            CHECKOUT
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
