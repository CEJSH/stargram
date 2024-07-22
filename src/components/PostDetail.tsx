import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import UserInfoBox from "./UserInfoBox";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import Avatar from "./Avatar";
import { parseDate } from "@/util/date";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  // 이미지 크기 -> 너비는 지정하되 높이는 부모에 따라 달라질 수 있도록
  return (
    <section className="flex w-full h-full">
      <div className="relative basis-[56.5%]">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes={"800px"}
          loading="eager"
        />
      </div>
      <div className="w-full basis-[43.5%] flex flex-col">
        <UserInfoBox
          className={"px-3 py-3 text-[14px] gap-[12px]"}
          size={"small"}
          onlyId
          userId={username}
          image={userImage}
          name={""}
        />
        <ul className="border-t border-gray-200 h-full overflow-y-auto px-3 py-3 mb-1">
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li
                  key={index}
                  className={
                    index > 0
                      ? "flex items-center mb-1 pt-[12px]"
                      : "flex items-center mb-1 "
                  }
                >
                  <Avatar
                    image={image}
                    size="small"
                    highlight={commentUsername === username}
                  />
                  <div className="ml-[12px] text-[14px]">
                    <div>
                      <span className="font-[600] mr-1">{commentUsername}</span>
                      <span>{comment}</span>
                    </div>
                    <span className="text-[#9e9ea7] text-[12px]">
                      {parseDate(createdAt)}
                    </span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar
          className={
            "!p-4 !pb-1 text-[14px] gap-[8px] border-solid border-t-[1px]"
          }
          post={post}
        />
        <CommentForm
          className={"px-4 py-2 text-[14px]"}
          userImage={userImage}
        />
      </div>
    </section>
  );
}
