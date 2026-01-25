"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NameChip } from "./name-chip";

interface DynamicServiceCardProps {
  label: string;
  title: string;
  description: string;
  badgeText?: string;
  image: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}


export default function DynamicServiceCard({
  label,
  title,
  description,
  badgeText,
  image,
  href,
  onClick,
  className,
}: DynamicServiceCardProps) {
  const CardContent = (
    <div className="flex items-center justify-between gap-6 p-6">
      {/* Left Content Area */}
      <div className="flex flex-col flex-1 min-w-0 items-start">
        <span className="text-sm text-primary-text/80 mb-2 tracking-wide uppercase">
          {label}
        </span>
        <h3 className="text-base font-bold text-foreground mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-primary-text mb-6">
          {description}
        </p>
        
        {badgeText && (
          <NameChip label={badgeText} /> 
        )}
      </div>

      {/* Right Image Area */}
      <div className="relative flex-shrink-0 w-30 h-30 overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 160px, 192px"
        />
      </div>
    </div>
  );

  const containerClasses = cn(
    "group block w-full rounded-xl bg-contrast-bg transition-all duration-300",
    "hover:shadow-[0_20px_50px_rgba(150,79,97,0.12)] hover:-translate-y-1",
    "active:scale-[0.98] outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
    "border border-white/40",
    className
  );

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {CardContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={containerClasses}
    >
      {CardContent}
    </button>
  );
}
