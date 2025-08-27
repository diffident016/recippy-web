import { ChefHat, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full h-16 text-header-text z-10 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-2 text-2xl cursor-pointer">
        <ChefHat size={42} />
        <h1 className="scroll-m-20 text-center text-2xl font-extrabold -tracking-normal text-balance">
          Recippy
        </h1>
      </div>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="p-2"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className=" h-[1.2rem] w-[1.2rem] absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}

export default Navbar;
