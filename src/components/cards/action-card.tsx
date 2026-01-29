"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ActionCardProps {
  image: string;
  title: string;
  metadata: string[];
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  onClick?: () => void;
  className?: string;
}

/**
 * A dynamic and reusable card component designed for a premium look.
 * Can be used for services, bookings, tiers, etc.
 * Supports metadata mapping from backend and optional side action button.
 */
export function ActionCard({
  image,
  title,
  metadata,
  action,
  onClick,
  className,
}: ActionCardProps) {
  const CardContainer = action?.href ? Link : "div";
  
  const content = (
    <div className="flex flex-col gap-4">
      {/* Top Image Section */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Bottom Content Section */}
      <div className="flex items-end justify-between gap-4 px-1 pb-2">
        <div className="flex flex-col gap-1 text-start">
          <h3 className="text-xl font-bold tracking-tight text-foreground ">
            {title}
          </h3>
          <div className="flex flex-col gap-0.5">
            {metadata.map((text, index) => (
              <p key={index} className="text-sm font-medium text-primary-text sm:text-base">
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {action && (
          <div className="flex-shrink-0">
            {action.href ? (
              <Button 
                asChild 
                variant="brand"
                className="px-6 py-4 text-base font-semibold transition-all hover:scale-105 active:scale-95 rounded-xl"
              >
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ) : (
              <Button
                variant="brand"
                className="px-6 py-4 text-base font-semibold transition-all hover:scale-105 active:scale-95 rounded-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick?.();
                }}
              >
                {action.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative w-full cursor-pointer transition-all duration-300",
        className
      )}
    >
      {action?.href ? (
        <Link href={action.href} className="block">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
