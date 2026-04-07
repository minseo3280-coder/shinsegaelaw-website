import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-2 text-[13px] text-white/30">
      <Link href="/" className="hover:text-white/50 transition-colors duration-200">
        홈
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight size={12} className="text-white/20" />
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="hover:text-white/50 transition-colors duration-200">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/60">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
