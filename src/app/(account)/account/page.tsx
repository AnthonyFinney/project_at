"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SignInWithFacebook, SignInWithGoogle } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

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
                        Sign In
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center space-x-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={SignInWithGoogle}
                        >
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Google</title>
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={SignInWithFacebook}
                        >
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Facebook</title>
                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                            </svg>
                        </Button>
                    </div>
                    <div className="my-4 flex items-center">
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                        <p className="mx-4 text-sm font-semibold">Or</p>
                        <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <form className="space-y-4">
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
                            <a
                                href="#"
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <Button className="w-full">Login</Button>
                    </form>
                    <p className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <a href="#" className="text-primary hover:underline">
                            Register
                        </a>
                    </p>
                </CardContent>
            </Card>
        </section>
    );
}
