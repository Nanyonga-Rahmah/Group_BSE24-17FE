import Footer from "@/components/Footer";
import Header, { IStatus } from "@/components/Header";
import Hero from "@/components/Hero";
import Post from "@/components/Posts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export const Posts = [
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

function LandingPage({ status }: IStatus) {
  return (
    <div>
      <div className=" p-5 md:px-20 bg-gradient-45 md:min-h-[70vh] max-w-[100vw] overflow-x-hidden ">
        <div className="md:py-7 sticky top-0">
          <Header status={status} />
        </div>
        <Hero />
      </div>
      <main className="max-w-[100vw] w-[90vw] mx-auto overflow-x-hidden">
        <Tabs defaultValue="all" className="md:mt-10 mt-5  w-[90vw]">
        <TabsList className="md:w-full max-w-[90vw] mx-auto overflow-x-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Post posts={Posts} />
          </TabsContent>
          <TabsContent value="marketing">
            <Post  posts={Posts} />
          </TabsContent>
          <TabsContent value="social">
            <Post  posts={Posts} />
          </TabsContent>
          <TabsContent value="technology">
            <Post  posts={Posts} />
          </TabsContent>
          <TabsContent value="health">
            <Post  posts={Posts}/>
          </TabsContent>
          <TabsContent value="business">
            <Post  posts={Posts} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
