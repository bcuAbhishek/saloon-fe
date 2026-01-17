import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "./api";
import { authKeys } from "./queries";
import type { ChangePassword, UpdateProfile, UserEnvelope, UserLogin, UserRegister } from "./schema";
import { useRouter } from "next/navigation";

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UserRegister) => authApi.register(data),
    onSuccess: (response: UserEnvelope) => {
      toast.success("User registered successfully");
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail || "Failed to register user"
      );
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: UserLogin) => authApi.login(credentials),
    onSuccess: (response: UserEnvelope) => {
      toast.success("Login successful");
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ||
          "Failed to login. Please check your credentials."
      );
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return authApi.logout();
    },
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
      toast.success("Logged out successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || "Failed to logout");
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ChangePassword) => authApi.changePassword(data),
    onSuccess: (response: UserEnvelope) => {
      toast.success(response.detail || "Password changed successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail || "Failed to change password"
      );
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfile) => authApi.updateProfile(data),
    onSuccess: (response: UserEnvelope) => {
      toast.success(response.detail || "Profile updated successfully");
      queryClient.setQueryData(authKeys.currentUser(), response.data);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail || "Failed to update profile"
      );
    },
  });
};
