import { useLocation } from "react-router-dom";
import LatestPost from "./LatestPost";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Actions } from "./Actions";

export interface IPost {
  title: string;
  description: string;
  postedBy: string;
  date: string;
  imgUrl: string;
  aboutPostUrl: string;
  tags: string[];
}
export interface IPosts {
  posts: IPost[];
  post?: IPost;
}

function Post({ posts }: IPosts) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <div className="flex flex-col  md:grid md:grid-cols-3 gap-10 md:mt-4 md:px-16">
        {pathname === "/" && <LatestPost />}
        {posts.map((post, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="grow">
              <img src={post.aboutPostUrl} alt="About" />
            </div>
            <div className="flex gap-3">
              {post.tags?.map((tag, index) => (
                <Badge
                  key={index}
                  variant={"outline"}
                  className="rounded-[10px] py-1 text-black border-black px-2"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="font-bold text-[18px]">{post.title}</div>
            <p>{post.description}</p>
            <div
              className={`${
                pathname === "/my-articles"
                  ? " flex justify-between"
                  : "flex gap-3 "
              }`}
            >
              {pathname === "/" && (
                <div className="w-[12%]">
                  <img src={post.imgUrl} alt={post.postedBy} />
                </div>
              )}
              <div>
                {pathname === "/" && <p>{post.postedBy}</p>}
                <p className="text-muted">{post.date}</p>
              </div>

              {pathname === "/my-articles" && <Actions post={post} />}
            </div>
          </div>
        ))}
      </div>

      {pathname === "/" && (
        <div className="flex justify-center my-20 ">
          <Button className="bg-black text-white md:w-[8%] h-10 rounded-[60px]">
            See More
          </Button>
        </div>
      )}
    </>
  );
}

export default Post;
