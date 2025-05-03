// src/lib/validation.ts
import { z } from "zod";

const CustomerInfoSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
});

const AddressSchema = z.object({
    address: z.string(),
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
    district: z.string().optional(),
    isDefault: z.boolean().optional(),
});

export const FormSchema = z.object({
    customer: CustomerInfoSchema,
    shippingAddress: AddressSchema,
    notes: z.string().optional(),
});

export type FormValues = z.infer<typeof FormSchema>;
