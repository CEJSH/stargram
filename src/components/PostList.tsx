"use client";
import PostCard from "./PostCard";
import GridSpinner from "./ui/GridSpinner";
import usePosts from "@/hooks/posts";

export default function PostList({ className }: { className: string }) {
  const { posts, isLoading: loading } = usePosts();

  return (
    <section className={className + " overflow-auto gap-[16px]"}>
      <div className="text-[20px] font-[600]">News feed</div>
      {loading && (
        <div className="text-center mt-8">
          <GridSpinner />
        </div>
      )}
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li className="mb-4" key={post.id}>
              <PostCard post={post} priority={index < 2} />
            </li>
          ))}
      </ul>
    </section>
  );
}
