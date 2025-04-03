import type { Metadata } from "next";
import "../globals.css";
import Favicon from "../../../public/favicon.ico";

export const metadata: Metadata = {
    title: "Project AT",
    description: "Generated by create next app",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default function AccountLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="antialiased lg:w-full lg:px-32">
                <main className="min-h-screen">{children}</main>
            </body>
        </html>
    );
}
