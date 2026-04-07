import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  Users,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  ShieldAlert,
  Ban,
  Siren,
  Gavel,
  HeartHandshake,
  Home,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";
import firmData from "@/../../data/firm_info.json";

export default function DomesticViolencePage() {
  const phone = firmData.main_phone || "1555-5961";

  return (
    <div className="">
      <SubPageHero
        titleKo="가정폭력"
        bannerImage="/images/office/banner-divorce.jpg"
        breadcrumbs={[
          { label: "업무분야", href: "/practice/divorce" },
          { label: "가정폭력" },
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
                  DOMESTIC VIOLENCE PROTECTION GUIDE
                </p>
              </div>
              <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6 max-w-5xl">
                가정폭력, 즉시
                <br />
                보호받을 권리가 있습니다
              </h2>
              <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#333333] mb-3 max-w-2xl">
                가족 구성원 사이의 신체적, 정신적 또는 재산상 피해를 수반하는
                행위는 명백한{" "}
                <strong className="text-burgundy-500">범죄</strong>입니다.
                신세계로는 피해자의 안전을 최우선으로 즉각적인 법적 조치를
                단행합니다.
              </p>
              <div className="mt-8">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-burgundy-500 text-white px-7 py-3.5 rounded-full text-[16px] font-semibold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  24시간 긴급 법률 지원 신청
                  <ShieldCheck size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2 : EMERGENCY ACTION 4 CARDS ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4">
                EMERGENCY ACTION
              </p>
              <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#2C2028] leading-tight">
                즉각적인 4단계 대응 시스템
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {[
                {
                  icon: <Siren size={24} />,
                  title: "경찰 응급조치",
                  desc: "112 신고 즉시 폭력 중단, 가해자 격리 및 피해자 보호시설 인도 등 긴급 보호 절차를 진행합니다.",
                },
                {
                  icon: <Ban size={24} />,
                  title: "접근금지 임시조치",
                  desc: "주거지 및 직장으로부터 100m 이내 접근금지 및 전기통신을 이용한 연락 금지를 즉각 신청합니다.",
                },
                {
                  icon: <Shield size={24} />,
                  title: "법원 보호처분",
                  desc: "접근제한부터 친권 행사 제한까지, 법원의 8가지 보호처분을 통해 장기적 안전을 확보합니다.",
                },
                {
                  icon: <Gavel size={24} />,
                  title: "이혼소송 연계",
                  desc: "재판상 이혼 사유 입증 및 위자료 증액, 재산분할과 양육권 확보를 위한 전략을 수립합니다.",
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

        {/* ═══════════ SECTION 3 : 가정폭력이란 + 가족구성원 범위 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="mb-14" data-reveal>
              <h3 className="font-sans text-[28px] md:text-[34px] font-bold text-[#2C2028] mb-6 leading-tight">
                가정폭력이란?
              </h3>
              <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] max-w-5xl">
                가족 구성원 사이의 신체적, 정신적 또는 재산상 피해를 수반하는
                모든 행위를 의미합니다. 법에서 규정하는
                &lsquo;가족 구성원&rsquo;의 범위는 생각보다 넓으며, 헤어진
                관계라도 보호 대상에 포함될 수 있습니다.
              </p>
            </div>

            <div data-reveal>
              <div className="bg-[#F8F4EE] rounded-2xl p-5 md:p-10">
                <div className="flex items-center gap-3 mb-7">
                  <Users
                    size={22}
                    className="text-burgundy-500 flex-shrink-0"
                  />
                  <h4 className="font-sans text-[20px] md:text-[22px] font-bold text-[#2C2028]">
                    법률상 보호받는 가족 구성원 범위
                  </h4>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {[
                    {
                      icon: <HeartHandshake size={18} />,
                      label: "배우자 (사실혼 관계 포함) 또는 배우자였던 사람",
                    },
                    {
                      icon: <Users size={18} />,
                      label: "자기 또는 배우자의 직계존비속 관계",
                    },
                    {
                      icon: <Home size={18} />,
                      label: "계부모와 자녀의 관계 또는 적모와 서자의 관계",
                    },
                    {
                      icon: <Users size={18} />,
                      label: "동거하는 친족 관계",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-3 md:p-5 flex items-start gap-3"
                    >
                      <div className="text-burgundy-500 mt-0.5 flex-shrink-0">
                        {item.icon}
                      </div>
                      <p className="text-[13px] md:text-[16px] leading-[1.6] text-[#333333]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4 : 형사고소 특례 + 경찰 단계별 조치 ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* LEFT: 형사고소 특례 + 이혼소송 연계 */}
              <div data-reveal>
                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#2C2028] mb-6 leading-tight">
                  형사고소의 특례
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-8">
                  일반 형사법과 달리 가정폭력처벌법에 따르면 피해자는{" "}
                  <strong className="text-[#2C2028]">
                    자기 또는 배우자의 직계존속(부모, 시부모, 장인·장모 등)
                  </strong>
                  에 대해서도 고소할 수 있는 권리를 가집니다. 이는 가족 내부의
                  문제를 범죄로 명확히 인식시키도록 돕는 강력한 보호 기제입니다.
                </p>

                <h3 className="font-sans text-[24px] md:text-[28px] font-bold text-[#2C2028] mb-5 leading-tight">
                  이혼소송과의 연계
                </h3>
                <p className="text-[16px] md:text-[19px] leading-[1.9] text-[#333333] mb-6">
                  가정폭력은 민법 제840조 제3호 &lsquo;배우자 또는 그
                  직계존속으로부터 심히 부당한 대우를 받았을 때&rsquo;에
                  해당하는 명백한 이혼 사유입니다.
                </p>
                <div className="space-y-3">
                  {[
                    "높은 위자료 산정의 근거",
                    "자녀 양육권 및 친권 확보의 결정적 요인",
                    "면접교섭권의 제한 및 배제 청구",
                    "사전처분을 통한 임시 주거비 지원",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-burgundy-500 flex-shrink-0"
                      />
                      <span className="text-[14px] md:text-[16px] text-[#333333]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: 경찰의 긴급 단계별 조치 */}
              <div data-reveal>
                <div className="bg-[#1A1A2E] rounded-2xl p-4 md:p-8 h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <ShieldAlert size={22} className="text-burgundy-400" />
                    <h4 className="font-sans text-[22px] md:text-[24px] font-bold text-white">
                      경찰의 긴급 단계별 조치
                    </h4>
                  </div>

                  {/* STEP 1 */}
                  <div className="mb-8">
                    <p className="text-[14px] font-bold text-[#C9A84C] tracking-wider mb-3">
                      STEP 1. 응급조치 (현장 즉시)
                    </p>
                    <ul className="space-y-2">
                      {[
                        "폭력행위의 제지 및 가해자·피해자의 분리",
                        "피해자의 동의 시 보호시설 인도",
                        "긴급 치료가 필요한 경우 의료기관 인도",
                        "임시조치 신청 권리 및 절차 안내",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="text-[14px] md:text-[16px] leading-[1.6] text-white/70 flex items-start gap-2"
                        >
                          <span className="text-burgundy-400 mt-1">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* STEP 2 */}
                  <div>
                    <p className="text-[14px] font-bold text-[#C9A84C] tracking-wider mb-3">
                      STEP 2. 임시조치 (가해자 제재)
                    </p>
                    <ul className="space-y-2">
                      {[
                        "피해자 거주지로부터의 퇴거 등 격리",
                        "주거·직장 등으로부터 100m 이내 접근금지",
                        "전화·문자 등 전기통신 이용 연락 금지",
                        "의료기관 위탁 및 유치장·구치소 유치 가능",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="text-[14px] md:text-[16px] leading-[1.6] text-white/70 flex items-start gap-2"
                        >
                          <span className="text-burgundy-400 mt-1">·</span>
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

        {/* ═══════════ SECTION 5 : 법원의 보호처분 8가지 ═══════════ */}
        <section className="bg-white py-12 md:py-28 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-reveal>
              <h3 className="font-sans text-[28px] md:text-[34px] font-bold text-[#2C2028] leading-tight mb-4">
                법원의 보호처분 (8가지 유형)
              </h3>
              <p className="text-[16px] text-[#444444] max-w-2xl mx-auto leading-relaxed">
                형사처벌 대신 또는 병행하여 내려지는 피해자 보호를 위한 강력한
                법적 명령입니다.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" data-reveal>
              {[
                {
                  num: "제1호·제2호",
                  label: "주거지 접근 금지 및 전기통신 이용 연락 금지",
                },
                {
                  num: "제3호",
                  label:
                    "친권 행사의 제한 (가해 부모의 자녀 접촉 금지)",
                },
                {
                  num: "제4호",
                  label: "사회봉사 및 수강명령 (폭력 예방 교육 등)",
                },
                { num: "제5호", label: "보호관찰 (보호관찰관의 밀착 지도 감독)" },
                {
                  num: "제6호",
                  label: "감호위탁 (보호시설 등에 수용 보호)",
                },
                {
                  num: "제7호",
                  label: "치료위탁 (의료기관에서의 알코올/정신 치료)",
                },
                {
                  num: "제8호",
                  label: "상담위탁 (가정폭력 상담소 등에서의 상담)",
                  highlight: true,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-3 md:p-5 border ${
                    item.highlight
                      ? "border-burgundy-200 bg-burgundy-50"
                      : "border-gray-200 bg-white"
                  } hover:shadow-md transition-shadow duration-300`}
                >
                  <p className="text-[13px] md:text-[15px] font-bold text-burgundy-500 mb-2">
                    {item.num}
                  </p>
                  <p className="text-[13px] md:text-[16px] leading-[1.6] text-[#333333]">
                    {item.label}
                  </p>
                </div>
              ))}
              {/* ALL 8 TYPES 카드 */}
              <div className="rounded-xl p-3 md:p-5 bg-burgundy-500 flex items-center justify-center text-center">
                <p className="text-[14px] font-bold text-white tracking-wider leading-relaxed uppercase">
                  ALL 8 TYPES OF
                  <br />
                  PROTECTIVE ORDERS
                </p>
              </div>
            </div>

            {/* 보호처분 위반 경고 */}
            <div
              data-reveal
              className="mt-8 bg-burgundy-50 rounded-2xl p-6 md:p-8 flex items-start gap-5 border border-burgundy-100"
            >
              <div className="w-12 h-12 rounded-full bg-burgundy-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={22} className="text-burgundy-600" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#2C2028] mb-2">
                  보호처분 위반 시 강력 제재
                </p>
                <p className="text-[17px] leading-[1.8] text-[#333333]">
                  법원의 보호처분 중{" "}
                  <strong className="text-[#2C2028]">
                    제1호 내지 제3호(접근금지·통신금지·친권행사 제한)
                  </strong>
                  를 위반한 경우,{" "}
                  <strong className="text-burgundy-500">
                    2년 이하의 징역이나 2천만 원 이하의 벌금 또는 구류
                  </strong>
                  에 처해질 수 있습니다. 신세계로는 위반 즉시 고발 조치를
                  통해 추가 피해를 막습니다.
                </p>
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
                &ldquo;가정폭력은 반복됩니다.
                <br className="hidden md:block" />
                가해자의 사과가 아닌,
                <br className="hidden md:block" />
                법원의 결정만이 피해자를 보호할 수 있습니다.&rdquo;
              </p>
              <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-6 mb-4" />
              <p className="text-[15px] text-[#C9A84C] tracking-wider">
                형사사건팀 이명인 팀장
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
                  <p className="text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-3">
                    SPECIALIZED TEAM
                  </p>
                  <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028] mb-3 leading-tight">
                    형사사건팀
                  </h3>
                  <p className="text-[16px] md:text-[18px] text-[#444444] leading-[1.8] mb-2">
                    형사고소, 보호처분 신청, 이혼소송 연계까지 가정폭력 사건의
                    전 과정을 원스톱으로 대응합니다.
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

        {/* ═══════════ SECTION 8 : CTA ═══════════ */}
        <section className="bg-[#F8F4EE] py-12 md:py-28 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div data-reveal>
              <h3 className="font-sans text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[#2C2028] mb-4 leading-tight">
                공포 속에서 홀로 참지 마십시오
              </h3>
              <p className="text-[16px] md:text-[18px] text-[#444444] leading-[1.8] mb-10 max-w-xl mx-auto">
                가정폭력은 시간이 지날수록 심화되는 경향이 있습니다. 지금의
                용기가 당신과 자녀의 인생을 바꿉니다. 모든 상담은 철저히
                비밀로 유지되며,{" "}
                <strong className="text-[#2C2028]">즉각적인 신변 보호</strong>
                가 가능합니다.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  aria-label={`긴급 직통 전화 ${phone}`}
                  className="inline-flex items-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                >
                  <Phone size={18} />
                  긴급 직통 전화 {phone}
                </a>
                <a
                  href="https://pf.kakao.com/_ExcxoAu/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
                >
                  <MessageCircle size={18} />
                  카카오톡 비공개 1:1 상담
                </a>
              </div>

              <p className="text-[14px] text-[#444444]">
                ※ 긴급 상황인 경우 먼저 112에 신고하여 응급조치를 받으시기
                바랍니다.
              </p>
            </div>
          </div>
        </section>
      </PracticeRevealWrapper>

    </div>
  );
}
