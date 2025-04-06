"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductsTable } from "@/components/admin/products-table";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Products"
                description="Manage your product inventory"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="w-full sm:w-auto">
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                <Button
                    onClick={() => router.push("/admin/products/new")}
                    className="bg-black hover:bg-black/90 w-full sm:w-auto"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            <ProductsTable searchQuery={searchQuery} />
        </div>
    );
}
