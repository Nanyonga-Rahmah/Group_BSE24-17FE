import { useEffect, useState } from "react";
import Header, { IStatus } from "@/components/Header";
import Posts from "@/components/Posts"; // Correct import
import { IPost } from "@/components/Posts"; // Import post interface

function MyArticles({ status }: IStatus) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user's articles
    const fetchUserArticles = async () => {
      try {
        const response = await fetch("http://localhost:4040/blog/my-blogs", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserArticles();
  }, []);

  return (
    <div>
      <div className="p-4 bg-gradient-45 md:min-h-[40vh] max-w-[100vw] ">
        <div className="md:py-7">
          <Header status={status} />
        </div>
        <div className="flex justify-center items-center mt-20">
          <h3 className="font-bold text-3xl text-white font-[rales]">
            My Articles
          </h3>
        </div>
      </div>
      <main className="max-w-[100vw] w-[90vw] my-5 mx-auto overflow-x-hidden md:flex md:justify-center md:my-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading articles: {error}</p>
        ) : (
          <Posts posts={posts} />
        )}
      </main>
    </div>
  );
}

export default MyArticles;
