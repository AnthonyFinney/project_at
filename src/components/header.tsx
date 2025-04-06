"use client";

import {
    Menu,
    Search,
    ShoppingBag,
    ChevronDownIcon,
    UserRound,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const { data: session } = useSession();

    const handleSignOut = () => {
        signOut();
    };

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div
                    className="relative"
                    onMouseEnter={() =>
                        window.innerWidth >= 1024 && setIsOpen(true)
                    }
                    onMouseLeave={() =>
                        window.innerWidth >= 1024 && setIsOpen(false)
                    }
                >
                    <Button
                        variant="ghost"
                        className="inline-flex items-center"
                        onClick={() =>
                            window.innerWidth < 1024 && setIsOpen(!isOpen)
                        }
                    >
                        <Menu className="h-6 w-6" />
                        <span>Menu</span>
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                    {isOpen && (
                        <div className="absolute left-0 top-full z-20 w-56 space-y-1 bg-white py-2 shadow-md">
                            <Link
                                href="/"
                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Home
                            </Link>
                            <Link
                                href="#"
                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Perfume Oil
                            </Link>
                            <Link
                                href="#"
                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Brand
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
                                />
                                <Button className="px-3 py-2" size={"sm"}>
                                    <Search />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <Link href="/" className="font-bold text-xl lg:ml-52">
                    KANZA
                </Link>

                <div className="flex items-center gap-1">
                    <div className="lg:flex items-center space-x-2 px-2 hidden">
                        <Input
                            type="text"
                            className="px-3 py-2 w-40"
                            placeholder="Search..."
                        />
                        <Button
                            variant="ghost"
                            className="inline-flex items-center"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        className="inline-flex items-center"
                        aria-label="Cart"
                    >
                        <Link href="/cart">
                            <ShoppingBag className="h-5 w-5" />
                        </Link>
                    </Button>

                    {session ? (
                        <Button
                            variant="ghost"
                            className="inline-flex items-center"
                            aria-label="Account"
                            onClick={handleSignOut}
                        >
                            <div className="flex items-center space-x-1">
                                <UserRound className="h-5 w-5" />
                                <span className="text-sm hidden sm:inline">
                                    {session.user?.name || "Account"}
                                </span>
                            </div>
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            className="inline-flex items-center"
                            aria-label="Account"
                        >
                            <Link href="/account">
                                <div className="flex items-center space-x-1">
                                    <UserRound className="h-5 w-5" />
                                    <span className="text-sm hidden sm:inline">
                                        Sign In
                                    </span>
                                </div>
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
