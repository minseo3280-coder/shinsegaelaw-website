import { Metadata } from "next";
import casesAll from "@/../../data/cases_all.json";
import CaseDetailClient from "./CaseDetailClient";

interface CaseItem {
  id: number;
  k_id: number;
  category: string;
  title: string;
  summary: string;
  result: string;
  lawyers: string[];
  winDate: string;
  hasImages: boolean;
  images: string[];
}

/* ─── SEO: generateMetadata ─── */
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = Number(params.id);
  const allCases = casesAll.cases as CaseItem[];
  const caseItem = allCases.find((c) => c.id === id);

  if (!caseItem) {
    return {
      title: "승소사례 | 법무법인 신세계로",
      description: "법무법인 신세계로의 승소사례를 확인하세요.",
    };
  }

  const description = caseItem.summary
    ? caseItem.summary.slice(0, 160)
    : caseItem.title;

  const ogImage =
    caseItem.hasImages && caseItem.images.length > 0
      ? caseItem.images[0]
      : "/images/office/banner-cases.jpg";

  return {
    title: `${caseItem.title} | 승소사례 | 법무법인 신세계로`,
    description,
    openGraph: {
      title: `${caseItem.title} | 법무법인 신세계로`,
      description,
      type: "article",
      images: [{ url: ogImage, width: 900, height: 563 }],
      siteName: "법무법인 신세계로",
    },
  };
}

/* ─── JSON-LD 구조화 데이터 ─── */
function CaseJsonLd({ id }: { id: number }) {
  const allCases = casesAll.cases as CaseItem[];
  const caseItem = allCases.find((c) => c.id === id);
  if (!caseItem) return null;

  // winDate "2025.09.02" → "2025-09-02"
  const isoDate = caseItem.winDate
    ? caseItem.winDate.replace(/\./g, "-")
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseItem.title,
    description: caseItem.summary || caseItem.title,
    ...(isoDate && { datePublished: isoDate }),
    author: caseItem.lawyers.map((name) => ({
      "@type": "Person",
      name: `${name} 변호사`,
    })),
    publisher: {
      "@type": "LegalService",
      name: "법무법인 신세계로",
      url: "https://shinsegaelaw.kr",
    },
    articleSection: caseItem.category,
    ...(caseItem.hasImages &&
      caseItem.images.length > 0 && {
        image: caseItem.images[0],
      }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ─── Page Component (Server) ─── */
export default function CaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  return (
    <>
      <CaseJsonLd id={id} />
      <CaseDetailClient />
    </>
  );
}
