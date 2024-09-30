import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header, { IStatus } from "@/components/Header";
import Hero from "@/components/Hero";
import Posts from "@/components/Posts"; // Ensure this import is correct
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface IPost {
  title: string;
  description: string;
  postedBy: string;
  date: string;
  imgUrl: string;
  aboutPostUrl: string;
  tags: string[];
}

function LandingPage({ status }: IStatus) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch posts from the backend API
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4040/blog"); // Adjust to your API route
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        const formattedPosts = data.map((post: any) => ({
          title: post.title,
          description: post.summary,
          postedBy: post.author.name,
          date: new Date(post.createdAt).toLocaleDateString(),
          imgUrl: "/images/avatar.png", // Placeholder, adjust accordingly
          aboutPostUrl: post.coverImage || "/images/default-cover.png",
          tags: post.tags,
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
      <div className="p-5 md:px-20 bg-gradient-45 md:min-h-[70vh] max-w-[100vw] overflow-x-hidden">
        <div className="md:py-7 sticky top-0">
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
              <Posts posts={posts} />
            </TabsContent>
            <TabsContent value="marketing">
              <Posts
                posts={posts.filter((post) => post.tags.includes("Marketing"))}
              />
            </TabsContent>
            <TabsContent value="social">
              <Posts
                posts={posts.filter((post) => post.tags.includes("Social"))}
              />
            </TabsContent>
            <TabsContent value="technology">
              <Posts
                posts={posts.filter((post) => post.tags.includes("Technology"))}
              />
            </TabsContent>
            <TabsContent value="health">
              <Posts
                posts={posts.filter((post) => post.tags.includes("Health"))}
              />
            </TabsContent>
            <TabsContent value="business">
              <Posts
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
