import Image from "next/image";
import React from "react";
import chanyoung from "../../public/images/4.jpg";
import UserInfoBox from "./UserInfoBox";
import PostInfoBox from "./PostInfoBox";

export default function PostCard() {
  return (
    <section className="text-[14px] rounded-2xl bg-white w-full h-[640px] flex flex-col px-[12px] py-[16px] pt-[8px] gap-[8px]">
      <UserInfoBox name={""} image={""} />
      <Image
        className="w-full object-cover h-[420px] rounded-2xl"
        src={chanyoung}
        alt="chanyoung"
        width={300}
        height={300}
      />
      <PostInfoBox />
    </section>
  );
}
