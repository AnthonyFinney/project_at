"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCarousel from "@/components/product-carousel";
import Banner from "@/components/banner";
import Spinner from "@/components/spinner";
import BentoGallery from "@/components/bento-gallery";
import Testimonials from "@/components/testimonials";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
    const { products, error, isLoading } = useProducts();

    if (error) {
        return (
            <div className="p-4 text-center text-red-500">
                {error.message || "An error occurred."}
            </div>
        );
    }

    if (isLoading) {
        return <Spinner />;
    }

    // Split products or use the same for the two sections in this demo
    const bestSelling = products.filter((p) => p.isFeatured).slice(0, 8);
    const almasDospor = [...products]
        .sort(
            (a, b) =>
                new Date(b.createdAt ?? b.updatedAt ?? 0).getTime() -
                new Date(a.createdAt ?? b.updatedAt ?? 0).getTime()
        )
        .slice(0, 8);

    return (
        <div className="bg-white text-black">
            {/* Primary Hero Banner */}
            <section className="relative w-full h-[500px] md:h-[700px] overflow-hidden flex items-center justify-center">
                <Image
                    src="/images/Exquisite Perfume Collection.png"
                    alt="Kholzi's Treasure Fragrance background"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/60" />
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.2 }
                        }
                    }}
                    className="relative z-10 flex flex-col items-center justify-center p-4"
                >
                    <motion.div 
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-yellow-500 font-serif text-5xl md:text-7xl tracking-widest uppercase font-bold flex flex-col items-center drop-shadow-lg"
                    >
                        <span className="mb-2">KHOLZI'S</span>
                        <span className="text-sm md:text-xl tracking-[0.4em] font-sans font-medium text-white mb-6">TREASURE</span>
                    </motion.div>
                    <motion.div 
                        variants={{
                            hidden: { opacity: 0, scale: 0 },
                            visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
                        }}
                        className="w-16 md:w-24 h-0.5 bg-yellow-500 mb-6 shadow-sm"
                    ></motion.div>
                    <motion.p 
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className="text-white text-xl md:text-2xl font-light tracking-wide uppercase italic mb-8"
                    >
                        A world of Fragrance
                    </motion.p>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                    >
                        <Link href="/products">
                            <Button className="bg-black text-white hover:bg-neutral-800 rounded-none px-10 py-5 uppercase tracking-wider text-sm font-semibold">
                                SHOP NOW
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Discover Timeless Elegance */}
            <section className="py-20 bg-white">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-4 max-w-4xl text-center"
                >
                    <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-widest uppercase mb-6">
                        DISCOVER TIMELESS ELEGANCE WITH KHOLZI'S TREASURE
                    </h2>
                    <p className="text-neutral-600 leading-relaxed mb-10 max-w-3xl mx-auto text-sm md:text-base">
                        Our exclusive fragrance collection is an exploration of timeless luxury. Discover a world of unparalleled perfumery and immerse yourself in the finest scents crafted precisely for the most refined senses. Experience elegance in every drop.
                    </p>
                    <Link href="/products">
                        <Button className="bg-black text-white hover:bg-neutral-800 rounded-none px-12 py-6 uppercase tracking-wider text-sm font-semibold">
                            VIEW MORE
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Secondary Banner */}
            <section className="relative w-full h-[600px] overflow-hidden flex items-center justify-center">
                <video
                    src="/videos/mp_.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 flex flex-col items-center justify-center p-4 text-center max-w-3xl"
                >
                    <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-widest uppercase mb-4 leading-tight">
                        TIMELESS SCENTS,<br />
                        MAKE TREASURES
                    </h2>
                    <p className="text-neutral-200 text-sm md:text-base font-medium tracking-widest uppercase mb-8">
                        KHOLZI'S TREASURE FOR THE<br />
                        DISCERNING CONNOISSEUR
                    </p>
                    <Link href="/contact">
                        <Button className="bg-black text-white hover:bg-neutral-800 rounded-none px-10 py-6 uppercase tracking-wider text-sm font-semibold transition-all">
                            REACH OUT
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Our Best Selling Products */}
            <section className="py-16 pt-24 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center justify-center mb-10 text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-serif tracking-widest font-bold uppercase mb-2">
                            OUR BEST SELLING PRODUCTS
                        </h2>
                        <Link href="/products" className="text-sm font-semibold text-neutral-500 hover:text-yellow-600 underline uppercase tracking-wider">
                            View All
                        </Link>
                    </motion.div>
                    <ProductCarousel headline="" products={bestSelling} />
                </div>
            </section>

            {/* Shop Almas Dospor */}
            <section className="py-16 bg-neutral-50 border-t border-neutral-100">
                <div className="container mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center justify-center mb-10 text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-serif tracking-widest font-bold uppercase mb-2">
                            SHOP ALMAS DOSPOR
                        </h2>
                        <Link href="/collections/almas-dospor" className="text-sm font-semibold text-neutral-500 hover:text-yellow-600 underline uppercase tracking-wider">
                            View All
                        </Link>
                    </motion.div>
                    <ProductCarousel headline="" products={almasDospor} />
                </div>
            </section>

            {/* Our Product Collection Bento Grid */}
            <BentoGallery />

            {/* Reviews Section */}
            <Testimonials />

            {/* Top Brands */}
            <section className="py-16 bg-white border-y border-neutral-200 text-center">
                <div className="container mx-auto px-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="text-xl font-serif font-bold tracking-widest uppercase mb-10"
                    >
                        TOP BRANDS
                    </motion.h2>
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="flex flex-wrap justify-center items-center gap-6 md:gap-12 lg:gap-16"
                    >
                        {[
                            '/images/brand1.png',
                            '/images/brand2.jpg',
                            '/images/brand3.png',
                            '/images/brand4.jpg',
                            '/images/brand5.jpg'
                        ].map((src, index) => (
                            <motion.div 
                                key={index} 
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                                }}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-yellow-500/20 shadow-sm flex items-center justify-center overflow-hidden bg-white"
                            >
                                <Image 
                                    src={src}
                                    alt={`Brand ${index + 1}`}
                                    width={120}
                                    height={120}
                                    className="object-cover opacity-80 mix-blend-multiply"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SEO Description Block */}
            <section className="py-16 bg-neutral-50 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-4 max-w-4xl"
                >
                    <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-6">
                        BEST PERFUME SHOP IN DHAKA
                    </h2>
                    <p className="text-neutral-600 leading-relaxed text-sm md:text-base mb-8">
                        Experience the ultimate destination for luxury fragrances. We bring you handpicked collections from world-renowned perfumers. 
                        Our curated selections ensure that you find the perfect scent for every moment, making Kholzi's Treasure the most trusted perfume boutique.
                    </p>
                    <Link href="/about">
                        <Button className="bg-black text-white hover:bg-neutral-800 rounded-none px-10 py-5 uppercase tracking-wider text-sm font-semibold">
                            KNOW MORE
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Map Location */}
            <section className="w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-10 bg-white"
                >
                    <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-2">
                        OUR STORE LOCATION
                    </h2>
                    <p className="text-neutral-500 text-sm tracking-wide">
                        153, ALAMGIR & KAMARUZZAMAN TOWER, RUPSHA BUS STAND
                    </p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-[400px] relative bg-neutral-200"
                >
                    {/* Placeholder map image */}
                    <Image
                        src="/images/map.avif"
                        alt="Store Map Location"
                        fill
                        className="object-cover opacity-80 mix-blend-multiply"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white p-4 rounded shadow-lg flex items-center space-x-3 pointer-events-auto"
                        >
                            <Image 
                                src="https://images.unsplash.com/photo-1594913366159-1832035d105e?q=80&w=50&h=50&auto=format&fit=crop" 
                                alt="Store thumb" 
                                width={40} height={40} 
                                className="rounded"
                            />
                            <div>
                                <h4 className="font-bold text-sm">Kholzi's Treasure</h4>
                                <a href="https://maps.google.com" target="_blank" className="text-blue-600 text-xs hover:underline mt-1 block">View larger map</a>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
