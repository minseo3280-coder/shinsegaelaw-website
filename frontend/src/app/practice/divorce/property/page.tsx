import Link from "next/link";
import {
  Home,
  Building2,
  Search,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Scale,
  Landmark,
  TrendingUp,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  MapPin,
  ShieldAlert,
  Info,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function PropertyPage() {
  const phone = firmData.offices?.[0]?.phone || "02-594-2800";

  return (
    <div className="">
      <SubPageHero
        titleKo="재산분할"
        bannerImage="/images/office/banner-divorce.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/divorce" },
          { label: "재산분할" },
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
                  PROPERTY DIVISION GUIDE
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6 max-w-5xl">
                재산분할, 정확한 전략이
                <br />
                결과를 바꿉니다
              </h2>
              <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#2C2028] font-semibold mb-3 max-w-2xl">
                재산분할은 단순히 절반으로 나누는 과정이 아닙니다. 치밀한 자산
                분석과 기여도 입증을 통해 의뢰인의 정당한 권리를 찾아드리는{" "}
                <strong className="text-burgundy-500">
                  전략적 법률 서비스
                </strong>
                입니다.
              </p>
              <div className="mt-8">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  1:1 자산 분석 상담 신청
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : ASSET CATEGORIES 4 CARDS ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                ASSET CATEGORIES
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight">
                유형별 맞춤 자산 전략
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {[
                {
                  icon: <Home size={24} />,
                  title: "부동산·주택",
                  desc: "아파트, 토지, 상가 등 실거래기 산정부터 명의 이전 및 분할 시점의 시세 차이 분석까지 전문적으로 대응합니다.",
                },
                {
                  icon: <TrendingUp size={24} />,
                  title: "금융자산·주식",
                  desc: "예적금, 보험 해지환급금, 주식 및 코인 등 변동성이 큰 자산의 정확한 가치 평가와 분할 비율을 산정합니다.",
                },
                {
                  icon: <Building2 size={24} />,
                  title: "법인·사업체",
                  desc: "사업체 운영 기여도 분석과 비상장 주식 가치 평가를 통해 사업권 보호와 정당한 자산 분할을 동시에 실현합니다.",
                },
                {
                  icon: <Search size={24} />,
                  title: "은닉재산 추적",
                  desc: "상대방이 고의로 숨기거나 처분한 재산을 사실조회와 금융거래 정보 제출 명령을 통해 끝까지 추적합니다.",
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

        {/* ═══════════ SECTION 3 : 재산분할이란? + 분할대상 vs 제외대상 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            {/* 재산분할이란 설명 */}
            <div className="mb-16" data-reveal>
              <h3 className="font-sans text-[28px] md:text-[34px] font-bold text-[#2C2028] mb-6 leading-tight">
                재산분할이란?
              </h3>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#2C2028] font-semibold max-w-5xl">
                혼인 생활 중 부부가 협력하여 공동으로 축적한 재산을 이혼 시
                각자의 기여도에 따라 나누는 것입니다. 이는 혼인 파탄의
                책임(위자료)과는 별개의 개념으로, 경제적 기여와 내조/외조의
                가치를 정당하게 평가받는 과정입니다.
              </p>
            </div>

            {/* 분할대상 vs 제외대상 2-column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8" data-reveal>
              {/* LEFT: 분할 대상 (공동재산) */}
              <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-8">
                <div className="flex items-center gap-3 mb-7">
                  <CheckCircle2
                    size={22}
                    className="text-burgundy-500 flex-shrink-0"
                  />
                  <h4 className="font-sans text-[17px] md:text-[22px] font-bold text-[#2C2028]">
                    분할 대상 재산 (공동재산)
                  </h4>
                </div>
                <div className="space-y-5">
                  {[
                    "혼인 중 부부가 공동으로 형성한 모든 부동산 및 금융자산",
                    "퇴직금 및 연금 (장래에 수령할 퇴직급여 포함)",
                    "가사와 육아 전담 시 인정되는 무형의 기여도",
                    "의사·변호사 등 전문직 자격 취득 시 장래 수입 가능성",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-md bg-burgundy-500 text-white text-[13px] font-bold flex items-center justify-center mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14px] md:text-[17px] leading-[1.7] text-[#2C2028] font-semibold">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: 원칙적 제외 (특유재산) */}
              <div className="bg-[#F8F4EE] rounded-2xl p-4 md:p-8">
                <div className="flex items-center gap-3 mb-7">
                  <XCircle
                    size={22}
                    className="text-[#333333] flex-shrink-0"
                  />
                  <h4 className="font-sans text-[17px] md:text-[22px] font-bold text-[#2C2028]">
                    원칙적 제외 재산 (특유재산)
                  </h4>
                </div>
                <div className="space-y-5">
                  {[
                    "혼인 전부터 각자 소유하고 있던 재산",
                    "혼인 중 증여 또는 상속받은 재산",
                    "시부모·처부모 명의의 재산",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-md bg-[#8A7E84] text-white text-[13px] font-bold flex items-center justify-center mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14px] md:text-[17px] leading-[1.7] text-[#2C2028] font-semibold">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 특유재산 예외 경고 */}
                <div className="mt-7 bg-burgundy-50 rounded-xl p-5 border border-burgundy-100">
                  <div className="flex items-start gap-2.5">
                    <Info
                      size={16}
                      className="text-burgundy-500 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-[16px] leading-[1.7] text-burgundy-700">
                      단, 특유재산이라도 상대방이 그 유지 및 가치 증대에
                      기여했다면 분할 대상에 포함될 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : 주요 법적 쟁점 (Left Title + Right 4 Cards) ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
              {/* LEFT: Title */}
              <div data-reveal>
                <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-4">
                  재산분할의
                  <br />
                  주요 법적 쟁점
                </h3>
                <p className="text-[16px] text-burgundy-500 leading-[1.7]">
                  실무에서 가장 빈번하게 발생하는 질문과 판례의 기준을 정리해
                  드립니다.
                </p>
              </div>

              {/* RIGHT: 4 Cards */}
              <div className="grid grid-cols-2 gap-3 md:gap-5" data-reveal>
                {[
                  {
                    title: "유책배우자의 분할 청구",
                    content:
                      "외도나 폭력 등 혼인 파탄의 책임이 있는 '유책배우자'라 하더라도 재산 형성에 기여했다면 재산분할을 청구할 권리가 있습니다. 위자료와 재산분할은 엄연히 별개입니다.",
                  },
                  {
                    title: "채무(빚)의 처리 원칙",
                    content:
                      "생활비·주택대출 등 공동생활 채무는 순자산에서 공제됩니다. 도박·개인투자 채무는 일방 단독 부담이 원칙이나, 연대보증을 선 경우 함께 변제해야 합니다. 채무가 자산보다 많은 경우 법원은 채무 분담 판결을 내리지 않습니다.",
                  },
                  {
                    title: "재산 가액 산정 시점",
                    content:
                      "원칙적으로 '사실심 변론 종결 시' 기준으로 산정합니다. 장기 별거 시에는 별거 시점이 기준이 됩니다. 소송 직전·중에 처분하거나 근저당권을 설정해도 해당 재산은 '그대로 존재'하는 것으로 간주하여 분할 대상에 포함됩니다.",
                  },
                  {
                    title: "재산분할과 세금 문제",
                    content:
                      "이혼 시 재산분할로 부동산 명의를 이전받는 경우 증여세와 양도소득세는 부과되지 않습니다. 단, 취득세는 발생하므로 세무적 고려가 선행되어야 합니다.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-l-[3px] border-burgundy-500 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-3">
                      {item.title}
                    </h4>
                    <p className="text-[14px] md:text-[16px] leading-[1.8] text-[#3A3238] font-semibold">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 6 : 은닉재산 추적 + 사해행위 취소 카드 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div
              data-reveal
              className="bg-[#F8F4EE] rounded-2xl p-8 md:p-12"
            >
              <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028] mb-2 leading-tight">
                상대방이 재산을 숨기고 있다면?
              </h3>
              <h4 className="font-sans text-[20px] md:text-[24px] font-bold text-burgundy-500 mb-5">
                은닉재산 추적과 사해행위 취소
              </h4>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#2C2028] font-semibold mb-8 max-w-5xl">
                소송 전후로 상대방이 재산을 타인 명의로 돌리거나 처분하는
                행위는 &lsquo;사해행위&rsquo;에 해당합니다. 신세계로의 전문
                추적 팀이 숨겨진 1원까지 찾아내어 판결 후 집행까지 책임집니다.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {[
                  {
                    icon: <Landmark size={22} />,
                    title: "금융거래 조회",
                    desc: "10년치 계좌 내역 및 보험 조회",
                  },
                  {
                    icon: <MapPin size={22} />,
                    title: "부동산 전수 조사",
                    desc: "명의신탁·의심 부동산 소유권 확인",
                  },
                  {
                    icon: <ShieldAlert size={22} />,
                    title: "가압류·가처분",
                    desc: "재산 사전 금지를 위한 긴급 보전",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="text-burgundy-500 mb-3">{item.icon}</div>
                    <p className="text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-1">
                      {item.title}
                    </p>
                    <p className="text-[13px] md:text-[14px] text-[#333333]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : QUOTE BAND ═══════════ */}
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
                &ldquo;재산분할은 단순한 나눔이 아닙니다.
                <br className="hidden md:block" />
                부동산, 주식, 퇴직금, 법인 지분까지 —
                <br className="hidden md:block" />
                복잡한 자산을 전략적으로 배분합니다.&rdquo;
              </p>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-6 mb-4" />
              <p className="text-[15px] text-[#C9A84C] tracking-wider">
                재산분할팀 류현주 팀장
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 8 : TEAM LINK ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div data-reveal>
              <div className="bg-[#F8F4EE] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-5 md:gap-8">
                <div className="flex-1">
                  <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-3">
                    SPECIALIZED TEAM
                  </p>
                  <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028] mb-3 leading-tight">
                    재산분할팀
                  </h3>
                  <p className="text-[16px] md:text-[18px] text-[#3A3238] font-semibold leading-[1.8] mb-2">
                    고액 자산과 복잡한 재산구조에 특화된 분할 전략 전문가들이
                    의뢰인의 정당한 권리를 지켜드립니다.
                  </p>
                  <p className="text-[15px] text-burgundy-500 font-semibold">
                    류현주 팀장 · 대전총괄 변호사
                  </p>
                </div>
                <Link
                  href="/about/teams/property"
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
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div data-reveal>
              <h3 className="font-sans text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[#2C2028] mb-4 leading-tight">
                당신의 기여, 수치로 증명해 드립니다
              </h3>
              <p className="text-[16px] md:text-[18px] text-[#3A3238] font-semibold leading-[1.8] mb-10 max-w-xl mx-auto">
                가장 정교한 자산 평가 시스템과 다수의 승소 데이터를 바탕으로
                의뢰인이 흘린 땀의 가치를 1%라도 더 높게 인정받을 수 있도록
                싸우겠습니다.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <a
                  href={`tel:${phone}`}
                  aria-label={`전화 상담 ${phone}`}
                  className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  <Phone size={18} />
                  자산 분할 무료 진단
                </a>
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle size={18} />
                  온라인 비밀 상담 신청
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
