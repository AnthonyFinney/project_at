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
import { mockOrders } from "@/lib/mock-data";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";

export function RecentOrdersTable() {
    const router = useRouter();
    // Get only the 5 most recent orders
    const recentOrders = [...mockOrders]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

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
                            Customer
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Status
                        </TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <div>
                                    #{order.orderNumber}
                                    <div className="text-xs text-muted-foreground sm:hidden">
                                        {order.customer.name}
                                    </div>
                                    <div className="md:hidden mt-1">
                                        <OrderStatusBadge
                                            status={order.status}
                                        />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {order.customer.name}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <OrderStatusBadge status={order.status} />
                            </TableCell>
                            <TableCell className="text-right">
                                £{order.total.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="p-4 text-center">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/admin/orders")}
                >
                    View All Orders
                </Button>
            </div>
        </div>
    );
}
