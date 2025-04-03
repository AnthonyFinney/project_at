"use server";

import { signIn } from "../../../auth";

export async function SignInWithGoogle() {
    await signIn("google");
}

export async function SignInWithFacebook() {
    await signIn("facebook");
}
