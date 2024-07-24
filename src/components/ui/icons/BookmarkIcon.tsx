import { FaRegBookmark } from "react-icons/fa";
type Props = {
  className?: string;
};
export default function BookmarkIcon({ className }: Props) {
  return (
    <FaRegBookmark
      style={{ fontSize: "21px", cursor: "pointer" }}
      className={className || "w-[20px] h-[20px]"}
    />
  );
}
