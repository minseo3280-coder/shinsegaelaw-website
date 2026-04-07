import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "52년 법조전통 | 법무법인 신세계로",
  description:
    "사법시험 시절부터 2대에 걸쳐 이어온 52년 법조 전통. 법무법인 신세계로.",
};

export default function TraditionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
