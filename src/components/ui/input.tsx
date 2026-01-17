import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Brand color: #e21b4d
        "file:text-[#e21b4d] placeholder:text-[#e21b4d]/70 selection:bg-[#e21b4d] selection:text-white border-[#e21b4d] h-11 w-full min-w-0 rounded-md border bg-[#e21b4d]/10 px-3 py-1 text-base text-[#e21b4d] shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[#e21b4d] focus-visible:ring-[#e21b4d]/20 focus-visible:ring-[2px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
