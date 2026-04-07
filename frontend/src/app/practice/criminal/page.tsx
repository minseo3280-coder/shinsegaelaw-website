import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Search,
  Lock,
  AlertTriangle,
  Baby,
  Coins,
  Shield,
  ShieldAlert,
  CheckCircle2,
  Smartphone,
  Eye,
  FileWarning,
  Gavel,
  Handshake,
  Home as HomeIcon,
  MessageSquareWarning,
  Banknote,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function CriminalPage() {
  const phone = firmData.main_phone || "1555-5961";

  return (
    <div className="">
      <SubPageHero
        titleKo="형사소송 안내"
        bannerImage="/images/office/banner-inheritance.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/criminal" },
          { label: "형사소송 안내" },
        ]}
      />

      <PracticeTabs />

      <PracticeRevealWrapper>
        {/* ═══════════ SECTION 1 : HERO HEADLINE ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div data-reveal className="max-w-5xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[2px] bg-burgundy-500" />
                <p className="text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                  가사 및 형사 소송
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6">
                가사관련 형사소송,
                <br />
                <span className="text-burgundy-500">전문적인 대응</span>이
                필요합니다.
              </h2>
              <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#333333] mb-4">
                이혼 및 가사 분쟁 과정에서 발생하는 형사 사건은 일반 형사
                사건과 결이 다릅니다. 감정적 대립이 법적 차별로 이어지지
                않도록, 초기부터 가사 전문 변호사의 조력을 받으십시오.
              </p>
              <p className="text-[17px] leading-[1.9] text-[#333333] mb-8">
                가사소송을 준비하거나 진행하는 과정에서 가정폭력, 금전 문제,
                정보 취득 과정의 불법 행위 등으로 형사 사건이 빈번하게
                발생합니다. 신세계로 형사사건팀은 민사와 형사가 교차하는 복합
                사건에서 의뢰인의 권리를 최우선으로 보호합니다.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
              >
                24시간 형사 긴급 대응팀 연결
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : 4가지 핵심 형사 분야 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
              data-reveal
            >
              {[
                {
                  icon: <Lock size={22} />,
                  title: "통신비밀보호법",
                  desc: "배우자의 외도 증거를 위한 녹음기 설치 및 도청 관련 고소·피의자 대응에 전문화된 법률 서비스를 제공합니다.",
                },
                {
                  icon: <AlertTriangle size={22} />,
                  title: "폭행·상해",
                  desc: "가정 내 폭력 및 상해 사건에서 증거수집, 접근금지 임시조치, 피해자보호명령 등 최적화된 조치로 안전을 보호합니다.",
                },
                {
                  icon: <Baby size={22} />,
                  title: "아동학대",
                  desc: "정서적 신체적 학대에 대한 피해아동 보호 및 부당한 아동학대 고소에 대한 체계적인 방어를 수행합니다.",
                },
                {
                  icon: <Coins size={22} />,
                  title: "횡령·배임",
                  desc: "공동 재산의 임의 인출, 상간자 이체 등 법인 자금 관련 형사 쟁점에 대하여 전문적인 도움을 드립니다.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  data-reveal
                  className="bg-white rounded-xl p-4 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-500 border-t-[3px] border-transparent hover:border-burgundy-500"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-3 md:mb-5">
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

        {/* ═══════════ SECTION 3 : 이혼 소송 중 빈번한 형사 쟁점 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                FREQUENT ISSUES
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-3">
                이혼 소송 중 빈번하게 발생하는 형사 쟁점
              </h3>
              <p className="text-[16px] text-[#444444] max-w-xl mx-auto">
                형사 처벌 기록은 친권, 양육권 및 위자료 산정에 결정적인 영향을
                미칩니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6" data-reveal>
              {[
                {
                  icon: <Shield size={22} />,
                  title: "가정폭력 및 상해",
                  desc: "부부간 다툼 중 발생한 신체적 접촉이 고소로 이어지는 경우입니다. 이는 유책배우자 판정 및 접근금지 명령의 근거가 됩니다.",
                },
                {
                  icon: <Smartphone size={22} />,
                  title: "정보통신망법 위반",
                  desc: "상대방의 휴대전화 잠금을 해제하여 메시지를 확인하거나, 위치추적기 설치, 외도 사실 유포 시 명예훼손 혐의를 받게 됩니다.",
                },
                {
                  icon: <Baby size={22} />,
                  title: "아동복지법(아동학대)",
                  desc: "훈육의 범위를 넘어서는 행위나 정서적 학대로 고소당하는 경우로, 친권 및 양육권을 상실할 수 있는 가장 치명적인 혐의입니다.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#F8F4EE] rounded-xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-5">
                    {item.icon}
                  </div>
                  <h4 className="font-sans text-[18px] font-bold text-[#2C2028] mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[16px] leading-[1.8] text-[#444444]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : 불법 증거 수집 경고 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT: 경고 메시지 */}
              <div data-reveal>
                <div className="flex items-center gap-2 mb-5">
                  <ShieldAlert size={16} className="text-burgundy-500" />
                  <p className="text-[14px] font-bold text-burgundy-500">
                    증거 위험 경고
                  </p>
                </div>
                <h3 className="font-sans text-[28px] md:text-[34px] font-bold text-[#2C2028] mb-6 leading-tight">
                  &ldquo;증거를 찾으려다
                  <br />
                  <span className="text-burgundy-500">
                    범죄자가 될 수 있습니다.
                  </span>
                  &rdquo;
                </h3>
                <p className="text-[17px] leading-[1.9] text-[#333333] mb-8">
                  승소하고 싶은 간절한 마음에 신중한 방법이 오히려 형사 처벌의
                  대상이 될 수 있습니다. 불법적으로 수집한 증거는 재판에서
                  증거 능력을 잃을 뿐만 아니라, 의뢰인을 전과자로 만들
                  위험이 큽니다.
                </p>

                <div className="space-y-3">
                  {[
                    "배우자 몰래 사생활에 위치추적기 설치",
                    "잠긴 스마트폰을 몰래 열어 메신저 확인",
                    "집 안에 몰래 녹음기나 카메라 설치",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-[15px] text-[#333333]"
                    >
                      <AlertTriangle
                        size={14}
                        className="text-burgundy-400 flex-shrink-0"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: 주요 처벌 리스크 + 디지털 범죄 대응 */}
              <div data-reveal>
                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-6">
                  <h4 className="font-sans text-[18px] font-bold text-[#2C2028] mb-5">
                    주요 처벌 리스크
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        label: "타인 간 대화 도청",
                        penalty: "1년 이상 10년 이하 징역",
                      },
                      {
                        label: "메신저 무단 접속",
                        penalty:
                          "5년 이하 징역 또는 5천만 원 벌금",
                      },
                      {
                        label: "위치추적기 부착",
                        penalty:
                          "3년 이하 징역 또는 3천만 원 벌금",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-burgundy-500 mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <span className="text-[15px] font-bold text-[#2C2028]">
                            {item.label}
                          </span>
                          <span className="text-[15px] text-[#444444]">
                            {" "}
                            — {item.penalty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 mt-6 text-[15px] font-semibold text-burgundy-500 border border-burgundy-200 px-5 py-2.5 rounded-full hover:bg-burgundy-500 hover:text-white hover:border-burgundy-500 transition-colors duration-300"
                  >
                    증거 효력 적법성 상담하기
                  </Link>
                </div>

                {/* 디지털 범죄 대응 */}
                <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                  <h4 className="font-sans text-[16px] font-bold text-[#2C2028] mb-4">
                    디지털 범죄 대응
                  </h4>
                  <p className="text-[13px] text-[#444444] mb-4">
                    디지털 범죄 및 개인정보 보호법
                  </p>
                  <div className="space-y-3">
                    <div className="bg-burgundy-50 rounded-lg p-4 border border-burgundy-100">
                      <p className="text-[14px] font-bold text-burgundy-600 mb-1">
                        개인정보보호법 위반
                      </p>
                      <p className="text-[13px] leading-[1.7] text-[#333333]">
                        타인에게 배우자의 도촉 결과를 누구든 개인 정보를
                        금융정보 등 무단으로 조회 시 형사 책임을 지게 됩니다.
                      </p>
                    </div>
                    <div className="bg-burgundy-50 rounded-lg p-4 border border-burgundy-100">
                      <p className="text-[14px] font-bold text-burgundy-600 mb-1">
                        정보통신망법 위반
                      </p>
                      <p className="text-[13px] leading-[1.7] text-[#333333]">
                        잠금장치 된 핸드폰이나 컴퓨터에 접근하여 카톡 등의
                        내용을 확인하는 것만으로도 5년 이하의 징역 형량이
                        가능합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : 7가지 형사소송 유형 상세 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-burgundy-500 mb-4">
                중점 대응 형사 사건
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-3">
                7가지 가사관련 형사소송 유형
              </h3>
              <p className="text-[16px] text-[#444444] max-w-xl mx-auto">
                신세계로는 특히 가사·민사 소송과 연계된 형사 사건에 강점을
                보유하고 있습니다.
              </p>
            </div>

            {/* 상단 4개: 대형 카드 */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6"
              data-reveal
            >
              {[
                {
                  icon: <HomeIcon size={22} />,
                  title: "가정폭력 및 아동학대",
                  desc: "임시조치, 보호명령 신청부터 형사 고소 대리 또는 방어까지 가족 간의 갈등에서 발생하는 폭력 사태에 대해 의뢰인의 안전과 법적 보호를 우선합니다.",
                  focus: "피해자 보호 및 가해자 방어 조력",
                  details: [
                    "진단서·CCTV·목격자 진술 등 증거 체계적 확보",
                    "접근금지 임시조치, 피해자보호명령 긴급 신청",
                    "형사 결과가 양육권·위자료에 미치는 영향 분석",
                  ],
                },
                {
                  icon: <MessageSquareWarning size={22} />,
                  title: "명예훼손 및 모욕",
                  desc: "상간자 소송 중 발생하는 SNS 유포, 주변인 폭로 등 명예훼손에 대한 강력한 고소 대응 및 반박 논리를 수행합니다.",
                  focus: "진위 가능성 부정 및 공공이익 입증",
                  details: [
                    "허위사실 유포 시 형사 고소 + 민사 손해배상 병행",
                    "외도 사실 유포 시 명예훼손 성립 여부 판단",
                    "악의적 허위사실 유포에 대한 반소 전략",
                  ],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#F8F4EE] rounded-xl p-5 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-3 md:mb-5">
                    {item.icon}
                  </div>
                  <h4 className="font-sans text-[17px] md:text-[20px] font-bold text-[#2C2028] mb-2 md:mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[15px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#333333] mb-3 md:mb-4">
                    {item.desc}
                  </p>
                  <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                    {item.details.map((d, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-[14px] md:text-[14px] text-[#444444]"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-burgundy-400 mt-0.5 flex-shrink-0"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] md:text-[13px] font-semibold text-burgundy-500">
                    FOCUS: {item.focus}
                  </p>
                </div>
              ))}
            </div>

            {/* 하단 2개: 대형 카드 */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6"
              data-reveal
            >
              {[
                {
                  icon: <Banknote size={22} />,
                  title: "재산 범죄 (횡령·배임)",
                  desc: "이혼 과정 중 부부 공동 재산의 임의 처분으로 발생하는 횡령 의무나 기업/상가 운영 중 발생하는 경제 범죄에 대한 전문적 변호를 제공합니다.",
                  focus: "불법영득의사 부정 및 자금 흐름 소명",
                  details: [
                    "금융거래 내역 분석, 자금 흐름 추적",
                    "형사 고소를 통한 재산분할 협상 전략",
                    "배우자 몰래 상간자 이체 시 횡령 입증/방어",
                  ],
                },
                {
                  icon: <Lock size={22} />,
                  title: "통신비밀보호법·정보통신망법",
                  desc: "불법 녹음, 도청, 잠금 해제 등 증거 확보 과정의 위법성 관련 고소·피의자 대응을 전담합니다. 디지털 증거의 적법성에 관한 전문적인 법률 자문을 제공합니다.",
                  focus: "증거 적법성 판단 및 민사 연계 전략",
                  details: [
                    "통비법 위반 피해자 대리: 집행유예 이상 처벌 조력",
                    "통비법 위반 피의자: 기소유예·불기소 처분 대응",
                    "증거 확보 과정의 위법성이 이혼소송 승패에 미치는 영향 분석",
                  ],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#F8F4EE] rounded-xl p-5 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-3 md:mb-5">
                    {item.icon}
                  </div>
                  <h4 className="font-sans text-[17px] md:text-[20px] font-bold text-[#2C2028] mb-2 md:mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[15px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#333333] mb-3 md:mb-4">
                    {item.desc}
                  </p>
                  <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                    {item.details.map((d, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-[14px] md:text-[14px] text-[#444444]"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-burgundy-400 mt-0.5 flex-shrink-0"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] md:text-[13px] font-semibold text-burgundy-500">
                    FOCUS: {item.focus}
                  </p>
                </div>
              ))}
            </div>

            {/* 나머지 3개: 콤팩트 카드 */}
            <div
              className="grid md:grid-cols-3 gap-5"
              data-reveal
            >
              {[
                {
                  icon: <Eye size={18} />,
                  title: "개인정보보호법 위반",
                  desc: "가정 내 CCTV 영상 외부 유출, 위치추적 앱 설치, 금융정보 무단 조회 등 디지털 환경에서의 개인정보 침해에 대응합니다.",
                },
                {
                  icon: <FileWarning size={18} />,
                  title: "사문서위조 및 동행사",
                  desc: "배우자의 인감을 도용한 대출 서류 작성, 동의 없는 혼인신고, 상속재산 임의 매각을 위한 위임장 위조 등에 대응합니다.",
                },
                {
                  icon: <Baby size={18} />,
                  title: "아동학대 (전문 대응)",
                  desc: "피해아동 대리 고소와 양육권 확보를 위한 부당한 아동학대 신고 방어를 모두 수행합니다. 아동 보호가 최우선입니다.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-sans text-[16px] font-bold text-[#2C2028] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[14px] leading-[1.7] text-[#444444]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 6 : 체계적인 형사 대응 서비스 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-3">
                체계적인 형사 대응 서비스
              </h3>
              <p className="text-[16px] text-[#444444]">
                수사 개시 시점부터 신속한 전략 수립이 핵심입니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6" data-reveal>
              {[
                {
                  icon: <Shield size={24} />,
                  title: "수사 단계 밀착 방어",
                  desc: "경찰/검찰 조사 동행 및 진술 교정, 보임자리안 수사에 대한 이의제기를 통해 본소처 및 무혐의를 이끌어냅니다.",
                },
                {
                  icon: <Gavel size={24} />,
                  title: "공판 단계 최적 변론",
                  desc: "철저한 기록 분석과 증거 조사, 법리적 변론을 통해 무죄 선고 또는 의뢰인의 양형 사유를 극대화합니다.",
                },
                {
                  icon: <Handshake size={24} />,
                  title: "피해자 합의 대행",
                  desc: "의뢰인을 대신하여 피해자와의 원만한 합의를 이끌어내며 처벌 감면 및 감형을 위한 실질적 조치를 제공합니다.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mx-auto mb-5">
                    {item.icon}
                  </div>
                  <h4 className="font-sans text-[18px] font-bold text-[#2C2028] mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[16px] leading-[1.8] text-[#444444]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : 왜 통합 대응이 필수인가 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-3">
                왜 &lsquo;통합 대응&rsquo;이 필수적인가?
              </h3>
              <p className="text-[16px] text-[#444444]">
                가사와 형사가 분리될 때 발생하는 리스크를 최소화해야 합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-14" data-reveal>
              {[
                {
                  icon: <Eye size={22} />,
                  title: "증거의 상호 보완성",
                  desc: "형사 사건에서 확보된 증거와 수사 기록은 가사 재판에서 유책 사유를 입증하는 가장 강력한 무기가 됩니다.",
                },
                {
                  icon: <Baby size={22} />,
                  title: "양육권 확보의 우위",
                  desc: "상대방의 형사 처벌 이력은 자녀의 복리를 결정하는 가사 법원 심판에서 결정적인 결격 사유로 작용합니다.",
                },
                {
                  icon: <Banknote size={22} />,
                  title: "위자료 극대화 전략",
                  desc: "불법행위에 따른 형사 합의금과 가사 재판상 위자료를 전략적으로 배분하여 의뢰인의 실익을 최대화합니다.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#F8F4EE] rounded-xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-5">
                    {item.icon}
                  </div>
                  <h4 className="font-sans text-[18px] font-bold text-[#2C2028] mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[16px] leading-[1.8] text-[#444444]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 원스톱 협업 체계 4단계 */}
            <div className="grid lg:grid-cols-2 gap-10 items-center" data-reveal>
              <div>
                <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-burgundy-500 mb-4">
                  시너지 시스템
                </p>
                <h3 className="font-sans text-[24px] md:text-[28px] font-bold text-[#2C2028] mb-4 leading-tight">
                  신세계로의 가사-형사
                  <br />
                  원스톱 협업 체계
                </h3>
                <p className="text-[16px] text-[#444444] leading-[1.8]">
                  한 명의 변호사가 아닌, 두 분야의 전문가가 팀을 이뤄 동시에
                  대응합니다.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    num: "01",
                    title: "초기 긴급 대응",
                    desc: "가해자 격리 조치 및 신변 보호 요청, 증거 보전 신청 동시 진행",
                  },
                  {
                    num: "02",
                    title: "수사 단계 밀착",
                    desc: "형사 고소장 접수 및 조사 동석, 유리한 진술 방향 설정",
                  },
                  {
                    num: "03",
                    title: "가사 소송 병행",
                    desc: "형사 결과 인용하여 이혼 청구 및 가압류 가처분 즉시 집행",
                  },
                  {
                    num: "04",
                    title: "최종 권익 확보",
                    desc: "양육권 판결 확정 및 재산분할·위자료 강제 집행 마무리",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center bg-[#F8F4EE] rounded-xl p-4 md:p-6 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                  >
                    <span className="text-[22px] md:text-[28px] font-bold text-burgundy-500/30 leading-none mb-2 md:mb-3">
                      {item.num}
                    </span>
                    <h4 className="text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-1.5 md:mb-2">
                      {item.title}
                    </h4>
                    <p className="text-[12px] md:text-[14px] leading-[1.6] text-[#3A3238]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 8 : 주요 성공 사례 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-3">
                주요 성공 사례
              </h3>
              <p className="text-[16px] text-[#444444]">
                신세계로의 가사·형사 통합 대응으로 의뢰인의 권리를 지켜낸
                결과입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" data-reveal>
              {/* 사례 1 */}
              <div className="bg-white rounded-xl p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="flex gap-2 mb-3 md:mb-4">
                  <span className="text-[11px] md:text-[12px] font-bold text-white bg-burgundy-500 px-2.5 py-1 rounded-full">
                    #아동학대무혐의
                  </span>
                  <span className="text-[11px] md:text-[12px] font-bold text-burgundy-500 bg-burgundy-50 px-2.5 py-1 rounded-full">
                    #양육권확보
                  </span>
                </div>
                <h4 className="font-sans text-[16px] md:text-[18px] font-bold text-[#2C2028] mb-3 md:mb-4 leading-tight">
                  상대방의 허위 아동학대 고소로부터 무혐의 이끌어낸 후 양육권
                  판결
                </h4>
                <p className="text-[14px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#333333]">
                  의뢰인은 상대방으로부터 자녀 정서적 학대로 고소당했으나,
                  평소 자녀와의 유대관계를 입증하는 증거를 가사 소송팀과
                  협력하여 제출, 형사 무혐의를 받아냈으며 이를 통해 이혼
                  소송에서 양육권자로 지정되었습니다.
                </p>
              </div>

              {/* 사례 2 */}
              <div className="bg-white rounded-xl p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="flex gap-2 mb-3 md:mb-4">
                  <span className="text-[11px] md:text-[12px] font-bold text-white bg-burgundy-500 px-2.5 py-1 rounded-full">
                    #가정폭력방어
                  </span>
                  <span className="text-[11px] md:text-[12px] font-bold text-burgundy-500 bg-burgundy-50 px-2.5 py-1 rounded-full">
                    #위자료감액
                  </span>
                </div>
                <h4 className="font-sans text-[16px] md:text-[18px] font-bold text-[#2C2028] mb-3 md:mb-4 leading-tight">
                  일방적인 가정폭력 피해 주장을 반박하여 과도한 위자료 청구
                  방어
                </h4>
                <p className="text-[14px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#333333]">
                  상대방의 과장된 폭행 고소에 대하여 정당방위 및 당시 상황의
                  맥락을 논리적으로 입증하여 기소유예 처분을 받아내고, 가사
                  재판부로 하여금 상대방의 귀책 사유를 인정받아 위자료를 70%
                  이상 감액하였습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 9 : 3대 핵심 원칙 + 대응 타임라인 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT: 3대 핵심 원칙 */}
              <div data-reveal>
                <div className="flex items-center gap-2 mb-5">
                  <Shield size={16} className="text-burgundy-500" />
                  <p className="text-[14px] font-bold text-burgundy-500">
                    DEFENSE STRATEGY
                  </p>
                </div>
                <h3 className="font-sans text-[24px] md:text-[28px] font-bold text-[#2C2028] mb-8 leading-tight">
                  형사 사건 대응의
                  <br />
                  3대 핵심 원칙
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      num: "1",
                      title: "경찰 조사 첫 입회 필수",
                      desc: "첫 조사에 기록된 진술은 번복하기 매우 어렵습니다. 변호인 입회 하에 유리한 사실관계만 명확히 진술해야 합니다.",
                    },
                    {
                      num: "2",
                      title: "객관적 증거의 선제적 확보",
                      desc: "CCTV, 통화 녹취, 카드 내역 등 시간이 지나면 사라질 증거들을 수사기관보다 먼저 확보하여야 제출해야 합니다.",
                    },
                    {
                      num: "3",
                      title: "합의 대행 및 처벌 불원 유도",
                      desc: "피해자와의 직접 접촉은 위험합니다. 전문 변호인이 중재하여 원만한 합의와 처벌 불원서를 이끌어냅니다.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded-full bg-burgundy-500 flex items-center justify-center text-white flex-shrink-0 text-[16px] font-bold">
                        {item.num}
                      </div>
                      <div>
                        <p className="text-[16px] font-bold text-[#2C2028] mb-1">
                          {item.title}
                        </p>
                        <p className="text-[16px] leading-[1.8] text-[#444444]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: 대응 타임라인 */}
              <div data-reveal>
                <div className="bg-[#F8F4EE] rounded-2xl p-5 md:p-10">
                  <h4 className="font-sans text-[20px] font-bold text-[#2C2028] mb-8 text-center">
                    신세계로 형사 대응 타임라인
                  </h4>

                  <div className="space-y-6">
                    {[
                      {
                        phase: "1단계",
                        title: "사건 분석 및 증거 수집",
                        desc: "상담 즉시 전담팀 구성, 현장 조사 및 관련 증거 즉시 확보",
                        active: true,
                      },
                      {
                        phase: "2단계",
                        title: "수사 입회 및 의견서 제출",
                        desc: "피의자 신문 참여, 수사관과의 소통을 통한 무혐의/기소유예 유도",
                        active: false,
                      },
                      {
                        phase: "3단계",
                        title: "공판 절차 및 최후 변론",
                        desc: "치밀한 법리 공방과 증인 신문을 통해 무죄 또는 선처 확보",
                        active: false,
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div
                          className={`w-3 h-3 rounded-full flex-shrink-0 mt-2 ${
                            item.active
                              ? "bg-burgundy-500"
                              : "bg-[#C9A84C]"
                          }`}
                        />
                        <div>
                          <p
                            className={`text-[14px] font-bold mb-1 ${
                              item.active
                                ? "text-burgundy-500"
                                : "text-[#C9A84C]"
                            }`}
                          >
                            {item.phase}: {item.title}
                          </p>
                          <p className="text-[14px] leading-[1.7] text-[#444444]">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-white rounded-lg p-4 text-center">
                    <p className="text-[14px] text-[#333333] italic">
                      &ldquo;검찰 출신 변호사 및 형사 전문 변호인단이
                      <br />
                      직접 사건을 수행합니다.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 10 : QUOTE BAND ═══════════ */}
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
                &ldquo;가사분쟁에서 파생된 형사사건일수록,
                <br className="hidden md:block" />
                민사 전략과의 정합성을 갖춘
                <br className="hidden md:block" />
                전문적인 대응이 반드시 필요합니다.&rdquo;
              </p>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-6 mb-4" />
              <p className="text-[15px] text-[#C9A84C] tracking-wider">
                형사사건팀 이명인 팀장
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 11 : TEAM LINK ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div data-reveal>
              <div className="bg-[#F8F4EE] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-3">
                    SPECIALIZED TEAM
                  </p>
                  <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028] mb-3 leading-tight">
                    형사사건팀
                  </h3>
                  <p className="text-[16px] md:text-[17px] text-[#444444] leading-[1.8] mb-2">
                    가족법 맥락에서 형사 대응을 설계하는 전문팀입니다. 민사
                    전략과의 정합성을 갖춘 통합적 대응으로 최적의 결과를
                    도출합니다.
                  </p>
                  <p className="text-[15px] text-burgundy-500 font-semibold">
                    이명인 팀장
                  </p>
                </div>
                <Link
                  href="/about/teams/criminal"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 whitespace-nowrap"
                >
                  팀 소개 보기
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 12 : CTA ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div data-reveal>
              <h3 className="font-sans text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#2C2028] mb-4 leading-tight">
                골든타임을 놓치지 마십시오.
                <br />
                형사 소송은{" "}
                <span className="text-burgundy-500">
                  &lsquo;속도&rsquo;
                </span>
                입니다.
              </h3>
              <p className="text-[16px] md:text-[17px] text-[#444444] leading-[1.8] mb-10 max-w-xl mx-auto">
                수사 기관의 첫 연락을 받은 즉시 변호사를 선임하는 것이 가장
                유리합니다. 작은 실수 하나가 돌이킬 수 없는 결과로 이어지지
                않도록 지금 상담하세요.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  aria-label={`24시간 형사 긴급 대응팀 연결 ${phone}`}
                  className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  <Phone size={18} />
                  24시간 형사 긴급 대응팀 연결
                </a>
                <a
                  href="https://pf.kakao.com/_ExcxoAu/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
                >
                  <Search size={18} />
                  1:1 비밀 법률 자문
                </a>
              </div>
            </div>
          </div>
        </section>
      </PracticeRevealWrapper>

    </div>
  );
}
