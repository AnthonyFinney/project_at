"use client";

import {
    X,
    Menu,
    Search,
    ShoppingBag,
    ChevronDown,
    ChevronDownIcon,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { Button } from "./ui/button";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

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
                                href="#"
                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Option 1
                            </Link>
                            <Link
                                href="#"
                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Option 2
                            </Link>
                            <Link
                                href="#"
                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Option 3
                            </Link>
                        </div>
                    )}
                </div>

                <Link href="/" className="font-bold text-xl">
                    Project At
                </Link>

                {/* <div className="hidden md:flex">
                    <MainNav isOpen={menuOpen} toggleMenu={toggleMenu} />
                </div>

                <button
                    className="mr-2 md:hidden p-2"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button> */}

                <div className="flex items-center gap-4">
                    <button aria-label="Search">
                        <Search className="h-5 w-5" />
                    </button>
                    <button aria-label="Cart">
                        <ShoppingBag className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden px-4 py-2 border-t">
                    <MainNav isOpen={menuOpen} toggleMenu={toggleMenu} />
                </div>
            )}
        </header>
    );
}
