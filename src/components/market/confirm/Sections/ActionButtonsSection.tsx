"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ActionButtonsSectionProps {
  marketSlug: string;
  isPending: boolean;
}

function ActionButtonsSection({ marketSlug, isPending }: ActionButtonsSectionProps) {
  const router = useRouter();

  return (
    <div className="flex space-x-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push(`/${marketSlug}/basket`)}
        className="flex-1 h-12 rounded-[16px]"
      >
        Ləğv et
      </Button>
      <Button
        type="submit"
        className="flex-1 h-12 bg-[#E23359] hover:bg-[#E23359] text-white rounded-[16px]"
      >
        {isPending ? "Təsdiqlənir..." : "Təsdiqlə"}
      </Button>
    </div>
  );
}

export default ActionButtonsSection;
