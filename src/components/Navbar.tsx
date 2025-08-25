import { ChefHat } from "lucide-react";

function Navbar() {
  return (
    <div className="w-full h-16 text-header-text z-10">
      <div className="flex flex-row items-center gap-2 text-2xl cursor-pointer">
        <ChefHat size={42} />
        <h1 className="scroll-m-20 text-center text-2xl font-extrabold -tracking-normal text-balance">
          Recippy
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
