import Image from "next/image";
import React from "react";
import user from "../../public/images/10.jpg";
type Props = {
  image?: string | null;
  size?: "smaller" | "small" | "normal";
  highlight?: boolean;
};
// 구글 통해서 전해지는 url은 NextImage 쓸 수 없으므로 img 태그 씀

export default function Avatar({
  image,
  size = "normal",
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {!!image ? (
        <img
          className={`bg-white rounded-full ${getImageSizeStyle(
            size,
            highlight
          )}`}
          src={image ?? undefined}
          alt={"userImg"}
          referrerPolicy="no-referrer"
        />
      ) : (
        <Image
          className={`object-cover rounded-full ${getImageSizeStyle(
            size,
            highlight
          )}`}
          src={user}
          alt="user"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}

function getContainerStyle(size: string, highlight: boolean): string {
  const baseStyle = "flex rounded-full justify-center items-center p-[0.12rem]";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 to-amber-300"
    : "";
  const sizeStyle = size === "small" ? "w-10 h-10" : "w-13 h-13";
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: string, highlight: boolean): string {
  const highlightStyle = highlight ? "bg-white" : "";
  const sizeStyle =
    size === "small"
      ? "w-[36px] h-[36px] p-[0.08rem]"
      : `w-[64px] h-[64px] p-[0.15rem]`;

  return `${highlightStyle} ${sizeStyle}`;
}
