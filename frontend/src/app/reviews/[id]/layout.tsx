import type { Metadata } from "next";
import reviewsData from "@/../../data/reviews.json";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const reviews = reviewsData.reviews;
  const review =
    reviews.find((r) => r.id === Number(params.id)) ||
    reviews[Number(params.id)] ||
    null;

  return {
    title: review
      ? `${review.title} | 법무법인 신세계로`
      : "의뢰인 후기 | 법무법인 신세계로",
    description:
      review?.content?.slice(0, 120) ||
      "법무법인 신세계로 의뢰인 후기",
  };
}

export default function ReviewDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
