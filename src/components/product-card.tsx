"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tag, ShoppingCart } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    name: string;
    description?: string;
    price: number;
    tags?: string[];
    image?: string;
    size?: string;
    concentration?: string;
    productLink: string;
}

/* ─── Framer‑Motion variants ─────────────────────────────── */
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
};

export default function ProductCard({
    name,
    description,
    price,
    tags = [],
    image,
    size,
    concentration,
    productLink,
}: ProductCardProps) {
    return (
        <div className="group cursor-pointer bg-white border border-neutral-200 rounded-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
            <Link href={productLink} className="block flex-grow">
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="flex flex-col h-full"
                >
                    {/* Image block */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                        <Image
                            src={
                                image || "/placeholder.svg?height=400&width=400"
                            }
                            alt={name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        {size && (
                            <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                                {size}
                            </div>
                        )}
                    </div>

                    {/* Text / tags */}
                    <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                        <div>
                            <h3 className="font-semibold text-sm line-clamp-2 md:text-base mb-1">{name}</h3>
                            {concentration && (
                                <p className="text-xs text-neutral-500 uppercase tracking-wide">
                                    {concentration}
                                </p>
                            )}

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {tags.slice(0, 2).map((tag, i) => (
                                        <Badge
                                            key={i}
                                            variant="outline"
                                            className="text-xs py-0 h-5 flex items-center gap-1"
                                        >
                                            <Tag className="h-3 w-3" />
                                            {tag}
                                        </Badge>
                                    ))}
                                    {tags.length > 2 && (
                                        <Badge
                                            variant="outline"
                                            className="text-xs py-0 h-5"
                                        >
                                            +{tags.length - 2}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-2 text-center md:text-left">
                            <p className="text-base font-bold text-black border-t border-neutral-100 pt-2">
                                {formatPrice(price)}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Link>
            
            {/* Full-width Add to Cart Button */}
            <div className="w-full mt-auto">
                <Button 
                    className="w-full rounded-none bg-black text-white hover:bg-yellow-600 hover:text-black uppercase tracking-wider text-xs font-bold py-5 flex items-center justify-center space-x-2 transition-colors duration-300"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const productId = productLink.split('/').pop() || "unknown";
                        
                        // Create cart item
                        const newItem = {
                            productId,
                            name,
                            price,
                            image: image || "/placeholder.svg",
                            size: size || "Standard",
                            quantity: 1
                        };

                        // Add to cart in localStorage
                        try {
                            const stored = localStorage.getItem("cart");
                            const cart = stored ? JSON.parse(stored) : [];
                            
                            const existingIndex = cart.findIndex(
                                (item: any) => item.productId === newItem.productId && item.size === newItem.size
                            );
                            
                            if (existingIndex >= 0) {
                                cart[existingIndex].quantity += 1;
                            } else {
                                cart.push(newItem);
                            }
                            
                            localStorage.setItem("cart", JSON.stringify(cart));
                            window.dispatchEvent(new Event("cartUpdated"));
                            
                            // Open sticky cart
                            setTimeout(() => {
                                window.dispatchEvent(new Event("openCart"));
                            }, 50);
                        } catch (err) {
                            console.error("Failed to add to cart", err);
                        }
                    }}
                >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                </Button>
            </div>
        </div>
    );
}
