import Link from "next/link";
import { Scale, Landmark, PiggyBank, Users } from "lucide-react";

const shortcuts = [
  { label: "이혼상담", icon: Scale, href: "/practice/divorce" },
  { label: "상속상담", icon: Landmark, href: "/practice/criminal" },
  { label: "재산분할", icon: PiggyBank, href: "/practice/divorce/property" },
  { label: "양육권", icon: Users, href: "/practice/divorce/custody" },
];

export default function ShortcutBar() {
  return (
    <section className="hidden md:block py-6 bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 flex justify-center gap-6 sm:gap-12 md:gap-20">
        {shortcuts.map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-xl bg-burgundy-50 flex items-center justify-center group-hover:bg-burgundy-500 transition-all duration-300">
              <item.icon className="w-6 h-6 text-burgundy-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="text-[15px] font-semibold text-[#333333] group-hover:text-burgundy-500 transition-colors">{item.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
