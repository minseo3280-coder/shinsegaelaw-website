import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "변호사 소개 | 법무법인 신세계로",
  description:
    "법무법인 신세계로의 이혼·상속 전문 변호사 22인을 소개합니다.",
};

export default function LawyersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
