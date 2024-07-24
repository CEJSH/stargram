import { NextRequest, NextResponse } from "next/server";
import { searchUsersBy } from "@/service/user";

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, context: Context) {
  // 여기서는 세션에 대한 정보를 가져오지 않음
  // 검색하는 기능은 로그인하지 않아도 사용할 수 있기 때문

  return searchUsersBy(context.params.keyword).then((data) =>
    NextResponse.json(data)
  );
}
