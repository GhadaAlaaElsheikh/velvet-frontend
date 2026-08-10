"use client";

type Props = {
  message: string;
};

export default function Toast({
  message,
}: Props) {
  return (
    <div className="fixed right-6 top-24 z-50 rounded-lg bg-[#8B1E1E] px-6 py-4 text-white shadow-xl animate-[fadeIn_.3s]">
      {message}
    </div>
  );
}