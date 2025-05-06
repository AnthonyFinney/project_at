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
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { PaymentStatusBadge } from "@/components/admin/payment-status-badge";
import type { OrderType } from "@/lib/schemas";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Spinner from "../spinner";

interface OrdersTableProps {
    searchQuery: string;
    statusFilter: string;
}

export function OrdersTable({ searchQuery, statusFilter }: OrdersTableProps) {
    const router = useRouter();

    const { data, error, mutate, isLoading } = useSWR<{
        success: boolean;
        data: OrderType[];
    }>(`/api/orders`, fetcher, {
        revalidateOnFocus: true,
    });

    if (error) {
        return (
            <div className="p-4 text-center text-red-500">
                {error.message || "An error occurred."}
            </div>
        );
    }

    if (isLoading) {
        return <Spinner />;
    }

    const orders = data?.success ? data.data : [];

    let filteredOrders = orders
        .filter((o) => statusFilter === "all" || o.status === statusFilter)
        .filter((o) => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
                o.id?.toLowerCase().includes(q) ||
                o.customer.name.toLowerCase().includes(q) ||
                o.customer.email.toLowerCase().includes(q)
            );
        });

    const handleViewOrder = (orderId: string) => {
        router.push(`/admin/orders/${orderId}`);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="rounded-md border overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead className="hidden sm:table-cell">
                            Date
                        </TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden sm:table-cell">
                            Total
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Status
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                            Payment
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="text-center py-8 text-muted-foreground"
                            >
                                No orders found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <div>
                                        {order.id}
                                        <div className="text-xs text-muted-foreground sm:hidden">
                                            {formatDate(
                                                order.createdAt as string
                                            )}
                                        </div>
                                        <div className="sm:hidden mt-1">
                                            <OrderStatusBadge
                                                status={order.status}
                                            />
                                        </div>
                                        <div className="text-xs font-medium sm:hidden mt-1">
                                            £{order.totalAmount.toFixed(2)}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {formatDate(order.createdAt as string)}
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div className="font-medium">
                                            {order.customer.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {order.customer.email}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    £{order.totalAmount.toFixed(2)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <OrderStatusBadge status={order.status} />
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                    <PaymentStatusBadge
                                        status={order.paymentStatus}
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleViewOrder(order.id as string)
                                        }
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
