"use client";
import { useState } from "react";
import { ProfileUser } from "@/model/user";
import GridIcon from "./ui/icons/GridIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import Link from "next/link";
import PostGrid from "./PostGrid";
import { CacheKeysContext } from "@/context/CacheKeysContext";

type Props = {
  user: ProfileUser;
};
const tabs = [
  { type: "posts", title: "User posts", icon: <GridIcon /> },
  {
    type: "saved",
    title: "Saved posts",
    icon: <BookmarkIcon className="w-3 h-3" />,
  },
  {
    type: "liked",
    title: "Liked posts",
    icon: <HeartIcon className="w-4 h-4" />,
  },
];

export default function UserPosts({ user: { username } }: Props) {
  const [query, setQuery] = useState(tabs[0].type);

  // 서비스 작업을 만들 때는 UI이 작없을 섞지 않도록 해주면서 단계별로 만들면서 갈거에요

  return (
    <section>
      <ul
        className={`flex justify-center uppercase color-500-grey align-center border-solid border-t-[1px] border-t-[#DBDBDB] text-center font-[600] leading-[1px] text-[0.75rem]`}
      >
        {tabs.map(({ type, icon, title }) => (
          <li
            className={`mx-12 px-4 cursor-pointer border-black ${
              type === query && "font-bold border-t"
            }`}
            key={type}
            onClick={() => setQuery(type)}
          >
            <Link
              className="!flex justify-center items-center h-[52px] hover:text-[#737373]"
              href=""
            >
              <button aria-label={title}>{icon}</button>
              <span className="ml-[6px] hidden md:inline">{type}</span>
            </Link>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/user/${username}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
