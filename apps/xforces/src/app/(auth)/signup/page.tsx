import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@repo/db";
import argon2 from "argon2";
import Link from "next/link";

export default async function signupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm bg-surface rounded-xl border border-border p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <form
          action={async (FormData) => {
            "use server";
            const pwHash = await argon2.hash(FormData.get("password") as string);
            await prisma.user.create({
              data: {
                name: FormData.get("name") as string,
                password: pwHash,
                email: FormData.get("email") as string,
              },
            });
          }}
          className="flex flex-col gap-4"
        >
          <input
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:border-accent transition-colors"
            type="text"
            name="name"
            placeholder="Full Name"
          />
          <input
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:border-accent transition-colors"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:border-accent transition-colors"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            className="w-full py-2.5 bg-accent text-background font-semibold rounded-lg hover:bg-accent-hover transition-colors text-sm cursor-pointer"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-accent hover:text-accent-hover transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}