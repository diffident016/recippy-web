import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ReactNode } from "react";

interface DeleteRecipeProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  children: ReactNode;
}

export function DeleteRecipeAlert({
  id,
  name,
  onDelete,
  onCancel,
  isLoading,
  children,
}: DeleteRecipeProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
          <AlertDialogDescription>
            <p>
              Are you sure you want to delete the recipe{" "}
              <span className="font-semibold">{name}</span>?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete(id)}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
