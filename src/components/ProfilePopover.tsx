import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Link, useNavigate } from "react-router-dom";

export function ProfileDialog() {
    const navigate=useNavigate();

  const HandleSignOut = () => {
    localStorage.clear();
    setTimeout(() => {

        navigate('/')
        window.location.reload();
    }),2000
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <img
          src="/images/avatar.png"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </PopoverTrigger>
      <PopoverContent className="w-36 flex flex-col gap-2">
        <Link to="/my-articles" className="flex items-center gap-2">
          <span>
            <img src="/icons/articles.svg" alt="articles" />
          </span>
          <span className="text-[13px] font-normal">My Articles</span>
        </Link>
        <Link to="/profile" className="flex items-center gap-2">
          <span>
            <img src="/icons/avatar.svg" alt="articles" />
          </span>
          <span className="text-[13px] font-normal">Profile</span>
        </Link>
        <div className="flex items-center gap-2 cursor-pointer " onClick={HandleSignOut}>
          <span>
            <img src="/icons/logout.svg" alt="articles" />
          </span>
          <span className="text-[13px] font-normal">Sign Out</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
