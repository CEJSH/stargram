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
