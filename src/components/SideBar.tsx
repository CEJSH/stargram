import { User } from "@/model/user";
import React from "react";
import Avatar from "./Avatar";
import UserInfoBox from "./UserInfoBox";
type Props = {
  user: User;
  className: string;
};
export default function SideBar({
  user: { name, username, image },
  className,
}: Props) {
  return (
    <section
      className={
        className + " text-[12px] text-[#c7c7c7] px-[32px] mx-[36px] gap-[16px]"
      }
    >
      <UserInfoBox
        name={name || ""}
        userId={username || ""}
        image={image || ""}
      />
      <div className="flex flex-col gap-[16px]">
        <p>
          About · Help · Press · API · Recruit · Policy · Privacy · Terms ·
          Location · Language
        </p>
        <p>@ 2024 Copyright EUNSTAGRAM from RIIZE</p>
      </div>
    </section>
  );
}
