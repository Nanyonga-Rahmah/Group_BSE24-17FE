import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Edit2, EyeIcon, Trash, Trash2 } from "lucide-react";

export function Actions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <img src="/icons/actions.svg" alt="Actions" className="relative" />
      </PopoverTrigger>
      <PopoverContent className="w-36 flex flex-col gap-2 absolute font-normal text-[13px] -top-36 -left-40  ">
        <div className="flex items-center gap-2">
          <span>
            <EyeIcon className="h-4 w-4" />
          </span>
          <span>View</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <Edit className="h-4 w-4" />
          </span>

          <span>Edit</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <Trash2 className="h-4 w-4" />
          </span>

          <span>Delete</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
