import Image from "next/image";
import others from "../../public/images/12.jpg";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import MessageIcon from "./ui/icons/MessageIcon";
import SendIcon from "./ui/icons/SendIcon";
import { parseDate } from "@/util/date";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import { Comment, SimplePost } from "@/model/post";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";
import CommentForm from "./CommentForm";

type Props = {
  post: SimplePost;
  className?: string;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({
  post,
  className,
  children,
  onComment,
}: Props) {
  const { id, likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
  };
  return (
    <section
      className={"flex flex-col gap-[10px] h-fit w-full p-[4px] " + className}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-[16px] pb-2">
          <div className="flex flex-row gap-[2px] items-center rounded-2xl border-fuchsia-600 border-[1px] px-[8px] py-[4px] border-solid">
            <ToggleButton
              toggled={liked}
              onToggle={handleLike}
              onIcon={<HeartFillIcon />}
              offIcon={<HeartIcon />}
            />
            <div>{likes && likes.length}</div>
          </div>
          <MessageIcon />
          <SendIcon />
        </div>
        <div className="flex items-center pb-2">
          <ToggleButton
            toggled={bookmarked}
            onToggle={handleBookmark}
            onIcon={<BookmarkFillIcon />}
            offIcon={<BookmarkIcon />}
          />
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
        <div className="flex flex-col">
          {children}
          <span className="text-[#9e9ea7] text-[12px]">
            {parseDate(createdAt)}
          </span>
        </div>
      </div>
      <CommentForm onPostComment={handleComment} userImage={user?.image} />
    </section>
  );
}
