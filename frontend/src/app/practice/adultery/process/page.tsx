import Link from "next/link";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Building2,
  Landmark,
  ShieldAlert,
  Clock,
  Search,
  Briefcase,
  GraduationCap,
  Smartphone,
  CreditCard,
  Home,
  Banknote,
  Wallet,
  CircleDollarSign,
  Timer,
  Scale,
  Eye,
  MessageSquare,
  Ban,
  Fingerprint,
  Monitor,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function AdulteryProcessPage() {
  const phone = firmData.main_phone || "1555-5961";

  return (
    <div className="">
      <SubPageHero
        titleKo="소송 절차·주의점"
        bannerImage="/images/office/banner-adultery.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/adultery" },
          { label: "소송 절차·주의점" },
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
                  PROCEDURE & PRECAUTIONS
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6">
                상간자소송,
                <br />
                <span className="text-burgundy-500">절차와 주의점</span>을
                알아야 합니다.
              </h2>
              <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#333333] mb-8">
                감정적인 대응보다 중요한 것은 치밀한 법적 프로세스입니다. 소장
                접수부터 판결금 확보까지, 승소를 위한 핵심 전략과 반드시 체크해야
                할 주의사항을 안내해 드립니다.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
              >
                무료 사건 분석 요청
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : 6단계 소송 절차 타임라인 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                LITIGATION PROCESS
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-3">
                상간자 소송 6단계 절차
              </h3>
              <p className="text-[16px] text-[#444444] max-w-xl mx-auto">
                소장 접수부터 판결 선고까지, 각 단계별 예상 소요 기간과 핵심
                사항을 안내합니다.
              </p>
            </div>

            <div
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
              data-reveal
            >
              {[
                {
                  step: "STEP 01",
                  icon: <FileText size={22} />,
                  title: "소장 작성 및 접수",
                  time: "1~2주",
                  desc: "부정행위 사실에 대해 기재하고 정신적 고통에 따른 위자료 배상을 청구하는 소장을 작성하여 관할 법원에 접수합니다.",
                  highlight: true,
                },
                {
                  step: "STEP 02",
                  icon: <Clock size={22} />,
                  title: "소장 송달",
                  time: "2~3주",
                  desc: "관할 법원이 피고(상간자)에게 소장 부본을 우편으로 송달합니다. 주소를 모를 경우 사실조회를 통해 주소지를 파악한 후 진행합니다.",
                },
                {
                  step: "STEP 03",
                  icon: <MessageSquare size={22} />,
                  title: "답변서 제출",
                  time: "30일 이내",
                  desc: "피고는 소장을 받은 날로부터 30일 이내에 답변서를 제출해야 합니다. 무대응 시 원고의 주장을 모두 인정한 것으로 간주됩니다.",
                },
                {
                  step: "STEP 04",
                  icon: <Scale size={22} />,
                  title: "변론기일",
                  time: "2~4개월",
                  desc: "법정에서 양측의 주장을 듣고 증거를 조사합니다. 변호사 선임 시 당사자가 직접 출석하지 않아도 무방합니다.",
                },
                {
                  step: "STEP 05",
                  icon: <Users size={22} />,
                  title: "조정 (합의 절차)",
                  time: "1개월 내외",
                  desc: "원고와 피고 사이에 합의가 가능한지 타진합니다. 위자료 액수나 비밀유지 조항 등을 합의하여 조기에 종결할 수 있습니다.",
                },
                {
                  step: "STEP 06",
                  icon: <CheckCircle2 size={22} />,
                  title: "판결 선고",
                  time: "판결 확정",
                  desc: "합의에 이르지 못하면 재판부가 최종 위자료 액수를 결정하여 판결을 내립니다. 소송 비용 부담 비율도 함께 정해집니다.",
                  highlight: true,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  data-reveal
                  className={`bg-white rounded-xl p-4 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-500 relative overflow-hidden ${
                    item.highlight
                      ? "border-t-[3px] border-burgundy-500"
                      : "border-t-[3px] border-transparent hover:border-burgundy-500"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <p
                      className={`text-[11px] md:text-[13px] font-bold tracking-wider ${
                        item.highlight
                          ? "text-burgundy-500"
                          : "text-[#C9A84C]"
                      }`}
                    >
                      {item.step}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] md:text-[13px] font-semibold text-[#444444] bg-gray-50 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full">
                      <Timer size={12} />
                      {item.time}
                    </span>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-3 md:mb-4">
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

            {/* 100% 대리 안내 */}
            <div className="mt-8 text-center" data-reveal>
              <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <CheckCircle2 size={18} className="text-burgundy-500" />
                <p className="text-[15px] text-[#333333]">
                  변호사 선임 시{" "}
                  <span className="font-bold text-burgundy-500">
                    소장 작성부터 판결까지 100% 대리
                  </span>{" "}
                  가능 · 평균 소요기간{" "}
                  <span className="font-bold">6~12개월</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3 : 인적사항 특정 (3가지 핵심 경로) ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT: 인적사항 특정 설명 */}
              <div data-reveal>
                <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  IDENTIFICATION
                </p>
                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  이름과 번호만 알아도
                  <br />
                  상간자의 인적사항 특정이
                  <br />
                  가능합니다.
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-8">
                  소송을 위해서는 상대의 성명, 주민등록번호, 주소가 필요합니다.
                  단서가 부족하더라도 법원의 사실조회 명령을 통해 합법적으로
                  파악할 수 있습니다.
                </p>

                {/* 사실조회 안내 박스 */}
                <div className="bg-burgundy-50 rounded-xl p-6 border border-burgundy-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Search size={16} className="text-burgundy-500" />
                    <p className="text-[15px] font-bold text-burgundy-600">
                      법원 사실조회 명령
                    </p>
                  </div>
                  <p className="text-[14px] leading-[1.7] text-[#333333]">
                    소장을 접수하면 법원을 통해 통신사, 은행, 직장 등에
                    사실조회를 신청할 수 있으며, 이는 완전히 합법적인
                    절차입니다.
                  </p>
                </div>
              </div>

              {/* RIGHT: 조회 가능한 3가지 핵심 경로 */}
              <div data-reveal>
                <div className="space-y-4">
                  {/* 경로 1: 휴대폰 번호 */}
                  <div className="bg-[#F8F4EE] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-burgundy-500 flex items-center justify-center text-white flex-shrink-0">
                        <PhoneCall size={18} />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-burgundy-500">
                          경로 01
                        </p>
                        <h4 className="font-sans text-[16px] font-bold text-[#2C2028]">
                          휴대폰 번호 조회
                        </h4>
                      </div>
                    </div>
                    <p className="text-[16px] leading-[1.8] text-[#333333] mb-3">
                      전화번호를 근거로 통신 3사에 가입자 정보 조회를
                      요청합니다.
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "가입자 성명 및 주민등록번호",
                        "등록 주소지 확인",
                        "가입 통신사 및 요금 납부 정보",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[14px] text-[#444444]"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-burgundy-400 mt-0.5 flex-shrink-0"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 경로 2: 계좌/카드 번호 */}
                  <div className="bg-[#F8F4EE] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-burgundy-500 flex items-center justify-center text-white flex-shrink-0">
                        <Landmark size={18} />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-burgundy-500">
                          경로 02
                        </p>
                        <h4 className="font-sans text-[16px] font-bold text-[#2C2028]">
                          계좌·카드 번호 조회
                        </h4>
                      </div>
                    </div>
                    <p className="text-[16px] leading-[1.8] text-[#333333] mb-3">
                      계좌번호를 알고 있다면 은행을 통해 명의자 정보를
                      확보합니다.
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "예금주 성명 및 주민등록번호",
                        "카드 결제 명의자 확인",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[14px] text-[#444444]"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-burgundy-400 mt-0.5 flex-shrink-0"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 경로 3: 직장 및 차량번호 */}
                  <div className="bg-[#F8F4EE] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-burgundy-500 flex items-center justify-center text-white flex-shrink-0">
                        <Building2 size={18} />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-burgundy-500">
                          경로 03
                        </p>
                        <h4 className="font-sans text-[16px] font-bold text-[#2C2028]">
                          직장 및 차량번호 조회
                        </h4>
                      </div>
                    </div>
                    <p className="text-[16px] leading-[1.8] text-[#333333] mb-3">
                      근무지를 아는 경우 해당 법인에 인적사항 확인을 요청할 수
                      있습니다.
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "재직 여부 및 직원 인적사항",
                        "차량 등록 명의자 확인",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[14px] text-[#444444]"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-burgundy-400 mt-0.5 flex-shrink-0"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : 별거 중 상간자 소송 주의 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT */}
              <div data-reveal>
                <div className="flex items-center gap-2 mb-5">
                  <AlertTriangle size={18} className="text-burgundy-500" />
                  <p className="text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                    CAUTION
                  </p>
                </div>
                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  별거 중 상간자 소송,
                  <br />
                  <span className="text-burgundy-500">인과관계</span>가
                  핵심입니다.
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-6">
                  부부 관계가 이미 파탄 난 상태에서의 외도는 법적 보호를 받기
                  어려울 수 있습니다. 상간자 위자료 소송은 부정행위와 혼인파탄
                  사이에 인과관계가 인정되어야 하는 소송입니다.
                </p>
                <p className="text-[17px] leading-[1.9] text-[#333333]">
                  장기간 별거 중에 상간자를 만났다면, 그것과 혼인관계 파탄은
                  인과관계가 없다고 볼 가능성이 매우 높으며, 이 경우 소송을
                  제기하기 어렵습니다.
                </p>
              </div>

              {/* RIGHT */}
              <div data-reveal>
                <div className="space-y-5">
                  <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <p className="text-[16px] font-bold text-[#2C2028] mb-2">
                      혼인 파탄과의 인과관계
                    </p>
                    <p className="text-[16px] leading-[1.8] text-[#333333]">
                      장기간 별거 중이거나 이미 이혼 절차를 밟고 있던 중 발생한
                      부정행위는 상간자의 행위로 인해 가정이 깨졌다고 보기
                      어렵다는 것이 법원의 태도입니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <p className="text-[16px] font-bold text-[#2C2028] mb-2">
                      소송 가능 여부 판단
                    </p>
                    <p className="text-[16px] leading-[1.8] text-[#333333]">
                      별거의 원인이 배우자의 외도였는지, 아니면 그 전부터 관계가
                      소원했는지에 따라 승소 가능성이 크게 달라집니다. 전문가와
                      반드시 사전 진단이 필요합니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-[14px] leading-[1.6] text-[#444444]">
                      * 단순히 주거지가 다른 주말부부나 일시적 가출은 별거로
                      간주되지 않습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : 기혼 사실 인지 여부 증명 (3카드) ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-burgundy-500 mb-4">
                핵심 요건
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-3">
                기혼임을 알았다는 사실,
                <br />
                어떻게 증명할까요?
              </h3>
              <p className="text-[16px] text-[#444444] max-w-xl mx-auto">
                상대방과의 관계 및 만남 경로에 따라 입증 방식이 달라집니다.
              </p>
            </div>

            <div
              className="grid md:grid-cols-3 gap-6 mb-10"
              data-reveal
            >
              {/* 카드 1: 직장 내 관계 */}
              <div className="bg-[#F8F4EE] rounded-xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-5">
                  <Briefcase size={22} />
                </div>
                <h4 className="font-sans text-[18px] font-bold text-[#2C2028] mb-3">
                  직장 내 관계
                </h4>
                <p className="text-[16px] leading-[1.8] text-[#333333] mb-5">
                  같은 직장 동료라면 관혼상제 참석 여부, 사내 메신저, 가족 동반
                  행사 등을 통해 기혼 사실 인지 여부를 쉽게 주장할 수 있습니다.
                </p>
                <ul className="space-y-2">
                  {[
                    "사내 메신저 대화 내용",
                    "경조사 축의금 명부 확인",
                    "동료들의 증언 및 사실확인",
                    "사내 인트라넷 가족 수당 확인",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[14px] text-[#444444]"
                    >
                      <span className="text-burgundy-400 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 카드 2: 동창·지인 관계 */}
              <div className="bg-[#F8F4EE] rounded-xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-5">
                  <GraduationCap size={22} />
                </div>
                <h4 className="font-sans text-[18px] font-bold text-[#2C2028] mb-3">
                  동창·지인 관계
                </h4>
                <p className="text-[16px] leading-[1.8] text-[#333333] mb-5">
                  오랜 친구나 사적 지인인 경우, 동창회 모임이나 SNS상의 가족
                  사진 노출 등을 통해 인지 여부를 입증합니다.
                </p>
                <ul className="space-y-2">
                  {[
                    "과거 SNS 게시물 확인",
                    "동창 단톡방 대화 캡처",
                    "결혼식 수전 연도 및 참석 여부",
                    "배우자 만남 대화 분석",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[14px] text-[#444444]"
                    >
                      <span className="text-burgundy-400 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 카드 3: 채팅 앱 및 단기 만남 */}
              <div className="bg-[#F8F4EE] rounded-xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-5">
                  <Smartphone size={22} />
                </div>
                <h4 className="font-sans text-[18px] font-bold text-[#2C2028] mb-3">
                  채팅 앱 및 단기 만남
                </h4>
                <p className="text-[16px] leading-[1.8] text-[#333333] mb-5">
                  가장 입증이 어려운 경우입니다. 다만 &ldquo;몰랐다&rdquo;고
                  거짓말을 한 기록이 있다면 대화 속 모순점을 찾아내야 합니다.
                </p>
                <ul className="space-y-2">
                  {[
                    "프로필 사진의 위치/가정 관련 흔적",
                    "대화 수건 연도 및 심층 탐색",
                    "배우자 만남 대화 분석",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[14px] text-[#444444]"
                    >
                      <span className="text-burgundy-400 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 6 : 거짓말을 증거로 만드는 기술 + 실제 승소 판례 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT: 거짓말 → 증거 기술 */}
              <div data-reveal>
                <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-burgundy-500 mb-4">
                  중요한 증거
                </p>
                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  상간자의 &lsquo;거짓말&rsquo;을
                  <br />
                  법적 증거로 만드는 기술
                </h3>
                <p className="text-[17px] leading-[1.9] text-[#333333] mb-8">
                  많은 상간자들이 &ldquo;기혼인 줄 몰랐다&rdquo;고 발뺌합니다.
                  하지만 법원은 상식적인 수준에서 기혼 사실을 알 수 있었는지를
                  종합적으로 판단합니다. 신세계로는 한낱의 순간, 작은 대화
                  조각도 하나도 놓치지 않습니다.
                </p>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="w-10 h-10 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 flex-shrink-0">
                      <Fingerprint size={18} />
                    </div>
                    <div>
                      <p className="text-[16px] font-bold text-burgundy-500 mb-1">
                        삼각적 허점 공략
                      </p>
                      <p className="text-[14px] leading-[1.7] text-[#444444]">
                        상간자가 우연히 대화나 행동에서 기혼 사실을 이미 알고
                        있었다는 행동을 반복적으로 구성합니다.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="w-10 h-10 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 flex-shrink-0">
                      <Monitor size={18} />
                    </div>
                    <div>
                      <p className="text-[16px] font-bold text-burgundy-500 mb-1">
                        디지털 포렌식 분석
                      </p>
                      <p className="text-[14px] leading-[1.7] text-[#444444]">
                        메신저 배우자 이력과 기존 등록 증폭 문제와의 연결 상관
                        관계를 체계적으로 분석합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: 실제 승소 판례 3카드 */}
              <div data-reveal>
                <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  실제 승소 판례: 고의성 입증 사례
                </p>

                <div className="space-y-4">
                  {[
                    {
                      badge: "사례 1",
                      title: "직장 동료 간의 부정행위",
                      desc: "상간자와 기혼 사실을 상호 인식했으나 부정행위를 수행했으므로, 무거운 과실이 있다 보아 위자료 청구가 인정되었습니다. 직장 내 경조사 참석 등의 정황이 결정적 증거로 활용되었습니다.",
                    },
                    {
                      badge: "사례 2",
                      title: "채팅 앱 만남",
                      desc: "상간자가 미혼으로 소개했으나, 대화 내용 속 배우자 관련 언급 및 주말 만남이 불가능했던 정황을 종합하여, 기혼 사실을 도저히 몰랐다고 인정하기 어렵다 판단하여 배상 의무를 인정했습니다.",
                    },
                    {
                      badge: "사례 3",
                      title: "SNS 정황 증거",
                      desc: "배우자의 프로필 이미지에서 가정과 관련된 정보가 노출되고, 이를 통해 인지 가능성을 증명하여 SNS 활동 내역이 핵심 증거로 인정되었고, 2,500만 원의 위자료가 확정되었습니다.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border-l-[3px] border-burgundy-200"
                    >
                      <span className="inline-block text-[12px] font-bold text-white bg-burgundy-500 px-2.5 py-1 rounded-full mb-3">
                        {item.badge}
                      </span>
                      <h4 className="font-sans text-[16px] font-bold text-[#2C2028] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[14px] leading-[1.8] text-[#444444]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 7 : 고의성 입증 주의사항 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <div data-reveal>
              <div className="bg-burgundy-50 rounded-2xl p-5 md:p-10 border border-burgundy-100">
                <div className="flex items-center gap-3 mb-8">
                  <ShieldAlert size={22} className="text-burgundy-500" />
                  <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-burgundy-600">
                    고의성 입증 시 반드시 주의하세요
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                  {/* 함정 수사 금물 */}
                  <div className="bg-white rounded-xl p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Ban size={16} className="text-burgundy-500" />
                      <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                        함정 수사 금물
                      </h4>
                    </div>
                    <p className="text-[14px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#333333]">
                      일부러 기혼 사실을 숨기고 만나게 유도한 뒤 나중에 소송을
                      거는 행위는 권리 남용으로 판단되어 배소할 수 있습니다.
                    </p>
                  </div>

                  {/* 유도 심문 녹취의 효력 */}
                  <div className="bg-white rounded-xl p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle
                        size={16}
                        className="text-burgundy-500"
                      />
                      <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028]">
                        유도 심문 녹취의 효력
                      </h4>
                    </div>
                    <p className="text-[14px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#333333]">
                      &ldquo;너 알았지?&rdquo; 라고 강요하여 받아낸 자백은
                      법정에서 뒤집힐 가능성이 높습니다. 자연스러운 대화 속
                      시인이 중요합니다.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 text-center">
                  <p className="text-[16px] leading-[1.7] text-[#333333] mb-1">
                    입증 책임은{" "}
                    <span className="font-bold text-[#2C2028]">
                      원고(피해 배우자)
                    </span>
                    에게 있습니다.
                  </p>
                  <p className="text-[14px] text-[#444444]">
                    충분한 증거 없이 소송을 제기하면 상간자의 소송 비용까지
                    부담해야 할 수 있습니다.
                  </p>
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-burgundy-500 hover:text-burgundy-600 mt-3 transition-colors"
                  >
                    지금 내 증거의 입증 효력 확인하기
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 8 : 기각/패소 사례 + 예방 조언 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            {/* 기각/패소 사례 */}
            <div className="text-center mb-14" data-reveal>
              <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-burgundy-500 mb-4">
                RISK ANALYSIS
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-3">
                주요 소송 기각 및 패소 사례
              </h3>
              <p className="text-[16px] text-[#444444] max-w-xl mx-auto">
                아래와 같은 경우 소송이 기각되거나 패소할 위험이 있습니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16" data-reveal>
              {[
                {
                  icon: <Clock size={22} />,
                  title: "장기 별거 중 소송",
                  verdict:
                    "이미 혼인관계가 파탄된 상태에서의 부정행위는 인과관계를 인정하기 어렵다고 판단하여 기각.",
                },
                {
                  icon: <Eye size={22} />,
                  title: "고의성 입증 실패",
                  verdict:
                    "채팅 앱에서 만남으로 상간자가 기혼 사실을 알았다는 증거가 불충분하여, 입증 부족으로 청구 기각.",
                },
                {
                  icon: <Smartphone size={22} />,
                  title: "랜덤 채팅 만남",
                  verdict:
                    "랜덤 채팅으로 만남을 시작하여 배우자가 기혼 사실을 속인 경우, 상간자의 과실을 인정하기 어렵다고 판단.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#444444] mb-5">
                    {item.icon}
                  </div>
                  <h4 className="font-sans text-[18px] font-bold text-[#2C2028] mb-3">
                    {item.title}
                  </h4>
                  <div className="border-l-[3px] border-burgundy-200 pl-4 py-1">
                    <p className="text-[14px] leading-[1.8] text-[#333333] italic">
                      법원의 판단: {item.verdict}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3대 예방 조언 + 위험 신호 체크리스트 */}
            <div className="grid lg:grid-cols-2 gap-10" data-reveal>
              {/* LEFT: 3대 예방 조언 */}
              <div>
                <h3 className="font-sans text-[22px] font-bold text-[#2C2028] mb-6">
                  실패하지 않는 소송을 위한
                  <br />
                  <span className="text-burgundy-500">3대 예방 조언</span>
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      num: "01",
                      title: "충분한 증거를 먼저 확보하세요",
                      desc: "감정에 휩쓸려 증거도 없이 소송을 제기하면 기각될 수 있습니다. 메신저 대화, 사진, CCTV 등 객관적 증거를 우선 확보하세요.",
                    },
                    {
                      num: "02",
                      title: "소멸시효를 반드시 확인하세요",
                      desc: "부정행위를 안 날로부터 3년, 있은 날로부터 10년이 시효입니다. 시간이 지날수록 위자료 금액도 감액됩니다.",
                    },
                    {
                      num: "03",
                      title: "전문 변호사와 먼저 상담하세요",
                      desc: "별거 상태, 채팅 만남 등 쟁점이 있는 사안은 반드시 전문가의 사전 판단이 필요합니다.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#F8F4EE] rounded-xl p-4 md:p-6 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[20px] md:text-[24px] font-bold text-burgundy-500/30 leading-none">
                          {item.num}
                        </span>
                        <h4 className="text-[15px] md:text-[17px] font-bold text-[#2C2028]">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[13px] md:text-[15px] leading-[1.7] text-[#3A3238] pl-9 md:pl-10">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: 위험 신호 체크리스트 */}
              <div>
                <h3 className="font-sans text-[22px] font-bold text-[#2C2028] mb-6">
                  소송 전{" "}
                  <span className="text-burgundy-500">위험 신호 체크리스트</span>
                </h3>
                <div className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <p className="text-[15px] text-[#444444] mb-5">
                    아래 항목에 해당하면 소송 전 전문가 상담이 필수적입니다.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "배우자와 이미 6개월 이상 별거 중이다",
                      "상간자를 채팅 앱이나 온라인에서 만났다",
                      "상간자가 기혼 사실을 몰랐다고 주장하고 있다",
                      "부정행위 증거가 메신저 대화뿐이다",
                      "부정행위를 안 지 1년 이상 지났다",
                      "배우자가 이혼 소송을 먼저 제기한 상태이다",
                      "상간자의 이름이나 연락처를 정확히 모른다",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[16px] leading-[1.7] text-[#333333]"
                      >
                        <div className="w-5 h-5 rounded border-2 border-burgundy-300 flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-sm bg-burgundy-400" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-gray-100 text-center">
                    <p className="text-[14px] text-burgundy-500 font-semibold">
                      2개 이상 해당 시, 사전 법률 상담을 강력히 권고합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 9 : 판결금 확보 전략 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                ASSET RECOVERY
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight mb-3">
                판결금 확보를 위한
                <br />
                <span className="text-burgundy-500">전략적 가압류</span>
              </h3>
              <p className="text-[16px] text-[#444444] max-w-2xl mx-auto">
                승소 판결은 시작일 뿐, 실질적인 위자료를 받아내는 것이
                중요합니다. 상간자가 재산을 은닉할 가능성이 보인다면, 소송
                시작 전 가압류를 선행하여 판결 후 집행력을 확보해야 합니다.
              </p>
            </div>

            {/* 4가지 압류 방식 카드 */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-12"
              data-reveal
            >
              {[
                {
                  icon: <Home size={22} />,
                  title: "부동산 가압류",
                  desc: "상간자 명의의 부동산(아파트, 토지 등)에 처분금지 가처분을 걸어 매도나 담보 설정을 차단합니다.",
                  note: "등기부등본 열람으로 확인 가능",
                },
                {
                  icon: <CreditCard size={22} />,
                  title: "임대차보증금 압류",
                  desc: "전세금이나 월세 보증금에 대한 채권 압류를 통해 판결금을 확보합니다.",
                  note: "전세계약 명의 확인 필요",
                },
                {
                  icon: <Wallet size={22} />,
                  title: "은행계좌 압류",
                  desc: "상간자 명의의 예금 계좌를 동결하여 위자료를 회수합니다. 은행을 특정할 수 있어야 합니다.",
                  note: "금융기관 특정 필요",
                },
                {
                  icon: <CircleDollarSign size={22} />,
                  title: "급여 압류",
                  desc: "상간자의 직장을 파악한 경우 급여의 일정 비율(1/2 이내)을 매월 압류할 수 있습니다.",
                  note: "직장 정보 확인 필요",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#F8F4EE] rounded-xl p-4 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 mb-3 md:mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028] mb-1.5 md:mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[12px] md:text-[14px] leading-[1.6] md:leading-[1.7] text-[#333333] mb-2 md:mb-3">
                    {item.desc}
                  </p>
                  <span className="inline-block text-[11px] md:text-[12px] text-burgundy-500 bg-burgundy-50 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full font-semibold">
                    {item.note}
                  </span>
                </div>
              ))}
            </div>

            {/* 방식별 비교 테이블 */}
            <div data-reveal>
              <h4 className="font-sans text-[18px] font-bold text-[#2C2028] mb-5">
                방식별 장단점 비교분석
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                  <thead>
                    <tr className="bg-[#F8F4EE]">
                      <th className="text-left px-5 py-4 text-[14px] font-bold text-[#2C2028]">
                        압류 방식
                      </th>
                      <th className="text-left px-5 py-4 text-[14px] font-bold text-[#2C2028]">
                        효과성
                      </th>
                      <th className="text-left px-5 py-4 text-[14px] font-bold text-[#2C2028]">
                        장점
                      </th>
                      <th className="text-left px-5 py-4 text-[14px] font-bold text-[#2C2028]">
                        단점
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "부동산",
                        stars: "★★★★★",
                        pro: "확실한 담보 확보",
                        con: "명의가 아니면 불가",
                      },
                      {
                        name: "보증금",
                        stars: "★★★★☆",
                        pro: "전세 거주자에 효과적",
                        con: "명의 확인 어려움",
                      },
                      {
                        name: "은행계좌",
                        stars: "★★★☆☆",
                        pro: "즉시 동결 가능",
                        con: "은행 특정 필요",
                      },
                      {
                        name: "급여",
                        stars: "★★★★☆",
                        pro: "매월 안정적 회수",
                        con: "직장 정보 필요",
                      },
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className={`${
                          i < 3 ? "border-b border-gray-100" : ""
                        }`}
                      >
                        <td className="px-5 py-4 text-[15px] font-semibold text-[#2C2028]">
                          {row.name}
                        </td>
                        <td className="px-5 py-4 text-[15px] text-[#C9A84C]">
                          {row.stars}
                        </td>
                        <td className="px-5 py-4 text-[14px] text-[#333333]">
                          {row.pro}
                        </td>
                        <td className="px-5 py-4 text-[14px] text-[#444444]">
                          {row.con}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 가압류 안내 */}
            <div className="mt-8" data-reveal>
              <div className="border-l-[3px] border-[#C9A84C] pl-5 py-3 bg-[#F8F4EE] rounded-r-lg">
                <p className="text-[16px] leading-[1.8] text-[#333333]">
                  상간자 소송의 위자료(통상 1~3천만 원)는 소액에 해당하여
                  판결 확정 후 대부분 임의 이행으로 마무리됩니다. 다만, 지급을
                  거부하거나 재산 은닉이 의심되는 경우 가압류가
                  필수적이며, 이 경우 반드시 전문가 상담이 필요합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 10 : 골든타임 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT: 골든타임 */}
              <div data-reveal>
                <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-burgundy-500 mb-4">
                  GOLDEN TIME
                </p>
                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  판결금 확보의
                  <br />
                  <span className="text-burgundy-500">골든타임</span>
                </h3>
                <p className="text-[17px] leading-[1.9] text-[#333333] mb-8">
                  승소 판결 후에도 상간자가 재산을 은닉하거나 지급을 거부하는
                  경우가 있습니다. 아래 3단계를 신속히 진행해야 실질적인 보상을
                  확보할 수 있습니다.
                </p>

                <div className="space-y-5">
                  {[
                    {
                      step: "1단계",
                      title: "판결 확정 즉시 재산조회",
                      desc: "판결이 확정되면 법원에 재산 명시 신청을 하여 상간자의 재산 목록을 파악합니다.",
                    },
                    {
                      step: "2단계",
                      title: "강제집행 신청",
                      desc: "부동산, 예금, 급여 등에 압류 및 추심 명령을 신청하여 실제 위자료를 회수합니다.",
                    },
                    {
                      step: "3단계",
                      title: "채무불이행자 명부 등재",
                      desc: "끝까지 거부하는 경우 채무불이행자 명부(신용불량)에 등재하여 강제적 압박을 가합니다.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-burgundy-500 flex items-center justify-center text-white flex-shrink-0 text-[14px] font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-[16px] font-bold text-[#2C2028] mb-1">
                          {item.title}
                        </p>
                        <p className="text-[14px] leading-[1.7] text-[#444444]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: 왜 신세계로인가? */}
              <div data-reveal>
                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] h-full flex flex-col justify-center">
                  <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                    WHY SHINSEGAERO
                  </p>
                  <h4 className="font-sans text-[22px] md:text-[26px] font-bold text-[#2C2028] mb-8 leading-tight">
                    판결문이 종이 조각이 되지 않도록,
                    <br />
                    <span className="text-burgundy-500">끝까지</span>{" "}
                    책임집니다.
                  </h4>

                  <div className="space-y-6">
                    {[
                      {
                        icon: <Scale size={20} />,
                        title: "소송 전 가압류 선행",
                        desc: "재산 은닉 가능성을 사전에 차단하여 집행력을 확보합니다.",
                      },
                      {
                        icon: <Search size={20} />,
                        title: "재산 추적 전담",
                        desc: "판결 후에도 재산 조회와 강제집행 절차를 전담하여 진행합니다.",
                      },
                      {
                        icon: <Banknote size={20} />,
                        title: "위자료 100% 회수 목표",
                        desc: "판결금 전액 회수를 목표로 압류, 추심, 채무불이행 등재까지 모든 법적 수단을 동원합니다.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-[16px] font-bold text-[#2C2028] mb-0.5">
                            {item.title}
                          </p>
                          <p className="text-[14px] leading-[1.7] text-[#444444]">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 11 : QUOTE BAND ═══════════ */}
        <section
          className="relative py-20 md:py-24 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/images/office/banner-consultation.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-[#1A1A2E]/85" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div data-reveal>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mb-6" />
              <p className="text-[20px] md:text-[26px] lg:text-[30px] text-white leading-[1.7] font-semibold">
                &ldquo;상간자소송은 감정이 아닌
                <br className="hidden md:block" />
                증거와 절차로 승부하는 소송입니다.
                <br className="hidden md:block" />
                치밀한 법률 전략만이 정당한 배상을
                이끌어냅니다.&rdquo;
              </p>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-6 mb-4" />
              <p className="text-[15px] text-[#C9A84C] tracking-wider">
                위자료팀 신진희 팀장
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 12 : TEAM LINK ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div data-reveal>
              <div className="bg-[#F8F4EE] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-3">
                    SPECIALIZED TEAM
                  </p>
                  <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028] mb-3 leading-tight">
                    위자료팀
                  </h3>
                  <p className="text-[16px] md:text-[17px] text-[#444444] leading-[1.8] mb-2">
                    디지털 증거 수집부터 민·형사 병행 전략, 판결금 확보까지
                    상간자 소송의 전 과정을 전담합니다.
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

        {/* ═══════════ SECTION 13 : CTA ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div data-reveal>
              <h3 className="font-sans text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[#2C2028] mb-4 leading-tight">
                복잡한 절차와 주의사항,
                <br />
                <span className="text-burgundy-500">변호사가 대신</span>{" "}
                싸워드립니다.
              </h3>
              <p className="text-[16px] md:text-[17px] text-[#444444] leading-[1.8] mb-10 max-w-xl mx-auto">
                의뢰인은 일상으로 돌아가십시오. 증거 확보부터 승소 판결, 위자료
                지급까지 신세계로가 책임지고 진행하겠습니다.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  aria-label={`24시간 긴급 전화 상담 ${phone}`}
                  className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  <Phone size={18} />
                  24시간 긴급 전화 상담 {phone}
                </a>
                <a
                  href="https://pf.kakao.com/_ExcxoAu/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle size={18} />
                  비공개 온라인 문의
                </a>
              </div>
            </div>
          </div>
        </section>
      </PracticeRevealWrapper>

    </div>
  );
}
