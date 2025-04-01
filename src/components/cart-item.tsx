"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

interface CartItemProps {
    item: {
        id: string;
        name: string;
        brand: string;
        price: number;
        imageLink: string;
    };
    onRemove: () => void;
}

export function CartItem({ item, onRemove }: CartItemProps) {
    return (
        <div className="bg-white p-4 flex gap-4 relative">
            {/* Product image */}
            <div className="w-24 h-24 relative flex-shrink-0">
                <Image
                    src={item.imageLink || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-contain"
                />
            </div>

            {/* Product details */}
            <div className="flex-1">
                <div className="text-sm text-neutral-500">{item.brand}</div>
                <Link
                    href={`/products/${item.id}`}
                    className="font-medium hover:underline"
                >
                    {item.name}
                </Link>
                <div className="font-medium mt-2">£{item.price.toFixed(2)}</div>
            </div>

            {/* Remove button */}
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
