import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { UserType } from "@/lib/schemas";
import { catchError, getIdFromUrl } from "@/lib/utils";

export async function GET(req: Request) {
    try {
        const id = getIdFromUrl(req);

        const db = await getDb();
        const user = await db
            .collection("users")
            .findOne({ _id: new ObjectId(id) });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        const {
            _id,
            name,
            email,
            passwordHash,
            phone,
            provider,
            providerId,
            isVerified,
            role,
            addresses,
            cart,
            createdAt,
            updatedAt,
        } = user;

        const transformedUser: UserType = {
            id: _id.toString(),
            name,
            email,
            passwordHash,
            phone,
            provider,
            providerId,
            isVerified,
            role,
            addresses,
            cart,
            createdAt,
            updatedAt,
        };

        return NextResponse.json({ success: true, data: transformedUser });
    } catch (error: unknown) {
        catchError(error, "Error fetching user");
    }
}

export async function PATCH(req: Request) {
    try {
        const id = getIdFromUrl(req);

        const body = await req.json();
        const db = await getDb();

        const result = await db
            .collection("users")
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...body, updatedAt: new Date().toISOString() } }
            );

        if (result.modifiedCount === 1) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, error: "User not found or not updated" },
                { status: 404 }
            );
        }
    } catch (error: unknown) {
        catchError(error, "Error updating user:");
    }
}

export async function DELETE(req: Request) {
    try {
        const id = getIdFromUrl(req);

        const db = await getDb();
        const result = await db
            .collection("users")
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }
    } catch (error: unknown) {
        catchError(error, "Error deleting user:");
    }
}
