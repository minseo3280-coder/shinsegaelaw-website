import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyAdmin } from "@/lib/admin-auth";

// POST — 관리자 답변 작성
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ success: false, error: "인증이 필요합니다." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { lawyer_name, reply_body } = await req.json();

    if (!reply_body?.trim()) {
      return NextResponse.json({ success: false, error: "답변 내용을 입력해주세요." }, { status: 400 });
    }

    await query(
      "INSERT INTO web_consultation_replies (consultation_id, lawyer_name, reply_body) VALUES (?, ?, ?)",
      [id, lawyer_name || "법무법인 신세계로", reply_body.trim()]
    );

    // 상태를 done으로 변경
    await query("UPDATE web_consultations SET status = 'done' WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "답변이 등록되었습니다." });
  } catch (error) {
    console.error("Admin reply error:", error);
    return NextResponse.json({ success: false, error: "서버 오류" }, { status: 500 });
  }
}
