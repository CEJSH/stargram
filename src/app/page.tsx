import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  const sectionClassName = "min-w-[420px] basis-1/3 flex flex-col h-100vh";
  const user = session?.user;
  if (!user) {
    redirect("/signin");
  }
  return (
    <section className="flex flex-col md:flex-row max-w-screen-2xl gap-[16px] w-full h-full pt-[16px] justify-center">
      <FollowingBar className={sectionClassName} />
      <PostList className={sectionClassName} />
      <SideBar className={sectionClassName} user={user} />
    </section>
  );
}
