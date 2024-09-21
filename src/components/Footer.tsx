import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex justify-between  w-full bottom-0  bg-black text-white  py-2 px-20 h-13 ">
      <div>
        <h3>
          <span>&copy;</span>
          <span>GoodBlogger</span>
        </h3>
      </div>

      <div className=" flex gap-3">
        <Link to="/about">About us</Link>
        <Link to="/about">Write</Link>
        <Link to="/about">Blog</Link>
        <Link to="/about">Terms</Link>
      </div>
    </div>
  );
}

export default Footer;
