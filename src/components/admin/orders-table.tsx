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

interface OrdersTableProps {
    searchQuery: string;
    statusFilter: string;
}

interface Order {
    id: string;
    orderNumber: string;
    date: string;
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    items: {
        name: string;
        sku: string;
        price: number;
        size: string;
        quantity: number;
        image: string;
    }[];
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
    status: string;
    shippingAddress: {
        line1: string;
        line2: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
}

export function OrdersTable({ searchQuery, statusFilter }: OrdersTableProps) {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // Filter orders based on search query and status
        let filteredOrders = mockOrders;

        if (searchQuery) {
            filteredOrders = filteredOrders.filter(
                (order) =>
                    order.orderNumber
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

    return (
        <div className="rounded-md border overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order</TableHead>
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
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
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
                                        #{order.orderNumber}
                                        <div className="text-xs text-muted-foreground sm:hidden">
                                            {new Date(
                                                order.date
                                            ).toLocaleDateString()}
                                        </div>
                                        <div className="sm:hidden mt-1">
                                            <OrderStatusBadge
                                                status={order.status}
                                            />
                                        </div>
                                        <div className="text-xs font-medium sm:hidden mt-1">
                                            £{order.total.toFixed(2)}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {new Date(order.date).toLocaleDateString()}
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
                                    £{order.total.toFixed(2)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <OrderStatusBadge status={order.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleViewOrder(order.id)
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
