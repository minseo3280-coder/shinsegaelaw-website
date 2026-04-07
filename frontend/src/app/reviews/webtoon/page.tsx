import Link from "next/link";
import Image from "next/image";
import SubPageHero from "@/components/shared/SubPageHero";
import CasesTabs from "@/components/shared/CasesTabs";
import firmData from "@/../../data/firm_info.json";
import webtoonData from "@/../../data/webtoon.json";

export default function WebtoonPage() {
  return (
    <div className="">
      <SubPageHero
        titleKo="인스타웹툰"
        breadcrumbs={[
          { label: "의뢰인후기", href: "/reviews" },
          { label: "인스타웹툰" },
        ]}
        bannerImage="/images/office/banner-reviews.jpg"
      />

      <CasesTabs />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            {webtoonData.meta.title}
          </h2>
          <p className="text-[14px] text-muted-foreground">
            {webtoonData.meta.description}
          </p>
        </div>

        {/* Webtoon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {webtoonData.episodes.map((ep) => (
            <a
              key={ep.id}
              href={ep.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-[3/4] rounded-[12px] overflow-hidden border border-border">
                <Image
                  src={ep.image}
                  alt={ep.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <p className="mt-2 text-[13px] text-muted-foreground text-center truncate">
                {ep.title}
              </p>
            </a>
          ))}
        </div>

        {/* Instagram Link */}
        <div className="mt-10 text-center">
          <a
            href={webtoonData.meta.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-burgundy-500 font-semibold hover:text-burgundy-700 transition-colors duration-200"
          >
            인스타그램에서 더 보기 →
          </a>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 py-10 border-t border-border text-center">
          <p className="text-[16px] font-semibold text-foreground mb-2">법률 상담이 필요하신가요?</p>
          <a href={`tel:${firmData.offices[0].phone}`} className="text-[14px] text-muted-foreground mb-4 inline-block hover:text-burgundy-500 transition-colors">{firmData.offices[0].phone}</a>
          <Link
            href="/consultation"
            className="bg-burgundy-500 hover:bg-burgundy-600 text-white px-6 py-3 rounded-full text-[14px] font-semibold transition-all duration-300 inline-block"
          >
            상담 예약하기
          </Link>
        </div>
      </div>
    </div>
  );
}
