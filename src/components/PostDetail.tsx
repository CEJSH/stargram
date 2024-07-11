import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import UserInfoBox from "./UserInfoBox";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import Avatar from "./Avatar";

type Props = {
  post: SimplePost;
};
export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  // comment!
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  // 이미지 크기 -> 너비는 지정하되 높이는 부모에 따라 달라질 수 있도록
  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes={"800px"}
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <UserInfoBox
          className={"px-2 py-2 text-[14px] gap-[6px]"}
          userId={username}
          image={userImage}
          name={""}
        />
        <ul className="border-t border-gray-200 h-full overflow-y-auto px-3 py-3 mb-1">
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li key={index} className="flex items-center mb-1">
                  <Avatar
                    image={image}
                    size="small"
                    highlight={commentUsername === username}
                  />
                  <div className="ml-2 text-[14px]">
                    <span className="font-[600] mr-2">{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar
          className={"px-4 text-[14px] gap-[8px]"}
          likes={likes}
          userId={username}
          createdAt={createdAt}
        />
        <CommentForm
          className={"px-4 py-2 text-[14px]"}
          userImage={userImage}
        />
      </div>
    </section>
  );
}
