import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AboutPage() {
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
                        About Us
                    </h1>
                    <p className="text-neutral-300 mt-4 max-w-2xl">
                        Discover the story behind The Kanza Royal Perfumery and
                        our passion for creating exceptional fragrances.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Our Story */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-light mb-6">Our Story</h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                Founded in 1995, The Kanza Royal Perfumery began
                                as a small family business with a simple
                                mission: to create exceptional fragrances that
                                capture the essence of luxury and tradition.
                                What started as a passion project in a small
                                workshop has grown into a renowned perfumery,
                                trusted by fragrance enthusiasts worldwide.
                            </p>
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                Our journey began when our founder, inspired by
                                the rich aromatic traditions of the Middle East
                                and Asia, decided to craft perfumes that would
                                tell stories through scent. Each fragrance in
                                our collection is carefully composed using the
                                finest natural ingredients, sourced from
                                sustainable suppliers across the globe.
                            </p>
                            <p className="text-neutral-600 leading-relaxed">
                                Today, we continue to honor our heritage while
                                embracing innovation, creating modern
                                interpretations of classic scents that resonate
                                with contemporary sensibilities.
                            </p>
                        </div>
                    </section>

                    {/* Our Values */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-light mb-8">Our Values</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-bold">
                                        Q
                                    </span>
                                </div>
                                <h3 className="text-xl font-medium mb-3">
                                    Quality
                                </h3>
                                <p className="text-neutral-600">
                                    We use only the finest natural ingredients,
                                    ensuring each fragrance meets our exacting
                                    standards of excellence.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-bold">
                                        S
                                    </span>
                                </div>
                                <h3 className="text-xl font-medium mb-3">
                                    Sustainability
                                </h3>
                                <p className="text-neutral-600">
                                    We're committed to ethical sourcing and
                                    sustainable practices that protect our
                                    environment and communities.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-bold">
                                        C
                                    </span>
                                </div>
                                <h3 className="text-xl font-medium mb-3">
                                    Craftsmanship
                                </h3>
                                <p className="text-neutral-600">
                                    Every fragrance is handcrafted with
                                    meticulous attention to detail, preserving
                                    traditional perfumery techniques.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Our Process */}
                    <section>
                        <h2 className="text-3xl font-light mb-6">
                            Our Process
                        </h2>
                        <div className="bg-neutral-50 p-8 rounded-lg">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-medium mb-4">
                                        Ingredient Selection
                                    </h3>
                                    <p className="text-neutral-600 mb-6">
                                        We carefully source premium ingredients
                                        from trusted suppliers worldwide,
                                        ensuring authenticity and quality in
                                        every bottle.
                                    </p>
                                    <h3 className="text-xl font-medium mb-4">
                                        Artisan Crafting
                                    </h3>
                                    <p className="text-neutral-600">
                                        Our master perfumers blend each
                                        fragrance by hand, using time-honored
                                        techniques passed down through
                                        generations.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium mb-4">
                                        Quality Testing
                                    </h3>
                                    <p className="text-neutral-600 mb-6">
                                        Every batch undergoes rigorous testing
                                        to ensure consistency, longevity, and
                                        the perfect balance of notes.
                                    </p>
                                    <h3 className="text-xl font-medium mb-4">
                                        Elegant Packaging
                                    </h3>
                                    <p className="text-neutral-600">
                                        Each fragrance is presented in carefully
                                        designed packaging that reflects the
                                        luxury and care that goes into every
                                        product.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
