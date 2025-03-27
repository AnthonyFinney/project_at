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

                    <p className="text-3xl font-bold">{"\u09F3"}500</p>

                    <ProductAction />
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
        </div>
    );
}
