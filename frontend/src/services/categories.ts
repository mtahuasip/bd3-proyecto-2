import api from "@/lib/fetch";
import { Category } from "@/types/category.types";

export const getCategories = async (): Promise<Category[]> =>
  await api({ endpoint: "/categories" });

export const getCategoriesSamples = async (
  limit: number
): Promise<Category[]> =>
  await api({ endpoint: `/categories/samples?limit=${limit}` });
