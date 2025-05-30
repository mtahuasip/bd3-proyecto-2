import { getSession } from "@/lib/session";

const API_BASE_URL = process.env.API_BASE_URL;

interface FetchOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  endpoint: string;
  body?: unknown;
}

const instance = async <T = unknown>({
  method = "GET",
  endpoint,
  body,
}: FetchOptions): Promise<T> => {
  const session = await getSession();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: response.statusText,
    }));

    throw new Error(
      JSON.stringify({
        status: response.status,
        ...errorData,
      })
    );
  }

  return response.json();
};

export default instance;
