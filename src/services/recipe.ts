import { config } from "@/config";
import type { PaginatedRecipes, Recipe } from "@/types/recipe";
import axios from "axios";

const api = axios.create({
  baseURL: config.BASE_API_URL + "/api/recipes",
});

export const RecipeApi = {
  create: async (data: Omit<Recipe, "_id" | "createdAt">): Promise<Recipe> => {
    const res = await api.post<Recipe>("/", data);
    return res.data;
  },

  getAll: async (): Promise<Recipe[]> => {
    const res = await api.get<Recipe[]>("/");
    return res.data;
  },

  getById: async (id: string): Promise<Recipe> => {
    const res = await api.get<Recipe>(`/${id}`);
    return res.data;
  },

  getByPageSearch: async ({
    page = 1,
    limit = 10,
    search = "",
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedRecipes> => {
    const res = await api.get<PaginatedRecipes>("/search", {
      params: { page, limit, search },
    });
    return res.data;
  },

  update: async (
    id: string,
    data: Omit<Recipe, "_id" | "createdAt">
  ): Promise<Recipe> => {
    const res = await api.put<Recipe>(`/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete<{ message: string }>(`/${id}`);
    return res.data;
  },
};
