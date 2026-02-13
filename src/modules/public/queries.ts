import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { publicApi } from "./api";
import type { GetSaloonsParams, GetServicesParams } from "./schema";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["public", "categories"],
    queryFn: publicApi.getCategories,
  });
};

export const useGetCategory = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["public", "category", id],
    queryFn: () => publicApi.getCategory(id),
    enabled: !!id && enabled,
  });
};

export const useGetSaloons = (params?: GetSaloonsParams) => {
  return useQuery({
    queryKey: ["public", "saloons", params],
    queryFn: () => publicApi.getSaloons(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetSaloon = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["public", "saloon", id],
    queryFn: () => publicApi.getSaloon(id),
    enabled: !!id && enabled,
  });
};

export const useGetSaloonServices = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["public", "saloon", id, "services"],
    queryFn: () => publicApi.getSaloonServices(id),
    enabled: !!id && enabled,
  });
};

export const useGetServices = (params?: GetServicesParams) => {
  return useQuery({
    queryKey: ["public", "services", params],
    queryFn: () => publicApi.getServices(params),
  });
};

export const useGetService = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["public", "service", id],
    queryFn: () => publicApi.getService(id),
    enabled: !!id && enabled,
  });
};
