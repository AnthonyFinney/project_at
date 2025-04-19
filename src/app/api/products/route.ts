import { NextResponse } from "next/server";
import { createProduct } from "@/lib/createProduct";
import { getDb } from "@/lib/mongodb";
import { ProductType } from "@/lib/schemas";
import { catchError } from "@/lib/utils";

export async function GET(req: Request) {
    try {
        const db = await getDb();
        const products = await db.collection("products").find({}).toArray();

        const transformedProducts: ProductType[] = products.map(
            (product: any) => {
                const { _id, ...rest } = product;

                return {
                    ...rest,
                    id: product._id.toString(),
                };
            }
        );

        return NextResponse.json({
            success: true,
            data: transformedProducts,
        });
    } catch (error: unknown) {
        catchError(error, "Error fetching products:");
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const insertedId = await createProduct(body);

        return NextResponse.json({ success: true, data: { id: insertedId } });
    } catch (error: unknown) {
        catchError(error, "Error making product:");
    }
}
