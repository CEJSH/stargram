import { SimplePost } from "@/model/post";
import Image from "next/image";
import React from "react";
import UserInfoBox from "./UserInfoBox";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import { parseDate } from "@/util/date";
import useFullPost from "@/hooks/post";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt } = post;
  const { post: data, postComment } = useFullPost(id);

  const comments = data?.comments;

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
            "!p-[0.9rem] !pb-1 text-[14px] gap-[8px] border-solid border-t-[1px]"
          }
          post={post}
          onComment={postComment}
        />
      </div>
    </section>
  );
}
