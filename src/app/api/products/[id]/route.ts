import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { ProductType } from "@/lib/schemas";
import { catchError, getIdFromUrl } from "@/lib/utils";

// GET /api/products/[id] - Fetch a single product by id.
export async function GET(req: Request) {
    try {
        const id = getIdFromUrl(req);

        const db = await getDb();
        const product = await db
            .collection("products")
            .findOne({ _id: new ObjectId(id) });

        if (!product) {
            return NextResponse.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }

        // Destructure all expected properties from the product document.
        const {
            _id,
            name,
            description,
            variants,
            category,
            isFeatured,
            tags,
            image,
            createdAt,
            updatedAt,
            concentration,
            notes,
            scentFamily,
        } = product;

        // Create the transformed product ensuring all required properties exist.
        const transformedProduct: ProductType = {
            id: _id.toString(),
            name,
            description,
            variants,
            category,
            isFeatured,
            tags,
            image,
            createdAt,
            updatedAt,
            concentration,
            notes,
            scentFamily,
        };

        return NextResponse.json({ success: true, data: transformedProduct });
    } catch (error: unknown) {
        catchError(error, "Error fetching product:");
    }
}

// PATCH /api/products/[id] - Update a product by id.
export async function PATCH(req: Request) {
    try {
        const id = getIdFromUrl(req);

        const body = await req.json();
        const db = await getDb();

        // Optionally, you can add validation here using your ProductSchema.
        const result = await db
            .collection("products")
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...body, updatedAt: new Date().toISOString() } }
            );

        if (result.modifiedCount === 1) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, error: "Product not found or not updated" },
                { status: 404 }
            );
        }
    } catch (error: unknown) {
        catchError(error, "Error updating product:");
    }
}

// DELETE /api/products/[id] - Delete a product by id.
export async function DELETE(req: Request) {
    try {
        const id = getIdFromUrl(req);

        const db = await getDb();
        const result = await db
            .collection("products")
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }
    } catch (error: unknown) {
        catchError(error, "Error deleting product:");
    }
}
