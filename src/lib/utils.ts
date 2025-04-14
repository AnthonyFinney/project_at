import { clsx, type ClassValue } from "clsx";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import bcrypt from "bcryptjs";

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
