import { NextRequest, NextResponse } from "next/server";

// POST — 관리자 로그인 (간단 비밀번호 방식)
export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const adminPw = process.env.ADMIN_PASSWORD || "shinsegae2026!";

    if (password !== adminPw) {
      return NextResponse.json(
        { success: false, error: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    // 간단한 토큰 생성 (24시간 유효)
    const token = Buffer.from(`admin:${Date.now() + 86400000}`).toString("base64");

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ success: false, error: "서버 오류" }, { status: 500 });
  }
}
