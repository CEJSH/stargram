"use client";
import { useState } from "react";
import { HomeUser, ProfileUser } from "@/model/user";
import useSWR from "swr";
import Image from "next/image";

type Props = {
  user: ProfileUser;
};

export default function UserPosts({ user: { username } }: Props) {
  // /api/users/${username}/posts
  // /api/users/${username}/liked
  // /api/users/${username}/bookmarks
  const [tab, setTab] = useState("bookMarked");
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<HomeUser>(`/api/user/${username}/${tab}`);
  console.log(posts);
  // 서비스 작업을 만들 때는 UI이 작없을 섞지 않도록 해주면서 단계별로 만들면서 갈거에요
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex mb-[4px] items-stretch">
          <div className="mr-[4px] grow-1">
            <Image
              className="aspect-square object-cover"
              alt="feed"
              src={(posts?.image && posts.image) || ""}
              width={300}
              height={300}
            />
          </div>
          <div className="mr-[4px] grow-1">
            <Image
              className="aspect-square object-cover"
              alt="feed"
              src={(posts?.image && posts.image) || ""}
              width={300}
              height={300}
            />
          </div>
          <div className="mr-[4px] grow-1">
            <Image
              className="aspect-square object-cover"
              alt="feed"
              src={(posts?.image && posts.image) || ""}
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
