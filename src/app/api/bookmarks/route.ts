import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { addBookmark, removeBookmark } from "@/app/service/user";

export async function PUT(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const { id, bookmark } = await req.json();

  if (!id || bookmark === undefined) {
    return new Response("Bad Request", { status: 400 });
  }
  const request = bookmark ? addBookmark : removeBookmark;

  return request(user.username, id)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      new NextResponse(JSON.stringify(error), { status: 500 });
    });
}
