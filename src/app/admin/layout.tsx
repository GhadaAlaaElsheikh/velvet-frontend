
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Allow the admin login page without authentication
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    if (role !== "admin") {
      router.replace("/admin/login");
      return;
    }

    setChecking(false);
  }, [router, pathname]);

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
