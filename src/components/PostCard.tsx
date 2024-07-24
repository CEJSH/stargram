"use client";
import Image from "next/image";
import React, { useState } from "react";
import UserInfoBox from "./UserInfoBox";
import { Comment, SimplePost } from "@/model/post";
import ActionBar from "./ActionBar";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import usePosts from "@/hooks/posts";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { userImage, username, image, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <article className="text-[14px] rounded-2xl bg-white w-full max-h-[800px] flex flex-col px-[10px] pt-[10px] pb-[8px] gap-[8px]">
      <UserInfoBox userId={username} image={userImage} name={""} />
      <Image
        onClick={() => {
          setOpenModal(true);
        }}
        priority={priority}
        className="w-full aspect-square object-cover rounded-2xl cursor-pointer"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={420}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p className="mt-[4px]">
          <span className="font-[600] mr-[4px]">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="w-fit text-sky-700 font-[600] text-[13px] pt-1"
            onClick={() => {
              setOpenModal(true);
            }}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>

      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
