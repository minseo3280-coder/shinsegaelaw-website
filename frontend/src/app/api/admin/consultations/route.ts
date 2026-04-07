import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyAdmin } from "@/lib/admin-auth";

// GET — 관리자 상담 목록 (전체 정보 포함)
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ success: false, error: "인증이 필요합니다." }, { status: 401 });
  }

  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = 20;
    const status = searchParams.get("status") || "";
    const search = searchParams.get("q") || "";
    const offset = (page - 1) * limit;

    let where = "WHERE 1=1";
    const params: unknown[] = [];

    if (status && status !== "all") {
      where += " AND c.status = ?";
      params.push(status);
    }
    if (search.trim()) {
      where += " AND (c.title LIKE ? OR c.name LIKE ? OR c.phone LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const countRows = await query<{ cnt: number }[]>(
      `SELECT COUNT(*) as cnt FROM web_consultations c ${where}`, params
    );
    const total = countRows[0]?.cnt || 0;

    const rows = await query(
      `SELECT c.*,
              (SELECT COUNT(*) FROM web_consultation_replies r WHERE r.consultation_id = c.id) as reply_count
       FROM web_consultations c
       ${where}
       ORDER BY c.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      success: true,
      data: rows,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Admin consultations error:", error);
    return NextResponse.json({ success: false, error: "서버 오류" }, { status: 500 });
  }
}
