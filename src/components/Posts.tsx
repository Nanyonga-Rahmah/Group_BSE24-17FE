import { useLocation } from "react-router-dom";
import LatestPost from "./LatestPost";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Actions } from "./Actions";

const Posts = [
  {
    title: "Health Benefits of a Balanced Diet",
    description:
      "Discover the importance of maintaining a balanced diet for overall health...",
    postedBy: "Nanyonga R",
    date: "Mar 10,2015",
    imgUrl: "/images/avatar.png",
    aboutPostUrl: "/images/aboutpost.png",
    tags: ["Nutrition", "Health"],
  },
  {
    title: "The Impact of Social Media on Society",
    description:
      "Discover the importance of maintaining a balanced diet for overall health...",
    postedBy: "Aliddeki MB",
    date: "Mar 10,2015",
    imgUrl: "/images/avatar.png",
    aboutPostUrl: "/images/social.png",
    tags: ["Social", "Impact"],
  },
  {
    title: "10 Tips for Effective Blogging",
    description:
      "Discover the importance of maintaining a balanced diet for overall health...",
    postedBy: "Nanyonga R",
    date: "Mar 10,2015",
    imgUrl: "/images/avatar.png",
    aboutPostUrl: "/images/blogging.png",
    tags: ["Nutrition", "Health"],
  },
  {
    title: "The Future of Digital Marketing",
    description:
      "Discover the importance of maintaining a balanced diet for overall health...",
    postedBy: "Nanyonga R",
    date: "Mar 10,2015",
    imgUrl: "/images/avatar.png",
    aboutPostUrl: "/images/aboutpost.png",
    tags: ["Nutrition", "Health"],
  },
  {
    title: "The Impact of Social Media on Society",
    description:
      "Discover the importance of maintaining a balanced diet for overall health...",
    postedBy: "Kayongo JN",
    date: "Mar 10,2015",
    imgUrl: "/images/avatar.png",
    aboutPostUrl: "/images/social.png",
    tags: ["Nutrition", "Health"],
  },
  {
    title: "10 Tips for Effective Blogging",
    description:
      "Discover the importance of maintaining a balanced diet for overall health...",
    postedBy: "Mutumba R",
    date: "Mar 10,2015",
    imgUrl: "/images/avatar.png",
    aboutPostUrl: "/images/blogging.png",
    tags: ["Nutrition", "Health"],
  },
];

function Post() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <div className="grid md:grid-cols-3 gap-5 md:mt-4 px-28">
        {pathname === "/" && <LatestPost />}
        {Posts.map((post, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div>
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
            <div className={`${pathname==='/my-articles'?' flex justify-between':'flex gap-3 '}`}>
              {pathname === "/" && (
                <div className="w-[12%]">
                  <img src={post.imgUrl} alt={post.postedBy} />
                </div>
              )}
              <div>
                {pathname === "/" && <p>{post.postedBy}</p>}
                <p className="text-muted">{post.date}</p>
              </div>

              {pathname === "/my-articles" && <Actions />}
            </div>
          </div>
        ))}
      </div>

      {pathname === "/" && (
        <div className="flex justify-center my-20 ">
          <Button className="bg-black text-white w-[8%] h-10 rounded-[60px]">
            See More
          </Button>
        </div>
      )}
    </>
  );
}

export default Post;
