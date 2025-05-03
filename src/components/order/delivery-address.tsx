"use client";

import { Input } from "@/components/ui/input";
import {
    UseFormRegister,
    FieldErrors,
    UseFormRegisterReturn,
} from "react-hook-form";
import { AddressType } from "@/lib/schemas";

interface DeliveryAddressProps {
    register: (field: keyof AddressType) => UseFormRegisterReturn;
    errors?: FieldErrors<AddressType>;
}

export const DeliveryAddress: React.FC<DeliveryAddressProps> = ({
    register,
    errors,
}) => (
    <section className="mb-8">
        <h3 className="mb-4 text-base font-medium">Delivery Address</h3>
        <div className="space-y-4">
            <div>
                <Input {...register("address")} placeholder="Address" />
                {errors?.address && (
                    <p className="text-red-600 text-sm">
                        {errors.address.message}
                    </p>
                )}
            </div>
            <div>
                <Input {...register("street")} placeholder="Street" />
                {errors?.street && (
                    <p className="text-red-600 text-sm">
                        {errors.street.message}
                    </p>
                )}
            </div>
            <div>
                <Input {...register("city")} placeholder="City" />
                {errors?.city && (
                    <p className="text-red-600 text-sm">
                        {errors.city.message}
                    </p>
                )}
            </div>
            <div>
                <Input {...register("postalCode")} placeholder="Postal Code" />
                {errors?.postalCode && (
                    <p className="text-red-600 text-sm">
                        {errors.postalCode.message}
                    </p>
                )}
            </div>
            <div>
                <Input {...register("district")} placeholder="District" />
                {errors?.district && (
                    <p className="text-red-600 text-sm">
                        {errors.district.message}
                    </p>
                )}
            </div>
            <div>
                <Input {...register("country")} placeholder="Country" />
                {errors?.country && (
                    <p className="text-red-600 text-sm">
                        {errors.country.message}
                    </p>
                )}
            </div>
        </div>
    </section>
);
