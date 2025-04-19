import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { UserType } from "@/lib/schemas";
import { registerUser } from "@/lib/registerUser";
import { catchError } from "@/lib/utils";

export async function GET() {
    try {
        const db = await getDb();
        const users = await db.collection("users").find().toArray();

        const transformedUsers: UserType[] = users.map((user: any) => {
            const { _id, ...rest } = user;

            return {
                ...rest,
                id: user._id.toString(),
            };
        });

        return NextResponse.json({
            success: true,
            data: transformedUsers,
        });
    } catch (error: unknown) {
        catchError(error, "Error fetching users:");
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const insertedId = await registerUser(body);

        return NextResponse.json({ success: true, data: { id: insertedId } });
    } catch (error: unknown) {
        catchError(error, "Error making user:");
    }
}
