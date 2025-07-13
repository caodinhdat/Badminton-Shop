import axios from 'axios';
import axiosRetry from 'axios-retry';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000, // Thời gian timeout 5 giây
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry tự động khi gặp lỗi mạng hoặc 5xx
axiosRetry(http, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error: AxiosError) => {
    const isNetworkError = axiosRetry.isNetworkOrIdempotentRequestError(error);
    const status = error.response?.status;
    const isServerError = typeof status === 'number' && status >= 500;
    return isNetworkError || isServerError;
  }
});


// Interceptor gửi request – gán Authorization header nếu có token
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor xử lý response – xử lý lỗi 401
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized – Token có thể đã hết hạn');
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default http;
