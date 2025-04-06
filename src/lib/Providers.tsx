"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export function AuthProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <SessionProvider>{children}</SessionProvider>;
}
