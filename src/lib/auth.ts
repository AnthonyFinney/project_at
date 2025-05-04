import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "./utils";
import { getDb } from "./mongodb";
import { UserSchema, SessionUserType } from "./schemas";

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
            ): Promise<SessionUserType | null> {
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

                const transformedUser = {
                    ...user,
                    id: user._id.toString(),
                };

                const parsedUser = UserSchema.parse(transformedUser);
                const passwordMatch = await comparePassword(
                    password,
                    parsedUser.passwordHash as string
                );

                if (!passwordMatch) {
                    throw new Error("Invalid password");
                }

                if (!parsedUser.id) {
                    throw new Error("User missing id");
                }

                return {
                    id: parsedUser.id,
                    email: parsedUser.email,
                    name: parsedUser.name,
                    role: parsedUser.role,
                };
            },
        }),
    ],
    pages: {
        signIn: "/account/logIn",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 30,
        updateAge: 10 * 60,
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.email = user.email;
                token.name = user.name;
                token.role = user?.role ?? "user";
            }

            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.role = token.role as "user" | "admin";
            }

            return session;
        },
    },
});
