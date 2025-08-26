import { Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

function SearchFilters({
  searchTerm,
  handleSearchChange,
  categoryFilter,
  handleCategoryChange,
  setCurrentView,
}: {
  searchTerm: string;
  handleSearchChange: (value: string) => void;
  categoryFilter: string;
  handleCategoryChange: (value: string) => void;
  setCurrentView: (view: string) => void;
}) {
  return (
    <section className="py-8 px-4 border-b">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 md:max-w-md w-[80%]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search recipes, ingredients, or tags..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-3 items-center md:w-fit w-[80%]">
            <Select value={categoryFilter} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
                <SelectItem value="Dessert">Dessert</SelectItem>
                <SelectItem value="Snack">Snack</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="recipe"
              onClick={() => setCurrentView("add")}
              className="md:w-fit w-1/2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Recipe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchFilters;
