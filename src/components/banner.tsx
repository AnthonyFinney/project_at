"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BannerProps {
    /** Background image URL */
    backgroundImage?: string;
    /** Brand or subheading text */
    brandText?: string;
    /** Main heading text */
    heading?: React.ReactNode;
    /** Description paragraph */
    description?: string;
    /** Primary button text */
    primaryButtonText?: string;
    /** Primary button link */
    primaryButtonLink?: string;
    /** Secondary button text */
    secondaryButtonText?: string;
    /** Secondary button link */
    secondaryButtonLink?: string;
    /** Show decorative elements */
    showDecorations?: boolean;
    /** Custom height for the banner */
    height?: string;
    /** Additional CSS classes */
    className?: string;
    /** Overlay gradient direction and colors */
    overlayGradient?: string;
    /** Text color */
    textColor?: string;
}

// Framer Motion Variants
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function Banner({
    backgroundImage = "https://images.unsplash.com/photo-1474112704314-8162b7749a90?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    brandText = "THE KANZA ROYAL PERFUMERY",
    heading = (
        <>
            THE <span className="italic font-normal">ESSENCE</span> OF YOU
        </>
    ),
    description = "Embrace your distinctive spirit with an exquisite collection of artisanal fragrances, from elegant Nepalese Deer Musk to captivating Honeysuckle and White Lotus. Each scent tells a unique story, crafted to perfection.",
    primaryButtonText = "EXPLORE COLLECTION",
    primaryButtonLink = "/products",
    secondaryButtonText = "FEATURED FRAGRANCES",
    secondaryButtonLink = "/products/featured",
    showDecorations = true,
    height = "h-[600px] sm:h-[650px]",
    className = "",
    overlayGradient = "bg-gradient-to-r from-black/60 via-black/40 to-transparent",
    textColor = "text-white",
}: BannerProps) {
    return (
        <motion.section
            className={cn("relative w-full overflow-hidden", height, className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
        >
            {/* Main Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={backgroundImage || "/placeholder.svg"}
                    alt="Banner background"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                <div className={cn("absolute inset-0", overlayGradient)} />
            </div>

            {/* Decorative Elements */}
            {showDecorations && (
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                    <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full border border-white/30 animate-[spin_40s_linear_infinite]" />
                    <div className="absolute bottom-[30%] right-[20%] w-40 h-40 rounded-full border border-white/20 animate-[spin_30s_linear_infinite_reverse]" />
                </div>
            )}

            {/* Content Container */}
            <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
                <motion.div
                    className={cn("max-w-xl", textColor)}
                    variants={fadeInUp}
                >
                    {brandText && (
                        <motion.p
                            variants={fadeInUp}
                            className="text-sm font-light tracking-widest mb-2"
                        >
                            {brandText}
                        </motion.p>
                    )}

                    <motion.div variants={fadeInUp} className="mb-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light">
                            {heading}
                        </h1>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="w-16 h-0.5 bg-current opacity-70 mb-6"
                    />

                    {description && (
                        <motion.p
                            variants={fadeInUp}
                            className="mb-6 text-sm sm:text-base font-light leading-relaxed max-w-md"
                        >
                            {description}
                        </motion.p>
                    )}

                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        {primaryButtonText && (
                            <Link
                                href={primaryButtonLink}
                                className="inline-block"
                            >
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "bg-transparent border-current hover:bg-white hover:text-black transition-all duration-300 rounded-none px-8 py-6 text-sm tracking-wider",
                                        textColor
                                    )}
                                >
                                    {primaryButtonText}
                                </Button>
                            </Link>
                        )}

                        {secondaryButtonText && (
                            <Link
                                href={secondaryButtonLink}
                                className="inline-block"
                            >
                                <Button
                                    variant="link"
                                    className={cn(
                                        "group flex items-center gap-2 px-4 py-2 hover:opacity-80",
                                        textColor
                                    )}
                                >
                                    {secondaryButtonText}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        )}
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.section>
    );
}
