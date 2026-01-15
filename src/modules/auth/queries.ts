import { authApi } from "@/modules/auth/api";
import { useQuery } from "@tanstack/react-query";
import type { UserResponse } from "./schema";

export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "currentUser"] as const,
};

export const getUserProfileQuery = () => {
  const query = useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      return authApi.profile();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user: query.data?.data as UserResponse | undefined,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
