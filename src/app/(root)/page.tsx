import ProductCarousel from "@/components/product-carousel";
import Banner from "@/components/banner";
import { mockProducts } from "@/lib/mock-data";

export default function Home() {
    return (
        <div>
            <Banner backgroundImage="/images/Exquisite Perfume Collection.png" />

            <ProductCarousel headline="TRENDING NOW" products={mockProducts} />

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
                secondaryButtonText="LEARN MORE"
                secondaryButtonLink="/products"
                overlayGradient="bg-gradient-to-r from-black/50 to-black/20"
                className="mt-12"
            />

            <ProductCarousel
                headline="FEATURED FRAGRANCES"
                products={mockProducts}
            />
        </div>
    );
}
