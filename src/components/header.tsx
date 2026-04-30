"use client";

import React, { useState, useEffect } from "react";
import {
    Menu,
    Search,
    ShoppingBag,
    ChevronDown,
    UserRound,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { signOut, useSession } from "next-auth/react";
import { userAvatar } from "@/lib/utils";
import Image from "next/image";
import type { CartItemType } from "@/lib/schemas";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenUser, setIsOpenUser] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const { data: session } = useSession();
    const seed = session?.user?.email || "guest";
    const avatar = userAvatar(seed);

    useEffect(() => {
        const updateCart = () => {
            try {
                const stored = localStorage.getItem("cart");
                if (!stored) {
                    setCartItemCount(0);
                    setCartTotal(0);
                    return;
                }
                const cart = JSON.parse(stored) as CartItemType[];
                setCartItemCount(cart.reduce((sum, i) => sum + i.quantity, 0));
                setCartTotal(cart.reduce((sum, i) => sum + (i.price * i.quantity), 0));
            } catch {
                setCartItemCount(0);
                setCartTotal(0);
            }
        };
        updateCart();
        const onStorage = (e: StorageEvent) => e.key === "cart" && updateCart();
        const onCartEvent = () => setTimeout(updateCart, 0);
        window.addEventListener("storage", onStorage);
        window.addEventListener("cartUpdated", onCartEvent);
        return () => {
            window.removeEventListener("storage", onStorage);
            window.removeEventListener("cartUpdated", onCartEvent);
        };
    }, []);

    const goToSearch = () => {
        if (!searchQuery.trim()) return;
        router.push(`/search?search=${encodeURIComponent(searchQuery)}`);
    };

    const handleSignOut = () => signOut();

    const navLinks = [
        { name: "HOME", href: "/" },
        { name: "FRAGRANCES", href: "/products" },
        { name: "INVITATIONS", href: "/invitations" },
        { name: "GIFTS", href: "/gifts" },
        { name: "EVENTS", href: "/events" },
        { name: "CONTACT US", href: "/contact" },
        { name: "BLOG", href: "/blog" },
        { name: "ABOUT US", href: "/about" },
    ];

    return (
        <motion.header 
            className="w-full relative z-50"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Main Header Row */}
            <div className="bg-black text-white px-4 py-6 border-b border-neutral-800">
                <div className="container mx-auto grid grid-cols-3 items-center">
                    
                    {/* Left: Search */}
                    <div className="hidden md:flex w-full items-center">
                        <div className="relative w-full max-w-xs">
                            <Input
                                type="text"
                                className="w-full bg-black border-neutral-700 text-white placeholder-neutral-500 pl-4 pr-10 py-2.5 rounded-none focus-visible:ring-yellow-600 focus-visible:ring-1"
                                placeholder="Search our collection..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") goToSearch();
                                }}
                            />
                            <button 
                                onClick={goToSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Center: Mobile menu button (left on mobile) & Logo */}
                    <div className="col-span-2 md:col-span-1 flex items-center md:justify-center lg:pl-0">
                        <button 
                            className="md:hidden text-white mr-4"
                            onClick={() => setIsOpenMenu(!isOpenMenu)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <Link href="/" className="flex flex-col items-center justify-center space-y-1">
                            <div className="flex items-center space-x-2">
                                {/* Optional gold icon representation */}
                                <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-yellow-600 flex items-center justify-center rounded-sm">
                                    <span className="text-yellow-600 font-bold text-lg md:text-xl font-serif">K</span>
                                </div>
                                <span className="font-serif font-bold text-xl md:text-2xl tracking-[0.2em] leading-tight">KANZA ROYAL</span>
                            </div>
                            <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-yellow-600 uppercase">Perfumery</span>
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end space-x-6 col-span-1">
                    {/* User */}
                    <div className="relative">
                        {session ? (
                            <div 
                                className="relative"
                                onMouseEnter={() => window.innerWidth >= 1024 && setIsOpenUser(true)}
                                onMouseLeave={() => window.innerWidth >= 1024 && setIsOpenUser(false)}
                            >
                                <button className="flex items-center space-x-2 hover:text-yellow-500 transition-colors">
                                    <Image
                                        src={avatar || "/placeholder.svg"}
                                        alt="User Avatar"
                                        className="h-6 w-6 rounded-full border border-neutral-700 object-cover"
                                        width={24}
                                        height={24}
                                    />
                                    <span className="hidden lg:block text-xs uppercase tracking-wider">{session.user.name || "Account"}</span>
                                </button>
                                
                                <AnimatePresence>
                                    {isOpenUser && (
                                        <motion.div
                                            className="absolute right-0 top-full mt-2 z-50 w-48 bg-neutral-900 border border-neutral-800 shadow-xl rounded-md overflow-hidden"
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                        >
                                            {session.user.role === "admin" && (
                                                <Link href="/admin" className="block px-4 py-3 text-sm hover:bg-neutral-800 hover:text-yellow-500 transition-colors">
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <button 
                                                onClick={handleSignOut}
                                                className="w-full text-left px-4 py-3 text-sm hover:bg-neutral-800 hover:text-yellow-500 transition-colors"
                                            >
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/account/logIn" className="flex items-center space-x-2 hover:text-yellow-500 transition-colors">
                                <UserRound className="h-5 w-5" />
                                <span className="hidden lg:block text-xs uppercase tracking-wider">Log In</span>
                            </Link>
                        )}
                    </div>

                    {/* Cart */}
                    <Link href="/cart" className="flex items-center space-x-2 hover:text-yellow-500 transition-colors gap-2">
                        <div className="relative">
                            <ShoppingBag className="h-6 w-6 text-yellow-600" />
                            <span className="absolute -top-2 -right-2 bg-yellow-600 text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        </div>
                        <div className="hidden lg:flex flex-col items-start leading-tight">
                            <span className="text-xs text-neutral-400 uppercase">Cart</span>
                            <span className="text-sm font-semibold tracking-wide">${cartTotal.toFixed(2)}</span>
                        </div>
                    </Link>
                </div>
            </div>
            </div>

            {/* Navigation Bar (Desktop) */}
            <div className="hidden lg:flex justify-center items-center py-3 bg-black border-b border-neutral-800">
                <nav className="flex items-center space-x-8 md:space-x-12">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href}
                            className={`text-[13px] font-medium tracking-widest uppercase transition-colors hover:text-yellow-500 ${link.name === 'HOME' ? 'text-yellow-500' : 'text-neutral-300'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpenMenu && (
                    <motion.div 
                        className="lg:hidden bg-neutral-900 border-t border-neutral-800 overflow-hidden"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                    >
                        <nav className="flex flex-col px-4 py-2">
                            {/* Mobile Search */}
                            <div className="flex items-center mb-4 mt-2 relative">
                                <Input
                                    type="text"
                                    className="w-full bg-black border-neutral-700 text-white pl-4 pr-10 py-2 focus-visible:ring-yellow-600"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") goToSearch();
                                    }}
                                />
                            </div>
                            
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    href={link.href}
                                    className="py-3 text-sm uppercase tracking-wider border-b border-neutral-800 text-neutral-300 hover:text-yellow-500"
                                    onClick={() => setIsOpenMenu(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
