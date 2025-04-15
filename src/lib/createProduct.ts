import { ProductSchema, ProductType } from "./schemas";
import { getDb } from "./mongodb";

export async function createProduct(data: unknown): Promise<string> {
    const parsedProduct = ProductSchema.parse(data);

    const db = await getDb();
    const now = new Date().toISOString();

    const productToInsert: ProductType = {
        ...parsedProduct,
        createdAt: now,
        updatedAt: now,
    };

    const result = await db.collection("products").insertOne(productToInsert);
    return result.insertedId.toString();
}
