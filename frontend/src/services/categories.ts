import { Category } from "@/types/category";
import apiRequest from "./api-request";

export const getCategories = (
  headers?: Record<string, string>
): Promise<Category[]> =>
  apiRequest({ method: "GET", endpoint: "/categories", headers });

export const getCategoriesSamples = (limit: number): Promise<Category[]> =>
  apiRequest({ method: "GET", endpoint: `/categories/samples?limit=${limit}` });
