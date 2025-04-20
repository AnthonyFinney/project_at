"use client";

import { useState, useEffect } from "react";
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
import { mockOrders } from "@/lib/mock-data";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { PaymentStatusBadge } from "@/components/admin/payment-status-badge";
import type { OrderType } from "@/lib/schemas";

interface OrdersTableProps {
    searchQuery: string;
    statusFilter: string;
}

export function OrdersTable({ searchQuery, statusFilter }: OrdersTableProps) {
    const router = useRouter();
    const [orders, setOrders] = useState<OrderType[]>([]);

    useEffect(() => {
        // Filter orders based on search query and status
        let filteredOrders = mockOrders;

        if (searchQuery) {
            filteredOrders = filteredOrders.filter(
                (order) =>
                    (order.id || "")
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    order.customer.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    order.customer.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter && statusFilter !== "all") {
            filteredOrders = filteredOrders.filter(
                (order) => order.status === statusFilter
            );
        }

        setOrders(filteredOrders);
    }, [searchQuery, statusFilter]);

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
                        orders.map((order) => (
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
