import { Clock, Users, ChefHat, ArrowLeft, Edit, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Recipe } from "@/types/recipe";
import { formatRelative } from "date-fns";

interface RecipeViewProps {
  recipe: Recipe;
  onBack: () => void;
  onEdit: (recipe: Recipe) => void;
}

export const RecipeView = ({ recipe, onBack, onEdit }: RecipeViewProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Button>
        <Button variant="warm" onClick={() => onEdit(recipe)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Recipe
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-card to-recipe-cream border-0 shadow-xl">
        <CardHeader className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-bold text-foreground">
                {recipe.name}
              </CardTitle>
              <Badge variant="secondary" className="text-sm">
                {recipe.category}
              </Badge>
            </div>

            <p className="text-lg text-muted-foreground">
              {recipe.description}
            </p>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span>Cook: {recipe.cookTime}m</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-accent" />
                <span>{recipe.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span>
                  Created{" "}
                  {formatRelative(
                    new Date(recipe.createdAt || new Date()),
                    new Date()
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {recipe.tags &&
                recipe.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Instructions
            </h3>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-foreground leading-relaxed pt-1">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
