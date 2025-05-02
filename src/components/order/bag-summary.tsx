"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { CartItemType } from "@/lib/schemas";

interface BagSummaryProps {
    items: CartItemType[];
}

export const BagSummary: React.FC<BagSummaryProps> = ({ items }) => {
    const [open, setOpen] = useState(true);
    const itemCount = items.length;
    const subtotal = items.reduce(
        (sum, { price, quantity }) => sum + price * quantity,
        0
    );

    // Variants for collapse container
    const containerVariants = {
        enter: {
            opacity: 1,
            height: "auto",
            transition: { when: "beforeChildren", staggerChildren: 0.05 },
        },
        exit: { opacity: 0, height: 0, transition: { when: "afterChildren" } },
    };

    // Variants for each item
    const itemVariants = {
        enter: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <section className="mb-8">
            <div className="border p-6 rounded-lg">
                {/* Header */}
                <button
                    onClick={() => setOpen((o) => !o)}
                    className="w-full flex items-center justify-between focus:outline-none"
                    aria-label={
                        open ? "Collapse bag summary" : "Expand bag summary"
                    }
                >
                    <h2 className="text-lg font-semibold uppercase">
                        Your Bag Summary ({itemCount} item
                        {itemCount !== 1 && "s"})
                    </h2>
                    <motion.span
                        className="text-2xl leading-none"
                        animate={{ rotate: open ? 0 : 180 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                        }}
                    >
                        {open ? "－" : "＋"}
                    </motion.span>
                </button>

                {/* Details */}
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            className="mt-4 divide-y divide-gray-200 divide-dashed overflow-hidden"
                            variants={containerVariants}
                            initial="exit"
                            animate="enter"
                            exit="exit"
                        >
                            {items.map((item) => (
                                <motion.div
                                    key={item.productId.toString()}
                                    className="py-4 flex items-center justify-between"
                                    variants={itemVariants}
                                >
                                    <Link
                                        href={`/products/${item.productId}`}
                                        className="flex items-center space-x-4"
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={60}
                                            height={60}
                                            className="rounded-md object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {item.size} | Qty:{" "}
                                                {item.quantity}
                                            </p>
                                        </div>
                                    </Link>
                                    <span className="font-medium">
                                        £
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </span>
                                </motion.div>
                            ))}

                            {/* Subtotal */}
                            <motion.div
                                className="pt-4 flex items-center justify-between"
                                variants={itemVariants}
                            >
                                <span className="font-semibold">Subtotal:</span>
                                <span className="font-semibold">
                                    £{subtotal.toFixed(2)}
                                </span>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
