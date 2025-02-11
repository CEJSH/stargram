import React from "react";
import Avatar from "./Avatar";
export type AvatarSize = "small" | "medium" | "large" | "x-large";

type Props = {
  name: string;
  onlyId?: boolean;
  userId?: string;
  location?: string;
  image?: string;
  size?: AvatarSize;
  following?: boolean;
  className?: string;
};

export default function UserInfoBox({
  name,
  location,
  onlyId,
  userId,
  image,
  following = true,
  size = "large",
  className,
}: Props) {
  const sizeStyle = following
    ? " md:w-full w-[60px] md:text-start text-center text-ellipsis overflow-hidden whitespace-nowrap"
    : " md:w-full w-full";
  const avatarBase = "md:w-full flex items-center text-[14px]";
  const avatarContainerStyle = following
    ? avatarBase + " md:flex-row flex-col md:gap-[12px] gap-[4px] "
    : avatarBase + " gap-[12px] ";

  return (
    <div className={avatarContainerStyle + className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Avatar size={size} highlight={following} image={image} />
      <div
        className={`flex flex-col md:items-start items-center gap-0 md:gap-[0.17rem] leading-5`}
      >
        <p className={`${sizeStyle} font-[600] text-[15px] text-[#1c1e21]`}>
          {userId || "Anton"}
        </p>
        {onlyId ?? (
          <div
            className={`${sizeStyle} text-[#9e9ea7] text-[14px] md:text-[14px] md:block hidden`}
          >
            {name || location || "New Jersey, USA"}
          </div>
        )}
      </div>
    </div>
  );
}
