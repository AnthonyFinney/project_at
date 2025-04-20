interface SessionUserType {
    id: string;
    name?: string;
    email: string;
    role: "user" | "admin";
}

interface AddressType {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    district?: string;
    isDefault?: boolean;
}

interface CustomerInfo {
    name: string;
    phone: string;
    email: string;
}

interface OrderItemType {
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image: string;
}

interface OrderType {
    id: string;
    userId?: string;
    customer: CustomerInfo;
    items: OrderItemType[];
    totalAmount: number;
    status:
        | "pending"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "failed"
        | "returned";
    paymentStatus: "unpaid" | "paid" | "refunded";
    paymentMethod: "sslcommerz";
    shippingAddress: AddressType;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

interface ReviewType {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    comment?: string;
    createdAt: string;
    updatedAt: string;
}
