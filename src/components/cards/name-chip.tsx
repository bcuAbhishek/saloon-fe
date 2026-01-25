"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NameChipProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export function NameChip({
  label,
  icon,
  onClick,
  isActive = false,
  className,
}: NameChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
        "rounded-2xl border-none outline-none whitespace-nowrap",
        "bg-gray-100 hover:bg-primary-text hover:text-white active:scale-95",
        isActive && "bg-primary-text text-white shadow-md",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {label}
    </button>
  );
}
