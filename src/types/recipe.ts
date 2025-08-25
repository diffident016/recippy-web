export interface Recipe {
  _id?: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "Breakfast" | "Lunch" | "Dinner" | "Dessert" | "Snack";
  tags: string[];
  createdAt: Date;
}
