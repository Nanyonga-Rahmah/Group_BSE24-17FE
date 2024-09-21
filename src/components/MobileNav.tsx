

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import { Link } from "react-router-dom";


export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-icon text-2xl" />
      </SheetTrigger>
      <SheetContent className="pt-10">
        <div className="flex gap-5 text-base my-4  flex-col font-normal text-black ">
          <Link to="/about-us">About us</Link>
          <Link to="/write-article">Write</Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
