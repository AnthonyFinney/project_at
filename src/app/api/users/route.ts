import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { User, UserSchema } from "@/lib/user";
import { saltAndHashPassword } from "@/lib/utils";

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
        const existingUser = await db
            .collection("users")
            .findOne({ email: parsedUser.email });

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "Email already registered" },
                { status: 409 }
            );
        }

        const hashedPassword = saltAndHashPassword(parsedUser.password);
        const userToInsert = { ...parsedUser, password: hashedPassword };

        const result = await db.collection("users").insertOne(userToInsert);

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
