import Image from "next/image";
import Link from "next/link";

export function ProductCard({
    name,
    description,
    price,
    tags,
    image,
    size,
    productLink,
}: ProductCardProps) {
    return (
        <Link href={productLink} className="group">
            <div className="bg-white mb-3">
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={
                            image ||
                            "https://placehold.co/600x400/000000/FFFFFF/png" ||
                            "/placeholder.svg"
                        }
                        alt={`${name}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                </div>
            </div>
            <div>
                <p className="text-sm text-neutral-600">{name}</p>
                <p className="text-sm font-medium mt-1">
                    £{Number.isInteger(price) ? price : price.toFixed(2)}
                </p>
            </div>
        </Link>
    );
}
