import { ChefHat, Plus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

function EmptyRecipe({
  isFiltered,
  setCurrentView,
}: {
  isFiltered: boolean;
  setCurrentView: (view: string) => void;
}) {
  return (
    <div className="text-center py-12">
      <ChefHat className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No recipes found
      </h3>
      <p className="text-muted-foreground mb-6">
        {isFiltered
          ? "Try adjusting your search or filters"
          : "Start by adding your first recipe"}
      </p>
      <Button variant="recipe" onClick={() => setCurrentView("add")}>
        <Plus className="w-4 h-4 mr-2" />
        Add Recipe
      </Button>
    </div>
  );
}

export default EmptyRecipe;
