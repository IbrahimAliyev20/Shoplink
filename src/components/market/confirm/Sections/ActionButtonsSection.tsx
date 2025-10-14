"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ActionButtonsSectionProps {
  marketSlug: string;
  isPending: boolean;
}

function ActionButtonsSection({ marketSlug, isPending }: ActionButtonsSectionProps) {

  return (
    <div className="flex w-full flex-col sm:flex-row space-x-4 gap-4 sm:gap-0 ">
      <Button
        type="button"
        variant="outline"
        asChild
        className="flex-1 h-12 rounded-[16px]"
      >
        <Link href={`/${marketSlug}/basket`}>
          Ləğv et
        </Link>
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
