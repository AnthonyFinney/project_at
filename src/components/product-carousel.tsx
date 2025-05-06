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

interface ProductCarouselProps {
    headline?: string;
    products: ProductType[];
    className?: string;
}

// Framer Motion Variants
const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
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
            className={`py-12 bg-neutral-50 ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
        >
            <div className="container mx-auto px-4">
                {headline && (
                    <motion.div
                        className="flex justify-between items-center mb-8"
                        variants={fadeInUp}
                    >
                        <h2 className="text-xl font-medium">{headline}</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-neutral-500 hidden sm:inline">
                                {current} / {count}
                            </span>
                            <div className="flex gap-2 sm:hidden">
                                <button
                                    onClick={() => api?.scrollPrev()}
                                    className="h-8 w-8 rounded-full bg-white border flex items-center justify-center shadow-sm"
                                    aria-label="Previous product"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => api?.scrollNext()}
                                    className="h-8 w-8 rounded-full bg-white border flex items-center justify-center shadow-sm"
                                    aria-label="Next product"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    className="relative px-4 md:px-10"
                    variants={fadeInUp}
                >
                    <Carousel
                        setApi={setApi}
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {products.map((product, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-full xs:basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4"
                                >
                                    <motion.div variants={fadeInUp}>
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
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <div className="hidden sm:flex absolute top-1/2 -left-2 transform -translate-y-1/2 z-10">
                            <CarouselPrevious className="h-8 w-8 opacity-70 hover:opacity-100" />
                        </div>
                        <div className="hidden sm:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                            <CarouselNext className="h-8 w-8 opacity-70 hover:opacity-100" />
                        </div>
                    </Carousel>

                    {/* Mobile Carousel Indicators */}
                    <motion.div
                        className="flex justify-center mt-6 sm:hidden"
                        variants={fadeInUp}
                    >
                        <div className="flex gap-1.5">
                            {Array.from({ length: count }).map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`h-2 rounded-full transition-all ${
                                        current === idx + 1
                                            ? "w-4 bg-black"
                                            : "w-2 bg-neutral-300"
                                    }`}
                                    onClick={() => api?.scrollTo(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Mobile Swipe Hint */}
                    <motion.div
                        className="mt-4 text-center text-sm text-neutral-500 sm:hidden"
                        variants={fadeInUp}
                    >
                        <span>Swipe to see more products</span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}
