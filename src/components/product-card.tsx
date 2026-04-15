"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

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

/* ─── Neumorphic Shadow Tokens ─────────────────────────── */
const neumorphicExtruded = "shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]";
const neumorphicInsetDeep = "shadow-[inset_10px_10px_20px_rgb(163,177,198,0.7),inset_-10px_-10px_20px_rgba(255,255,255,0.6)]";
const neumorphicInsetSmall = "shadow-[inset_3px_3px_6px_rgb(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]";

/* ─── Framer‑Motion variants ─────────────────────────────── */
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { 
        y: -4,
        boxShadow: "12px 12px 20px rgb(163, 177, 198, 0.7), -12px -12px 20px rgba(255, 255, 255, 0.6)",
        transition: { duration: 0.3, ease: "easeOut" } 
    },
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
        <Link href={productLink} className="block group p-4">
            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover="hover"
                className={cn(
                    "bg-[#E0E5EC] rounded-[32px] p-6 transition-all duration-300 h-full flex flex-col",
                    neumorphicExtruded
                )}
            >
                {/* Image block (Inset Well) */}
                <div className={cn(
                    "rounded-[24px] overflow-hidden mb-6 p-2 bg-[#E0E5EC]",
                    neumorphicInsetDeep
                )}>
                    <div className="relative aspect-square overflow-hidden rounded-[18px]">
                        <Image
                            src={
                                image || "/placeholder.svg?height=400&width=400"
                            }
                            alt={name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {size && (
                            <div className={cn(
                                "absolute bottom-3 right-3 bg-[#E0E5EC]/90 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-bold text-[#3D4852]",
                                "shadow-[2px_2px_5px_rgba(0,0,0,0.1)]"
                            )}>
                                {size}
                            </div>
                        )}
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3 flex-grow flex flex-col">
                    <div className="space-y-1">
                        <h3 className="font-display font-bold text-lg text-[#3D4852] tracking-tight leading-tight group-hover:text-[#6C63FF] transition-colors duration-300">
                            {name}
                        </h3>
                        {concentration && (
                            <p className="text-xs font-body font-medium text-[#6B7280] tracking-wide uppercase">
                                {concentration}
                            </p>
                        )}
                    </div>

                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {tags.slice(0, 2).map((tag, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "text-[10px] font-bold py-1 px-3 rounded-full flex items-center gap-1.5 text-[#6B7280] bg-[#E0E5EC]",
                                        neumorphicInsetSmall
                                    )}
                                >
                                    <Tag className="h-2.5 w-2.5" />
                                    {tag.toUpperCase()}
                                </div>
                            ))}
                            {tags.length > 2 && (
                                <div
                                    className={cn(
                                        "text-[10px] font-bold py-1 px-2 rounded-full text-[#6B7280] bg-[#E0E5EC]",
                                        neumorphicInsetSmall
                                    )}
                                >
                                    +{tags.length - 2}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="pt-2">
                        <p className="text-xl font-display font-extrabold text-[#3D4852]">
                            {formatPrice(price)}
                        </p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
