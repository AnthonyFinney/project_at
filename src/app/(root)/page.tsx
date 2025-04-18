import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
    const mockCategory: CategoryType = {
        id: "b1g1",
        name: "Buy 1 Get 1 Free",
        description: "Exclusive B1G1 deals on select attars and perfume oils.",
        promotion: {
            type: ["B1G1"],
            details:
                "Buy one 12ml bottle and get one free of the same product.",
        },
    };

    const mockProduct: ProductType = {
        id: "21135",
        name: "Arkan Blend",
        description:
            "A luxurious, oriental attar oil with deep notes of amber, oud, and musk. 100% alcohol-free and handcrafted for a rich scent experience.",
        price: 950, // in BDT
        size: ["6ml", "12ml"],
        category: mockCategory,
        stock: 30,
        isFeatured: true,
        tags: ["Alcohol-Free", "Unisex", "Woody", "Long-lasting", "Arabic"],
        image: "https://placehold.co/600x400/000000/FFFFFF/png",
        createdAt: "2025-04-14T10:00:00.000Z",
        updatedAt: "2025-04-14T10:00:00.000Z",
    };

    const productCardProps: ProductCardProps = {
        name: mockProduct.name,
        description: mockProduct.description,
        price: mockProduct.price,
        tags: mockProduct.tags,
        image: mockProduct.image,
        size: mockProduct.size,
        productLink: `/products/${mockProduct.id}`,
    };

    return (
        <div>
            <section className="relative w-full h-[550px] bg-neutral-200">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1474112704314-8162b7749a90?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                        backgroundSize: "cover",
                        filter: "brightness(0.8)",
                    }}
                >
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
                    <div className="max-w-md text-white">
                        <h1 className="text-4xl font-light mb-2">
                            THE <span className="italic">ESSENCE OF YOU</span>
                        </h1>
                        <p className="mb-6 text-sm">
                            Embrace your distinctive spirit with an exquisite
                            perfume from The Kanza Royal Perfumery, from elegant
                            Nepalese Deer Musk to captivating Honeysuckle and
                            White Lotus.
                        </p>
                        <Link
                            href="/products"
                            className="bg-black rounded-none px-8 hover:text-neutral-600 transition-colors"
                        >
                            SHOP NOW
                        </Link>
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
                                    <ProductCard {...productCardProps} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="absolute top-1/2 left-1 flex items-center justify-center">
                            <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
                        </div>
                        <div className="absolute top-1/2 right-1 flex items-center justify-center">
                            <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
                        </div>
                    </Carousel>
                </div>
            </section>
        </div>
    );
}
