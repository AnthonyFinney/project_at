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

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-neutral-800 bg-black text-white">
            {/* Main Footer Content */}
            <div className="container px-4 py-12 mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="space-y-4">
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
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium tracking-widest uppercase">
                            Shop
                        </h3>
                        <ul className="space-y-2 text-sm text-neutral-400">
                            <li>
                                <Link
                                    href="/collections/attar"
                                    className="hover:text-white transition-colors"
                                >
                                    Attar Collection
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collections/perfume"
                                    className="hover:text-white transition-colors"
                                >
                                    Perfume Oils
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collections/gift-sets"
                                    className="hover:text-white transition-colors"
                                >
                                    Gift Sets
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collections/new-arrivals"
                                    className="hover:text-white transition-colors"
                                >
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collections/bestsellers"
                                    className="hover:text-white transition-colors"
                                >
                                    Bestsellers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium tracking-widest uppercase">
                            Information
                        </h3>
                        <ul className="space-y-2 text-sm text-neutral-400">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-white transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-white transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shipping"
                                    className="hover:text-white transition-colors"
                                >
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="hover:text-white transition-colors"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
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
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mt-12 pt-8 border-t border-neutral-800">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="py-6 border-t border-neutral-900 bg-black">
                <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-neutral-500 mb-4 md:mb-0">
                        © {currentYear} The Kanza Royal Perfumery. All rights
                        reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link
                            href="/sitemap"
                            className="text-xs text-neutral-500 hover:text-white transition-colors"
                        >
                            Sitemap
                        </Link>
                        <Link
                            href="/accessibility"
                            className="text-xs text-neutral-500 hover:text-white transition-colors"
                        >
                            Accessibility
                        </Link>
                        <Link
                            href="/cookies"
                            className="text-xs text-neutral-500 hover:text-white transition-colors"
                        >
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
