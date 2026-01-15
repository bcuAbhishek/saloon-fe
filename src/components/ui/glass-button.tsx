import "@/components/css/glass-button.css";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const glassButtonVariants = cva(
  "relative isolate all-unset cursor-pointer rounded-full transition-all",
  {
    variants: {
      size: {
        default: "text-base font-medium",
        sm: "text-sm font-medium",
        lg: "text-lg font-medium",
        xl: "text-xl font-medium",
        xxl: "text-2xl font-medium",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const glassButtonTextVariants = cva(
  "glass-button-text relative block select-none tracking-tighter",
  {
    variants: {
      size: {
        default: "text-base px-6 py-2.5",
        sm: "text-sm px-4 py-1.5",
        lg: "text-lg px-8 py-3",
        xl: "text-xl px-10 py-3.5",
        xxl: "text-2xl px-12 py-4.5",
        icon: "flex h-10 w-10 items-center justify-center",
      },
      variant: {
        white: "glass-button-text-white",
        black: "glass-button-text-black",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "black",
    },
  }
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants>,
    VariantProps<typeof glassButtonTextVariants> {
  contentClassName?: string;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size, variant, contentClassName, ...props }, ref) => {
    return (
      <div className={cn("glass-button-wrap w-fit", className)}>
        <button
          className={cn("glass-button", glassButtonVariants({ size }))}
          ref={ref}
          {...props}
        >
          <span
            className={cn(
              "glass-button-text",
              glassButtonTextVariants({ size, variant }),
              contentClassName
            )}
          >
            {children}
          </span>
        </button>
        <div className="glass-button-shadow"></div>
      </div>
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassButton, glassButtonVariants };
