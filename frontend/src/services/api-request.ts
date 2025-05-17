const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FetchOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  endpoint: string;
  body?: unknown;
  headers?: Record<string, string>;
}

const apiRequest = async <T = unknown>({
  method = "GET",
  endpoint,
  body,
  headers = {},
}: FetchOptions): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw {
      status: response.status,
      ...errorData,
    };
  }

  return response.json();
};

export default apiRequest;
