import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { User, UserSchema } from "@/lib/user";

export async function GET() {
    try {
        const db = await getDb();
        const users = await db.collection("users").find().toArray();
        const parsedUsers: User[] = users.map((user) => UserSchema.parse(user));

        return NextResponse.json(parsedUsers);
    } catch (error) {
        console.error(`Error ${error}`);

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            details: typeof error === "string" ? error : JSON.stringify(error),
        });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedUser: User = UserSchema.parse(body);

        const db = await getDb();

        const result = await db.collection("users").insertOne(parsedUser);

        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (error: unknown) {
        console.error(`Error ${error}`);

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            details: typeof error === "string" ? error : JSON.stringify(error),
        });
    }
}
