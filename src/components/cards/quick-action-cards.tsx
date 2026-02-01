"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  image: string;
  slug: string;
  className?: string;
}

export default function QuickActionCard({ title, image, slug, className }: QuickActionCardProps) {
  return (
    <Link
      href={slug}
      className={cn(
        "group relative block aspect-4/5 overflow-hidden rounded-2xl bg-muted transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 z-10 p-6">
        <h3 className="text-2xl font-semibold text-white tracking-tight">
          {title}
        </h3>
      </div>
    </Link>
  );
}