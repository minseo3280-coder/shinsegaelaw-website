import Link from "next/link";
import {
  Handshake,
  FileText,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Users,
  Scale,
  Calendar,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";

export default function MutualDivorcePage() {
  return (
    <div className="">
      <SubPageHero
        titleKo="협의이혼"
        bannerImage="/images/office/banner-divorce.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/divorce" },
          { label: "협의이혼" },
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
                  MUTUAL CONSENT DIVORCE GUIDE
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6 max-w-[1400px]">
                협의이혼, 합의 조건이<br />
                결과를 좌우합니다
              </h2>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#2C2028] font-semibold mb-8 max-w-3xl">
                단순한 이혼 의사 확인을 넘어 재산분할, 양육권, 위자료 등 모든 조건이 명확하게
                합의되어야 합니다. 철저한 합의만이 미래의 분쟁을 예방합니다.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
              >
                협의이혼 서류 검토 신청
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : DIVORCE PROCESS 4단계 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                DIVORCE PROCESS
              </p>
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028]">
                협의이혼 진행 절차 4단계
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {[
                {
                  num: "1",
                  icon: <Handshake size={26} />,
                  title: "이혼 합의",
                  desc: "부부가 이혼 의사에 합의하고, 친권/양육권, 재산분할, 위자료 등에 대한 세부 조건을 조율합니다.",
                },
                {
                  num: "2",
                  icon: <Calendar size={26} />,
                  title: "숙려기간",
                  desc: "법원에 협의이혼 의사확인 신청서를 제출한 후, 자녀 유무에 따라 1개월 또는 3개월의 숙려기간을 거칩니다.",
                },
                {
                  num: "3",
                  icon: <FileText size={26} />,
                  title: "이혼신고",
                  desc: "법원으로부터 의사확인서 등본을 교부받은 날로부터 3개월 이내에 관할 구청에 이혼신고를 해야 합니다.",
                },
                {
                  num: "4",
                  icon: <CheckCircle2 size={26} />,
                  title: "서류 준비",
                  desc: "협의이혼 의사확인 신청서, 가족관계증명서, 혼인관계증명서 등 필수 서류를 구비해야 합니다.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  data-reveal
                  data-reveal-delay={i < 2 ? String(i) : undefined}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 group"
                >
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-3 md:mb-5 group-hover:bg-burgundy-500 group-hover:text-white transition-colors duration-500">
                    {card.icon}
                  </div>
                  <h3 className="font-sans text-[15px] md:text-[17px] font-bold text-[#2C2028] mb-2 md:mb-3">
                    {card.num}. {card.title}
                  </h3>
                  <p className="text-[13px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#3A3238] font-semibold">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3 : 절차 상세 (합의 → 숙려 → 신고) ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-start">
              {/* Left */}
              <div data-reveal>
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  STEP BY STEP
                </p>
                <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[40px] leading-[1.35] font-bold text-[#2C2028] mb-6">
                  협의이혼,<br />
                  절차를 정확히<br />
                  알아야 합니다.
                </h2>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#3A3238] font-semibold mb-8">
                  협의이혼의 첫 단계는 부부 쌍방의 이혼 합의입니다.
                  등록기준지 또는 주소지를 관할하는 가정법원에 협의이혼의사확인을 신청하며,
                  부부가 반드시 함께 법원에 출석해야 합니다.
                </p>
                <div className="space-y-3">
                  {[
                    "숙려기간: 미성년 자녀 있음 3개월 / 없음 1개월",
                    "숙려기간 후 부부 함께 법원 출석하여 최종 확인",
                    "의사확인서 등본 교부일로부터 3개월 이내 이혼신고",
                    "기한 경과 시 절차를 처음부터 다시 진행",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-burgundy-500 mt-0.5 flex-shrink-0" />
                      <span className="text-[16px] leading-relaxed text-[#2C2028] font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — 필요 서류 카드 */}
              <div data-reveal data-reveal-delay="1">
                <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-8">
                  <h3 className="font-sans text-[17px] md:text-[20px] font-bold text-[#2C2028] mb-6">
                    필요 서류 <span className="text-burgundy-500">체크리스트</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { doc: "협의이혼의사확인신청서", note: "부부 공동 작성, 법원 접수 창구 교부" },
                      { doc: "가족관계증명서 · 혼인관계증명서", note: "부부 각각 1통, 시·구청 또는 동사무소 발급" },
                      { doc: "이혼신고서 3통", note: "성년 증인 2명의 서명 또는 날인 필요" },
                      { doc: "주민등록등본 1통", note: "주소지 관할 법원 신청 시 제출" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 bg-white rounded-xl p-3 md:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                        <div className="w-8 h-8 rounded-full bg-burgundy-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[14px] font-bold text-white">{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-[13px] md:text-[14px] font-bold text-[#2C2028]">{item.doc}</p>
                          <p className="text-[13px] md:text-[14px] text-[#333333] mt-0.5">{item.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-[16px] text-[#333333] leading-relaxed">
                    * 부부 일방이 해외 체류 중인 경우 재외국민등록부등본, 교정시설 수감 중인 경우 재감증명서가 추가 필요합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : IMPORTANT DETAILS ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-start">
              {/* Left — Headline */}
              <div data-reveal>
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  IMPORTANT DETAILS
                </p>
                <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[40px] leading-[1.35] font-bold text-[#2C2028] mb-6">
                  성공적인 협의이혼을 위한<br />
                  핵심 점검 사항
                </h2>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#3A3238] font-semibold mb-8">
                  협의이혼은 단순한 이혼 의사의 합치가 아닙니다. 자녀 문제, 재산 문제 등 이혼 후의 삶에
                  직결되는 모든 부분을 명확히 정리해야 합니다.
                </p>
                {/* 가장이혼 경고 */}
                <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={18} className="text-burgundy-500" />
                    <h4 className="font-sans text-[16px] font-bold text-[#2C2028]">주의사항: 가장이혼(Fake Divorce)</h4>
                  </div>
                  <p className="text-[16px] leading-[1.8] text-[#3A3238] font-semibold">
                    채무 면탈 등의 목적으로 실질적인 이혼 의사 없이 형식적으로만 이혼하는 &lsquo;가장이혼&rsquo;의 경우에도 이혼신고가 이루어진 이상 법적으로 이혼은 유효하게 성립합니다. 추후 혼인관계 회복이 매우 어려우므로 신중해야 합니다.
                  </p>
                </div>
              </div>

              {/* Right — Info Cards */}
              <div data-reveal data-reveal-delay="1" className="space-y-5">
                {/* 양육비부담조서 */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={18} className="text-burgundy-500" />
                    <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028]">양육비부담조서의 법적 효력</h4>
                  </div>
                  <p className="text-[14px] md:text-[16px] leading-[1.8] text-[#3A3238] font-semibold">
                    협의이혼 시 미성년 자녀가 있는 경우 양육비 부담 조서를 작성해야 합니다.
                    이 조서는 확정판결과 동일한 효력을 가지며, 양육비 미지급 시 강제집행의 권원이 됩니다.
                  </p>
                </div>

                {/* 재산분할·위자료 소멸시효 */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-3">
                    <Scale size={18} className="text-burgundy-500" />
                    <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028]">재산분할 및 위자료 청구 소멸시효</h4>
                  </div>
                  <p className="text-[14px] md:text-[16px] leading-[1.8] text-[#3A3238] font-semibold mb-4">
                    협의이혼 시 재산분할이나 위자료에 대한 합의가 이루어지지 않았다면,
                    이혼 후에도 법원에 청구할 수 있습니다. 단, 청구 기한에 주의해야 합니다.
                  </p>
                  <div className="bg-[#F8F4EE] rounded-xl p-4 space-y-2.5">
                    <p className="text-[14px] md:text-[15px] text-[#2C2028] leading-[1.7]">
                      <span className="font-semibold">재산분할:</span>{" "}
                      <span className="font-bold">이혼한 날(이혼신고일)부터 2년 이내</span>
                    </p>
                    <div className="h-px bg-[#E8E0D8]" />
                    <p className="text-[14px] md:text-[15px] text-[#2C2028] leading-[1.7]">
                      <span className="font-semibold">위자료:</span>{" "}
                      <span className="font-bold">안 날로부터 3년 (불법행위일로부터 10년)</span>
                    </p>
                  </div>
                  <div className="mt-4 bg-burgundy-50 border border-burgundy-200 rounded-xl p-4">
                    <p className="text-[14px] md:text-[17px] leading-[1.8] text-[#2C2028] font-semibold">
                      <strong className="text-burgundy-600">주의:</strong> 협의이혼 시 위자료나 재산분할에 대한 합의를 이미 한 경우, 또는 &lsquo;모든 재산분할·위자료를 포기하겠다&rsquo;고 한 경우에는 기한 이내라도 청구가 불가능합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : QUOTE BAND ═══════════ */}
        <section className="relative py-20 md:py-24 overflow-hidden" data-reveal>
          <div className="absolute inset-0">
            <img
              src="/images/office/banner-about.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
            <p className="text-[18px] md:text-[22px] lg:text-[24px] leading-[1.7] text-white/90 italic">
              &ldquo;협의이혼은 절차의 간편함 이면에<br className="hidden md:block" />
              합의 조건의 불균형이라는 위험이 존재합니다.<br className="hidden md:block" />
              한 번 확정된 합의는 번복이 극히 어렵습니다.&rdquo;
            </p>
            <p className="mt-5 text-[16px] text-white/60 font-semibold">
              — 이혼소송총괄팀
            </p>
          </div>
        </section>

        {/* ═══════════ SECTION 6 : TEAM LINK ═══════════ */}
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
                className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-[16px] font-semibold text-burgundy-500 hover:bg-burgundy-500 hover:text-white transition-all duration-300 shadow-sm flex-shrink-0"
              >
                팀 소개 보기 <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : CTA ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center" data-reveal>
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028] mb-5">
                협의이혼, 전문가의<br />검토가 필요합니다
              </h2>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#3A3238] font-semibold mb-2">
                불리한 조건으로 합의서에 서명하기 전에,
              </p>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#3A3238] font-semibold">
                재산분할액과 양육비가 적정한지 신세계로법무법인의 전문가와 <strong className="text-[#2C2028]">정확하게 확인</strong>하세요.
              </p>
              <div className="mt-10">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-8 py-3.5 rounded-md text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  합의 조건 검토받기
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
