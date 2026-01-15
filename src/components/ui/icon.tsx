"use client";

import * as icons from "@/assets/icons";
import React from "react";

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, className = "", size }) => {
  const iconSrc = icons[name];

  // Process SVG string - simple and fast (moved before early return)
  const processedSvg = React.useMemo(() => {
    if (!iconSrc) return "";

    let svg = iconSrc;

    // Remove width/height attributes to make it responsive
    svg = svg.replace(/\s*width=["'][^"']*["']/gi, "");
    svg = svg.replace(/\s*height=["'][^"']*["']/gi, "");

    // Add w-full h-full class to SVG element
    svg = svg.replace(/<svg/, '<svg class="w-full h-full"');

    return svg;
  }, [iconSrc]);

  if (!iconSrc) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Icon "${name}" not found`);
    }
    return null;
  }

  // Smart size handling - check if size utilities already exist in className
  const hasCustomSize = /size-\d+|size-\[|w-\d+|h-\d+|w-\[|h-\[/.test(
    className
  );

  // Build size class from size prop
  const sizeClass = size && !hasCustomSize ? `size-${size}` : "";

  // Default size if nothing provided
  const defaultSize = !hasCustomSize && !size ? "size-6" : "";

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${defaultSize} ${sizeClass} ${className}`}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
};

export default Icon;
