import axios, { AxiosError } from 'axios';

export class ApiError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export const normalizeError = (error: unknown, fallbackMessage = 'Something went wrong'): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<{ message?: string }>;
    const serverMessage = axiosErr.response?.data?.message;
    const status = axiosErr.response?.status;
    const code = axiosErr.code;

    if (status === 401) return new ApiError('Unauthorized. Please log in again.', status);
    if (status === 403) return new ApiError('You do not have permission to view this content.', status);
    if (status === 404) return new ApiError('Requested resource was not found.', status);
    if (status === 429) return new ApiError('Too many requests. Please slow down.', status);
    if (status && status >= 500) return new ApiError('Server error. Please try again later.', status);
    if (code === 'ECONNABORTED') return new ApiError('Request timed out. Check your connection.', undefined, code);
    if (code === 'ERR_NETWORK') return new ApiError('Network error. Check your internet connection.', undefined, code);

    return new ApiError(serverMessage ?? fallbackMessage, status);
  }

  if (error instanceof Error) return new ApiError(error.message);

  return new ApiError(fallbackMessage);
};

// Use in query hooks to determine smart retry logic
export const shouldRetry = (error: unknown): boolean => {
  if (error instanceof ApiError) {
    const noRetryStatuses = [401, 403, 404];
    if (error.status && noRetryStatuses.includes(error.status)) return false;
  }
  return true;
};