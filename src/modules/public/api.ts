import { apiClient } from "@/lib/api/client";
import type {
    CategoryDetailEnvelope,
    CategoryListEnvelope,
    GetSaloonsParams,
    GetServicesParams,
    SaloonDetailEnvelope,
    SaloonListEnvelope,
    ServiceArrayEnvelope,
    ServiceDetailEnvelope,
    ServiceListEnvelope,
} from "./schema";

export const publicApi = {
  // Categories
  getCategories: async (): Promise<CategoryListEnvelope> => {
    const response = await apiClient.get<CategoryListEnvelope>("/public/categories");
    return response.data;
  },

  getCategory: async (id: string): Promise<CategoryDetailEnvelope> => {
    const response = await apiClient.get<CategoryDetailEnvelope>(
      `/public/categories/${id}`
    );
    return response.data;
  },

  // Saloons
  getSaloons: async (params?: GetSaloonsParams): Promise<SaloonListEnvelope> => {
    const response = await apiClient.get<SaloonListEnvelope>("/public/saloons", {
      params: {
        search: params?.search,
        page: params?.page,
        page_size: params?.pageSize,
      },
    });
    return response.data;
  },

  getSaloon: async (id: string): Promise<SaloonDetailEnvelope> => {
    const response = await apiClient.get<SaloonDetailEnvelope>(
      `/public/saloons/${id}`
    );
    return response.data;
  },

  getSaloonServices: async (id: string): Promise<ServiceArrayEnvelope> => {
    const response = await apiClient.get<ServiceArrayEnvelope>(
      `/public/saloons/${id}/services`
    );
    return response.data;
  },

  // Services
  getServices: async (params?: GetServicesParams): Promise<ServiceListEnvelope> => {
    const response = await apiClient.get<ServiceListEnvelope>("/public/services", {
      params: {
        saloon_id: params?.saloonId,
        category_id: params?.categoryId,
        search: params?.search,
        page: params?.page,
        page_size: params?.pageSize,
      },
    });
    return response.data;
  },

  getService: async (id: string): Promise<ServiceDetailEnvelope> => {
    const response = await apiClient.get<ServiceDetailEnvelope>(
      `/public/services/${id}`
    );
    return response.data;
  },
};
