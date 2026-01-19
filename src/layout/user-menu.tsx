"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "Book",
    icon: CalendarDays,
    href: "/book",
  },
  {
    label: "Appointments",
    icon: Clock,
    href: "/appointments",
  },
  {
    label: "Profile",
    icon: User,
    href: "/profile",
  },
];

export default function UserMenu() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/80 backdrop-blur-md pb-safe">
      <nav className="mx-auto flex max-w-md items-center justify-around py-3 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-[#803D4D]" : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              <Icon
                className={cn("h-6 w-6 transition-transform", isActive && "scale-110")}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn("text-xs font-medium", isActive && "font-semibold")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
