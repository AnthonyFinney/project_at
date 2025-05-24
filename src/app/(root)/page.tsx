"use client";

import ProductCarousel from "@/components/product-carousel";
import Banner from "@/components/banner";
import Spinner from "@/components/spinner";
import { useProducts } from "@/hooks/useProducts";

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

    const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

    const newlyAdded = [...products]
        .sort(
            (a, b) =>
                new Date(b.createdAt ?? b.updatedAt ?? 0).getTime() -
                new Date(a.createdAt ?? b.updatedAt ?? 0).getTime()
        )
        .slice(0, 8);

    return (
        <div>
            <Banner
                backgroundImage="/images/Exquisite Perfume Collection.png"
                secondaryButtonText=""
                secondaryButtonLink=""
            />

            <ProductCarousel
                headline="FEATURED FRAGRANCES"
                products={featuredProducts}
            />

            <Banner
                backgroundImage="/images/Moonlit Perfume.png"
                brandText="LIMITED EDITION COLLECTION"
                heading={
                    <>
                        SUMMER{" "}
                        <span className="italic font-normal">ESSENTIALS</span>
                    </>
                }
                description="Discover our curated collection of light, refreshing fragrances perfect for warm summer days and enchanting evenings."
                primaryButtonText="SHOP THE COLLECTION"
                primaryButtonLink="/products"
                secondaryButtonText=""
                secondaryButtonLink=""
                overlayGradient="bg-gradient-to-r from-black/50 to-black/20"
                className="mt-12"
            />

            <ProductCarousel headline="Newly Added" products={newlyAdded} />
        </div>
    );
}
