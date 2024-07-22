import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { dislikePost, likePost } from "@/app/service/posts";

export async function PUT(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const { id, like } = await req.json();

  if (!id || like === undefined) {
    return new Response("Bad Request", { status: 400 });
  }
  const request = like ? likePost : dislikePost;

  return request(id, user.username)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.log(id, "user----------id-------->", user.id, error);
      new NextResponse(JSON.stringify(error), { status: 500 });
    });
}
