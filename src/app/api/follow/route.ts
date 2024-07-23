// 기존 사용자의 정보를 업데이트하므로 PUT & like와 비슷할 것으로 예상

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { follow, unfollow } from "@/app/service/user";

export async function PUT(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const { id: targetId, follow: isFollow } = await req.json();

  if (!targetId || isFollow === undefined) {
    return new Response("Bad Request", { status: 400 });
  }
  const request = isFollow ? follow : unfollow;
  return request(user.username, targetId)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      new NextResponse(JSON.stringify(error), { status: 500 });
    });
}
