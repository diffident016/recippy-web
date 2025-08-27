import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import EmptyRecipe from "@/components/EmptyRecipe";
import HeroSection from "@/components/HeroSection";
import { RecipeForm } from "@/components/RecipeForm";
import type { RecipeSchema } from "@/lib/zod";
import type z from "zod";
import type { PaginatedRecipes, Recipe } from "@/types/recipe";
import { RecipeApi } from "@/services/recipe";
import { toast } from "sonner";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeView } from "@/components/RecipeView";
import RecipePagination from "@/components/RecipePagination";
import RecipeLoading from "@/components/RecipeLoading";

function Home() {
  const [search, setSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentRecipes, setCurrentRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [pagination, setPagination] = useState<PaginatedRecipes | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentView, setCurrentView] = useState<
    "view" | "add" | "edit" | "list"
  >("list");

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      getRecipes(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search, categoryFilter]);

  const getRecipes = async (page?: number) => {
    try {
      setIsLoading(true);
      const recipes = await RecipeApi.getByPageSearch({
        page: page || currentPage,
        search: search,
        category: categoryFilter === "All" ? "" : categoryFilter,
      });

      setIsLoading(false);
      setPagination(recipes);
      setCurrentRecipes(recipes.recipes);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching recipes:", error);
      toast.error("Failed to fetch recipes. Please try again.");
    }
  };

  const handleAddRecipe = async (recipe: z.infer<typeof RecipeSchema>) => {
    let newRecipe: Recipe = {
      ...recipe,
      ingredients: recipe.ingredients.split("\n").map((item) => item.trim()),
      instructions: recipe.instructions.split("\n").map((item) => item.trim()),
      tags:
        typeof recipe.tags === "string" && recipe.tags.length > 0
          ? recipe.tags.split(",").map((tag) => tag.trim())
          : [],
    };

    try {
      setIsLoading(true);
      const createdRecipe = await RecipeApi.create(newRecipe);

      getRecipes();
      setCurrentView("list");
      setIsLoading(false);
      toast.success("Recipe Added!", {
        description: (
          <p>
            <span className="font-semibold">{createdRecipe.name}</span> has been
            added to your recipe collection.
          </p>
        ),
      });
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error adding recipe:", error.message);
      toast.error("Failed to add recipe. Please try again.");
    }
  };

  const handleUpdateRecipe = async (
    id: string,
    recipe: z.infer<typeof RecipeSchema>
  ) => {
    let updatedRecipe: Recipe = {
      ...recipe,
      ingredients: recipe.ingredients.split("\n").map((item) => item.trim()),
      instructions: recipe.instructions.split("\n").map((item) => item.trim()),
      tags:
        typeof recipe.tags === "string" && recipe.tags.length > 0
          ? recipe.tags.split(",").map((tag) => tag.trim())
          : [],
    };
    try {
      await RecipeApi.update(id, updatedRecipe);
      getRecipes();
      setCurrentView("list");
      toast.success("Recipe updated successfully.");
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Failed to update recipe. Please try again.");
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    try {
      await RecipeApi.delete(id);
      getRecipes();
      toast.success("Recipe deleted successfully.");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Failed to delete recipe. Please try again.");
    }
  };

  const handleButtonClick = (view: "edit" | "view", recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView(view);
  };

  if (currentView === "add" || (currentView === "edit" && selectedRecipe)) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <RecipeForm
          recipe={selectedRecipe}
          onSubmit={(recipe: z.infer<typeof RecipeSchema>) => {
            if (currentView === "edit" && selectedRecipe) {
              handleUpdateRecipe(selectedRecipe._id as string, recipe);
              return;
            }
            handleAddRecipe(recipe);
          }}
          onCancel={() => setCurrentView("list")}
          isLoading={isLoading}
        />
      </div>
    );
  }

  if (currentView === "view" && selectedRecipe) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <RecipeView
          recipe={selectedRecipe}
          onBack={() => {
            setCurrentView("list");
            setSelectedRecipe(null);
          }}
          onEdit={() => {
            handleButtonClick("edit", selectedRecipe);
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <main
        style={{
          backgroundImage: "url('/src/assets/images/hero.jpg')",
        }}
        className="relative w-full lg:min-h-[60%] md:min-h-[50%] min-h-[40%] flex flex-col items-center lg:px-16 md:px-10 px-8 py-8 bg-no-repeat bg-cover bg-center text-header-text"
      >
        <Navbar />
        <HeroSection />
        <div className="absolute inset-0 bg-black/45" />
      </main>
      <div className="w-full flex flex-col">
        <SearchFilters
          searchTerm={search}
          handleSearchChange={(value) => setSearch(value)}
          categoryFilter={categoryFilter}
          handleCategoryChange={(value) => setCategoryFilter(value)}
          setCurrentView={(value) =>
            setCurrentView(value as "view" | "add" | "edit" | "list")
          }
        />
      </div>
      <section className="py-8 px-4 flex">
        {isLoading ? (
          <div className="max-w-6xl mx-auto w-full">
            <RecipeLoading />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {currentRecipes.length < 1 ? (
              <EmptyRecipe
                isFiltered={!!search || categoryFilter !== "All"}
                setCurrentView={(value) =>
                  setCurrentView(value as "view" | "add" | "edit" | "list")
                }
              />
            ) : (
              <div className="flex flex-col w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentRecipes.map((recipe: Recipe) => (
                    <RecipeCard
                      key={recipe._id}
                      recipe={recipe}
                      onView={() => {
                        handleButtonClick("view", recipe);
                      }}
                      onEdit={() => {
                        handleButtonClick("edit", recipe);
                      }}
                      onDelete={(id: string) => {
                        handleDeleteRecipe(id);
                      }}
                    />
                  ))}
                </div>
                {pagination && pagination.totalPages > 1 && (
                  <RecipePagination
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={(page: number) => {
                      setCurrentPage(page);
                      getRecipes(page);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
