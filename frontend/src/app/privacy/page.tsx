import type { Metadata } from "next";
import SubPageHero from "@/components/shared/SubPageHero";
import firmData from "@/../../data/firm_info.json";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 법무법인 신세계로",
  description: "법무법인 신세계로의 개인정보처리방침입니다.",
};

const EFFECTIVE_DATE = "2025년 1월 1일";

export default function PrivacyPage() {
  const manager = firmData.privacy_manager;

  return (
    <>
      <SubPageHero
        titleEn="PRIVACY POLICY"
        titleKo="개인정보처리방침"
        bannerImage="/images/office/banner-about.jpg"
        breadcrumbs={[
          { label: "신세계로", href: "/about/greeting" },
          { label: "개인정보처리방침" },
        ]}
      />

      <div className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[15px] md:text-[16px] text-[#555] leading-relaxed mb-10">
            {firmData.firm_name}(이하 &ldquo;법인&rdquo;)은 개인정보 보호법 등 관련 법령에 따라 의뢰인의 개인정보를 보호하고,
            이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립하여 공개합니다.
          </p>

          {/* 제1조 */}
          <Section number={1} title="개인정보의 처리 목적">
            <p>법인은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행합니다.</p>
            <ul>
              <li>법률 상담 신청 및 사건 수임 처리</li>
              <li>의뢰인과의 연락 및 상담 일정 조율</li>
              <li>사건 진행 상황 안내 및 결과 통보</li>
              <li>법인 웹사이트 운영 및 서비스 개선</li>
              <li>민원 처리 및 분쟁 해결</li>
            </ul>
          </Section>

          {/* 제2조 */}
          <Section number={2} title="수집하는 개인정보의 항목">
            <p>법인은 법률 상담 및 사건 수임을 위해 다음의 개인정보를 수집합니다.</p>
            <h4>필수 항목</h4>
            <ul>
              <li>성명, 연락처(휴대전화번호), 상담 내용</li>
            </ul>
            <h4>선택 항목</h4>
            <ul>
              <li>이메일 주소, 사건 관련 자료(문서, 이미지 등)</li>
            </ul>
            <h4>자동 수집 항목</h4>
            <ul>
              <li>접속 IP 주소, 접속 일시, 서비스 이용 기록, 쿠키</li>
            </ul>
          </Section>

          {/* 제3조 */}
          <Section number={3} title="개인정보의 처리 및 보유 기간">
            <p>법인은 법령에 따른 개인정보 보유 및 이용 기간 또는 정보주체로부터 개인정보를 수집 시 동의받은 개인정보 보유 및 이용 기간 내에서 개인정보를 처리 및 보유합니다.</p>
            <ul>
              <li>법률 상담 기록: 상담 완료 후 <strong>3년</strong> (변호사법 시행령)</li>
              <li>수임 사건 기록: 사건 종결 후 <strong>5년</strong> (변호사법 제28조)</li>
              <li>웹사이트 이용 기록: <strong>1년</strong></li>
              <li>전자상거래 관련 기록: <strong>5년</strong> (전자상거래법)</li>
            </ul>
          </Section>

          {/* 제4조 */}
          <Section number={4} title="개인정보의 제3자 제공">
            <p>법인은 원칙적으로 의뢰인의 개인정보를 제3자에게 제공하지 않습니다.
              다만, 다음의 경우에는 예외로 합니다.</p>
            <ul>
              <li>의뢰인이 사전에 동의한 경우</li>
              <li>법률에 특별한 규정이 있거나, 법령상 의무를 준수하기 위해 불가피한 경우</li>
              <li>사건 수행을 위해 법원, 수사기관 등에 제출이 필요한 경우</li>
            </ul>
          </Section>

          {/* 제5조 */}
          <Section number={5} title="개인정보의 파기">
            <p>법인은 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.</p>
            <ul>
              <li>전자적 파일 형태: 복구 및 재생이 불가능한 기술적 방법을 사용하여 삭제</li>
              <li>서면 형태: 분쇄기로 분쇄하거나 소각하여 파기</li>
            </ul>
          </Section>

          {/* 제6조 */}
          <Section number={6} title="정보주체의 권리 및 행사 방법">
            <p>의뢰인(정보주체)은 다음의 권리를 행사할 수 있습니다.</p>
            <ul>
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리 정지 요구</li>
            </ul>
            <p>권리 행사는 전화, 이메일, 방문 등을 통해 하실 수 있으며, 법인은 이에 대해 지체 없이 조치하겠습니다.</p>
          </Section>

          {/* 제7조 */}
          <Section number={7} title="개인정보의 안전성 확보 조치">
            <p>법인은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <ul>
              <li>관리적 조치: 내부 관리 계획 수립 및 시행, 직원 교육</li>
              <li>기술적 조치: 개인정보 처리 시스템 접근 권한 관리, 접근 통제, 암호화 기술 적용</li>
              <li>물리적 조치: 문서 보안 장치 운영, 비인가자 접근 통제</li>
            </ul>
          </Section>

          {/* 제8조 */}
          <Section number={8} title="개인정보 보호책임자">
            <div className="bg-[#F8F4EE] rounded-xl p-6 md:p-8 mt-3">
              <div className="space-y-2 text-[15px] md:text-[16px] text-[#333]">
                <p><span className="font-semibold text-[#222]">성명:</span> {manager.name}</p>
                <p><span className="font-semibold text-[#222]">연락처:</span> {manager.phone}</p>
                <p><span className="font-semibold text-[#222]">이메일:</span> {manager.email}</p>
              </div>
            </div>
            <p className="mt-4">의뢰인께서는 법인의 서비스를 이용하면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해 구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다.</p>
          </Section>

          {/* 제9조 */}
          <Section number={9} title="권익 침해 구제 방법">
            <p>개인정보 침해에 대한 신고나 상담이 필요한 경우, 아래 기관에 문의하시기 바랍니다.</p>
            <ul>
              <li>개인정보 침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
              <li>개인정보 분쟁조정위원회 (kopico.go.kr / 국번없이 1833-6972)</li>
              <li>대검찰청 사이버수사과 (spo.go.kr / 국번없이 1301)</li>
              <li>경찰청 사이버안전국 (cyberbureau.police.go.kr / 국번없이 182)</li>
            </ul>
          </Section>

          {/* 제10조 */}
          <Section number={10} title="개인정보처리방침의 변경" isLast>
            <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는 변경 사항의 시행 7일 전부터 공지사항을 통하여 고지합니다.</p>
            <div className="bg-[#F8F4EE] rounded-xl p-6 mt-4">
              <p className="text-[15px] text-[#333]">
                <span className="font-semibold text-[#222]">시행일:</span> {EFFECTIVE_DATE}
              </p>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}

/* ── Section Component ── */
function Section({
  number,
  title,
  children,
  isLast = false,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <section className={`${isLast ? "" : "mb-12"}`}>
      <h2 className="text-[18px] md:text-[20px] font-bold text-[#222] mb-4 flex items-baseline gap-2">
        <span className="text-burgundy-500 font-bold">제{number}조</span>
        <span>{title}</span>
      </h2>
      <div className="prose-policy text-[15px] md:text-[16px] text-[#333] leading-[1.85] space-y-3 [&_h4]:text-[15px] [&_h4]:md:text-[16px] [&_h4]:font-semibold [&_h4]:text-[#222] [&_h4]:mt-5 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:leading-[1.8] [&_strong]:font-semibold [&_strong]:text-[#222]">
        {children}
      </div>
    </section>
  );
}
