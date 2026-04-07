import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SubPageHeroProps {
  titleEn?: string;
  titleKo: string;
  breadcrumbs: BreadcrumbItem[];
  bannerImage?: string;
}

export default function SubPageHero({ titleEn, titleKo, breadcrumbs, bannerImage }: SubPageHeroProps) {
  return (
    <div className="relative h-[180px] md:h-[300px] overflow-hidden">
      {/* Background Image */}
      {bannerImage ? (
        <>
          <Image
            src={bannerImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[#0f0f1a]" />
          <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-burgundy-500 opacity-[0.15] blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-burgundy-500 opacity-[0.08] blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:24px_24px]" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 h-full flex flex-col justify-end pb-6 md:pb-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] md:text-[15px] text-white/55 mb-2 md:mb-4">
          <Link href="/" className="hover:text-white/75 transition-colors duration-200">홈</Link>
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight size={12} className="text-white/45" />
              {item.href && i < breadcrumbs.length - 1 ? (
                <Link href={item.href} className="hover:text-white/75 transition-colors duration-200">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white/85">{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        {titleEn && (
          <p className="text-[12px] md:text-[14px] tracking-[0.3em] text-white/65 font-semibold uppercase mb-2 md:mb-3">
            {titleEn}
          </p>
        )}

        <h1 className="text-[22px] md:text-[42px] font-bold text-white tracking-tight">
          {titleKo}
        </h1>
        <div className="w-10 md:w-12 h-[2px] bg-gold-500/60 mt-3 md:mt-4" />
      </div>
    </div>
  );
}
