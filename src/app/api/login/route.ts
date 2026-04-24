import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 登录成功后设置 cookie
export async function POST(request: NextRequest): Promise<NextResponse<{ message: string }>> {
  const { userName, password } = await request.json() as { userName: string; password: string };
  console.log(userName, '------', password);
  if (userName === "admin" && password === "123456") {
    const cookieStore = await cookies();
    cookieStore.set("token", "123456");
    return NextResponse.json({ message: "登录成功!" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "用户名或密码错误!" }, { status: 401 });
  }
}

// 检查登录状态
export async function GET(request: NextRequest): Promise<NextResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (token && token.value === "123456") {
    return NextResponse.json({ message: "已登录!" });
  } else {
    return NextResponse.json({ message: "未登录!" }, { status: 401 });
  }
}