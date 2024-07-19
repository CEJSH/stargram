import Image from "next/image";
import React from "react";
import user from "../../public/images/10.jpg";
import { AvatarSize } from "./UserInfoBox";
type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};
// 구글 통해서 전해지는 url은 NextImage 쓸 수 없으므로 img 태그 씀

export default function Avatar({
  image,
  size = "large",
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {!!image ? (
        <img
          className={`bg-white rounded-full object-cover ${
            getImageSizeStyle(size, highlight).image
          }`}
          src={image ?? undefined}
          alt={"userImg"}
          referrerPolicy="no-referrer"
        />
      ) : (
        <Image
          className={`object-cover rounded-full ${
            getImageSizeStyle(size, highlight).image
          }`}
          src={user}
          alt="user"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = "flex rounded-full justify-center items-center p-[0.12rem]";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 to-amber-300"
    : "";
  const { container } = getImageSizeStyle(size, highlight);
  return `${baseStyle} ${highlightStyle} ${container}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
};

function getImageSizeStyle(
  size: AvatarSize,
  highlight: boolean
): ImageSizeStyle {
  const highlightStyle = highlight ? "bg-white" : "";
  switch (size) {
    case "small":
      return {
        container: `w-10 h-10`,
        image: `${highlightStyle} w-[38px] h-[38px] p-[0.08rem]`,
      };
    case "medium":
      return {
        container: `w-12 h-12`,
        image: `${highlightStyle} w-[48px] h-[48px] p-[0.12rem]`,
      };
    case "large":
      return {
        container: `w-13 h-13`,
        image: `${highlightStyle} w-[56px] h-[56px] p-[0.12rem]`,
      };
    case "x-large":
      return {
        container: `md:w-40 md:h-40 w-24 h-24`,
        image: `${highlightStyle} md:w-[156px] md:h-[156px] w-[98px] h-[98px] p-[0.12rem]`,
      };
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}
