import { LoginDialog } from "./Login";

import { Link } from "react-router-dom";
import { ProfileDialog } from "./ProfilePopover";
export interface IStatus {
  status: boolean;
}
function Header({ status }: IStatus) {
  return (
    <div className="flex justify-around ">
      <h3 className="font-bold text-[22px]">
        <span className="text-primary">Good</span>
        <span className="text-white">Blogger</span>
      </h3>
      <div className="flex gap-5 text-base font-normal text-white items-center">
        <Link to="/about-us">About us</Link>
        <Link to="/write-article">Write</Link>
        {status ? <ProfileDialog /> : <LoginDialog />}
      </div>
    </div>
  );
}

export default Header;
