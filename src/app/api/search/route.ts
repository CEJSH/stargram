import { searchUsersBy } from "@/app/service/user";
import { NextResponse } from "next/server";

export async function GET() {
  // 여기서는 세션에 대한 정보를 가져오지 않음
  // 검색하는 기능은 로그인하지 않아도 사용할 수 있기 때문

  return searchUsersBy().then((data) => NextResponse.json(data));
}
