"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    CheckCircle,
    Package,
    Truck,
    Mail,
    Phone,
    Calendar,
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Spinner from "@/components/spinner";
import { useOrder } from "@/hooks/useOrder";
import { formatPrice, getShippingPrice } from "@/lib/utils";

export default function ThankYouPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    if (orderId === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
                    <p className="text-gray-600 mb-6">
                        We couldn't find the order you're looking for.
                    </p>
                    <Button asChild>
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const { order, error, isLoading } = useOrder(orderId);

    if (isLoading) {
        return <Spinner />;
    }

    if (error || order === null) {
        const msg =
            error instanceof Error ? error.message : "An error occurred.";

        return <div className="p-4 text-center text-red-500">{msg}</div>;
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
                    <p className="text-gray-600 mb-6">
                        We couldn't find the order you're looking for.
                    </p>
                    <Button asChild>
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const subtotal = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = getShippingPrice();
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Success Header */}
            <div className="bg-green-50 border-b border-green-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-green-800 mb-2">
                            Thank You for Your Order!
                        </h1>
                        <p className="text-green-700 text-lg">
                            Your order has been successfully placed and is being
                            processed.
                        </p>
                        <div className="mt-4 inline-flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                            <span className="text-sm text-gray-600 mr-2">
                                Order Number:
                            </span>
                            <span className="font-mono font-bold text-lg">
                                #{order.id}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Details */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Order Receipt */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">
                                        Order Receipt
                                    </h2>
                                    <Badge
                                        variant="secondary"
                                        className="bg-green-100 text-green-800"
                                    >
                                        {order.status.charAt(0).toUpperCase() +
                                            order.status.slice(1)}
                                    </Badge>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-4 mb-6">
                                    {order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-4 p-4 border rounded-lg"
                                        >
                                            <div className="w-16 h-16 relative flex-shrink-0">
                                                <Image
                                                    src={
                                                        item.image ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                    sizes="64px"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Size: {item.size}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">
                                                    {formatPrice(
                                                        item.price *
                                                            item.quantity
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {formatPrice(item.price)}{" "}
                                                    each
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-6" />

                                {/* Order Summary */}
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>{formatPrice(shipping)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>£{formatPrice(total)}</span>
                                    </div>
                                </div>

                                {order.notes && (
                                    <>
                                        <Separator className="my-6" />
                                        <div>
                                            <h3 className="font-medium mb-2">
                                                Order Notes
                                            </h3>
                                            <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                                                {order.notes}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Order Information */}
                        <div className="space-y-6">
                            {/* Order Status */}
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="font-bold mb-4 flex items-center">
                                    <Package className="h-5 w-5 mr-2" />
                                    Order Status
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                        <span className="text-sm">
                                            Order Confirmed
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                                        <span className="text-sm text-gray-500">
                                            Processing
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                                        <span className="text-sm text-gray-500">
                                            Shipped
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                                        <span className="text-sm text-gray-500">
                                            Delivered
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Information */}
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="font-bold mb-4 flex items-center">
                                    <Truck className="h-5 w-5 mr-2" />
                                    Shipping Address
                                </h3>
                                <div className="text-sm space-y-1">
                                    <p className="font-medium">
                                        {order.customer.name}
                                    </p>
                                    <p>{order.shippingAddress.address}</p>
                                    {order.shippingAddress.street && (
                                        <p>{order.shippingAddress.street}</p>
                                    )}
                                    <p>
                                        {order.shippingAddress.city},{" "}
                                        {order.shippingAddress.postalCode}
                                    </p>
                                    {order.shippingAddress.district && (
                                        <p>{order.shippingAddress.district}</p>
                                    )}
                                    <p>{order.shippingAddress.country}</p>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="font-bold mb-4 flex items-center">
                                    <Mail className="h-5 w-5 mr-2" />
                                    Contact Information
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center">
                                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>{order.customer.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>{order.customer.phone}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Date */}
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="font-bold mb-4 flex items-center">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    Order Date
                                </h3>
                                <div className="flex items-center text-sm">
                                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                    <span>
                                        {new Date(
                                            order.createdAt!
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 text-center space-y-4">
                        <p className="text-gray-600">
                            A confirmation email has been sent to{" "}
                            <strong>{order.customer.email}</strong>
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Button asChild variant="outline">
                                <Link href="/products">Continue Shopping</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/">Return to Home</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
