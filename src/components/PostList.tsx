"use client";
import useSWR from "swr";
import PostCard from "./PostCard";
import { SimplePost } from "@/model/post";
import { GridLoader } from "react-spinners";
import GridSpinner from "./ui/GridSpinner";

export default function PostList({ className }: { className: string }) {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>("/api/posts");

  console.log(posts);

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
