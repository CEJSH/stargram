import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  const sectionClassName = "min-w-[420px] w-1/3 flex flex-col h-100vh";
  const user = session?.user;
  if (!user) {
    redirect("/signin");
  }
  return (
    <section className="w-full h-full flex gap-[16px] pt-[16px] justify-center">
      <FollowingBar className={sectionClassName} />
      <PostList className={sectionClassName} />
      <SideBar className={sectionClassName} user={user} />
    </section>
  );
}
