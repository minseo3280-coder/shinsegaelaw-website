import Link from "next/link";
import {
  Shield,
  Users,
  Gavel,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Scale,
  FileSearch,
  Clock,
  Heart,
  Phone,
  MessageCircle,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function LitigationDivorcePage() {
  const _phone = firmData.offices?.[0]?.phone || "02-594-2800";

  return (
    <div className="">
      <SubPageHero
        titleKo="재판이혼"
        bannerImage="/images/office/banner-divorce.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/divorce" },
          { label: "재판이혼" },
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
                  LITIGATED DIVORCE GUIDE
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6 max-w-[1400px]">
                재판이혼, 증거와 전략이
                <br />
                승패를 결정합니다
              </h2>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#2C2028] font-semibold mb-8 max-w-3xl">
                민법 제840조에 규정된 이혼사유가 존재하는 경우, 상대방의 동의
                없이도 법원의 판결을 통해 혼인관계를 해소할 수 있습니다.
                재판이혼은 조정절차와 소송절차로 구성되며, 사전처분을 통한 긴급
                보호조치도 가능합니다.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
              >
                무료 이혼 전략 상담 신청
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : LITIGATION PROCESS 4 CARDS ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                LITIGATION PROCESS
              </p>
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028]">
                재판이혼의 핵심 쟁점
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {[
                {
                  num: "1",
                  icon: <Shield size={26} />,
                  title: "사전처분",
                  desc: "소송 기간 중 생활비 지급, 접근금지, 면접교섭 등 긴급 보호 조치를 법원에 신청할 수 있습니다.",
                },
                {
                  num: "2",
                  icon: <FileSearch size={26} />,
                  title: "가사조사관",
                  desc: "법원 가사조사관이 양육환경, 자녀 의사, 경제적 상황 등을 조사하여 판결에 반영합니다.",
                },
                {
                  num: "3",
                  icon: <Scale size={26} />,
                  title: "조정이혼",
                  desc: "이혼소송은 반드시 조정절차를 먼저 거쳐야 합니다. 조정 합의 시 확정판결과 동일한 효력이 발생합니다.",
                },
                {
                  num: "4",
                  icon: <AlertTriangle size={26} />,
                  title: "유책배우자",
                  desc: "혼인파탄에 주된 책임이 있는 배우자의 이혼 청구는 원칙적으로 제한되지만, 예외적으로 허용됩니다.",
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

        {/* ═══════════ SECTION 3 : 재판상 이혼이란 + 6가지 사유 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div data-reveal className="mb-14">
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                GROUNDS FOR DIVORCE
              </p>
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028] mb-6">
                재판상 이혼이란?
              </h2>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#2C2028] font-semibold max-w-[1400px]">
                재판상 이혼이란 민법 제840조에 규정된 이혼사유가 발생한 경우, 부부
                일방이 가정법원에 이혼의 소를 제기하여 판결로써 성립되는 이혼을
                말합니다. 협의이혼과 달리 상대방의 동의가 필요하지 않으며, 법원이
                이혼사유의 존부를 심리한 후 판결을 선고합니다.
              </p>
            </div>

            {/* 민법 제840조 이혼사유 6가지 */}
            <div data-reveal className="mb-10">
              <h3 className="font-sans text-[20px] md:text-[22px] font-bold text-[#2C2028] mb-8">
                민법 제840조 이혼사유{" "}
                <span className="text-burgundy-500">6가지</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-5">
                {[
                  {
                    num: "01",
                    text: "배우자에게 부정한 행위가 있었을 때",
                  },
                  {
                    num: "02",
                    text: "배우자가 악의로 다른 일방을 유기한 때",
                  },
                  {
                    num: "03",
                    text: "배우자 또는 그 직계존속으로부터 심히 부당한 대우를 받았을 때",
                  },
                  {
                    num: "04",
                    text: "자기의 직계존속이 배우자로부터 심히 부당한 대우를 받았을 때",
                  },
                  {
                    num: "05",
                    text: "배우자의 생사가 3년 이상 분명하지 아니한 때",
                  },
                  {
                    num: "06",
                    text: "기타 혼인을 계속하기 어려운 중대한 사유가 있을 때",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center bg-[#F8F4EE] rounded-xl p-4 md:p-6 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                  >
                    <span className="text-[22px] md:text-[28px] font-bold text-burgundy-500/30 leading-none mb-2 md:mb-3">
                      {item.num}
                    </span>
                    <p className="text-[13px] md:text-[16px] leading-[1.6] text-[#2C2028] font-semibold">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 소멸시효 경고 박스 */}
            <div
              data-reveal
              className="bg-burgundy-50 border border-burgundy-200 rounded-2xl p-6 md:p-7"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <Clock size={18} className="text-burgundy-500" />
                <h4 className="font-sans text-[16px] font-bold text-burgundy-600">
                  법적 소멸 시효 주의
                </h4>
              </div>
              <p className="text-[16px] leading-[1.8] text-[#2C2028] font-semibold">
                이혼과 함께 위자료, 재산분할, 친권·양육권, 양육비 등 부수적
                청구를 병합하여 진행하는 것이 일반적입니다. 재산분할 청구는
                이혼한 날부터 2년 이내, 위자료 청구는 안 날로부터 3년
                (불법행위일로부터 10년) 이내에 행사해야 합니다.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : 유책배우자 + 조정전치주의 (2-col) ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
              {/* Left — 유책배우자 */}
              <div data-reveal>
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  FAULT-BASED SYSTEM
                </p>
                <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-[#2C2028] mb-5 leading-[1.4]">
                  유책배우자의 이혼청구,
                  <br />
                  허용될 수 있나요?
                </h3>
                <p className="text-[17px] leading-[1.9] text-[#3A3238] font-semibold mb-6">
                  우리 법원은 원칙적으로 혼인파탄에 주된 책임이 있는
                  배우자(유책배우자)의 이혼청구를 인용하지 않습니다. 이는
                  혼인제도의 보호와 무책 배우자의 권리를 존중하기 위한
                  법리입니다.
                </p>
                <p className="text-[17px] leading-[1.9] text-[#3A3238] font-semibold mb-8">
                  다만, 최근 판례는 파탄주의적 관점을 점진적으로 수용하고
                  있습니다. 아래와 같은 예외적 사정이 인정되면 유책배우자의
                  이혼청구도 허용될 수 있습니다.
                </p>

                <div className="space-y-4">
                  {[
                    "상대방이 혼인 계속의 실질적 의사 없이 오기나 보복적 감정에서 이혼을 거부하는 경우",
                    "혼인 파탄 후 상당한 기간이 경과한 경우",
                    "유책 배우자가 상대방에게 충분한 경제적 보상을 제시한 경우",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 md:px-5 md:py-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-burgundy-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-[16px] leading-[1.7] text-[#2C2028] font-semibold">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — 조정전치주의 */}
              <div data-reveal data-reveal-delay="1">
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  MANDATORY MEDIATION
                </p>
                <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-[#2C2028] mb-5 leading-[1.4]">
                  조정전치주의와
                  <br />
                  조정이혼
                </h3>
                <p className="text-[17px] leading-[1.9] text-[#3A3238] font-semibold mb-8">
                  가사소송법상 이혼사건은 소송에 앞서 반드시 조정절차를 거쳐야
                  합니다(조정전치주의). 조정은 법관 또는 조정위원이 주재하며,
                  당사자 간 합의를 통해 분쟁을 원만하게 해결합니다.
                </p>

                <div className="grid grid-cols-2 gap-3 md:gap-5">
                  {/* 임의조정 */}
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <Scale size={16} className="text-[#C9A84C] flex-shrink-0" />
                      <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                        임의조정
                      </h4>
                    </div>
                    <p className="text-[13px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#3A3238] font-semibold">
                      당사자 쌍방이 조정 조건에 합의하여 성립됩니다. 합의 즉시
                      확정판결과 동일한 효력이 발생하며, 이혼사유에 대한 엄격한
                      증거가 없더라도 성립할 수 있습니다.
                    </p>
                  </div>

                  {/* 강제조정 */}
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <Gavel size={16} className="text-burgundy-500 flex-shrink-0" />
                      <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                        강제조정
                      </h4>
                    </div>
                    <p className="text-[13px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#3A3238] font-semibold">
                      당사자 간 합의가 이루어지지 않은 경우, 법원이 직권으로
                      조정 결정을 내립니다. 송달받은 날로부터{" "}
                      <strong className="text-[#2C2028]">
                        2주 이내에 이의신청
                      </strong>
                      이 가능하며, 이의 시 정식 소송으로 이행됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : 가사조사관 + 사전처분 (2-col) ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
              {/* Left — 가사조사관 */}
              <div data-reveal>
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  FAMILY COURT INVESTIGATION
                </p>
                <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-[#2C2028] mb-5 leading-[1.4]">
                  가사조사관 조사절차
                </h3>
                <p className="text-[17px] leading-[1.9] text-[#3A3238] font-semibold mb-8">
                  가정법원은 조정사건 및 소송사건에서 가사조사관을 통한 사실조사를
                  실시합니다. 조사보고서는 이후 소송 및 조정에 있어 중요한
                  판단자료로 활용되므로, 조사기일에는 반드시 출석하여 성실히
                  임하여야 합니다.
                </p>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { icon: <Users size={20} />, label: "혼인 경위 · 갈등 원인" },
                    {
                      icon: <Heart size={20} />,
                      label: "자녀 양육환경 · 의사",
                    },
                    { icon: <Scale size={20} />, label: "경제적 상황 파악" },
                    {
                      icon: <FileSearch size={20} />,
                      label: "화해 가능성 탐색",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#F8F4EE] rounded-xl p-3 md:p-4 flex flex-col items-center text-center gap-2.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-burgundy-500">
                        {item.icon}
                      </div>
                      <span className="text-[14px] md:text-[16px] font-semibold text-[#2C2028] font-semibold leading-tight">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — 사전처분 */}
              <div data-reveal data-reveal-delay="1">
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  PRE-TRIAL REMEDIES
                </p>
                <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-[#2C2028] mb-5 leading-[1.4]">
                  사전처분: 안전한 보호막
                </h3>
                <p className="text-[17px] leading-[1.9] text-[#3A3238] font-semibold mb-8">
                  이혼소송은 통상 상당한 기간이 소요됩니다. 이 기간 중 당사자의
                  권리를 보호하고 소송의 실효성을 확보하기 위하여, 법원은
                  사전처분을 명할 수 있습니다.
                </p>

                <div className="space-y-4">
                  {/* 생활비·양육비 */}
                  <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-5 border border-[#E8E0D8]">
                    <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-2">
                      임시 생활비 · 양육비
                    </h4>
                    <p className="text-[13px] md:text-[15px] leading-[1.8] text-[#3A3238] font-semibold">
                      소송 기간 중 경제적 어려움에 처한 당사자는 상대방에게
                      매월 일정액의 생활비 또는 양육비 지급을 구하는
                      사전처분을 신청할 수 있습니다.
                    </p>
                  </div>

                  {/* 접근금지 */}
                  <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-5 border border-[#E8E0D8]">
                    <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-2">
                      접근금지 처분
                    </h4>
                    <p className="text-[13px] md:text-[15px] leading-[1.8] text-[#3A3238] font-semibold">
                      가정폭력 등으로 위해의 우려가 있는 경우, 상대방의
                      주거·직장 등 100미터 이내 접근을 금지하는 사전처분을
                      신청할 수 있습니다.
                    </p>
                  </div>

                  {/* 면접교섭 */}
                  <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-5 border border-[#E8E0D8]">
                    <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-2">
                      면접교섭 사전처분
                    </h4>
                    <p className="text-[13px] md:text-[15px] leading-[1.8] text-[#3A3238] font-semibold">
                      상대방이 자녀와의 면접교섭을 거부하는 경우, 정기적으로
                      자녀를 만날 수 있는 권리를 확보하는 사전처분을 신청할
                      수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 6 : 간통과 이혼 + 가정폭력 (2 Feature Cards) ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                SPECIAL ISSUES
              </p>
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028]">
                재판이혼의 주요 특수 쟁점
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6" data-reveal>
              {/* Card 1 — 간통과 이혼 (다크) */}
              <div className="relative bg-[#2C2028] rounded-2xl p-5 md:p-10 text-white overflow-hidden">
                {/* 장식 아이콘 */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.08]">
                  <Gavel size={160} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <h3 className="font-sans text-[22px] md:text-[26px] font-bold mb-5 leading-[1.4]">
                    간통과 이혼
                  </h3>
                  <p className="text-[16px] leading-[1.8] text-white/70 mb-6">
                    2015년 간통죄 폐지 이후, 외도는 형사 처벌 대상은 아니지만
                    여전히 민사상 &lsquo;불법행위&rsquo;에 해당합니다. 배우자와
                    상간자를 상대로 한 위자료 청구 소송을 통해 정신적 고통에 대한
                    손해배상을 받을 수 있습니다.
                  </p>
                  <div className="space-y-2.5">
                    {[
                      "카카오톡, 블랙박스 등 간접 증거의 효력",
                      "상간녀/상간남 소송 별도 진행 가능",
                    ].map((item, i) => (
                      <p
                        key={i}
                        className="text-[17px] leading-[1.7] text-white/80"
                      >
                        · {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2 — 가정폭력 (버건디) */}
              <div className="relative bg-burgundy-500 rounded-2xl p-5 md:p-10 text-white overflow-hidden">
                {/* 장식 아이콘 */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.12]">
                  <Shield size={160} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <h3 className="font-sans text-[22px] md:text-[26px] font-bold mb-5 leading-[1.4]">
                    가정폭력과 안전이혼
                  </h3>
                  <p className="text-[16px] leading-[1.8] text-white/70 mb-6">
                    폭력 상황에서는 신속한 분리가 우선입니다. 피해자 보호명령 및
                    긴급임시조치를 통해 물리적 거리를 확보하고, 형사 고소와 이혼
                    소송을 병행하여 유리한 위치를 점해야 합니다.
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      "긴급임시조치",
                      "형사처벌 대응",
                      "피해자 보호명령",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 border border-white/30 rounded-md text-[14px] font-semibold text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : QUOTE BAND ═══════════ */}
        <section
          className="relative py-20 md:py-24 overflow-hidden"
          data-reveal
        >
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
              &ldquo;유책배우자 해당 여부는 소송의 승패를 좌우하는
              <br className="hidden md:block" />
              핵심 쟁점입니다. 사건 초기 단계에서
              <br className="hidden md:block" />
              전문 변호사의 법률 검토를 받는 것이 중요합니다.&rdquo;
            </p>
            <p className="mt-5 text-[15px] text-white/60 font-semibold">
              — 이혼소송총괄팀
            </p>
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
                  <p className="text-[16px] text-[#333333]">
                    이혼소송총괄팀 · 김미루 팀장
                  </p>
                  <h3 className="font-sans text-[18px] md:text-[20px] font-bold text-[#2C2028]">
                    이혼소송 전 과정을 총괄하는 전문팀
                  </h3>
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

        {/* ═══════════ SECTION 9 : CTA ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center" data-reveal>
              <h2 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] leading-[1.35] font-bold text-[#2C2028] mb-5">
                어려운 싸움,
                <br />
                신세계로가 함께합니다
              </h2>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#3A3238] font-semibold mb-10">
                당신의 존엄한 선택, 끝까지 함께하겠습니다.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`tel:${firmData.main_phone || "1555-5961"}`}
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-8 py-3.5 rounded-md text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  <Phone size={16} />
                  1555-5961 긴급 상담
                </Link>
                <Link
                  href="https://pf.kakao.com/_ExcxoAu/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-[#2C2028] text-[#2C2028] px-8 py-3.5 rounded-md text-[16px] font-semibold hover:bg-[#2C2028] hover:text-white transition-all duration-300"
                >
                  <MessageCircle size={16} />
                  카카오톡 실시간 상담
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PracticeRevealWrapper>

    </div>
  );
}
