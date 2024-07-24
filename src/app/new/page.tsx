import { Metadata } from "next";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import NewPost from "@/components/NewPost";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a New Post",
};

export default async function NewPostPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }
  return <NewPost user={session.user} />;
}
