import { LoginDialog } from "./Login";

import { Link } from "react-router-dom";
import { ProfileDialog } from "./ProfilePopover";
import { MobileNav } from "./MobileNav";
export interface IStatus {
  status: boolean;
}
function Header({ status }: IStatus) {
  return (
    <div className="flex justify-between md:justify-around ">
      <Link to="/">
        <h3 className="font-bold text-[22px] font-[Raleway]">
          <span className="text-primary">Good</span>
          <span className="text-white">Blogger</span>
        </h3>
      </Link>
      <div className="flex gap-5 text-base font-normal text-white items-center">
        <div className=" gap-5 hidden md:flex">
          <Link to="/about-us">About us</Link>
          <Link to="/write-article">Write</Link>
        </div>
        {status ? <ProfileDialog /> : <LoginDialog />}
        <div className="md:hidden">
          <MobileNav  />
        </div>
      </div>
    </div>
  );
}

export default Header;
