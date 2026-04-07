import type { Metadata } from "next";
import SubPageHero from "@/components/shared/SubPageHero";
import firmData from "@/../../data/firm_info.json";

export const metadata: Metadata = {
  title: "이용약관 | 법무법인 신세계로",
  description: "법무법인 신세계로 웹사이트 이용약관입니다.",
};

const EFFECTIVE_DATE = "2025년 1월 1일";

export default function TermsPage() {
  return (
    <>
      <SubPageHero
        titleEn="TERMS OF SERVICE"
        titleKo="이용약관"
        bannerImage="/images/office/banner-about.jpg"
        breadcrumbs={[
          { label: "신세계로", href: "/about/greeting" },
          { label: "이용약관" },
        ]}
      />

      <div className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[15px] md:text-[16px] text-[#555] leading-relaxed mb-10">
            본 약관은 {firmData.firm_name}(이하 &ldquo;법인&rdquo;)이 운영하는 웹사이트(이하 &ldquo;사이트&rdquo;)의
            이용 조건 및 절차에 관한 사항을 규정합니다.
            사이트를 이용하시는 분은 본 약관에 동의하신 것으로 간주합니다.
          </p>

          {/* 제1조 */}
          <Section number={1} title="목적">
            <p>본 약관은 법인이 제공하는 웹사이트 서비스의 이용 조건, 법인과 이용자 간의 권리 및 의무, 책임 사항 등을 규정함을 목적으로 합니다.</p>
          </Section>

          {/* 제2조 */}
          <Section number={2} title="용어의 정의">
            <ul>
              <li><strong>&ldquo;사이트&rdquo;</strong>란 법인이 운영하는 인터넷 웹사이트({firmData.website})를 말합니다.</li>
              <li><strong>&ldquo;이용자&rdquo;</strong>란 본 약관에 따라 사이트에 접속하여 법인이 제공하는 서비스를 이용하는 자를 말합니다.</li>
              <li><strong>&ldquo;서비스&rdquo;</strong>란 사이트를 통해 제공되는 법률 정보, 상담 신청, 승소사례 열람 등 일체의 서비스를 말합니다.</li>
            </ul>
          </Section>

          {/* 제3조 */}
          <Section number={3} title="약관의 효력 및 변경">
            <ul>
              <li>본 약관은 사이트에 게시함으로써 효력이 발생합니다.</li>
              <li>법인은 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있으며, 개정 시 적용일 7일 전부터 사이트에 공지합니다.</li>
              <li>이용자가 변경된 약관에 동의하지 않는 경우, 사이트 이용을 중단할 수 있습니다.</li>
            </ul>
          </Section>

          {/* 제4조 */}
          <Section number={4} title="서비스의 내용">
            <p>법인은 사이트를 통해 다음과 같은 서비스를 제공합니다.</p>
            <ul>
              <li>법률 정보 및 전문분야 안내</li>
              <li>온라인 법률 상담 신청</li>
              <li>승소사례 및 의뢰인 후기 열람</li>
              <li>변호사 및 전문팀 소개</li>
              <li>언론보도 및 법률 칼럼 열람</li>
              <li>기타 법인이 정하는 서비스</li>
            </ul>
          </Section>

          {/* 제5조 */}
          <Section number={5} title="서비스의 제한 및 중단">
            <p>법인은 다음의 경우 서비스의 전부 또는 일부를 제한하거나 중단할 수 있습니다.</p>
            <ul>
              <li>시스템 점검, 교체, 장애 등 기술적 사유가 있는 경우</li>
              <li>천재지변, 비상사태 등 불가항력적 사유가 발생한 경우</li>
              <li>기타 법인이 서비스를 제공할 수 없는 상당한 이유가 있는 경우</li>
            </ul>
          </Section>

          {/* 제6조 */}
          <Section number={6} title="이용자의 의무">
            <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ul>
              <li>타인의 개인정보를 도용하거나 허위 정보를 기재하는 행위</li>
              <li>사이트에 게시된 정보를 무단으로 변경, 삭제하는 행위</li>
              <li>법인 또는 제3자의 저작권, 지적재산권을 침해하는 행위</li>
              <li>사이트의 운영을 방해하거나 안정성을 해치는 행위</li>
              <li>영리 목적의 광고 정보를 무단으로 게시하는 행위</li>
              <li>기타 관련 법령 및 본 약관에 위반되는 행위</li>
            </ul>
          </Section>

          {/* 제7조 */}
          <Section number={7} title="법률 상담의 한계">
            <div className="bg-[#F8F4EE] rounded-xl p-6 md:p-8 mt-3">
              <p className="text-[15px] md:text-[16px] text-[#333] leading-[1.85]">
                사이트를 통한 법률 정보 및 상담 내용은 일반적인 법률 지식의 제공을 목적으로 하며,
                구체적인 법률 자문이나 변호사-의뢰인 관계의 성립을 의미하지 않습니다.
                <br />
                개별 사건에 대한 정확한 법률 자문은 반드시 대면 또는 유선 상담을 통해 진행되어야 합니다.
              </p>
            </div>
          </Section>

          {/* 제8조 */}
          <Section number={8} title="저작권 및 지적재산권">
            <p>사이트에 게시된 모든 콘텐츠(텍스트, 이미지, 영상, 디자인 등)에 대한 저작권 및 지적재산권은 법인에 귀속됩니다.</p>
            <ul>
              <li>이용자는 법인의 사전 서면 동의 없이 사이트의 콘텐츠를 복제, 전송, 출판, 배포, 방송 등의 방법으로 이용하거나 제3자에게 제공할 수 없습니다.</li>
              <li>승소사례 및 의뢰인 후기는 개인정보 보호를 위해 일부 내용이 비식별화 처리되었습니다.</li>
            </ul>
          </Section>

          {/* 제9조 */}
          <Section number={9} title="면책 조항">
            <ul>
              <li>법인은 천재지변, 시스템 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.</li>
              <li>법인은 이용자가 사이트에 게시한 정보의 신뢰성, 정확성에 대해 책임을 지지 않습니다.</li>
              <li>이용자가 사이트를 통해 얻은 정보로 인해 발생한 손해에 대해 법인은 책임을 지지 않습니다.</li>
            </ul>
          </Section>

          {/* 제10조 */}
          <Section number={10} title="분쟁 해결">
            <p>본 약관과 관련된 분쟁이 발생한 경우, 법인과 이용자는 분쟁 해결을 위해 성실히 협의합니다.</p>
            <p>협의가 이루어지지 않을 경우, 법인의 본사 소재지를 관할하는 법원을 제1심 관할법원으로 합니다.</p>
            <div className="bg-[#F8F4EE] rounded-xl p-6 mt-4">
              <div className="space-y-2 text-[15px] md:text-[16px] text-[#333]">
                <p><span className="font-semibold text-[#222]">법인 소재지:</span> {firmData.offices[0].address}</p>
                <p><span className="font-semibold text-[#222]">대표전화:</span> {firmData.main_phone}</p>
              </div>
            </div>
          </Section>

          {/* 부칙 */}
          <Section number={0} title="" isLast>
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-[18px] md:text-[20px] font-bold text-[#222] mb-4">부칙</h2>
              <p>본 약관은 <strong>{EFFECTIVE_DATE}</strong>부터 시행합니다.</p>
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
  if (number === 0) {
    return <section>{children}</section>;
  }

  return (
    <section className={`${isLast ? "" : "mb-12"}`}>
      <h2 className="text-[18px] md:text-[20px] font-bold text-[#222] mb-4 flex items-baseline gap-2">
        <span className="text-burgundy-500 font-bold">제{number}조</span>
        <span>{title}</span>
      </h2>
      <div className="text-[15px] md:text-[16px] text-[#333] leading-[1.85] space-y-3 [&_h4]:text-[15px] [&_h4]:md:text-[16px] [&_h4]:font-semibold [&_h4]:text-[#222] [&_h4]:mt-5 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:leading-[1.8] [&_strong]:font-semibold [&_strong]:text-[#222]">
        {children}
      </div>
    </section>
  );
}
