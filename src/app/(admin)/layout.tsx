import type { Metadata } from "next";
import "../globals.css";
import Favicon from "../../../public/favicon.ico";
import { AuthProvider } from "@/Providers/Providers";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { MobileNav } from "@/components/admin/mobile-nav";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Admin Dashboard",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default async function AccountLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    return (
        <AuthProvider>
            <div className="flex min-h-screen bg-neutral-50">
                <AdminSidebar />
                <div className="flex-1 overflow-auto">
                    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-black px-6 md:hidden">
                        <MobileNav />
                        <div className="ml-auto"></div>
                    </header>
                    <div className="p-4 md:p-8">{children}</div>
                    <Toaster />
                </div>
            </div>
        </AuthProvider>
    );
}
