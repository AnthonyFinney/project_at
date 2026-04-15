"use client";

import React, { useState, useEffect } from "react";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import { signOut, useSession } from "next-auth/react";
import { userAvatar } from "@/lib/utils";
import Image from "next/image";
import type { CartItemType } from "@/lib/schemas";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Framer Motion Variants
const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export default function Header() {
    const router = useRouter();

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenUser, setIsOpenUser] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const { data: session } = useSession();
    const seed = session?.user?.email || "guest";
    const avatar = userAvatar(seed);

    useEffect(() => {
        const updateCartCount = () => {
            try {
                const stored = localStorage.getItem("cart");
                if (!stored) return setCartItemCount(0);
                const cart = JSON.parse(stored) as CartItemType[];
                setCartItemCount(cart.reduce((sum, i) => sum + i.quantity, 0));
            } catch {
                setCartItemCount(0);
            }
        };
        updateCartCount();
        const onStorage = (e: StorageEvent) =>
            e.key === "cart" && updateCartCount();
        const onCartEvent = () => setTimeout(updateCartCount, 0);
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

    // Neumorphic Design Tokens
    const neumorphicExtruded =
        "shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]";
    const neumorphicExtrudedHover =
        "hover:shadow-[12px_12px_20px_rgb(163,177,198,0.7),-12px_-12px_20px_rgba(255,255,255,0.6)]";
    const neumorphicInset =
        "shadow-[inset_6px_6px_10px_rgb(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)]";
    const neumorphicActive =
        "active:translate-y-[0.5px] active:shadow-[inset_3px_3px_6px_rgb(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]";

    return (
        <motion.header
            className="sticky top-0 z-50 w-full shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] backdrop-blur-md border-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Menu Toggle */}
                <motion.div variants={fadeInUp} className="relative z-50">
                    <button
                        className={cn(
                            "flex items-center px-4 py-3 rounded-2xl transition-all duration-300 text-[#3D4852] font-medium",
                            isOpenMenu ? neumorphicInset : neumorphicExtruded,
                            neumorphicExtrudedHover,
                            neumorphicActive,
                        )}
                        onClick={() => setIsOpenMenu(!isOpenMenu)}
                        aria-label="Toggle menu"
                    >
                        {isOpenMenu ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                        <span className="ml-2 hidden sm:inline">Menu</span>
                    </button>

                    <AnimatePresence>
                        {isOpenMenu && (
                            <motion.div
                                className={cn(
                                    "absolute left-0 top-full mt-6 w-64 bg-[#E0E5EC] rounded-[32px] p-4 z-50",
                                    neumorphicExtruded,
                                )}
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <nav className="flex flex-col gap-2">
                                    {[
                                        { label: "Home", href: "/" },
                                        {
                                            label: "Browse Shop",
                                            href: "/products",
                                        },
                                        { label: "About Us", href: "/about" },
                                        { label: "Contact", href: "/contact" },
                                    ].map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpenMenu(false)}
                                            className="px-6 py-3 rounded-2xl text-[#3D4852] font-medium transition-all duration-300 hover:shadow-[inset_3px_3px_6px_rgb(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}

                                    {/* Mobile Search */}
                                    <div className="mt-4 flex flex-col gap-3 lg:hidden">
                                        <div
                                            className={cn(
                                                "flex items-center rounded-2xl bg-[#E0E5EC] px-4 py-2",
                                                neumorphicInset,
                                            )}
                                        >
                                            <Input
                                                type="text"
                                                className="bg-transparent border-none focus-visible:ring-0 text-[#3D4852] placeholder:text-[#A0AEC0]"
                                                placeholder="Search products..."
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value,
                                                    )
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    goToSearch()
                                                }
                                            />
                                            <button
                                                onClick={goToSearch}
                                                className="p-2 text-[#3D4852]"
                                            >
                                                <Search className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Logo */}
                <motion.div
                    variants={fadeInUp}
                    className="absolute left-1/2 -translate-x-1/2"
                >
                    <Link
                        href="/"
                        className="group block transition-transform duration-300 hover:scale-105"
                    >
                        <div
                            className={cn(
                                "p-2 rounded-full bg-[#E0E5EC] transition-all duration-300",
                                neumorphicExtruded,
                                "group-hover:shadow-[12px_12px_20px_rgb(163,177,198,0.7),-12px_-12px_20px_rgba(255,255,255,0.6)]",
                            )}
                        >
                            <Image
                                src="/Kanza Logo.svg"
                                alt="Kanza logo"
                                width={60}
                                height={60}
                                className="object-contain"
                            />
                        </div>
                    </Link>
                </motion.div>

                {/* Actions */}
                <motion.div
                    variants={fadeInUp}
                    className="flex items-center gap-4"
                >
                    {/* Desktop Search */}
                    <div className="hidden lg:flex items-center gap-3">
                        <div
                            className={cn(
                                "flex items-center rounded-2xl bg-[#E0E5EC] px-4 py-1 h-12 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#6C63FF] focus-within:ring-offset-2 focus-within:ring-offset-[#E0E5EC]",
                                neumorphicInset,
                            )}
                        >
                            <Input
                                type="text"
                                className="bg-transparent border-none focus-visible:ring-0 text-[#3D4852] placeholder:text-[#A0AEC0] w-32 focus:w-48 transition-all duration-300 font-body"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && goToSearch()
                                }
                            />
                            <Search className="h-4 w-4 text-[#6B7280]" />
                        </div>
                    </div>

                    {/* Cart */}
                    <Link href="/cart">
                        <div
                            className={cn(
                                "relative p-3 rounded-2xl transition-all duration-300 text-[#3D4852]",
                                neumorphicExtruded,
                                neumorphicExtrudedHover,
                                neumorphicActive,
                            )}
                        >
                            <ShoppingBag className="h-6 w-6" />
                            {cartItemCount > 0 && (
                                <span
                                    className={cn(
                                        "absolute -top-1 -right-1 bg-[#6C63FF] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center",
                                        "shadow-[2px_2px_4px_rgba(0,0,0,0.2)]",
                                    )}
                                >
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                    </Link>

                    {/* User Menu */}
                    {session ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsOpenUser(!isOpenUser)}
                                className={cn(
                                    "flex items-center p-1 rounded-full transition-all duration-300",
                                    isOpenUser
                                        ? neumorphicInset
                                        : neumorphicExtruded,
                                    neumorphicExtrudedHover,
                                )}
                            >
                                <Image
                                    src={avatar || "/placeholder.svg"}
                                    alt="User Avatar"
                                    className="h-10 w-10 rounded-full object-cover p-1"
                                    width={40}
                                    height={40}
                                />
                            </button>

                            <AnimatePresence>
                                {isOpenUser && (
                                    <motion.div
                                        className={cn(
                                            "absolute right-0 top-full mt-6 w-56 bg-[#E0E5EC] rounded-[32px] p-4 z-50",
                                            neumorphicExtruded,
                                        )}
                                        initial={{
                                            opacity: 0,
                                            y: -20,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: -20,
                                            scale: 0.95,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <div className="flex flex-col gap-2">
                                            {session.user.role === "admin" && (
                                                <Link
                                                    href="/admin"
                                                    onClick={() =>
                                                        setIsOpenUser(false)
                                                    }
                                                    className="px-6 py-3 rounded-2xl text-[#3D4852] font-medium transition-all duration-300 hover:shadow-[inset_3px_3px_6px_rgb(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]"
                                                >
                                                    Dashboard
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleSignOut}
                                                className="text-left px-6 py-3 rounded-2xl text-[#3D4852] font-medium transition-all duration-300 hover:shadow-[inset_3px_3px_6px_rgb(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link href="/account/logIn">
                            <div
                                className={cn(
                                    "flex items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-300 text-[#3D4852]",
                                    neumorphicExtruded,
                                    neumorphicExtrudedHover,
                                    neumorphicActive,
                                )}
                            >
                                <UserRound className="h-6 w-6" />
                                <span className="text-sm font-bold hidden md:inline">
                                    Sign In
                                </span>
                            </div>
                        </Link>
                    )}
                </motion.div>
            </div>
        </motion.header>
    );
}
