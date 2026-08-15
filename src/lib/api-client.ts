const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json'
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers
    },
    cache: 'no-store' // Fresh data for dynamic integration
  };

  const response = await fetch(url, config);
  const json: ApiResponse<T> = await response.json();

  if (!response.ok || json.success === false) {
    const errorMsg = json.error?.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return json;
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await apiFetch<T>(endpoint, { method: 'GET' });
  return res.data as T;
}

export async function apiPost<T, B = unknown>(endpoint: string, body: B): Promise<T> {
  const res = await apiFetch<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body)
  });
  return res.data as T;
}
