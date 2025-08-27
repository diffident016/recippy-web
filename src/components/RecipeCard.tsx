import {
  Clock,
  Users,
  ChefHat,
  Eye,
  Edit,
  Trash2,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/types/recipe";
import { DeleteRecipeAlert } from "./DeleteRecipeAlert";
import { formatRelative } from "date-fns";

interface RecipeCardProps {
  recipe: Recipe;
  onView: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export const RecipeCard = ({
  recipe,
  onView,
  onEdit,
  onDelete,
}: RecipeCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-card to-recipe-cream border-0">
      <CardHeader className="pb-3 h-full">
        <div className="flex justify-between items-start">
          <CardTitle
            onClick={() => onView(recipe)}
            className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors hover:cursor-pointer"
          >
            {recipe.name}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {recipe.category}
          </Badge>
        </div>
        <p className="text-sm h-full text-muted-foreground line-clamp-2">
          {recipe.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <p>Cook Time: </p>
            <span className="font-semibold">{recipe.cookTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <p>Servings: </p>
            <span className="font-semibold">{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span className="font-semibold">{recipe.difficulty}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span className="font-semibold">
              Created{" "}
              {formatRelative(
                new Date(recipe.createdAt || new Date()),
                new Date()
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {recipe.tags &&
            recipe.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          {recipe.tags && recipe.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{recipe.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="recipe"
            size="sm"
            onClick={() => onView(recipe)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Recipe
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEdit(recipe)}>
            <Edit className="w-4 h-4" />
          </Button>
          <DeleteRecipeAlert
            id={recipe._id as string}
            name={recipe.name}
            onDelete={onDelete}
            onCancel={() => {}}
            isLoading={false}
          >
            <Button variant="destructive" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </DeleteRecipeAlert>
        </div>
      </CardContent>
    </Card>
  );
};
