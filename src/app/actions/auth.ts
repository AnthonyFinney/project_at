"use server";

import { signIn } from "../../lib/auth";

export async function SignInWithGoogle() {
    await signIn("google");
}

export async function SignInWithFacebook() {
    await signIn("facebook");
}
