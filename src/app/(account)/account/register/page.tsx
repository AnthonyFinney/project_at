"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Page() {
    const { status } = useSession();

    if (status === "loading") {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
                <div
                    className="h-16 w-16 animate-spin rounded-full border-8 border-solid border-black border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (status === "authenticated") {
        redirect("/");
    }

    return (
        <section className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-bold">
                        Register
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="my-4 flex items-center">
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                        <p className="mx-4 text-sm font-semibold">
                            Fill In Name, Email And Password
                        </p>
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                        </div>
                        <Button className="w-full">Login</Button>
                    </form>
                    <p className="mt-4 text-center text-sm">
                        Do have an account?{" "}
                        <Link
                            href="/account/logIn"
                            className="text-primary hover:underline"
                        >
                            Log In
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </section>
    );
}
