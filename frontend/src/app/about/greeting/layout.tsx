import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "인사말 | 법무법인 신세계로",
  description:
    "법무법인 신세계로 대표변호사 인사말. 이혼은 존엄한 선택입니다.",
};

export default function GreetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
