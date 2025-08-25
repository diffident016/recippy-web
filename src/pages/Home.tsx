import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import EmptyRecipe from "@/components/EmptyRecipe";
import HeroSection from "@/components/HeroSection";
import { RecipeForm } from "@/components/RecipeForm";
import type { RecipeSchema } from "@/lib/zod";
import type z from "zod";

function Home() {
  const [search, setSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [currentView, setCurrentView] = useState<
    "view" | "add" | "edit" | "list"
  >("list");

  const handleAddRecipe = (recipe: z.infer<typeof RecipeSchema>) => {
    console.log("New Recipe:", recipe);
  };

  if (currentView === "add") {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <RecipeForm
          onSubmit={handleAddRecipe}
          onCancel={() => setCurrentView("list")}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center overflow-hidden">
      <div className="w-full h-full flex flex-col overflow-auto">
        <main
          style={{
            backgroundImage: "url('/src/assets/images/hero.jpg')",
          }}
          className="relative w-full h-[90%] flex flex-col items-center px-16 py-8 bg-no-repeat bg-cover bg-center text-header-text"
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
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <EmptyRecipe
              isFiltered={!!search || categoryFilter !== "All"}
              setCurrentView={(value) =>
                setCurrentView(value as "view" | "add" | "edit" | "list")
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
