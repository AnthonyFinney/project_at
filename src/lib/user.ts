import { z } from "zod";
import { ObjectId } from "mongodb";

export const UserSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
});

export type User = z.infer<typeof UserSchema>;
