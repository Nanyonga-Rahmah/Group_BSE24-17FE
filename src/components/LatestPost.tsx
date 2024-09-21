import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

export const latestPost = {
  title:
    "Exciting Tech Innovations to Watch Out for in 2024, trends Shaping the Future of Technology",
  description:
    "As we step into 2024, the technology landscape is evolving at an unprecedented pace. This year promises to bring forth a wave of innovations that will not only enhance our daily lives but also redefine entire industries. From artificial intelligence to sustainable tech, here are some key innovations to keep an eye on this year...",
  postedBy: "Nanyonga R",
  date: "Mar 10,2015",
  imgUrl: "/images/avatar.png",
  aboutPostUrl: "/images/latestpost.png",
  tags: ["Nutrition", "Health"],
};

function LatestPost() {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate("/article-page");
  };
  return (
    <div className="flex gap-20 col-span-3 my-10 " onClick={HandleClick}>
      <div>
        <img src={latestPost.aboutPostUrl} alt="Latest" />
      </div>
      <div>
        <div className="flex gap-3 my-2">
          {latestPost.tags.map((tag, index) => (
            <Badge
              key={index}
              variant={"outline"}
              className="rounded-[10px] py-1 text-black border-black px-2"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div>
          <h3 className="font-bold text-xl leading-7">{latestPost.title}</h3>
          <p className="my-4 text-base font-normal text-muted">
            {latestPost.description}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-[12%]">
            <img src={latestPost.imgUrl} alt={latestPost.postedBy} />
          </div>
          <div className="flex flex-col">
            <p>{latestPost.postedBy}</p>
            <p className="text-muted">{latestPost.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestPost;
