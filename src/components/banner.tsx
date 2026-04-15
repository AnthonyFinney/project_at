"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
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
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

const float: Variants = {
    animate: {
        y: [0, -15, 0],
        transition: {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
        },
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
    description = "Embrace your distinctive spirit with an exquisite collection of artisanal fragrances, from elegant Nepalese Deer Musk to captivating Honeysuckle and White Lotus.",
    primaryButtonText = "EXPLORE COLLECTION",
    primaryButtonLink = "/products",
    secondaryButtonText = "VIEW FEATURED",
    secondaryButtonLink = "/products",
    showDecorations = true,
    height = "min-h-[700px]",
    className = "",
}: BannerProps) {
    // Neumorphic Design Tokens
    const neumorphicExtruded = "shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]";
    const neumorphicExtrudedHover = "hover:shadow-[12px_12px_20px_rgb(163,177,198,0.7),-12px_-12px_20px_rgba(255,255,255,0.6)]";
    const neumorphicInsetDeep = "shadow-[inset_10px_10px_20px_rgb(163,177,198,0.7),inset_-10px_-10px_20px_rgba(255,255,255,0.6)]";
    const neumorphicActive = "active:translate-y-[2px] active:shadow-[inset_4px_4px_8px_rgb(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]";

    return (
        <motion.section
            className={cn(
                "relative w-full overflow-hidden bg-[#E0E5EC] py-20 lg:py-32",
                height,
                className
            )}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Decorative Neumorphic Background Art */}
            {showDecorations && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div 
                        className={cn("absolute -top-24 -left-24 w-96 h-96 rounded-full", neumorphicExtruded)}
                        variants={float}
                        animate="animate"
                    />
                    <div className={cn("absolute top-1/2 right-[5%] w-64 h-64 rounded-full", neumorphicInsetDeep)} />
                    <motion.div 
                        className={cn("absolute bottom-10 left-[15%] w-32 h-32 rounded-full", neumorphicExtruded)}
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>
            )}

            <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
                <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                    
                    {/* Content Column */}
                    <motion.div className="max-w-2xl" variants={fadeInUp}>
                        {brandText && (
                            <motion.p
                                variants={fadeInUp}
                                className="text-sm font-bold tracking-[0.2em] text-[#6B7280] mb-6 font-display"
                            >
                                {brandText}
                            </motion.p>
                        )}

                        <motion.h1 
                            variants={fadeInUp}
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#3D4852] leading-[1.1] mb-8 font-display tracking-tight"
                        >
                            {heading}
                        </motion.h1>

                        {description && (
                            <motion.p
                                variants={fadeInUp}
                                className="text-lg text-[#6B7280] leading-relaxed mb-10 max-w-lg font-body"
                            >
                                {description}
                            </motion.p>
                        )}

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap gap-6"
                        >
                            {primaryButtonText && (
                                <Link href={primaryButtonLink}>
                                    <button className={cn(
                                        "px-8 py-4 bg-[#6C63FF] text-white rounded-2xl font-bold transition-all duration-300",
                                        "shadow-[6px_6px_12px_rgba(108,99,255,0.4),-6px_-6px_12px_rgba(255,255,255,0.2)]",
                                        "hover:bg-[#8B84FF] hover:-translate-y-1 active:translate-y-1",
                                        "focus:ring-2 focus:ring-[#6C63FF] focus:ring-offset-4 focus:ring-offset-[#E0E5EC]"
                                    )}>
                                        {primaryButtonText}
                                    </button>
                                </Link>
                            )}

                            {secondaryButtonText && (
                                <Link href={secondaryButtonLink}>
                                    <button className={cn(
                                        "px-8 py-4 bg-[#E0E5EC] text-[#3D4852] rounded-2xl font-bold transition-all duration-300 flex items-center gap-2",
                                        neumorphicExtruded,
                                        neumorphicExtrudedHover,
                                        neumorphicActive,
                                        "group"
                                    )}>
                                        {secondaryButtonText}
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </Link>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Visual Column - The "Nested Depth" feature */}
                    <motion.div 
                        variants={fadeInUp}
                        className="hidden lg:flex justify-center items-center relative"
                    >
                        {/* Outer Extruded Ring */}
                        <div className={cn(
                            "w-[500px] h-[500px] rounded-[32px] bg-[#E0E5EC] flex items-center justify-center p-12 transition-transform duration-500 hover:scale-[1.02]",
                            neumorphicExtruded
                        )}>
                            {/* Inner Inset Deep Frame */}
                            <div className={cn(
                                "w-full h-full rounded-[24px] bg-[#E0E5EC] overflow-hidden p-4",
                                neumorphicInsetDeep
                            )}>
                                {/* Image Container (Molded Look) */}
                                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-[4px_4px_8px_rgba(0,0,0,0.1)]">
                                    <Image
                                        src={backgroundImage}
                                        alt="Perfume Collection"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Glass Overlay Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/20 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Floating Decorative Elements around image */}
                        <motion.div 
                            className={cn("absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#E0E5EC]", neumorphicExtruded)}
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div 
                            className={cn("absolute -bottom-12 left-10 w-40 h-40 rounded-full bg-[#E0E5EC]", neumorphicInsetDeep)}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
}
