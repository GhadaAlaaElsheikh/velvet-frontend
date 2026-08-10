
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    // Not logged in
    if (!token) {
      router.replace("/auth");
      return;
    }

    // Logged in but not admin
    if (role !== "admin") {
      router.replace("/");
      return;
    }

    // Admin
    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F2EA]">
        <p className="text-lg font-medium text-[#8B1E1E]">
          Checking access...
        </p>
      </main>
    );
  }

  return <>{children}</>;
}

