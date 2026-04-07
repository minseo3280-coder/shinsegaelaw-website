import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import ScrollToTop from "@/components/layout/ScrollToTop";
// StickyConsultationBar removed — FloatingCTA covers all CTA needs
import HydrationReady from "@/components/layout/HydrationReady";
import ConsultationModal from "@/components/sections/ConsultationModal";
import { ConsultationProvider } from "@/lib/consultation-context";
// Lenis removed — native scroll is faster and more natural
import firmData from "@/../../data/firm_info.json";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shinsegaelaw.kr"),
  title: "법무법인 신세계로 | 이혼·상속 전문 로펌",
  description:
    "52년 법조전통, 22인의 이혼·상속 전문 변호사가 함께하는 법무법인 신세계로. 열정과 전문성으로 당신의 권리를 지켜드리겠습니다.",
  keywords: [
    "법무법인 신세계로",
    "이혼전문변호사",
    "상속전문변호사",
    "이혼소송",
    "재산분할",
    "위자료",
    "상간자소송",
  ],
  openGraph: {
    title: "법무법인 신세계로 | 이혼·상속 전문 로펌",
    description:
      "52년 법조전통, 22인의 이혼·상속 전문 변호사가 함께하는 법무법인 신세계로",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/images/etc/meta-og.jpg", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: firmData.firm_name,
  url: firmData.website,
  telephone: firmData.main_phone,
  description: firmData.description,
  address: firmData.offices.map((office) => ({
    "@type": "PostalAddress",
    name: office.name,
    streetAddress: office.address,
    addressCountry: "KR",
  })),
  areaServed: "KR",
  openingHours: "Mo-Fr 09:00-18:00",
  founder: { "@type": "Person", name: firmData.representative },
  foundingDate: String(firmData.established),
  numberOfEmployees: String(firmData.total_lawyers),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Nanum+Pen+Script&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-burgundy-500 focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          본문 바로가기
        </a>
        <ConsultationProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            {/* 모바일 FloatingCTA 높이만큼 하단 여백 확보 */}
            <div className="h-[60px] lg:hidden" aria-hidden="true" />
            <FloatingCTA />
            <ScrollToTop />
            <ConsultationModal />
            <HydrationReady />
        </ConsultationProvider>
      </body>
    </html>
  );
}
