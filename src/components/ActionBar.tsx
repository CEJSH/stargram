import Image from "next/image";
import others from "../../public/images/12.jpg";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import MessageIcon from "./ui/icons/MessageIcon";
import SendIcon from "./ui/icons/SendIcon";
import { parseDate } from "@/util/date";
import { useState } from "react";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";

type Props = {
  userId: string;
  createdAt: string;
  likes?: string[];
  text?: string;
  className?: string;
  likeHandler: () => void;
};

export default function ActionBar({
  userId,
  likes,
  text,
  createdAt,
  className,
  likeHandler,
}: Props) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <section
      className={"flex flex-col gap-[10px] h-fit w-full p-[4px] " + className}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-[16px]">
          <div
            onClick={likeHandler}
            className="cursor-pointer flex flex-row gap-[2px] items-center rounded-2xl border-fuchsia-600 border-[1px] px-[8px] py-[4px] border-solid"
          >
            {
              <ToggleButton
                toggled={liked}
                onToggle={setLiked}
                onIcon={<HeartFillIcon />}
                offIcon={<HeartIcon />}
              />
            }
            <div>{likes && likes.length}</div>
          </div>
          <MessageIcon />
          <SendIcon />
        </div>
        <div className="flex items-center">
          <BookmarkIcon />
        </div>
      </div>
      <div className="flex flex-col gap-0">
        {likes && likes?.length > 0 && (
          <div className="w-full flex gap-[8px]">
            <Image
              className="object-cover w-[20px] h-[20px] rounded-[50%]"
              src={others}
              alt="user"
              width={20}
              height={20}
            />
            <div className="flex flex-row gap-[4px] leading-5">
              <div> Liked by</div>
              <div className="font-[600]">{`${likes[0]}`}</div>
              <div className="font-[600]">
                {likes && likes?.length > 1
                  ? `and ${likes?.length - 1} others`
                  : ""}
              </div>
            </div>
          </div>
        )}
        <div>
          {text && (
            <p className="mt-[4px]">
              <span className="font-[600] mr-[4px]">{userId}</span>
              {text}
            </p>
          )}
          <span className="text-[#9e9ea7] text-[12px]">
            {parseDate(createdAt)}
          </span>
        </div>
      </div>
    </section>
  );
}
