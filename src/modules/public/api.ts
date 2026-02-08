import { apiClient } from "@/lib/api/client";
import type {
    CategoryDetailEnvelope,
    CategoryListEnvelope,
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

  // Services
  getServices: async (params?: {
    saloonId?: string;
    categoryId?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<ServiceListEnvelope> => {
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
