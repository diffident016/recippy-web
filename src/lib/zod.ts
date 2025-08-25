import { number, object, string, z } from "zod";

export const RecipeSchema = object({
  name: string().min(1, "Recipe name is required"),
  description: string().min(1, "Description is required"),
  ingredients: string().min(1, "Ingredients must be at least 1"),
  instructions: string().min(1, "Instructions must be ate least 1"),
  cookTime: number().min(1, "Add cook time in minutes"),
  servings: number().min(1, "Servings must be at least 1"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  category: z.enum(["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"]),
  tags: string().optional(),
});
