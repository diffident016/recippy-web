import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@/types/recipe";
import { X, Save, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { RecipeSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface RecipeFormProps {
  recipe: Recipe | null;
  onSubmit: (data: z.infer<typeof RecipeSchema>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const RecipeForm = ({
  recipe,
  onSubmit,
  onCancel,
  isLoading,
}: RecipeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof RecipeSchema>>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      name: recipe?.name || "",
      description: recipe?.description || "",
      ingredients: recipe?.ingredients.join("\n") || "",
      instructions: recipe?.instructions.join("\n") || "",
      cookTime: recipe?.cookTime || 1,
      servings: recipe?.servings || 1,
      difficulty: recipe?.difficulty || "Easy",
      category: recipe?.category || "Breakfast",
      tags: recipe?.tags ? recipe.tags.join(", ") || "" : "",
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto bg-background border shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-2xl font-bold text-foreground">
          {recipe ? "Edit Recipe" : "Add New Recipe"}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Recipe Name</Label>
              <Input
                id="name"
                register={register}
                placeholder="Enter recipe name"
                error={errors.name}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={watch("category")}
                onValueChange={(value) =>
                  setValue(
                    "category",
                    value as z.infer<typeof RecipeSchema>["category"],
                    { shouldValidate: true }
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                  <SelectItem value="Snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              register={register}
              placeholder="Brief description of the recipe"
              rows={3}
            />
            {errors?.description && (
              <p className="text-destructive text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cookTime">Cook Time (min)</Label>
              <Input
                id="cookTime"
                type="number"
                value={watch("cookTime")}
                onChange={(e) => setValue("cookTime", Number(e.target.value))}
                error={errors.cookTime}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                type="number"
                value={watch("servings")}
                onChange={(e) => setValue("servings", Number(e.target.value))}
                error={errors.servings}
              />
            </div>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              value={watch("difficulty")}
              onValueChange={(value) =>
                setValue(
                  "difficulty",
                  value as z.infer<typeof RecipeSchema>["difficulty"],
                  { shouldValidate: true }
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 flex flex-col">
            <Label htmlFor="ingredients">Ingredients (one per line)</Label>
            <Textarea
              id="ingredients"
              register={register}
              placeholder="1 cup flour&#10;2 eggs&#10;1/2 cup milk"
              rows={6}
            />
            {errors?.ingredients && (
              <p className="text-destructive text-xs">
                {errors.ingredients.message}
              </p>
            )}
          </div>

          <div className="space-y-2 flex flex-col">
            <Label htmlFor="instructions">
              Instructions (one step per line)
            </Label>
            <Textarea
              id="instructions"
              placeholder="Preheat oven to 350°F&#10;Mix ingredients in a bowl&#10;Bake for 30 minutes"
              rows={6}
              register={register}
            />
            {errors?.instructions && (
              <p className="text-destructive text-xs">
                {errors.instructions.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              register={register}
              error={errors.tags}
              placeholder="vegetarian, quick, healthy"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              disabled={isLoading}
              type="submit"
              variant="recipe"
              className="flex-1"
            >
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isLoading
                ? "Saving, please wait..."
                : recipe
                ? "Update Recipe"
                : "Save Recipe"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-24"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
