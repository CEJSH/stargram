import { useCacheKeys } from "@/context/CacheKeysContext";
import { Comment, SimplePost } from "@/model/post";
import { useCallback } from "react";
import useSWR from "swr";

async function updateLike(id: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

// async function addPost(id: string, text: string, file: Blob) {
//   return fetch("/api/posts", {
//     method: "POST",
//     body: JSON.stringify({ id, text, file }),
//   }).then((res) => res.json());
// }

export default function usePosts() {
  const cacheKeys = useCacheKeys();

  console.log(cacheKeys.postsKey);

  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKeys.postsKey);

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    // 로컬상으로 업데이트 할 변경된 포스트의 배열 ( newPosts(&newPost) )
    // 바운드된 mutate함수 호출 (이 때, 첫번째 인자값으로 fetch함수를 전달하면 여기서 반환된 값으로 바운드된 mutate /api/posts데이터를 덮어 씌워준다)
    // 근데 우리가 updateLike를 할 때, 모든 포스트에 있는 데이터들을 가져오는 게 아니라, populateCache를 false로 지정했다.

    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  return {
    posts,
    isLoading,
    error,
    setLike,
    postComment,
  };
}
