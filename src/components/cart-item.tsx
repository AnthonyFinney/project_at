"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export function CartItem({ item, onRemove }: CartItemProps) {
    return (
        <div className="bg-white p-4 flex gap-4 relative">
            <div className="w-24 h-24 relative flex-shrink-0">
                <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                />
            </div>

            <div className="flex-1">
                <Link
                    href={`/products/${item.id}`}
                    className="font-medium hover:underline"
                >
                    {item.name}
                </Link>
                <div className="font-medium mt-2">£{item.price.toFixed(2)}</div>
            </div>

            <button
                onClick={onRemove}
                className="absolute top-4 right-4 p-1 hover:bg-neutral-100 rounded-full"
                aria-label="Remove item"
            >
                <X className="h-5 w-5" />
            </button>
        </div>
    );
}
