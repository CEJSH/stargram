import React from "react";
import { RiBookmarkFill } from "react-icons/ri";

type Props = {
  className?: string;
};
export default function BookmarkFillIcon({ className }: Props) {
  return (
    <RiBookmarkFill
      style={{ fontSize: "24px", cursor: "pointer" }}
      className={className || "w-[24px] h-[24px] text-red-500"}
    />
  );
}
