import { ProfileUser } from "@/model/user";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";

type Props = {
  user: ProfileUser;
};
// Link태그가 사용자 브라우저에 보여주면 Next.js는 먼저 경로에 해당하는 것을 프리페칭해서 가지고 온다

export default function UserCard({
  user: { name, username, image, following, followers },
}: Props) {
  return (
    <Link
      href={`/user/${username}`}
      className="flex gap-2 items-center w-full rounded-md border border-[#8e8e8e] mb-2 p-3 bg-white hover:bg-neutral-50"
    >
      <Avatar image={image} />
      <div className="text-neutral-500">
        <p className="text-black font-bold leading-4">{username}</p>
        <p>{name}</p>
        {/* <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p> */}
      </div>
    </Link>
  );
}
