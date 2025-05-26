"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import type { CartItemType } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";

// Create a motion-enabled version of our custom Button
const MotionButton = motion(Button);

// Framer Motion Variants
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

interface CartItemProps {
    item: CartItemType;
    onRemove: (productId: string, size: string) => void;
    onUpdateQuantity: (
        productId: string,
        size: string,
        quantity: number
    ) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
    const handleIncreaseQuantity = () => {
        onUpdateQuantity(item.productId, item.size, item.quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (item.quantity > 1) {
            onUpdateQuantity(item.productId, item.size, item.quantity - 1);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="bg-white p-4 flex gap-4 relative border rounded-md"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.25 }}
                exit="exit"
            >
                <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                </div>

                <div className="flex-1">
                    <Link
                        href={`/products/${item.productId}`}
                        className="font-medium hover:underline"
                    >
                        {item.name}
                    </Link>

                    <div className="text-sm text-neutral-500 mt-1">
                        Size: {item.size}
                    </div>

                    <div className="font-medium mt-2">
                        {formatPrice(item.price)}
                    </div>

                    <div className="flex items-center mt-3">
                        <div className="flex items-center border rounded-md">
                            <MotionButton
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={handleDecreaseQuantity}
                                disabled={item.quantity <= 1}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Minus className="h-3 w-3" />
                            </MotionButton>
                            <span className="w-8 text-center">
                                {item.quantity}
                            </span>
                            <MotionButton
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={handleIncreaseQuantity}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Plus className="h-3 w-3" />
                            </MotionButton>
                        </div>
                        <div className="ml-4 text-sm text-neutral-500">
                            {`Item total: ${formatPrice(
                                item.price * item.quantity
                            )}`}
                        </div>
                    </div>
                </div>

                <motion.button
                    onClick={() => onRemove(item.productId, item.size)}
                    className="absolute top-4 right-4 p-1 hover:bg-neutral-100 rounded-full"
                    aria-label="Remove item"
                    whileTap={{ scale: 0.75 }}
                >
                    <X className="h-5 w-5" />
                </motion.button>
            </motion.div>
        </AnimatePresence>
    );
}
