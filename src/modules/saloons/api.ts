import { apiClient } from "@/lib/api/client";
import type {
    SaloonDetailEnvelope,
    SaloonListEnvelope,
    ServiceListEnvelope,
} from "./schema";

export const saloonsApi = {
  getAll: async (params?: {
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<SaloonListEnvelope> => {
    const response = await apiClient.get<SaloonListEnvelope>("/public/saloons", {
      params: {
        search: params?.search,
        page: params?.page,
        page_size: params?.pageSize,
      },
    });
    return response.data;
  },

  getById: async (id: string): Promise<SaloonDetailEnvelope> => {
    const response = await apiClient.get<SaloonDetailEnvelope>(
      `/public/saloons/${id}`
    );
    return response.data;
  },

  getServices: async (id: string): Promise<ServiceListEnvelope> => {
    const response = await apiClient.get<ServiceListEnvelope>(
      `/public/saloons/${id}/services`
    );
    return response.data;
  },
};
