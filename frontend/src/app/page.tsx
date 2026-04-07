import Hero from "@/components/sections/Hero";
import TrustIndicators from "@/components/sections/TrustIndicators";
import CEOSection from "@/components/sections/CEOSection";
import WhyDifferent from "@/components/sections/WhyDifferent";
import Cases from "@/components/sections/Cases";
import CredentialProof from "@/components/sections/CredentialProof";
import Lawyers from "@/components/sections/Lawyers";
import Reviews from "@/components/sections/Reviews";
import CaseWizard from "@/components/sections/CaseWizard";
import ContactCTA from "@/components/sections/ContactCTA";
import DotNavigation from "@/components/ui/DotNavigation";

export default function Home() {
  return (
    <>
      <DotNavigation />
      {/* 1 — 법은 감정의 언어를 이해하지 않습니다 */}
      <Hero />
      {/* 2 — 52년 / 22인 / 1,053건 / 7개팀 */}
      <TrustIndicators />
      {/* 3 — 사건 분석 위자드 */}
      <CaseWizard />
      {/* 4 — 대표변호사 이야기 */}
      <CEOSection />
      {/* 5 — 왜 신세계로인가 */}
      <WhyDifferent />
      {/* 6 — 승소 기록 */}
      <Cases />
      {/* 7 — 자격과 연혁 */}
      <CredentialProof />
      {/* 8 — 전문가 팀 */}
      <Lawyers />
      {/* 9 — 의뢰인 후기 */}
      <Reviews />
      {/* 10 — 상담 신청 */}
      <ContactCTA />
    </>
  );
}
