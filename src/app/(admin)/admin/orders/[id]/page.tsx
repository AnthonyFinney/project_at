"use client";

import { SetStateAction, useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { useParams, useRouter } from "next/navigation";
import { mockOrders } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { PaymentStatusBadge } from "@/components/admin/payment-status-badge";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Printer } from "lucide-react";
import Image from "next/image";
import { OrderType } from "@/lib/schemas";

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params.id as string;
    const [order, setOrder] = useState<OrderType | null>(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");

    useEffect(() => {
        // In a real app, this would be an API call
        const foundOrder = mockOrders.find((o) => o.id === orderId);
        setOrder(foundOrder || null);
        if (foundOrder) {
            setStatus(foundOrder.status);
            setPaymentStatus(foundOrder.paymentStatus);
        }
        setLoading(false);
    }, [orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!order) {
        return <div>Order not found</div>;
    }

    const handleStatusChange = (newStatus: SetStateAction<string>) => {
        setStatus(newStatus);
        // In a real app, this would update the order status via API
        console.log(`Order ${orderId} status updated to ${newStatus}`);
    };

    const handlePaymentStatusChange = (newStatus: SetStateAction<string>) => {
        setPaymentStatus(newStatus);
        // In a real app, this would update the payment status via API
        console.log(`Order ${orderId} payment status updated to ${newStatus}`);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <AdminHeader
                    title={`Order ${order.id}`}
                    description={`Placed on ${formatDate(
                        order.createdAt as string
                    )}`}
                />

                <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className="sm:order-1"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Orders
                    </Button>

                    <Button variant="outline" className="sm:order-2">
                        <Printer className="mr-2 h-4 w-4" />
                        Print Order
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Order Summary */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 py-4 border-b last:border-0"
                                >
                                    <div className="w-16 h-16 bg-neutral-100 relative flex-shrink-0">
                                        <Image
                                            src={
                                                item.image ||
                                                "/placeholder.svg?height=64&width=64"
                                            }
                                            alt={item.name}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium truncate">
                                            {item.name}
                                        </div>
                                        <div className="text-sm text-neutral-500">
                                            Size: {item.size}
                                        </div>
                                        <div className="text-sm text-neutral-500">
                                            Product ID: {item.productId}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">
                                            £{item.price.toFixed(2)}
                                        </div>
                                        <div className="text-sm text-neutral-500">
                                            Qty: {item.quantity}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">
                                        Subtotal
                                    </span>
                                    <span>
                                        £{(order.totalAmount - 10).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">
                                        Shipping
                                    </span>
                                    <span>£10.00</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>£{order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Details */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span>Current Status:</span>
                                    <OrderStatusBadge status={status} />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Update Status:
                                    </label>
                                    <Select
                                        value={status}
                                        onValueChange={handleStatusChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">
                                                Pending
                                            </SelectItem>
                                            <SelectItem value="processing">
                                                Processing
                                            </SelectItem>
                                            <SelectItem value="shipped">
                                                Shipped
                                            </SelectItem>
                                            <SelectItem value="delivered">
                                                Delivered
                                            </SelectItem>
                                            <SelectItem value="cancelled">
                                                Cancelled
                                            </SelectItem>
                                            <SelectItem value="failed">
                                                Failed
                                            </SelectItem>
                                            <SelectItem value="returned">
                                                Returned
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span>Payment Status:</span>
                                    <PaymentStatusBadge
                                        status={paymentStatus}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Update Payment Status:
                                    </label>
                                    <Select
                                        value={paymentStatus}
                                        onValueChange={
                                            handlePaymentStatusChange
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select payment status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unpaid">
                                                Unpaid
                                            </SelectItem>
                                            <SelectItem value="paid">
                                                Paid
                                            </SelectItem>
                                            <SelectItem value="refunded">
                                                Refunded
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">
                                        Payment Method
                                    </h3>
                                    <p>{order.paymentMethod}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium">Contact</h3>
                                    <p>{order.customer.name}</p>
                                    <p className="break-words">
                                        {order.customer.email}
                                    </p>
                                    <p>{order.customer.phone}</p>
                                </div>

                                <div>
                                    <h3 className="font-medium">
                                        Shipping Address
                                    </h3>
                                    <p>{order.shippingAddress.street}</p>
                                    {order.shippingAddress.district && (
                                        <p>{order.shippingAddress.district}</p>
                                    )}
                                    <p>
                                        {order.shippingAddress.city},{" "}
                                        {order.shippingAddress.postalCode}
                                    </p>
                                    <p>{order.shippingAddress.country}</p>
                                </div>

                                {order.notes && (
                                    <div>
                                        <h3 className="font-medium">Notes</h3>
                                        <p>{order.notes}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
