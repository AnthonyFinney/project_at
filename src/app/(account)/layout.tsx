import type { Metadata } from "next";
import { AuthProvider } from "@/Providers/Providers";

export const metadata: Metadata = {
    title: "Account",
    description: "Account",
    icons: [{ rel: "icon", url: "/favicon2.ico" }],
};

export default function AccountLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <AuthProvider>
            <main className="min-h-screen">{children}</main>
        </AuthProvider>
    );
}
