import { ProductCard, type ProductCardProps } from "./product-card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
    headline?: string;
    products: ProductCardProps[];
    className?: string;
}

export default function ProductCarousel({
    headline = "TRENDING NOW",
    products,
    className = "",
}: ProductCarouselProps) {
    return (
        <section className={`py-12 bg-neutral-50 ${className}`}>
            <div className="container mx-auto px-4">
                {headline && (
                    <h2 className="text-xl font-medium mb-8 text-center">
                        {headline}
                    </h2>
                )}

                <div className="relative px-4 md:px-10">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {products.map((product, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-full xs:basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4"
                                >
                                    <ProductCard {...product} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden sm:flex absolute top-1/2 -left-2 transform -translate-y-1/2 z-10">
                            <CarouselPrevious className="h-8 w-8 opacity-70 hover:opacity-100" />
                        </div>
                        <div className="hidden sm:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                            <CarouselNext className="h-8 w-8 opacity-70 hover:opacity-100" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
