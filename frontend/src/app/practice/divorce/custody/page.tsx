import Link from "next/link";
import {
  Users,
  Heart,
  CalendarCheck,
  Gavel,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  Scale,
  Info,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function CustodyPage() {
  const phone = firmData.offices?.[0]?.phone || "02-594-2800";

  return (
    <div className="">
      <SubPageHero
        titleKo="자녀문제 (양육권)"
        bannerImage="/images/office/banner-divorce.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/divorce" },
          { label: "자녀문제" },
        ]}
      />

      <PracticeTabs />

      <PracticeRevealWrapper>
        {/* ═══════════ SECTION 1 : HERO HEADLINE ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div data-reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-burgundy-500" />
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                  CHILD CUSTODY GUIDE
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6 max-w-5xl">
                아이의 미래를 지키는
                <br />
                전략이 필요합니다
              </h2>
              <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#2C2028] font-semibold mb-3 max-w-2xl">
                양육권 결정의 최우선 가치는 &lsquo;자녀의 복리&rsquo;입니다.{" "}
                <strong className="text-burgundy-500">
                  아이가 가장 안정적으로 성장할 수 있는 환경임
                </strong>
                을 법리적으로 입증하여 부모로서의 소중한 권리를 지켜드립니다.
              </p>
              <div className="mt-8">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  친권·양육권 1:1 집중 상담
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : LEGAL PROCESS 4 CARDS ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                LEGAL PROCESS
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight">
                자녀 보호를 위한 핵심 솔루션
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {[
                {
                  icon: <Users size={24} />,
                  title: "양육권 지정",
                  desc: "자녀의 복리, 양육 환경, 부모의 양육 의지 등 법원이 고려하는 다각적인 요소를 철저히 준비합니다.",
                },
                {
                  icon: <CalendarCheck size={24} />,
                  title: "면접교섭권",
                  desc: "비양육 부모와 자녀의 유대 관계를 유지하기 위한 권리로, 자녀의 정서적 안정을 최우선으로 설계합니다.",
                },
                {
                  icon: <Scale size={24} />,
                  title: "양육비 산정",
                  desc: "부모 합산 소득과 자녀의 교육비, 의료비 등 필요 경비를 고려하여 합리적인 양육비를 도출합니다.",
                },
                {
                  icon: <Gavel size={24} />,
                  title: "강제집행",
                  desc: "양육비 미지급 시 직접지급명령, 담보제공명령 등 법적 수단을 동원하여 실질적인 지급을 이끌어냅니다.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  data-reveal
                  className="bg-white rounded-xl p-4 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-3 md:mb-5 group-hover:bg-burgundy-500 group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h4 className="font-sans text-[15px] md:text-[17px] font-bold text-[#2C2028] mb-2 md:mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[13px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#3A3238] font-semibold">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3 : 양육권 의의 + 결정기준 vs 면접교섭권 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            {/* 양육권 설명 */}
            <div className="mb-14" data-reveal>
              <h3 className="font-sans text-[28px] md:text-[34px] font-bold text-[#2C2028] mb-6 leading-tight">
                양육권의 의의와 결정 기준
              </h3>
              <div className="space-y-4 max-w-5xl">
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#2C2028] font-semibold">
                  양육권이란 미성년 자녀를 부모의 보호 아래 두고 키울 권리를
                  의미합니다. 친권자 및 양육자는 일방으로 정하는 것도 가능하고{" "}
                  <strong className="text-[#2C2028]">공동친권</strong>으로
                  정하는 것도 가능합니다. 법원은 어느 쪽이 자녀의 건강한
                  성장에 더 적합한지를 판단하며, 성별에 따른 우선순위는 존재하지
                  않습니다.
                </p>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#2C2028] font-semibold">
                  친권자로 일방이 지정되더라도 부모와 자녀 사이의{" "}
                  <strong className="text-[#2C2028]">
                    친족관계가 소멸하는 것은 아닙니다
                  </strong>
                  . 상속권, 부양의무 등 법률상 권리·의무는 이혼 후에도
                  존속합니다.
                </p>
              </div>
            </div>

            {/* 판단기준 vs 면접교섭 2-column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" data-reveal>
              {/* LEFT: 주요 판단 기준 */}
              <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-8">
                <div className="flex items-center gap-3 mb-7">
                  <Users size={22} className="text-burgundy-500 flex-shrink-0" />
                  <h4 className="font-sans text-[17px] md:text-[22px] font-bold text-[#2C2028]">
                    주요 판단 기준 (복리 우선)
                  </h4>
                </div>
                <div className="space-y-5">
                  {[
                    {
                      title: "자녀의 의사 존중",
                      desc: "만 15세 이상의 자녀인 경우 본인의 의견이 매우 비중 있게 고려됩니다.",
                    },
                    {
                      title: "양육 환경의 연속성",
                      desc: "현재 자녀를 실제로 보호하고 있는 환경과 애착 관계를 중시합니다.",
                    },
                    {
                      title: "경제적 능력 및 보조자",
                      desc: "수입, 주거 환경뿐만 아니라 조부모 등 양육을 도와줄 보조자의 존재 여부도 확인합니다.",
                    },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-7 h-7 rounded-md bg-burgundy-500 text-white text-[13px] font-bold flex items-center justify-center mt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-1">
                            {item.title}
                          </p>
                          <p className="text-[14px] md:text-[16px] leading-[1.7] text-[#3A3238] font-semibold">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: 면접교섭권 상세 */}
              <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-8">
                <div className="flex items-center gap-3 mb-7">
                  <Heart
                    size={22}
                    className="text-burgundy-500 flex-shrink-0"
                  />
                  <h4 className="font-sans text-[17px] md:text-[22px] font-bold text-[#2C2028]">
                    면접교섭권의 상세 운영
                  </h4>
                </div>
                <p className="text-[17px] leading-[1.8] text-[#2C2028] font-semibold mb-6">
                  비양육 부모는 자녀와 직접 만나는 것 외에도 서신, 전화, 사진
                  교환 등 다양한 방식으로 소통할 권리가 있습니다.
                </p>

                {/* 표준 면접 일정 테이블 */}
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="px-5 py-3 bg-[#2C2028]">
                    <p className="text-[14px] font-bold text-white/80 tracking-wider">
                      서울가정법원 표준 면접 일정
                    </p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {[
                      {
                        label: "정기 면접",
                        value: "매월 2·4주 토~일 (1박 2일)",
                      },
                      {
                        label: "방학 기간",
                        value: "여름·겨울 각 7일 내외",
                      },
                      {
                        label: "명절/기념일",
                        value: "설·추석 격년 1박 2일",
                      },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-5 py-3.5"
                      >
                        <span className="text-[15px] text-[#2C2028] font-semibold">
                          {row.label}
                        </span>
                        <span className="text-[15px] font-bold text-[#2C2028]">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : 양육 실무 쟁점 (Left Title + Right Cards) ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
              {/* LEFT: Title */}
              <div data-reveal>
                <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-4">
                  놓치지 말아야 할
                  <br />
                  양육 실무 쟁점
                </h3>
                <p className="text-[16px] text-[#3A3238] font-semibold leading-[1.7] mb-6">
                  한 번 정해지면 바꾸기 어려운 권리이기에, 초기부터 법적
                  예외 상황과 대책을 숙지해야 합니다.
                </p>

                {/* 기억하세요 박스 */}
                <div className="bg-burgundy-50 rounded-xl p-5 border border-burgundy-100">
                  <p className="text-[14px] font-bold text-burgundy-600 mb-2 flex items-center gap-1.5">
                    <Info size={14} />꼭 기억하세요!
                  </p>
                  <p className="text-[16px] leading-[1.7] text-burgundy-700">
                    양육비는 성인이 될 때까지의 정기적인 의무입니다. 과거에
                    포기했더라도 사정변경에 따라 다시 청구할 수 있습니다.
                  </p>
                </div>
              </div>

              {/* RIGHT: 3 Cards */}
              <div className="space-y-5" data-reveal>
                {/* 면접교섭 */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="px-2.5 py-1 bg-burgundy-500 text-white text-[12px] font-bold rounded">
                      면접교섭
                    </span>
                    <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                      면접교섭의 제한과 재신청
                    </h4>
                  </div>
                  <p className="text-[14px] md:text-[16px] leading-[1.8] text-[#3A3238] font-semibold">
                    상대방에게 자녀 학대, 알코올 중독 등 명백한 해악이 있는
                    경우에만 면접이 제한됩니다. 반대로 각서를 작성하며
                    포기했더라도 부모가 자녀를 만나는 것은 절대적으로 제한할
                    수 없기에 언제든 재신청이 가능합니다. 또한 자녀의
                    분리불안이나 미취학 연령을 고려하여 1박 2일이 아닌 당일
                    면접교섭으로 조정되기도 합니다.
                  </p>
                </div>

                {/* 양육비 */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="px-2.5 py-1 bg-burgundy-500 text-white text-[12px] font-bold rounded">
                      양육비
                    </span>
                    <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                      양육비 산정과 추가 청구
                    </h4>
                  </div>
                  <p className="text-[14px] md:text-[16px] leading-[1.8] text-[#3A3238] font-semibold">
                    양육비는 자녀가 만 19세가 되기 전날까지 지급되어야 합니다.
                    양육비를 포기하거나 일시불로 수령한 경우에도 사정변경이
                    인정되면 추가 청구가 가능합니다. 협의 이혼 시 정해진
                    금액이 현실적으로 부족하거나 상대방의 소득이 급증했다면
                    양육비 증액 청구 소송이 가능합니다.
                  </p>
                </div>

                {/* 강제집행 */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="px-2.5 py-1 bg-[#2C2028] text-white text-[12px] font-bold rounded">
                      강제집행
                    </span>
                    <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                      미지급 시 대응 프로세스
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4">
                    <div className="bg-[#F8F4EE] rounded-lg p-4">
                      <p className="text-[13px] md:text-[15px] font-bold text-[#2C2028] mb-1">
                        직접지급명령
                      </p>
                      <p className="text-[13px] md:text-[14px] text-[#3A3238] font-semibold leading-[1.6]">
                        급여 소득자가 2회 이상 연체 시 직장에서 바로 원천징수
                        (가사소송법 제63조의2)
                      </p>
                    </div>
                    <div className="bg-[#F8F4EE] rounded-lg p-4">
                      <p className="text-[13px] md:text-[15px] font-bold text-[#2C2028] mb-1">
                        이행명령 및 감치
                      </p>
                      <p className="text-[13px] md:text-[14px] text-[#3A3238] font-semibold leading-[1.6]">
                        정당한 이유 없이 미지급 시 1,000만 원 이하 과태료 또는
                        최대 30일 감치 (가사소송법 제64조)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : 양육비 미지급 CTA 배너 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div
              data-reveal
              className="bg-burgundy-50 rounded-2xl p-8 md:p-12 text-center border border-burgundy-100"
            >
              <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028] mb-4 leading-tight">
                양육비 지급을 거부하고 있다면?
              </h3>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#2C2028] font-semibold mb-2 max-w-2xl mx-auto">
                상대방이 자산이 있음에도 양육비를 주지 않는다면 법원의{" "}
                <strong className="text-burgundy-500">담보제공명령</strong>과{" "}
                <strong className="text-burgundy-500">직접지급명령</strong>을
                통해 강력하게 집행할 수 있습니다.
              </p>
              <p className="text-[15px] text-[#3A3238] font-semibold mb-8">
                불이행 시 1,000만 원 이하의 과태료 처분까지 가능합니다.
              </p>
              <a
                href={`tel:${phone}`}
                aria-label={`양육비 긴급 상담 ${phone}`}
                className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
              >
                <Phone size={18} />
                양육비 미지급 긴급 상담
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 6 : QUOTE BAND ═══════════ */}
        <section
          className="relative py-20 md:py-24 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/images/office/banner-consultation.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-[#1A1A2E]/85" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div data-reveal>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mb-6" />
              <p className="text-[20px] md:text-[26px] lg:text-[30px] text-white leading-[1.7] font-semibold">
                &ldquo;아이의 미래를 지키는 전략,
                <br className="hidden md:block" />
                지금 상황을 말씀해 주세요.&rdquo;
              </p>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-6 mb-4" />
              <p className="text-[15px] text-[#C9A84C] tracking-wider">
                친권·양육권팀 박경내 팀장
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : TEAM LINK ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div data-reveal>
              <div className="bg-[#F8F4EE] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-3">
                    SPECIALIZED TEAM
                  </p>
                  <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028] mb-3 leading-tight">
                    친권·양육권팀
                  </h3>
                  <p className="text-[16px] md:text-[18px] text-[#3A3238] font-semibold leading-[1.8] mb-2">
                    양육권 지정, 면접교섭 설계, 양육비 확보까지 자녀문제 전
                    영역을 체계적으로 지원합니다.
                  </p>
                  <p className="text-[15px] text-burgundy-500 font-semibold">
                    박경내 팀장
                  </p>
                </div>
                <Link
                  href="/about/teams/custody"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 whitespace-nowrap"
                >
                  팀 소개 보기
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 8 : CTA ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div data-reveal>
              <h3 className="font-sans text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[#2C2028] mb-4 leading-tight">
                아이에게 가장 좋은 환경,
                <br />
                신세계로가 증명합니다
              </h3>
              <p className="text-[16px] md:text-[18px] text-[#3A3238] font-semibold leading-[1.8] mb-10 max-w-xl mx-auto">
                아이의 정서적 안정과 평화로운 일상을 되찾아 주는 것,
                <br className="hidden md:block" />
                우리는 수치화된 데이터와 진심 어린 변론으로 의뢰인의 사랑을
                법원에 전달합니다.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <a
                  href="https://pf.kakao.com/_ExcxoAu/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle size={18} />
                  카카오톡 실시간 문의
                </a>
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  온라인 비밀 예약 상담
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-[14px] text-[#333333]">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  24시간 접수
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  비밀 보장
                </span>
                <span className="flex items-center gap-1.5">
                  <Scale size={14} />
                  초기상담 무료
                </span>
              </div>
            </div>
          </div>
        </section>
      </PracticeRevealWrapper>

    </div>
  );
}
