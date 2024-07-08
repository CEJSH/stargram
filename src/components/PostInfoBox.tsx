import Image from "next/image";
import React from "react";
import others from "../../public/images/12.jpg";
import { PiHeart } from "react-icons/pi";
import { TbMessageDots, TbSend } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";

export default function PostInfoBox() {
  return (
    <section className="flex flex-col gap-[10px] h-full w-full p-[4px]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-[16px]">
          <div className="cursor-pointer flex flex-row gap-[2px] items-center rounded-2xl border-fuchsia-600 border-[1px] px-[8px] py-[4px] border-solid">
            <PiHeart style={{ fontSize: "18px", cursor: "pointer" }} />
            <div>123</div>
          </div>
          <TbMessageDots style={{ fontSize: "18px", cursor: "pointer" }} />
          <TbSend style={{ fontSize: "18px", cursor: "pointer" }} />
        </div>
        <div className="flex items-center">
          <FaRegBookmark style={{ fontSize: "18px", cursor: "pointer" }} />
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
