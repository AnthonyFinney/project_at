import { OrderSchema, OrderType } from "./schemas";
import { getDb } from "./mongodb";

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

    const orderToInsert: OrderType = {
        ...parsedOrder,
    };

    const result = await db.collection("orders").insertOne(orderToInsert);
    console.log(result.insertedId.toString());
    return result.insertedId.toString();
}
