import { z } from "zod";
import { ObjectId } from "mongodb";

// Handle MongoDB ObjectId as a string
const ObjectIdSchema = z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});

// 🏷 Promotion Schema
export const PromotionSchema = z.object({
    type: z.array(z.string()),
    details: z.string(),
});

// 🗂 Category Schema
export const CategorySchema = z.object({
    id: ObjectIdSchema.optional(),
    name: z.string(),
    description: z.string(),
    promotion: PromotionSchema,
});

export const VariantSchema = z.object({
    size: z.string(), // e.g., "1", "2", "XL", etc.
    price: z.number(), // e.g., 100, 200, etc.
    // Optionally, you can include stock per variant if needed:
    stock: z.number().optional(),
});

// 📦 Product Schema
export const ProductSchema = z.object({
    id: ObjectIdSchema.optional(),
    name: z.string(),
    description: z.string(),
    variants: z.array(VariantSchema),
    category: CategorySchema,
    isFeatured: z.boolean(),
    tags: z.array(z.string()),
    image: z.string().url(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

// 🛒 Cart Item Schema
export const CartItemSchema = z.object({
    productId: ObjectIdSchema,
    size: z.string(),
    quantity: z.number().min(1),
});

// 📬 Address Schema
export const AddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
    district: z.string().optional(),
    isDefault: z.boolean().optional(),
});

// 👤 User Schema
export const UserSchema = z.object({
    id: ObjectIdSchema.optional(),
    name: z.string(),
    email: z.string().email(),
    passwordHash: z.string().optional(),
    phone: z.string().optional(),
    provider: z.enum(["credentials", "google"]).default("credentials"),
    providerId: z.string().optional(),
    isVerified: z.boolean().default(false),
    role: z.enum(["user", "admin"]).default("user"),
    addresses: z.array(AddressSchema).optional(),
    cart: z.array(CartItemSchema).optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

// 🔐 Session User Schema
export const SessionUserSchema = z.object({
    id: ObjectIdSchema,
    name: z.string().optional(),
    email: z.string().email(),
    role: z.enum(["user", "admin"]),
});

// 📞 Customer Info Schema
export const CustomerInfoSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
});

// 🧾 Order Item Schema
export const OrderItemSchema = z.object({
    productId: ObjectIdSchema,
    name: z.string(),
    price: z.number(),
    size: z.string(),
    quantity: z.number(),
    image: z.string().url(),
});

// 📦 Order Schema
export const OrderSchema = z.object({
    id: ObjectIdSchema.optional(),
    userId: ObjectIdSchema.optional(),
    customer: CustomerInfoSchema,
    items: z.array(OrderItemSchema),
    totalAmount: z.number(),
    status: z.enum([
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "failed",
        "returned",
    ]),
    paymentStatus: z.enum(["unpaid", "paid", "refunded"]),
    paymentMethod: z.literal("sslcommerz"),
    shippingAddress: AddressSchema,
    notes: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

// 🌟 Review Schema
export const ReviewSchema = z.object({
    id: ObjectIdSchema.optional(),
    productId: ObjectIdSchema,
    userId: ObjectIdSchema,
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type ReviewType = z.infer<typeof ReviewSchema>;
export type OrderType = z.infer<typeof OrderSchema>;
export type OrderItemType = z.infer<typeof OrderItemSchema>;
export type CustomerInfoType = z.infer<typeof CustomerInfoSchema>;
export type SessionUserType = z.infer<typeof SessionUserSchema>;
export type UserType = z.infer<typeof UserSchema>;
export type AddressType = z.infer<typeof AddressSchema>;
export type CartItemType = z.infer<typeof CartItemSchema>;
export type ProductType = z.infer<typeof ProductSchema>;
export type CategoryType = z.infer<typeof CategorySchema>;
export type PromotionType = z.infer<typeof PromotionSchema>;
export type VariantType = z.infer<typeof VariantSchema>;
