"use client";

import { useEffect, useState, useCallback } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { CartItem } from "@/components/cart-item";
import type { CartItemType } from "@/lib/schemas";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function StickyCart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItemType[]>([]);

    const updateCartState = useCallback(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (err) {
                console.error("Error parsing cart:", err);
                setCart([]);
            }
        } else {
            setCart([]);
        }
    }, []);

    useEffect(() => {
        // Initial load
        updateCartState();

        const handleStorage = (e: StorageEvent) => {
            if (e.key === "cart") {
                updateCartState();
            }
        };

        const handleCartUpdated = () => {
            updateCartState();
        };

        const handleOpenCart = () => {
            setIsOpen(true);
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener("cartUpdated", handleCartUpdated);
        window.addEventListener("openCart", handleOpenCart);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("cartUpdated", handleCartUpdated);
            window.removeEventListener("openCart", handleOpenCart);
        };
    }, [updateCartState]);

    const saveCart = useCallback((updatedCart: CartItemType[]) => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        // Small delay to ensure event is picked up
        setTimeout(() => {
            window.dispatchEvent(new Event("cartUpdated"));
        }, 0);
    }, []);

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
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col bg-white px-6">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center text-xl font-bold">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        YOUR CART ({itemCount})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center text-neutral-500 mt-10">
                            Your cart is empty.
                        </div>
                    ) : (
                        cart.map((item) => (
                            <CartItem
                                key={`${item.productId}-${item.size}`}
                                item={item}
                                onRemove={removeFromCart}
                                onUpdateQuantity={updateQuantity}
                            />
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-t pt-4 mt-auto">
                        <div className="flex justify-between font-bold mb-4">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <p className="text-xs text-neutral-500 mb-4">
                            Shipping, taxes, and discounts calculated at checkout.
                        </p>
                        <Button
                            className="w-full bg-black text-white hover:bg-neutral-800"
                            asChild
                            onClick={() => setIsOpen(false)}
                        >
                            <Link href="/order">PROCEED TO CHECKOUT</Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full mt-2"
                            asChild
                            onClick={() => setIsOpen(false)}
                        >
                            <Link href="/cart">VIEW FULL CART</Link>
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>

        {/* Floating Action Button */}
        <AnimatePresence>
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-40 bg-black border-2 border-yellow-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center cursor-pointer"
                    aria-label="Open Cart"
                >
                    <div className="relative">
                        <ShoppingBag className="w-6 h-6 text-white" />
                        <span className="absolute -top-3 -right-3 bg-amber-400 text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {itemCount}
                        </span>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
        </>
    );
}
