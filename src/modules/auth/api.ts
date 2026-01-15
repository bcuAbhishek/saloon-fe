import { apiClient } from "@/lib/api/client";
import type {
  ChangePassword,
  UpdateProfile,
  UserEnvelope,
  UserLogin,
  UserRegister,
} from "./schema";

export const authApi = {
  register: async (data: UserRegister): Promise<UserEnvelope> => {
    const response = await apiClient.post<UserEnvelope>(
      "/auth/register",
      data
    );
    return response.data;
  },

  login: async (credentials: UserLogin): Promise<UserEnvelope> => {
    const response = await apiClient.post<UserEnvelope>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  profile: async (): Promise<UserEnvelope> => {
    const response = await apiClient.get<UserEnvelope>("/auth/profile");
    return response.data;
  },

  refreshToken: async (): Promise<UserEnvelope> => {
    const response = await apiClient.post<UserEnvelope>("/auth/refresh-token");
    return response.data;
  },

  logout: async (): Promise<UserEnvelope> => {
    const response = await apiClient.post<UserEnvelope>("/auth/logout");
    return response.data;
  },

  changePassword: async (data: ChangePassword): Promise<UserEnvelope> => {
    const response = await apiClient.post<UserEnvelope>(
      "/auth/change-password",
      data
    );
    return response.data;
  },

  updateProfile: async (data: UpdateProfile): Promise<UserEnvelope> => {
    const formData = new FormData();
    if (data.fullName) formData.append("full_name", data.fullName);
    if (data.email) formData.append("email", data.email);
    if (data.phoneNumber) formData.append("phone_number", data.phoneNumber);

    const response = await apiClient.patch<UserEnvelope>(
      "/auth/update-profile",
      formData
    );
    return response.data;
  },
};
