import { OrderType } from "@/lib/schemas";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

interface OrderResponse {
    success: boolean;
    data: OrderType;
}

export function useOrder(id?: string) {
    const shouldFetch = typeof id === "string" && id.length > 0;
    const { data, error, isLoading, mutate } = useSWR<OrderResponse>(
        shouldFetch ? `/api/orders/${id}` : null,
        fetcher,
        {
            revalidateOnFocus: true,
        }
    );

    return {
        order: data?.success ? data.data : null,
        isLoading,
        error,
        mutate,
    };
}
