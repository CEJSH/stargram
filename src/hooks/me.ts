import { HomeUser } from "@/model/user";
import { useCallback } from "react";
import useSWR from "swr";

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");

  // setBookmark가 다른 컴포넌트로 전달되면 나중에 커스텀 훅이나 이걸 사용하는 곳에서 상태가 바뀐다면 즉 그 컴포넌트가 리렌더링 된다면,
  // 새로운 함수가 setBookmark에 할당이 될 거구 그걸 prop으로 전달받는 컴포넌트들도 prop이 바뀌니 다시 모든것들이 리렌더링 될 것.
  // 리액트의 기본적 내용. 이모든걸 방지하기 위해 useCallback으로 감싸는 게 좋음

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = user?.bookmarks;
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((b) => b !== postId),
      };
      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [mutate, user]
  );

  return {
    user,
    isLoading,
    error,
    setBookmark,
  };
}
