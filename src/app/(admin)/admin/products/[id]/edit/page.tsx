"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";
import { useParams } from "next/navigation";
import type { ProductType } from "@/lib/schemas";
import useSWR from "swr";
import Spinner from "@/components/spinner";
import { fetcher } from "@/lib/utils";

export default function EditProductPage() {
    const params = useParams();
    const productId = params.id as string;

    const { data, error, isLoading } = useSWR<{
        success: boolean;
        data: ProductType;
    }>(`/api/products/${productId}`, fetcher, {
        revalidateOnFocus: true,
    });

    const product = data?.success ? data.data : null;

    if (isLoading) {
        return <Spinner />;
    }

    if (error || !product) {
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
