import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

interface ConsultationRow {
  id: number;
  category: string;
  region: string;
  name: string;
  phone: string;
  title: string;
  content: string;
  status: string;
  views: number;
  created_at: string;
  has_reply: number;
}

// GET — 목록 (필터 + 페이지네이션)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit")) || 15));
    const category = searchParams.get("category") || "";
    const search = searchParams.get("q") || "";
    const offset = (page - 1) * limit;

    let where = "WHERE 1=1";
    const params: unknown[] = [];

    if (category && category !== "전체") {
      where += " AND c.category = ?";
      params.push(category);
    }
    if (search.trim()) {
      where += " AND (c.title LIKE ? OR c.content LIKE ?)";
      params.push(`%${search.trim()}%`, `%${search.trim()}%`);
    }

    // 총 건수
    const countRows = await query<{ cnt: number }[]>(
      `SELECT COUNT(*) as cnt FROM web_consultations c ${where}`,
      params
    );
    const total = countRows[0]?.cnt || 0;

    // 목록 (비밀번호, 연락처 제외)
    // LIMIT/OFFSET은 mysql2 execute에서 prepared statement 파라미터로 넘기면
    // ER_WRONG_ARGUMENTS 에러 발생 → 정수로 직접 삽입 (값은 위에서 검증됨)
    const rows = await query<ConsultationRow[]>(
      `SELECT c.id, c.category, c.region, c.name, c.title,
              c.status, c.views, c.created_at,
              (SELECT COUNT(*) FROM web_consultation_replies r WHERE r.consultation_id = c.id) as has_reply
       FROM web_consultations c
       ${where}
       ORDER BY c.created_at DESC
       LIMIT ${Number(limit)} OFFSET ${Number(offset)}`,
      params
    );

    return NextResponse.json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/consultations error:", error);
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

// POST — 상담 작성
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, region, name, phone, email, password, title, content } = body;

    // Validation
    if (!name || !phone || !password || !title || !content) {
      return NextResponse.json(
        { success: false, error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }
    if (!/^\d{4}$/.test(password)) {
      return NextResponse.json(
        { success: false, error: "비밀번호는 숫자 4자리로 입력해주세요." },
        { status: 400 }
      );
    }

    const result = await query<{ insertId: number }>(
      `INSERT INTO web_consultations (category, region, name, phone, email, password, title, content)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [category || "기타", region || "", name, phone, email || "", password, title, content]
    );

    return NextResponse.json({
      success: true,
      id: (result as unknown as { insertId: number }).insertId,
      message: "상담이 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.",
    });
  } catch (error) {
    console.error("POST /api/consultations error:", error);
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
