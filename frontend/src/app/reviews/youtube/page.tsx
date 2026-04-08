import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import CasesTabs from "@/components/shared/CasesTabs";
import youtubeData from "@/../../data/youtube.json";
import firmData from "@/../../data/firm_info.json";

export default function YoutubePage() {
  const featured = youtubeData.featured_video;
  const videos = youtubeData.recent_videos;
  const channelUrl = youtubeData.channels[0].url;

  return (
    <div className="">
      <SubPageHero
        titleKo="유튜브채널"
        breadcrumbs={[
          { label: "의뢰인후기", href: "/reviews" },
          { label: "유튜브채널" },
        ]}
        bannerImage="/images/office/banner-reviews.jpg"
      />

      <CasesTabs />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Featured Video */}
        <div className="w-full aspect-video rounded-[12px] overflow-hidden">
          <iframe
            src={featured.embed_url}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="대표 영상"
          />
        </div>
        <h2 className="text-[18px] font-bold text-foreground mt-4">
          조인섭 변호사의 이혼 법률 상담
        </h2>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {videos.map((video, i) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video rounded-[8px] overflow-hidden bg-muted">
                <Image
                  src={video.thumbnail}
                  alt={`영상 ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play size={40} className="text-white" />
                </div>
              </div>
              <p className="text-[15px] font-semibold text-foreground mt-3 line-clamp-2">
                이혼 법률 상담 #{i + 1}
              </p>
            </a>
          ))}
        </div>

        {/* Channel Link */}
        <div className="mt-10 text-center">
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-burgundy-500 font-semibold hover:text-burgundy-700 transition-colors duration-200"
          >
            조인섭 변호사 채널 바로가기 →
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
