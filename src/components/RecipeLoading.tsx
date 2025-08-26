import { Skeleton } from "./ui/skeleton";

function RecipeLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-4 w-full pb-6">
          <div className="space-y-2 flex flex-row gap-2">
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="h-5 w-[20%]" />
          </div>
          <Skeleton className="h-14 w-[90%]" />
          <div className="flex flex-row gap-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-4 w-1/2" />
          <div className="flex flex-row gap-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex flex-row gap-2">
            <Skeleton className="h-8 w-[70%]" />
            <Skeleton className="h-8 w-[15%]" />
            <Skeleton className="h-8 w-[15%]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeLoading;
