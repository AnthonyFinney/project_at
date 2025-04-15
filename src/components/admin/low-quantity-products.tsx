"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductType } from "@/lib/schemas";

export function LowQuantityProducts() {
    const router = useRouter();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const json = await res.json();

                if (!json.success) throw new Error(json.error || "Fetch error");
                setProducts(json.data);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getTotalStock = (product: ProductType): number => {
        if (!product.variants || product.variants.length === 0) {
            return 0;
        }
        return product.variants.reduce(
            (total, variant) => total + (variant.stock || 0),
            0
        );
    };

    const getPriceRange = (product: ProductType): string => {
        if (!product.variants || product.variants.length === 0) {
            return "N/A";
        }
        const prices = product.variants.map((variant) => variant.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        return minPrice === maxPrice
            ? `£${minPrice.toFixed(2)}`
            : `£${minPrice.toFixed(2)} - £${maxPrice.toFixed(2)}`;
    };

    const getStockStatusClass = (totalStock: number): string => {
        if (totalStock < 5) return "bg-red-100 text-red-800";
        if (totalStock < 10) return "bg-orange-100 text-orange-800";
        return "bg-yellow-100 text-yellow-800";
    };

    const lowStockProducts: ProductType[] = products
        .filter((product) => {
            const totalStock = getTotalStock(product);
            return totalStock > 0 && totalStock < 15;
        })
        .sort((a, b) => getTotalStock(a) - getTotalStock(b))
        .slice(0, 5);

    return (
        <div className="rounded-md border overflow-x-auto">
            {loading ? (
                <div className="p-4 text-center text-muted-foreground">
                    Loading...
                </div>
            ) : error ? (
                <div className="p-4 text-center text-red-500">{error}</div>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Price
                                </TableHead>
                                <TableHead className="text-right">
                                    Stock
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lowStockProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="text-center py-6 text-muted-foreground"
                                    >
                                        No low stock products found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                lowStockProducts.map((product) => {
                                    const totalStock = getTotalStock(product);
                                    return (
                                        <TableRow
                                            key={
                                                product.id?.toString() ||
                                                product.name
                                            }
                                        >
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
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium flex items-center gap-1">
                                                            {product.name}
                                                            {totalStock < 5 && (
                                                                <AlertTriangle className="h-3 w-3 text-red-500" />
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {product.category
                                                                ?.name ||
                                                                "Uncategorized"}
                                                        </div>
                                                        <div className="text-xs font-medium sm:hidden">
                                                            {getPriceRange(
                                                                product
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                {getPriceRange(product)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${getStockStatusClass(
                                                        totalStock
                                                    )}`}
                                                >
                                                    {totalStock} left
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                    <div className="p-4 text-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push("/admin/products")}
                        >
                            View All Products
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
