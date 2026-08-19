export function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    // Server-side in Node.js (Server Components / SSR) - MUST use absolute backend URL
    const backendUrl = process.env.INTERNAL_BACKEND_URL || 'http://127.0.0.1:3001';
    return `${backendUrl}/api/v1`;
  }
  // Client-side in browser - use relative Next.js proxy route or env
  return process.env.NEXT_PUBLIC_API_URL || '/api/v1';
}

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
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json'
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers
    },
    cache: 'no-store' // Always fresh data from database
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
