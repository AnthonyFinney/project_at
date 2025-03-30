import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-accent bg-black text-white">
            <div className="container px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm mb-4 md:mb-0 lg:ml-24">
                        © 2025 All rights reserved.
                    </p>
                    <div className="flex space-x-4 lg:mr-16">
                        <Link
                            href="https://www.facebook.com/profile.php?id=61566971972126"
                            className="text-sm uppercase tracking-widest hover:underline"
                            target="blank"
                        >
                            Facebook
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
