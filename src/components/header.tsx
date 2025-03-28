"use client";

import { X, Menu, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { MainNav } from "./main-nav";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl">
                    Project At
                </Link>

                <div className="hidden md:flex">
                    <MainNav isOpen={menuOpen} toggleMenu={toggleMenu} />
                </div>

                <button
                    className="ml-auto mr-2 md:hidden p-2"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>

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
