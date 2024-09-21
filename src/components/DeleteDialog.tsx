import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

export function DeleteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          <span>
            <Trash2 className="h-4 w-4" />
          </span>

          <span>Delete</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[89%] md:w-[30%] rounded-md my-3">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl ">
            Delete this article?
          </DialogTitle>
          <DialogDescription>
            This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between gap-4 ">
          <Button
            variant={"outline"}
            className="bg-white grow h-12 rounded-lg text-black"
          >
            No keep it
          </Button>
          <Button
            variant={"outline"}
            className="bg-red-400 rounded-lg  h-12 text-white"
          >
            Yes delete Article
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
