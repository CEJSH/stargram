import { NextRequest, NextResponse } from "next/server";
import { addComment } from "@/service/posts";
import { withSessionUser } from "@/util/session";

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, comment } = await req.json();

    if (!id || comment == null) {
      return new Response("Bad Request", { status: 400 });
    }
    // 추가하는 것만 있으므로 like와 달리 Request설정해줄 필요 없음.

    return addComment(id, user.username, comment)
      .then((res) => NextResponse.json(res))
      .catch(
        (error) => new NextResponse(JSON.stringify(error), { status: 500 })
      );
  });
}
