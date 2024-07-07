import React from "react";
import UserInfoBox from "./UserInfoBox";

export default function FollowingBar({ className }: { className: string }) {
  return (
    <section
      className={
        className + " text-[12px] text-[#c7c7c7] px-[32px] mx-[36px] gap-[16px]"
      }
    >
      <div className="text-[16px] font-[600]">Following</div>
      <UserInfoBox following name={""} userId={""} image={""} size="small" />
    </section>
  );
}
