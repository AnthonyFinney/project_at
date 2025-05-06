import { clsx, type ClassValue } from "clsx";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ProductType } from "./schemas";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function userAvatar(seed: string): string {
    const avatar = useMemo(() => {
        return createAvatar(lorelei, {
            seed,
            size: 128,
            radius: 50,
        }).toDataUri();
    }, [seed]);

    return avatar;
}

export function saltAndHashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export async function comparePassword(userPassword: string, hash: string) {
    return bcrypt.compare(userPassword, hash);
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const catchError = (error: unknown, message: string) => {
    console.error(message, error);
    return NextResponse.json(
        {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            details: typeof error === "string" ? error : JSON.stringify(error),
        },
        { status: 500 }
    );
};

export const getIdFromUrl = (req: Request): string => {
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/");
    const id = pathParts[pathParts.length - 1];
    return id;
};

export const formatPrice = (val: number) => {
    return new Intl.NumberFormat("bn-BD-u-nu-latn", {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "symbol",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(val);
};

export const getProductPrice = (p: ProductType) =>
    Math.min(...p.variants.map((v: { price: any }) => v.price));
