export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors?: Record<string, string[]> | string[] | null;
}

export interface ApiErrorPayload {
  status: number;
  message: string;
  errors?: Record<string, string[]> | string[] | null;
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
