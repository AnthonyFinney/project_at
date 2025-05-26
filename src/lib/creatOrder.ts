import { OrderSchema, OrderType, OrderItemType, ProductType } from "./schemas";
import { getDb } from "./mongodb";
import { getShippingPrice } from "./utils";
import { ObjectId } from "mongodb";

export async function createOrder(data: unknown): Promise<string> {
    if (typeof data !== "object" || data === null) {
        throw new Error("invalid Payload");
    }

    const db = await getDb();
    const now = new Date().toISOString();

    const payload = {
        ...(data as Record<string, any>),
        status: "pending",
        paymentStatus: "unpaid",
        paymentMethod: "sslcommerz",
        createdAt: now,
        updatedAt: now,
    };

    const parsedOrder = OrderSchema.parse(payload);

    const productIds = parsedOrder.items.map(
        (it) => new ObjectId(it.productId)
    );
    const productsCursor = await db
        .collection<ProductType>("products")
        .find({ _id: { $in: productIds } })
        .toArray();

    const productMap = new Map<string, (typeof productsCursor)[0]>();
    for (const p of productsCursor) {
        productMap.set(p._id.toHexString(), p);
    }

    let itemsTotal = 0;
    const orderItems: OrderItemType[] = parsedOrder.items.map(
        ({ productId, size, quantity }) => {
            const pid = productId.toString();
            const prod = productMap.get(pid);
            if (!prod) {
                throw new Error(`Product ${pid} not found`);
            }

            const variant = prod.variants.find((v) => v.size === size);
            if (!variant) {
                throw new Error(
                    `Variant "${size}" not available for product "${prod.name}"`
                );
            }

            const unitPrice = variant.price;
            const lineTotal = unitPrice * quantity;
            itemsTotal += lineTotal;

            return {
                productId,
                name: prod.name,
                price: unitPrice,
                size,
                quantity,
                image: prod.image,
            };
        }
    );

    const totalPrice = itemsTotal + getShippingPrice();

    const orderToInsert: OrderType = {
        ...parsedOrder,
        items: orderItems,
        totalAmount: totalPrice,
    };

    const result = await db.collection("orders").insertOne(orderToInsert);
    console.log(result.insertedId.toString());
    return result.insertedId.toString();
}
