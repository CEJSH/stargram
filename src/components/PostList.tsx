import React from "react";
import PostCard from "./PostCard";

export default function PostList({ className }: { className: string }) {
  return (
    <section className={className + " overflow-auto gap-[16px]"}>
      <div className="text-[20px] font-[600]">News feed</div>
      <PostCard />
    </section>
  );
}
