"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/lib/schemas";
import { mockProducts } from "@/lib/mock-data";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("@/components/product-card"), {
    ssr: false,
});

// Filter state shape
interface FilterState {
    productType: string[];
    scentFamily: string[];
    concentration: string[];
    priceRange: [number, number];
    sort: string;
}

export default function ProductsPage() {
    const allProducts: ProductType[] = mockProducts;

    // Helper: each product’s displayed price = lowest variant price
    const getProductPrice = (p: ProductType) =>
        Math.min(...p.variants.map((v) => v.price));

    // Compute global min/max from all variant prices
    const allPrices = allProducts.flatMap((p) =>
        p.variants.map((v) => v.price)
    );
    const minPrice = Math.floor(Math.min(...allPrices));
    const maxPrice = Math.ceil(Math.max(...allPrices));

    // UI state
    const [expandedFilters, setExpandedFilters] = useState<string[]>(["sort"]);
    const [currentPage, setCurrentPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        productType: [],
        scentFamily: [],
        concentration: [],
        priceRange: [minPrice, maxPrice],
        sort: "newest",
    });

    // Reset page on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    // Define filter categories & options
    const filterCategories = [
        {
            id: "sort",
            name: "Sort By",
            options: [
                { id: "newest", label: "Newest Arrivals" },
                { id: "featured", label: "Featured" },
                { id: "price-low", label: "Price: Low to High" },
                { id: "price-high", label: "Price: High to Low" },
                { id: "bestselling", label: "Best Selling" },
            ],
        },
        {
            id: "productType",
            name: "Product Type",
            options: [
                { id: "attar-oil", label: "Attar Oil" },
                { id: "perfume-oil", label: "Perfume Oil" },
                { id: "spray", label: "Spray Perfume" },
                { id: "gift-set", label: "Gift Sets" },
            ],
        },
        {
            id: "scentFamily",
            name: "Scent Family",
            options: [
                { id: "woody", label: "Woody" },
                { id: "floral", label: "Floral" },
                { id: "oriental", label: "Oriental" },
                { id: "fresh", label: "Fresh" },
                { id: "spicy", label: "Spicy" },
                { id: "citrus", label: "Citrus" },
            ],
        },
        { id: "price", name: "Price Range", component: "slider" },
        {
            id: "concentration",
            name: "Concentration",
            options: [
                { id: "pure-attar-oil", label: "Pure Attar Oil" },
                {
                    id: "concentrated-perfume-oil",
                    label: "Concentrated Perfume Oil",
                },
                { id: "eau-de-parfum", label: "Eau de Parfum" },
                { id: "eau-de-toilette", label: "Eau de Toilette" },
            ],
        },
    ];

    const productsPerPage = 8;

    // Toggle expanding a filter panel
    const toggleFilter = (id: string) =>
        setExpandedFilters((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );

    // Generic filter‐value setter
    const handleFilterChange = <K extends keyof FilterState>(
        key: K,
        value: FilterState[K]
    ) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // Toggle an ID in an array‐typed filter
    const toggleArrayFilter = (
        key: "productType" | "scentFamily" | "concentration",
        id: string
    ) => {
        // If 'All Products' clicked in productType, clear that filter
        if (key === "productType" && id === "all") {
            setFilters((prev) => ({ ...prev, productType: [] }));
            return;
        }
        setFilters((prev) => {
            const list = prev[key];
            const next = list.includes(id)
                ? list.filter((x) => x !== id)
                : [...list, id];
            return { ...prev, [key]: next };
        });
    };

    // Clear every filter
    const clearAllFilters = () =>
        setFilters({
            productType: [],
            scentFamily: [],
            concentration: [],
            priceRange: [minPrice, maxPrice],
            sort: "newest",
        });

    // Apply filters + sorting
    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        // --- productType (via concentration proxy) ---
        if (filters.productType.length) {
            result = result.filter((p) =>
                filters.productType.some((id) => {
                    if (id === "attar-oil")
                        return p.concentration?.includes("attar");
                    if (id === "perfume-oil")
                        return p.concentration?.includes("perfume");
                    if (id === "spray")
                        return p.concentration?.includes("Eau de");
                    return false;
                })
            );
        }

        // --- scentFamily (via tags) ---
        if (filters.scentFamily.length) {
            result = result.filter((p) =>
                filters.scentFamily.some((id) => p.tags.includes(id))
            );
        }

        // --- concentration ---
        if (filters.concentration.length) {
            result = result.filter((p) =>
                filters.concentration.includes(p.concentration || "")
            );
        }

        // --- priceRange ---
        result = result.filter((p) => {
            const price = getProductPrice(p);
            return (
                price >= filters.priceRange[0] && price <= filters.priceRange[1]
            );
        });

        // --- sorting ---
        switch (filters.sort) {
            case "price-low":
                result.sort((a, b) => getProductPrice(a) - getProductPrice(b));
                break;
            case "price-high":
                result.sort((a, b) => getProductPrice(b) - getProductPrice(a));
                break;
            case "newest":
                result.sort(
                    (a, b) =>
                        new Date(b.createdAt || "").getTime() -
                        new Date(a.createdAt || "").getTime()
                );
                break;
            case "bestselling":
                // approximate: total stock ascending = more popular first
                result.sort((a, b) => {
                    const sumA = a.variants.reduce(
                        (s, v) => s + (v.stock ?? 0),
                        0
                    );
                    const sumB = b.variants.reduce(
                        (s, v) => s + (v.stock ?? 0),
                        0
                    );
                    return sumA - sumB;
                });
                break;
            // "featured" and default
            default:
                result.sort((a, b) => {
                    if (a.isFeatured && !b.isFeatured) return -1;
                    if (!a.isFeatured && b.isFeatured) return 1;
                    return a.name.localeCompare(b.name);
                });
        }

        return result;
    }, [allProducts, filters]);

    // Build up human‐readable badges
    const activeFilterLabels = useMemo(() => {
        const labels: string[] = [];

        // helper to find label by id
        const findLabel = (catId: string, id: string) =>
            filterCategories
                .find((c) => c.id === catId)
                ?.options?.find((o) => o.id === id)?.label;

        filters.productType.forEach((id) => {
            const l = findLabel("productType", id);
            if (l) labels.push(l);
        });
        filters.scentFamily.forEach((id) => {
            const l = findLabel("scentFamily", id);
            if (l) labels.push(l);
        });
        filters.concentration.forEach((id) => {
            const l = findLabel("concentration", id);
            if (l) labels.push(l);
        });
        // price
        if (
            filters.priceRange[0] > minPrice ||
            filters.priceRange[1] < maxPrice
        ) {
            labels.push(
                `$${filters.priceRange[0]} - $${filters.priceRange[1]}`
            );
        }

        return labels;
    }, [filters, minPrice, maxPrice]);

    // Pagination logic
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Remove a specific badge
    const removeFilter = (label: string) => {
        // Try each category by label → id
        for (const cat of [
            "productType",
            "scentFamily",
            "concentration",
        ] as const) {
            const opt = filterCategories
                .find((c) => c.id === cat)
                ?.options?.find((o) => o.label === label);
            if (opt) {
                toggleArrayFilter(cat, opt.id);
                return;
            }
        }
        // price badge
        if (label.startsWith("$")) {
            handleFilterChange("priceRange", [minPrice, maxPrice]);
        }
    };

    return (
        <div className="bg-neutral-50 min-h-screen">
            {/* Header */}
            <div className="bg-black text-white py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-light">
                        ALL FRAGRANCES
                    </h1>
                    <p className="text-neutral-400 mt-2 max-w-2xl mx-auto">
                        Discover our complete collection of handcrafted
                        fragrances, from traditional attars to modern perfume
                        oils.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-16">
                {/* Mobile filter toggle */}
                <div className="md:hidden flex justify-between items-center mb-4">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        <Filter className="h-4 w-4" /> Filter & Sort
                    </Button>
                    <span className="text-sm text-neutral-500">
                        {totalProducts} Results
                    </span>
                </div>

                {/* Active badges */}
                {activeFilterLabels.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {activeFilterLabels.map((lbl) => (
                            <Badge
                                key={lbl}
                                variant="secondary"
                                className="px-3 py-1"
                            >
                                {lbl}
                                <button
                                    onClick={() => removeFilter(lbl)}
                                    className="ml-2"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                        <Button
                            variant="link"
                            className="text-xs h-7 px-2"
                            onClick={clearAllFilters}
                        >
                            Clear All
                        </Button>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Desktop sidebar */}
                    <aside className="hidden md:block w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-md shadow-sm border border-neutral-200 sticky top-4">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-medium text-lg">
                                    Filter & Sort
                                </h2>
                                <span className="text-sm text-neutral-500">
                                    {totalProducts} Results
                                </span>
                            </div>
                            {filterCategories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="border-t border-neutral-200 py-4"
                                >
                                    <button
                                        className="w-full flex justify-between items-center"
                                        onClick={() => toggleFilter(cat.id)}
                                    >
                                        <span className="font-medium text-sm">
                                            {cat.name}
                                        </span>
                                        {expandedFilters.includes(cat.id) ? (
                                            <ChevronUp className="h-4 w-4 text-neutral-500" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 text-neutral-500" />
                                        )}
                                    </button>

                                    {expandedFilters.includes(cat.id) && (
                                        <div className="mt-3 pl-1">
                                            {cat.id === "sort" ? (
                                                <RadioGroup
                                                    value={filters.sort}
                                                    onValueChange={(v) =>
                                                        handleFilterChange(
                                                            "sort",
                                                            v
                                                        )
                                                    }
                                                    className="space-y-2"
                                                >
                                                    {cat.options!.map((opt) => (
                                                        <div
                                                            key={opt.id}
                                                            className="flex items-center space-x-2"
                                                        >
                                                            <RadioGroupItem
                                                                value={opt.id}
                                                                id={opt.id}
                                                            />
                                                            <Label
                                                                htmlFor={opt.id}
                                                                className="text-sm"
                                                            >
                                                                {opt.label}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            ) : cat.id === "price" ? (
                                                <>
                                                    <Slider
                                                        min={minPrice}
                                                        max={maxPrice}
                                                        step={1}
                                                        value={
                                                            filters.priceRange
                                                        }
                                                        onValueChange={(v) =>
                                                            handleFilterChange(
                                                                "priceRange",
                                                                v as [
                                                                    number,
                                                                    number
                                                                ]
                                                            )
                                                        }
                                                        className="mb-6"
                                                    />
                                                    <div className="flex justify-between text-sm text-neutral-600">
                                                        <span>
                                                            $
                                                            {
                                                                filters
                                                                    .priceRange[0]
                                                            }
                                                        </span>
                                                        <span>
                                                            $
                                                            {
                                                                filters
                                                                    .priceRange[1]
                                                            }
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="space-y-2">
                                                    {cat.options!.map((opt) => (
                                                        <div
                                                            key={opt.id}
                                                            className="flex items-center space-x-2"
                                                        >
                                                            <Checkbox
                                                                id={opt.id}
                                                                checked={
                                                                    cat.id ===
                                                                    "productType"
                                                                        ? filters.productType.includes(
                                                                              opt.id
                                                                          )
                                                                        : cat.id ===
                                                                          "scentFamily"
                                                                        ? filters.scentFamily.includes(
                                                                              opt.id
                                                                          )
                                                                        : filters.concentration.includes(
                                                                              opt.id
                                                                          )
                                                                }
                                                                onCheckedChange={() =>
                                                                    toggleArrayFilter(
                                                                        cat.id as any,
                                                                        opt.id
                                                                    )
                                                                }
                                                            />
                                                            <Label
                                                                htmlFor={opt.id}
                                                                className="text-sm"
                                                            >
                                                                {opt.label}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Mobile slide‑in */}
                    {mobileFiltersOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                            <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
                                <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                                    <h2 className="font-medium">
                                        Filter & Sort
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            setMobileFiltersOpen(false)
                                        }
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                                <div className="p-4">
                                    {filterCategories.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="border-b border-neutral-200 py-4"
                                        >
                                            <button
                                                className="w-full flex justify-between items-center"
                                                onClick={() =>
                                                    toggleFilter(cat.id)
                                                }
                                            >
                                                <span className="font-medium text-sm">
                                                    {cat.name}
                                                </span>
                                                {expandedFilters.includes(
                                                    cat.id
                                                ) ? (
                                                    <ChevronUp className="h-4 w-4 text-neutral-500" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4 text-neutral-500" />
                                                )}
                                            </button>
                                            {expandedFilters.includes(
                                                cat.id
                                            ) && (
                                                <div className="mt-3 pl-1">
                                                    {cat.id === "sort" ? (
                                                        <RadioGroup
                                                            value={filters.sort}
                                                            onValueChange={(
                                                                v
                                                            ) =>
                                                                handleFilterChange(
                                                                    "sort",
                                                                    v
                                                                )
                                                            }
                                                            className="space-y-2"
                                                        >
                                                            {cat.options!.map(
                                                                (opt) => (
                                                                    <div
                                                                        key={
                                                                            opt.id
                                                                        }
                                                                        className="flex items-center space-x-2"
                                                                    >
                                                                        <RadioGroupItem
                                                                            value={
                                                                                opt.id
                                                                            }
                                                                            id={`mob-${opt.id}`}
                                                                        />
                                                                        <Label
                                                                            htmlFor={`mob-${opt.id}`}
                                                                            className="text-sm"
                                                                        >
                                                                            {
                                                                                opt.label
                                                                            }
                                                                        </Label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </RadioGroup>
                                                    ) : cat.id === "price" ? (
                                                        <>
                                                            <Slider
                                                                min={minPrice}
                                                                max={maxPrice}
                                                                step={1}
                                                                value={
                                                                    filters.priceRange
                                                                }
                                                                onValueChange={(
                                                                    v
                                                                ) =>
                                                                    handleFilterChange(
                                                                        "priceRange",
                                                                        v as [
                                                                            number,
                                                                            number
                                                                        ]
                                                                    )
                                                                }
                                                                className="mb-6"
                                                            />
                                                            <div className="flex justify-between text-sm text-neutral-600">
                                                                <span>
                                                                    $
                                                                    {
                                                                        filters
                                                                            .priceRange[0]
                                                                    }
                                                                </span>
                                                                <span>
                                                                    $
                                                                    {
                                                                        filters
                                                                            .priceRange[1]
                                                                    }
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {cat.options!.map(
                                                                (opt) => (
                                                                    <div
                                                                        key={
                                                                            opt.id
                                                                        }
                                                                        className="flex items-center space-x-2"
                                                                    >
                                                                        <Checkbox
                                                                            id={`mob-${opt.id}`}
                                                                            checked={
                                                                                cat.id ===
                                                                                "productType"
                                                                                    ? filters.productType.includes(
                                                                                          opt.id
                                                                                      )
                                                                                    : cat.id ===
                                                                                      "scentFamily"
                                                                                    ? filters.scentFamily.includes(
                                                                                          opt.id
                                                                                      )
                                                                                    : filters.concentration.includes(
                                                                                          opt.id
                                                                                      )
                                                                            }
                                                                            onCheckedChange={() =>
                                                                                toggleArrayFilter(
                                                                                    cat.id as any,
                                                                                    opt.id
                                                                                )
                                                                            }
                                                                        />
                                                                        <Label
                                                                            htmlFor={`mob-${opt.id}`}
                                                                            className="text-sm"
                                                                        >
                                                                            {
                                                                                opt.label
                                                                            }
                                                                        </Label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t border-neutral-200">
                                    <Button
                                        className="w-full"
                                        onClick={() =>
                                            setMobileFiltersOpen(false)
                                        }
                                    >
                                        Apply Filters
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products */}
                    <main className="flex-1">
                        {currentProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium mb-2">
                                    No products found
                                </h3>
                                <p className="text-neutral-500 mb-6">
                                    Try adjusting your filters to find what
                                    you're looking for.
                                </p>
                                <Button onClick={clearAllFilters}>
                                    Clear All Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {currentProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        price={getProductPrice(product)}
                                        tags={product.tags.slice(0, 3)}
                                        image={product.image}
                                        size={product.variants[0]?.size || ""}
                                        concentration={product.concentration}
                                        productLink={`/products/${product.id}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12">
                                <Separator className="mb-8" />
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={currentPage === 1}
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage - 1
                                                    )
                                                }
                                                className="text-sm"
                                            >
                                                Previous
                                            </Button>
                                        </PaginationItem>
                                        {[...Array(totalPages)].map((_, i) => {
                                            const page = i + 1;
                                            if (
                                                page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 1 &&
                                                    page <= currentPage + 1)
                                            ) {
                                                return (
                                                    <PaginationItem key={page}>
                                                        <PaginationLink
                                                            isActive={
                                                                page ===
                                                                currentPage
                                                            }
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    page
                                                                )
                                                            }
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                );
                                            }
                                            if (
                                                (page === 2 &&
                                                    currentPage > 3) ||
                                                (page === totalPages - 1 &&
                                                    currentPage <
                                                        totalPages - 2)
                                            ) {
                                                return (
                                                    <PaginationItem
                                                        key={`dots-${page}`}
                                                    >
                                                        <span className="px-4 py-2">
                                                            …
                                                        </span>
                                                    </PaginationItem>
                                                );
                                            }
                                            return null;
                                        })}
                                        <PaginationItem>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage + 1
                                                    )
                                                }
                                                className="text-sm"
                                            >
                                                Next
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
