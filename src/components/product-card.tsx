"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import { motion, Variants } from "framer-motion";

export interface ProductCardProps {
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
    const formatPrice = (val: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(val);

    return (
        <Link href={productLink} className="block">
            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible" /* fade‑in on scroll */
                viewport={{ once: false, amount: 0.2 }}
                whileHover="hover" /* lift on hover */
                className="group cursor-pointer"
            >
                {/* Image block */}
                <div className="bg-white rounded-md overflow-hidden border shadow-sm mb-3">
                    <div className="relative aspect-square overflow-hidden">
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
                </div>

                {/* Text / tags */}
                <div className="space-y-1">
                    <h3 className="font-medium text-sm">{name}</h3>
                    {concentration && (
                        <p className="text-xs text-muted-foreground">
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

                    <p className="text-sm font-semibold text-primary">
                        {formatPrice(price)}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}
