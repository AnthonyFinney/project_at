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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

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
            className="border-t border-neutral-800 bg-black text-white"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible" // 🔑 play when scrolled into view
            viewport={{ once: false, amount: 0.25 }} // 25 % visible, only the first time
        >
            {/* Main Footer Content */}
            <motion.div
                className="container px-4 py-12 mx-auto"
                variants={fadeInUp}
            >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Column */}
                    <motion.div className="space-y-4" variants={fadeInUp}>
                        <h3 className="text-lg font-medium tracking-wider">
                            THE KANZA ROYAL PERFUMERY
                        </h3>
                        <p className="text-sm text-neutral-400 max-w-xs">
                            Crafting exquisite fragrances that capture the
                            essence of luxury and tradition since 1995.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <Link
                                href="https://www.facebook.com/profile.php?id=61566971972126"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5 text-neutral-400 hover:text-white transition-colors" />
                            </Link>
                            <Link
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5 text-neutral-400 hover:text-white transition-colors" />
                            </Link>
                            <Link
                                href="https://www.twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5 text-neutral-400 hover:text-white transition-colors" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div className="space-y-4" variants={fadeInUp}>
                        <h3 className="text-sm font-medium tracking-widest uppercase">
                            Shop
                        </h3>
                        <ul className="space-y-2 text-sm text-neutral-400">
                            {[
                                {
                                    href: "/collections/attar",
                                    label: "Attar Collection",
                                },
                                {
                                    href: "/collections/perfume",
                                    label: "Perfume Oils",
                                },
                                {
                                    href: "/collections/gift-sets",
                                    label: "Gift Sets",
                                },
                                {
                                    href: "/collections/new-arrivals",
                                    label: "New Arrivals",
                                },
                                {
                                    href: "/collections/bestsellers",
                                    label: "Bestsellers",
                                },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Information */}
                    <motion.div className="space-y-4" variants={fadeInUp}>
                        <h3 className="text-sm font-medium tracking-widest uppercase">
                            Information
                        </h3>
                        <ul className="space-y-2 text-sm text-neutral-400">
                            {[
                                { href: "/about", label: "About Us" },
                                { href: "/contact", label: "Contact Us" },
                                {
                                    href: "/shipping",
                                    label: "Shipping & Returns",
                                },
                                { href: "/privacy", label: "Privacy Policy" },
                                { href: "/terms", label: "Terms & Conditions" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div className="space-y-4" variants={fadeInUp}>
                        <h3 className="text-sm font-medium tracking-widest uppercase">
                            Newsletter
                        </h3>
                        <p className="text-sm text-neutral-400">
                            Subscribe to receive updates, access to exclusive
                            deals, and more.
                        </p>
                        <div className="flex flex-col space-y-2">
                            <Input
                                type="email"
                                placeholder="Your email address"
                                className="bg-neutral-900 border-neutral-800 text-white focus:ring-neutral-700 h-10"
                            />
                            <Button className="bg-white text-black hover:bg-neutral-200 rounded-none h-10">
                                Subscribe
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Contact Information */}
                <motion.div
                    className="mt-12 pt-8 border-t border-neutral-800 grid grid-cols-1 gap-4 md:grid-cols-3"
                    variants={fadeInUp}
                >
                    <div className="flex items-center space-x-3 text-sm text-neutral-400">
                        <MapPin className="h-4 w-4 text-neutral-500" />
                        <span>
                            123 Luxury Lane, Fragrance District, FL 12345
                        </span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-neutral-400">
                        <Phone className="h-4 w-4 text-neutral-500" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-neutral-400">
                        <Mail className="h-4 w-4 text-neutral-500" />
                        <span>info@kanzaroyalperfumery.com</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Copyright Bar */}
            <motion.div
                className="py-6 border-t border-neutral-900 bg-black"
                variants={fadeInUp}
            >
                <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-neutral-500 mb-4 md:mb-0">
                        © {currentYear} The Kanza Royal Perfumery. All rights
                        reserved.
                    </p>
                    <div className="flex space-x-6">
                        {[
                            { href: "/sitemap", label: "Sitemap" },
                            { href: "/accessibility", label: "Accessibility" },
                            { href: "/cookies", label: "Cookie Policy" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-xs text-neutral-500 hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.footer>
    );
}
