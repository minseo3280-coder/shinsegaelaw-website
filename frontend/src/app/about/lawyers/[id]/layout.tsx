import type { Metadata } from "next";
import lawyersData from "@/../../data/lawyers.json";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const lawyer = lawyersData.lawyers.find(
    (l) => String(l.id) === params.id || l.name === decodeURIComponent(params.id)
  );
  return {
    title: lawyer
      ? `${lawyer.name} ${lawyer.position} | 법무법인 신세계로`
      : "변호사 소개 | 법무법인 신세계로",
    description: lawyer?.intro?.[0]?.slice(0, 120) || "법무법인 신세계로 변호사 소개",
  };
}

export default function LawyerDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
