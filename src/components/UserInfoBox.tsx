import Image from "next/image";
import React from "react";

import Avatar from "./Avatar";

type Props = {
  name: string;
  userId?: string;
  location?: string;
  image?: string;
  size?: "small" | "normal";
  following?: boolean;
};

export default function UserInfoBox({
  name,
  location,
  userId,
  image,
  following = false,
  size = "normal",
}: Props) {
  return (
    <div className="w-full flex items-center gap-[12px] text-[14px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Avatar size="normal" highlight={following} />
      <div className="flex flex-col leading-5">
        <div className="font-[500] text-[#1c1e21]">{userId || "Anton"}</div>
        <div className="text-[#9e9ea7]">
          {location || name || "New Jersey, USA"}
        </div>
      </div>
    </div>
  );
}
