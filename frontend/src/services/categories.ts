import api from "@/lib/fetch";
import { Category } from "@/types/category.types";

export const getCategories = async (): Promise<Category[]> =>
  await api({ endpoint: "/categories" });

export const getNoAuthCategories = async (): Promise<Category[]> =>
  await api({ endpoint: "/pages/no-auth/categories" });
