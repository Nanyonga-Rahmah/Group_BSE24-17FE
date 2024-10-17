import { useLocation } from "react-router-dom";
import LatestPost from "./LatestPost";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Actions } from "./Actions";

export interface IPost {
  _id: string;
  title: string;
  description: string;
  postedBy: string;
  date: string;
  coverImage: string;
  aboutPostUrl: string;
  tags: string[];
  summary: string;
  category: string;
  body: string;
  profilePicture: string;
}

export interface IPosts {
  posts: IPost[];
  onDeleteSuccess?: () => void;
}

function Posts({ posts, onDeleteSuccess }: IPosts) {
console.log(posts);
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-10 md:mt-4 md:px-16">
        {pathname === "/" && <LatestPost />}
        {posts.map((post, index) => (
          <div key={index} className="flex flex-col grow gap-2">
            <div className="grow border min-h-[200px] rounded-lg overflow-hidden">
              <img src={post.coverImage} alt={post.title} className="object-cover "/>
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
                  ? "flex justify-between"
                  : "flex gap-3"
              }`}
            >
              {pathname === "/" && (
                <div className="w-[11%]">
                  <img src={post.profilePicture} alt={post.postedBy.slice(0,4)} />{" "}
                </div>
              )}
              <div>
                {pathname === "/" && (
                  <p className="text-[12px]">{post.postedBy}</p>
                )}
                <p className="text-muted text-[11px]">{post.date}</p>
              </div>

              {pathname === "/my-articles" && (
                <Actions post={post} onDeleteSuccess={onDeleteSuccess} />
              )}
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

export default Posts;
