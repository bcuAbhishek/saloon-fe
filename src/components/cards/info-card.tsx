"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  label: string;
  title: string;
  subtext: string;
  image: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function InfoCard({
  label,
  title,
  subtext,
  image,
  href,
  onClick,
  className,
}: InfoCardProps) {
  const CardContent = (
    <div className="flex items-center justify-between gap-4 p-4">
      {/* Left Content */}
      <div className="flex flex-col flex-1 min-w-0 items-start ">
        <span className="text-sm  text-primary-text mb-1">
          {label}
        </span>
        <h3 className="text-xl font-bold text-foreground truncate mb-1">
          {title}
        </h3>
        <span className="text-base text-primary-text">
          {subtext}
        </span>
      </div>

      {/* Right Image */}
      <div className="relative flex-shrink-0 w-32 h-20 overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="128px"
        />
      </div>
    </div>
  );

  const containerClasses = cn(
    "group block w-full  rounded-3xl transition-all duration-300",
    "hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:bg-slate-50/50",
    "active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
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
