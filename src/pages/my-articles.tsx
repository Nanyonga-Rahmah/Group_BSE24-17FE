import Header, { IStatus } from "@/components/Header";
import Post from "@/components/Posts";
import { Posts } from "./landing-page";

function MyArticles({ status }: IStatus) {
  return (
    <div>
      <div className="  p-4 bg-gradient-45 md:min-h-[40vh] max-w-[100vw] ">
        <div className="md:py-7">
          <Header status={status} />
        </div>
        <div className=" flex justify-center items-center  mt-20  ">
          <h3 className="font-bold text-3xl text-white font-[rales]">
            MyArticles
          </h3>
        </div>
      </div>
      <main className=" max-w-[100vw] w-[90vw] my-5 mx-auto overflow-x-hidden md:flex md:justify-center md:my-6">
        <Post posts={Posts} />
      </main>
    </div>
  );
}

export default MyArticles;
