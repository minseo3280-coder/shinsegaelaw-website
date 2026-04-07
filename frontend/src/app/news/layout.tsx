import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "미디어 | 법무법인 신세계로",
  description:
    "법무법인 신세계로의 주요 소식과 활동을 소개합니다.",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
