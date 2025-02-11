import GridSpinner from "./ui/GridSpinner";
import PostGridCard from "./PostGridCard";
import usePosts from "@/hooks/posts";

export default function PostGrid() {
  const { posts, isLoading } = usePosts();
  return (
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-1 sm:py-4 py-0 sm:px-4 px-0">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
