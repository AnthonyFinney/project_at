import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    image: string;
    brand: string;
    name: string;
    productLink: string;
    price: number;
}

export function ProductCard({
    image,
    brand,
    name,
    productLink,
    price,
}: ProductCardProps) {
    return (
        <Link href={productLink} className="group">
            <div className="bg-white p-4 mb-3">
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={
                            image ||
                            "https://placehold.co/600x400/000000/FFFFFF/png"
                        }
                        alt={`${brand} ${name}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                </div>
            </div>
            <div className="text-center">
                <h3 className="text-sm font-medium">{brand}</h3>
                <p className="text-sm text-neutral-600">{name}</p>
                <p className="text-sm font-medium mt-1">£{price.toFixed(2)}</p>
            </div>
        </Link>
    );
}
