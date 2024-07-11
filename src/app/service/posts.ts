import { SimplePost } from "@/model/post";
import { client, urlFor } from "./sanity";

const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    "text": comments[0].comment,
    "comment": count(comments),
    "id": _id,
    "createdAt": _createdAt
`; // post.author.username -> post.username

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type =="post" && author->username == "${username}"
     || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
     | order(_updatedAt desc){${simplePostProjection}}`
    )
    .then((posts) =>
      posts.reduce((accPost: SimplePost[], currPost: SimplePost) => {
        const postExists = accPost.some((post) => post.id === currPost.id);
        if (postExists) {
          return accPost;
        } else {
          if (currPost.id.startsWith("drafts")) {
            return [
              ...accPost,
              {
                ...currPost,
                image: urlFor(currPost.image),
                id: currPost.id.slice(7),
              },
            ];
          }
          return [...accPost, { ...currPost, image: urlFor(currPost.image) }];
        }
      }, [])
    );
}

export async function getPost(id: string) {
  return client
    .fetch(
      `
  *[_type == "post" && _id == "${id}"][0]{
  ...,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "likes": likes[]->username,
  comments[]{comment, "username":author->username, "image": author->image,
  "id":_id,
  "createdAt":_createdAt}
  } 
  `
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}
