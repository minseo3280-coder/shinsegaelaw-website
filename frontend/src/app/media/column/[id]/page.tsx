import { Metadata } from "next";
import columnsData from "@/../../data/columns.json";
import ColumnDetailClient from "./ColumnDetailClient";

interface ColumnArticle {
  k_id: number;
  title: string;
  date: string;
  lawyer?: string;
  content?: string;
  source?: string;
  views?: number;
  images?: string[];
}

const articles = columnsData.articles as ColumnArticle[];

/* ─── SEO: generateMetadata ─── */
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = Number(params.id);
  const article = articles.find((a) => a.k_id === id);

  if (!article) {
    return {
      title: "칼럼 | 법무법인 신세계로",
      description: "법무법인 신세계로의 법률 칼럼을 확인하세요.",
    };
  }

  return {
    title: `${article.title} | 신세계로 칼럼`,
    description: article.content
      ? article.content.replace(/\n/g, " ").slice(0, 160)
      : article.title,
    openGraph: {
      title: article.title,
      description: article.content
        ? article.content.replace(/\n/g, " ").slice(0, 160)
        : article.title,
      type: "article",
    },
  };
}

/* ─── JSON-LD ─── */
function ArticleJsonLd({ article }: { article: ColumnArticle }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.lawyer || "법무법인 신세계로",
    },
    publisher: {
      "@type": "LegalService",
      name: "법무법인 신세계로",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ─── Page ─── */
export default function ColumnDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const article = articles.find((a) => a.k_id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#444444]">칼럼을 찾을 수 없습니다.</p>
      </div>
    );
  }

  // Get adjacent articles for navigation
  const currentIdx = articles.findIndex((a) => a.k_id === id);
  const prevArticle = currentIdx < articles.length - 1 ? articles[currentIdx + 1] : null;
  const nextArticle = currentIdx > 0 ? articles[currentIdx - 1] : null;

  // Related articles (same source, exclude current)
  const related = articles
    .filter((a) => a.k_id !== id && a.source === article.source)
    .slice(0, 4);

  // Popular articles (top 5 by views)
  const popular = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  return (
    <>
      <ArticleJsonLd article={article} />
      <ColumnDetailClient
        article={article}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
        relatedArticles={related}
        popularArticles={popular}
      />
    </>
  );
}
