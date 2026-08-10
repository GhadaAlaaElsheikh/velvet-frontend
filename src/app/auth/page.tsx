
"use client";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useState } from "react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(
    "signin",
  );

  return (
    <main className="min-h-screen bg-[#F8F2EA] px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">

        <h1 className="text-center text-4xl font-bold text-[#8B1E1E]">
          Velvet
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Welcome to Velvet
        </p>

        {/* Tabs */}
        <div className="mt-8 flex rounded-full bg-[#F8F2EA] p-1">

          <button
            type="button"
            onClick={() => setActiveTab("signin")}
            className={`flex-1 rounded-full py-3 font-medium transition ${
              activeTab === "signin"
                ? "bg-[#8B1E1E] text-white"
                : "text-gray-600"
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("signup")}
            className={`flex-1 rounded-full py-3 font-medium transition ${
              activeTab === "signup"
                ? "bg-[#8B1E1E] text-white"
                : "text-gray-600"
            }`}
          >
            Sign Up
          </button>

        </div>

        {/* Form */}
        <div className="mt-8">
          {activeTab === "signin" ? (
            <LoginForm />
          ) : (
            <RegisterForm />
          )}
        </div>

      </div>
    </main>
  );
}

