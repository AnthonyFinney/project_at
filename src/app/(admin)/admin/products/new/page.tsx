"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
    // Initial empty product that matches the schema structure
    const emptyProduct = {
        name: "",
        description: "",
        variants: [],
        category: {
            name: "",
            description: "",
            promotion: {
                type: [],
                details: "",
            },
        },
        isFeatured: false,
        tags: [],
        image: "",
    };

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Add New Product"
                description="Create a new product listing"
            />

            <ProductForm initialData={emptyProduct} />
        </div>
    );
}
