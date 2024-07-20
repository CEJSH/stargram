import React from "react";
import { PiHeartFill } from "react-icons/pi";
type Props = {
  className?: string;
};
export default function HeartFillIcon({ className }: Props) {
  return (
    <PiHeartFill
      style={{ fontSize: "24px", cursor: "pointer" }}
      className={className || "w-[24px] h-[24px] text-red-500"}
    />
  );
}
