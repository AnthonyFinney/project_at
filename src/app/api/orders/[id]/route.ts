import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { OrderType } from "@/lib/schemas";
import { catchError, getIdFromUrl } from "@/lib/utils";

export async function GET(req: Request) {
    try {
        const id = getIdFromUrl(req);

        const db = await getDb();
        const order = await db
            .collection("orders")
            .findOne({ _id: new ObjectId(id) });

        if (!order) {
            return NextResponse.json(
                { success: false, error: "Order not found" },
                { status: 404 }
            );
        }

        const {
            _id,
            userId,
            customer,
            items,
            totalAmount,
            status,
            paymentStatus,
            paymentMethod,
            shippingAddress,
            notes,
            createdAt,
            updatedAt,
        } = order;

        const transformedOrder: OrderType = {
            id: _id.toString(),
            userId,
            customer,
            items,
            totalAmount,
            status,
            paymentStatus,
            paymentMethod,
            shippingAddress,
            notes,
            createdAt,
            updatedAt,
        };

        return NextResponse.json({ success: true, data: transformedOrder });
    } catch (error: unknown) {
        catchError(error, "Error fetching order:");
    }
}

export async function PATCH(req: Request) {
    try {
        const id = getIdFromUrl(req);

        const body = await req.json();
        const db = await getDb();

        const result = await db
            .collection("orders")
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...body, updatedAt: new Date().toISOString() } }
            );

        if (result.modifiedCount === 1) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, error: "Order not found or not updated" },
                { status: 404 }
            );
        }
    } catch (error: unknown) {
        catchError(error, "Error updating order");
    }
}

export async function DELETE(req: Request) {
    try {
        const id = getIdFromUrl(req);
        const db = await getDb();

        const result = await db
            .collection("orders")
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, error: "Order not found or not deleted" },
                { status: 404 }
            );
        }
    } catch (error: unknown) {
        catchError(error, "Error deleting order");
    }
}
