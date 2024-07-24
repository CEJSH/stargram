import React from "react";
import { RiBookmarkFill } from "react-icons/ri";

type Props = {
  className?: string;
};
export default function BookmarkFillIcon({ className }: Props) {
  return (
    <RiBookmarkFill
      style={{ fontSize: "22px", cursor: "pointer" }}
      className={className || "w-[22px] h-[22px] text-black"}
    />
  );
}
