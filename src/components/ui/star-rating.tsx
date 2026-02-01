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
      // Toggle: if clicking the same rating, reset to 0
      if (rating === index) {
        onRatingChange(0);
      } else {
        onRatingChange(index);
      }
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
