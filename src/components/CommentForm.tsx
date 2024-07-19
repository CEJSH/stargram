import Image from "next/image";
import React from "react";
import SmileIcon from "./ui/icons/SmileIcon";

export default function CommentForm({
  userImage,
  className,
}: {
  userImage: string;
  className?: string;
}) {
  return (
    <form
      className={"w-full flex items-center mb-[8px] " + className}
      action=""
    >
      <Image
        className="object-cover w-[36px] h-[36px] rounded-[50%]"
        src={userImage}
        alt="user"
        width={36}
        height={36}
      />
      <div className="relative flex-1">
        <input
          className="text-[12px] w-[96%] mr-3 border-none bg-[#f3f3f4] p-[8px] px-[20px] ml-[8px] rounded-full"
          type="text"
          placeholder="Add a comment..."
        />
        <SmileIcon className="absolute right-[20px] top-[5px] text-gray-600" />
      </div>
      <button className="text-sky-500 font-bold text-[15px]">Post</button>
    </form>
  );
}
