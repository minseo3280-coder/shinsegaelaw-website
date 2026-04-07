import type { Metadata } from "next";
import teamsData from "@/../../data/teams.json";
import TeamDetailClient from "./TeamDetailClient";

const VALID_SLUGS = teamsData.teams.map((t: { slug: string }) => t.slug);

export function generateStaticParams() {
  return VALID_SLUGS.map((slug: string) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const team = teamsData.teams.find((t: { slug: string; name: string }) => t.slug === params.slug);
  return {
    title: team ? `${team.name} | 법무법인 신세계로` : "전문팀 | 법무법인 신세계로",
    description: team ? `법무법인 신세계로 ${team.name} - 52년 법조 전통의 전문 법률 서비스` : "",
  };
}

export default function TeamDetailPage({ params }: { params: { slug: string } }) {
  return <TeamDetailClient slug={params.slug} />;
}
