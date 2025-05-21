import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

type Bucket = { count: number; reset: number };

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_APP_URL;
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 100;
const ipBuckets = new Map<string, Bucket>();

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const origin = req.headers.get("origin");
    const cookieName =
        process.env.NODE_ENV === "production"
            ? "__Secure-authjs.session-token"
            : "authjs.session-token";

    if (origin && origin !== ALLOWED_ORIGIN) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (req.method === "OPTIONS") {
        const res = NextResponse.next();
        res.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN!);
        res.headers.set(
            "Access-Control-Allow-Methods",
            "GET,POST,PATCH,DELETE,OPTIONS"
        );
        res.headers.set(
            "Access-Control-Allow-Headers",
            "Content-Type,Authorization"
        );

        return res;
    }

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-real-ip") ||
        "unknown";
    const now = Date.now();
    let bucket = ipBuckets.get(ip);

    if (!bucket || now > bucket.reset) {
        bucket = { count: 1, reset: now + WINDOW_MS };
        ipBuckets.set(ip, bucket);
    } else {
        bucket.count++;
    }

    if (bucket.count > MAX_REQUESTS) {
        return NextResponse.json(
            { error: "Too Many Requests" },
            { status: 429 }
        );
    }

    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    if (
        req.method === "GET" &&
        ["/api/products", "/api/users", "/api/orders"].some((prefix) =>
            pathname.startsWith(prefix)
        )
    ) {
        return NextResponse.next();
    }

    if (req.method === "POST" && pathname === "/api/orders") {
        return NextResponse.next();
    }

    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
        cookieName,
    });

    if (!token || token.role !== "admin") {
        return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/auth/:path*",
        "/api/products",
        "/api/products/:id",
        "/api/users",
        "/api/users/:id",
        "/api/orders",
        "/api/orders/:id",
    ],
};
