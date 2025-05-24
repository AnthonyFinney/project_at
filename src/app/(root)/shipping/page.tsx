import Link from "next/link";
import { ChevronLeft, Truck, RotateCcw, Shield, Clock } from "lucide-react";

export default function ShippingPage() {
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
                        Shipping & Returns
                    </h1>
                    <p className="text-neutral-300 mt-4 max-w-2xl">
                        Everything you need to know about our shipping policies
                        and return process.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Shipping Information */}
                    <section className="mb-16">
                        <div className="flex items-center mb-6">
                            <Truck className="h-8 w-8 mr-3" />
                            <h2 className="text-3xl font-light">
                                Shipping Information
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-neutral-50 p-6 rounded-lg">
                                <h3 className="text-xl font-medium mb-4">
                                    Domestic Shipping (US)
                                </h3>
                                <ul className="space-y-3 text-neutral-600">
                                    <li>
                                        • Standard Shipping (5-7 business days):
                                        $10
                                    </li>
                                    <li>
                                        • Express Shipping (2-3 business days):
                                        $20
                                    </li>
                                    <li>
                                        • Overnight Shipping (1 business day):
                                        $35
                                    </li>
                                    <li>• Free shipping on orders over $100</li>
                                </ul>
                            </div>

                            <div className="bg-neutral-50 p-6 rounded-lg">
                                <h3 className="text-xl font-medium mb-4">
                                    International Shipping
                                </h3>
                                <ul className="space-y-3 text-neutral-600">
                                    <li>
                                        • Standard International (10-15 business
                                        days): $25
                                    </li>
                                    <li>
                                        • Express International (5-7 business
                                        days): $45
                                    </li>
                                    <li>• Duties and taxes may apply</li>
                                    <li>
                                        • Free international shipping on orders
                                        over $200
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg">
                            <div className="flex items-start space-x-3">
                                <Clock className="h-6 w-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-blue-900 mb-2">
                                        Processing Time
                                    </h3>
                                    <p className="text-blue-800">
                                        All orders are processed within 1-2
                                        business days. Orders placed after 2 PM
                                        EST will be processed the next business
                                        day.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Returns Policy */}
                    <section className="mb-16">
                        <div className="flex items-center mb-6">
                            <RotateCcw className="h-8 w-8 mr-3" />
                            <h2 className="text-3xl font-light">
                                Returns Policy
                            </h2>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <h3 className="text-xl font-medium mb-4">
                                30-Day Return Policy
                            </h3>
                            <p className="text-neutral-600 mb-6">
                                We want you to be completely satisfied with your
                                purchase. If you're not happy with your order,
                                you can return it within 30 days of delivery for
                                a full refund.
                            </p>

                            <h3 className="text-xl font-medium mb-4">
                                Return Conditions
                            </h3>
                            <ul className="space-y-2 text-neutral-600 mb-6">
                                <li>
                                    • Items must be unused and in original
                                    packaging
                                </li>
                                <li>
                                    • Fragrance bottles must be at least 90%
                                    full
                                </li>
                                <li>
                                    • Original receipt or order confirmation
                                    required
                                </li>
                                <li>
                                    • Custom or personalized items cannot be
                                    returned
                                </li>
                                <li>
                                    • Return shipping costs are the
                                    responsibility of the customer
                                </li>
                            </ul>

                            <h3 className="text-xl font-medium mb-4">
                                How to Return
                            </h3>
                            <ol className="space-y-2 text-neutral-600">
                                <li>
                                    1. Contact our customer service team at
                                    returns@kanzaroyalperfumery.com
                                </li>
                                <li>
                                    2. Receive your return authorization number
                                    and shipping label
                                </li>
                                <li>
                                    3. Package your items securely with the
                                    return form
                                </li>
                                <li>
                                    4. Ship using the provided label or your
                                    preferred carrier
                                </li>
                                <li>
                                    5. Refund will be processed within 5-7
                                    business days after we receive your return
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* Guarantee */}
                    <section>
                        <div className="flex items-center mb-6">
                            <Shield className="h-8 w-8 mr-3" />
                            <h2 className="text-3xl font-light">
                                Our Guarantee
                            </h2>
                        </div>

                        <div className="bg-neutral-50 p-8 rounded-lg">
                            <h3 className="text-xl font-medium mb-4">
                                Quality Assurance
                            </h3>
                            <p className="text-neutral-600 mb-6">
                                Every fragrance is carefully inspected before
                                shipping. If you receive a damaged or defective
                                product, we'll replace it free of charge or
                                provide a full refund.
                            </p>

                            <h3 className="text-xl font-medium mb-4">
                                Satisfaction Guarantee
                            </h3>
                            <p className="text-neutral-600">
                                If you're not completely satisfied with your
                                fragrance, our customer service team is here to
                                help. We stand behind the quality of our
                                products and your satisfaction is our priority.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
