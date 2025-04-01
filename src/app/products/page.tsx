"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";

export default function Page() {
    const [expandedFilters, setExpandedFilters] = useState<string[]>([]);

    const toggleFilter = (filter: string) => {
        if (expandedFilters.includes(filter)) {
            setExpandedFilters(expandedFilters.filter((f) => f !== filter));
        } else {
            setExpandedFilters([...expandedFilters, filter]);
        }
    };

    const filterCategories = [
        { id: "sort", name: "Sort By" },
        { id: "age", name: "Age category" },
        { id: "product", name: "Product type" },
        { id: "brands", name: "Brands" },
        { id: "size", name: "Size (UK)" },
        { id: "price", name: "Price" },
        { id: "colour", name: "Colour" },
        { id: "premium", name: "Premium" },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    ALL ITEMS
                </h1>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-64 bg-white p-4 rounded-md shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-lg">
                                Filter & Sort
                            </h2>
                            <span className="text-sm text-gray-500">
                                9059 Results
                            </span>
                        </div>

                        {filterCategories.map((category) => (
                            <div key={category.id} className="border-t py-3">
                                <button
                                    className="w-full flex justify-between items-center"
                                    onClick={() => toggleFilter(category.id)}
                                >
                                    <span className="font-medium">
                                        {category.name}
                                    </span>
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1">
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {[...Array(10)].map((_, index) => (
                                <ProductCard
                                    key={index}
                                    imageLink="https://placehold.co/300x300/000000/FFFFFF/png"
                                    brand="Nike"
                                    name="Air Max 95"
                                    price={169.99}
                                    productLink={`/products/${index}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
