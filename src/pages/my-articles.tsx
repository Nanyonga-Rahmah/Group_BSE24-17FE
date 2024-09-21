import Header, { IStatus } from "@/components/Header";
import Post from "@/components/Posts";

function MyArticles({ status }: IStatus) {
  return (
    <div>
      <div className=" px-20 bg-gradient-45 md:min-h-[40vh] max-w-[100vw] ">
        <div className="py-7">
          <Header status={status} />
        </div>
        <div className=" flex justify-center items-center  mt-20  ">
          <h3 className="font-bold text-3xl text-white">MyArticles</h3>
        </div>
      </div>
      <main className="flex justify-center my-6">
        <Post />
      </main>
    </div>
  );
}

export default MyArticles;
