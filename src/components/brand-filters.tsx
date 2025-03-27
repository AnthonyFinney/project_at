import Link from "next/link";

export function BrandFilters() {
    const brands = [
        { name: "Ogranic", href: "#" },
        { name: "Perfume Oil", href: "#" },
        { name: "Premium", href: "#" },
        { name: "Premium Combo", href: "#" },
        { name: "Safroni", href: "#" },
        { name: "Uncategorized", href: "#" },
    ];

    return (
        <div className="flex gap-2 pb-2 overflow-x-auto whitespace-nowrap min-w-full">
            {brands.map((brand, index) => (
                <Link
                    key={index}
                    href={brand.href || "#"}
                    className="text-sm py-2 px-4 border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors"
                >
                    {brand.name}
                </Link>
            ))}
        </div>
    );
}
