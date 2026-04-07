"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, Shield, Gavel, Landmark, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, fadeInUp, EASE } from "@/lib/motion";

const iconMap: Record<string, React.ElementType> = {
  gavel: Gavel,
  shield: Shield,
  "balance-scale": Scale,
  landmark: Landmark,
};

interface PracticeArea {
  id: number;
  name: string;
  name_en: string;
  icon: string;
  description: string;
  subcategories: { name: string; description: string }[];
}

interface CaseItem {
  id: number;
  category: string;
  title: string;
  summary: string;
  result: string;
  result_type: string;
  tags: string[];
}

export default function PracticeAreaTemplate({
  area,
  relatedCases,
}: {
  area: PracticeArea;
  relatedCases: CaseItem[];
}) {
  const Icon = iconMap[area.icon] || Scale;

  return (
    <div>
      {/* Overview */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-burgundy-50 flex items-center justify-center">
            <Icon className="w-7 h-7 text-burgundy-500" />
          </div>
          <div>
            <p className="text-[13px] tracking-[0.2em] text-burgundy-500 font-semibold uppercase">
              {area.name_en}
            </p>
            <h2 className="text-2xl font-bold text-navy-900">{area.name}</h2>
          </div>
        </div>
        <div className="w-12 h-[2px] bg-gold-400 mb-6" />
        <p className="text-base md:text-lg text-[#333333] leading-relaxed max-w-3xl">
          {area.description}
        </p>
      </motion.div>

      {/* Subcategories */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <h3 className="text-xl font-bold text-navy-900 mb-8">세부 분야</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {area.subcategories.map((sub) => (
            <motion.div
              key={sub.name}
              variants={fadeInUp}
              className="group p-6 rounded-2xl border border-gray-100 bg-white hover:border-burgundy-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
            >
              <h4 className="text-base font-bold text-navy-900 mb-2 group-hover:text-burgundy-600 transition-colors">
                {sub.name}
              </h4>
              <p className="text-sm text-[#444444] leading-relaxed">
                {sub.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-navy-900">관련 승소사례</h3>
            <Link
              href="/cases"
              className="flex items-center gap-1 text-sm text-burgundy-500 hover:text-burgundy-600 font-semibold transition-colors"
            >
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {relatedCases.slice(0, 4).map((caseItem) => (
              <div
                key={caseItem.id}
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-burgundy-100 hover:shadow-lg transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-burgundy-500 text-white text-[12px] px-3 py-0.5 rounded-full">
                    {caseItem.category}
                  </Badge>
                  <Badge variant="outline" className="text-[12px] px-3 py-0.5 rounded-full text-[#444444] border-gray-200">
                    {caseItem.result_type}
                  </Badge>
                </div>
                <h4 className="text-base font-bold text-navy-900 mb-2 leading-snug">
                  {caseItem.title}
                </h4>
                <p className="text-sm text-[#444444] line-clamp-2 mb-3">
                  {caseItem.summary}
                </p>
                <p className="text-sm font-semibold text-burgundy-500">
                  {caseItem.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
