import { ProductType } from "@/lib/schemas";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

interface ProductsResponse {
    success: boolean;
    data: ProductType[];
}

export function useProducts() {
    const { data, error, mutate, isLoading } = useSWR<ProductsResponse>(
        "/api/products",
        fetcher,
        { revalidateOnFocus: true }
    );

    return {
        products: data?.success ? data.data : [],
        error,
        mutate,
        isLoading,
    };
}
