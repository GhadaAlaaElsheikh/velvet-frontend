"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    const params = new URLSearchParams(
      hash.substring(1)
    );

    const accessToken = params.get("accessToken");
    const userId = params.get("userId");

    if (!accessToken || !userId) {
      router.replace("/auth");
      return;
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userId", userId);

    router.replace("/");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-semibold text-[#8B1E1E]">
        Signing you in...
      </h1>
    </main>
  );
}