// ─── 사이트 상수 ───

export const SITE_CONFIG = {
  name: "법무법인 신세계로",
  nameEn: "Shinsegae Law",
  slogan: "열정과 전문성으로 당신의 권리를 지켜드리겠습니다",
  subSlogan: "이혼은 다시 행복할 권리",
  established: 1970,
  traditionYears: 52,
  totalLawyers: 18,
  specialtyTeams: 7,
  mainPhone: "1555-5961",
  representative: "조인섭 대표변호사",
} as const;

export const OFFICES = [
  {
    name: "서울본사",
    address: "서울시 서초구 법원로 16, 207호",
    phone: "02-594-2800",
    fax: "02-594-2830",
  },
  {
    name: "대전지사",
    address: "대전광역시 서구 둔산로123번길 43, 201호",
    phone: "042-471-2833",
  },
  {
    name: "수원지사",
    address: "경기도 수원시 영통구 봉영로 1605, 208호",
    phone: "031-202-2833",
  },
] as const;

export const NAV_ITEMS = [
  {
    label: "신세계로",
    href: "/about/greeting",
    children: [
      { label: "인사말", href: "/about/greeting" },
      { label: "52년 법조전통", href: "/about/tradition" },
      { label: "신세계로 시스템", href: "/about/system" },
      { label: "오시는 길", href: "/about/location" },
    ],
  },
  {
    label: "업무분야",
    href: "/practice/divorce",
    children: [
      { label: "이혼소송", href: "/practice/divorce" },
      { label: "상간자소송", href: "/practice/adultery" },
      { label: "형사소송", href: "/practice/criminal" },
    ],
  },
  {
    label: "해결사례",
    href: "/cases",
    children: [
      { label: "승소사례", href: "/cases" },
      { label: "의뢰인 후기", href: "/reviews" },
    ],
  },
  {
    label: "구성원",
    href: "/about/lawyers",
    children: [
      { label: "변호사 소개", href: "/about/lawyers" },
      { label: "전문팀 소개", href: "/about/teams/divorce-general" },
    ],
  },
  {
    label: "소식/자료",
    href: "/news",
    children: [
      { label: "신세계로 소식", href: "/news" },
      { label: "언론보도", href: "/press" },
      { label: "영상채널", href: "/media/channel" },
      { label: "법률 칼럼", href: "/media/column" },
    ],
  },
  {
    label: "상담신청",
    href: "/consultation",
    children: [
      { label: "온라인 상담", href: "/consultation" },
      { label: "법률상담 게시판", href: "/consultation/board" },
    ],
  },
] as const;

export const SOCIAL_LINKS = {
  youtube: "https://www.youtube.com/@cho_ssglaw",
  blog: "#",
  instagram: "#",
  kakaotalk: "#",
  naverCafe: "#",
} as const;
