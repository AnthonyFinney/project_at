import type { Metadata } from "next";
import "../globals.css";
import Favicon from "../../../public/favicon.ico";
import { AuthProvider } from "@/Providers/Providers";

export const metadata: Metadata = {
    title: "Account",
    description: "Account",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default function AccountLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="antialiased lg:w-full lg:px-32">
                <AuthProvider>
                    <main className="min-h-screen">{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
