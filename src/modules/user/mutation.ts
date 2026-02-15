import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userApi } from "./api";
import { userKeys } from "./queries";
import type { BookAppointment } from "./schema";

export const useBookAppointmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookAppointment) => userApi.bookAppointment(data),
    onSuccess: () => {
      toast.success("Appointment booked successfully");
      queryClient.invalidateQueries({ queryKey: userKeys.appointments() });
    },
    onError: (error: { response?: { data?: { detail?: string } } }) => {
      toast.error(
        error?.response?.data?.detail || "Failed to book appointment"
      );
    },
  });
};

export const useCancelAppointmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userApi.cancelAppointment(id),
    onSuccess: () => {
      toast.success("Appointment cancelled");
      queryClient.invalidateQueries({ queryKey: userKeys.appointments() });
    },
    onError: (error: { response?: { data?: { detail?: string } } }) => {
      toast.error(
        error?.response?.data?.detail || "Failed to cancel appointment"
      );
    },
  });
};
