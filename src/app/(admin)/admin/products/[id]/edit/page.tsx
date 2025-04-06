"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";
import { useParams } from "next/navigation";
import { mockProducts } from "@/lib/mock-data";

interface Product {
    id: string;
    name: string;
    brand: string;
    sku: string;
    price: number;
    description: string;
    category: string;
    status: "In Stock" | "Out of Stock" | string;
    stock: number;
    image: string;
    sales: number;
}

export default function EditProductPage() {
    const params = useParams();
    const productId = params.id as string;
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would be an API call
        const foundProduct = mockProducts.find((p) => p.id === productId);
        setProduct(foundProduct);
        setLoading(false);
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
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
