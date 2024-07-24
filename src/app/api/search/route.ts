import { searchUsersBy } from "@/service/user";
import { NextResponse } from "next/server";

//fetch함수를 사용하지 않으면 무조건 정적인 SSG로 빌드가 됨.
export const dynamic = "force-dynamic";

//위 코드를 적어줘야 next-js가 아 이 라우트 핸들러는 별도로 동적인 걸 검사하거나 데이터를 쓰진 않지만 그래도 항상 요청이 오면
// 그떄 여기를 수행햐야겠구나 하고 판단할 수 있게 해줌
export async function GET() {
  return searchUsersBy().then((data) => NextResponse.json(data));
}
