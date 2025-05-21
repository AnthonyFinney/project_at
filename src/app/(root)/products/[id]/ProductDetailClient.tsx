"use client";

import ProductCarousel from "@/components/product-carousel";
import ProductGallery from "@/components/product-gallery";
import Spinner from "@/components/spinner";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";

export default function ProductDetailClient({ id }: { id: string }) {
    const { product, error, isLoading } = useProduct(id);
    const { products } = useProducts();

    if (isLoading) {
        return <Spinner />;
    }

    if (error || product === null) {
        const msg =
            error instanceof Error ? error.message : "An error occurred.";

        return <div className="p-4 text-center text-red-500">{msg}</div>;
    }

    return (
        <>
            <ProductGallery product={product} />

            <ProductCarousel headline="YOU MAY ALSO LIKE" products={products} />
        </>
    );
}
