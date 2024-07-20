import { FaRegBookmark } from "react-icons/fa";
type Props = {
  className?: string;
};
export default function BookmarkIcon({ className }: Props) {
  return (
    <FaRegBookmark
      style={{ fontSize: "22px", cursor: "pointer" }}
      className={className || "w-[22px] h-[22px]"}
    />
  );
}
