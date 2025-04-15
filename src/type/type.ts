interface ProductType {
    id: string;
    name: string;
    description: string;
    price: number;
    size: string[];
    category: CategoryType;
    stock: number;
    isFeatured: boolean;
    tags: string[];
    image: string;
    createdAt: string;
    updatedAt: string;
}

interface ProductCardProps
    extends Pick<
        ProductType,
        "name" | "description" | "price" | "tags" | "image" | "size"
    > {
    productLink: string;
}

interface PromotionType {
    type: string[];
    details: string;
}

interface CategoryType {
    id: string;
    name: string;
    description: string;
    promotion: PromotionType;
}

interface CartItemProps {
    item: ProductType;
    onRemove: () => void;
}

interface CartItemType {
    productId: string;
    size: string;
    quantity: number;
}

interface UserType {
    id: string;
    name: string;
    email: string;
    passwordHash?: string;
    phone?: string;
    provider: "credentials" | "google";
    providerId?: string;
    isVerified: boolean;
    role: "user" | "admin";
    addresses?: AddressType[];
    cart?: CartItemType[];
    createdAt: string;
    updatedAt: string;
}

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
