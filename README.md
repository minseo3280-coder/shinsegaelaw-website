# 법무법인 신세계로 웹사이트

> 52년 법조 전통, 22인의 이혼/상속 전문 변호사 — 법무법인 신세계로 공식 웹사이트

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS 3** + tailwindcss-animate
- **Radix UI** (Dialog, Tabs, Select 등)
- **Framer Motion** (서브페이지 애니메이션)
- **Embla Carousel** / **Swiper** (슬라이더)
- **Lucide React** (아이콘)

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

`http://localhost:3000`에서 확인

## Project Structure

```
shinsegaela_website/
├── data/              # JSON 데이터 (크롤링 원본)
│   ├── lawyers.json        # 변호사 22명
│   ├── cases_all.json      # 승소사례 1,053건
│   ├── reviews.json        # 의뢰인 후기 90건
│   ├── press.json          # 언론기사 1,010건
│   ├── columns.json        # 법률 칼럼 637건
│   ├── youtube.json        # YouTube 451개
│   ├── shorts.json         # Shorts 553개
│   └── ...
├── frontend/          # Next.js 앱
│   ├── src/
│   │   ├── app/            # 페이지 라우트
│   │   ├── components/     # UI 컴포넌트
│   │   └── lib/            # 유틸리티
│   └── public/images/      # 이미지 에셋
└── scripts/           # 크롤링 스크립트
```

## Pages

### Main
- Hero (시네마틱 영상 배경 + 골드 CTA)
- Trust Indicators (52년 / 22인 / 1,053건+ / 7개팀)
- CEO Section (대표변호사 소개 + 인용문)
- Cases (승소사례 카드 + 도장 씰)
- Lawyers (변호사 캐러셀)
- Reviews (의뢰인 후기)
- Contact CTA (6-Step 상담 프로세스 + 상담 폼)

### Sub Pages (26개)
- **/about** — 인사말, 가족법전문 제1호, 52년 법조전통, 신세계로 시스템, 오시는 길
- **/about/lawyers** — 변호사 22명 프로필 + 개별 상세페이지
- **/about/teams** — 7개 전문팀 상세 (이혼소송총괄/재산분할/위자료/친권양육권/가족관계/형사/신청사건)
- **/cases** — 승소사례 1,053건 (필터/검색/페이지네이션)
- **/reviews** — 의뢰인 후기 90건
- **/practice** — 업무분야 14개 커스텀 랜딩 페이지
- **/news** — 신세계로 소식
- **/press** — 언론보도 1,010건
- **/media/channel** — YouTube + Shorts + 웹툰 통합
- **/media/column** — 법률 칼럼 637건
- **/consultation** — 상담신청

## Design

- **Primary**: Burgundy (#9B2335)
- **Accent**: Gold (#C9A84C)
- **Font**: Pretendard (본문) + Gowun Batang (헤드라인)
- **Animation**: ScrollReveal (IO 기반, SSR-safe)

## Deployment

EC2 배포 (PM2):
```bash
# 빌드
cd frontend && npm run build

# EC2 배포 절차는 CLAUDE.md 참조
```

## License

Private - All Rights Reserved
