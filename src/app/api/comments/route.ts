import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { addComment } from "@/app/service/posts";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const { id, comment } = await req.json();

  if (!id || comment === undefined) {
    return new Response("Bad Request", { status: 400 });
  }
  // 추가하는 것만 있으므로 like와 달리 Request설정해줄 필요 없음.

  return addComment(id, user.username, comment)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      new NextResponse(JSON.stringify(error), { status: 500 });
    });
}
