"use client";

import ProductCard from "@/components/product-card";
import Spinner from "@/components/spinner";
import { ProductType } from "@/lib/schemas";
import { fetcher, getProductPrice } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function Page() {
    const params = useSearchParams();
    const q = params.get("search") || "";

    const apiPath = `/api/products${
        q ? `?search=${encodeURIComponent(q)}` : ""
    }`;
    const { data, error, isLoading } = useSWR<{
        success: boolean;
        data: ProductType[];
    }>(apiPath, fetcher, {
        revalidateOnFocus: true,
    });

    const products = data?.success ? data.data : [];

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Search Results
                </h1>
                {q && (
                    <p className="mt-2 sm:mt-0 text-gray-600">
                        for{" "}
                        <span className="font-medium text-gray-900">“{q}”</span>
                    </p>
                )}
            </div>

            {/* Error */}
            {error && (
                <div className="py-12 flex justify-center">
                    <p className="text-red-500">
                        {error.message || "Something went wrong."}
                    </p>
                </div>
            )}

            {/* Loading */}
            {isLoading && (
                <div className="py-12 flex justify-center">
                    <Spinner />
                </div>
            )}

            {/* Results Grid */}
            {!isLoading && !error && (
                <>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
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
                    ) : (
                        <div className="py-20 flex flex-col items-center">
                            <p className="text-gray-500 italic mb-4">
                                No products found matching your search.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
