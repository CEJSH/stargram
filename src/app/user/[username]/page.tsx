import { getUserForProfile } from "@/app/service/user";
import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { notFound } from "next/navigation";

type Props = { params: { username: string } };

export default async function UserPage({ params: { username } }: Props) {
  // 상단: 사용자의 프로필 이미지와 정보(username, name, 숫자)
  // 하단: 3개의 탭(posts, liked, bookmarks)

  const user = await getUserForProfile(username);
  console.log("profile", user);
  if (!user) {
    notFound();
  }
  return (
    <div className="w-full h-full min-h-[100vh] flex flex-col grow items-center justify-center">
      <div className="flex flex-col bg-white h-full pt-[30px] mb-[30px] max-w-[935px] w-[calc(100%-40px)] mt-[32px] rounded-xl px-[20px] grow-1">
        <UserProfile user={user} />
        <UserPosts user={user} />
      </div>
    </div>
  );
}
