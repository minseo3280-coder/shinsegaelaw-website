import Link from "next/link";
import {
  FileText,
  Clock,
  Users,
  Shield,
  CheckCircle2,
  ArrowRight,
  Scale,
  Handshake,
  Heart,
  AlertTriangle,
  ChevronRight,
  Gavel,
  Home,
  BookOpen,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function DivorcePracticePage() {
  const _phone = firmData.offices?.[0]?.phone || "02-594-2800";

  return (
    <div className="">
      <SubPageHero
        titleKo="이혼소송"
        bannerImage="/images/office/banner-divorce.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/divorce" },
          { label: "이혼소송" },
        ]}
      />

      <PracticeTabs />

      <PracticeRevealWrapper>
        {/* ═══════════ SECTION 1 : HERO HEADLINE ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Text */}
              <div data-reveal>
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-burgundy-500 mb-4">
                  DIVORCE PREPARATION GUIDE
                </p>
                <div className="w-12 h-[2px] bg-burgundy-500 mb-8" />
                <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6">
                  이혼, 어떻게<br />
                  준비해야 할까요?
                </h2>
                <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#2C2028] font-semibold mb-8">
                  갑작스러운 이혼소장, 또는 오랜 고민 끝에 내린 결심.<br className="hidden md:block" />
                  어떤 상황이든 체계적인 준비가 결과를 좌우합니다.<br className="hidden md:block" />
                  52년간 가족법만을 다뤄온 법무법인 신세계로가 첫 단계부터 함께합니다.
                </p>
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  가사 전문 변호사 상담 신청
                  <ArrowRight size={16} />
                </Link>
              </div>
              {/* Right — Visual Card */}
              <div data-reveal data-reveal-delay="1" className="relative">
                <div className="bg-[#F8F4EE] rounded-2xl p-5 md:p-10">
                  <div className="space-y-5">
                    {[
                      { icon: <FileText size={20} />, label: "답변서 준비", sub: "소장 수령 후 30일 이내" },
                      { icon: <Scale size={20} />, label: "재산분할 검토", sub: "기여도·분할비율 분석" },
                      { icon: <Users size={20} />, label: "자녀 양육권", sub: "양육비·면접교섭 설계" },
                      { icon: <Shield size={20} />, label: "증거 확보 전략", sub: "적법한 방법의 증거 수집" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <div className="w-11 h-11 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-bold text-[16px] text-[#2C2028]">{item.label}</p>
                          <p className="text-[16px] text-[#333333]">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Stat badge */}
                  <div className="mt-6 pt-6 border-t border-[#E8E0D8] flex items-center gap-3">
                    <div className="text-[36px] font-bold text-burgundy-500 leading-none">52<span className="text-[20px]">년</span></div>
                    <div className="text-[16px] text-[#333333] leading-snug">
                      가족법 전문<br />법조 전통
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : CRITICAL 30 DAYS ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            {/* Header */}
            <div className="text-center mb-14 md:mb-18" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                CRITICAL 30 DAYS
              </p>
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028]">
                이혼소장을 받으셨나요?<br />
                <span className="text-burgundy-500">30일의 골든타임</span>을 놓치지 마세요.
              </h2>
              <p className="mt-5 text-[16px] md:text-[18px] text-[#3A3238] font-semibold leading-relaxed">
                소장을 수령하면 30일 이내에 답변서를 제출해야 합니다. 이 단계에서의 대응이 이후 소송의 방향을 결정합니다.
              </p>
            </div>

            {/* 4 Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {[
                {
                  num: "01",
                  icon: <FileText size={28} />,
                  title: "답변서 준비",
                  desc: "소장에 대한 본인의 기본 입장을 기재합니다. 전문가 검토 없이 작성하면 불리하게 작용할 수 있습니다.",
                },
                {
                  num: "02",
                  icon: <Clock size={28} />,
                  title: "전략 수립",
                  desc: "재판상 이혼사유 해당 여부, 반소 제기, 재산분할·위자료 대응 전략을 사전에 수립합니다.",
                },
                {
                  num: "03",
                  icon: <Users size={28} />,
                  title: "자녀 보호",
                  desc: "양육권·양육비 문제를 사전에 정리하고, 자녀에게 미치는 심리적 충격을 최소화합니다.",
                },
                {
                  num: "04",
                  icon: <Shield size={28} />,
                  title: "증거 확보",
                  desc: "부정행위, 재산 내역 등 핵심 증거를 조기에 확보합니다. 증거가 많을수록 유리합니다.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  data-reveal
                  data-reveal-delay={i < 2 ? String(i) : undefined}
                  className="flex flex-col items-center text-center bg-[#F8F4EE] rounded-xl p-4 md:p-7 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-3 md:mb-4">
                    {card.icon}
                  </div>
                  <h4 className="text-[15px] md:text-[17px] font-bold text-[#2C2028] mb-2 md:mb-3">
                    {card.title}
                  </h4>
                  <p className="text-[13px] md:text-[15px] leading-[1.6] text-[#3A3238]">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Expert CTA */}
            <div data-reveal className="mt-12 text-center">
              <p className="text-[16px] text-[#3A3238] font-semibold mb-2">전문가의 검토 없이 작성된 답변서는 소송에서 불리하게 작용할 수 있습니다.</p>
              <p className="text-[16px] font-semibold text-burgundy-500">
                법무법인 신세계로는 소송 전 과정에서 의뢰인 편에 서서 함께합니다.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3 : PREPARATION CHECKLIST ═══════════ */}
        <section className="bg-[#F3EDE4] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-6" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                PREPARATION CHECKLIST
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left — Emotional Copy */}
              <div data-reveal>
                <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[40px] leading-[1.35] font-bold text-[#2C2028] mb-6">
                  홀로 감당하기 힘든 짐,<br />
                  전문가와 함께<br />
                  나누세요.
                </h2>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#3A3238] font-semibold mb-8">
                  결혼보다 이혼이 더 어렵다는 말이 있습니다.<br />
                  이혼을 결심했다면 다음 사항들을 반드시 점검해야 합니다.
                </p>
                {/* Stat */}
                <div className="inline-flex items-end gap-3 bg-white rounded-2xl px-6 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <span className="text-[48px] md:text-[56px] font-bold text-burgundy-500 leading-none">1,053</span>
                  <div className="pb-1">
                    <span className="text-[18px] font-bold text-[#2C2028]">건+</span>
                    <p className="text-[16px] text-[#333333]">누적 승소사례</p>
                  </div>
                </div>
              </div>

              {/* Right — Checklist Card */}
              <div data-reveal data-reveal-delay="1">
                <div className="bg-white rounded-2xl p-4 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <h3 className="font-sans text-[17px] md:text-[22px] font-bold text-[#2C2028] mb-7">
                    이혼 결심 전 필수 점검 <span className="text-burgundy-500">4단계</span>
                  </h3>
                  <div className="space-y-5">
                    {[
                      {
                        step: "01",
                        title: "경제적 자립 계획",
                        desc: "이혼 후 재산이 분할되므로 경제적 환경이 크게 달라집니다. 특히 전업주부의 경우 구체적인 자립 계획이 필수입니다.",
                      },
                      {
                        step: "02",
                        title: "재산분할·위자료 검토",
                        desc: "현재 재산의 절반이라는 막연한 기대는 위험합니다. 분할 대상, 기여도, 위자료 산정까지 전문가 분석이 필요합니다.",
                      },
                      {
                        step: "03",
                        title: "자녀에 대한 배려",
                        desc: "부모의 이혼이 자녀 때문이 아니라는 점, 사랑에 변함이 없다는 점을 충분히 전달해야 합니다.",
                      },
                      {
                        step: "04",
                        title: "협의이혼의 가능성",
                        desc: "가장 이상적인 이혼은 협의이혼입니다. 원만한 합의가 이루어지면 시간과 비용을 크게 절약할 수 있습니다.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="w-9 h-9 rounded-full bg-burgundy-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[14px] font-bold text-white">{item.step}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-sans text-[16px] font-bold text-[#2C2028] mb-1.5">{item.title}</h4>
                          <p className="text-[16px] leading-[1.8] text-[#3A3238] font-semibold">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : TYPES OF DIVORCE ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            {/* Header */}
            <div className="text-center mb-14 md:mb-18" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                TYPES OF DIVORCE
              </p>
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028]">
                나에게 맞는<br />
                이혼 절차는 무엇일까요?
              </h2>
              <p className="mt-5 text-[16px] md:text-[18px] text-[#3A3238] font-semibold max-w-3xl mx-auto leading-relaxed">
                이혼은 크게 협의이혼과 재판상 이혼으로 나뉩니다. 우리 민법상 자동이혼 제도는 존재하지 않습니다.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* 재판상 이혼 */}
              <div data-reveal className="bg-[#F8F4EE] rounded-2xl p-4 md:p-8 flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy-500 flex items-center justify-center text-white mb-5">
                  <Gavel size={22} />
                </div>
                <h3 className="font-sans text-[16px] md:text-[20px] font-bold text-[#2C2028] mb-2">재판상 이혼</h3>
                <p className="text-[16px] text-[#333333] mb-5">협의가 불가능한 경우 법원에 이혼을 청구합니다</p>
                <div className="space-y-3 mb-5 flex-1">
                  <p className="text-[15px] font-semibold text-[#2C2028] mb-2">민법 제840조 이혼사유</p>
                  {[
                    "배우자의 부정행위",
                    "악의의 유기",
                    "배우자 또는 직계존속의 심한 부당한 대우",
                    "3년 이상의 생사불명",
                    "기타 혼인을 유지하기 불가능한 중대한 사유",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-burgundy-500 mt-0.5 flex-shrink-0" />
                      <span className="text-[16px] leading-relaxed text-[#2C2028] font-semibold">{item}</span>
                    </div>
                  ))}
                  <div className="mt-4 bg-white rounded-lg p-3.5">
                    <p className="text-[16px] text-[#3A3238] font-semibold leading-relaxed">
                      <span className="font-semibold text-[#2C2028]">조정이혼</span> — 재판 과정에서 법원의 조정을 통해 합의에 이르면, 판결 없이 신속하게 이혼이 확정됩니다.
                    </p>
                  </div>
                </div>
                <Link
                  href="/practice/divorce/litigation"
                  className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-burgundy-500 hover:text-burgundy-600 transition-colors"
                >
                  재판이혼 상세보기 <ChevronRight size={14} />
                </Link>
              </div>

              {/* 협의이혼 */}
              <div data-reveal data-reveal-delay="1" className="bg-[#F8F4EE] rounded-2xl p-4 md:p-8 flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#C9A84C] flex items-center justify-center text-white mb-5">
                  <Handshake size={22} />
                </div>
                <h3 className="font-sans text-[16px] md:text-[20px] font-bold text-[#2C2028] mb-2">협의이혼</h3>
                <p className="text-[16px] text-[#333333] mb-5">쌍방 합의 시 가장 이상적인 이혼 절차입니다</p>
                <div className="bg-white rounded-xl p-5 mb-6 flex-1">
                  <p className="text-[15px] font-semibold text-[#2C2028] mb-3">법정 숙려기간</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                      <span className="text-[16px] text-[#2C2028] font-semibold">미성년 자녀 있음</span>
                      <span className="text-[16px] font-bold text-burgundy-500">3개월</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5">
                      <span className="text-[16px] text-[#2C2028] font-semibold">미성년 자녀 없음</span>
                      <span className="text-[16px] font-bold text-burgundy-500">1개월</span>
                    </div>
                  </div>
                  <p className="mt-4 text-[16px] text-[#333333] leading-relaxed">
                    위자료, 재산분할, 양육권 등에 대해 쌍방 합의가 전제됩니다.
                  </p>
                </div>
                <Link
                  href="/practice/divorce/mutual"
                  className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-burgundy-500 hover:text-burgundy-600 transition-colors"
                >
                  협의이혼 상세보기 <ChevronRight size={14} />
                </Link>
              </div>

              {/* 사실혼 파기 */}
              <div data-reveal data-reveal-delay="2" className="bg-[#F8F4EE] rounded-2xl p-4 md:p-8 flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#4A3F45] flex items-center justify-center text-white mb-5">
                  <Heart size={22} />
                </div>
                <h3 className="font-sans text-[16px] md:text-[20px] font-bold text-[#2C2028] mb-2">사실혼 파기</h3>
                <p className="text-[16px] text-[#333333] mb-5">혼인신고 없이 부부로 생활하는 관계의 해소</p>
                <div className="space-y-4 mb-6 flex-1">
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-[14px] font-semibold text-burgundy-500 mb-1">법적 보호</p>
                    <p className="text-[16px] leading-relaxed text-[#2C2028] font-semibold">
                      사실혼도 법적 보호를 받으며, 관계 해소 시 재산분할·위자료 청구가 가능합니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-[14px] font-semibold text-[#C9A84C] mb-1">상속 제한</p>
                    <p className="text-[16px] leading-relaxed text-[#2C2028] font-semibold">
                      사실혼 배우자는 법률상 배우자와 달리 상속권이 인정되지 않습니다.
                    </p>
                  </div>
                </div>
                <Link
                  href="/practice/divorce/family-relations"
                  className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-burgundy-500 hover:text-burgundy-600 transition-colors"
                >
                  사실혼 상세보기 <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : 재판상 이혼 상세 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left */}
              <div data-reveal>
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  CONTESTED DIVORCE
                </p>
                <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[40px] leading-[1.35] font-bold text-[#2C2028] mb-6">
                  재판상 이혼,<br />
                  증거가 결과를<br />
                  결정합니다.
                </h2>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#3A3238] font-semibold mb-8">
                  협의이혼이 불가능한 경우, 재판상 이혼을 준비해야 합니다.
                  재판상 이혼이 인정되려면 민법 제840조에서 정한 이혼사유가 존재해야 하며,
                  이를 뒷받침할 증거가 필수입니다.
                </p>
                <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] max-w-sm">
                  <AlertTriangle size={20} className="text-[#C9A84C] flex-shrink-0" />
                  <p className="text-[16px] text-[#2C2028] font-semibold leading-relaxed">
                    증거가 많을수록 유리한 결과를 이끌어낼 수 있습니다.
                  </p>
                </div>
              </div>

              {/* Right — Process Steps */}
              <div data-reveal data-reveal-delay="1" className="space-y-4">
                {[
                  {
                    icon: <BookOpen size={20} />,
                    title: "이혼사유 확인",
                    desc: "부정행위, 악의의 유기, 심한 부당한 대우, 3년 이상 생사불명 등 민법상 이혼사유 해당 여부를 검토합니다.",
                  },
                  {
                    icon: <Shield size={20} />,
                    title: "증거 수집",
                    desc: "카카오톡, 문자, CCTV, 신용카드 내역 등 핵심 증거를 적법한 방법으로 확보합니다.",
                  },
                  {
                    icon: <Scale size={20} />,
                    title: "소장·답변서 작성",
                    desc: "전문 변호사가 이혼사유와 증거를 바탕으로 법적 서류를 작성하고 제출합니다.",
                  },
                  {
                    icon: <Gavel size={20} />,
                    title: "조정 및 재판",
                    desc: "조정절차에서 합의를 시도하고, 합의가 불가능하면 판결로 이혼이 확정됩니다.",
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-5 bg-white rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-burgundy-50 flex items-center justify-center text-burgundy-500 flex-shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-sans text-[16px] font-bold text-[#2C2028] mb-1">{step.title}</h4>
                      <p className="text-[16px] leading-[1.8] text-[#3A3238] font-semibold">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 6 : QUOTE BAND (with image) ═══════════ */}
        <section className="relative py-20 md:py-24 overflow-hidden" data-reveal>
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/office/banner-consultation.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
            <p className="text-[18px] md:text-[22px] lg:text-[24px] leading-[1.7] text-white/90 italic">
              &ldquo;이혼은 끝이 아닌 새로운 시작입니다.<br className="hidden md:block" />
              52년간 가족법만을 다뤄온 전문가들이<br className="hidden md:block" />
              의뢰인의 권리를 끝까지 지켜드리겠습니다.&rdquo;
            </p>
            <p className="mt-5 text-[15px] text-white/60 font-semibold">
              — 이혼소송총괄팀
            </p>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : RELATED AREAS ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                RELATED PRACTICE AREAS
              </p>
              <h2 className="font-sans text-[28px] md:text-[34px] leading-[1.35] font-bold text-[#2C2028]">
                함께 확인하면 좋은<br />이혼소송 세부 분야
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: <Scale size={22} />, title: "위자료", href: "/practice/divorce/alimony", color: "bg-burgundy-50 text-burgundy-500" },
                { icon: <Home size={22} />, title: "재산분할", href: "/practice/divorce/property", color: "bg-amber-50 text-[#C9A84C]" },
                { icon: <Users size={22} />, title: "자녀문제(양육권)", href: "/practice/divorce/custody", color: "bg-blue-50 text-blue-500" },
                { icon: <Shield size={22} />, title: "부정행위(외도)", href: "/practice/divorce/infidelity", color: "bg-rose-50 text-rose-500" },
              ].map((area, i) => (
                <Link
                  key={i}
                  href={area.href}
                  data-reveal
                  className="group bg-[#F8F4EE] rounded-2xl p-4 md:p-7 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
                >
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full ${area.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {area.icon}
                  </div>
                  <h3 className="font-sans text-[14px] md:text-[18px] font-bold text-[#2C2028] mb-1">{area.title}</h3>
                  <span className="inline-flex items-center gap-1 text-[16px] text-[#333333] group-hover:text-burgundy-500 transition-colors">
                    자세히 보기 <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 8 : TEAM LINK ═══════════ */}
        <section className="bg-[#F8F4EE] py-14 md:py-18" data-reveal>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-burgundy-500 flex items-center justify-center text-white flex-shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-[16px] text-[#333333]">이혼소송총괄팀 · 김미루 팀장</p>
                  <h3 className="font-sans text-[18px] md:text-[20px] font-bold text-[#2C2028]">이혼소송 전 과정을 총괄하는 전문팀</h3>
                </div>
              </div>
              <Link
                href="/about/teams/divorce-general"
                className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-[15px] font-semibold text-burgundy-500 hover:bg-burgundy-500 hover:text-white transition-all duration-300 shadow-sm flex-shrink-0"
              >
                팀 소개 보기 <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 9 : CONSULTATION CTA ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center" data-reveal>
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028] mb-5">
                당신의 존엄한 선택,<br />끝까지 함께하겠습니다.
              </h2>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#3A3238] font-semibold">
                새로운 삶을 시작할 때, 가장 먼저 신뢰할 수 있는 이름.<br className="hidden md:block" />
                52년간 가족법만을 다뤄온 <strong className="text-[#2C2028]">법무법인 신세계로</strong>가 함께합니다.
              </p>

              <div className="mt-10">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 border-2 border-burgundy-500 text-burgundy-500 px-8 py-3.5 rounded-md text-[16px] font-semibold hover:bg-burgundy-500 hover:text-white transition-all duration-300"
                >
                  무료 상담 신청하기
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PracticeRevealWrapper>

    </div>
  );
}
