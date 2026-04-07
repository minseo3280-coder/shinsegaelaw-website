import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

interface ConsultationDetail {
  id: number;
  category: string;
  region: string;
  name: string;
  phone: string;
  email: string;
  title: string;
  content: string;
  status: string;
  views: number;
  created_at: string;
}

interface ReplyRow {
  id: number;
  lawyer_name: string;
  reply_body: string;
  created_at: string;
}

// POST — 비밀번호 확인 후 상세 조회
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, error: "비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const rows = await query<ConsultationDetail[]>(
      "SELECT id, category, region, name, phone, email, title, content, status, views, created_at FROM web_consultations WHERE id = ? AND password = ?",
      [id, password]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "비밀번호가 일치하지 않습니다." },
        { status: 403 }
      );
    }

    // 조회수 증가
    await query("UPDATE web_consultations SET views = views + 1 WHERE id = ?", [id]);

    // 답변 조회
    const replies = await query<ReplyRow[]>(
      "SELECT id, lawyer_name, reply_body, created_at FROM web_consultation_replies WHERE consultation_id = ? ORDER BY created_at ASC",
      [id]
    );

    return NextResponse.json({
      success: true,
      data: { ...rows[0], replies },
    });
  } catch (error) {
    console.error("POST /api/consultations/[id]/verify error:", error);
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
