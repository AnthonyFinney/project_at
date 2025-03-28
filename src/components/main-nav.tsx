"use client";

import Link from "next/link";
import { SignInWithGoogle } from "@/app/actions/auth";

interface MainNavProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

export function MainNav({ isOpen, toggleMenu }: MainNavProps) {
    return (
        <nav
            className={`flex ${
                isOpen ? "flex-col" : "hidden"
            } md:flex md:flex-row items-center gap-6`}
        >
            <Link
                href="/"
                className="text-sm font-medium hover:text-neutral-600 transition-colors"
            >
                Home
            </Link>
            <Link
                href="/products"
                className="text-sm font-medium hover:text-neutral-600 transition-colors"
            >
                Browse
            </Link>
            <form action={SignInWithGoogle}>
                <button className="text-sm font-medium hover:text-neutral-600 transition-colors">
                    Sign In With Google
                </button>
            </form>
        </nav>
    );
}
