"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, LogOut, MessageSquare, Send, ChevronLeft, ChevronRight, Eye, Clock, CheckCircle2, Search } from "lucide-react";

interface Consultation {
  id: number;
  category: string;
  name: string;
  phone: string;
  email: string;
  title: string;
  content: string;
  status: string;
  views: number;
  created_at: string;
  reply_count: number;
}

interface Pagination {
  page: number;
  total: number;
  totalPages: number;
}

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getFullYear()}.${String(dt.getMonth()+1).padStart(2,"0")}.${String(dt.getDate()).padStart(2,"0")} ${String(dt.getHours()).padStart(2,"0")}:${String(dt.getMinutes()).padStart(2,"0")}`;
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [pw, setPw] = useState("");
  const [loginError, setLoginError] = useState("");

  // Data
  const [items, setItems] = useState<Consultation[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, total: 0, totalPages: 0 });
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // Reply modal
  const [replyTarget, setReplyTarget] = useState<Consultation | null>(null);
  const [replyLawyer, setReplyLawyer] = useState("법무법인 신세계로");
  const [replyBody, setReplyBody] = useState("");
  const [replySending, setReplySending] = useState(false);

  // Detail modal
  const [detailTarget, setDetailTarget] = useState<Consultation | null>(null);

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      const json = await res.json();
      if (json.success) {
        setToken(json.token);
        localStorage.setItem("admin_token", json.token);
      } else {
        setLoginError("비밀번호가 일치하지 않습니다.");
      }
    } catch {
      setLoginError("서버 연결 실패");
    }
  };

  // Check saved token
  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  // Fetch data
  const fetchData = useCallback(async (page: number) => {
    if (!token) return;
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (search) params.set("q", search);

      const res = await fetch(`/api/admin/consultations?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setItems(json.data);
        setPagination(json.pagination);
      } else if (res.status === 401) {
        setToken("");
        localStorage.removeItem("admin_token");
      }
    } catch (e) {
      console.error(e);
    }
  }, [token, statusFilter, search]);

  useEffect(() => {
    if (token) fetchData(1);
  }, [fetchData, token]);

  // Reply
  const handleReply = async () => {
    if (!replyTarget || !replyBody.trim()) return;
    setReplySending(true);
    try {
      await fetch(`/api/admin/consultations/${replyTarget.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lawyer_name: replyLawyer, reply_body: replyBody }),
      });
      setReplyTarget(null);
      setReplyBody("");
      fetchData(pagination.page);
    } catch (e) {
      console.error(e);
    } finally {
      setReplySending(false);
    }
  };

  // Status change
  const handleStatusChange = async (id: number, status: string) => {
    await fetch(`/api/admin/consultations/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchData(pagination.page);
  };

  // Login screen
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-burgundy-50 flex items-center justify-center mx-auto mb-4">
              <Lock size={24} className="text-burgundy-500" />
            </div>
            <h1 className="text-[20px] font-bold text-[#1a1a1a]">관리자 로그인</h1>
            <p className="text-[14px] text-[#888] mt-1">법무법인 신세계로</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setLoginError(""); }}
              placeholder="관리자 비밀번호"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-[15px] focus:outline-none focus:border-burgundy-300"
              autoFocus
            />
            {loginError && <p className="text-[13px] text-red-500">{loginError}</p>}
            <button className="w-full py-3.5 rounded-xl bg-burgundy-500 text-white font-bold hover:bg-burgundy-600 transition-all">
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <h1 className="text-[16px] font-bold text-[#1a1a1a]">
            <span className="text-burgundy-500">신세계로</span> 상담 관리
          </h1>
          <button
            onClick={() => { setToken(""); localStorage.removeItem("admin_token"); }}
            className="flex items-center gap-1.5 text-[13px] text-[#888] hover:text-red-500 transition-colors"
          >
            <LogOut size={14} /> 로그아웃
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border">
            <p className="text-[13px] text-[#888]">전체 상담</p>
            <p className="text-[28px] font-bold text-[#1a1a1a] mt-1">{pagination.total}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border">
            <p className="text-[13px] text-[#888] flex items-center gap-1"><Clock size={12} /> 대기중</p>
            <p className="text-[28px] font-bold text-amber-600 mt-1">
              {items.filter(i => i.status === "waiting").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border">
            <p className="text-[13px] text-[#888] flex items-center gap-1"><CheckCircle2 size={12} /> 답변완료</p>
            <p className="text-[28px] font-bold text-emerald-600 mt-1">
              {items.filter(i => i.status === "done").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex gap-1.5">
            {[
              { key: "all", label: "전체" },
              { key: "waiting", label: "대기중" },
              { key: "done", label: "답변완료" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setStatusFilter(f.key)}
                className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                  statusFilter === f.key
                    ? "bg-[#1a1a1a] text-white"
                    : "bg-white text-[#555] border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setSearch(searchInput); }} className="flex gap-2 ml-auto">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="이름/전화번호 검색"
              className="px-3 py-2 rounded-lg border border-gray-200 text-[13px] w-[200px] focus:outline-none focus:border-burgundy-300"
            />
            <button type="submit" className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <Search size={14} />
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 font-semibold text-[#555] w-12">#</th>
                <th className="text-left px-4 py-3 font-semibold text-[#555] w-16">분류</th>
                <th className="text-left px-4 py-3 font-semibold text-[#555]">제목</th>
                <th className="text-left px-4 py-3 font-semibold text-[#555] w-20">이름</th>
                <th className="text-left px-4 py-3 font-semibold text-[#555] w-28">연락처</th>
                <th className="text-left px-4 py-3 font-semibold text-[#555] w-20">상태</th>
                <th className="text-left px-4 py-3 font-semibold text-[#555] w-28">날짜</th>
                <th className="text-center px-4 py-3 font-semibold text-[#555] w-24">액션</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-[#999]">{item.id}</td>
                  <td className="px-4 py-3">
                    <span className="text-[12px] px-2 py-0.5 rounded bg-burgundy-50 text-burgundy-600 font-semibold">{item.category}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-[#1a1a1a] truncate max-w-[300px]">{item.title}</td>
                  <td className="px-4 py-3 text-[#555]">{item.name}</td>
                  <td className="px-4 py-3 text-[#555]">{item.phone}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleStatusChange(item.id, item.status === "done" ? "waiting" : "done")}
                      className={`text-[11px] px-2 py-0.5 rounded-full font-semibold cursor-pointer ${
                        item.status === "done"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.status === "done" ? "답변완료" : "대기중"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#888]">{formatDate(item.created_at)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setDetailTarget(item)}
                        className="p-1.5 rounded hover:bg-gray-100 text-[#888] hover:text-[#1a1a1a] transition-colors"
                        title="상세보기"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => { setReplyTarget(item); setReplyBody(""); }}
                        className="p-1.5 rounded hover:bg-burgundy-50 text-[#888] hover:text-burgundy-500 transition-colors"
                        title="답변하기"
                      >
                        <MessageSquare size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-[#888]">데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-6">
            <button onClick={() => fetchData(pagination.page - 1)} disabled={pagination.page === 1} className="w-9 h-9 rounded-lg border flex items-center justify-center disabled:opacity-30">
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).slice(0, 10).map((p) => (
              <button key={p} onClick={() => fetchData(p)} className={`w-9 h-9 rounded-lg text-[13px] font-medium border ${p === pagination.page ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" : "text-[#555] hover:bg-gray-50"}`}>{p}</button>
            ))}
            <button onClick={() => fetchData(pagination.page + 1)} disabled={pagination.page === pagination.totalPages} className="w-9 h-9 rounded-lg border flex items-center justify-center disabled:opacity-30">
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detailTarget && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40" onClick={() => setDetailTarget(null)}>
          <div className="bg-white rounded-2xl max-w-[600px] w-full mx-4 max-h-[80vh] overflow-y-auto p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] px-2.5 py-1 rounded-full bg-burgundy-50 text-burgundy-600 font-semibold">{detailTarget.category}</span>
              <button onClick={() => setDetailTarget(null)} className="text-[#999] hover:text-[#1a1a1a]">✕</button>
            </div>
            <h2 className="text-[18px] font-bold text-[#1a1a1a] mb-2">{detailTarget.title}</h2>
            <p className="text-[13px] text-[#888] mb-4">{detailTarget.name} · {detailTarget.phone} · {formatDate(detailTarget.created_at)}</p>
            <div className="bg-gray-50 rounded-xl p-5 text-[15px] text-[#333] leading-[1.9] whitespace-pre-wrap mb-4">
              {detailTarget.content}
            </div>
            <button
              onClick={() => { setReplyTarget(detailTarget); setDetailTarget(null); setReplyBody(""); }}
              className="w-full py-3 rounded-xl bg-burgundy-500 text-white font-bold hover:bg-burgundy-600 transition-all"
            >
              답변 작성하기
            </button>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyTarget && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40" onClick={() => setReplyTarget(null)}>
          <div className="bg-white rounded-2xl max-w-[600px] w-full mx-4 max-h-[80vh] overflow-y-auto p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-bold text-[#1a1a1a]">답변 작성</h2>
              <button onClick={() => setReplyTarget(null)} className="text-[#999] hover:text-[#1a1a1a]">✕</button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-[13px] text-[#888] mb-1">{replyTarget.category} · {replyTarget.name}</p>
              <p className="text-[14px] font-medium text-[#1a1a1a]">{replyTarget.title}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-bold text-[#555] mb-1.5 block">답변자</label>
                <input
                  type="text"
                  value={replyLawyer}
                  onChange={(e) => setReplyLawyer(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[14px] focus:outline-none focus:border-burgundy-300"
                />
              </div>
              <div>
                <label className="text-[13px] font-bold text-[#555] mb-1.5 block">답변 내용</label>
                <textarea
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  rows={6}
                  placeholder="답변 내용을 입력하세요..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[14px] leading-[1.8] focus:outline-none focus:border-burgundy-300 resize-none"
                  autoFocus
                />
              </div>
              <button
                onClick={handleReply}
                disabled={replySending || !replyBody.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-burgundy-500 text-white font-bold hover:bg-burgundy-600 disabled:opacity-50 transition-all"
              >
                <Send size={16} />
                {replySending ? "전송 중..." : "답변 등록"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
