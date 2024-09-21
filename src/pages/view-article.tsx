import { ArticleForm } from "@/components/forms/ViewArticleForm";
import Header, { IStatus } from "@/components/Header";

import { useLocation } from "react-router-dom";

function ViewArticle({ status }: IStatus) {
  const location = useLocation();
  const { Post } = location.state || {};
  console.log(Post);

  return (
    <div>
      <div className=" p-4 bg-gradient-45 md:min-h-[40vh] max-w-[100vw] ">
        <div className="md:py-7">
          <Header status={status} />
        </div>
        <div className=" flex justify-center items-center  mt-20  ">
          <h3 className="font-bold text-3xl text-white font-[rales]">
            View Article
          </h3>
        </div>
      </div>
      <main className="flex justify-center my-6 px-5">
        <ArticleForm post={Post} />
      </main>
    </div>
  );
}

export default ViewArticle;
