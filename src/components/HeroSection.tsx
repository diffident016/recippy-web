import { Plus } from "lucide-react";
import { Button } from "./ui/button";

function HeroSection() {
  return (
    <div className="z-10 w-full flex flex-col items-center gap-2 justify-center">
      <h1 className="scroll-m-20 mt-16 text-center md:text-5xl text-3xl font-extrabold tracking-tight text-balance">
        Welcome to Recippy
      </h1>
      <h3 className="scroll-m-20 md:text-2xl text-xl text-center font-semibold tracking-tight">
        Organize, discover, and create amazing recipes
      </h3>
      <Button
        variant="recipe"
        size="lg"
        onClick={() => {}}
        className="text-lg px-8 py-3 mt-6"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Your Recipe
      </Button>
    </div>
  );
}

export default HeroSection;
