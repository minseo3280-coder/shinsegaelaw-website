import Link from "next/link";
import {
  Globe,
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Anchor,
  Scale,
  ClipboardList,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function InternationalDivorcePage() {
  const phone = firmData.main_phone || "1555-5961";

  return (
    <div className="">
      <SubPageHero
        titleKo="국제이혼"
        bannerImage="/images/office/banner-divorce.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/divorce" },
          { label: "국제이혼" },
        ]}
      />

      <PracticeTabs />

      <PracticeRevealWrapper>
        {/* ═══════════ SECTION 1 : HERO HEADLINE ═══════════ */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div data-reveal>
              <div className="mb-6">
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                  국제 이혼 법률 가이드
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6 max-w-5xl">
                국제이혼, 어느 나라
                <br />
                법을 적용할 것인가
              </h2>
              <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#333333] mb-3 max-w-2xl">
                국제적 요소가 포함된 이혼 소송에서는 어느 나라 법원에서
                재판을 받을지(재판관할권)와 어느 나라 법률을
                적용할지(준거법)를 결정하는 것이 승소의 첫걸음입니다.
                복잡한 국제 사법 체계를 전문 노하우로 명쾌하게
                풀어드립니다.
              </p>
              <div className="mt-8">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  국제이혼 맞춤 전략 상담
                  <Globe size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : 준거법 3단계 (가로 카드) ═══════════ */}
        <section className="bg-[#F8F4EE] py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                적용 법률 흐름도
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-4">
                준거법 결정의 우선순위 (국제사법 제39조)
              </h3>
              <p className="text-[16px] text-[#444444] max-w-2xl mx-auto leading-relaxed">
                이혼의 성립 여부, 유책 사유, 재산분할 등의 판단 기준이
                되는 법률은 아래의 순서에 따라 결정됩니다.
              </p>
            </div>

            {/* 3단계 가로 카드 */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8"
              data-reveal
            >
              {[
                {
                  step: "단계 01",
                  title: "동일한 본국법",
                  desc: "부부의 국적이 같은 경우, 그 국가의 법률을 최우선으로 적용합니다.",
                },
                {
                  step: "단계 02",
                  title: "동일한 상거소지법",
                  desc: "국적이 다르더라도 부부가 함께 주로 거주하고 있는 국가의 법을 적용합니다.",
                },
                {
                  step: "단계 03",
                  title: "가장 밀접한 관련법",
                  desc: "국적과 거주지가 모두 다른 경우, 혼인 생활의 실체와 가장 밀접한 국가의 법률을 적용합니다.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-500 relative"
                >
                  <p className="text-[15px] md:text-[16px] font-bold text-burgundy-500 mb-3">
                    {item.step}
                  </p>
                  <h4 className="font-sans text-[18px] md:text-[20px] font-bold text-[#2C2028] mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[15px] md:text-[16px] leading-[1.8] text-[#444444]">
                    {item.desc}
                  </p>
                  {/* 화살표 (마지막 카드 제외) */}
                  {i < 2 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight
                        size={16}
                        className="text-burgundy-300"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 대한민국 법 적용의 특례 */}
            <div
              data-reveal
              className="bg-burgundy-50 rounded-2xl p-6 md:p-8 flex items-start gap-5 border border-burgundy-100"
            >
              <div className="w-10 h-10 rounded-full bg-burgundy-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle
                  size={18}
                  className="text-burgundy-600"
                />
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#2C2028] mb-2">
                  대한민국 법 적용의 특례
                </p>
                <p className="text-[17px] leading-[1.8] text-[#333333]">
                  부부 중 한 사람이 대한민국 국민이고, 대한민국에
                  상거소(주된 거주지)가 있는 경우에는 위 우선순위와
                  관계없이{" "}
                  <strong className="text-burgundy-500">
                    대한민국 법이 적용
                  </strong>
                  됩니다. (국제사법 제39조)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3 : 관할권 + 핵심 사례 ═══════════ */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT: 관할권 설명 */}
              <div data-reveal>
                <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  관할권 결정
                </p>
                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  어느 나라 법원에서 판
                  <br className="hidden md:block" />
                  결을 받을 것인가
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-8">
                  대한민국 법원에서 이혼 판결을 받기 위해서는
                  &lsquo;국제재판관할권&rsquo;이 인정되어야 합니다.
                  원칙적으로 피고의 주소지가 기준이 되지만, 국제이혼의
                  특수성을 고려하여 예외적인 상황에서도 인정될 수
                  있습니다.
                </p>

                {/* 일반 원칙 */}
                <div className="bg-gray-50 rounded-xl p-5 mb-4 border-l-[3px] border-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-[#444444]" />
                    <p className="text-[16px] font-bold text-[#2C2028]">
                      일반 원칙 (피고 주소지)
                    </p>
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#333333]">
                    소송을 제기당하는 상대방(피고)이 한국에 거주하고
                    있다면 당연히 한국에서 소송이 가능합니다.
                  </p>
                </div>

                {/* 민사소송법 217조 */}
                <div className="bg-gray-50 rounded-xl p-5 border-l-[3px] border-burgundy-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Anchor size={16} className="text-burgundy-500" />
                    <p className="text-[16px] font-bold text-[#2C2028]">
                      민사소송법 제217조 및 관련 예외
                    </p>
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#333333]">
                    상대방이 해외에 있더라도, 한국과의 &lsquo;실질적
                    관련성&rsquo;이 인정되는 경우 한국 법원의 관할권이
                    인정됩니다.
                  </p>
                </div>
              </div>

              {/* RIGHT: 관할권 인정의 핵심 사례 다크카드 */}
              <div data-reveal>
                <div className="bg-[#1A1A2E] rounded-2xl p-5 md:p-10 h-full relative overflow-hidden">
                  {/* 배경 장식 앵커 */}
                  <div className="absolute right-6 bottom-6 opacity-5">
                    <Anchor size={120} className="text-white" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-1 h-6 bg-burgundy-500 rounded-full" />
                      <h4 className="font-sans text-[20px] md:text-[22px] font-bold text-white">
                        관할권 인정의 핵심 사례
                      </h4>
                    </div>

                    <div className="space-y-7">
                      <div>
                        <p className="text-[15px] font-bold text-burgundy-400 tracking-wider mb-2">
                          케이스 01
                        </p>
                        <p className="text-[16px] font-bold text-white mb-2">
                          상대방(피고)의 행방불명
                        </p>
                        <p className="text-[16px] leading-[1.7] text-white/65">
                          상대방의 소재를 전혀 알 수 없는 경우, 공시송달을
                          통해 한국에서 이혼 절차 진행이 가능합니다.
                        </p>
                      </div>

                      <div>
                        <p className="text-[15px] font-bold text-burgundy-400 tracking-wider mb-2">
                          케이스 02
                        </p>
                        <p className="text-[16px] font-bold text-white mb-2">
                          악의적 유기 또는 응소 거부
                        </p>
                        <p className="text-[16px] leading-[1.7] text-white/65">
                          상대방이 일방적으로 배우자를 유기하고 해외로
                          출국했거나, 한국 법원의 소환에 정당한 이유 없이
                          불응하는 경우입니다.
                        </p>
                      </div>

                      <div>
                        <p className="text-[15px] font-bold text-burgundy-400 tracking-wider mb-2">
                          케이스 03
                        </p>
                        <p className="text-[16px] font-bold text-white mb-2">
                          원고가 유기된 경우
                        </p>
                        <p className="text-[16px] leading-[1.7] text-white/65">
                          해외에서 혼인 생활 중 상대방으로부터 버림받아
                          한국으로 귀국한 원고의 권리 보호를 위해 한국
                          관할권이 널리 인정됩니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : 준거법 결과 차이 + 외국 판결 국내 효력 ═══════════ */}
        <section className="bg-[#F8F4EE] py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div className="grid lg:grid-cols-2 gap-8" data-reveal>
              {/* 준거법에 따른 결과 차이 */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-3 mb-5">
                  <Scale size={20} className="text-[#444444]" />
                  <h4 className="font-sans text-[18px] md:text-[20px] font-bold text-[#2C2028]">
                    준거법에 따른 결과 차이
                  </h4>
                </div>
                <p className="text-[16px] leading-[1.8] text-[#333333] mb-6">
                  어느 나라 법이 적용되느냐에 따라 이혼 성립 요건뿐만
                  아니라 위자료 산정 방식과 재산분할 비율이 판이하게
                  달라집니다.
                </p>

                <div className="space-y-4">
                  <div className="bg-burgundy-50 rounded-xl p-5 border border-burgundy-100">
                    <p className="text-[15px] font-bold text-burgundy-500 mb-1">
                      A &nbsp; 유책주의 vs 파탄주의
                    </p>
                    <p className="text-[14px] leading-[1.7] text-[#333333]">
                      국가마다 잘못이 있어야 이혼이 되는지, 관계가
                      파탄나면 이혼이 되는지 판단 기준이 다릅니다.
                    </p>
                  </div>
                  <div className="bg-burgundy-50 rounded-xl p-5 border border-burgundy-100">
                    <p className="text-[15px] font-bold text-burgundy-500 mb-1">
                      B &nbsp; 위자료 산정의 폭
                    </p>
                    <p className="text-[14px] leading-[1.7] text-[#333333]">
                      대한민국과 달리 징벌적 손해배상이 인정되거나 위자료
                      개념이 없는 국가도 존재합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 외국 판결의 국내 효력 */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-3 mb-5">
                  <FileText size={20} className="text-[#444444]" />
                  <h4 className="font-sans text-[18px] md:text-[20px] font-bold text-[#2C2028]">
                    외국 판결의 국내 효력
                  </h4>
                </div>
                <p className="text-[16px] leading-[1.8] text-[#333333] mb-6">
                  외국에서 받은 이혼 판결이 한국에서 자동으로 효력을 갖는
                  것은 아닙니다. 한국의 공공질서에 반하지 않는 등 일정
                  요건을 갖추어야 집행이 가능합니다.
                </p>

                <div className="space-y-3">
                  {[
                    "상대방에게 방어권 행사를 위한 송달의 적법성을 갖출 것",
                    "선량한 풍속 기타 사회질서에 어긋나지 않을 것",
                    "상호 보증이 있거나 상당한 정당성이 인정될 것",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-burgundy-500 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-[16px] leading-[1.7] text-[#333333]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : 국제사법 37조 / 39조 + 서류 체크리스트 ═══════════ */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            {/* 국제사법 핵심 정리 */}
            <div className="text-center mb-14" data-reveal>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-4">
                국제사법 제37조 및 제39조 핵심 정리
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-20" data-reveal>
              {/* 혼인의 일반적 효력 (37조) */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-5">
                  <FileText size={20} className="text-[#444444]" />
                  <h4 className="font-sans text-[18px] md:text-[20px] font-bold text-[#2C2028]">
                    혼인의 일반적 효력 (제37조)
                  </h4>
                </div>
                <p className="text-[16px] leading-[1.8] text-[#333333] mb-6">
                  혼인의 효력과 이혼의 성립 여부뿐만 아니라, 이혼 후의
                  재산분할 및 자녀 양육에 관한 준거법을 결정하는 기준이
                  됩니다.
                </p>
                <div className="space-y-3 border-t border-gray-100 pt-5">
                  {[
                    { label: "혼인의 성립", value: "각 당사자의 본국법" },
                    {
                      label: "혼인의 방식",
                      value: "거행지법 또는 본국법",
                      highlight: true,
                    },
                    {
                      label: "이혼의 준거법",
                      value: "국제사법 제39조 준용",
                      highlight: true,
                    },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-[15px] text-[#444444]">
                        {row.label}
                      </span>
                      <span
                        className={`text-[15px] font-semibold ${
                          row.highlight
                            ? "text-burgundy-500"
                            : "text-[#2C2028]"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 주의해야 할 쟁점 */}
              <div className="bg-[#1A1A2E] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-5">
                  <AlertTriangle size={20} className="text-[#C9A84C]" />
                  <h4 className="font-sans text-[18px] md:text-[20px] font-bold text-white">
                    주의해야 할 쟁점
                  </h4>
                </div>

                <div className="mb-7">
                  <p className="text-[16px] font-bold text-white mb-2">
                    외국 판결의 집행력
                  </p>
                  <p className="text-[16px] leading-[1.7] text-white/70">
                    외국에서 이혼 판결을 받았더라도 한국 내의 재산을
                    분할하거나 호적을 정리하기 위해서는 한국 법원의
                    집행판결이나 승인 절차가 별도로 필요할 수 있습니다.
                  </p>
                </div>

                <div>
                  <p className="text-[16px] font-bold text-white mb-2">
                    자녀의 복리와 관할권
                  </p>
                  <p className="text-[16px] leading-[1.7] text-white/70">
                    자녀가 한국에 거주하고 있는 경우, 부모의 국적과
                    상관없이 양육권 및 친권에서는 한국 법원의 강력한
                    관할이 인정되는 경향이 있습니다.
                  </p>
                </div>

                <div className="mt-7 pt-5 border-t border-white/10">
                  <p className="text-[14px] leading-[1.7] text-white/50">
                    * 국제이혼은 국가 간의 조약이나 개별 사안에 따라 법률
                    해석이 크게 달라지므로 전문 변호사의 조력이 필수적
                    입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 국제이혼 준비 서류 체크리스트 */}
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                REQUIRED DOCUMENTS
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-4">
                국제이혼 준비 서류 체크리스트
              </h3>
              <p className="text-[16px] text-[#444444] max-w-xl mx-auto leading-relaxed">
                국가와 사례에 따라 추가 서류가 필요할 수 있으니 반드시
                전문가의 검토를 받으시기 바랍니다.
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
              data-reveal
            >
              {/* 한국인 배우자 */}
              <div className="bg-white rounded-xl p-4 md:p-7 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-2 mb-4 md:mb-5">
                  <div className="w-1 h-5 bg-burgundy-500 rounded-full" />
                  <h4 className="font-sans text-[16px] md:text-[17px] font-bold text-[#2C2028]">
                    한국인 배우자
                  </h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "혼인관계증명서 (상세)",
                    "가족관계증명서 (상세)",
                    "주민등록 등/초본",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-[15px] text-[#333333]"
                    >
                      <ClipboardList
                        size={14}
                        className="text-burgundy-400 flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 외국인 배우자 */}
              <div className="bg-white rounded-xl p-4 md:p-7 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-2 mb-4 md:mb-5">
                  <div className="w-1 h-5 bg-burgundy-500 rounded-full" />
                  <h4 className="font-sans text-[16px] md:text-[17px] font-bold text-[#2C2028]">
                    외국인 배우자
                  </h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "외국인등록 사실증명서",
                    "본국 혼인관계 증명 서류",
                    "여권 사본",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-[15px] text-[#333333]"
                    >
                      <ClipboardList
                        size={14}
                        className="text-burgundy-400 flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 공통 필수 절차 */}
              <div className="bg-white rounded-xl p-4 md:p-7 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-2 mb-4 md:mb-5">
                  <div className="w-1 h-5 bg-burgundy-500 rounded-full" />
                  <h4 className="font-sans text-[16px] md:text-[17px] font-bold text-[#2C2028]">
                    공통 필수 절차
                  </h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "모든 외국어 서류의 번역 및 공증",
                    "아포스티유 (또는 영사확인)",
                    "해외 송달용 영문 주소",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-[15px] text-[#333333]"
                    >
                      <ClipboardList
                        size={14}
                        className="text-burgundy-400 flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
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
          <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-10 text-center">
            <div data-reveal>
              <p className="text-[20px] md:text-[26px] lg:text-[30px] text-white leading-[1.7] font-semibold">
                &ldquo;국제이혼은 어느 나라의 법을
                <br className="hidden md:block" />
                적용할 것인지의 판단에서 시작됩니다.
                <br className="hidden md:block" />그 판단이 곧 소송의
                전략이 됩니다.&rdquo;
              </p>
              <p className="text-[15px] text-[#C9A84C] tracking-wider">
                이혼소송총괄팀 김미루 팀장
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : TEAM LINK ═══════════ */}
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div data-reveal>
              <div className="bg-[#F8F4EE] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-3">
                    SPECIALIZED TEAM
                  </p>
                  <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028] mb-3 leading-tight">
                    이혼소송총괄팀
                  </h3>
                  <p className="text-[16px] md:text-[17px] text-[#444444] leading-[1.8] mb-2">
                    국제이혼을 포함한 이혼소송 전 과정을 총괄하며, 준거법
                    분석부터 외국 판결 승인까지 전담합니다.
                  </p>
                  <p className="text-[15px] text-burgundy-500 font-semibold">
                    김미루 팀장
                  </p>
                </div>
                <Link
                  href="/about/teams/divorce-general"
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
        <section className="bg-[#F8F4EE] py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-5 md:px-10 text-center">
            <div data-reveal>
              <h3 className="font-sans text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[#2C2028] mb-4 leading-tight">
                국경을 넘는 이혼 소송,
                <br />
                신세계로가 안전한 길을 제시합니다
              </h3>
              <p className="text-[16px] md:text-[17px] text-[#444444] leading-[1.8] mb-10 max-w-xl mx-auto">
                외국인 배우자와의 이혼, 해외 거주 중인 한국인 부부의
                이혼 등 수많은 성공 사례를 보유한
                신세계로법무법인이 복잡한 절차를 대행해 드립니다.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  aria-label={`국제이혼 상담 ${phone}`}
                  className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  <Phone size={18} />
                  {phone} 국제이혼 상담
                </a>
                <a
                  href="https://pf.kakao.com/_ExcxoAu/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle size={18} />
                  카카오톡 1:1 상담
                </a>
              </div>
            </div>
          </div>
        </section>
      </PracticeRevealWrapper>

    </div>
  );
}
