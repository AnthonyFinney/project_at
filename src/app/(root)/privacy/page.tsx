import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPage() {
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
                        Privacy Policy
                    </h1>
                    <p className="text-neutral-300 mt-4 max-w-2xl">
                        Your privacy is important to us. Learn how we collect,
                        use, and protect your information.
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
                            Information We Collect
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            We collect information you provide directly to us,
                            such as when you create an account, make a purchase,
                            subscribe to our newsletter, or contact us for
                            support.
                        </p>
                        <h3 className="text-xl font-medium mb-3">
                            Personal Information
                        </h3>
                        <ul className="text-neutral-600 space-y-2">
                            <li>
                                • Name and contact information (email, phone,
                                address)
                            </li>
                            <li>
                                • Payment information (credit card details,
                                billing address)
                            </li>
                            <li>• Account credentials (username, password)</li>
                            <li>• Purchase history and preferences</li>
                            <li>• Communication preferences</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            How We Use Your Information
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="text-neutral-600 space-y-2">
                            <li>• Process and fulfill your orders</li>
                            <li>• Provide customer service and support</li>
                            <li>
                                • Send you updates about your orders and account
                            </li>
                            <li>• Personalize your shopping experience</li>
                            <li>
                                • Send marketing communications (with your
                                consent)
                            </li>
                            <li>• Improve our products and services</li>
                            <li>• Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Information Sharing
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            We do not sell, trade, or otherwise transfer your
                            personal information to third parties except in the
                            following circumstances:
                        </p>
                        <ul className="text-neutral-600 space-y-2">
                            <li>
                                • With service providers who assist us in
                                operating our business
                            </li>
                            <li>
                                • When required by law or to protect our rights
                            </li>
                            <li>
                                • In connection with a business transfer or
                                merger
                            </li>
                            <li>• With your explicit consent</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Data Security
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            We implement appropriate security measures to
                            protect your personal information against
                            unauthorized access, alteration, disclosure, or
                            destruction. These measures include:
                        </p>
                        <ul className="text-neutral-600 space-y-2">
                            <li>• SSL encryption for data transmission</li>
                            <li>• Secure servers and databases</li>
                            <li>• Regular security audits and updates</li>
                            <li>• Limited access to personal information</li>
                            <li>• Employee training on data protection</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Cookies and Tracking
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            We use cookies and similar technologies to enhance
                            your browsing experience, analyze site traffic, and
                            personalize content. You can control cookie settings
                            through your browser preferences.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Your Rights
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            You have the right to:
                        </p>
                        <ul className="text-neutral-600 space-y-2">
                            <li>
                                • Access and update your personal information
                            </li>
                            <li>• Request deletion of your data</li>
                            <li>• Opt-out of marketing communications</li>
                            <li>• Request data portability</li>
                            <li>
                                • Lodge a complaint with supervisory authorities
                            </li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Children's Privacy
                        </h2>
                        <p className="text-neutral-600">
                            Our services are not intended for children under 13
                            years of age. We do not knowingly collect personal
                            information from children under 13. If we become
                            aware that we have collected such information, we
                            will take steps to delete it promptly.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-medium mb-4">
                            Changes to This Policy
                        </h2>
                        <p className="text-neutral-600">
                            We may update this privacy policy from time to time.
                            We will notify you of any changes by posting the new
                            policy on this page and updating the "Last updated"
                            date. We encourage you to review this policy
                            periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-medium mb-4">
                            Contact Us
                        </h2>
                        <p className="text-neutral-600">
                            If you have any questions about this privacy policy
                            or our data practices, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
                            <p className="text-neutral-600">
                                Email: privacy@kanzaroyalperfumery.com
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
