import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  const followingBarStyle =
    "max-h-full md:max-h-[calc(100vh-124px)] min-w-[300px] md:basis-1/4 basis-1/5 flex flex-col";
  const sectionClassName = "min-w-[340px] md:basis-1/3 basis-2/5 flex flex-col";

  const user = session?.user;
  if (!user) {
    redirect("/signin");
  }
  return (
    <section className="overflow-y-auto flex flex-col md:flex-row justify-between max-w-screen-2xl gap-[16px] w-full py-[16px]">
      <FollowingBar className={followingBarStyle} />
      <PostList className={sectionClassName} />
      <SideBar className={sectionClassName} user={user} />
    </section>
  );
}
