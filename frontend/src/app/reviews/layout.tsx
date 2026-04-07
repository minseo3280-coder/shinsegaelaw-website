import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "의뢰인 후기 | 법무법인 신세계로",
  description:
    "법무법인 신세계로 의뢰인분들의 솔직한 후기와 승소 사례를 확인하세요.",
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
