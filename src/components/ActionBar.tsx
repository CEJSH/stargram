import Image from "next/image";
import React from "react";
import others from "../../public/images/12.jpg";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import MessageIcon from "./ui/icons/MessageIcon";
import SendIcon from "./ui/icons/SendIcon";
import { parseDate } from "@/util/date";

type Props = {
  userId: string;
  createdAt: string;
  likes?: string[];
  text?: string;
  className?: string;
};

export default function ActionBar({
  userId,
  likes,
  text,
  createdAt,
  className,
}: Props) {
  return (
    <section
      className={"flex flex-col gap-[10px] h-fit w-full p-[4px] " + className}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-[16px]">
          <div className="cursor-pointer flex flex-row gap-[2px] items-center rounded-2xl border-fuchsia-600 border-[1px] px-[8px] py-[4px] border-solid">
            <HeartIcon />
            <div>123</div>
          </div>
          <MessageIcon />
          <SendIcon />
        </div>
        <div className="flex items-center">
          <BookmarkIcon />
        </div>
      </div>
      {likes && likes?.length > 0 && (
        <div className="w-full flex gap-[8px]">
          <Image
            className="object-cover w-[20px] h-[20px] rounded-[50%]"
            src={others}
            alt="user"
            width={20}
            height={20}
          />
          <div className="flex flex-row gap-[4px] leading-5">
            <div> Liked by</div>
            <div className="font-[600]">{`${likes[0]}`}</div>
            <div className="font-[600]">
              {likes && likes?.length > 1
                ? `and ${likes?.length - 1} others`
                : ""}
            </div>
          </div>
        </div>
      )}
      <div>
        {text && (
          <p>
            <span className="font-[600] mr-[4px]">{userId}</span>
            {text}
          </p>
        )}
        <span className="text-[#9e9ea7] text-[12px]">
          {parseDate(createdAt)}
        </span>
      </div>
    </section>
  );
}
