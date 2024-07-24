// 기존 사용자의 정보를 업데이트하므로 PUT & like와 비슷할 것으로 예상

import { NextRequest, NextResponse } from "next/server";
import { follow, unfollow } from "@/service/user";
import { withSessionUser } from "@/util/session";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: targetId, follow: isFollow } = await req.json();

    if (!targetId || isFollow == null) {
      return new Response("Bad Request", { status: 400 });
    }
    const request = isFollow ? follow : unfollow;
    return request(user.username, targetId)
      .then((res) => NextResponse.json(res))
      .catch(
        (error) => new NextResponse(JSON.stringify(error), { status: 500 })
      );
  });
}
