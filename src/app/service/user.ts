import { SearchUser } from "@/model/user";
import { client } from "./sanity";
type OAuthUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  image?: string | null;
};
export async function addUser({ id, username, email, name, image }: OAuthUser) {
  // 어떤이유에선지 id가 계속 바껴서 그냥 username을 id에 줌
  return client.createIfNotExists({
    _id: username,
    _type: "user",
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: String) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
    ...,
    "id":_id,
    following[]->{username,image,name},
    followers[]->{username,image,name},
    "bookmarks":bookmarks[]->_id
  }`,
    undefined,
    { cache: "no-store" }
  );
}

export async function getUserDataBy(username: String) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
    ...,
    "id":_id,
    following[]->{username,image,name},
    followers[]->{username,image,name},
    "bookmarks":bookmarks[]->_id
  }`,
    undefined,
    { cache: "no-store" }
  );
}

export async function searchUsersBy(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : "";

  return client
    .fetch(
      `*[_type == "user" ${query}] | order(_updatedAt desc) {
    ...,
    "id": _id,
    "following": count(following),
    "followers": count(followers),
  }`,
      undefined,
      { cache: "no-store" }
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    )
    .then((posts) =>
      posts.reduce((accUser: SearchUser[], currUser: SearchUser) => {
        const postExists = accUser.some((user) => user.id === currUser.id);
        if (postExists) {
          return accUser;
        } else {
          if (currUser.id && currUser.id.startsWith("drafts")) {
            return [
              ...accUser,
              {
                ...currUser,
                id: currUser.id.slice(7),
              },
            ];
          }
          return [...accUser, currUser];
        }
      }, [])
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `
    *[_type == "user" && username == "${username}"][0]{
    ...,
    "id":_id,
    "following": count(following),
    "followers": count(followers),
    "posts": count(*[_type =="post" && author->username == "${username}"])
    }
    `
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}
