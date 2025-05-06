import ProductCarousel from "@/components/product-carousel";
import Banner from "@/components/banner";
import { mockProducts } from "@/lib/mock-data";

export default function Home() {
    return (
        <div>
            <Banner />

            <ProductCarousel headline="TRENDING NOW" products={mockProducts} />

            <Banner
                backgroundImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3"
                brandText="LIMITED EDITION COLLECTION"
                heading={
                    <>
                        SUMMER{" "}
                        <span className="italic font-normal">ESSENTIALS</span>
                    </>
                }
                description="Discover our curated collection of light, refreshing fragrances perfect for warm summer days and enchanting evenings."
                primaryButtonText="SHOP THE COLLECTION"
                primaryButtonLink="/collections/summer"
                secondaryButtonText="LEARN MORE"
                secondaryButtonLink="/about/summer-collection"
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
