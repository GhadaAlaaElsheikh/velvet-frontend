
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 flex items-center gap-2 text-[#8B1E1E] transition hover:opacity-70"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </button>
  );
}

