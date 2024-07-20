import React from "react";
import { PiHeart } from "react-icons/pi";
type Props = {
  className?: string;
};
export default function HeartIcon({ className }: Props) {
  return (
    <PiHeart
      style={{ fontSize: "24px", cursor: "pointer" }}
      className={className || "w-[24px] h-[24px]"}
    />
  );
}
