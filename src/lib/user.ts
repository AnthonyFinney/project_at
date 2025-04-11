import { z } from "zod";
import { ObjectId } from "mongodb";

export const UserSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    email: z.string().email(),
    password: z.string().min(8),
});

export type User = z.infer<typeof UserSchema>;
