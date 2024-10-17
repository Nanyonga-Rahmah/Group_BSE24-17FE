import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, EyeIcon } from "lucide-react";
import { DeleteDialog } from "./DeleteDialog";
import { Link } from "react-router-dom";
import { IPost } from "./Posts";
export interface IActionProps {
  post?: IPost;
  onDeleteSuccess?: () => void; // Add this prop
}

export function Actions({ post, onDeleteSuccess }: IActionProps) {
  console.log("Post object in Actions:", post);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <img src="/icons/actions.svg" alt="Actions" className="relative" />
      </PopoverTrigger>
      <PopoverContent className="w-36 flex flex-col gap-2 absolute font-normal text-[13px] -top-36 -left-40  ">
        <Link to="/view-article" state={{ Post: post }}>
          <div className="flex items-center gap-2">
            <span>
              <EyeIcon className="h-4 w-4" />
            </span>
            <span>View</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <span>
            <Edit className="h-4 w-4" />
          </span>

          <span>Edit</span>
        </div>
        <DeleteDialog postId={post?._id} onDeleteSuccess={onDeleteSuccess} />
      </PopoverContent>
    </Popover>
  );
}
