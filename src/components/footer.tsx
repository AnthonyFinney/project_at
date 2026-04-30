"use client";
import React from "react";
import Link from "next/link";
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    MapPin,
    Phone,
    Mail,
    ShieldCheck,
    Truck,
    Award,
    CreditCard,
    Headset
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

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
            className="bg-black text-white"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            {/* Top Badges Section */}
            <div className="border-b border-neutral-800 py-6">
                <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
                    {[
                        { icon: Award, label: "Original Product" },
                        { icon: Truck, label: "Fast Delivery" },
                        { icon: ShieldCheck, label: "Secure Payment" },
                        { icon: Headset, label: "24/7 Support" },
                        { icon: CreditCard, label: "Easy Returns" },
                    ].map((badge, idx) => (
                        <div key={idx} className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center">
                                <badge.icon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-[10px] tracking-wider uppercase text-neutral-400">{badge.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Footer Content */}
            <motion.div
                className="container px-4 py-12 mx-auto"
                variants={fadeInUp}
            >
                {/* Center Brand and Social */}
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <div className="flex justify-center mb-2">
                        {/* Golden Logo Representation */}
                        <div className="text-yellow-500 font-serif text-3xl md:text-4xl tracking-widest uppercase font-bold flex flex-col items-center">
                            <span className="mb-1">KHOLZI'S</span>
                            <span className="text-xs tracking-[0.3em] font-sans font-normal opacity-80">TREASURE</span>
                        </div>
                    </div>
                    <p className="text-sm text-neutral-400 max-w-md italic tracking-wide">
                        Where every spray inspires. Kholzi's endless collections...
                    </p>

                    {/* Newsletter Subscription */}
                    <div className="w-full max-w-md pt-6 pb-2">
                        <p className="text-xs tracking-widest uppercase font-bold text-neutral-300 mb-3">Newsletter Sign Up</p>
                        <div className="flex w-full">
                            <input 
                                type="email" 
                                placeholder="Enter your email here..." 
                                className="w-full bg-neutral-900 border border-neutral-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 rounded-l-md"
                            />
                            <button className="bg-yellow-600 text-black font-bold uppercase tracking-wider px-6 text-sm hover:bg-yellow-500 transition-colors rounded-r-md">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <p className="text-xs tracking-widest uppercase pt-6 font-medium text-neutral-300">Get Connect With Kholzi's Treasure</p>
                    <div className="flex space-x-4 pt-2">
                        <Link href="#" aria-label="Facebook" className="w-10 h-10 border border-neutral-700 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition-colors">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" aria-label="Instagram" className="w-10 h-10 border border-neutral-700 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition-colors">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" aria-label="YouTube" className="w-10 h-10 border border-neutral-700 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition-colors">
                            <Youtube className="h-5 w-5" />
                        </Link>
                        <Link href="#" aria-label="Twitter" className="w-10 h-10 border border-neutral-700 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-4 border-t border-neutral-800 pt-12">
                    {/* Quick Link */}
                    <motion.div className="space-y-6" variants={fadeInUp}>
                        <h3 className="text-sm font-semibold tracking-widest uppercase">
                            QUICK LINK
                        </h3>
                        <ul className="space-y-3 text-sm text-neutral-400">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/about", label: "About Us" },
                                { href: "/privacy", label: "Privacy Policy" },
                                { href: "/shipping", label: "Shipping Policy" },
                                { href: "/terms", label: "Terms of Service" },
                                { href: "/refund", label: "Refund Policy" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-yellow-500 transition-colors inline-block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Information */}
                    <motion.div className="space-y-6" variants={fadeInUp}>
                        <h3 className="text-sm font-semibold tracking-widest uppercase">
                            INFORMATION
                        </h3>
                        <ul className="space-y-3 text-sm text-neutral-400">
                            {[
                                { href: "/faq", label: "FAQ" },
                                { href: "/account", label: "My Account" },
                                { href: "/track", label: "Order Tracking" },
                                { href: "/wishlist", label: "Wishlist" },
                                { href: "/contact", label: "Contact Us" },
                                { href: "/blog", label: "Our Blog" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-yellow-500 transition-colors inline-block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Us */}
                    <motion.div className="space-y-6" variants={fadeInUp}>
                        <h3 className="text-sm font-semibold tracking-widest uppercase">
                            CONTACT US
                        </h3>
                        <div className="space-y-4 text-sm text-neutral-400">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">
                                    153, ALAMGIR & KAMARUZZAMAN TOWER, 
                                    RUPSHA BUS STAND, DHAKA, BANGLADESH
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-yellow-500 shrink-0" />
                                <span>+880 1234 567890</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-yellow-500 shrink-0" />
                                <span>info@kholzistreasure.com</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* App Links */}
                    <motion.div className="space-y-6" variants={fadeInUp}>
                        <h3 className="text-sm font-semibold tracking-widest uppercase">
                            DOWNLOAD OUR APP
                        </h3>
                        <div className="space-y-4 flex flex-col">
                            <Link href="#" className="inline-block hover:opacity-80 transition-opacity">
                                <div className="border border-neutral-600 rounded-md px-4 py-2 flex items-center space-x-3 bg-neutral-900 w-48">
                                    <svg viewBox="0 0 384 512" fill="currentColor" className="h-6 w-6"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[10px] uppercase font-semibold text-neutral-400">Download on the</span>
                                        <span className="text-sm font-bold">App Store</span>
                                    </div>
                                </div>
                            </Link>
                            <Link href="#" className="inline-block hover:opacity-80 transition-opacity">
                                <div className="border border-neutral-600 rounded-md px-4 py-2 flex items-center space-x-3 bg-neutral-900 w-48">
                                    <svg viewBox="0 0 512 512" fill="currentColor" className="h-6 w-6"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[10px] uppercase font-semibold text-neutral-400">Get it on</span>
                                        <span className="text-sm font-bold">Google Play</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Copyright Bar */}
            <motion.div
                className="py-4 border-t border-neutral-900 bg-neutral-950"
                variants={fadeInUp}
            >
                <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
                    <p className="text-xs tracking-wider text-neutral-500 font-medium">
                        © {currentYear} KHOLZI'S TREASURE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex space-x-2">
                        {/* Payment Icons Placeholders */}
                        <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-black text-[8px] font-bold">VISA</div>
                        <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-black text-[8px] font-bold">MC</div>
                        <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-black text-[8px] font-bold">AMEX</div>
                        <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-black text-[8px] font-bold">PAYPAL</div>
                    </div>
                </div>
            </motion.div>
        </motion.footer>
    );
}
