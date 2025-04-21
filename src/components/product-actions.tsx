"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "./ui/button";
import { ShoppingBag, Check } from "lucide-react";
import type { CartItemType } from "@/lib/schemas";
import { toast } from "sonner";

export default function ProductAction({
    cartItem,
}: {
    cartItem: CartItemType;
}) {
    const [cart, setCart] = useState<CartItemType[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    // Load cart data
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
    }, []);

    // Save cart data
    const saveCart = useCallback((updatedCart: CartItemType[]) => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Use setTimeout to ensure this doesn't happen during rendering
        setTimeout(() => {
            window.dispatchEvent(new Event("cartUpdated"));
        }, 0);
    }, []);

    const addToCart = useCallback(() => {
        setIsAdding(true);

        setCart((prevCart) => {
            // Check if item already exists in cart
            const existingItemIndex = prevCart.findIndex(
                (item) =>
                    item.productId === cartItem.productId &&
                    item.size === cartItem.size
            );

            let updatedCart;

            if (existingItemIndex >= 0) {
                // Update quantity if item exists
                updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity:
                        updatedCart[existingItemIndex].quantity +
                        cartItem.quantity,
                };
            } else {
                // Add new item if it doesn't exist
                updatedCart = [...prevCart, { ...cartItem }];
            }

            // Save cart outside of render cycle
            saveCart(updatedCart);
            return updatedCart;
        });

        // Show success state
        setIsAdded(true);
        toast(
            `Added to cart ${cartItem.name} (${cartItem.size}) has been added to your cart.`
        );

        // Reset button state after delay
        setTimeout(() => {
            setIsAdding(false);
            setIsAdded(false);
        }, 2000);
    }, [cartItem, saveCart, toast]);

    return (
        <div className="flex gap-4 mt-4 justify-start">
            <Button
                className="px-6 max-w-xs"
                size="lg"
                onClick={addToCart}
                disabled={isAdding}
            >
                {isAdded ? (
                    <span className="flex items-center">
                        <Check className="mr-2 h-4 w-4" /> Added to Cart
                    </span>
                ) : (
                    <span className="flex items-center">
                        <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                    </span>
                )}
            </Button>
        </div>
    );
}
