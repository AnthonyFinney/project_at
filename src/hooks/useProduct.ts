import { ProductType } from "@/lib/schemas";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

interface ProductResponse {
    success: boolean;
    data: ProductType;
}

export function useProduct(id?: string) {
    const shouldFetch = typeof id === "string" && id.length > 0;
    const { data, error, isLoading, mutate } = useSWR<ProductResponse>(
        shouldFetch ? `/api/products/${id}` : null,
        fetcher,
        {
            revalidateOnFocus: true,
        }
    );

    return {
        product: data?.success ? data.data : null,
        isLoading,
        error,
        mutate,
    };
}
