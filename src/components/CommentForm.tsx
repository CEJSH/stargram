import Image from "next/image";
import React, { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
  userImage?: string | undefined;
  className?: string;
};

export default function CommentForm({
  userImage,
  className,
  onPostComment,
}: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };

  return (
    <form
      className={"w-full flex items-center mb-[8px] " + className}
      onSubmit={handleSubmit}
    >
      <Image
        className="object-cover w-[36px] h-[36px] rounded-[50%]"
        src={userImage || ""}
        alt="user"
        width={36}
        height={36}
      />
      <div className="relative flex-1">
        <input
          className="text-[14px] w-[96%] mr-3 border-none bg-[#f3f3f4] p-[10px] px-[20px] ml-[8px] rounded-full"
          type="text"
          placeholder="Add a comment..."
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <SmileIcon className="absolute right-[20px] top-[9px] text-gray-600" />
      </div>
      <button
        disabled={buttonDisabled}
        className={`font-bold text-[15px] ${
          buttonDisabled ? "text-sky-300" : "text-sky-500"
        }`}
      >
        Post
      </button>
    </form>
  );
}
