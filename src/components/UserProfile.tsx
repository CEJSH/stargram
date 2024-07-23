import { ProfileUser } from "@/model/user";
import React from "react";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser;
};
export default function UserProfile({ user }: Props) {
  const { image, name, followers, following, posts, username } = user;
  const info = [
    { title: "게시물", data: posts },
    { title: "팔로워", data: followers },
    { title: "팔로우", data: following },
  ];
  const buttonStyle =
    "rounded-[8px] px-[16px] py-[7px] flex self-auto items-stretch justify-start relative bg-[#EFEFEFFF] hover:bg-[#dbdbdb]";

  return (
    <header className="w-full h-fit justify-center grid grid-cols-3 grid-flow-row">
      <section className="row-start-1 col-start-2 mb-[20px]">
        <div className="flex flex-row items-center shrink-1">
          <div className="flex flex-col mr-[20px] self-auto items-stretch justify-start">
            <div className="flex max-w-[100%] text-[20px]">{username}</div>
          </div>
          <div className="flex shrink-0 self-auto items-stretch justify-start">
            <div className="flex gap-[8px] self-auto items-stretch justify-start text-[14px] font-[500]">
              <FollowButton user={user} />
              <button className={buttonStyle}>메시지 보내기</button>
            </div>
          </div>
        </div>
      </section>
      <section className="col-start-1 row-start-1 row-end-3 mr-[28px] flex items-center justify-center">
        <Avatar image={image} size="x-large" />
      </section>
      <section className="col-start-2 col-end-3 row-start-2">
        <ul className="flex mb-[20px]">
          {info.map(({ title, data }, index) => (
            <li key={index} className="flex-none mr-[40px]">
              <div>
                {`${title} `}
                <span className="font-[600]">{`${data}`}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="col-start-2 col-end-3 row-start-3">
        <div className="font-[500] break-words">{`RIIZE`}</div>
      </section>
      {/* {  <section className="col-start-1 col-end-3 row-start-6">5</section>} */}
      <section className="col-start-1 col-end-3 row-start-5 mt-[44px]"></section>
    </header>
  );
}
