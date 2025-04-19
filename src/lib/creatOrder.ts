import { OrderSchema, OrderType } from "./schemas";
import { getDb } from "./mongodb";

export async function createOrder(data: unknown): Promise<string> {
    const parsedOrder = OrderSchema.parse(data);

    const db = await getDb();
    const now = new Date().toISOString();

    const orderToInsert: OrderType = {
        ...parsedOrder,
        createdAt: now,
        updatedAt: now,
    };

    const result = await db.collection("orders").insertOne(orderToInsert);
    return result.insertedId.toString();
}
