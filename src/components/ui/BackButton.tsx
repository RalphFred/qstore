"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  
  return (
    <button onClick={() => router.back()} className="flex items-center">
      <ChevronLeft />
    </button>
  );
} 