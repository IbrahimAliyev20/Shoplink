import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { getAcceptLanguageHeader } from "@/lib/utils";
import { extractErrorMessage } from "./errors";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TOKEN_COOKIE_NAME = "access_token";

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthToken = (): string | null => {
  return Cookies.get(TOKEN_COOKIE_NAME) || null;
};

const clearAuthToken = (): void => {
  Cookies.remove(TOKEN_COOKIE_NAME);
};

const handleUnauthorized = (): void => {
  clearAuthToken();
};

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

const handleApiError = (error: AxiosError<ApiErrorResponse>): string => {
  if (!error.response) {
    if (typeof window !== "undefined") {
      console.error(
        "İnternet bağlantısı yoxdur. Zəhmət olmasa yenidən cəhd edin."
      );
    }
    return "İnternet bağlantısı yoxdur. Zəhmət olmasa yenidən cəhd edin.";
  }

  const { status, data } = error.response;

  if (typeof window === "undefined") return "Naməlum xəta baş verdi.";

  switch (status) {
    case 401:
      handleUnauthorized();
      return "Hesab tapılmadı.";

    case 403:
      return "Bu əməliyyat üçün icazəniz yoxdur.";

    case 404:
      return "Axtardığınız məlumat tapılmadı.";

    case 422:
      if (data?.errors) {
        const firstError = Object.values(data.errors)[0]?.[0];
        return firstError || "Məlumatlar düzgün deyil.";
      } else {
        return data?.message || "Məlumatlar düzgün deyil.";
      }

    case 429:
      return "Çox sayda sorğu göndərildi. Bir az gözləyin.";

    case 500:
    case 502:
    case 503:
      return "Server xətası baş verdi. Zəhmət olmasa bir qədər sonra yenidən cəhd edin.";

    default:
      return data?.message || "Naməlum xəta baş verdi.";
  }
  
};

let interceptorsAttached = false;

const setupInterceptors = (): void => {
  if (interceptorsAttached) return;
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAuthToken();
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (config.data instanceof FormData && config.headers) {
        delete config.headers["Content-Type"];
      }

      if (config.headers) {
        const configLocale =
          config.params?.locale || config.headers["X-Locale"];

        if (configLocale) {
          config.headers["Accept-Language"] =
            getAcceptLanguageHeader(configLocale);
        } else {
          const currentLocale =
            typeof window !== "undefined"
              ? window.location.pathname.split("/")[1]
              : "az";

          const validLocales = ["az", "en", "ru"];
          const locale = validLocales.includes(currentLocale)
            ? currentLocale
            : "az";
          config.headers["Accept-Language"] = getAcceptLanguageHeader(locale);
        }
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ApiErrorResponse>) => {
      // Normalize error message but do not show toasts here
      const normalizedMessage =
        error.code === "ECONNABORTED" || error.code === "ETIMEDOUT"
          ? "Sorğu müddəti bitdi. Zəhmət olmasa yenidən cəhd edin."
          : handleApiError(error);

      // Override error.message so callers can toast exactly once
      if (normalizedMessage) {
        (error as Error).message = normalizedMessage;
      } else {
        (error as Error).message = extractErrorMessage(error);
      }
      return Promise.reject(error);
    }
  );
  interceptorsAttached = true;
};

setupInterceptors();

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await client.get<T>(url, config);
  return response.data;
};

export const post = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const requestConfig: AxiosRequestConfig = { ...config };

  if (data instanceof FormData) {
    requestConfig.headers = {
      ...requestConfig.headers,
      "Content-Type": undefined,
    };
  }

  const response = await client.post<T>(url, data, requestConfig);
  return response.data;
};

export const put = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  // PUT üçün də eyni məntiq
  const requestConfig: AxiosRequestConfig = { ...config };

  if (data instanceof FormData) {
    requestConfig.headers = {
      ...requestConfig.headers,
      "Content-Type": undefined,
    };
  }

  const response = await client.put<T>(url, data, requestConfig);
  return response.data;
};

export const patch = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  // PATCH üçün də eyni məntiq
  const requestConfig: AxiosRequestConfig = { ...config };

  if (data instanceof FormData) {
    requestConfig.headers = {
      ...requestConfig.headers,
      "Content-Type": undefined,
    };
  }

  const response = await client.patch<T>(url, data, requestConfig);
  return response.data;
};

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await client.delete<T>(url, config);
  return response.data;
};

export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
};

export default apiClient;
