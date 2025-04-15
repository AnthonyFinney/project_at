"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Package, ShoppingBag, LogOut, Users } from "lucide-react";

export function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    const navItems = [
        {
            title: "Dashboard",
            href: "/admin",
            icon: BarChart3,
        },
        {
            title: "Products",
            href: "/admin/products",
            icon: Package,
        },
        {
            title: "Orders",
            href: "/admin/orders",
            icon: ShoppingBag,
        },
        {
            title: "Users",
            href: "/admin/users",
            icon: Users,
        },
    ];

    return (
        <div className="w-64 bg-black text-white h-screen flex-shrink-0 hidden md:block sticky top-0">
            <div className="p-6">
                <Link href="/admin" className="flex items-center gap-2 mb-8">
                    <span className="font-bold text-xl">KANZA ADMIN</span>
                </Link>

                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                ${
                    isActive(item.href)
                        ? "bg-white/10 text-white"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                }
              `}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="fixed bottom-8 left-0 w-64 px-6">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-neutral-400 hover:text-white hover:bg-white/5"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Exit to Store</span>
                </Link>
            </div>
        </div>
    );
}
