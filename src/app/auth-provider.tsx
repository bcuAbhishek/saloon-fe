"use client";

import { useGetProfileQuery } from "@/modules/auth/queries";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isError, error, isAuthenticated } = useGetProfileQuery();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/", "/login", "/signup"];

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && publicRoutes.includes(pathname)) {
      router.push("/dashboard");
    } else if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, pathname, router]);



  return <>{children}</>;
}
