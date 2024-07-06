import Image from "next/image";
import React from "react";
import others from "../../public/images/12.jpg";
import { PiHeart } from "react-icons/pi";
import { TbMessageDots, TbSend } from "react-icons/tb";

export default function PostInfoBox() {
  return (
    <section className="flex flex-col gap-[10px] h-full w-full p-[4px]">
      <div className="flex flex-row">
        <div className="cursor-pointer flex flex-row gap-[2px] items-center rounded-2xl border-fuchsia-600 border-[1px] px-[8px] py-[4px] border-solid">
          <PiHeart style={{ fontSize: "18px" }} />
          <div>123</div>
        </div>
        <div className="flex flex-row items-center px-[8px] py-[4px]">
          <TbMessageDots style={{ fontSize: "18px" }} />
        </div>
        <div className="cursor-pointer flex flex-row items-center px-[8px] py-[4px]">
          <TbSend style={{ fontSize: "18px" }} />
        </div>
      </div>
      <div className="w-full flex gap-[8px]">
        <Image
          className="object-cover w-[20px] h-[20px] rounded-[50%]"
          src={others}
          alt="user"
          width={20}
          height={20}
        />
        <div className="flex flex-row gap-[4px] leading-5">
          <div> Liked by</div> <div className="font-[600]">UserName</div>
          <div>{"and"}</div>
          <div className="font-[600]">122 others</div>
        </div>
      </div>
      <div>대표 코멘트</div>
    </section>
  );
}
