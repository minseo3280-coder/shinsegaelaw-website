import Link from "next/link";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";

interface CaseItem {
  id: number;
  category: string;
  title: string;
  result: string;
}

interface PracticeDetailPageProps {
  title: string;
  breadcrumbLabel: string;
  content: React.ReactNode;
  relatedCases: CaseItem[];
}

export default function PracticeDetailPage({
  title,
  breadcrumbLabel,
  content,
  relatedCases,
}: PracticeDetailPageProps) {
  return (
    <>
      <SubPageHero
        titleKo={title}
        breadcrumbs={[
          { label: "이혼소송", href: "/practice/divorce" },
          { label: breadcrumbLabel },
        ]}
        bannerImage="/images/office/banner-divorce.jpg"
      />

      <PracticeTabs />

      {/* Body */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-[1100px]">
          <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
          <div className="text-[16px] text-muted-foreground leading-relaxed mb-12 space-y-4">
            {content}
          </div>

          {/* Related Cases */}
          {relatedCases.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">관련 승소사례</h3>
              <div className="w-10 h-[2px] bg-gold-500 mb-6" />
              <div className="space-y-4">
                {relatedCases.map((c) => (
                  <Link key={c.id} href="/cases" className="block">
                    <div className="border-l-[4px] border-l-burgundy-500 p-4 bg-background border border-border rounded-[8px] hover:border-burgundy-200 transition-colors duration-200">
                      <span className="text-[15px] px-2 py-0.5 rounded-full bg-burgundy-50 text-burgundy-600 font-semibold">
                        {c.category}
                      </span>
                      <p className="text-[16px] font-semibold text-foreground mt-2 line-clamp-1">
                        {c.title}
                      </p>
                      <p className="text-[16px] text-burgundy-500 font-semibold mt-1">
                        {c.result}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
