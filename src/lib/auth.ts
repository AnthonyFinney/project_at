import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "./utils";
import { getDb } from "./mongodb";
import { UserSchema } from "./user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        Facebook,
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(
                credentials: Partial<Record<"email" | "password", unknown>>,
                req: Request
            ): Promise<{ id: string; email?: string } | null> {
                const { email, password } = credentials ?? {};

                if (typeof email !== "string" || typeof password !== "string") {
                    throw new Error("Email and Password must be string");
                }

                if (!email || !password) {
                    throw new Error("Email and Password required");
                }

                const db = await getDb();
                const user = await db.collection("users").findOne({ email });

                if (!user) {
                    throw new Error("User not found");
                }

                const parsedUser = UserSchema.parse(user);
                const passwordMatch = await comparePassword(
                    password,
                    parsedUser.password
                );

                if (!passwordMatch) {
                    throw new Error("Invalid password");
                }

                if (!parsedUser._id) {
                    throw new Error("User missing id");
                }

                return {
                    id: parsedUser._id.toString(),
                    email: parsedUser.email,
                };
            },
        }),
    ],
    pages: {
        signIn: "/account/logIn",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }

            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
            }

            return session;
        },
    },
});
