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
    const product: ProductType = {
        id: "1",
        name: "AIR JORDAN 4 RETRO FEAR (2024)",
        brand: "Air Jordan",
        price: 215,
        imageLink: "https://placehold.co/600x400/000000/FFFFFF/png",
        category: "",
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

                    <ProductAction product={product} />
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
                                    <ProductCard
                                        imageLink="https://placehold.co/300x300/000000/FFFFFF/png"
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
        </div>
    );
}
