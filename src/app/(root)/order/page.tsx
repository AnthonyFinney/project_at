import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { GuestCheckoutForm } from "@/components/order/guest-checkout-form";

export default function Page() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 min-h-screen">
            <Link
                href="/"
                className="inline-flex items-center text-sm mb-6 hover:underline"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Home
            </Link>

            <GuestCheckoutForm />
        </div>
    );
}
