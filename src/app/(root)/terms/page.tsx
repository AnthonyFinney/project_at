import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-black text-white py-16">
                <div className="container mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm mb-6 hover:underline"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-light">
                        Terms & Conditions
                    </h1>
                    <p className="text-neutral-300 mt-4 max-w-2xl">
                        Please read these terms and conditions carefully before
                        using our services.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto prose prose-lg">
                    <p className="text-neutral-600 text-lg mb-8">
                        <strong>Last updated:</strong> January 1, 2024
                    </p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Acceptance of Terms
                        </h2>
                        <p className="text-neutral-600">
                            By accessing and using The Kanza Royal Perfumery
                            website and services, you accept and agree to be
                            bound by the terms and provision of this agreement.
                            If you do not agree to abide by the above, please do
                            not use this service.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Use License
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            Permission is granted to temporarily download one
                            copy of the materials on The Kanza Royal Perfumery's
                            website for personal, non-commercial transitory
                            viewing only. This is the grant of a license, not a
                            transfer of title, and under this license you may
                            not:
                        </p>
                        <ul className="text-neutral-600 space-y-2">
                            <li>• Modify or copy the materials</li>
                            <li>
                                • Use the materials for any commercial purpose
                                or for any public display
                            </li>
                            <li>
                                • Attempt to reverse engineer any software
                                contained on the website
                            </li>
                            <li>
                                • Remove any copyright or other proprietary
                                notations from the materials
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Product Information
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            We strive to provide accurate product information,
                            including descriptions, prices, and availability.
                            However:
                        </p>
                        <ul className="text-neutral-600 space-y-2">
                            <li>
                                • Product colors may vary due to monitor
                                settings
                            </li>
                            <li>
                                • Fragrance descriptions are subjective and may
                                vary by individual
                            </li>
                            <li>
                                • Prices are subject to change without notice
                            </li>
                            <li>
                                • We reserve the right to limit quantities or
                                discontinue products
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Orders and Payment
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            By placing an order, you agree to provide accurate
                            and complete information. We reserve the right to:
                        </p>
                        <ul className="text-neutral-600 space-y-2">
                            <li>• Refuse or cancel any order for any reason</li>
                            <li>
                                • Require additional verification before
                                processing orders
                            </li>
                            <li>• Limit order quantities</li>
                            <li>• Charge applicable taxes and shipping fees</li>
                        </ul>
                        <p className="text-neutral-600 mt-4">
                            Payment must be received before order processing. We
                            accept major credit cards and other payment methods
                            as displayed during checkout.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Shipping and Delivery
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            Shipping times are estimates and not guaranteed. We
                            are not responsible for delays caused by:
                        </p>
                        <ul className="text-neutral-600 space-y-2">
                            <li>• Weather conditions or natural disasters</li>
                            <li>• Carrier delays or issues</li>
                            <li>• Customs delays for international orders</li>
                            <li>
                                • Incorrect shipping information provided by
                                customer
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Returns and Refunds
                        </h2>
                        <p className="text-neutral-600">
                            Returns are subject to our return policy as outlined
                            on our Shipping & Returns page. Refunds will be
                            processed to the original payment method within 5-7
                            business days after we receive and process your
                            return.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            User Accounts
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            When creating an account, you agree to:
                        </p>
                        <ul className="text-neutral-600 space-y-2">
                            <li>• Provide accurate and current information</li>
                            <li>• Maintain the security of your password</li>
                            <li>
                                • Accept responsibility for all activities under
                                your account
                            </li>
                            <li>
                                • Notify us immediately of any unauthorized use
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Prohibited Uses
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            You may not use our service:
                        </p>
                        <ul className="text-neutral-600 space-y-2">
                            <li>
                                • For any unlawful purpose or to solicit others
                                to perform unlawful acts
                            </li>
                            <li>
                                • To violate any international, federal,
                                provincial, or state regulations, rules, laws,
                                or local ordinances
                            </li>
                            <li>
                                • To infringe upon or violate our intellectual
                                property rights or the intellectual property
                                rights of others
                            </li>
                            <li>
                                • To harass, abuse, insult, harm, defame,
                                slander, disparage, intimidate, or discriminate
                            </li>
                            <li>• To submit false or misleading information</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Disclaimer
                        </h2>
                        <p className="text-neutral-600">
                            The materials on The Kanza Royal Perfumery's website
                            are provided on an 'as is' basis. The Kanza Royal
                            Perfumery makes no warranties, expressed or implied,
                            and hereby disclaims and negates all other
                            warranties including without limitation, implied
                            warranties or conditions of merchantability, fitness
                            for a particular purpose, or non-infringement of
                            intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Limitations
                        </h2>
                        <p className="text-neutral-600">
                            In no event shall The Kanza Royal Perfumery or its
                            suppliers be liable for any damages (including,
                            without limitation, damages for loss of data or
                            profit, or due to business interruption) arising out
                            of the use or inability to use the materials on The
                            Kanza Royal Perfumery's website, even if The Kanza
                            Royal Perfumery or its authorized representative has
                            been notified orally or in writing of the
                            possibility of such damage.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Governing Law
                        </h2>
                        <p className="text-neutral-600">
                            These terms and conditions are governed by and
                            construed in accordance with the laws of Florida,
                            United States, and you irrevocably submit to the
                            exclusive jurisdiction of the courts in that state
                            or location.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-medium mb-4">
                            Contact Information
                        </h2>
                        <p className="text-neutral-600">
                            If you have any questions about these Terms &
                            Conditions, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
                            <p className="text-neutral-600">
                                Email: legal@kanzaroyalperfumery.com
                                <br />
                                Phone: +1 (555) 123-4567
                                <br />
                                Address: 123 Luxury Lane, Fragrance District, FL
                                12345
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
