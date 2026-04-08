import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Clock,
  Calendar,
  Eye,
  TrendingDown,
  Trash2,
  ShieldQuestion,
  CheckCircle2,
  ChevronDown,
  Search,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group border-b border-gray-200">
      <summary className="flex items-center justify-between py-6 cursor-pointer list-none">
        <span className="text-[16px] font-bold text-[#2C2028] pr-4">
          Q. {question}
        </span>
        <ChevronDown
          size={20}
          className="text-[#444444] group-open:rotate-180 transition-transform duration-300 flex-shrink-0"
        />
      </summary>
      <div className="pb-6 text-[15px] leading-[1.9] text-[#333333]">
        {answer}
      </div>
    </details>
  );
}

export default function AdulteryStatutePage() {
  const phone = firmData.main_phone || "1555-5961";

  return (
    <div className="">
      <SubPageHero
        titleKo="소송 시효"
        bannerImage="/images/office/banner-adultery.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/adultery" },
          { label: "소송 시효" },
        ]}
      />

      <PracticeTabs />

      <PracticeRevealWrapper>
        {/* ═══════════ SECTION 1 : HERO HEADLINE ═══════════ */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div data-reveal className="text-center max-w-5xl mx-auto">
              <div className="mb-5 justify-center">
                <p className="text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                  공소시효 가이드
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6">
                상간자소송 시효,
                <br />
                <span className="text-burgundy-500">시간이 가장 중요</span>
                합니다.
              </h2>
              <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#333333] mb-3">
                상간자 소송은 불법행위로 인한 정신적 고통에 대한 손해배상을
                청구하는 민사소송입니다. 법이 정한 기간 내에 권리를 행사하지
                않으면 소송 자체가 불가능해질 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : 두 가지 법적 시효 ═══════════ */}
        <section className="bg-[#F8F4EE] py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-3">
                반드시 지켜야 할 두 가지 법적 시효
              </h3>
              <p className="text-[16px] text-[#444444]">
                민법 제766조(손해배상청구권의 소멸시효)에 근거한 기준입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 max-w-5xl mx-auto" data-reveal>
              {/* 안 날로부터 3년 */}
              <div className="bg-white rounded-2xl p-4 md:p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mx-auto mb-6">
                  <Eye size={26} />
                </div>
                <p className="text-[14px] font-bold text-burgundy-500 mb-2">
                  안 날로부터
                </p>
                <p className="text-[56px] md:text-[68px] font-bold text-burgundy-500 leading-none mb-4">
                  3<span className="text-[24px] md:text-[40px]">년</span>
                </p>
                <p className="text-[14px] md:text-[16px] leading-[1.8] text-[#333333]">
                  부정행위 사실과 상간자가 누구인지(성명, 연락처 등
                  인적사항)를 구체적으로{" "}
                  <span className="font-bold text-[#2C2028]">
                    인지한 날로부터 3년
                  </span>{" "}
                  이내에 소송을 제기해야 합니다.
                </p>
              </div>

              {/* 있은 날로부터 10년 */}
              <div className="bg-white rounded-2xl p-4 md:p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-[#444444] mx-auto mb-6">
                  <Calendar size={26} />
                </div>
                <p className="text-[14px] font-bold text-[#444444] mb-2">
                  있은 날로부터
                </p>
                <p className="text-[56px] md:text-[68px] font-bold text-[#2C2028] leading-none mb-4">
                  10<span className="text-[24px] md:text-[40px]">년</span>
                </p>
                <p className="text-[14px] md:text-[16px] leading-[1.8] text-[#333333]">
                  외도 사실을 몰랐더라도, 실제 부정행위가{" "}
                  <span className="font-bold text-[#2C2028]">
                    발생한 날로부터 10년
                  </span>
                  이 경과하면 시효가 완성되어 소송 제기가 불가능합니다.
                </p>
              </div>
            </div>

            {/* 핵심 안내 */}
            <div className="mt-8 max-w-5xl mx-auto" data-reveal>
              <div className="bg-burgundy-50 rounded-xl p-5 md:p-6 border border-burgundy-100 text-center">
                <p className="text-[15px] md:text-[18px] leading-[1.8] text-[#333333]">
                  두 기간 중 어느 하나라도 먼저 도래하면 청구권은
                  소멸합니다. 즉,{" "}
                  <span className="font-bold text-burgundy-600">
                    10년 이내라도 안 날로부터 3년이 지나면 소송이
                    불가능
                  </span>
                  합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3 : 시효 타임라인 시각화 ═══════════ */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-5 md:px-10">
            <div className="text-center mb-12" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                TIMELINE VISUALIZATION
              </p>
              <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028] leading-tight">
                시효 관계 시각화
              </h3>
            </div>

            <div data-reveal>
              {/* 타임라인 */}
              <div className="relative">
                {/* 연결선 */}
                <div className="hidden md:block absolute top-6 left-0 right-0 h-[3px] bg-gray-200 z-0" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 relative z-10">
                  {[
                    {
                      dot: "bg-burgundy-500",
                      label: "부정행위 발생",
                      sub: "시효 기산 시작",
                      active: true,
                    },
                    {
                      dot: "bg-[#2C2028]",
                      label: "사실 인지",
                      sub: "인지 후 3년 이내 접수",
                      active: true,
                    },
                    {
                      dot: "bg-gray-300",
                      label: "10년 절대 시효",
                      sub: "발생 후 10년",
                      active: false,
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div
                        className={`w-12 h-12 rounded-full ${item.dot} flex items-center justify-center mb-3 ${
                          item.active ? "shadow-lg" : ""
                        }`}
                      >
                        {item.active ? (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <p
                        className={`text-[16px] font-bold mb-1 ${
                          item.active ? "text-[#2C2028]" : "text-[#444444]"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`text-[14px] ${
                          item.active
                            ? "text-burgundy-500 font-semibold"
                            : "text-[#444444]"
                        }`}
                      >
                        {item.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 핵심 메시지 */}
              <div className="mt-10 bg-[#F8F4EE] rounded-xl p-6 text-center">
                <p className="text-[15px] md:text-[18px] leading-[1.8] text-[#333333]">
                  핵심은{" "}
                  <span className="font-bold text-burgundy-600">
                    &ldquo;인지한 날로부터 3년&rdquo;
                  </span>
                  입니다. 인지 시점으로부터 시간이 흐를수록 법원은 의뢰인의
                  고통이 경감되었다고 판단하여 위자료 액수를 낮게 산정할
                  가능성이 높습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : '안 날'의 법적 기준 ═══════════ */}
        <section className="bg-[#F8F4EE] py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* LEFT */}
              <div data-reveal>
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  LEGAL STANDARD
                </p>
                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  &lsquo;안 날&rsquo;의 법적 기준은
                  <br />
                  무엇인가요?
                </h3>
                <p className="text-[14px] md:text-[17px] leading-[1.9] text-[#333333] mb-6">
                  &lsquo;안 날&rsquo;이란 단순히 의심하는 수준이 아니라,
                  상간자의 존재와 부정행위 사실을 객관적으로{" "}
                  <span className="font-bold text-[#2C2028]">
                    확신할 수 있는 상태
                  </span>
                  에 이르렀을 때를 말합니다.
                </p>
                <p className="text-[14px] md:text-[17px] leading-[1.9] text-[#333333]">
                  또한 소송을 제기하기 위해 상간자의 성명이나 주소 등
                  인적사항을 특정할 수 있는 정보까지 확보된 시점으로 봅니다.
                </p>
              </div>

              {/* RIGHT: 판례 기준 */}
              <div data-reveal>
                <p className="text-[15px] md:text-[15px] font-bold text-[#2C2028] mb-5">
                  시효 기산점 주요 판례 기준
                </p>
                <div className="space-y-3">
                  {[
                    "배우자의 외도 사실을 인지하였으나 상간자의 신원을 특정하지 못한 경우, 신원을 확인한 날이 기산점",
                    "부정행위가 계속적으로 이루어진 경우, 최종 부정행위일을 기준으로 시효 기산",
                    "배우자가 부정행위를 인정하는 각서를 작성한 날이 '안 날'로 인정 가능",
                    "흥신소 등을 통해 증거를 확보한 날이 '안 날'로 판단된 사례",
                    "상간자의 이름만 알고 주소 등 인적사항을 모르는 경우, 인적사항 특정 시까지 시효 미진행 가능",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg p-3 md:p-4 flex items-start gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-burgundy-400 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#333333]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : 망설이는 시간만큼 위자료 감소 ═══════════ */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* LEFT: 경고 메시지 */}
              <div data-reveal>
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-burgundy-500 mb-4">
                  비판적 경고
                </p>
                <h3 className="font-sans text-[28px] md:text-[34px] font-bold text-[#2C2028] mb-6 leading-tight">
                  &ldquo;알고도 왜 참으셨나요?&rdquo;
                  <br />
                  <span className="text-burgundy-500">
                    지체된 시간은 위자료를
                  </span>
                  <br />
                  깎습니다.
                </h3>
                <p className="text-[14px] md:text-[17px] leading-[1.9] text-[#333333] mb-8">
                  법적 시효인 3년이 남아있다고 해서 안심해서는 안 됩니다. 외도
                  사실을 인지하고도 1~2년이 지난 뒤에야 소송을 제기하면,
                  상대방은 &ldquo;용서한 것이 아니냐&rdquo;,
                  &ldquo;정신적 충격이 크지 않았던 것 아니냐&rdquo;는
                  논리로 방어합니다.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 flex-shrink-0">
                      <TrendingDown size={18} />
                    </div>
                    <div>
                      <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-1">
                        정신적 고통의 희석
                      </p>
                      <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#444444]">
                        시간이 많이 흐른 뒤의 소송은 &ldquo;당시 입은 충격이
                        감내할 수준이었다&rdquo;는 피고측의 반격 빌미가
                        됩니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 flex-shrink-0">
                      <ShieldQuestion size={18} />
                    </div>
                    <div>
                      <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-1">
                        묵인 또는 용서로 오해
                      </p>
                      <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#444444]">
                        긴 공백기는 원고가 부정행위를 묵인했거나 이미 용서한
                        것으로 비쳐져 위자료 액수 산정에 불리하게
                        작용합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: 골든타임 카드 */}
              <div data-reveal>
                <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <div className="w-12 h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mx-auto mb-5">
                    <Clock size={24} />
                  </div>
                  <h4 className="font-sans text-[20px] md:text-[22px] font-bold text-[#2C2028] text-center mb-8">
                    최대 위자료 확보를 위한
                    <br />
                    골든타임
                  </h4>

                  <div className="space-y-4">
                    {/* 최고의 시점 */}
                    <div className="bg-burgundy-500 rounded-xl p-4 md:p-5 text-center">
                      <p className="text-[14px] md:text-[15px] text-white/70 mb-1">
                        최고의 시점
                      </p>
                      <p className="text-[15px] md:text-[18px] font-bold text-white">
                        인지 후 6개월 이내 착수
                      </p>
                    </div>

                    {/* 중의 */}
                    <div className="bg-white rounded-xl p-4 md:p-5 text-center border border-gray-200">
                      <p className="text-[14px] md:text-[15px] text-[#444444] mb-1">
                        중의
                      </p>
                      <p className="text-[15px] md:text-[18px] font-bold text-[#2C2028]">
                        인지 후 1년 이내 착수
                      </p>
                    </div>

                    {/* 위험 */}
                    <div className="bg-white rounded-xl p-4 md:p-5 text-center border border-burgundy-200">
                      <p className="text-[14px] md:text-[15px] text-burgundy-400 mb-1">
                        위험
                      </p>
                      <p className="text-[15px] md:text-[18px] font-bold text-[#444444]">
                        인지 후 2년 경과 시점
                      </p>
                    </div>
                  </div>

                  <p className="text-[15px] text-[#444444] text-center mt-5">
                    *위 도표는 일반적인 법관 경향성 배경으로 작성되었습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 3가지 위험 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-14" data-reveal>
              {[
                {
                  icon: <TrendingDown size={22} />,
                  title: "손해배상액 감액",
                  desc: "법원은 시간이 흐를수록 혼인 파탄의 고통이 희석되었다고 판단할 가능성이 크며, 이는 위자료 산정에서 불리하게 작용합니다.",
                },
                {
                  icon: <Trash2 size={22} />,
                  title: "증거 인멸 위험",
                  desc: "시간이 지날수록 통화 기록, 카드 내역, CCTV 등 핵심 증거들이 소멸되거나 상간자가 고의적으로 증거를 조작·삭제할 시간을 줍니다.",
                },
                {
                  icon: <ShieldQuestion size={22} />,
                  title: "추인(용서) 논란",
                  desc: "사실을 알고도 상당 기간 정상적인 혼인 관계를 유지했다면, 법적으로 배우자의 부정행위를 용서한 것으로 간주될 위험이 있습니다.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#F8F4EE] rounded-xl p-4 md:p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-5">
                    {item.icon}
                  </div>
                  <h4 className="font-sans text-[15px] md:text-[18px] font-bold text-[#2C2028] mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[15px] md:text-[16px] leading-[1.8] text-[#444444]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 핵심 권장 메시지 */}
            <div className="mt-10 text-center" data-reveal>
              <p className="text-[16px] md:text-[19px] text-[#2C2028]">
                &ldquo;최대 위자료 확보를 위해서는{" "}
                <span className="font-bold text-burgundy-500">
                  인지 직후 6개월 이내
                </span>{" "}
                소송 제기를 권장합니다.&rdquo;
              </p>
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
          <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-10 text-center">
            <div data-reveal>
              <p className="text-[20px] md:text-[26px] lg:text-[30px] text-white leading-[1.7] font-semibold">
                &ldquo;시효는 기다려 주지 않습니다.
                <br className="hidden md:block" />
                부정행위를 알게 된 그 순간이
                <br className="hidden md:block" />
                가장 빠른 시점이며, 가장 유리한 시점입니다.&rdquo;
              </p>
              <p className="text-[15px] text-[#C9A84C] tracking-wider">
                위자료팀 신진희 팀장
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : Q&A ═══════════ */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-5 md:px-10">
            <div className="text-center mb-12" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#444444] mb-4">
                자주 묻는 질문
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight">
                상간자소송 시효 Q&A
              </h3>
            </div>

            <div data-reveal>
              <FAQItem
                question="'부정행위를 안 날'의 법적 기준은 정확히 무엇인가요?"
                answer="단순히 '의심'하는 수준이 아니라, 상간자의 존재와 부정행위 사실을 객관적으로 확신할 수 있는 상태에 이르렀을 때를 말합니다. 또한 소송을 제기하기 위해 상간자의 성명이나 주소 등 인적사항을 특정할 수 있는 정보까지 확보된 시점으로 봅니다."
              />
              <FAQItem
                question="증거가 부족해서 망설이다가 시간이 흘렀습니다. 시효가 연장되나요?"
                answer="안타깝게도 증거 부족은 시효 연장 사유가 되지 않습니다. 시효는 '안 날'로부터 자동으로 진행되며, 증거를 충분히 모으지 못했다는 이유로 시효가 정지되거나 연장되지 않습니다. 다만 상간자의 신원을 특정하지 못한 경우에는 기산점 자체가 달라질 수 있으므로 전문가 상담이 필요합니다."
              />
              <FAQItem
                question="현재도 외도가 진행 중이라면 시효는 언제부터 계산되나요?"
                answer="부정행위가 계속적으로 이루어지고 있는 경우, 최종 부정행위일을 기준으로 시효가 기산됩니다. 따라서 현재 진행 중인 외도의 경우 아직 시효가 시작되지 않은 것으로 볼 수 있습니다. 다만 과거 부정행위에 대해서는 별도로 시효가 진행될 수 있으므로 가능한 빨리 소송을 준비하는 것이 유리합니다."
              />
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 8 : TEAM LINK ═══════════ */}
        <section className="bg-[#F8F4EE] py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div data-reveal>
              <div className="bg-white rounded-2xl p-5 md:p-12 flex flex-col md:flex-row items-center gap-5 md:gap-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="flex-1">
                  <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-3">
                    SPECIALIZED TEAM
                  </p>
                  <h3 className="font-sans text-[20px] md:text-[30px] font-bold text-[#2C2028] mb-3 leading-tight">
                    위자료팀
                  </h3>
                  <p className="text-[16px] md:text-[17px] text-[#444444] leading-[1.8] mb-2">
                    상담 당일 시효 검토와 증거 분석을 완료하고, 즉시 소송
                    전략을 수립합니다. 시효 임박 사건의 경우 긴급 접수
                    체계를 운영하고 있습니다.
                  </p>
                  <p className="text-[15px] text-burgundy-500 font-semibold">
                    신진희 팀장
                  </p>
                </div>
                <Link
                  href="/about/teams/alimony"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 whitespace-nowrap"
                >
                  팀 소개 보기
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 9 : CTA ═══════════ */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-5 md:px-10 text-center">
            <div data-reveal>
              <h3 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#2C2028] mb-4 leading-tight">
                지금 이 순간에도
                <br />
                <span className="text-burgundy-500">시효는 흘러가고</span>{" "}
                있습니다.
              </h3>
              <p className="text-[16px] md:text-[17px] text-[#444444] leading-[1.8] mb-10 max-w-xl mx-auto">
                망설이는 시간 동안 증거는 인멸되고, 청구할 수 있는 권리는
                소멸합니다. 전문가와 시효를 점검하고 가장 효과적인 대응
                타이밍을 잡으십시오.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  aria-label={`시효 무료 확인하기 ${phone}`}
                  className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  <Phone size={18} />
                  시효 무료 확인하기 {phone}
                </a>
                <a
                  href="https://pf.kakao.com/_ExcxoAu/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
                >
                  <Search size={18} />
                  시효 만료 여부 확인하기
                </a>
              </div>
            </div>
          </div>
        </section>
      </PracticeRevealWrapper>

    </div>
  );
}
