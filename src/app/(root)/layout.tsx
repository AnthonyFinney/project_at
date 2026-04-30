import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/Providers/Providers";
import { StickyCart } from "@/components/sticky-cart";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="lg:w-full">
            <AuthProvider>
                <Header />
                <StickyCart />
                <main className="min-h-screen">{children}</main>
            </AuthProvider>
            <Footer />
        </div>
    );
}
