import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteArticle } from "@/lib/routes"; 
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
        toast.success("Article deleted successfully");
      } else {
        toast.success("Failed to delete the article. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the article. Please try again.");
    } finally {
      setIsDeleting(false); 
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
      <DialogContent className="sm:max-w-[425px] w-[89%] md:w-max rounded-md my-3">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Delete this article?
          </DialogTitle>
          <DialogDescription>
            This action is permanent and cannot be undone. Are you sure you want
            to proceed?
          </DialogDescription>
        </DialogHeader>
        <div className="md:grid grid-cols-2 gap-4">
          <Button
            variant={"outline"}
            className="bg-white px-2 grow h-12 rounded-lg text-black"
            onClick={() => setIsDeleting(false)} 
          >
            No, keep it
          </Button>
          <Button
            variant={"outline"}
            className="bg-red-400  rounded-lg h-12 px-2 text-white"
            onClick={handleDelete} 
            disabled={isDeleting} 
          >
            {isDeleting ? "Deleting..." : "Yes, delete Article"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
