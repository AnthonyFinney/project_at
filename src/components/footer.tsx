"use client";
import React from "react";
import Link from "next/link";
import {
    Facebook,
    Instagram,
    Twitter,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Neumorphic Shadow Tokens ─────────────────────────── */
const neumorphicExtruded = "shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]";
const neumorphicExtrudedSmall = "shadow-[5px_5px_10px_rgb(163,177,198,0.6),-5px_-5px_10px_rgba(255,255,255,0.5)]";
const neumorphicInsetSmall = "shadow-[inset_3px_3px_6px_rgb(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]";
const neumorphicActive = "active:translate-y-[1px] active:shadow-[inset_2px_2px_4px_rgb(163,177,198,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.5)]";

// Framer Motion Variants
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="bg-[#E0E5EC] border-none pt-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="container px-6 mx-auto">
                <div className={cn(
                    "grid grid-cols-1 lg:grid-cols-12 gap-12 p-12 rounded-[32px] bg-[#E0E5EC]",
                    neumorphicExtruded
                )}>
                    {/* Brand Column */}
                    <motion.div
                        className="lg:col-span-5 space-y-6"
                        variants={fadeInUp}
                    >
                        <h3 className="text-2xl font-display font-extrabold text-[#3D4852] tracking-tight">
                            THE KANZA <span className="text-[#6C63FF]">ROYAL</span> PERFUMERY
                        </h3>
                        <p className="text-base text-[#6B7280] leading-relaxed max-w-md font-body">
                            Crafting exquisite fragrances that capture the
                            essence of luxury and tradition since 1995. Every scent tells a unique story, molded with passion.
                        </p>
                        <div className="flex space-x-6 pt-4">
                            {[
                                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                            ].map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "h-12 w-12 rounded-2xl bg-[#E0E5EC] flex items-center justify-center text-[#3D4852] transition-all duration-300",
                                        neumorphicExtrudedSmall,
                                        "hover:text-[#6C63FF] hover:-translate-y-1",
                                        neumorphicActive
                                    )}
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        className="lg:col-span-3 space-y-6"
                        variants={fadeInUp}
                    >
                        <h3 className="text-sm font-display font-bold text-[#3D4852] tracking-widest uppercase flex items-center gap-3">
                            <span className="h-1 w-6 bg-[#6C63FF] rounded-full" />
                            Information
                        </h3>
                        <ul className="space-y-4 text-sm font-body font-medium text-[#6B7280]">
                            {[
                                { href: "/about", label: "About Us" },
                                { href: "/products", label: "Browse Shop" },
                                { href: "/shipping", label: "Shipping & Returns" },
                                { href: "/privacy", label: "Privacy Policy" },
                                { href: "/terms", label: "Terms & Conditions" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-[#6C63FF] transition-colors flex items-center gap-2 group"
                                    >
                                        <div className="h-1 w-0 bg-[#6C63FF] rounded-full transition-all group-hover:w-3" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        className="lg:col-span-4 space-y-6"
                        variants={fadeInUp}
                    >
                        <h3 className="text-sm font-display font-bold text-[#3D4852] tracking-widest uppercase flex items-center gap-3">
                            <span className="h-1 w-6 bg-[#6C63FF] rounded-full" />
                            Get In Touch
                        </h3>
                        <div className="space-y-4">
                            <div className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl bg-[#E0E5EC]",
                                neumorphicInsetSmall
                            )}>
                                <MapPin className="h-5 w-5 text-[#6C63FF]" />
                                <span className="text-sm text-[#6B7280] font-medium">123 Luxury Lane, Fragrance District, FL</span>
                            </div>
                            <div className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl bg-[#E0E5EC]",
                                neumorphicInsetSmall
                            )}>
                                <Phone className="h-5 w-5 text-[#6C63FF]" />
                                <span className="text-sm text-[#6B7280] font-medium">+1 (555) 123-4567</span>
                            </div>
                            <div className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl bg-[#E0E5EC]",
                                neumorphicInsetSmall
                            )}>
                                <Mail className="h-5 w-5 text-[#6C63FF]" />
                                <span className="text-sm text-[#6B7280] font-medium">hello@kanzaroyal.com</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    className="mt-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6"
                    variants={fadeInUp}
                >
                    <p className="text-xs font-body font-bold text-[#6B7280] tracking-wider uppercase opacity-60">
                        © {currentYear} THE KANZA ROYAL PERFUMERY. ALL RIGHTS RESERVED.
                    </p>
                    <div className={cn(
                        "flex gap-6 px-8 py-3 rounded-full bg-[#E0E5EC]",
                        neumorphicInsetSmall
                    )}>
                        {[
                            { href: "/sitemap", label: "SITEMAP" },
                            { href: "/cookies", label: "COOKIES" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[10px] font-bold text-[#6B7280] hover:text-[#6C63FF] transition-colors tracking-widest"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
            
            {/* Decorative Bottom Edge */}
            <div className="h-4 w-full bg-[#6C63FF] mt-8 opacity-10" />
        </motion.footer>
    );
}
