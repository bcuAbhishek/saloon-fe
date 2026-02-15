import { userApi } from "@/modules/user/api";
import type { AppointmentStatusType } from "@/modules/user/schema";
import { useQuery } from "@tanstack/react-query";

export const userKeys = {
  all: ["user"] as const,
  appointments: () => [...userKeys.all, "appointments"] as const,
  appointmentsList: (params?: {
    status?: AppointmentStatusType;
    page?: number;
    pageSize?: number;
  }) => [...userKeys.appointments(), "list", params ?? {}] as const,
  appointmentDetail: (id: string) =>
    [...userKeys.appointments(), "detail", id] as const,
};

export const useGetAppointmentsQuery = (params?: {
  status?: AppointmentStatusType;
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: userKeys.appointmentsList(params),
    queryFn: () => userApi.getAppointments(params),
  });
};

export const useGetAppointmentQuery = (id: string) => {
  return useQuery({
    queryKey: userKeys.appointmentDetail(id),
    queryFn: () => userApi.getAppointment(id),
    enabled: !!id,
  });
};
