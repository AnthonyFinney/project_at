"use client";

import {
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
    KeyboardEvent,
} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import type { ProductType, VariantType } from "@/lib/schemas";
import useSWR from "swr";
import Spinner from "../spinner";

// Extend ProductType if needed for additional properties (e.g., sales)
interface DisplayProductType extends ProductType {
    sales?: number;
}

interface ProductsTableProps {
    searchQuery: string;
}

// Define a fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ProductsTable({ searchQuery }: ProductsTableProps) {
    const router = useRouter();
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

    // Use SWR to fetch products data
    const { data, error, mutate } = useSWR(`/api/products`, fetcher, {
        revalidateOnFocus: true, // Optional: revalidate data when the window regains focus
    });

    // If there's an error, show an error message
    if (error) {
        return <div>Error loading products</div>;
    }

    // If data hasn't loaded yet, show a loading state
    if (!data) {
        return <Spinner />;
    }

    // Assume the API returns { success: boolean, data: DisplayProductType[] }
    const products =
        data.success && data.data ? (data.data as DisplayProductType[]) : [];

    // Compute filteredProducts based on the searchQuery
    const filteredProducts = searchQuery.trim()
        ? products.filter((product) => {
              const q = searchQuery.toLowerCase();
              return (
                  product.name.toLowerCase().includes(q) ||
                  product.category?.name.toLowerCase().includes(q) ||
                  product.tags?.some((tag) => tag.toLowerCase().includes(q))
              );
          })
        : products;

    const handleEdit = (productId: string) => {
        router.push(`/admin/products/${productId}/edit`);
    };

    const handleDelete = (productId: string) => {
        setDeleteProductId(productId);
    };

    const confirmDelete = async () => {
        if (!deleteProductId) return;

        try {
            const res = await fetch(
                `${window.location.origin}/api/products/${deleteProductId}`,
                {
                    method: "DELETE",
                }
            );

            const result = await res.json();

            if (!res.ok || !result.success) {
                console.error(
                    "Delete failed:",
                    result.error || "Unknown error"
                );
                return;
            }

            // Revalidate the data after deletion
            mutate();
            setDeleteProductId(null);
        } catch (error) {
            console.error("Error calling delete API:", error);
        }
    };

    // Helper function: Calculate the price range from an array of variants.
    const getPriceRange = (variants: VariantType[]): string => {
        if (!variants || variants.length === 0) return "N/A";
        const prices = variants.map((v) => v.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        return minPrice === maxPrice
            ? `£${minPrice.toFixed(2)}`
            : `£${minPrice.toFixed(2)} - £${maxPrice.toFixed(2)}`;
    };

    // Helper function: Calculate total stock from an array of variants.
    const getTotalStock = (variants: VariantType[]): number => {
        if (!variants || variants.length === 0) return 0;
        return variants.reduce(
            (total, variant) => total + (variant.stock || 0),
            0
        );
    };

    return (
        <>
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Category
                            </TableHead>
                            <TableHead>Price Range</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Total Stock
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Variants
                            </TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    No products found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-neutral-100 relative flex-shrink-0">
                                                <Image
                                                    src={
                                                        product.image ||
                                                        "/placeholder.svg?height=40&width=40"
                                                    }
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain p-1"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-medium flex items-center gap-1">
                                                    {product.name}
                                                    {product.isFeatured && (
                                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    )}
                                                </div>
                                                <div className="text-xs text-muted-foreground sm:hidden">
                                                    {product.category.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground md:hidden">
                                                    Stock:{" "}
                                                    {getTotalStock(
                                                        product.variants
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {product.category.name}
                                    </TableCell>
                                    <TableCell>
                                        {getPriceRange(product.variants)}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                getTotalStock(
                                                    product.variants
                                                ) > 20
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {getTotalStock(product.variants) > 0
                                                ? `${getTotalStock(
                                                      product.variants
                                                  )} in stock`
                                                : "Out of stock"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            {product.variants.length}{" "}
                                            {product.variants.length === 1
                                                ? "variant"
                                                : "variants"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleEdit(
                                                            product.id as string
                                                        )
                                                    }
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDelete(
                                                            product.id as string
                                                        )
                                                    }
                                                    className="text-red-600"
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog
                open={!!deleteProductId}
                onOpenChange={() => setDeleteProductId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the product from your store.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
