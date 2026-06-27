import type { ApiErrorPayload, ApiResponse } from '@/shared/types/api.types';

export class ApiError extends Error {
  readonly status: number;
  readonly errors?: ApiErrorPayload['errors'];

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = 'ApiError';
    this.status = payload.status;
    this.errors = payload.errors;
  }
}

function extractErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== 'object') {
    return fallback;
  }

  const record = body as Record<string, unknown>;

  if (typeof record.message === 'string' && record.message.length > 0) {
    return record.message;
  }

  if (typeof record.title === 'string' && record.title.length > 0) {
    return record.title;
  }

  return fallback;
}

function extractErrors(body: unknown): ApiErrorPayload['errors'] {
  if (!body || typeof body !== 'object') {
    return undefined;
  }

  const record = body as Record<string, unknown>;
  const errors = record.errors;

  if (Array.isArray(errors) || (errors && typeof errors === 'object')) {
    return errors as ApiErrorPayload['errors'];
  }

  return undefined;
}

export async function parseApiResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const body = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new ApiError({
      status: response.status,
      message: extractErrorMessage(body, response.statusText || 'Request failed'),
      errors: extractErrors(body),
    });
  }

  if (body && typeof body === 'object' && 'success' in body) {
    const envelope = body as ApiResponse<T>;

    if (!envelope.success) {
      throw new ApiError({
        status: response.status,
        message: envelope.message || 'Request failed',
        errors: envelope.errors ?? undefined,
      });
    }

    return envelope.data as T;
  }

  return body as T;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const base = import.meta.env.VITE_STREAM_API_URL ?? '';
  const url = `${base}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  return parseApiResponse<T>(response);
}
