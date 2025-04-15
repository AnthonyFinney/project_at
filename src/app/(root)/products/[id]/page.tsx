import ProductAction from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import ProductGallery from "@/components/product-gallery";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
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

    const { id } = await params;
    return (
        <div className="max-w-7x1 mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 my-2">
                <div className="w-full max-h-[600px]">
                    <ProductGallery
                        mainImageSize="aspect-[4/3]"
                        thumbnailSize="medium"
                    />
                </div>

                <div className="space-y-6">
                    <div className="text-sm text-muted-foreground">
                        BRAND/{id}
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold">
                        PRODUCT TITLE!!
                    </h1>

                    <p>
                        Description Re-releasing on the 16th November, keep your
                        eyes peeled for new pairs of the Air Jordan 4 Retro Fear
                        to hit the market, with the same iconic design and
                        style. The Air Jordan 4 provides an unmatched retro
                        styling if you’re a fan of semi-translucent features and
                        chunky rubber additions. The Air Jordan 4 Retro Fear
                        sneaker comes with washed dark and light grey nubuck
                        along the front toe panels, toe box, and running across
                        the bottom of the upper to the heel. This is then
                        complemented by a bold black mesh fabric for the top of
                        the upper, a black rubber side strap, extra-large white
                        rubber eyestay accessories, and a black and white
                        tongue. The black laces contrast nicely with the white
                        eyestays, while the sole of the Air Jordan 4 Retro Fear
                        shoe switches to a black and white speckled mudguard and
                        a curved light grey mid-to-outer sole. There is also a
                        visible Air Unit in the heel to complete the Air Jordan
                        4 Retro Fear's look. Details Brand: Air Jordan Style
                        Code: FQ8138-002 Categories: Air Jordan 4, Air Jordan 4
                        Black Year Released: 2024 Colour: black
                    </p>

                    <p className="text-3xl font-bold">{"\u09F3"}500</p>

                    <ProductAction product={mockProduct} />
                </div>
            </div>

            <section className="py-12 ">
                <div className="container mx-auto px-4">
                    <h2 className="text-xl font-medium mb-8 text-center">
                        YOU MAY ALSO LIKE
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
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>
        </div>
    );
}
