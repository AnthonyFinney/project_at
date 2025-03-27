import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { MainNav } from "@/components/main-nav";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
    return (
        <main className="min-h-screen">
            <section className="relative w-full h-[550px] bg-neutral-200">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://placehold.co/500x1200/000000/FFFFFF/png')",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
                    <div className="max-w-md text-white">
                        <h1 className="text-5xl font-light mb-2">
                            TRENDING <span className="italic">Styles</span>
                        </h1>
                        <h2 className="text-2xl font-medium mb-4">
                            OUR MOST POPULAR
                            <br />
                            SILHOUETTES
                        </h2>
                        <p className="mb-6 text-sm">
                            The most versatile silhouettes of the moment,
                            discover best-selling Air Jordan, ASICS and adidas
                            in shades to suit every season.
                        </p>
                        <Button
                            variant="default"
                            className="bg-black hover:bg-black/80 rounded-none px-8"
                        >
                            SHOP NOW
                        </Button>
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white">
                    <span className="text-sm">01/03</span>
                    <div className="flex gap-2">
                        <button className="p-1 border border-white/50 rounded-full">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="p-1 border border-white/50 rounded-full">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-neutral-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-xl font-medium mb-8 text-center">
                        TRENDING NOW
                    </h2>

                    <Carousel>
                        <CarouselContent>
                            {[...Array(10)].map((_, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-1/2 sm:basis-1/3 lg:basis-1/5"
                                >
                                    <ProductCard
                                        image="https://placehold.co/300x300/000000/FFFFFF/png"
                                        brand="Nike"
                                        name="Air Max 95"
                                        price={169.99}
                                        productLink={`/products/${index}`}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>
        </main>
    );
}
