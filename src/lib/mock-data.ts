// Mock data for products with updated schema including variants
export const mockProducts = [
    {
        id: "prod_1",
        name: "Air Jordan 4 Retro Fear",
        description:
            "The Air Jordan 4 Retro Fear features a black, white, and cool grey colorway inspired by the 'Fear Pack' from 2013.",
        variants: [
            { size: "UK 7", price: 215, stock: 5 },
            { size: "UK 8", price: 215, stock: 3 },
            { size: "UK 9", price: 215, stock: 8 },
            { size: "UK 9.5", price: 220, stock: 2 },
            { size: "UK 10", price: 215, stock: 4 },
            { size: "UK 11", price: 225, stock: 3 },
        ],
        category: {
            name: "Sneakers",
            description: "Premium athletic and casual footwear",
            promotion: {
                type: ["New Release", "Limited Edition"],
                details: "Just released! Limited quantities available.",
            },
        },
        isFeatured: true,
        tags: ["Air Jordan", "Basketball", "Retro", "Limited Edition"],
        image: "/placeholder.svg?height=200&width=200",
        createdAt: "2023-04-15T10:30:00Z",
        updatedAt: "2023-04-15T10:30:00Z",
        sales: 42,
    },
    {
        id: "prod_2",
        name: "Yeezy Boost 350 V2 Beluga",
        description:
            "The Yeezy Boost 350 V2 Beluga features a grey Primeknit upper with a bright orange stripe.",
        variants: [
            { size: "UK 6", price: 320, stock: 2 },
            { size: "UK 7", price: 320, stock: 3 },
            { size: "UK 8", price: 320, stock: 1 },
            { size: "UK 9", price: 330, stock: 4 },
            { size: "UK 10", price: 330, stock: 2 },
            { size: "UK 11", price: 340, stock: 0 },
            { size: "UK 12", price: 350, stock: 0 },
        ],
        category: {
            name: "Sneakers",
            description: "Designer collaboration footwear",
            promotion: {
                type: ["Popular", "Resale Value"],
                details: "High resale value, collector's item.",
            },
        },
        isFeatured: true,
        tags: ["Yeezy", "Adidas", "Kanye West", "Boost"],
        image: "/placeholder.svg?height=200&width=200",
        createdAt: "2023-04-16T14:20:00Z",
        updatedAt: "2023-04-16T14:20:00Z",
        sales: 38,
    },
    {
        id: "prod_3",
        name: "Nike Dunk Low Panda",
        description:
            "The Nike Dunk Low Panda features a black and white colorway that's simple yet versatile.",
        variants: [
            { size: "UK 3", price: 110, stock: 5 },
            { size: "UK 4", price: 110, stock: 7 },
            { size: "UK 5", price: 110, stock: 6 },
            { size: "UK 6", price: 110, stock: 8 },
            { size: "UK 7", price: 110, stock: 10 },
            { size: "UK 8", price: 110, stock: 9 },
            { size: "UK 9", price: 110, stock: 5 },
            { size: "UK 10", price: 120, stock: 0 },
            { size: "UK 11", price: 120, stock: 0 },
        ],
        category: {
            name: "Sneakers",
            description: "Casual lifestyle footwear",
            promotion: {
                type: ["Bestseller", "Trending"],
                details: "Our most popular colorway, restocked weekly.",
            },
        },
        isFeatured: true,
        tags: ["Nike", "Dunk", "Casual", "Everyday"],
        image: "/placeholder.svg?height=200&width=200",
        createdAt: "2023-04-17T09:15:00Z",
        updatedAt: "2023-04-17T09:15:00Z",
        sales: 65,
    },
    {
        id: "prod_4",
        name: "New Balance 550 White Green",
        description:
            "The New Balance 550 White Green is a retro basketball sneaker with a clean white upper and green accents.",
        variants: [
            { size: "UK 6", price: 120, stock: 4 },
            { size: "UK 7", price: 120, stock: 6 },
            { size: "UK 8", price: 120, stock: 8 },
            { size: "UK 9", price: 120, stock: 7 },
            { size: "UK 10", price: 120, stock: 5 },
            { size: "UK 11", price: 130, stock: 0 },
        ],
        category: {
            name: "Sneakers",
            description: "Retro-inspired athletic footwear",
            promotion: {
                type: ["Trending", "Summer Collection"],
                details: "Perfect for summer, versatile colorway.",
            },
        },
        isFeatured: false,
        tags: ["New Balance", "Retro", "Basketball", "Casual"],
        image: "/placeholder.svg?height=200&width=200",
        createdAt: "2023-04-18T16:45:00Z",
        updatedAt: "2023-04-18T16:45:00Z",
        sales: 29,
    },
    {
        id: "prod_5",
        name: "Air Jordan 1 High OG Chicago",
        description:
            "The Air Jordan 1 High OG Chicago is a reissue of the iconic red, white, and black colorway.",
        variants: [
            { size: "UK 7", price: 180, stock: 0 },
            { size: "UK 8", price: 180, stock: 0 },
            { size: "UK 9", price: 190, stock: 0 },
            { size: "UK 10", price: 190, stock: 0 },
            { size: "UK 11", price: 200, stock: 0 },
            { size: "UK 12", price: 200, stock: 0 },
        ],
        category: {
            name: "Sneakers",
            description: "Iconic basketball heritage footwear",
            promotion: {
                type: ["Classic", "Heritage", "Collector's Item"],
                details: "The iconic colorway that started it all.",
            },
        },
        isFeatured: true,
        tags: ["Air Jordan", "Basketball", "Iconic", "Chicago"],
        image: "/placeholder.svg?height=200&width=200",
        createdAt: "2023-04-19T11:30:00Z",
        updatedAt: "2023-04-19T11:30:00Z",
        sales: 52,
    },
];

// Mock data for orders
export const mockOrders = [
    {
        id: "ord_1",
        orderNumber: "ORD-12345",
        date: "2023-04-15T10:30:00Z",
        customer: {
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "+44 7123 456789",
        },
        items: [
            {
                name: "Air Jordan 4 Retro Fear",
                sku: "F9B136-002",
                price: 215,
                size: "UK 9",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        subtotal: 215,
        shipping: 10,
        discount: 0,
        total: 225,
        status: "delivered",
        shippingAddress: {
            line1: "123 Main Street",
            line2: "Apt 4B",
            city: "London",
            postalCode: "E1 6AN",
            country: "United Kingdom",
        },
        paymentMethod: "Credit Card (Visa ending in 4242)",
    },
    {
        id: "ord_2",
        orderNumber: "ORD-12346",
        date: "2023-04-16T14:20:00Z",
        customer: {
            name: "Emma Johnson",
            email: "emma.johnson@example.com",
            phone: "+44 7234 567890",
        },
        items: [
            {
                name: "Nike Dunk Low Panda",
                sku: "DD1391-100",
                price: 110,
                size: "UK 6",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
            {
                name: "Adidas Samba OG",
                sku: "B75806",
                price: 90,
                size: "UK 7",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        subtotal: 200,
        shipping: 10,
        discount: 20,
        total: 190,
        status: "shipped",
        shippingAddress: {
            line1: "456 High Street",
            line2: "",
            city: "Manchester",
            postalCode: "M1 1AD",
            country: "United Kingdom",
        },
        paymentMethod: "PayPal",
    },
    {
        id: "ord_3",
        orderNumber: "ORD-12347",
        date: "2023-04-17T09:15:00Z",
        customer: {
            name: "David Williams",
            email: "david.williams@example.com",
            phone: "+44 7345 678901",
        },
        items: [
            {
                name: "Yeezy Boost 350 V2 Beluga",
                sku: "BB1826",
                price: 320,
                size: "UK 10",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        subtotal: 320,
        shipping: 10,
        discount: 0,
        total: 330,
        status: "processing",
        shippingAddress: {
            line1: "789 Park Lane",
            line2: "Floor 3",
            city: "Birmingham",
            postalCode: "B1 1AA",
            country: "United Kingdom",
        },
        paymentMethod: "Credit Card (Mastercard ending in 5678)",
    },
    {
        id: "ord_4",
        orderNumber: "ORD-12348",
        date: "2023-04-18T16:45:00Z",
        customer: {
            name: "Sophia Brown",
            email: "sophia.brown@example.com",
            phone: "+44 7456 789012",
        },
        items: [
            {
                name: "New Balance 550 White Green",
                sku: "BB550WT1",
                price: 120,
                size: "UK 5.5",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        subtotal: 120,
        shipping: 10,
        discount: 0,
        total: 130,
        status: "pending",
        shippingAddress: {
            line1: "101 Queen Street",
            line2: "",
            city: "Glasgow",
            postalCode: "G1 3DH",
            country: "United Kingdom",
        },
        paymentMethod: "Apple Pay",
    },
    {
        id: "ord_5",
        orderNumber: "ORD-12349",
        date: "2023-04-19T11:30:00Z",
        customer: {
            name: "Oliver Taylor",
            email: "oliver.taylor@example.com",
            phone: "+44 7567 890123",
        },
        items: [
            {
                name: "Air Jordan 1 High OG Chicago",
                sku: "DZ5485-612",
                price: 180,
                size: "UK 8",
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        subtotal: 180,
        shipping: 10,
        discount: 0,
        total: 190,
        status: "cancelled",
        shippingAddress: {
            line1: "202 King's Road",
            line2: "Apt 7C",
            city: "Edinburgh",
            postalCode: "EH1 1AA",
            country: "United Kingdom",
        },
        paymentMethod: "Credit Card (Amex ending in 1234)",
    },
];

// Mock data for users
export const mockUsers = [
    {
        id: "user_1",
        name: "John Smith",
        email: "john.smith@example.com",
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
        createdAt: "2023-02-10T09:15:00Z",
        updatedAt: "2023-04-05T11:20:00Z",
    },
    {
        id: "user_3",
        name: "David Williams",
        email: "david.williams@example.com",
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
        createdAt: "2023-02-22T15:40:00Z",
        updatedAt: "2023-03-30T09:25:00Z",
    },
    {
        id: "user_4",
        name: "Sophia Brown",
        email: "sophia.brown@example.com",
        phone: "+44 7456 789012",
        provider: "credentials",
        isVerified: false,
        role: "user",
        addresses: [],
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
        createdAt: "2023-03-18T16:50:00Z",
        updatedAt: "2023-04-10T13:15:00Z",
    },
];
