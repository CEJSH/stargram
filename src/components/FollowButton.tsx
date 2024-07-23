"use client";
import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/me";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";

// 사용자가 팔로우중인지 아닌지를 판단해야 함
// 클릭을 처리하므로 클라이언트 컴포넌트

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;
  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? "팔로우 취소" : "팔로우";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <PulseLoader size={4} />
            </div>
          )}

          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text === "팔로우 취소"}
          />
        </div>
      )}
    </>
  );
}
