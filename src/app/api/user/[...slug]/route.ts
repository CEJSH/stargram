import { NextRequest, NextResponse } from "next/server";
import { getSavedPostsOf, getLikedPostsOf, getPostsOf } from "@/service/posts";

type Context = {
  params: { slug: string[] }; // slug/slug/slug
};
// 여기서는 세션에 대한 정보를 가져오지 않음
// 검색하는 기능은 로그인하지 않아도 사용할 수 있기 때문
export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const [username, query] = slug;

  // 우선 쿼리가 뭐냐에따라 어떤 걸 호출할지 정해줄 것임.
  let request = getPostsOf;
  if (query === "saved") {
    request = getSavedPostsOf;
  } else if (query === "liked") {
    request = getLikedPostsOf;
  }

  return request(username).then((data) => NextResponse.json(data));
}
