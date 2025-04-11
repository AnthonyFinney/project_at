"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
    const { status } = useSession();
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status]);

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

    if (loading) {
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

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${window.location.origin}/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Register failed");
            } else {
                router.push("/account/logIn");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

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
                            Fill In Your Email And Password
                        </p>
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                        </div>
                        {error && (
                            <p className="text-sm text-red-600 font-medium">
                                {error}
                            </p>
                        )}
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={loading}
                        >
                            Register
                        </Button>
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
