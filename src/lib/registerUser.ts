import { UserSchema, UserType } from "./schemas";
import { getDb } from "./mongodb";
import { saltAndHashPassword } from "./utils";

export async function registerUser(data: unknown): Promise<string> {
    const parsedUser = UserSchema.parse(data);

    const db = await getDb();
    const existingUser = await db
        .collection("users")
        .findOne({ email: parsedUser.email });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = saltAndHashPassword(
        parsedUser.passwordHash as string
    );
    const now = new Date().toISOString();

    const userToInsert: UserType = {
        ...parsedUser,
        passwordHash: hashedPassword,
        createdAt: now,
        updatedAt: now,
    };

    const result = await db.collection("users").insertOne(userToInsert);

    return result.insertedId.toString();
}
