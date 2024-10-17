import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteArticle } from "@/lib/routes"; // Ensure this is your delete route
import { Trash2 } from "lucide-react";
import { useState } from "react";

export interface DeleteDialogProps {
  postId?: string;
  onDeleteSuccess?: () => void;
}

export function DeleteDialog({ postId, onDeleteSuccess }: DeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${DeleteArticle}/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
        alert("Article deleted successfully");
      } else {
        alert("Failed to delete the article. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("An error occurred while deleting the article. Please try again.");
    } finally {
      setIsDeleting(false); // Reset loading state
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[89%] md:w-[30%] rounded-md my-3">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Delete this article?
          </DialogTitle>
          <DialogDescription>
            This action is permanent and cannot be undone. Are you sure you want
            to proceed?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between gap-4">
          <Button
            variant={"outline"}
            className="bg-white grow h-12 rounded-lg text-black"
            onClick={() => setIsDeleting(false)} // Option to keep the article
          >
            No, keep it
          </Button>
          <Button
            variant={"outline"}
            className="bg-red-400 rounded-lg h-12 text-white"
            onClick={handleDelete} // Delete the post
            disabled={isDeleting} // Disable during deletion
          >
            {isDeleting ? "Deleting..." : "Yes, delete Article"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
