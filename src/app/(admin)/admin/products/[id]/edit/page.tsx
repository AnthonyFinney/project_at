"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";
import { useParams } from "next/navigation";
import type { ProductType } from "@/lib/schemas";

export default function EditProductPage() {
    const params = useParams();
    const productId = params.id as string;
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Make an API call to fetch the product by id.
                const res = await fetch(
                    `${window.location.origin}/api/products/${productId}`
                );
                const json = await res.json();
                if (json.success && json.data) {
                    const foundProduct = json.data as ProductType;

                    setProduct(foundProduct);
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <p>
                    The product you're looking for doesn't exist or has been
                    removed.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Edit Product"
                description="Update product information"
            />
            <ProductForm initialData={product} />
        </div>
    );
}
