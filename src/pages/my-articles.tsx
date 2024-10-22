import { useEffect, useState } from "react";
import Header, { IStatus } from "@/components/Header";
import Posts from "@/components/Posts";
import { IPost } from "@/components/Posts";
import { Api, GetArticle } from "@/lib/routes";

// Helper function to format post data
const formatPostData = (post: any) => {
  return {
    _id: post._id,
    body: post.body,
    title: post.title,
    description: post.summary,
    postedBy: post.author?.username || "Unknown",
    date: new Date(post.createdAt).toLocaleDateString(),
    coverImage: post.coverImage
      ? `${Api}/${post.coverImage}`
      : "/images/default-cover.png",
    aboutPostUrl: post.coverImage || "/images/default-cover.png",
    tags: post.tags || [],
    authorProfilePicture: post.author?.profilePicture
      ? `${Api}/${post.author.profilePicture}`
      : "/images/default-avatar.png",
  };
};

function MyArticles({ status }: IStatus) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${GetArticle}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      const formattedPosts = data.map((post: any) => formatPostData(post));
      setPosts(formattedPosts);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserArticles();
  }, []);

  return (
    <div>
      <div className="p-4 bg-gradient-45 md:min-h-[40vh] max-w-[100vw]">
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
          <Posts posts={posts} onDeleteSuccess={fetchUserArticles} />
        )}
      </main>
    </div>
  );
}

export default MyArticles;
