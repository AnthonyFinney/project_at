"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart-item";
import type { CartItemType } from "@/lib/schemas";
import Spinner from "@/components/spinner";
import { formatPrice, getShippingPrice } from "@/lib/utils";

export default function Page() {
    const [cart, setCart] = useState<CartItemType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    // Save cart and notify other components
    const saveCart = useCallback((updatedCart: CartItemType[]) => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Use setTimeout to ensure this doesn't happen during rendering
        setTimeout(() => {
            window.dispatchEvent(new Event("cartUpdated"));
        }, 0);
    }, []);

    // Updated to remove by both productId and size
    const removeFromCart = useCallback(
        (productId: string, size: string) => {
            setCart((prevCart) => {
                const updatedCart = prevCart.filter(
                    (item) =>
                        !(item.productId === productId && item.size === size)
                );
                saveCart(updatedCart);
                return updatedCart;
            });
        },
        [saveCart]
    );

    const updateQuantity = useCallback(
        (productId: string, size: string, quantity: number) => {
            setCart((prevCart) => {
                const updatedCart = prevCart.map((item) =>
                    item.productId === productId && item.size === size
                        ? { ...item, quantity }
                        : item
                );
                saveCart(updatedCart);
                return updatedCart;
            });
        },
        [saveCart]
    );

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const shipping = cart.length > 0 ? getShippingPrice() : 0;
    const total = subtotal + shipping;
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 min-h-screen">
            <Link
                href="/"
                className="inline-flex items-center text-sm mb-6 hover:underline"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Continue Shopping
            </Link>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">YOUR CART</h1>
                {cart.length > 0 && (
                    <span className="text-sm text-neutral-500">
                        {itemCount} {itemCount === 1 ? "item" : "items"}
                    </span>
                )}
            </div>

            {cart.length === 0 ? (
                <div className="bg-neutral-50 p-8 rounded-md text-center">
                    <div className="flex justify-center mb-4">
                        <ShoppingBag className="h-12 w-12 text-neutral-400" />
                    </div>
                    <h2 className="text-xl font-medium mb-2">
                        Your cart is empty
                    </h2>
                    <p className="text-neutral-500 mb-6">
                        Looks like you haven't added any items to your cart yet.
                    </p>
                    <Button asChild>
                        <Link href="/products">Browse Products</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <CartItem
                                key={`${item.productId}-${item.size}`}
                                item={item}
                                onRemove={removeFromCart}
                                onUpdateQuantity={updateQuantity}
                            />
                        ))}
                    </div>

                    <div className="bg-white p-6 h-fit border rounded-md">
                        <h2 className="text-lg font-medium mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span>
                                    Subtotal ({itemCount}{" "}
                                    {itemCount === 1 ? "item" : "items"})
                                </span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{formatPrice(shipping)}</span>
                            </div>
                            <div className="pt-3 border-t flex justify-between font-medium">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>

                        <Button
                            className="w-full bg-black hover:bg-black/80"
                            asChild
                        >
                            <Link href="/order">PROCEED TO CHECKOUT</Link>
                        </Button>

                        <div className="mt-4 text-xs text-neutral-500 text-center">
                            Taxes and discounts calculated at checkout
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
