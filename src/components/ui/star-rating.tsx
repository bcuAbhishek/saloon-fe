"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  className?: string;
}

export function StarRating({
  rating = 0,
  onRatingChange,
  maxRating = 5,
  size = "md",
  readonly = false,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const handleClick = (index: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starIndex = index + 1;
        const isFilled = starIndex <= (hoverRating || rating);

        return (
          <button
            key={starIndex}
            type="button"
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => !readonly && setHoverRating(starIndex)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            disabled={readonly}
            className={cn(
              "rounded-lg border-2 transition-all duration-200",
              sizeClasses[size],
              isFilled
                ? "bg-primary-text border-primary-text"
                : "bg-white border-gray-200",
              !readonly && "cursor-pointer hover:border-primary-text/50",
              readonly && "cursor-default"
            )}
          />
        );
      })}
    </div>
  );
}

function StarIcon({
  className,
  filled,
}: {
  className?: string;
  filled: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
