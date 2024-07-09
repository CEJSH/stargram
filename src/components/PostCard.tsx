import Image from "next/image";
import React from "react";
import UserInfoBox from "./UserInfoBox";
import PostInfoBox from "./ActionBar";
import { SimplePost } from "@/model/post";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <article className="text-[14px] rounded-2xl bg-white w-full max-h-[740px] flex flex-col px-[10px] pt-[10px] pb-[8px] gap-[8px]">
      <UserInfoBox userId={username} image={userImage} name={""} />
      <Image
        priority={priority}
        className="w-full aspect-square object-cover rounded-2xl"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={420}
      />
      <ActionBar
        userId={username}
        likes={likes}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm userImage={userImage} />
    </article>
  );
}
