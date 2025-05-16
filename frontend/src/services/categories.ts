import { Category } from "@/types/category";
import apiRequest from "./api-request";

export const getCategoriesRequest = (): Promise<Category[]> =>
  apiRequest({ method: "GET", endpoint: "/categories" });
