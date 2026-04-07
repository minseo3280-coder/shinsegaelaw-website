import SubPageHero from "@/components/shared/SubPageHero";
import SidebarCTA from "@/components/shared/SidebarCTA";

interface SubPageLayoutProps {
  titleEn: string;
  titleKo: string;
  breadcrumbs: { label: string; href?: string }[];
  children: React.ReactNode;
  sidebar?: boolean;
  bannerImage?: string;
  afterBanner?: React.ReactNode;
}

export default function SubPageLayout({
  titleEn,
  titleKo,
  breadcrumbs,
  children,
  sidebar = false,
  bannerImage,
  afterBanner,
}: SubPageLayoutProps) {
  return (
    <>
      <SubPageHero titleEn={titleEn} titleKo={titleKo} breadcrumbs={breadcrumbs} bannerImage={bannerImage} />
      {afterBanner}

      <div className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {sidebar ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
              <div>{children}</div>
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <SidebarCTA />
                </div>
              </aside>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </>
  );
}
