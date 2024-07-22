import { HomeUser } from "@/model/user";
import useSWR from "swr";

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");

  const setBookmark = (postId: string, bookmark: boolean) => {
    // 로컬상으로 업데이트 할 변경된 포스트의 배열 ( newPosts(&newPost) )
    // 바운드된 mutate함수 호출 (이 때, 첫번째 인자값으로 fetch함수를 전달하면 여기서 반환된 값으로 바운드된 mutate /api/posts데이터를 덮어 씌워준다)
    // 근데 우리가 updateLike를 할 때, 모든 포스트에 있는 데이터들을 가져오는 게 아니라, populateCache를 false로 지정했다.
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
  };

  return {
    user,
    isLoading,
    error,
    setBookmark,
  };
}
