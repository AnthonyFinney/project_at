"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";

export default function Page() {
    const mockCategory: CategoryType = {
        id: "b1g1",
        name: "Buy 1 Get 1 Free",
        description: "Exclusive B1G1 deals on select attars and perfume oils.",
        promotion: {
            type: ["B1G1"],
            details:
                "Buy one 12ml bottle and get one free of the same product.",
        },
    };

    const mockProduct: ProductType = {
        id: "21135",
        name: "Arkan Blend",
        description:
            "A luxurious, oriental attar oil with deep notes of amber, oud, and musk. 100% alcohol-free and handcrafted for a rich scent experience.",
        price: 950, // in BDT
        size: ["6ml", "12ml"],
        category: mockCategory,
        stock: 30,
        isFeatured: true,
        tags: ["Alcohol-Free", "Unisex", "Woody", "Long-lasting", "Arabic"],
        image: "https://placehold.co/600x400/000000/FFFFFF/png",
        createdAt: "2025-04-14T10:00:00.000Z",
        updatedAt: "2025-04-14T10:00:00.000Z",
    };

    const productCardProps: ProductCardProps = {
        name: mockProduct.name,
        description: mockProduct.description,
        price: mockProduct.price,
        tags: mockProduct.tags,
        image: mockProduct.image,
        size: mockProduct.size,
        productLink: `/products/${mockProduct.id}`,
    };

    const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const totalProducts = 50;

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const toggleFilter = (filter: string) => {
        setExpandedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter]
        );
    };

    const filterCategories = [
        { id: "sort", name: "Sort By" },
        { id: "product", name: "Product type" },
        { id: "brands", name: "Brands" },
        { id: "price", name: "Price" },
        { id: "premium", name: "Premium" },
    ];

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
                                {totalProducts} Results
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
                            {[...Array(productsPerPage)].map((_, index) => (
                                <ProductCard
                                    {...productCardProps}
                                    key={index}
                                />
                            ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        {currentPage > 1 ? (
                                            <PaginationLink
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage - 1
                                                    )
                                                }
                                            >
                                                Previous
                                            </PaginationLink>
                                        ) : (
                                            <span className="px-4 py-2 text-gray-400 cursor-not-allowed">
                                                Previous
                                            </span>
                                        )}
                                    </PaginationItem>
                                    {currentPage > 2 && (
                                        <PaginationItem>
                                            <span className="px-4">...</span>
                                        </PaginationItem>
                                    )}
                                    {currentPage > 1 && (
                                        <PaginationItem>
                                            <PaginationLink
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage - 1
                                                    )
                                                }
                                            >
                                                {currentPage - 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    <PaginationItem>
                                        <PaginationLink isActive>
                                            {currentPage}
                                        </PaginationLink>
                                    </PaginationItem>
                                    {currentPage < totalPages && (
                                        <PaginationItem>
                                            <PaginationLink
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage + 1
                                                    )
                                                }
                                            >
                                                {currentPage + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}
                                    {currentPage < totalPages - 1 && (
                                        <PaginationItem>
                                            <span className="px-4">...</span>
                                        </PaginationItem>
                                    )}
                                    <PaginationItem>
                                        {currentPage < totalPages ? (
                                            <PaginationLink
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage + 1
                                                    )
                                                }
                                            >
                                                Next
                                            </PaginationLink>
                                        ) : (
                                            <span className="px-4 py-2 text-gray-400 cursor-not-allowed">
                                                Next
                                            </span>
                                        )}
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
