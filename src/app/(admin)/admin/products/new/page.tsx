"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
    return (
        <div className="space-y-6">
            <AdminHeader
                title="Add New Product"
                description="Create a new product listing"
            />

            <ProductForm />
        </div>
    );
}
