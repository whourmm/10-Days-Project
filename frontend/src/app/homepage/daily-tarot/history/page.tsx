"use client";

import { useRouter } from "next/navigation";

import TarotHistoryCatalog from "@/components/daily-tarot/tarotHistoryCatalog";
import { ChevronLeft } from "lucide-react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <ChevronLeft size={24} className="cursor-pointer" onClick={() => router.back()} />
        <h1 className="w-full text-center text-4xl font-fredericka-the-great">History Card</h1>
        <p className="mt-5 text-sm w-full text-left">
          ประวัติไพ่จะถูกเก็บไว้ให้ดูย้อนหลังได้ 7 วัน
        </p>
      </div>
      <TarotHistoryCatalog />
    </div>
  );
}
