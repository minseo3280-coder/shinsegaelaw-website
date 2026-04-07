import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyAdmin } from "@/lib/admin-auth";

// PATCH — 상태 변경
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ success: false, error: "인증이 필요합니다." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!["waiting", "done"].includes(status)) {
      return NextResponse.json({ success: false, error: "잘못된 상태값입니다." }, { status: 400 });
    }

    await query("UPDATE web_consultations SET status = ? WHERE id = ?", [status, id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin status error:", error);
    return NextResponse.json({ success: false, error: "서버 오류" }, { status: 500 });
  }
}
