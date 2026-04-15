"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./product-card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { ProductType } from "@/lib/schemas";
import { getProductPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
    headline?: string;
    products: ProductType[];
    className?: string;
}

/* ─── Neumorphic Shadow Tokens ─────────────────────────── */
const neumorphicExtruded = "shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]";
const neumorphicExtrudedSmall = "shadow-[5px_5px_10px_rgb(163,177,198,0.6),-5px_-5px_10px_rgba(255,255,255,0.5)]";
const neumorphicInsetSmall = "shadow-[inset_3px_3px_6px_rgb(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]";
const neumorphicActive = "active:translate-y-[1px] active:shadow-[inset_3px_3px_6px_rgb(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]";

// Framer Motion Variants
const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function ProductCarousel({
    headline = "TRENDING NOW",
    products,
    className = "",
}: ProductCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
    }, [api]);

    return (
        <motion.section
            className={cn("py-20 bg-[#E0E5EC] overflow-hidden", className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="container mx-auto px-6">
                {headline && (
                    <motion.div
                        className="flex justify-between items-end mb-12"
                        variants={fadeInUp}
                    >
                        <div className="space-y-2">
                            <div className="h-1 w-12 bg-[#6C63FF] rounded-full" />
                            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#3D4852] tracking-tight">
                                {headline}
                            </h2>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className={cn(
                                "hidden sm:flex items-center justify-center px-6 py-2 rounded-full bg-[#E0E5EC] text-[#6B7280] font-bold text-sm tracking-widest",
                                neumorphicInsetSmall
                            )}>
                                {String(current).padStart(2, '0')} <span className="mx-2 opacity-30">/</span> {String(count).padStart(2, '0')}
                            </div>
                            
                            <div className="flex gap-4">
                                <button
                                    onClick={() => api?.scrollPrev()}
                                    className={cn(
                                        "h-12 w-12 rounded-full bg-[#E0E5EC] flex items-center justify-center text-[#3D4852] transition-all duration-300",
                                        neumorphicExtrudedSmall,
                                        "hover:shadow-[7px_7px_12px_rgb(163,177,198,0.7),-7px_-7px_12px_rgba(255,255,255,0.6)]",
                                        neumorphicActive
                                    )}
                                    aria-label="Previous product"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={() => api?.scrollNext()}
                                    className={cn(
                                        "h-12 w-12 rounded-full bg-[#E0E5EC] flex items-center justify-center text-[#3D4852] transition-all duration-300",
                                        neumorphicExtrudedSmall,
                                        "hover:shadow-[7px_7px_12px_rgb(163,177,198,0.7),-7px_-7px_12px_rgba(255,255,255,0.6)]",
                                        neumorphicActive
                                    )}
                                    aria-label="Next product"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    className="relative"
                    variants={fadeInUp}
                >
                    <Carousel
                        setApi={setApi}
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {products.map((product, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-full xs:basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4"
                                >
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        price={getProductPrice(product)}
                                        tags={product.tags.slice(0, 3)}
                                        image={product.image}
                                        size={
                                            product.variants[0]?.size || ""
                                        }
                                        concentration={
                                            product.concentration
                                        }
                                        productLink={`/products/${product.id}`}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    {/* Indicators */}
                    <motion.div
                        className="flex justify-center mt-12"
                        variants={fadeInUp}
                    >
                        <div className={cn(
                            "flex gap-3 px-6 py-3 rounded-full bg-[#E0E5EC]",
                            neumorphicInsetSmall
                        )}>
                            {Array.from({ length: count }).map((_, idx) => (
                                <button
                                    key={idx}
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-500",
                                        current === idx + 1
                                            ? "w-8 bg-[#6C63FF] shadow-[0_0_10px_rgba(108,99,255,0.5)]"
                                            : "w-2 bg-[#A3B1C6] hover:bg-[#6B7280]"
                                    )}
                                    onClick={() => api?.scrollTo(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Mobile Swipe Hint */}
                    <motion.div
                        className="mt-6 text-center text-xs font-bold tracking-widest text-[#6B7280] sm:hidden uppercase opacity-50"
                        variants={fadeInUp}
                    >
                        <span>Swipe to explore</span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
