"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  // Extract the pending state from the parent form
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full py-2.5 bg-accent text-background font-semibold rounded-lg hover:bg-accent-hover transition-colors text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      type="submit"
      disabled={pending} // Disables the button when the action is running
    >
      {pending ? "Signing Up..." : "Sign Up"}
    </button>
  );
}