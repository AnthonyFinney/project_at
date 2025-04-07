"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BarChart3, Package, ShoppingBag, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetHeader,
} from "@/components/ui/sheet";

export function MobileNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

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
    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6 text-white" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-black text-white w-64">
                <div className="p-6">
                    <SheetHeader>
                        <SheetTitle>
                            <div className="flex items-center justify-between mb-8">
                                <Link
                                    href="/admin"
                                    className="font-bold text-xl text-white"
                                    onClick={() => setOpen(false)}
                                >
                                    KANZA ADMIN
                                </Link>
                            </div>
                        </SheetTitle>
                    </SheetHeader>

                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
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

                    <div className="absolute bottom-8 left-0 w-64 px-6">
                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-neutral-400 hover:text-white hover:bg-white/5"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Exit to Store</span>
                        </Link>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
