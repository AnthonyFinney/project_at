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
        router.push(`/search?search=${encodeURIComponent(searchQuery)}`);
    };

    const handleSignOut = () => signOut();

    return (
        <motion.header
            className="border-b"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Menu */}
                <motion.div
                    className="relative"
                    variants={fadeInUp}
                    onMouseEnter={() =>
                        window.innerWidth >= 1024 && setIsOpenMenu(true)
                    }
                    onMouseLeave={() =>
                        window.innerWidth >= 1024 && setIsOpenMenu(false)
                    }
                >
                    <Button
                        variant="ghost"
                        className="inline-flex items-center"
                        onClick={() =>
                            window.innerWidth < 1024 &&
                            setIsOpenMenu((prev) => !prev)
                        }
                        aria-label="Toggle menu"
                    >
                        <Menu className="h-6 w-6" />
                        <span className="ml-2">Menu</span>
                        <ChevronDown
                            className="ml-2 h-4 w-4 transition-transform"
                            aria-hidden
                        />
                    </Button>

                    <AnimatePresence>
                        {isOpenMenu && (
                            <motion.div
                                className="absolute left-0 top-full z-20 w-56 bg-white py-2 shadow-md space-y-1"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="/"
                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/products"
                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    Browse Shop
                                </Link>
                                <div className="flex items-center space-x-2 px-2 lg:hidden">
                                    <Input
                                        type="text"
                                        className="px-3 py-2 w-80"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") goToSearch();
                                        }}
                                    />
                                    <Button
                                        className="px-3 py-2"
                                        size="sm"
                                        onClick={goToSearch}
                                    >
                                        <Search className="h-5 w-5" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Logo */}
                <motion.div variants={fadeInUp}>
                    <Link href="/">
                        <Image
                            src="Kanza Logo.svg"
                            alt="Kanza logo"
                            width={80}
                            height={80}
                            className="object-contain lg:ml-72"
                        />
                    </Link>
                </motion.div>

                {/* Actions */}
                <motion.div
                    variants={fadeInUp}
                    className="flex items-center gap-4"
                >
                    {/* Search (desktop) */}
                    <div className="hidden lg:flex items-center space-x-2">
                        <Input
                            type="text"
                            className="px-3 py-2 w-40"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") goToSearch();
                            }}
                        />
                        <Button
                            variant="ghost"
                            aria-label="Search"
                            onClick={goToSearch}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Cart */}
                    <div className="relative">
                        <Link href="/cart">
                            <Button variant="ghost" aria-label="Cart">
                                <ShoppingBag className="h-5 w-5" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </div>

                    {/* User Menu */}
                    {session ? (
                        <motion.div
                            className="relative"
                            variants={fadeInUp}
                            onMouseEnter={() =>
                                window.innerWidth >= 1024 && setIsOpenUser(true)
                            }
                            onMouseLeave={() =>
                                window.innerWidth >= 1024 &&
                                setIsOpenUser(false)
                            }
                        >
                            <Button
                                variant="ghost"
                                className="inline-flex items-center"
                                onClick={() =>
                                    window.innerWidth < 1024 &&
                                    setIsOpenUser((prev) => !prev)
                                }
                                aria-label="Toggle user menu"
                            >
                                <Image
                                    src={avatar || "/placeholder.svg"}
                                    alt="User Avatar"
                                    className="h-6 w-6 rounded-full border border-gray-300 object-cover"
                                    width={24}
                                    height={24}
                                />
                            </Button>

                            <AnimatePresence>
                                {isOpenUser && (
                                    <motion.div
                                        className="absolute right-0 top-full z-20 w-56 bg-white py-2 shadow-md space-y-1"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {session.user.role === "admin" ? (
                                            <Link href="/admin">
                                                <Button
                                                    variant="ghost"
                                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    Admin
                                                </Button>
                                            </Link>
                                        ) : (
                                            <></>
                                        )}

                                        <Button
                                            variant="ghost"
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                            onClick={handleSignOut}
                                        >
                                            Sign Out
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div variants={fadeInUp}>
                            <Link href="/account/logIn">
                                <Button variant="ghost" aria-label="Log In">
                                    <div className="flex items-center space-x-1">
                                        <UserRound className="h-5 w-5" />
                                        <span className="text-sm hidden sm:inline">
                                            Sign In
                                        </span>
                                    </div>
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.header>
    );
}
