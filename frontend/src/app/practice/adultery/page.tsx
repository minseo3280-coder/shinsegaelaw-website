import Link from "next/link";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Scale,
  Fingerprint,
  Clock,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Video,
  CreditCard,
  FileSignature,
  ShieldAlert,
  Ban,
  UserX,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function AdulteryPage() {
  const phone = firmData.main_phone || "1555-5961";

  return (
    <div className="">
      <SubPageHero
        titleKo="상간자 위자료 청구"
        bannerImage="/images/office/banner-adultery.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/adultery" },
          { label: "상간자 위자료 청구" },
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
                <p className="text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                  간통자 손해배상 소송 가이드
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6 max-w-5xl">
                상간자 소송,
                <br />
                <span className="text-burgundy-500">증거 확보</span>가
                모든 것을 결정합니다.
              </h2>
              <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#333333] mb-3 max-w-2xl">
                배우자의 부정행위를 알게 된 고통은 말로 표현할 수
                없습니다. 이혼 여부와 관계없이 상간자에게 위자료를 청구할
                수 있지만, 승소의 핵심은{" "}
                <strong className="text-[#2C2028]">
                  법적으로 효력이 있는 확실한 증거 수집
                </strong>
                에 있습니다.
              </p>
              <div className="mt-8">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  비공개 1:1 증거 진단 신청
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : 4가지 핵심 카드 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6" data-reveal>
              {[
                {
                  icon: <Scale size={24} />,
                  title: "위자료 청구",
                  desc: "반드시 이혼을 해야만 하는 것은 아닙니다. 혼인 관계를 유지하면서도 상간자만을 상대로 위자료 청구가 가능합니다.",
                },
                {
                  icon: <Fingerprint size={24} />,
                  title: "증거 확보",
                  desc: "카카오톡 대화, 블랙박스 영상, 녹취록 등 의도를 입증할 수 있는 디지털 증거를 합법적인 테두리 안에서 수집해야 합니다.",
                },
                {
                  icon: <Clock size={24} />,
                  title: "소송 기간",
                  desc: "평균적으로 6개월 내외가 소요되며, 변호사 선임 시 의뢰인은 법정에 출석하지 않고도 소송 진행이 가능합니다.",
                },
                {
                  icon: <AlertTriangle size={24} />,
                  title: "명예훼손 주의",
                  desc: "상간자의 직장에 폭로하거나 온라인에 유포할 경우 오히려 명예훼손으로 역고소 당할 위험이 크므로 주의해야 합니다.",
                },
              ].map((item, i) => (
                <div
                  key={i}
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

        {/* ═══════════ SECTION 3 : 상간자 위자료 청구란 + 산정 기준 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT: 상간자 위자료 청구란 */}
              <div data-reveal>
                <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                  정의
                </p>
                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  상간자 위자료 청구란?
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-6">
                  배우자와 부정행위를 저지른 제3자(상간자)에게 정신적
                  고통에 대한 손해배상을 청구하는 민사 소송입니다. 2015년
                  간통죄 폐지 이후, 가정을 파괴한 상대에게 책임을 물을 수
                  있는 유일한 법적 수단입니다.
                </p>

                {/* 인용문 */}
                <div className="border-l-[3px] border-burgundy-200 pl-6 py-4 mb-6">
                  <p className="text-[17px] leading-[1.9] text-[#333333] italic">
                    &ldquo;간통죄가 폐지된 지금, 상간자에 대한 법적
                    구제수단은 상간녀·상간남 소송밖에 없습니다. 비록
                    위자료 액수가 수억 원은 아닐지라도, 법적 판결을 통해
                    상대의 잘못을 명시하는 것은 피해자의 감정적 치유를
                    위한 첫걸음입니다.&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserX size={16} className="text-[#444444]" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-[#2C2028]">
                        신진희 팀장
                      </p>
                      <p className="text-[13px] text-[#444444]">
                        상간자 소송 누적 112+건 처리
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: 예상 위자료 산정 기준 */}
              <div data-reveal>
                <div className="bg-[#F8F4EE] rounded-2xl p-8 h-full">
                  <h4 className="font-sans text-[20px] md:text-[22px] font-bold text-[#2C2028] mb-4">
                    예상 위자료 산정 기준
                  </h4>
                  <p className="text-[16px] leading-[1.7] text-[#333333] mb-6">
                    서울가정법원 판례 기준, 통상적으로{" "}
                    <strong className="text-burgundy-500 text-[16px]">
                      1,000만 원 ~ 3,000만 원
                    </strong>{" "}
                    사이에서 결정됩니다.
                  </p>

                  <div className="space-y-5">
                    {[
                      {
                        label: "부정행위의 기간과 정도",
                        desc: "외도가 지속된 기간이 길수록, 상관계 여부 등 수위가 높을수록 증액됩니다.",
                      },
                      {
                        label: "혼인 파탄 여부",
                        desc: "외도로 인해 이혼에 이르게 되었는지가 위자료 액수에 큰 영향을 미칩니다.",
                      },
                      {
                        label: "상간자의 반성 태도",
                        desc: "잘못을 인정하지 않거나 저변화장식 태도를 보일 경우 위자료 산정에 본격화하게 작용합니다.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-burgundy-500 mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-[16px] font-bold text-[#2C2028] mb-1">
                            {item.label}
                          </p>
                          <p className="text-[14px] leading-[1.7] text-[#444444]">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 핵심 체크포인트 */}
                  <div className="mt-6 bg-burgundy-50 rounded-xl p-5 border border-burgundy-100">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle
                        size={14}
                        className="text-burgundy-500"
                      />
                      <p className="text-[15px] font-bold text-burgundy-500">
                        핵심 체크포인트
                      </p>
                    </div>
                    <p className="text-[14px] leading-[1.7] text-[#333333]">
                      상간자가 상대의 기혼 사실을 알고 있었는지를 입증하는
                      것이 소송의 성패를 가릅니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : 증거 가이드 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                증거 가이드
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight">
                어떤 것들이 법적 증거가 되나요?
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-8" data-reveal>
              {/* LEFT: 유효한 증거 */}
              <div className="space-y-4">
                {[
                  {
                    icon: <MessageSquare size={18} />,
                    title: "카카오톡 및 메시지",
                    desc: "애칭 사용, 성적인 대화, 만남을 약속하는 내용 등",
                  },
                  {
                    icon: <Video size={18} />,
                    title: "블랙박스 및 CCTV",
                    desc: "차량 내 대화 녹음, 숙박업소 출입 영상 등",
                  },
                  {
                    icon: <CreditCard size={18} />,
                    title: "카드 결제 내역",
                    desc: "숙박업소, 상간자 거주지 인근 결제 내역 등",
                  },
                  {
                    icon: <FileSignature size={18} />,
                    title: "자백 및 각서",
                    desc: "부정행위를 시인하는 녹취나 직접 작성한 반성문",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-5 flex items-start gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-500 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[16px] font-bold text-[#2C2028] mb-1">
                        {item.title}
                      </p>
                      <p className="text-[14px] leading-[1.6] text-[#444444]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT: 불법 증거 수집 경고 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldAlert size={20} className="text-burgundy-500" />
                  <h4 className="font-sans text-[18px] font-bold text-[#2C2028]">
                    불법 증거 수집 경고
                  </h4>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      label: "휴대전화 잠금 해제",
                      desc: "비밀번호를 몰래 풀어 내용을 확인하는 행위는 정보통신망법 위반에 해당하여 역고소의 빌미가 됩니다.",
                    },
                    {
                      label: "흥신소·심부름센터 이용",
                      desc: "민간 조사업체를 동원 위치 추적이나 미행은 불법이며, 수집된 증거의 증거능력이 부정될 수 있습니다.",
                    },
                    {
                      label: "타인 간의 대화 도청",
                      desc: "본인이 참여하지 않은 타인들(배우자·상간자) 사이의 대화를 몰래 녹음하는 것은 통신비밀보호법 위반입니다.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-burgundy-50 rounded-xl p-5 border border-burgundy-100"
                    >
                      <p className="text-[15px] font-bold text-burgundy-600 mb-1 flex items-center gap-2">
                        <Ban size={14} className="flex-shrink-0" />
                        {item.label}
                      </p>
                      <p className="text-[14px] leading-[1.7] text-[#333333] pl-[22px]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5 : 소송 절차 + 명예훼손 주의 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT: 소송 절차 */}
              <div data-reveal>
                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  상간자와 마주치지 않고
                  <br />
                  조용하고 확실하게 끝내세요.
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-8">
                  소송 과정에서 상간자와 직접 대면하거나 대화할 필요가
                  없습니다. 모든 법적 절차는 변호사가 대리하며, 의뢰인은
                  일상생활에 집중하실 수 있도록 철저한 비공개 원칙하에
                  진행됩니다.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#F8F4EE] rounded-xl p-5">
                    <p className="text-[28px] md:text-[32px] font-bold text-burgundy-500">
                      평균 6개월
                    </p>
                    <p className="text-[14px] text-[#444444] mt-1">
                      소장 접수부터 판결까지의 통상 소요 기간
                    </p>
                  </div>
                  <div className="bg-[#F8F4EE] rounded-xl p-5">
                    <p className="text-[28px] md:text-[32px] font-bold text-burgundy-500">
                      100% 대리
                    </p>
                    <p className="text-[14px] text-[#444444] mt-1">
                      변호사만 출석하여 의뢰인 보호 및 익명성 유지
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT: 명예훼손 역고소 주의 */}
              <div data-reveal>
                <div className="bg-[#1A1A2E] rounded-2xl p-5 md:p-10 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle size={20} className="text-burgundy-400" />
                    <h4 className="font-sans text-[18px] md:text-[20px] font-bold text-white">
                      명예훼손 역고소 주의사항
                    </h4>
                  </div>
                  <p className="text-[16px] leading-[1.7] text-white/65 mb-6">
                    분노로 인해 상간자의 직장에 외도 사실을 알리거나,
                    인터넷 커뮤니티에 실명을 거론하는 행위는
                    &lsquo;공연성&rsquo;이 인정되어 정보통신망명예훼손죄로
                    처벌받을 수 있습니다.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="bg-white/10 rounded-lg p-4 flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-green-400 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-[16px] leading-[1.6] text-white/80">
                        상간자의 배우자에게만 알리는 것은 허용 (전파성 없음)
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-green-400 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-[16px] leading-[1.6] text-white/80">
                        상간자 회사 인사과 투서, 사내 게시판 게시 금지
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-5">
                    <p className="text-[14px] leading-[1.7] text-white/50">
                      * 법적 대응은 오직 소송이라는 정당한 절차를 통해서만
                      이루어져야 가장 유리하고 안전한 결과를 얻을 수
                      있습니다.
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
            backgroundImage: "url('/images/office/banner-consultation.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-[#1A1A2E]/85" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div data-reveal>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mb-6" />
              <p className="text-[20px] md:text-[26px] lg:text-[30px] text-white leading-[1.7] font-semibold">
                &ldquo;증거는 감정이 아닌 전략으로 확보해야 합니다.
                <br className="hidden md:block" />
                적법한 증거 하나가 수천만 원의 판결을 바꿉니다.&rdquo;
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
              <div className="bg-[#F8F4EE] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <p className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-3">
                    SPECIALIZED TEAM
                  </p>
                  <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028] mb-3 leading-tight">
                    위자료팀
                  </h3>
                  <p className="text-[16px] md:text-[17px] text-[#444444] leading-[1.8] mb-2">
                    디지털 증거 수집부터 민·형사 병행 전략까지, 상간자
                    소송의 전 과정을 전담합니다.
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
                지금 가지고 계신 증거,
                <br />
                <span className="text-burgundy-500">법적 효력이 있는지</span>{" "}
                바로 확인해 드립니다.
              </h3>
              <p className="text-[16px] md:text-[17px] text-[#444444] leading-[1.8] mb-10 max-w-xl mx-auto">
                모든 상담은 철저히 비밀로 보장되며, 현재 상황에서 가장
                안전하고 확실한 대응 시나리오를 제시해 드립니다.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  aria-label={`전화로 즉시 상담받기 ${phone}`}
                  className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  <Phone size={18} />
                  전화로 즉시 상담받기 {phone}
                </a>
                <a
                  href="https://pf.kakao.com/_ExcxoAu/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle size={18} />
                  카카오톡 실시간 문의
                </a>
              </div>
            </div>
          </div>
        </section>
      </PracticeRevealWrapper>

    </div>
  );
}
