"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ListItemCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string | string[];
  rightElement?: ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * A dynamic and reusable list item component.
 * Used for Profile Info, Rewards, and Notifications.
 * Features a consistent layout with an icon, title, subtitle(s), and a right-side element.
 */
export function ListItemCard({
  icon,
  title,
  subtitle,
  rightElement,
  onClick,
  className,
}: ListItemCardProps) {
  const subtitles = Array.isArray(subtitle) ? subtitle : [subtitle];

  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex items-center gap-4 py-3 transition-all duration-200",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
    >
      {/* Left Icon Area */}
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-contrast-bg text-foreground shadow-sm transition-transform group-hover:scale-105">
        <div className="flex items-center justify-center h-6 w-6">
          {icon}
        </div>
      </div>

      {/* Center Text Area */}
      <div className="flex flex-1 flex-col justify-center min-w-0 text-start">
        <h4 className="text-[17px] font-semibold tracking-tight text-foreground truncate">
          {title}
        </h4>
        <div className="flex flex-col">
          {subtitles.map((text, index) => (
            <p
              key={index}
              className="text-sm font-medium leading-tight text-primary-text sm:text-[15px]"
            >
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* Right Action/Info Area */}
      {rightElement && (
        <div className="flex-shrink-0 flex items-center ml-2">
          {rightElement}
        </div>
      )}
    </div>
  );
}
