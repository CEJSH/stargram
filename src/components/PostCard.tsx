"use client";
import Image from "next/image";
import React, { useState } from "react";
import UserInfoBox from "./UserInfoBox";
import { SimplePost } from "@/model/post";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  const [openModal, setOpenModal] = useState(false);
  return (
    <article className="text-[14px] rounded-2xl bg-white w-full max-h-[740px] flex flex-col px-[10px] pt-[10px] pb-[8px] gap-[8px]">
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
      <ActionBar
        userId={username}
        likes={likes}
        text={text}
        createdAt={createdAt}
        likeHandler={() => {}}
      />
      <CommentForm userImage={userImage} />
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
