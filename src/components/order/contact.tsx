"use client";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { Phone } from "lucide-react";
import { Input } from "../ui/input";
import { CustomerInfoType } from "@/lib/schemas";

interface ContactProps {
    register: (field: keyof CustomerInfoType) => UseFormRegisterReturn;
    errors?: FieldErrors<CustomerInfoType>;
}

export const Contact: React.FC<ContactProps> = ({ register, errors }) => (
    <section className="mb-8">
        <h3 className="mb-4 text-base font-medium">Contact</h3>
        <div className="space-y-4">
            <div>
                <Input {...register("name")} placeholder="Name" />
                {errors?.name && (
                    <p className="text-red-600 text-sm">
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div>
                <Input
                    {...register("email")}
                    placeholder="Email"
                    type="email"
                />
                {errors?.email && (
                    <p className="text-red-600 text-sm">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="flex items-center">
                <span className="mr-2">
                    <Phone />
                </span>
                <div className="flex-1">
                    <Input {...register("phone")} placeholder="Phone" />
                    {errors?.phone && (
                        <p className="text-red-600 text-sm">
                            {errors.phone.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    </section>
);
