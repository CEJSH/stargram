import { getUserForProfile } from "@/service/user";
import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = { params: { username: string } };

// 동일한 사용자에 한해 캐시된 결과를 사용하도록..
const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  // 상단: 사용자의 프로필 이미지와 정보(username, name, 숫자)
  // 하단: 3개의 탭(posts, liked, bookmarks)

  const user = await getUser(username);

  if (!user) {
    notFound();
  }
  return (
    <section className="overflow-y-auto flex flex-col md:flex-row justify-center max-w-screen-2xl gap-[16px] w-full py-[16px]">
      <div className="min-w-[420px] bg-white min-h-[100dvh] h-full sm:pt-[30px] pt-[24px] sm:mb-[30px] mb-[20px] max-w-[935px] w-[calc(100%-40px)] rounded-xl sm:px-[20px] px-[12px]">
        <UserProfile user={user} />
        <UserPosts user={user} />
      </div>
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) · Eunstagram Photos`,
    description: `${user?.name}'s all Eunstagram Posts`,
  };
}
