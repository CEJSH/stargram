"use client";
import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/me";

// 사용자가 팔로우중인지 아닌지를 판단해야 함
// 클릭을 처리하므로 클라이언트 컴포넌트
type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser } = useMe();
  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? "팔로우 취소" : "팔로우";
  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === "팔로우 취소"} />
      )}
    </>
  );
}
