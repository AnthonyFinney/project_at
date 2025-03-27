import Link from "next/link";
import { signIn } from "../../auth";

export function MainNav() {
    return (
        <nav className="hidden md:flex items-center gap-6">
            <Link
                href="/"
                className="text-sm font-medium hover:text-neutral-600 transition-colors"
            >
                Home
            </Link>
            <Link
                href="/products"
                className="text-sm font-medium hover:text-neutral-600 transition-colors"
            >
                Browse
            </Link>
            <form
                action={async () => {
                    "use server";
                    await signIn("google");
                }}
            >
                <button className="text-sm font-medium hover:text-neutral-600 transition-colors">
                    Sign In With Google
                </button>
            </form>
        </nav>
    );
}
