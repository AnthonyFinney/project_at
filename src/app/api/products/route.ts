import { NextResponse } from "next/server";
import { createProduct } from "@/lib/createProduct";
import { getDb } from "@/lib/mongodb";
import { ProductType } from "@/lib/schemas";

export async function GET(req: Request) {
    try {
        const db = await getDb();
        const products = await db.collection("products").find({}).toArray();

        const transformedProducts: ProductType[] = products.map(
            (product: any) => {
                return {
                    ...product,
                    id: product._id.toString(),
                };
            }
        );

        return NextResponse.json({
            success: true,
            data: transformedProducts,
        });
    } catch (error: unknown) {
        console.error(`Error ${error}`);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
                details:
                    typeof error === "string" ? error : JSON.stringify(error),
            },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const insertedId = await createProduct(body);

        return NextResponse.json({ success: true, data: { id: insertedId } });
    } catch (error: unknown) {
        console.error(`Error ${error}`);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
                details:
                    typeof error === "string" ? error : JSON.stringify(error),
            },
            { status: 500 }
        );
    }
}
