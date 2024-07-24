import { NextRequest, NextResponse } from "next/server";
import { addBookmark, removeBookmark } from "@/app/service/user";
import { withSessionUser } from "@/util/session";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, bookmark } = await req.json();
    // bookmark가 null or undefined
    if (!id || bookmark == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.username, id)
      .then((res) => NextResponse.json(res))
      .catch((error) => {
        return new Response(JSON.stringify(error), { status: 500 });
      });
  });
}

// return withSessionUser(callback); //callback == (user) => Promise<Response>
