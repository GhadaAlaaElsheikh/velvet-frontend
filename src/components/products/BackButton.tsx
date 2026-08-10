"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-[#8B1E1E] text-[#8B1E1E] transition hover:bg-[#8B1E1E] hover:text-white"
    >
      <ArrowLeft size={20} />
    </button>
  );
}