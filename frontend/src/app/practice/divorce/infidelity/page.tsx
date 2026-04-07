import Link from "next/link";
import {
  Scale,
  Users,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  TrendingUp,
  Ban,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function InfidelityDivorcePage() {
  const phone = firmData.main_phone || "1555-5961";

  return (
    <div className="">
      <SubPageHero
        titleKo="부정행위 (외도)"
        bannerImage="/images/office/banner-divorce.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/divorce" },
          { label: "부정행위" },
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
                  INFIDELITY LEGAL GUIDE
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6 max-w-5xl">
                부정행위, 증거가
                <br />
                모든 것을 결정합니다
              </h2>
              <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#333333] mb-3 max-w-2xl">
                최근 부정행위로 인한 이혼 소송이 급증하고 있습니다. 감정적인
                대응보다 더 중요한 것은{" "}
                <strong className="text-burgundy-500">
                  법적으로 유효한 증거를 확보
                </strong>
                하는 것입니다. 20년 이혼 전문 노하우로 의뢰인의 권리를 완벽하게
                되찾아 드립니다.
              </p>
              <div className="mt-8">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  1:1 비공개 증거진단 신청
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : KEY RESPONSE STRATEGIES 4 CARDS ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                KEY RESPONSE STRATEGIES
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight">
                부정행위 대응 핵심 프로세스
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {[
                {
                  num: "1",
                  icon: <Ban size={24} />,
                  title: "이혼 사유 입증",
                  desc: "민법 제840조 제1호 '배우자의 부정한 행위'를 입증하여 확실한 이혼 판결을 이끌어냅니다.",
                },
                {
                  num: "2",
                  icon: <Scale size={24} />,
                  title: "위자료 청구",
                  desc: "배우자의 배신으로 인한 정신적 고통에 대해 최대 규모의 손해배상을 청구합니다.",
                },
                {
                  num: "3",
                  icon: <TrendingUp size={24} />,
                  title: "재산분할 전략",
                  desc: "유책 배우자의 기여도 방어 및 의뢰인의 재산권을 최우선으로 보호하는 전략을 수립합니다.",
                },
                {
                  num: "4",
                  icon: <Users size={24} />,
                  title: "상간자 소송",
                  desc: "이혼 여부와 관계없이 부정행위 당사자인 상간자에게 법적 책임을 묻고 보상을 받아냅니다.",
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
                    {item.num}. {item.title}
                  </h4>
                  <p className="text-[13px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#444444]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3 : 부정행위 개요 + 민법 제840조 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT: 부정행위 개요 */}
              <div data-reveal>
                <h3 className="font-sans text-[28px] md:text-[34px] font-bold text-[#2C2028] mb-6 leading-tight">
                  배우자의 부정행위 개요
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-6">
                  과거 간통죄와 달리, 현재 법적 &lsquo;부정행위&rsquo;는
                  성관계라는 직접적인 증거가 없더라도 성립됩니다. 늦은 시간의
                  잦은 연락, 애정 표현이 담긴 메시지, 데이트 정황만으로도
                  민사상 부정행위가 인정될 수 있습니다.
                </p>

                <div className="space-y-4">
                  <div className="bg-[#F8F4EE] rounded-xl p-4 md:p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp
                        size={18}
                        className="text-burgundy-500 flex-shrink-0"
                      />
                      <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                        소송 트렌드의 변화
                      </p>
                    </div>
                    <p className="text-[14px] md:text-[16px] leading-[1.7] text-[#444444]">
                      단순한 이혼을 넘어 상간자 단독 소송 및 위자료 증액 청구
                      사례가 매년 증가하고 있습니다.
                    </p>
                  </div>
                  <div className="bg-[#F8F4EE] rounded-xl p-4 md:p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <Scale
                        size={18}
                        className="text-burgundy-500 flex-shrink-0"
                      />
                      <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                        법적 판단 기준
                      </p>
                    </div>
                    <p className="text-[14px] md:text-[16px] leading-[1.7] text-[#444444]">
                      혼인의 본질인 부부간의 정조의무를 충실히 하지 않은 모든
                      행위가 판단의 대상이 됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT: 민법 제840조 카드 */}
              <div data-reveal>
                <div className="bg-[#1A1A2E] rounded-2xl p-4 md:p-8 h-full">
                  <h4 className="font-sans text-[22px] md:text-[26px] font-bold text-white mb-7 leading-tight">
                    부정행위로 인한 이혼 (민법 제840조)
                  </h4>

                  <div className="space-y-5 mb-8">
                    <div>
                      <p className="text-[13px] md:text-[15px] font-bold text-[#C9A84C] mb-2">
                        ● 제1호: 배우자의 부정한 행위
                      </p>
                      <p className="text-[14px] md:text-[16px] leading-[1.7] text-white/70">
                        육체적 관계에 국한되지 않으며, 부부의 정조의무를
                        저버린 일체의 행위를 포괄합니다.
                      </p>
                    </div>
                    <div>
                      <p className="text-[13px] md:text-[15px] font-bold text-[#C9A84C] mb-2">
                        ● 제6호: 기타 중대한 사유
                      </p>
                      <p className="text-[14px] md:text-[16px] leading-[1.7] text-white/70">
                        배우자의 외도로 인해 혼인 관계가 회복 불가능할 정도로
                        파탄에 이른 경우 해당됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-5">
                    <p className="text-[13px] md:text-[15px] font-bold text-white mb-2">
                      유책배우자 이혼청구 제한
                    </p>
                    <p className="text-[14px] md:text-[16px] leading-[1.7] text-white/60">
                      부정행위를 저지른 배우자가 먼저 이혼을 청구하는 것은 우리
                      법원의 유책주의 원칙상 원칙적으로 불허됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : 위자료 산정 + 재산분할 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8" data-reveal>
              {/* LEFT: 위자료 산정 기준 */}
              <div className="bg-white rounded-2xl p-4 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Scale
                    size={22}
                    className="text-burgundy-500 flex-shrink-0"
                  />
                  <h4 className="font-sans text-[17px] md:text-[22px] font-bold text-[#2C2028]">
                    위자료 산정 기준
                  </h4>
                </div>
                <p className="text-[17px] leading-[1.8] text-[#333333] mb-6">
                  위자료는 혼인 파탄의 원인을 제공한 자에게 청구하는 정신적
                  손해배상입니다. 실무상 통용되는 범위가 있으나 구체적 사정에
                  따라 증액이 가능합니다.
                </p>

                <div className="bg-[#F8F4EE] rounded-xl p-5 mb-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[14px] text-[#444444]">
                      일반적인 판결 범위
                    </span>
                    <span className="text-[22px] md:text-[26px] font-bold text-[#2C2028]">
                      2,000만 ~ 5,000만 원
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[13px] md:text-[15px] font-bold text-[#2C2028] mb-3">
                    증액 및 결정 요인
                  </p>
                  <ul className="space-y-2">
                    {[
                      "혼인 기간 및 자녀 유무",
                      "부정행위의 지속 기간 및 수위",
                      "부정행위 발각 후의 태도 (반성 여부 등)",
                      "상대방의 경제적 능력 및 사회적 지위",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[13px] md:text-[15px] text-[#333333]"
                      >
                        <span className="text-[#444444] mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT: 재산분할과 부정행위 */}
              <div className="bg-white rounded-2xl p-4 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp
                    size={22}
                    className="text-burgundy-500 flex-shrink-0"
                  />
                  <h4 className="font-sans text-[17px] md:text-[22px] font-bold text-[#2C2028]">
                    재산분할과 부정행위
                  </h4>
                </div>
                <p className="text-[17px] leading-[1.8] text-[#333333] mb-6">
                  재산분할은 &lsquo;기여도&rsquo;를 중심으로 판단합니다.
                  원칙적으로 유책 사유와 별개이지만, 실무적으로는 의뢰인에게
                  유리한 고지를 점할 수 있는 요소가 존재합니다.
                </p>

                <div className="space-y-4">
                  <div className="bg-[#F8F4EE] rounded-xl p-5">
                    <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-2">
                      기여도 중심 분할
                    </p>
                    <p className="text-[14px] md:text-[16px] leading-[1.7] text-[#444444]">
                      재산의 형성, 유지, 증식에 대한 공헌도에 따라 배분 비율이
                      결정됩니다.
                    </p>
                  </div>
                  <div className="bg-[#F8F4EE] rounded-xl p-5">
                    <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-2">
                      유책 사유의 참작
                    </p>
                    <p className="text-[14px] md:text-[16px] leading-[1.7] text-[#444444]">
                      부정행위로 인해 기재 자산이 유출된 경우(상간자에게 선물,
                      여행 등) 분할 시 불리하게 적용됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : 친권·양육권 + 상간자 소송 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT: 친권 및 양육권 */}
              <div data-reveal>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-[2px] bg-[#C9A84C]" />
                  <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C]">
                    PARENTAL RIGHTS &amp; SUPPORT
                  </p>
                </div>
                <h3 className="font-sans text-[24px] md:text-[28px] font-bold text-[#2C2028] mb-5 leading-tight">
                  친권 및 양육권의 우선순위
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-6">
                  법원은 &lsquo;자녀의 복리&rsquo;를 최우선으로 합니다.
                  부정행위 자체가 양육권 박탈 사유는 아니지만, 외도가 양육
                  환경에 부정적인 영향을 미쳤다면 의뢰인이 절대적으로
                  유리합니다.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "양육 환경의 연속성",
                      desc: "자녀와 더 깊은 유대감을 형성하고 안정적으로 양육해 온 부모가 우선합니다.",
                    },
                    {
                      title: "양육비 산정",
                      desc: "부모의 합산 소득과 자녀의 연령에 따라 표준양육비 산정기준표를 바탕으로 결정합니다.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-md bg-burgundy-500 text-white text-[13px] font-bold flex items-center justify-center mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-1">
                          {item.title}
                        </p>
                        <p className="text-[14px] md:text-[16px] leading-[1.7] text-[#444444]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: 상간자 손해배상 소송 */}
              <div data-reveal>
                <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-8 h-full">
                  <h4 className="font-sans text-[22px] md:text-[26px] font-bold text-[#2C2028] mb-5 leading-tight">
                    상간자 손해배상 소송
                  </h4>
                  <p className="text-[17px] leading-[1.8] text-[#333333] mb-6">
                    내 가정을 파탄 낸 제3자에게 책임을 묻는 절차입니다.
                    배우자와의 이혼 여부와 무관하게 독자적으로 진행할 수 있어
                    전략적 활용도가 높습니다.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-white rounded-xl p-5">
                      <div className="flex items-center gap-2.5 mb-2">
                        <CheckCircle2
                          size={16}
                          className="text-burgundy-500 flex-shrink-0"
                        />
                        <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                          청구 금액 범위
                        </p>
                      </div>
                      <p className="text-[13px] md:text-[15px] text-[#444444]">
                        통상 1,000만 원에서 3,000만 원 사이로 결정됩니다.
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-5">
                      <div className="flex items-center gap-2.5 mb-2">
                        <CheckCircle2
                          size={16}
                          className="text-burgundy-500 flex-shrink-0"
                        />
                        <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                          성립 요건 (고의성)
                        </p>
                      </div>
                      <p className="text-[13px] md:text-[15px] text-[#444444]">
                        상간자가 상대방이 기혼자임을 알고도 만남을
                        지속했다는 &lsquo;알지 사실&rsquo; 입증이 필수입니다.
                      </p>
                    </div>
                  </div>

                  <div className="bg-burgundy-500 rounded-xl p-4 text-center">
                    <p className="text-[15px] font-semibold text-white">
                      상간자 소송은 소멸시효가 있으므로 즉시 상담이 필요합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 6 : QUOTE BAND ═══════════ */}
        <section
          className="relative py-20 md:py-24 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/images/office/banner-divorce.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-[#1A1A2E]/85" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div data-reveal>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mb-6" />
              <p className="text-[20px] md:text-[26px] lg:text-[30px] text-white leading-[1.7] font-semibold">
                &ldquo;부정행위의 증거는 시간이 지날수록 소멸됩니다.
                <br className="hidden md:block" />
                빠른 대응이 최선의 전략입니다.&rdquo;
              </p>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-6 mb-4" />
              <p className="text-[15px] text-[#C9A84C] tracking-wider">
                위자료팀 신진희 팀장
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : TEAM LINK ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div data-reveal>
              <div className="bg-[#F8F4EE] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-5 md:gap-8">
                <div className="flex-1">
                  <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-3">
                    SPECIALIZED TEAM
                  </p>
                  <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028] mb-3 leading-tight">
                    위자료팀
                  </h3>
                  <p className="text-[16px] md:text-[18px] text-[#444444] leading-[1.8] mb-2">
                    위자료 산정, 상간자 소송, 증거 전략까지 부정행위 사건의
                    전 과정을 전문적으로 지원합니다.
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

        {/* ═══════════ SECTION 8 : CTA ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div data-reveal>
              <h3 className="font-sans text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[#2C2028] mb-4 leading-tight">
                배신의 고통, 법의 테두리 안에서
                <br />
                정당하게 보상받으십시오
              </h3>
              <p className="text-[16px] md:text-[18px] text-[#444444] leading-[1.8] mb-10 max-w-xl mx-auto">
                감정적 보복은 오히려 형사 처벌의 위험을 초래할 수 있습니다.
                <br className="hidden md:block" />
                신세계로법무법인이 가장 이성적이고 차가운 법적 대응으로 당신의
                마음을 위로하겠습니다.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  aria-label={`증거진단 문의 ${phone}`}
                  className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  <Phone size={18} />
                  {phone} 증거진단 문의
                </a>
                <a
                  href="https://pf.kakao.com/_ExcxoAu/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle size={18} />
                  비대면 카카오 상담 신청
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-[14px] text-[#444444]">
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
