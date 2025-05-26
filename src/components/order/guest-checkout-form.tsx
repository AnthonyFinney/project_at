"use client";

import { Contact } from "./contact";
import { Button } from "../ui/button";
import { BagSummary } from "./bag-summary";
import { DeliveryAddress } from "./delivery-address";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { CartItemType } from "@/lib/schemas";
import { FormSchema, FormValues } from "@/lib/validation";
import { Textarea } from "../ui/textarea";

interface GuestCheckoutFormProps {
    items: CartItemType[];
    clearCart?: () => void;
}

export const GuestCheckoutForm: React.FC<GuestCheckoutFormProps> = ({
    items,
    clearCart,
}) => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            customer: { name: "", phone: "", email: "" },
            shippingAddress: {
                address: "",
                street: "",
                city: "",
                postalCode: "",
                country: "",
                district: "",
            },
            notes: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        const totalAmount = items.reduce(
            (sum, { price, quantity }) => sum + price * quantity,
            0
        );

        const orderItems = items.map(
            ({ productId, name, price, size, quantity, image }) => ({
                productId,
                name,
                price,
                size,
                quantity,
                image,
            })
        );

        const payload = {
            customer: data.customer,
            shippingAddress: data.shippingAddress,
            items: orderItems,
            totalAmount,
            notes: data.notes,
        };

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            const json = await res.json();
            clearCart?.();

            let orderId = json.data.id;

            router.push(`/order/thank-you?orderId=${orderId}`);
        } else {
            const err = await res.json();
            console.error(`Order failed: ${err}`);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Guest Checkout</h1>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <BagSummary items={items} />
                <Contact
                    register={(field) => register(`customer.${field}` as const)}
                    errors={errors.customer}
                />
                <DeliveryAddress
                    register={(field) =>
                        register(`shippingAddress.${field}` as const)
                    }
                    errors={errors.shippingAddress}
                />

                <section className="mb-8">
                    <h3 className="mb-2 text-base font-medium">Order Notes</h3>
                    <Textarea
                        {...register("notes")}
                        placeholder="Any special instructions for delivery"
                        rows={3}
                    />
                    {errors.notes && (
                        <p className="text-red-600 text-sm">
                            {errors.notes.message}
                        </p>
                    )}
                </section>
                <div className="text-right">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Processing.." : "Place Order"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
