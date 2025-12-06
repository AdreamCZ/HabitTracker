"use client";

import { Check, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckinButtonProps = {
  checked: boolean;
  onCheck: () => void;
  disabled?: boolean;
};

export const CheckinButton = ({
  checked,
  onCheck,
  disabled,
}: CheckinButtonProps) => {
  return (
    <button
      onClick={onCheck}
      disabled={disabled}
      className={cn(
        "group relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-500 shadow-lg hover:shadow-xl",
        checked
          ? "bg-amber-400 text-white cursor-default scale-110"
          : "bg-primary text-primary-foreground hover:bg-primary/90",
        disabled && !checked && "opacity-50 cursor-not-allowed",
      )}
    >
      <div className="relative w-8 h-8">
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500",
            checked
              ? "opacity-0 rotate-180 scale-0"
              : "opacity-100 rotate-0 scale-100",
          )}
        >
          <Check className="w-8 h-8" />
        </div>
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500",
            checked
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-180 scale-0",
          )}
        >
          <Sparkles className="w-8 h-8" />
        </div>
      </div>
    </button>
  );
};
