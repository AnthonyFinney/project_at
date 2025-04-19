import { NextResponse } from "next/server";
import { createOrder } from "@/lib/creatOrder";
import { getDb } from "@/lib/mongodb";
import { OrderType } from "@/lib/schemas";
import { catchError } from "@/lib/utils";

export async function GET(req: Request) {
    try {
        const db = await getDb();
        const orders = await db.collection("orders").find({}).toArray();

        const transformedOrders: OrderType[] = orders.map((order: any) => {
            const { _id, ...rest } = order;

            return {
                ...rest,
                id: order._id.toString(),
            };
        });

        return NextResponse.json({
            success: true,
            data: transformedOrders,
        });
    } catch (error: unknown) {
        catchError(error, "Error fetching orders:");
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const insertedId = await createOrder(body);

        return NextResponse.json({
            success: true,
            data: { id: insertedId },
        });
    } catch (error: unknown) {
        catchError(error, "Error making order:");
    }
}
