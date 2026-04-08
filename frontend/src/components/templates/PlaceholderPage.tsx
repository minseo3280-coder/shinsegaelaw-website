import Link from "next/link";
import { Construction } from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import firmData from "@/../../data/firm_info.json";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PlaceholderPageProps {
  title: string;
  breadcrumb: BreadcrumbItem[];
  bannerImage?: string;
}

const bannerMap: Record<string, string> = {
  "신세계로": "/images/office/banner-about.jpg",
  "신세계로 소개": "/images/office/banner-about.jpg",
  "이혼소송": "/images/office/banner-divorce.jpg",
  "상간자소송": "/images/office/banner-adultery.jpg",
  "가사관련 형사소송": "/images/office/banner-inheritance.jpg",
  "전문분야": "/images/office/banner-divorce.jpg",
  "의뢰인후기": "/images/office/banner-reviews.jpg",
};

function getBannerImage(breadcrumb: BreadcrumbItem[], explicit?: string): string {
  if (explicit) return explicit;
  const parentLabel = breadcrumb[0]?.label || "";
  return bannerMap[parentLabel] || "/images/office/banner-about.jpg";
}

export default function PlaceholderPage({ title, breadcrumb, bannerImage }: PlaceholderPageProps) {
  const isPractice = breadcrumb.some((b) => b.href?.startsWith("/practice")) || ["이혼소송", "상간자소송", "가사관련 형사소송", "전문분야"].includes(breadcrumb[0]?.label || "");

  return (
    <>
      <SubPageHero
        titleKo={title}
        breadcrumbs={breadcrumb}
        bannerImage={getBannerImage(breadcrumb, bannerImage)}
      />

      {isPractice && <PracticeTabs />}

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-lg mx-auto">
          <Construction size={48} className="text-burgundy-200 mx-auto mb-6" />
          <p className="text-xl font-semibold text-foreground mb-3">
            해당 페이지는 준비 중입니다.
          </p>
          <p className="text-[16px] text-muted-foreground mb-8">
            빠른 시일 내에 업데이트하겠습니다.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/consultation"
              className="bg-burgundy-500 hover:bg-burgundy-600 text-white px-6 py-3 rounded-full text-[16px] font-semibold transition-all duration-300"
            >
              상담 예약
            </Link>
            <a
              href={`tel:${firmData.offices[0].phone}`}
              className="border border-border text-foreground px-6 py-3 rounded-full text-[16px] transition-all duration-300 hover:bg-muted"
              aria-label={`전화 상담 ${firmData.offices[0].phone}`}
            >
              {firmData.offices[0].phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
