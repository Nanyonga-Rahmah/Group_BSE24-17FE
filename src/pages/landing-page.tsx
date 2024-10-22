import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header, { IStatus } from "@/components/Header";
import Hero from "@/components/Hero";
import Post from "@/components/Posts";
import { IPost } from "@/components/Posts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Api, GetArticles } from "@/lib/routes";

function LandingPage({ status }: IStatus) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(GetArticles); 
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        const formattedPosts = data.map((post: any) => ({
          title: post.title,
          description: post.summary,
          postedBy: post.author.username,
          date: new Date(post.createdAt).toLocaleDateString(),
          coverImage: post.coverImage
            ? `${Api}/${post.coverImage}`
            : "/images/default-cover.png",
          aboutPostUrl: post.coverImage || "/images/default-cover.png",
          tags: post.tags,
          profilePicture: post.author.profilePicture
            ? `${Api}/${post.author.profilePicture}`
            : "/images/default-avatar.png", 
        }));

        setPosts(formattedPosts);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="p-5 md:px-20 bg-gradient-45 lg:min-h-[70vh] max-w-[100vw] overflow-x-hidden">
        <div className="md:py-7  sticky top-0">
          <Header status={status} />
        </div>
        <Hero />
      </div>
      <main className="max-w-[100vw] w-[90vw] mx-auto overflow-x-hidden">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading posts: {error}</p>
        ) : (
          <Tabs defaultValue="all" className="md:mt-10 mt-5 w-[90vw]">
            <TabsList className="md:w-full max-w-[90vw] mx-auto overflow-x-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Post posts={posts} />
            </TabsContent>
            <TabsContent value="marketing">
              <Post
                posts={posts.filter((post) => post.tags.includes("Marketing"))}
              />
            </TabsContent>
            <TabsContent value="social">
              <Post
                posts={posts.filter((post) => post.tags.includes("Social"))}
              />
            </TabsContent>
            <TabsContent value="technology">
              <Post
                posts={posts.filter((post) => post.tags.includes("Technology"))}
              />
            </TabsContent>
            <TabsContent value="health">
              <Post
                posts={posts.filter((post) => post.tags.includes("Health"))}
              />
            </TabsContent>
            <TabsContent value="business">
              <Post
                posts={posts.filter((post) => post.tags.includes("Business"))}
              />
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
