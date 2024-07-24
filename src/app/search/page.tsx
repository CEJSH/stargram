import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};

export default function SearchPage() {
  return (
    <section className="overflow-y-auto mx-auto  max-w-screen-2xl gap-[16px] flex justify-center w-full py-[24px]">
      <div className="relative h-full flex flex-col gpa-[12px] items-center md:w-2/5 sm:w-3/5 w-4/5">
        <UserSearch />
      </div>
    </section>
  );
}
