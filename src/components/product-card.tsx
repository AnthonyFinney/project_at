import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

export interface ProductCardProps {
    name: string;
    description?: string;
    price: number;
    tags?: string[];
    image?: string;
    size?: string;
    concentration?: string;
    productLink: string;
}

export function ProductCard({
    name,
    description,
    price,
    tags = [],
    image,
    size,
    concentration,
    productLink,
}: ProductCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };

    return (
        <Link href={productLink} className="group">
            <div className="bg-white rounded-md overflow-hidden border shadow-sm mb-3">
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={image || "/placeholder.svg?height=400&width=400"}
                        alt={`${name}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                    {size && (
                        <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                            {size}
                        </div>
                    )}
                </div>
            </div>
            <div className="space-y-1">
                <h3 className="font-medium text-sm">{name}</h3>
                {concentration && (
                    <p className="text-xs text-muted-foreground">
                        {concentration}
                    </p>
                )}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {tags.slice(0, 2).map((tag, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="text-xs py-0 h-5 flex items-center gap-1"
                            >
                                <Tag className="h-3 w-3" />
                                {tag}
                            </Badge>
                        ))}
                        {tags.length > 2 && (
                            <Badge
                                variant="outline"
                                className="text-xs py-0 h-5"
                            >
                                +{tags.length - 2}
                            </Badge>
                        )}
                    </div>
                )}
                <p className="text-sm font-semibold text-primary">
                    {formatPrice(price)}
                </p>
            </div>
        </Link>
    );
}
