"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Phone,
  Printer,
  Car,
  TrainFront,
  CircleParking,
  Navigation,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import AboutTabs from "@/components/shared/AboutTabs";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import firmData from "@/../../data/firm_info.json";

/* ─── 사무소 데이터 ─── */
const offices = [
  {
    label: "서울 주사무소",
    shortLabel: "서울",
    badge: "본사",
    building: "정곡빌딩 동관 207호",
    coords: { lat: 37.494444593348135, lng: 127.01075628793251 },
    roadview: "https://naver.me/xmtBAG3b",
    naverMap: `https://map.naver.com/p/search/${encodeURIComponent("서울시 서초구 법원로 16 정곡빌딩")}`,
    kakaoMap: `https://map.kakao.com/link/map/${encodeURIComponent("법무법인신세계로 서울")},37.494444593348135,127.01075628793251`,
    subway: [
      {
        line: "2",
        color: "#33A23D",
        station: "서초역 8번 출구",
        desc: "출구에서 150m 직진 → 대신빌딩에서 좌회전 → 중앙지법 방면 150m → 정곡빌딩 동관 207호",
      },
      {
        line: "3",
        color: "#FF7300",
        station: "교대역 10번 출구",
        desc: "출구에서 150m 직진 → 서초대가에서 우회전 → 중앙지법 방면 150m → 정곡빌딩 동관 207호",
      },
    ],
    driving:
      "교대역에서 서초역 방면으로 서초대가를 끼고 우회전, 중앙지법 방면 150m 직진 → 정곡빌딩 동관 207호",
    parking: [
      { name: "정곡빌딩 남관 주차장", type: "유료" },
      { name: "법원주차장", type: "무료, 차량5부제" },
    ],
    parkingNote:
      "법원일대 주차가 여유롭지 못하니 대중교통 이용을 권해드립니다.",
  },
  {
    label: "대전 분사무소",
    shortLabel: "대전",
    badge: "분사무소",
    building: "201호",
    coords: { lat: 36.35325897154163, lng: 127.3875220174725 },
    roadview: "https://naver.me/5ipxD6iI",
    naverMap: `https://map.naver.com/p/search/${encodeURIComponent("대전광역시 서구 둔산로123번길 43")}`,
    kakaoMap: `https://map.kakao.com/link/map/${encodeURIComponent("법무법인신세계로 대전")},36.35325897154163,127.3875220174725`,
    subway: [
      {
        line: "1",
        color: "#33A23D",
        station: "시청역 5번 출구",
        desc: "대전법원 방면 도보 약 5분",
      },
    ],
    driving: "건물 내 주차장 이용 가능",
    parking: [],
    parkingNote: null,
  },
  {
    label: "수원 분사무소",
    shortLabel: "수원",
    badge: "분사무소",
    building: "208호",
    coords: { lat: 37.25446036233967, lng: 127.07341554494703 },
    roadview: "https://naver.me/FjcC0xES",
    naverMap: `https://map.naver.com/p/search/${encodeURIComponent("경기도 수원시 영통구 봉영로 1605")}`,
    kakaoMap: `https://map.kakao.com/link/map/${encodeURIComponent("법무법인신세계로 수원")},37.25446036233967,127.07341554494703`,
    subway: [
      {
        line: "1",
        color: "#0052A4",
        station: "수원역",
        desc: "수원법원 방면 택시 약 10분",
      },
    ],
    driving: "건물 내 주차장 이용 가능",
    parking: [],
    parkingNote: null,
  },
];

/* ─── Google Maps embed URL ─── */
function getMapEmbedUrl(address: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
}

/* ─── 메인 컴포넌트 ─── */
function LocationContent() {
  const revealRef = useScrollReveal();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const office = searchParams.get("office");
    if (office !== null) {
      const idx = parseInt(office, 10);
      if (idx >= 0 && idx < firmData.offices.length) {
        setActiveTab(idx);
      }
    }
  }, [searchParams]);

  const officeData = firmData.offices[activeTab];
  const detail = offices[activeTab];

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(officeData.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={revealRef}>
      {/* Banner */}
      <SubPageHero
        titleEn="VISIT US"
        titleKo="오시는 길"
        bannerImage="/images/office/banner-about.jpg"
        breadcrumbs={[{ label: "신세계로", href: "/about/greeting" }, { label: "오시는 길" }]}
      />
      <AboutTabs activeTab={3} />

      {/* ═══ Headline ═══ */}
      <section className="bg-white pt-8 md:pt-20 pb-6 md:pb-12" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="flex items-center gap-3 mb-4 md:mb-5">
            <div className="w-8 md:w-10 h-[2px] bg-burgundy-500" />
            <p className="text-[13px] md:text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
              오시는 길
            </p>
          </div>
          <h2
            className="font-sans text-[20px] md:text-[38px] lg:text-[44px] leading-[1.3] font-bold text-[#2C2028] mb-3 md:mb-5"
            style={{ wordBreak: "keep-all" }}
          >
            가장 가까운 사무소에서,<br />
            <span className="text-burgundy-500">새로운 시작</span>을 함께하겠습니다.
          </h2>
          <p className="text-[14px] md:text-[18px] leading-[1.8] text-[#333333]">
            서울 · 대전 · 수원, 전국 3개 사무소에서 만나실 수 있습니다.
          </p>
        </div>
      </section>

      {/* ═══ 사무소 선택 + 상세 ═══ */}
      <section className="bg-white pb-12 md:pb-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">

          {/* ── 사무소 탭 ── */}
          <div className="flex border-b-2 border-gray-200 mb-0">
            {offices.map((o, i) => (
              <button
                key={o.label}
                onClick={() => { setActiveTab(i); setCopied(false); }}
                className={`flex-1 py-3.5 md:py-4 text-[14px] md:text-[16px] font-bold text-center whitespace-nowrap transition-all duration-200 relative ${
                  i === activeTab
                    ? "text-[#2C2028]"
                    : "text-gray-400 hover:text-[#333333]"
                }`}
              >
                {o.shortLabel}
                {i === activeTab && (
                  <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[#2C2028]" />
                )}
              </button>
            ))}
          </div>

          {/* ── 지도 ── */}
          <div className="w-full h-[280px] md:h-[420px] bg-gray-100">
            <iframe
              key={activeTab}
              src={getMapEmbedUrl(officeData.address)}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${detail.label} 지도`}
            />
          </div>

          {/* ── 사무소 정보 ── */}
          <div className="border border-gray-200 border-t-0">
            <div className="p-5 md:p-8">
              {/* 사무소명 + 뱃지 */}
              <div className="flex items-center gap-2.5 mb-4">
                <h3 className="text-[18px] md:text-[24px] font-bold text-[#2C2028]">
                  {detail.label}
                </h3>
                <span className={`text-[12px] md:text-[12px] tracking-[0.1em] uppercase font-bold px-2 py-0.5 ${
                  activeTab === 0
                    ? "bg-burgundy-50 text-burgundy-600"
                    : "bg-gray-100 text-[#888]"
                }`}>
                  {detail.badge}
                </span>
              </div>

              {/* 주소 */}
              <div className="flex items-start gap-2 mb-3">
                <MapPin size={15} className="text-burgundy-500 shrink-0 mt-0.5" />
                <span className="text-[15px] md:text-[17px] text-[#333333] leading-relaxed">
                  {officeData.address}
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1 text-[12px] text-gray-400 hover:text-burgundy-500 transition-colors shrink-0 ml-1 mt-0.5"
                >
                  {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                  {copied ? "복사됨" : "복사"}
                </button>
              </div>

              {/* TEL / FAX */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5">
                <a
                  href={`tel:${officeData.phone}`}
                  className="flex items-center gap-2 text-[15px] md:text-[17px] text-[#2C2028] hover:text-burgundy-500 transition-colors"
                  aria-label={`전화 ${officeData.phone}`}
                >
                  <Phone size={14} className="text-burgundy-500" />
                  <span className="font-bold text-[12px] text-[#999]">TEL</span>
                  <span className="font-bold">{officeData.phone}</span>
                </a>
                {officeData.fax && (
                  <span className="flex items-center gap-2 text-[15px] md:text-[17px] text-[#555]">
                    <Printer size={14} className="text-gray-400" />
                    <span className="font-bold text-[12px] text-[#999]">FAX</span>
                    {officeData.fax}
                  </span>
                )}
              </div>

              {/* 외부 링크 */}
              <div className="flex flex-wrap gap-2">
                <a
                  href={detail.naverMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-[14px] font-semibold text-[#555] hover:border-[#2C2028] hover:text-[#2C2028] transition-all"
                >
                  <Navigation size={12} />
                  네이버 지도
                  <ExternalLink size={10} className="text-gray-400" />
                </a>
                <a
                  href={detail.kakaoMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-[14px] font-semibold text-[#555] hover:border-[#2C2028] hover:text-[#2C2028] transition-all"
                >
                  <MapPin size={12} />
                  카카오맵
                  <ExternalLink size={10} className="text-gray-400" />
                </a>
                <a
                  href={detail.roadview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-[14px] font-semibold text-[#555] hover:border-[#2C2028] hover:text-[#2C2028] transition-all"
                >
                  <ExternalLink size={12} />
                  로드뷰
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 교통안내 ═══ */}
      <section className="bg-[#F8F4EE] py-8 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-8 md:w-10 h-[2px] bg-burgundy-500" />
            <p className="text-[13px] md:text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
              교통안내
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* 대중교통 */}
            <div className="bg-white border border-gray-200/80 p-5 md:p-7">
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
                <TrainFront size={18} className="text-burgundy-500" />
                <h4 className="text-[16px] md:text-[18px] font-bold text-[#2C2028]">대중교통</h4>
              </div>

              <div className="space-y-4">
                {detail.subway.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 text-white text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: s.color }}
                    >
                      {s.line}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] md:text-[16px] font-bold text-burgundy-500 mb-1">
                        {s.station}
                      </p>
                      <p className="text-[14px] md:text-[15px] text-[#555] leading-[1.7]">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 자가용 */}
            <div className="bg-white border border-gray-200/80 p-5 md:p-7">
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
                <Car size={18} className="text-burgundy-500" />
                <h4 className="text-[16px] md:text-[18px] font-bold text-[#2C2028]">자가용</h4>
              </div>

              <p className="text-[14px] md:text-[15px] text-[#555] leading-[1.7] mb-5">
                {detail.driving}
              </p>

              {detail.parking.length > 0 && (
                <div className="bg-[#F8F4EE] p-4 mb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <CircleParking size={14} className="text-burgundy-500" />
                    <span className="text-[14px] font-bold text-[#2C2028]">주차장 안내</span>
                  </div>
                  <div className="space-y-2">
                    {detail.parking.map((p, i) => (
                      <div key={i} className="flex items-center justify-between text-[14px]">
                        <span className="text-[#555]">{i + 1}. {p.name}</span>
                        <span className={`text-[12px] px-2 py-0.5 font-semibold ${
                          p.type.includes("무료")
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          {p.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {detail.parkingNote && (
                <p className="text-[13px] text-burgundy-500/70 flex items-start gap-1">
                  <span className="shrink-0">*</span>
                  {detail.parkingNote}
                </p>
              )}

              {detail.parking.length === 0 && (
                <div className="bg-[#F8F4EE] p-4 text-center">
                  <p className="text-[14px] text-[#555]">건물 내 주차장 이용 가능</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 전 사무소 연락처 ═══ */}
      <section className="bg-white py-8 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-8 md:w-10 h-[2px] bg-burgundy-500" />
            <p className="text-[13px] md:text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
              전국 사무소
            </p>
          </div>

          {/* 3개 사무소 — 심플 가로 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
            {firmData.offices.map((o, i) => (
              <button
                key={o.name}
                onClick={() => {
                  setActiveTab(i);
                  setCopied(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-left p-5 md:p-6 transition-all duration-200 ${
                  i < firmData.offices.length - 1 ? "border-b md:border-b-0 md:border-r border-gray-200" : ""
                } ${
                  i === activeTab
                    ? "bg-[#F8F4EE]"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] tracking-[0.1em] uppercase font-bold px-2 py-0.5 ${
                    i === 0 ? "bg-burgundy-50 text-burgundy-600" : "bg-gray-100 text-[#888]"
                  }`}>
                    {i === 0 ? "본사" : "분사무소"}
                  </span>
                </div>
                <h4 className="text-[16px] md:text-[18px] font-bold text-[#2C2028] mb-2">
                  {offices[i].shortLabel}
                </h4>
                <p className="text-[13px] md:text-[14px] text-[#888] leading-[1.6] mb-2" style={{ wordBreak: "keep-all" }}>
                  {o.address}
                </p>
                <p className="text-[15px] md:text-[16px] font-bold text-[#2C2028]">
                  {o.phone}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function LocationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <LocationContent />
    </Suspense>
  );
}
