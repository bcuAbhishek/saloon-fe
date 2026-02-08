import { apiClient } from "@/lib/api/client";
import type {
    AppointmentEnvelope,
    AppointmentListEnvelope,
    AppointmentStatusType,
    BookAppointment,
    FeedbackCreate,
    FeedbackEnvelope,
    FeedbackListEnvelope,
} from "./schema";

export const userApi = {
  // Appointments
  bookAppointment: async (data: BookAppointment): Promise<AppointmentEnvelope> => {
    const response = await apiClient.post<AppointmentEnvelope>(
      "/user/appointments/book",
      data
    );
    return response.data;
  },

  getAppointments: async (params?: {
    status?: AppointmentStatusType;
    page?: number;
    pageSize?: number;
  }): Promise<AppointmentListEnvelope> => {
    const response = await apiClient.get<AppointmentListEnvelope>(
      "/user/appointments/",
      {
        params: {
          status: params?.status,
          page: params?.page,
          page_size: params?.pageSize,
        },
      }
    );
    return response.data;
  },

  getAppointment: async (id: string): Promise<AppointmentEnvelope> => {
    const response = await apiClient.get<AppointmentEnvelope>(
      `/user/appointments/${id}`
    );
    return response.data;
  },

  cancelAppointment: async (id: string): Promise<AppointmentEnvelope> => {
    const response = await apiClient.post<AppointmentEnvelope>(
      `/user/appointments/${id}/cancel`
    );
    return response.data;
  },

  // Feedback
  createFeedback: async (data: FeedbackCreate): Promise<FeedbackEnvelope> => {
    const response = await apiClient.post<FeedbackEnvelope>(
      "/user/feedback/",
      data
    );
    return response.data;
  },

  getFeedbacks: async (params?: {
    page?: number;
    pageSize?: number;
  }): Promise<FeedbackListEnvelope> => {
    const response = await apiClient.get<FeedbackListEnvelope>(
      "/user/feedback/",
      {
        params: {
          page: params?.page,
          page_size: params?.pageSize,
        },
      }
    );
    return response.data;
  },

  getFeedbackForAppointment: async (appointmentId: string): Promise<FeedbackEnvelope> => {
    const response = await apiClient.get<FeedbackEnvelope>(
      `/user/feedback/appointment/${appointmentId}`
    );
    return response.data;
  },
};
