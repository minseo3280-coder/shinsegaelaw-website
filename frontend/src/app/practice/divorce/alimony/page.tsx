import Link from "next/link";
import {
  Scale,
  Users,
  Search,
  Gavel,
  ArrowRight,
  MessageCircle,
  Monitor,
  CreditCard,
  Mic,
  Cross,
  Phone,
  Info,
  Home,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function AlimonyPage() {
  return (
    <div className="">
      <SubPageHero
        titleKo="위자료"
        bannerImage="/images/office/banner-divorce.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/divorce" },
          { label: "위자료" },
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
                  ALIMONY &amp; DAMAGES GUIDE
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6 max-w-[1400px]">
                위자료, 정확한 증거가
                <br />
                금액을 결정합니다
              </h2>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#2C2028] font-semibold mb-3 max-w-3xl">
                위자료는 혼인 관계 파탄으로 입은 정신적 고통을 금전으로 배상받는
                권리입니다. 상대방의 유책 사유를 명확히 입증하여{" "}
                <strong className="text-burgundy-500">
                  당신이 받은 상처에 합당한 법적 보상
                </strong>
                을 이끌어냅니다.
              </p>
              <div className="mt-8">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  위자료 산정 무료 진단
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : ALIMONY PROCESS 4 CARDS ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                ALIMONY PROCESS
              </p>
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028]">
                위자료 청구 핵심 프로세스
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {[
                {
                  num: "1",
                  icon: <Scale size={26} />,
                  title: "위자료 산정",
                  desc: "혼인 기간, 유책 정도, 상대방의 자산 규모 등을 종합적으로 고려하여 법원이 인용할 수 있는 최적의 금액을 도출합니다.",
                },
                {
                  num: "2",
                  icon: <Users size={26} />,
                  title: "제3자 청구",
                  desc: "배우자뿐만 아니라 상간자, 시부모, 장서 등 혼인 파탄에 실질적 원인을 제공한 제3자에게도 법적 책임을 묻습니다.",
                },
                {
                  num: "3",
                  icon: <Search size={26} />,
                  title: "증거 확보",
                  desc: "카카오톡, 통화녹음, CCTV, 카드 결제 내역 등 법적으로 유효한 증거를 합법적인 경로로 수집하고 정리합니다.",
                },
                {
                  num: "4",
                  icon: <Gavel size={26} />,
                  title: "민형사 병행",
                  desc: "필요시 폭행이나 협박 등에 대한 형사 고소를 병행하여, 위자료 액수 산정에 있어 더욱 강력한 협상 우위를 점합니다.",
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
                  <p className="text-[13px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#3A3238] font-semibold">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3 : 위자료란 무엇인가요? ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div data-reveal className="mb-16">
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028] mb-6">
                위자료란 무엇인가요?
              </h2>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#2C2028] font-semibold max-w-[1400px]">
                위자료는 이혼으로 인해 받게 된{" "}
                <strong className="text-[#2C2028]">
                  정신적인 고통에 대한 손해배상
                </strong>
                을 의미합니다. 재산분할이 혼인 기간 중 공동으로 형성한 재산을
                나누는 성격이라면, 위자료는 &lsquo;잘못한 사람&rsquo;이
                &lsquo;피해를 입은 사람&rsquo;에게 주는 위로금 성격의
                배상금입니다.
              </p>
            </div>

            {/* 위자료 산정 기준 */}
            <div
              data-reveal
              className="bg-[#F8F4EE] rounded-2xl p-5 md:p-10 mb-6"
            >
              <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-[#2C2028] mb-5">
                위자료 산정 기준
              </h3>
              <p className="text-[16px] md:text-[19px] leading-[1.8] text-[#3A3238] font-semibold mb-8 italic">
                법원은 산술적인 공식보다는 당사자들의 구체적인 사정을
                종합적으로 참작하여 액수를 정합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4">
                {[
                  "연령 및 직업",
                  "가족관계 및 자녀 유무",
                  "혼인 생활의 과정",
                  "학력 및 경력",
                  "양육비 지급 여부",
                  "이혼에 이르게 된 경위",
                  "재산상태 및 생활정도",
                  "혼인 지속 기간",
                  "유책 행위의 정도",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-burgundy-500 flex-shrink-0" />
                    <span className="text-[16px] font-semibold text-[#2C2028]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 증거의 질이 금액을 바꿉니다 */}
            <div data-reveal className="bg-white rounded-2xl border border-burgundy-100 border-l-4 border-l-burgundy-500 p-6 md:p-7">
              <div className="flex items-center gap-2 mb-2">
                <Info size={16} className="text-burgundy-500" />
                <h4 className="font-sans text-[16px] font-bold text-burgundy-600">
                  증거의 질이 금액을 바꿉니다
                </h4>
              </div>
              <p className="text-[16px] md:text-[19px] leading-[1.8] text-[#2C2028] font-semibold">
                단순한 심증만으로는 충분한 위자료를 받을 수 없습니다.
                상대방의 유책 행위를 증명할 수 있는 객관적인 물증 확보가
                승소의 핵심입니다.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : QUOTE BAND ═══════════ */}
        <section
          className="relative py-20 md:py-24 overflow-hidden"
          data-reveal
        >
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
              &ldquo;상처를 법적 책임으로 바꾸는 일,
              <br className="hidden md:block" />
              증거부터 함께 정리하겠습니다.&rdquo;
            </p>
            <p className="mt-5 text-[15px] text-white/60 font-semibold">
              — 위자료팀
            </p>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : 위자료 청구 시효 + 증거 확보 전략 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
              {/* Left — 위자료 청구 시효 */}
              <div data-reveal>
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  STATUTE OF LIMITATIONS
                </p>
                <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-[#2C2028] mb-5 leading-[1.4]">
                  위자료 청구 시효
                </h3>
                <p className="text-[17px] leading-[1.9] text-[#3A3238] font-semibold mb-5">
                  위자료 청구권에는 시효가 존재하므로, 적절한 시기에 권리를
                  행사하는 것이 중요합니다. 이혼 위자료는 이혼일로부터 3년
                  이내에 청구해야 하며, 이 기간이 지나면 시효 소멸로 인해
                  청구가 불가능해질 수 있습니다.
                </p>
                <p className="text-[17px] leading-[1.9] text-[#3A3238] font-semibold mb-8">
                  따라서 이혼 과정에서 위자료 문제를 함께 정리하는 것이 가장
                  효과적입니다. 이혼 후에 별도로 위자료를 청구하는 경우에도
                  시효 내에 소송을 제기해야 합니다.
                </p>
                <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-[16px] font-semibold text-[#2C2028] font-semibold">
                        이혼 위자료
                      </span>
                      <span className="text-[16px] text-[#2C2028] font-bold">
                        이혼일로부터 3년
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-[16px] font-semibold text-[#2C2028] font-semibold">
                        부정행위 위자료
                      </span>
                      <span className="text-[16px] text-[#2C2028] font-bold">
                        안 날로부터 3년
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[16px] font-semibold text-[#2C2028] font-semibold">
                        재산분할 청구
                      </span>
                      <span className="text-[16px] text-[#2C2028] font-bold">
                        이혼일로부터 2년
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — 증거 확보 전략 */}
              <div data-reveal data-reveal-delay="1">
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  EVIDENCE STRATEGY
                </p>
                <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-[#2C2028] mb-5 leading-[1.4]">
                  증거 확보의 중요성
                </h3>
                <p className="text-[17px] leading-[1.9] text-[#3A3238] font-semibold mb-5">
                  위자료 소송에서 가장 중요한 것은 유책 행위를 입증할 수 있는
                  증거입니다. 카카오톡 대화, 문자메시지, 녹음 파일, CCTV 영상,
                  신용카드 사용 내역, 호텔 예약 기록 등 다양한 형태의 증거가
                  활용됩니다.
                </p>
                <p className="text-[17px] leading-[1.9] text-[#3A3238] font-semibold mb-5">
                  다만, 증거 수집 과정에서 위법한 방법을 사용하면 오히려
                  불리하게 작용할 수 있으므로, 반드시 전문 변호사의 조언하에
                  적법한 방법으로 수집해야 합니다.
                </p>
                <p className="text-[17px] leading-[1.9] text-[#3A3238] font-semibold mb-8">
                  법무법인 신세계로는 52년간의 경험을 바탕으로, 법원에서
                  인정받을 수 있는 증거 전략을 수립하고, 의뢰인이 최대한의
                  위자료를 받을 수 있도록 지원합니다.
                </p>
                <div className="bg-burgundy-50 border border-burgundy-200 rounded-2xl p-5">
                  <p className="text-[17px] leading-[1.8] text-[#2C2028] font-semibold">
                    <strong className="text-burgundy-600">
                      불법 수집 증거 주의
                    </strong>{" "}
                    — 불법 흥신소 이용이나 불법 도청 등 위법하게 수집된
                    증거는 법적 효력이 없을 뿐만 아니라 형사 처벌의 대상이 될
                    수 있으므로 반드시 변호사의 자문을 받아야 합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 6 : 위자료 청구 대상 + 결정적 증거 종류 (2-col) ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
              {/* Left — 위자료 청구 대상 */}
              <div data-reveal>
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  LIABILITY SCOPE
                </p>
                <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] mb-5 leading-[1.35]">
                  위자료, 누구에게
                  <br />
                  청구할 수 있나요?
                </h3>
                <p className="text-[17px] leading-[1.9] text-[#3A3238] font-semibold mb-8">
                  위자료 청구의 주된 대상은 혼인 파탄의 원인을 제공한
                  배우자이지만, 판례는 혼인 생활을 방해하고 파탄에 이르게 한
                  제3자에게도 배상 책임을 인정하고 있습니다.
                </p>

                <div className="space-y-4">
                  {/* 상간자 */}
                  <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-6 flex gap-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center text-burgundy-400 flex-shrink-0">
                      <Users size={22} />
                    </div>
                    <div>
                      <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-1.5">
                        상간자 (제3자 부정행위)
                      </h4>
                      <p className="text-[13px] md:text-[15px] leading-[1.8] text-[#3A3238] font-semibold">
                        배우자와 부정행위를 저지른 상간녀 혹은 상간남을 상대로
                        위자료 소송을 별도로 제기하거나 이혼 소송과 병행할 수
                        있습니다.
                      </p>
                    </div>
                  </div>

                  {/* 직계존속 */}
                  <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-6 flex gap-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center text-burgundy-400 flex-shrink-0">
                      <Home size={22} />
                    </div>
                    <div>
                      <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-1.5">
                        직계존속 (시부모·장서 갈등)
                      </h4>
                      <p className="text-[13px] md:text-[15px] leading-[1.8] text-[#3A3238] font-semibold">
                        시어머니, 시누이, 장인, 장모 등 배우자의 가족이 혼인
                        생활에 부당하게 간섭하거나 심한 모욕을 준 경우 그들을
                        상대로도 위자료 청구가 가능합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — 증거 종류 */}
              <div data-reveal data-reveal-delay="1">
                <div className="bg-[#FDF2F4] rounded-2xl p-5 md:p-9">
                  <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-3">
                    EVIDENCE LIST
                  </p>
                  <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-[#2C2028] mb-8">
                    결정적 증거의 종류
                  </h3>

                  <div className="space-y-0">
                    {[
                      {
                        icon: <MessageCircle size={18} />,
                        label: "카카오톡 및 문자 내역",
                      },
                      {
                        icon: <Monitor size={18} />,
                        label: "블랙박스 영상 및 GPS 기록",
                      },
                      {
                        icon: <CreditCard size={18} />,
                        label: "카드 결제 및 계좌 이체 내역",
                      },
                      {
                        icon: <Mic size={18} />,
                        label: "통화 녹음 및 사진 자료",
                      },
                      {
                        icon: <Cross size={18} />,
                        label: "상해 진단서 및 신고 기록",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3 md:py-4 border-b border-[#E8D8DC] last:border-b-0"
                      >
                        <span className="text-[14px] md:text-[16px] font-semibold text-[#2C2028]">
                          {item.label}
                        </span>
                        <div className="text-burgundy-300">{item.icon}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-white/60 rounded-xl p-4">
                    <p className="text-[16px] leading-[1.7] text-[#333333]">
                      ※ 불법 흥신소 이용이나 불법 도청 등 위법하게 수집된 증거는
                      법적 효력이 없을 뿐만 아니라 형사 처벌의 대상이 될 수
                      있으므로 반드시 변호사의 자문을 받아야 합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : TEAM LINK ═══════════ */}
        <section className="bg-[#F8F4EE] py-10 md:py-18" data-reveal>
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-burgundy-500 flex items-center justify-center text-white flex-shrink-0">
                  <Scale size={24} />
                </div>
                <div>
                  <p className="text-[16px] text-[#333333]">
                    위자료팀 · 신진희 팀장
                  </p>
                  <h3 className="font-sans text-[20px] md:text-[30px] font-bold text-[#2C2028]">
                    위자료 산정 및 청구 전문팀
                  </h3>
                </div>
              </div>
              <Link
                href="/about/teams/alimony"
                className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-[15px] font-semibold text-burgundy-500 hover:bg-burgundy-500 hover:text-white transition-all duration-300 shadow-sm flex-shrink-0"
              >
                팀 소개 보기 <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 8 : CTA ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center" data-reveal>
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028] mb-5">
                당신의 권리, 침묵하지 마세요
              </h2>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#3A3238] font-semibold mb-2">
                위자료 소송은 상대방의 잘못을 낱낱이 밝혀내는 과정이기에 심리적
                부담이 큽니다.
              </p>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#3A3238] font-semibold">
                신세계로가 당신의 방패가 되어{" "}
                <strong className="text-[#2C2028]">정당한 배상</strong>을 끝까지
                받아내겠습니다.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`tel:${firmData.main_phone || "1555-5961"}`}
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-8 py-3.5 rounded-md text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  <Phone size={16} />
                  1555-5961 긴급 상담
                </Link>
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 border-2 border-[#2C2028] text-[#2C2028] px-8 py-3.5 rounded-md text-[16px] font-semibold hover:bg-[#2C2028] hover:text-white transition-all duration-300"
                >
                  온라인 위자료 계산기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PracticeRevealWrapper>

    </div>
  );
}
