import NextAuth from "next-auth";
import { SessionUserType } from "@/lib/schemas";

declare module "next-auth" {
    interface Session {
        user: SessionUserType;
    }

    interface User extends SessionUserType {}
}

declare module "next-auth/jwt" {
    interface JWT extends SessionUserType {}
}
