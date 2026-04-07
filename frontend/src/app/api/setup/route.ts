import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST() {
  try {
    // consultations 테이블
    await query(`
      CREATE TABLE IF NOT EXISTS consultations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(50) NOT NULL DEFAULT '기타',
        region VARCHAR(50) DEFAULT '',
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        email VARCHAR(255) DEFAULT '',
        password VARCHAR(255) NOT NULL,
        title VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        status ENUM('waiting', 'done') NOT NULL DEFAULT 'waiting',
        is_public TINYINT(1) NOT NULL DEFAULT 1,
        views INT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // admin_replies 테이블
    await query(`
      CREATE TABLE IF NOT EXISTS admin_replies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        consultation_id INT NOT NULL,
        lawyer_name VARCHAR(100) NOT NULL DEFAULT '법무법인 신세계로',
        reply_body TEXT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    return NextResponse.json({ success: true, message: "Tables created successfully" });
  } catch (error) {
    console.error("DB setup error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
