
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
        "http://localhost:3001/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save access token
      localStorage.setItem(
        "accessToken",
        data.accessToken,
      );

      // Save user ID
      localStorage.setItem(
        "userId",
        data.user.id,
      );

      // Save user role
      localStorage.setItem(
        "role",
        data.user.role,
      );

      console.log(
        "USER ID SAVED:",
        data.user.id,
      );

      console.log(
        "USER ROLE:",
        data.user.role,
      );

      // Redirect based on role
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Email */}
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

      {/* Password */}
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

      {/* Forgot Password */}
      <div className="mt-3 text-right">
        <button
          type="button"
          className="text-sm text-[#8B1E1E] hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Sign In */}
      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-[#8B1E1E] py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      {/* OR */}
      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-gray-300" />

        <span className="mx-4 text-sm text-gray-400">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={() => {
          window.location.href =
            "http://localhost:3001/auth/google";
        }}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 transition hover:bg-gray-50"
      >
        Continue with Google
      </button>
    </>
  );
}

