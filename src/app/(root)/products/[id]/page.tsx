import ProductCarousel from "@/components/product-carousel";
import ProductGallery from "@/components/product-gallery";
import { mockCarouselProducts } from "@/lib/mock-data";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const sampleProduct = {
        id: "507f1f77bcf86cd799439011",
        name: "Midnight Oud Attar",
        description:
            "A luxurious and captivating fragrance that combines rich oud with warm amber and exotic spices. This long-lasting attar creates an aura of mystery and elegance.",
        concentration: "Pure Attar Oil",
        scentFamily: "Oriental Woody",
        notes: {
            top: ["Saffron", "Bergamot", "Pink Pepper"],
            middle: ["Rose", "Jasmine", "Oud"],
            base: ["Amber", "Sandalwood", "Vanilla", "Musk"],
        },
        variants: [
            { size: "10ml", price: 49.99, stock: 15 },
            { size: "25ml", price: 99.99, stock: 10 },
            { size: "50ml", price: 179.99, stock: 5 },
        ],
        category: {
            id: "507f1f77bcf86cd799439012",
            name: "Premium Attars",
            description:
                "Handcrafted essential oil fragrances with exceptional longevity",
            promotion: {
                type: ["Limited Edition", "Gift Set Available"],
                details:
                    "Buy any two attars and receive a complimentary 5ml sample of our signature blend",
            },
        },
        isFeatured: true,
        tags: ["Oud", "Oriental", "Long-lasting", "Unisex"],
        image: "https://placehold.co/600x600/png",
        createdAt: "2023-04-15T10:30:00Z",
        updatedAt: "2023-05-20T14:20:00Z",
    };

    const { id } = await params;
    return (
        <div className="max-w-7x1 mx-auto px-4 py-8">
            <ProductGallery product={sampleProduct} />

            <ProductCarousel
                headline="YOU MAY ALSO LIKE"
                products={mockCarouselProducts}
            />
        </div>
    );
}
