import { env } from "@/config/env";
import axios, { type AxiosError } from "axios";
import humps from "humps";

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    // Avoid re-processing request data on retries
    if ((config as any)._retry) {
      return config;
    }

    if (config.data instanceof FormData) {
      return config;
    }

    if (config.data) {
      config.data = humps.decamelizeKeys(config.data);
    }

    if (config.params) {
      config.params = humps.decamelizeKeys(config.params);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}

let isRefreshing = false;
let failedQueue: RetryQueueItem[] = [];

const processQueue = (error: any, token: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = humps.camelizeKeys(response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    // Camelize error response
    if (error.response?.data) {
      error.response.data = humps.camelizeKeys(error.response.data);
    }

    const originalRequest = error.config as any;

    if (error.response?.status === 401 && originalRequest) {
      // Prevent infinite loops for login or refresh endpoints
      if (
        originalRequest.url?.includes("/auth/refresh-token") ||
        originalRequest.url?.includes("/auth/login")
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await apiClient.post("/auth/refresh-token");
        processQueue(null);
        isRefreshing = false;
        return apiClient(originalRequest);
      } catch (err: any) {
        processQueue(err, null);
        isRefreshing = false;

        if (err.response?.data?.error_code === "INVALID_TOKEN") {
          window.location.href = "/";
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
