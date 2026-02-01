import { saloonsApi } from "@/modules/saloons/api";
import { useQuery } from "@tanstack/react-query";

export const saloonKeys = {
  all: ["saloons"] as const,
  lists: () => [...saloonKeys.all, "list"] as const,
  list: (params: { search?: string; page?: number; pageSize?: number }) =>
    [...saloonKeys.lists(), params] as const,
  details: () => [...saloonKeys.all, "detail"] as const,
  detail: (id: string) => [...saloonKeys.details(), id] as const,
  services: (id: string) => [...saloonKeys.detail(id), "services"] as const,
};

export const useGetSaloonsQuery = (params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: saloonKeys.list(params || {}),
    queryFn: () => saloonsApi.getAll(params),
  });
};

export const useGetSaloonQuery = (id: string) => {
  return useQuery({
    queryKey: saloonKeys.detail(id),
    queryFn: () => saloonsApi.getById(id),
    enabled: !!id,
  });
};

export const useGetSaloonServicesQuery = (id: string) => {
  return useQuery({
    queryKey: saloonKeys.services(id),
    queryFn: () => saloonsApi.getServices(id),
    enabled: !!id,
  });
};
