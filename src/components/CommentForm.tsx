import Image from "next/image";
import React from "react";
import SmileIcon from "./ui/icons/SmileIcon";

export default function CommentForm({ userImage }: { userImage: string }) {
  return (
    <form className="flex items-center relative mb-[8px]" action="">
      <Image
        className="object-cover w-[36px] h-[36px] rounded-[50%]"
        src={userImage}
        alt="user"
        width={36}
        height={36}
      />
      <input
        className="text-[12px] flex-1 mr-3 border-none bg-[#f3f3f4] p-[8px] px-[20px] ml-[8px] rounded-full"
        type="text"
        placeholder="Add a comment..."
      />
      <SmileIcon className="absolute right-[64px] text-gray-600" />
      <button className="text-sky-500 font-bold text-[15px]">Post</button>
    </form>
  );
}
