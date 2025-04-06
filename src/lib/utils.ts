import { clsx, type ClassValue } from "clsx";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function userAvatar(): string {
    const avatar = useMemo(() => {
        const seed: string = crypto.randomUUID.toString();

        return createAvatar(lorelei, {
            seed,
            size: 128,
            radius: 50,
        }).toDataUri();
    }, []);

    return avatar;
}
