import type {
    UserType,
    OrderType,
    AddressType,
    ProductType,
    CategoryType,
    PromotionType,
    VariantType,
} from "./schemas";
import { faker } from "@faker-js/faker";

type CategoryTemplate = Omit<CategoryType, "promotion"> & {
    promotionTypes: PromotionType["type"];
    promotionDetails: string[];
};

const CATEGORY_TEMPLATES: CategoryTemplate[] = [
    {
        id: faker.database.mongodbObjectId(),
        name: "Attar",
        description:
            "Pure, concentrated natural perfume oils distilled from botanicals.",
        promotionTypes: ["New Arrival", "Best Seller", "Premium"],
        promotionDetails: [
            "10% off your first Attar purchase",
            "Free shipping on all Attar orders",
            "Complimentary mini rollerball with purchase",
        ],
    },
    {
        id: faker.database.mongodbObjectId(),
        name: "Scent",
        description:
            "Lighter perfume blends for daily wear and refreshing aromas.",
        promotionTypes: ["Limited Edition", "Holiday Special", "Cozy Blend"],
        promotionDetails: [
            "Gift mini rollerball with purchase",
            "Buy 2, get 1 free",
            "10% off during seasonal sale",
        ],
    },
];

const VARIANT_SIZES = ["3ml", "6ml", "10ml", "12ml", "30ml", "50ml"] as const;

export function createRandomProduct(): ProductType {
    // Randomly pick one of your category templates
    const tpl = faker.helpers.arrayElement(CATEGORY_TEMPLATES);

    // Generate 2–3 variants of type VariantType
    const variantCount = faker.number.int({ min: 2, max: 3 });
    const variants: VariantType[] = faker.helpers
        .shuffle([...VARIANT_SIZES])
        .slice(0, variantCount)
        .map((size) => ({
            size,
            price: faker.number.int({ min: 500, max: 5000 }),
            stock: faker.number.int({ min: 0, max: 200 }),
        }));

    // Build the CategoryType object, including a random PromotionType
    const category: CategoryType = {
        id: tpl.id,
        name: tpl.name,
        description: tpl.description,
        promotion: {
            type: [faker.helpers.arrayElement(tpl.promotionTypes)],
            details: faker.helpers.arrayElement(tpl.promotionDetails),
        },
    };

    // Timestamps
    const createdAt = faker.date.past({ years: 1 }).toISOString();
    const updatedAt = faker.date
        .between({ from: new Date(createdAt), to: new Date() })
        .toISOString();

    // Finally assemble a ProductType
    return {
        id: faker.database.mongodbObjectId(),
        name: `${faker.helpers.arrayElement([
            "Rose Noir",
            "Jasmine Blossom",
            "Lavender Dream",
            "Amber Wood",
            "Saffron Oud",
            "Mint Serenity",
        ])} ${faker.helpers.arrayElement(["Attar", "Essence", "Blend"])}`,
        description: faker.lorem.sentences(2),
        variants,
        category,
        isFeatured: faker.datatype.boolean(),
        tags: faker.helpers.uniqueArray(() => faker.lorem.word(), 3),
        image: faker.image.urlPicsumPhotos({ width: 600, height: 600 }),
        createdAt,
        updatedAt,
        concentration: faker.helpers.arrayElement([
            "Attar",
            "Eau de Parfum",
            "Eau de Toilette",
        ]),
        notes: {
            top: faker.helpers.uniqueArray(() => faker.lorem.word(), 2),
            middle: faker.helpers.uniqueArray(() => faker.lorem.word(), 2),
            base: faker.helpers.uniqueArray(() => faker.lorem.word(), 1),
        },
        scentFamily: faker.helpers.arrayElement([
            "Floral",
            "Woody",
            "Citrus",
            "Oriental",
            "Gourmand",
        ]),
    };
}

// Mock data for products
export const mockProducts: ProductType[] = Array.from({ length: 50 }, () =>
    createRandomProduct()
);

// Mock data for users
export const mockUsers: UserType[] = [
    {
        id: "user_1",
        name: "John Smith",
        email: "john.smith@example.com",
        passwordHash: "hashed_password_1",
        phone: "+44 7123 456789",
        provider: "credentials",
        isVerified: true,
        role: "user",
        addresses: [
            {
                street: "123 Main Street",
                city: "London",
                postalCode: "E1 6AN",
                country: "United Kingdom",
                district: "East London",
                isDefault: true,
            },
        ],
        cart: [
            {
                productId: "prod_1",
                size: "UK 9",
                quantity: 1,
                price: 1,
                image: "/placeholder.svg?height=200&width=200",
                name: "Air Jordan 4 Retro Fear",
            },
        ],
        createdAt: "2023-01-15T10:30:00Z",
        updatedAt: "2023-03-22T14:45:00Z",
    },
    {
        id: "user_2",
        name: "Emma Johnson",
        email: "emma.johnson@example.com",
        phone: "+44 7234 567890",
        provider: "google",
        providerId: "google-oauth2|123456789",
        isVerified: true,
        role: "admin",
        addresses: [
            {
                street: "456 High Street",
                city: "Manchester",
                postalCode: "M1 1AD",
                country: "United Kingdom",
                isDefault: true,
            },
        ],
        cart: [],
        createdAt: "2023-02-10T09:15:00Z",
        updatedAt: "2023-04-05T11:20:00Z",
    },
    {
        id: "user_3",
        name: "David Williams",
        email: "david.williams@example.com",
        passwordHash: "hashed_password_3",
        phone: "+44 7345 678901",
        provider: "credentials",
        isVerified: true,
        role: "user",
        addresses: [
            {
                street: "789 Park Lane",
                city: "Birmingham",
                postalCode: "B1 1AA",
                country: "United Kingdom",
                district: "City Centre",
                isDefault: true,
            },
            {
                street: "101 Business Avenue",
                city: "Birmingham",
                postalCode: "B2 2BB",
                country: "United Kingdom",
                district: "Business District",
                isDefault: false,
            },
        ],
        cart: [
            {
                productId: "prod_2",
                size: "UK 10",
                quantity: 1,
                price: 1,
                image: "/placeholder.svg?height=200&width=200",
                name: "Air Jordan 4 Retro Fear",
            },
        ],
        createdAt: "2023-02-22T15:40:00Z",
        updatedAt: "2023-03-30T09:25:00Z",
    },
    {
        id: "user_4",
        name: "Sophia Brown",
        email: "sophia.brown@example.com",
        passwordHash: "hashed_password_4",
        phone: "+44 7456 789012",
        provider: "credentials",
        isVerified: false,
        role: "user",
        addresses: [],
        cart: [],
        createdAt: "2023-03-05T12:10:00Z",
        updatedAt: "2023-03-05T12:10:00Z",
    },
    {
        id: "user_5",
        name: "Oliver Taylor",
        email: "oliver.taylor@example.com",
        phone: "+44 7567 890123",
        provider: "google",
        providerId: "google-oauth2|987654321",
        isVerified: true,
        role: "user",
        addresses: [
            {
                street: "202 King's Road",
                city: "Edinburgh",
                postalCode: "EH1 1AA",
                country: "United Kingdom",
                district: "Old Town",
                isDefault: true,
            },
        ],
        cart: [],
        createdAt: "2023-03-18T16:50:00Z",
        updatedAt: "2023-04-10T13:15:00Z",
    },
];

export interface CarouselProductType {
    id: string;
    name: string;
    price: number;
    tags: string[];
    image: string;
    size: string;
    concentration: string;
    productLink: string;
}

// 2. Base metadata for each slide (without IDs or images)
const BASE_CAROUSEL: Omit<CarouselProductType, "id" | "image">[] = [
    {
        name: "Midnight Oud Attar",
        price: 49.99,
        tags: ["Oud", "Oriental", "Unisex"],
        size: "10ml",
        concentration: "Pure Attar Oil",
        productLink: "/products/midnight-oud",
    },
    {
        name: "Rose Taifi Essence",
        price: 39.99,
        tags: ["Floral", "Rose", "Feminine"],
        size: "25ml",
        concentration: "Eau de Parfum",
        productLink: "/products/rose-taifi",
    },
    {
        name: "Amber Musk",
        price: 59.99,
        tags: ["Amber", "Musk", "Long-lasting"],
        size: "50ml",
        concentration: "Concentrated Perfume Oil",
        productLink: "/products/amber-musk",
    },
    {
        name: "Sandalwood Elixir",
        price: 69.99,
        tags: ["Woody", "Sandalwood", "Unisex"],
        size: "30ml",
        concentration: "Pure Attar",
        productLink: "/products/sandalwood-elixir",
    },
    {
        name: "Jasmine Dreams",
        price: 45.99,
        tags: ["Floral", "Jasmine", "Feminine"],
        size: "15ml",
        concentration: "Attar Oil",
        productLink: "/products/jasmine-dreams",
    },
    {
        name: "Vetiver Noir",
        price: 79.99,
        tags: ["Woody", "Earthy", "Masculine"],
        size: "50ml",
        concentration: "Eau de Parfum",
        productLink: "/products/vetiver-noir",
    },
    {
        name: "Saffron Royale",
        price: 89.99,
        tags: ["Spicy", "Saffron", "Luxury"],
        size: "30ml",
        concentration: "Parfum",
        productLink: "/products/saffron-royale",
    },
    {
        name: "Citrus Breeze",
        price: 34.99,
        tags: ["Fresh", "Citrus", "Summer"],
        size: "50ml",
        concentration: "Eau de Cologne",
        productLink: "/products/citrus-breeze",
    },
];

// 3. Generator to merge base data with a random ID + image
export function createRandomCarouselProduct(
    base: Omit<CarouselProductType, "id" | "image">
): CarouselProductType {
    return {
        id: faker.database.mongodbObjectId(),
        ...base,
        image: faker.image.urlPicsumPhotos({ width: 600, height: 600 }),
    };
}

export const mockCarouselProducts: CarouselProductType[] = BASE_CAROUSEL.map(
    createRandomCarouselProduct
);

// Helper function to get a default address for a user
const getDefaultAddress = (userId: string): AddressType => {
    const user = mockUsers.find((u) => u.id === userId);
    if (!user || !user.addresses || user.addresses.length === 0) {
        return {
            street: "Unknown Address",
            city: "Unknown City",
            postalCode: "Unknown",
            country: "Unknown Country",
        };
    }

    const defaultAddress =
        user.addresses.find((a) => a.isDefault) || user.addresses[0];
    return defaultAddress;
};

// Mock data for orders
export const mockOrders: OrderType[] = [
    {
        id: "ord_1",
        userId: "user_1",
        customer: {
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "+44 7123 456789",
        },
        items: [
            {
                productId: "prod_1",
                name: "Air Jordan 4 Retro Fear",
                price: 215,
                size: "UK 9",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        totalAmount: 225,
        status: "delivered",
        paymentStatus: "paid",
        paymentMethod: "sslcommerz",
        shippingAddress: getDefaultAddress("user_1"),
        createdAt: "2023-04-15T10:30:00Z",
        updatedAt: "2023-04-17T14:30:00Z",
    },
    {
        id: "ord_2",
        userId: "user_3",
        customer: {
            name: "David Williams",
            email: "david.williams@example.com",
            phone: "+44 7345 678901",
        },
        items: [
            {
                productId: "prod_3",
                name: "Nike Dunk Low Panda",
                price: 110,
                size: "UK 6",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
            {
                productId: "prod_4",
                name: "New Balance 550 White Green",
                price: 90,
                size: "UK 7",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        totalAmount: 210,
        status: "shipped",
        paymentStatus: "paid",
        paymentMethod: "sslcommerz",
        shippingAddress: getDefaultAddress("user_3"),
        createdAt: "2023-04-16T14:20:00Z",
        updatedAt: "2023-04-18T09:15:00Z",
    },
    {
        id: "ord_3",
        userId: "user_5",
        customer: {
            name: "Oliver Taylor",
            email: "oliver.taylor@example.com",
            phone: "+44 7567 890123",
        },
        items: [
            {
                productId: "prod_2",
                name: "Yeezy Boost 350 V2 Beluga",
                price: 320,
                size: "UK 10",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        totalAmount: 330,
        status: "processing",
        paymentStatus: "paid",
        paymentMethod: "sslcommerz",
        shippingAddress: getDefaultAddress("user_5"),
        createdAt: "2023-04-17T09:15:00Z",
        updatedAt: "2023-04-17T15:30:00Z",
    },
    {
        id: "ord_4",
        userId: "user_4",
        customer: {
            name: "Sophia Brown",
            email: "sophia.brown@example.com",
            phone: "+44 7456 789012",
        },
        items: [
            {
                productId: "prod_4",
                name: "New Balance 550 White Green",
                price: 120,
                size: "UK 5.5",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        totalAmount: 130,
        status: "pending",
        paymentStatus: "unpaid",
        paymentMethod: "sslcommerz",
        shippingAddress: {
            street: "101 Queen Street",
            city: "Glasgow",
            postalCode: "G1 3DH",
            country: "United Kingdom",
        },
        createdAt: "2023-04-18T16:45:00Z",
        updatedAt: "2023-04-18T16:45:00Z",
    },
    {
        id: "ord_5",
        userId: "user_2",
        customer: {
            name: "Emma Johnson",
            email: "emma.johnson@example.com",
            phone: "+44 7234 567890",
        },
        items: [
            {
                productId: "prod_5",
                name: "Air Jordan 1 High OG Chicago",
                price: 180,
                size: "UK 8",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        totalAmount: 190,
        status: "cancelled",
        paymentStatus: "refunded",
        paymentMethod: "sslcommerz",
        shippingAddress: getDefaultAddress("user_2"),
        notes: "Customer requested cancellation due to delayed shipping",
        createdAt: "2023-04-19T11:30:00Z",
        updatedAt: "2023-04-21T09:45:00Z",
    },
];
