import type { Metadata } from "next";
import "../globals.css";
import Favicon from "../../../public/favicon.ico";
import { AuthProvider } from "@/app/Providers/Providers";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { MobileNav } from "@/components/admin/mobile-nav";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Admin Dashboard",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default function AccountLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <AuthProvider>
                    <div className="flex min-h-screen bg-neutral-50">
                        <AdminSidebar />
                        <div className="flex-1 overflow-auto">
                            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-black px-6 md:hidden">
                                <MobileNav />
                                <div className="ml-auto"></div>
                            </header>
                            <div className="p-4 md:p-8">{children}</div>
                        </div>
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
