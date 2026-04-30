"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

interface BentoItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    className: string;
    link: string;
}

const bentoItems: BentoItem[] = [
    {
        id: "woody",
        title: "THE WOODY COLLECTION",
        description: "A timeless blend of cedarwood, sandalwood, and earthy notes.",
        imageUrl: "/images/BentoItem1.png",
        className: "col-span-1 md:col-span-1 row-span-1",
        link: "/collections/woody",
    },
    {
        id: "floral",
        title: "THE FLORAL BOUQUET",
        description: "Delicate and romantic expressions of nature's finest blooms.",
        imageUrl: "/images/BentoItem2.png",
        className: "col-span-1 md:col-span-2 row-span-1",
        link: "/collections/floral",
    },
    {
        id: "marine",
        title: "THE MARINE VOYAGE",
        description: "Refreshing oceanic accords that invigorate the senses.",
        imageUrl: "/images/BentoItem3.jpg",
        className: "col-span-1 md:col-span-1 md:row-span-2",
        link: "/collections/marine",
    },
    {
        id: "citrus",
        title: "THE CITRUS BURST",
        description: "Vibrant and energetic combinations of zesty fruits.",
        imageUrl: "/images/BentoItem4.png",
        className: "col-span-1 md:col-span-2 row-span-1",
        link: "/collections/citrus",
    },
    {
        id: "oud",
        title: "THE OUD OBSESSION",
        description: "Rich, complex, and intensely luxurious oriental profiles.",
        imageUrl: "/images/BentoItem5.png",
        className: "col-span-1 md:col-span-1 row-span-1",
        link: "/collections/oud",
    },
];

export default function BentoGallery() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-serif tracking-widest font-bold uppercase">
                        OUR PRODUCT COLLECTION
                    </h2>
                    <div className="w-16 h-0.5 bg-yellow-500 mx-auto mt-4 mb-2"></div>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                >
                    {bentoItems.map((item) => (
                        <motion.div key={item.id} variants={itemVariants} className={item.className}>
                            <Link
                                href={item.link}
                                className="group relative overflow-hidden rounded-lg bg-neutral-900 block h-full w-full"
                            >
                            {/* Background Image */}
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                            
                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center text-white">
                                <h3 className="text-xl md:text-2xl font-serif font-bold tracking-wider mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-xs md:text-sm font-light text-neutral-200 uppercase tracking-wide opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 max-w-[80%]">
                                    {item.description}
                                </p>
                            </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
