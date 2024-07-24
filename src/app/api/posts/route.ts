import { NextRequest, NextResponse } from "next/server";
import { createPost, getFollowingPostsOf } from "@/service/posts";
import { withSessionUser } from "@/util/session";

export async function GET() {
  return withSessionUser(async (user) =>
    getFollowingPostsOf(user.username).then((data) => NextResponse.json(data))
  );
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    // body 부분에 정확한데이터를 보내줬는지 확인을 해 주어야 함
    const form = await req.formData();
    const text = form.get("text")?.toString();
    const file = form.get("file") as Blob;

    if (!text || !file) {
      return new Response("Bad Request", { status: 400 });
    }

    return createPost(user.username, text, file).then((data) =>
      NextResponse.json(data)
    );
  });
}
