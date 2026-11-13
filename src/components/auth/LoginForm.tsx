
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://velvet-backend-production-efda.up.railway.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Allow admin accounts only
      if (data.user.role !== "admin") {
        setError("Access denied. Admin account only.");
        return;
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("role", data.user.role);

      router.push("/admin");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#8B1E1E]"
        />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#8B1E1E]"
        />
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-[#8B1E1E] py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </>
  );
}
