import Link from "next/link";
import {
  Users,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  UserCheck,
  UserX,
  Fingerprint,
  Gavel,
  Clock,
  AlertTriangle,
  FileText,
  Scale,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function FamilyRelationsPage() {
  const phone = firmData.main_phone || "1555-5961";

  return (
    <div className="">
      <SubPageHero
        titleKo="가족관계(친자)"
        bannerImage="/images/office/banner-divorce.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/divorce" },
          { label: "가족관계(친자)" },
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
                  FAMILY RELATIONSHIP &amp; PATERNITY GUIDE
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6 max-w-5xl">
                가족관계의 진실을
                <br />
                바로잡는 일
              </h2>
              <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#333333] mb-3 max-w-2xl">
                친자관계 소송은 단순한 법적 등록을 넘어,{" "}
                <strong className="text-[#2C2028]">
                  진실된 혈연관계를 확인하고 법률상의 권리를 회복하는 과정
                </strong>
                입니다. 신세계로는 과학적인 증거와 정교한 법리로 가족의
                정체성을 바로 세웁니다.
              </p>
              <div className="mt-8">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  친자관계 소송 비공개 상담
                  <Fingerprint size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : 4가지 대응 카드 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                LEGAL SOLUTIONS
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight">
                혈연관계 회복을 위한 4가지 대응
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {[
                {
                  icon: <UserCheck size={24} />,
                  title: "친생자관계 확인",
                  desc: "호적상 부모와 실제 친부모가 다른 경우, 재판을 통해 진정한 혈연관계를 법적으로 확인받습니다.",
                },
                {
                  icon: <UserX size={24} />,
                  title: "친생부인의 소",
                  desc: "혼인 중 출생자로 추정되나 혈연관계가 없는 경우, 그 추정을 부정하여 관계를 단절합니다.",
                },
                {
                  icon: <Gavel size={24} />,
                  title: "인지 청구",
                  desc: "혼외자가 생부 또는 생모를 상대로 법적인 자녀로 인정해줄 것을 강제로 요구하는 절차입니다.",
                },
                {
                  icon: <Fingerprint size={24} />,
                  title: "유전자 감정",
                  desc: "소송의 가장 핵심적인 증거로, 과학적 DNA 분석을 통해 혈연관계 유무를 명확히 입증합니다.",
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
                  <p className="text-[13px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#444444]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3 : 친생자관계존부확인의 소 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="mb-14" data-reveal>
              <h3 className="font-sans text-[28px] md:text-[34px] font-bold text-[#2C2028] mb-6 leading-tight">
                친생자관계존부확인의 소
              </h3>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] max-w-5xl mb-3">
                특정인 사이의 친생자관계가 존재하는지 또는 존재하지 않는지를
                법원이 확인해 줄 것을 청구하는 소송입니다. 호적상의 기재와
                실제 친자관계가 불일치할 때 이를 바로잡기 위한 가장
                광범위한 수단입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8" data-reveal>
              {/* 소송 당사자 */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users size={20} className="text-burgundy-500" />
                  <h4 className="font-sans text-[20px] md:text-[22px] font-bold text-[#2C2028]">
                    소송 당사자 (원고 및 피고)
                  </h4>
                </div>
                <div className="space-y-4">
                  <div className="border-l-[3px] border-burgundy-500 pl-5 py-3 bg-gray-50 rounded-r-lg">
                    <p className="text-[15px] font-bold text-burgundy-500 mb-1">
                      원고
                    </p>
                    <p className="text-[14px] md:text-[16px] leading-[1.7] text-[#333333]">
                      자녀, 그 직계비속, 어머니, 아버지(남편), 민법
                      제777조에 의한 친족, 이해관계인 또는 유언집행자,
                      미성년후견인
                    </p>
                  </div>
                  <div className="border-l-[3px] border-gray-300 pl-5 py-3 bg-gray-50 rounded-r-lg">
                    <p className="text-[15px] font-bold text-[#2C2028] mb-1">
                      피고
                    </p>
                    <p className="text-[14px] md:text-[16px] leading-[1.7] text-[#333333]">
                      상대방인 자녀 또는 부모. 당사자 일방이 사망한 경우
                      검사를 상대로 제기합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 제척기간 */}
              <div className="bg-[#1A1A2E] rounded-2xl p-4 md:p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={20} className="text-[#C9A84C]" />
                  <h4 className="font-sans text-[20px] md:text-[22px] font-bold text-white">
                    제척기간 (소송 기한)
                  </h4>
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                      <p className="text-[14px] md:text-[16px] font-bold text-white">
                        원칙적 무기한
                      </p>
                    </div>
                    <p className="text-[14px] md:text-[16px] leading-[1.7] text-white/70 pl-4">
                      생존 중인 당사자들 간의 소송은 기간의 제한 없이
                      언제든 제기할 수 있습니다.
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle
                        size={16}
                        className="text-burgundy-400"
                      />
                      <p className="text-[14px] md:text-[16px] font-bold text-white">
                        사망 후의 예외
                      </p>
                    </div>
                    <p className="text-[14px] md:text-[16px] leading-[1.7] text-white/70 pl-4">
                      당사자 일방이 사망한 경우에는{" "}
                      <span className="text-[#C9A84C] font-semibold">
                        그 사망을 안 날로부터 2년 내
                      </span>
                      에 검사를 상대로 소를 제기해야 합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 구체적 인정 사례 */}
            <div className="mt-10" data-reveal>
              <h4 className="font-sans text-[18px] font-bold text-[#2C2028] mb-5">
                구체적으로 인정되는 사례
              </h4>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  "남편이 혼외의 자를 본처와 사이에 친생자인 것처럼 출생신고를 한 경우",
                  "친생추정을 받지 않는 자 — 혼인 성립의 날로부터 200일 전에 출생한 자녀의 경우",
                  "형식상 친생추정을 받으나, 포태기간 중 부부가 사실상 동거하지 않은 경우(해외 거주, 수감 중 등)",
                  "인지에 의한 친자관계에 있어서 인지의 유효를 주장하는 경우",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-gray-50 rounded-lg p-4"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-burgundy-500 mt-1 flex-shrink-0"
                    />
                    <p className="text-[16px] leading-[1.7] text-[#333333]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : 친생부인의 소 + 부를 정하는 소 / 인지 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* LEFT: 친생부인의 소 */}
              <div data-reveal>
                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  친생부인의 소
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-6">
                  혼인 중 출생한 자녀는 법적으로 &lsquo;남편의 자녀&rsquo;로
                  강력하게 추정됩니다(친생추정). 이 법적 추정을 깨기
                  위해서는 반드시 재판을 통해 &lsquo;친생부인의 소&rsquo;를
                  제기하여 판결을 받아야 합니다.
                </p>

                {/* 친생추정의 범위 */}
                <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle
                      size={16}
                      className="text-burgundy-500"
                    />
                    <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                      친생추정의 범위
                    </p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-[14px] md:text-[16px] leading-[1.7] text-[#333333]">
                      <span className="text-[#C9A84C] mt-0.5">①</span>
                      혼인이 성립한 날로부터 200일 후에 출생한 자녀
                    </li>
                    <li className="flex items-start gap-2 text-[14px] md:text-[16px] leading-[1.7] text-[#333333]">
                      <span className="text-[#C9A84C] mt-0.5">②</span>
                      혼인관계가 종료된 날로부터 300일 이내에 출생한 자녀
                    </li>
                  </ul>
                </div>

                {/* 소송의 요건 및 기한 */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-[15px] font-bold text-burgundy-500 w-16 flex-shrink-0">
                      청구권자
                    </span>
                    <span className="text-[14px] md:text-[16px] leading-[1.7] text-[#333333]">
                      남편 또는 아내 (부부 양쪽 모두 가능)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[15px] font-bold text-burgundy-500 w-16 flex-shrink-0">
                      상대방
                    </span>
                    <span className="text-[14px] md:text-[16px] leading-[1.7] text-[#333333]">
                      자녀 또는 배우자
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[15px] font-bold text-burgundy-500 w-16 flex-shrink-0">
                      제소기한
                    </span>
                    <span className="text-[14px] md:text-[16px] leading-[1.7] text-[#333333] font-semibold">
                      친생부인의 사유가 있음을 안 날로부터 2년 이내
                    </span>
                  </div>
                </div>

                {/* 친생부인의 사유 */}
                <div className="mt-6 bg-burgundy-50 rounded-xl p-4 md:p-5 border border-burgundy-100">
                  <p className="text-[15px] font-bold text-[#2C2028] mb-3">
                    친생부인의 사유
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-[14px] md:text-[16px] leading-[1.7] text-[#333333]">
                      <CheckCircle2
                        size={14}
                        className="text-burgundy-500 mt-1 flex-shrink-0"
                      />
                      부자관계가 존재하지 않는다는 과학적인 증명이 있는
                      경우 (DNA 감정 등)
                    </li>
                    <li className="flex items-start gap-2 text-[14px] md:text-[16px] leading-[1.7] text-[#333333]">
                      <CheckCircle2
                        size={14}
                        className="text-burgundy-500 mt-1 flex-shrink-0"
                      />
                      포태기간 중에 자의 모와 그 부 사이에 성교섭이
                      존재하지 않았다는 증명이 있는 경우
                    </li>
                  </ul>
                </div>

                {/* 친자관계부존재확인의 소와의 관계 */}
                <div className="mt-6 p-4 md:p-5 bg-white rounded-xl border border-gray-200">
                  <p className="text-[15px] font-bold text-[#2C2028] mb-2">
                    제척기간(2년) 경과 후 구제 방법
                  </p>
                  <p className="text-[14px] md:text-[16px] leading-[1.7] text-[#333333]">
                    판례는 포태기간 중 남편이 해외 근무를 하는 등 자녀를
                    포태할 수 없는 명백한 사정이 있었던 경우에는,
                    친자관계부존재확인의 소를 통해 다툴 수 있다고 판시하고
                    있습니다.
                  </p>
                </div>
              </div>

              {/* RIGHT: 부를 정하는 소 + 인지 */}
              <div data-reveal>
                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  부를 정하는 소
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-5">
                  재혼 전후의 기간 중복으로 인해 자녀가 전 남편의
                  자녀로도, 현 남편의 자녀로도 동시에 추정되는 경우가
                  발생할 수 있습니다. 이때 법원에 &lsquo;부를 정해줄
                  것&rsquo;을 신청하여 유전자 검사 등을 토대로 혈연상의
                  부를 확정합니다.
                </p>
                <p className="text-[14px] md:text-[16px] leading-[1.7] text-[#444444] mb-8">
                  제소기간의 제한이 없습니다.
                </p>

                <div className="h-px bg-gray-200 my-8" />

                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  인지 (認知)
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-6">
                  혼인 외의 출생자에 대하여 생부 또는 생모가 자기의
                  자녀로 인정하는 행위입니다.
                </p>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                  <div className="bg-white rounded-xl p-3 md:p-5 border border-gray-200 text-center">
                    <p className="text-[15px] font-bold text-burgundy-500 mb-2">
                      임의인지
                    </p>
                    <p className="text-[14px] leading-[1.6] text-[#444444]">
                      부모의 자발적 신고로 성립
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3 md:p-5 border border-gray-200 text-center">
                    <p className="text-[15px] font-bold text-burgundy-500 mb-2">
                      강제인지
                    </p>
                    <p className="text-[14px] leading-[1.6] text-[#444444]">
                      부모가 거부 시 소송을 통해 인정
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "인지의 효력은 출생 시로 소급 — 상속권·부양청구권 인정",
                    "생부 사망 시에도 사망을 안 날로부터 2년 내 검사 상대로 소 제기 가능",
                    "유전자(DNA) 감정의 정확도 99.9% 이상 — 핵심 증거",
                    "상대방 감정 불응 시 친자관계 긍정의 간접 증거로 참작",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        size={15}
                        className="text-burgundy-500 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-[14px] md:text-[16px] leading-[1.7] text-[#333333]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : 핵심 체크포인트 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <h3 className="font-sans text-[28px] md:text-[34px] font-bold text-[#2C2028] leading-tight mb-4">
                친자소송 핵심 체크포인트
              </h3>
              <p className="text-[16px] text-[#444444] max-w-xl mx-auto leading-relaxed">
                신세계로법무법인이 승소를 위해 철저히 준비하는 핵심
                요소입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" data-reveal>
              {[
                {
                  num: "01",
                  title: "유전자 검사의 정확성",
                  desc: "법원이 지정한 신뢰할 수 있는 감정기관을 통해 99.9% 이상의 확률로 혈연관계를 입증하는 과학적 증거를 확보합니다.",
                  icon: <Fingerprint size={20} />,
                },
                {
                  num: "02",
                  title: "제척기간의 엄격 준수",
                  desc: "친생부인의 소 등 기한이 정해진 소송은 하루라도 늦으면 청구 자체가 불가능하므로, 안 날로부터의 기산점을 명확히 소명합니다.",
                  icon: <Clock size={20} />,
                },
                {
                  num: "03",
                  title: "가족관계부 정정",
                  desc: "승소 판결 후 가족관계등록부를 정정하여 상속권, 부양의무 등 모든 법적 권리를 완벽하게 회복시키도록 후속 조치를 지원합니다.",
                  icon: <FileText size={20} />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center bg-white rounded-xl p-4 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-3 md:mb-4">
                    {item.icon}
                  </div>
                  <span className="text-[22px] md:text-[42px] font-bold text-burgundy-500/20 leading-none mb-1 md:mb-2">
                    {item.num}
                  </span>
                  <h4 className="text-[15px] md:text-[18px] font-bold text-[#2C2028] mb-2 md:mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[13px] md:text-[15px] leading-[1.6] text-[#3A3238]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 가족법 전문 변호사 조력 배너 */}
            <div
              data-reveal
              className="mt-10 bg-burgundy-50 rounded-2xl p-5 md:p-9 flex items-start gap-5 border border-burgundy-100"
            >
              <div className="w-12 h-12 rounded-full bg-burgundy-100 flex items-center justify-center flex-shrink-0">
                <Scale size={22} className="text-burgundy-600" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#2C2028] mb-2">
                  가족법 전문 변호사의 조력이 필요한 이유
                </p>
                <p className="text-[17px] leading-[1.8] text-[#333333]">
                  친자 소송은 감정적 대립이 극심하고 입증 과정이 매우
                  까다롭습니다. 신세계로는{" "}
                  <strong className="text-burgundy-500">
                    52년의 법조 전통과 가족관계 전담팀
                  </strong>
                  을 통해 복잡한 가사 사건을 빠르고 정확하게 해결하며,
                  의뢰인의 프라이버시를 최우선으로 보호합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 6 : QUOTE BAND ═══════════ */}
        <section
          className="relative py-20 md:py-24 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/images/office/banner-about.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-[#1A1A2E]/85" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div data-reveal>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mb-6" />
              <p className="text-[20px] md:text-[26px] lg:text-[30px] text-white leading-[1.7] font-semibold">
                &ldquo;가족관계의 진실은
                <br className="hidden md:block" />
                감정이 아닌 증거로 밝혀야 합니다.
                <br className="hidden md:block" />
                법적 정체성은 모든 권리의 출발점입니다.&rdquo;
              </p>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-6 mb-4" />
              <p className="text-[15px] text-[#C9A84C] tracking-wider">
                가족관계(친자)팀 조윤용 팀장
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : TEAM LINK ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div data-reveal>
              <div className="bg-[#F8F4EE] rounded-2xl p-5 md:p-12 flex flex-col md:flex-row items-center gap-5 md:gap-8">
                <div className="flex-1">
                  <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-3">
                    SPECIALIZED TEAM
                  </p>
                  <h3 className="font-sans text-[20px] md:text-[30px] font-bold text-[#2C2028] mb-3 leading-tight">
                    가족관계(친자)팀
                  </h3>
                  <p className="text-[16px] md:text-[18px] text-[#444444] leading-[1.8] mb-2">
                    친자관계 확인, 친생부인, 인지 청구, 가족관계등록부
                    정정까지 친자 소송의 전 과정을 전담합니다.
                  </p>
                  <p className="text-[15px] text-burgundy-500 font-semibold">
                    조윤용 팀장
                  </p>
                </div>
                <Link
                  href="/about/teams/family-relations"
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
                엇갈린 가족관계, 지금 바로잡을 수 있습니다
              </h3>
              <p className="text-[16px] md:text-[18px] text-[#444444] leading-[1.8] mb-10 max-w-xl mx-auto">
                잘못 기재된 서류 한 장이 상속과 가족의 정체성을 흔들 수
                있습니다. 더 늦기 전에 전문가와 상담하여 법적 진실을
                확인하십시오.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  aria-label={`친자관계 법률상담 ${phone}`}
                  className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  <Phone size={18} />
                  친자관계 법률상담 {phone}
                </a>
                <a
                  href="https://pf.kakao.com/_ExcxoAu/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle size={18} />
                  비대면 1:1 비밀 법률 진단
                </a>
              </div>
            </div>
          </div>
        </section>
      </PracticeRevealWrapper>

    </div>
  );
}
