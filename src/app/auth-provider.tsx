"use client";

import { getUserProfileQuery } from "@/modules/auth/queries";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isError, error } = getUserProfileQuery();
  return <>{children}</>;
}
