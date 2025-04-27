import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/Providers/Providers";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="lg:w-full lg:px-32">
            <AuthProvider>
                <Header />

                <main className="min-h-screen">{children}</main>
            </AuthProvider>
            <Footer />
        </div>
    );
}
