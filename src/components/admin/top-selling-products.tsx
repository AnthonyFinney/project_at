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
import { mockProducts } from "@/lib/mock-data";

export function TopSellingProducts() {
    const router = useRouter();

    // Sort products by a mock "sales" property and take top 5
    const topProducts = [...mockProducts]
        .sort((a, b) => (b.sales || 0) - (a.sales || 0))
        .slice(0, 5);

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Sales</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {topProducts.map((product) => (
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
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            {product.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {product.brand}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>£{product.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                                {product.sales || 0}
                            </TableCell>
                        </TableRow>
                    ))}
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
        </div>
    );
}
