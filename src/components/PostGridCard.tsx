import { SimplePost } from "@/model/post";
import Image from "next/image";
import React, { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import { signIn, useSession } from "next-auth/react";

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const { image, username } = post;
  //클라이언트 컴포넌트이므로 유즈세션을 이요하면 됨!
  const { data: session } = useSession();
  const handleOpenPost = () => {
    // client 컴포넌트니까 Redirect는 사용할 수 없고 useRouter는 사용가능 next-auth서 제공하는 signin 호출할 수 있음
    if (!session?.user) {
      return signIn();
    }
    setOpenModal(true);
  };
  // 이미지 클릭했을 때 상세 페이지는 로그인 한 사용자만 보여줄 것임
  return (
    <div className="relative w-full aspect-square mr-[4px]">
      <Image
        className="object-cover cursor-pointer"
        alt={`photo by ${username}`}
        src={image}
        fill
        sizes="650px"
        priority={priority}
        onClick={handleOpenPost}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
