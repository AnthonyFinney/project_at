"use client";

import { useState, useEffect, useMemo } from "react";
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
import { ProductCard } from "@/components/product-card";

// Type definitions
interface CategoryType {
    id: string;
    name: string;
    description: string;
    promotion: {
        type: string[];
        details: string;
    };
}

interface ProductType {
    id: string;
    name: string;
    description: string;
    price: number;
    size: string[];
    category: CategoryType;
    stock: number;
    isFeatured: boolean;
    tags: string[];
    image: string;
    concentration?: string;
    createdAt: string;
    updatedAt: string;
}

// Filter type definitions
interface FilterState {
    productType: string[];
    scentFamily: string[];
    concentration: string[];
    priceRange: [number, number];
    sort: string;
}

export default function ProductsPage() {
    // Sample product data
    const allProducts: ProductType[] = [
        {
            id: "21135",
            name: "Arkan Blend",
            description:
                "A luxurious, oriental attar oil with deep notes of amber, oud, and musk. 100% alcohol-free and handcrafted for a rich scent experience.",
            price: 49.99,
            size: ["6ml", "12ml"],
            category: {
                id: "b1g1",
                name: "Buy 1 Get 1 Free",
                description:
                    "Exclusive B1G1 deals on select attars and perfume oils.",
                promotion: {
                    type: ["B1G1"],
                    details:
                        "Buy one 12ml bottle and get one free of the same product.",
                },
            },
            stock: 30,
            isFeatured: true,
            tags: ["Alcohol-Free", "Unisex", "Woody"],
            image: "https://placehold.co/600x600/png",
            concentration: "Pure Attar Oil",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
        {
            id: "21136",
            name: "Royal Oud",
            description:
                "An exquisite blend featuring premium oud wood, amber, and subtle spices for a sophisticated fragrance experience.",
            price: 79.99,
            size: ["10ml", "25ml"],
            category: {
                id: "premium",
                name: "Premium Collection",
                description: "Our finest selection of premium fragrances.",
                promotion: {
                    type: ["Limited Edition"],
                    details:
                        "Exclusive premium fragrances with rare ingredients.",
                },
            },
            stock: 15,
            isFeatured: true,
            tags: ["Premium", "Oud", "Oriental"],
            image: "https://placehold.co/600x600/png",
            concentration: "Concentrated Perfume Oil",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
        {
            id: "21137",
            name: "Rose Taifi",
            description:
                "A delicate floral fragrance featuring the rare Taifi rose, with hints of vanilla and musk for a feminine touch.",
            price: 39.99,
            size: ["6ml", "12ml", "25ml"],
            category: {
                id: "floral",
                name: "Floral Collection",
                description: "Elegant floral fragrances for a timeless appeal.",
                promotion: {
                    type: ["Bestseller"],
                    details: "Our most popular floral fragrances.",
                },
            },
            stock: 25,
            isFeatured: false,
            tags: ["Floral", "Rose", "Feminine"],
            image: "https://placehold.co/600x600/png",
            concentration: "Eau de Parfum",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
        {
            id: "21138",
            name: "Amber Musk",
            description:
                "A warm, sensual blend of amber, musk, and vanilla that creates a cozy and inviting aura.",
            price: 54.99,
            size: ["10ml", "25ml"],
            category: {
                id: "oriental",
                name: "Oriental Collection",
                description: "Rich and warm oriental fragrances.",
                promotion: {
                    type: ["New Arrival"],
                    details: "Newly added to our oriental collection.",
                },
            },
            stock: 20,
            isFeatured: true,
            tags: ["Oriental", "Amber", "Unisex"],
            image: "https://placehold.co/600x600/png",
            concentration: "Pure Attar Oil",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
        {
            id: "21139",
            name: "Citrus Breeze",
            description:
                "A refreshing blend of citrus notes including bergamot, lemon, and mandarin for an uplifting experience.",
            price: 34.99,
            size: ["10ml", "25ml", "50ml"],
            category: {
                id: "fresh",
                name: "Fresh Collection",
                description:
                    "Light and refreshing fragrances for everyday wear.",
                promotion: {
                    type: ["Summer Special"],
                    details: "Perfect for warm summer days.",
                },
            },
            stock: 35,
            isFeatured: false,
            tags: ["Fresh", "Citrus", "Unisex"],
            image: "https://placehold.co/600x600/png",
            concentration: "Eau de Toilette",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
        {
            id: "21140",
            name: "Saffron Royale",
            description:
                "A luxurious blend of saffron, rose, and oud creating a rich and opulent fragrance experience.",
            price: 89.99,
            size: ["6ml", "12ml"],
            category: {
                id: "premium",
                name: "Premium Collection",
                description: "Our finest selection of premium fragrances.",
                promotion: {
                    type: ["Limited Edition"],
                    details:
                        "Exclusive premium fragrances with rare ingredients.",
                },
            },
            stock: 10,
            isFeatured: true,
            tags: ["Premium", "Spicy", "Unisex"],
            image: "https://placehold.co/600x600/png",
            concentration: "Pure Attar Oil",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
        {
            id: "21141",
            name: "Jasmine Dreams",
            description:
                "A delicate and romantic fragrance centered around jasmine with hints of vanilla and amber.",
            price: 44.99,
            size: ["10ml", "25ml"],
            category: {
                id: "floral",
                name: "Floral Collection",
                description: "Elegant floral fragrances for a timeless appeal.",
                promotion: {
                    type: ["Bestseller"],
                    details: "Our most popular floral fragrances.",
                },
            },
            stock: 18,
            isFeatured: false,
            tags: ["Floral", "Jasmine", "Feminine"],
            image: "https://placehold.co/600x600/png",
            concentration: "Eau de Parfum",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
        {
            id: "21142",
            name: "Sandalwood Elixir",
            description:
                "A warm and creamy sandalwood fragrance with hints of vanilla and musk for a comforting experience.",
            price: 59.99,
            size: ["6ml", "12ml", "25ml"],
            category: {
                id: "woody",
                name: "Woody Collection",
                description: "Rich and warm woody fragrances.",
                promotion: {
                    type: ["New Arrival"],
                    details: "Newly added to our woody collection.",
                },
            },
            stock: 22,
            isFeatured: true,
            tags: ["Woody", "Sandalwood", "Unisex"],
            image: "https://placehold.co/600x600/png",
            concentration: "Concentrated Perfume Oil",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
        {
            id: "21143",
            name: "Vetiver Noir",
            description:
                "A sophisticated blend of vetiver, cedar, and black pepper for a bold and distinctive character.",
            price: 64.99,
            size: ["10ml", "25ml"],
            category: {
                id: "woody",
                name: "Woody Collection",
                description: "Rich and warm woody fragrances.",
                promotion: {
                    type: ["New Arrival"],
                    details: "Newly added to our woody collection.",
                },
            },
            stock: 15,
            isFeatured: false,
            tags: ["Woody", "Earthy", "Masculine"],
            image: "https://placehold.co/600x600/png",
            concentration: "Concentrated Perfume Oil",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
        {
            id: "21144",
            name: "Vanilla Orchid",
            description:
                "A sweet and creamy vanilla fragrance with floral notes of orchid and jasmine.",
            price: 49.99,
            size: ["6ml", "12ml", "25ml"],
            category: {
                id: "oriental",
                name: "Oriental Collection",
                description: "Rich and warm oriental fragrances.",
                promotion: {
                    type: ["Bestseller"],
                    details: "Our most popular oriental fragrances.",
                },
            },
            stock: 28,
            isFeatured: true,
            tags: ["Oriental", "Vanilla", "Feminine"],
            image: "https://placehold.co/600x600/png",
            concentration: "Eau de Parfum",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
        {
            id: "21145",
            name: "Cardamom Spice",
            description:
                "A warm and spicy fragrance centered around cardamom with notes of cinnamon and clove.",
            price: 54.99,
            size: ["10ml", "25ml"],
            category: {
                id: "spicy",
                name: "Spicy Collection",
                description: "Bold and distinctive spicy fragrances.",
                promotion: {
                    type: ["Winter Special"],
                    details: "Perfect for cold winter days.",
                },
            },
            stock: 20,
            isFeatured: false,
            tags: ["Spicy", "Warm", "Unisex"],
            image: "https://placehold.co/600x600/png",
            concentration: "Pure Attar Oil",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
        {
            id: "21146",
            name: "Bergamot Bliss",
            description:
                "A bright and uplifting citrus fragrance with bergamot, lemon, and a hint of lavender.",
            price: 39.99,
            size: ["10ml", "25ml", "50ml"],
            category: {
                id: "fresh",
                name: "Fresh Collection",
                description:
                    "Light and refreshing fragrances for everyday wear.",
                promotion: {
                    type: ["Summer Special"],
                    details: "Perfect for warm summer days.",
                },
            },
            stock: 32,
            isFeatured: true,
            tags: ["Fresh", "Citrus", "Unisex"],
            image: "https://placehold.co/600x600/png",
            concentration: "Eau de Toilette",
            createdAt: "2025-04-14T10:00:00.000Z",
            updatedAt: "2025-04-14T10:00:00.000Z",
        },
    ];

    // Get min and max price from products
    const minPrice = Math.floor(Math.min(...allProducts.map((p) => p.price)));
    const maxPrice = Math.ceil(Math.max(...allProducts.map((p) => p.price)));

    // State
    const [expandedFilters, setExpandedFilters] = useState<string[]>(["sort"]);
    const [currentPage, setCurrentPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        productType: [],
        scentFamily: [],
        concentration: [],
        priceRange: [minPrice, maxPrice],
        sort: "featured",
    });

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    // Filter categories
    const filterCategories = [
        {
            id: "sort",
            name: "Sort By",
            options: [
                { id: "featured", label: "Featured" },
                { id: "newest", label: "Newest Arrivals" },
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
        {
            id: "price",
            name: "Price Range",
            component: "slider",
        },
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

    // Constants
    const productsPerPage = 8;

    // Filter handlers
    const toggleFilter = (filter: string) => {
        setExpandedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter]
        );
    };

    const handleFilterChange = (filterType: keyof FilterState, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    const toggleArrayFilter = (
        filterType: keyof FilterState,
        value: string
    ) => {
        if (!Array.isArray(filters[filterType])) return;

        setFilters((prev) => {
            const currentValues = prev[filterType] as string[];
            return {
                ...prev,
                [filterType]: currentValues.includes(value)
                    ? currentValues.filter((v) => v !== value)
                    : [...currentValues, value],
            };
        });
    };

    const clearAllFilters = () => {
        setFilters({
            productType: [],
            scentFamily: [],
            concentration: [],
            priceRange: [minPrice, maxPrice],
            sort: "featured",
        });
    };

    // Apply filters and sorting to products
    const filteredProducts = useMemo(() => {
        // Start with all products
        let result = [...allProducts];

        // Apply product type filter
        if (filters.productType.length > 0) {
            // This is a simplified example - in a real app, you'd have a product type field
            // Here we're using tags as a proxy for product type
            result = result.filter((product) => {
                return filters.productType.some((type) => {
                    if (type === "attar-oil")
                        return product.concentration?.includes("Attar");
                    if (type === "perfume-oil")
                        return product.concentration?.includes("Perfume Oil");
                    if (type === "spray")
                        return product.concentration?.includes("Eau de");
                    return false;
                });
            });
        }

        // Apply scent family filter
        if (filters.scentFamily.length > 0) {
            result = result.filter((product) =>
                filters.scentFamily.some((scent) =>
                    product.tags.includes(scent)
                )
            );
        }

        // Apply concentration filter
        if (filters.concentration.length > 0) {
            result = result.filter((product) =>
                filters.concentration.some(
                    (conc) => product.concentration === conc
                )
            );
        }

        // Apply price range filter
        result = result.filter(
            (product) =>
                product.price >= filters.priceRange[0] &&
                product.price <= filters.priceRange[1]
        );

        // Apply sorting
        switch (filters.sort) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                result.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
                break;
            case "bestselling":
                // In a real app, you'd have a sales or popularity field
                // Here we're using stock as a proxy for popularity (lower stock = more popular)
                result.sort((a, b) => a.stock - b.stock);
                break;
            case "featured":
            default:
                // Featured items first, then sort by name
                result.sort((a, b) => {
                    if (a.isFeatured && !b.isFeatured) return -1;
                    if (!a.isFeatured && b.isFeatured) return 1;
                    return a.name.localeCompare(b.name);
                });
        }

        return result;
    }, [allProducts, filters]);

    // Get active filters for display
    const activeFilterLabels = useMemo(() => {
        const labels: string[] = [];

        // Add product type labels
        filters.productType.forEach((type) => {
            const option = filterCategories
                .find((cat) => cat.id === "productType")
                ?.options?.find((opt) => opt.id === type);
            if (option) labels.push(option.label);
        });

        // Add scent family labels
        filters.scentFamily.forEach((scent) => {
            labels.push(scent);
        });

        // Add concentration labels
        filters.concentration.forEach((conc) => {
            const option = filterCategories
                .find((cat) => cat.id === "concentration")
                ?.options?.find((opt) => opt.id === conc);
            if (option) labels.push(option.label);
        });

        // Add price range if it's not the default
        if (
            filters.priceRange[0] > minPrice ||
            filters.priceRange[1] < maxPrice
        ) {
            labels.push(
                `$${filters.priceRange[0]} - $${filters.priceRange[1]}`
            );
        }

        return labels;
    }, [filters, filterCategories, minPrice, maxPrice]);

    // Pagination
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    // Page change handler
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Handle filter removal
    const removeFilter = (filter: string) => {
        // Find which filter category this belongs to
        const productTypeOption = filterCategories
            .find((cat) => cat.id === "productType")
            ?.options?.find((opt) => opt.label === filter);

        if (productTypeOption) {
            toggleArrayFilter("productType", productTypeOption.id);
            return;
        }

        // Check if it's a scent family
        if (filters.scentFamily.includes(filter)) {
            toggleArrayFilter("scentFamily", filter);
            return;
        }

        // Check if it's a concentration
        const concentrationOption = filterCategories
            .find((cat) => cat.id === "concentration")
            ?.options?.find((opt) => opt.label === filter);

        if (concentrationOption) {
            toggleArrayFilter("concentration", concentrationOption.id);
            return;
        }

        // Check if it's a price range
        if (filter.startsWith("$")) {
            handleFilterChange("priceRange", [minPrice, maxPrice]);
            return;
        }
    };

    return (
        <div className="bg-neutral-50 min-h-screen">
            {/* Page Header */}
            <div className="bg-black text-white py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-light text-center">
                        ALL FRAGRANCES
                    </h1>
                    <p className="text-neutral-400 text-center mt-2 max-w-2xl mx-auto">
                        Discover our complete collection of handcrafted
                        fragrances, from traditional attars to modern perfume
                        oils.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-16">
                {/* Mobile Filter Button */}
                <div className="md:hidden flex justify-between items-center mb-4">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        <Filter className="h-4 w-4" />
                        Filter & Sort
                    </Button>
                    <span className="text-sm text-neutral-500">
                        {totalProducts} Results
                    </span>
                </div>

                {/* Active Filters */}
                {activeFilterLabels.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {activeFilterLabels.map((filter) => (
                            <Badge
                                key={filter}
                                variant="secondary"
                                className="px-3 py-1"
                            >
                                {filter}
                                <button
                                    onClick={() => removeFilter(filter)}
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
                    {/* Sidebar Filters - Desktop */}
                    <div className="hidden md:block w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-md shadow-sm border border-neutral-200 sticky top-4">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-medium text-lg">
                                    Filter & Sort
                                </h2>
                                <span className="text-sm text-neutral-500">
                                    {totalProducts} Results
                                </span>
                            </div>

                            {filterCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="border-t border-neutral-200 py-4"
                                >
                                    <button
                                        className="w-full flex justify-between items-center"
                                        onClick={() =>
                                            toggleFilter(category.id)
                                        }
                                    >
                                        <span className="font-medium text-sm">
                                            {category.name}
                                        </span>
                                        {expandedFilters.includes(
                                            category.id
                                        ) ? (
                                            <ChevronUp className="h-4 w-4 text-neutral-500" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 text-neutral-500" />
                                        )}
                                    </button>

                                    {expandedFilters.includes(category.id) && (
                                        <div className="mt-3 pl-1">
                                            {category.id === "sort" ? (
                                                <RadioGroup
                                                    value={filters.sort}
                                                    onValueChange={(value) =>
                                                        handleFilterChange(
                                                            "sort",
                                                            value
                                                        )
                                                    }
                                                    className="space-y-2"
                                                >
                                                    {category.options?.map(
                                                        (option) => (
                                                            <div
                                                                key={option.id}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <RadioGroupItem
                                                                    value={
                                                                        option.id
                                                                    }
                                                                    id={
                                                                        option.id
                                                                    }
                                                                />
                                                                <Label
                                                                    htmlFor={
                                                                        option.id
                                                                    }
                                                                    className="text-sm"
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </Label>
                                                            </div>
                                                        )
                                                    )}
                                                </RadioGroup>
                                            ) : category.id === "price" ? (
                                                <div className="px-1 pt-6 pb-2">
                                                    <Slider
                                                        min={minPrice}
                                                        max={maxPrice}
                                                        step={1}
                                                        value={
                                                            filters.priceRange
                                                        }
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            handleFilterChange(
                                                                "priceRange",
                                                                value
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
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    {category.options?.map(
                                                        (option) => (
                                                            <div
                                                                key={option.id}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <Checkbox
                                                                    id={
                                                                        option.id
                                                                    }
                                                                    checked={
                                                                        category.id ===
                                                                        "productType"
                                                                            ? filters.productType.includes(
                                                                                  option.id
                                                                              )
                                                                            : category.id ===
                                                                              "scentFamily"
                                                                            ? filters.scentFamily.includes(
                                                                                  option.label
                                                                              )
                                                                            : category.id ===
                                                                              "concentration"
                                                                            ? filters.concentration.includes(
                                                                                  option.label
                                                                              )
                                                                            : false
                                                                    }
                                                                    onCheckedChange={(
                                                                        checked
                                                                    ) => {
                                                                        if (
                                                                            category.id ===
                                                                            "productType"
                                                                        ) {
                                                                            toggleArrayFilter(
                                                                                "productType",
                                                                                option.id
                                                                            );
                                                                        } else if (
                                                                            category.id ===
                                                                            "scentFamily"
                                                                        ) {
                                                                            toggleArrayFilter(
                                                                                "scentFamily",
                                                                                option.label
                                                                            );
                                                                        } else if (
                                                                            category.id ===
                                                                            "concentration"
                                                                        ) {
                                                                            toggleArrayFilter(
                                                                                "concentration",
                                                                                option.label
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                                <Label
                                                                    htmlFor={
                                                                        option.id
                                                                    }
                                                                    className="text-sm"
                                                                >
                                                                    {
                                                                        option.label
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
                    </div>

                    {/* Mobile Filters - Slide-in panel */}
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
                                    {filterCategories.map((category) => (
                                        <div
                                            key={category.id}
                                            className="border-b border-neutral-200 py-4"
                                        >
                                            <button
                                                className="w-full flex justify-between items-center"
                                                onClick={() =>
                                                    toggleFilter(category.id)
                                                }
                                            >
                                                <span className="font-medium text-sm">
                                                    {category.name}
                                                </span>
                                                {expandedFilters.includes(
                                                    category.id
                                                ) ? (
                                                    <ChevronUp className="h-4 w-4 text-neutral-500" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4 text-neutral-500" />
                                                )}
                                            </button>

                                            {expandedFilters.includes(
                                                category.id
                                            ) && (
                                                <div className="mt-3 pl-1">
                                                    {category.id === "sort" ? (
                                                        <RadioGroup
                                                            value={filters.sort}
                                                            onValueChange={(
                                                                value
                                                            ) =>
                                                                handleFilterChange(
                                                                    "sort",
                                                                    value
                                                                )
                                                            }
                                                            className="space-y-2"
                                                        >
                                                            {category.options?.map(
                                                                (option) => (
                                                                    <div
                                                                        key={
                                                                            option.id
                                                                        }
                                                                        className="flex items-center space-x-2"
                                                                    >
                                                                        <RadioGroupItem
                                                                            value={
                                                                                option.id
                                                                            }
                                                                            id={`mobile-${option.id}`}
                                                                        />
                                                                        <Label
                                                                            htmlFor={`mobile-${option.id}`}
                                                                            className="text-sm"
                                                                        >
                                                                            {
                                                                                option.label
                                                                            }
                                                                        </Label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </RadioGroup>
                                                    ) : category.id ===
                                                      "price" ? (
                                                        <div className="px-1 pt-6 pb-2">
                                                            <Slider
                                                                min={minPrice}
                                                                max={maxPrice}
                                                                step={1}
                                                                value={
                                                                    filters.priceRange
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    handleFilterChange(
                                                                        "priceRange",
                                                                        value
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
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {category.options?.map(
                                                                (option) => (
                                                                    <div
                                                                        key={
                                                                            option.id
                                                                        }
                                                                        className="flex items-center space-x-2"
                                                                    >
                                                                        <Checkbox
                                                                            id={`mobile-${option.id}`}
                                                                            checked={
                                                                                category.id ===
                                                                                "productType"
                                                                                    ? filters.productType.includes(
                                                                                          option.id
                                                                                      )
                                                                                    : category.id ===
                                                                                      "scentFamily"
                                                                                    ? filters.scentFamily.includes(
                                                                                          option.label
                                                                                      )
                                                                                    : category.id ===
                                                                                      "concentration"
                                                                                    ? filters.concentration.includes(
                                                                                          option.label
                                                                                      )
                                                                                    : false
                                                                            }
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                if (
                                                                                    category.id ===
                                                                                    "productType"
                                                                                ) {
                                                                                    toggleArrayFilter(
                                                                                        "productType",
                                                                                        option.id
                                                                                    );
                                                                                } else if (
                                                                                    category.id ===
                                                                                    "scentFamily"
                                                                                ) {
                                                                                    toggleArrayFilter(
                                                                                        "scentFamily",
                                                                                        option.label
                                                                                    );
                                                                                } else if (
                                                                                    category.id ===
                                                                                    "concentration"
                                                                                ) {
                                                                                    toggleArrayFilter(
                                                                                        "concentration",
                                                                                        option.label
                                                                                    );
                                                                                }
                                                                            }}
                                                                        />
                                                                        <Label
                                                                            htmlFor={`mobile-${option.id}`}
                                                                            className="text-sm"
                                                                        >
                                                                            {
                                                                                option.label
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

                    {/* Product Grid */}
                    <div className="flex-1">
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
                                        price={product.price}
                                        tags={product.tags.slice(0, 3)}
                                        image={product.image}
                                        size={product.size[0]}
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
                                            const pageNumber = i + 1;
                                            // Show current page, first, last, and pages around current
                                            if (
                                                pageNumber === 1 ||
                                                pageNumber === totalPages ||
                                                (pageNumber >=
                                                    currentPage - 1 &&
                                                    pageNumber <=
                                                        currentPage + 1)
                                            ) {
                                                return (
                                                    <PaginationItem
                                                        key={pageNumber}
                                                    >
                                                        <PaginationLink
                                                            isActive={
                                                                pageNumber ===
                                                                currentPage
                                                            }
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    pageNumber
                                                                )
                                                            }
                                                        >
                                                            {pageNumber}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                );
                                            }
                                            // Show ellipsis for gaps
                                            if (
                                                (pageNumber === 2 &&
                                                    currentPage > 3) ||
                                                (pageNumber ===
                                                    totalPages - 1 &&
                                                    currentPage <
                                                        totalPages - 2)
                                            ) {
                                                return (
                                                    <PaginationItem
                                                        key={pageNumber}
                                                    >
                                                        <span className="px-4 py-2">
                                                            ...
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
                    </div>
                </div>
            </div>
        </div>
    );
}
