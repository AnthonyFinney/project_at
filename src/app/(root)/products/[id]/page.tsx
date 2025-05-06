import ProductCarousel from "@/components/product-carousel";
import ProductGallery from "@/components/product-gallery";
import { createRandomProduct, mockProducts } from "@/lib/mock-data";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const sampleProduct = createRandomProduct();

    const { id } = await params;

    return (
        <div className="max-w-7x1 mx-auto px-4 py-8">
            <ProductGallery product={sampleProduct} />

            <ProductCarousel
                headline="YOU MAY ALSO LIKE"
                products={mockProducts}
            />
        </div>
    );
}
