import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Favicon from "../../../public/favicon.ico";
import { AuthProvider } from "@/Providers/Providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Project AT",
    description: "Project AT",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased lg:w-full lg:px-32`}
            >
                <AuthProvider>
                    <Header />

                    <main className="min-h-screen">{children}</main>
                </AuthProvider>
                <Footer />
            </body>
        </html>
    );
}
