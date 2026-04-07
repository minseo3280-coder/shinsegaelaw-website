# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트: 법무법인 신세계로 웹사이트 리뉴얼

### 핵심 목표
- 기존 사이트(shinsegaelaw.kr) 내용/구조 유지, 디자인을 버건디 프리미엄으로, 기존 사이트보다 확실히 좋은 리뉴얼 사이트 여백, 애니메이션, 모바일 전부 압도
- 20년차 된 개발자가 만든 수준이어야함
- 로펌이기때문에 전문적이고 세련된 디자인느낌
- 20년차 된 개발자가 만든 수준이어야함
- 기존 사이트보다 훨씬 좋은 퀄리티여야함
- 두산(https://www.doosan.com/kr)을 모티브로 삼음.

### 레퍼런스
- 해외 로펌 디자인 참고: kirkland.com, quinnemanuel.com, wlrk.com, skadden.com


### 현재 진행 상황 (2026-04-07 기준)

#### 메인 페이지 (v18 — 7섹션 정제, embrain 스타일 애니메이션, 경쟁사 비교 기반 프리미엄 리디자인)
Hero → TrustIndicators → CEOSection → Cases → Lawyers → Reviews → ContactCTA
+ DotNavigation (우측 세로 도트 7개) + FloatingCTA (우하단 4개 액션)

**v18에서 삭제된 섹션 (6개):** ShortcutBar, AwardsBanner, EmotionalCopy, WhyUs, TeamsSection, MediaSection — CEO 섹션과 역할 중복, 의뢰인에게 불필요, 프리미엄 톤 유지

- Hero: 시네마틱 다크 그라디언트 오버레이(from-black/60 via-black/40 to-black/70) + font-serif 90px 법인명 + 골드 악센트 + 서브카피 "52년 법조 전통, 19인의 전문가가 새로운 시작을 함께합니다" + 버건디 CTA pill "무료 상담 신청" + 4줄 순차 등장(0.3s→0.6s→0.9s→1.2s) + SCROLL 인디케이터(1.5s 딜레이)
- TrustIndicators: 해림 스타일 다크 플로팅 카드(`#181820`, -mt-24 히어로 오버랩) + 금색 숫자(`#C9A84C`, 48~68px) + Lucide 아이콘(동그라미 없음, 38px) + 라벨 1개만
- CEOSection: 원본 사이트(이혼전문.com) 글귀 반영 — 서브카피 "법은 감정의 언어를 이해하지 않습니다" + 인용문 "법원의 기록은 결코 거짓을 말하지 않습니다" + 조두순 사건 경력 최상단 + 텍스트 링크 "조인섭 변호사 자세히보기" + 전체 사이즈업(헤드라인 60px, 서브 20px, 인용문 24px) + **CEO 사진 clip-path reveal 애니메이션**(embrain 스타일 좌→우 와이프, 1.2s easeOutQuart)
- Cases: 카피 변경 "성과는 말로 꾸며지지 않습니다. 성과는 기록으로 남습니다." + 서브카피 "비식별화된 판결문으로 검증" + Swiper FreeMode + 96px 총 건수
- Lawyers: 4열 균등 그리드(8명) + 호버 오버레이(전문분야+프로필보기) + 베이지 배경
- Reviews: **흰 배경**(bg-white) + 텍스트 중심 깔끔 카드(결과뱃지+인용부호 후기+담당변호사) + 별점 제거
- ContactCTA: 감성카피 + 검색태그 12개 + 안심뱃지 3개 + 대형전화번호

**애니메이션 시스템 (embrain.com 참고):**
- ScrollReveal: translateY(80px) + 0.7s + easeOutQuart `cubic-bezier(0.165,0.84,0.44,1)`
- Hero: heroFadeUp 키프레임 + 순차 딜레이(0.3~1.5s) + scrollLine 인디케이터
- CEO 사진: clipReveal 키프레임(clip-path polygon 좌→우, 1.2s) + IO sentinel 패턴
- 카드 호버: -translate-y-2 + shadow 깊어짐 + duration-500
- 헤더 탭: 점 인디케이터 제거 → **밑줄 slide-in 애니메이션** (w-0→w-full, duration-300)
- 메가메뉴: opacity+translateY(-8→0) 0.2s 슬라이드 다운 + pt-6 pb-8 여유 패딩 + hover:bg-gray-50

**경쟁사 분석 완료:** YK법무법인, 대륜법무법인, 해림, 원본 사이트(이혼전문.com) 메인 구성 비교
- YK/대륜: 메인에 CEO 섹션·팀 리스트 없음, sans-serif만 사용, 골드 악센트 없음
- 신세계로 차별점: serif+photo+quote CEO 패턴(해외 프리미엄 로펌 스타일), 골드 악센트, 원본 사이트 감성 카피 활용, embrain 급 스크롤 애니메이션
- **레퍼런스**: YK법률사무소, 대륜법무법인, embrain.com(애니메이션), 원본 shinsegaelaw.kr 문구 차용

#### 레이아웃/공통 컴포넌트 (전체 완료)
- Header: 세종 스타일 1행 투명 + 5탭 프리미엄 메가메뉴 (골드 상단라인+글래스모피즘+Featured영역+stagger 애니메이션) + CTA pill + 검색 오버레이 + 모바일 풀스크린
- Footer: 프리미엄 (로고+Since 1970+골드라인+4컬럼+Latest News 위젯+대표번호CTA+사업자정보)
- FloatingCTA: 4개 액션 (상담/카카오톡/SMS/전화), ScrollToTop: 스크롤 300px↑ 시 표시
- ConsultationModal: 버건디 그라데이션, loading.tsx: 로고+골드스피너
- ScrollReveal/StaggerContainer: SSR-safe IO 기반 스크롤 애니메이션
- SubPageHero/SubPageLayout: 배너이미지 prop, 다크 fallback, 브레드크럼, afterBanner prop
- SidebarCTA/MobileCTA: 다크bg+버건디/골드 빛번짐+골드버튼 공통 컴포넌트, firmData.offices[0].phone 데이터 소스 사용 (SidebarCTA는 서브페이지에서 제거, MobileCTA만 사용)
- AboutTabs(4탭: 인사말/52년법조전통/신세계로시스템/오시는길), MediaTabs(3그룹: News+Channel+Column, 6탭, /media/* 경로), LawyerTabs(8탭: 변호사소개+7개팀), CasesTabs(승소사례+의뢰인후기 통합), PracticeTabs(2단: 그룹3개+세부항목14개), DotNavigation(7개: 홈/신뢰/대표/승소사례/변호사/후기/상담)

#### 서브페이지 현황
**실제 콘텐츠 (26개):**
- /about/greeting: **v19 리뉴얼** — 4탭(인사말/52년법조전통/신세계로시스템/오시는길)+대표2명+사진오버레이인용+CoreValues3카드+감성배너+프리미엄서명+카피재작성
- /about/no1: 가족법전문 제1호+카운트업1673명+STEP카드+기사2개
- /about/tradition: **v19 리뉴얼** — 카피전면재작성+세대카드shadow+카운트업burgundy72-88px+기사카드shadow+인용밴드serif
- /about/lawyers: 대표2명+20명 4열그리드+hover오버레이 (22명 총원)
- /about/lawyers/[id]: 프로필히어로+4탭(활동|학력|승소사례|후기)+사이드바
- /about/teams/[slug]: 7개 전문팀 동적라우팅+다크히어로+팀장프로필+프로세스(name+desc)+대표사례(details[])+팀별 맞춤 contextual CTA
- /about/system: **v19 리뉴얼** — 헤드라인재작성+통계(52년/19인/1053건+/7개, 승소율삭제)+bg-[#F8F4EE]통일+팀카드shadow+serif헤딩
- /about/location: **v19 리뉴얼** — 커스텀배너+VISIT US헤드라인+GoogleMaps embed+카카오SDK준비(.env.local)+교통카드hover+전국3사무소shadow카드+CTA밴드bg-[#F8F4EE]+MobileCTA+Pretendard글씨체+사이즈업
- /cases: 피쳐드카드+2열그리드+pill필터(6카테고리+건수)+검색+정렬+페이지네이션+인기승소사례사이드바
- /cases/[id]: 서버/클라이언트 분리(generateMetadata+JSON-LD)+라이트박스+공유/인쇄+인기승소사례사이드바
- /consultation: 상담신청 폼
- /practice/divorce: PracticeAreaTemplate+subcategories 링크
- /practice/divorce/alimony, /practice/divorce/property, /practice/divorce/custody: PracticeDetailPage 템플릿
- /reviews: CasesTabs+검색+필터+인기후기사이드바
- /reviews/[id]: 배너+다중이미지+법무법인답변(33건)+인라인CTA+관련후기+인기후기사이드바
- /news: **v22 전면 리라이트** — MediaTabs+Featured카드(제1호전문변호사)+Swiper캐러셀(원본history_cards9개+골드연도배지)+인용밴드(조두순사건)+YTN라디오+홍보영상+인증변호사6명+인증서갤러리3개+CTA
- /press: **v23 전면 리라이트** — MediaTabs+3열카드그리드(max-w-7xl)+매체별pill필터(YTN494/머니투데이101/아이뉴스24_85/뉴스1_65/파이낸셜뉴스44/기타221)+YouTube썸네일(press_youtube_ids.json 487개 매핑)+언론사로고배너+검색+정렬+페이지네이션+URL쿼리 상태보존
- /press/[id]: **v23 전면 리디자인** — 1컬럼max-w-3xl+카테고리라벨(TV APPEARANCE/PRESS COVERAGE)+기사별YouTube임베드(487개 매핑)+변호사인용문자동감지(burgundy좌측보더)+변호사프로필카드+테이블형이전다음+관련기사+공유인쇄
- /media/channel: **v22 신규** — YouTube(451개)+Shorts(553개)+인스타웹툰(5화) 통합 페이지, 3섹션(white→#F8F4EE→white)
- ~~/media/youtube, /media/shorts, /media/webtoon~~: → `/media/channel`로 리다이렉트 (v22에서 통합)
- /media/column: **v14 신규** — 637건칼럼+검색+필터(전체/YTN라디오/신세계로칼럼)+페이지네이션(12개씩)+인기칼럼사이드바(조회수Top5)
- /media/column/[id]: **v14 신규** — 서버/클라이언트 분리(generateMetadata+JSON-LD)+이미지인터리빙(히어로→인트로블록→번호섹션헤딩→인라인이미지→핵심정리박스→태그)+공유/인쇄+이전/다음+관련칼럼+인기칼럼사이드바

**Redirect (19개):** /reviews/youtube→/media/channel, /reviews/webtoon→/media/channel, /reviews/shorts→/media/channel, /reviews/column→/media/column, /media/youtube→/media/channel, /media/shorts→/media/channel, /media/webtoon→/media/channel, /reviews/media→/news, /about/news→/news, /about/family-law→/about/no1, /about/history→/about/tradition, /about/teams→/about/teams/divorce-general, /about/timeline→/about/greeting, /about/teams/injunction→/about/teams/applications, /about/teams/inheritance→/about/teams/family-relations, /about/teams/adultery-suit→/about/teams/divorce-general

**PlaceholderPage (18개):** divorce 세부 8개(overview/mutual/litigation/preparation/infidelity/international/domestic-violence/family-relations), adultery 5개(메인+claim/process/statute/caution), criminal 5개(메인+defamation/domestic-violence/property/stalking)

#### 서브페이지 배너 이미지 매핑
| 배너 | 적용 경로 |
|------|----------|
| banner-about.jpg | /about/* |
| banner-cases.jpg | /cases, /cases/[id] |
| banner-divorce.jpg | /practice/divorce/* |
| banner-adultery.jpg | /practice/adultery/* |
| banner-inheritance.jpg | /practice/criminal/* |
| banner-consultation.jpg | /consultation |
| banner-reviews.jpg | /reviews/*, /media/* |

#### 데이터/기술 기반 (전체 완료)
- **데이터 크롤링**: lawyers.json(22명+intro/education/label, v28에서 19→22명 업데이트), cases_all.json(1053건 5카테고리: 이혼555/재산분할261/상간112/양육권88/상속37, 이미지1488개 전수확인), cases_crawled_full.json(원본전문 아카이브, 23건 500자잘림 재크롤링 완료), reviews.json(90건+images+reply33건), news.json(13개), press.json(1010건 언론기사), teams.json(7팀+대표사례details+cta), greeting/no1/tradition/faq/awards/whyus.json
- **v14 미디어 데이터 크롤링 (2026-03-26)**:
  - youtube.json: 451개 영상+제목+날짜(349개, 77.4%), 2채널(조인섭변호사+이혼이야기), 최신순 정렬 (2022.04~2026.03)
  - shorts.json: 553개 쇼츠+제목+날짜(550개, 99.5%), 최신순 정렬 (2022.04~2025.07)
  - columns.json: 637건 칼럼+내용+이미지1,818장 로컬저장(/images/columns/), 푸터오염 전수정제, 소스구분(YTN라디오533+신세계로칼럼104)
  - webtoon.json: 5개 에피소드 (원본 완전 일치)
- **데이터 검증 (2026-03-26)**: 칼럼 637건 제목/내용/날짜 누락 0건, 이미지 1,818개 파일 누락 0건, 푸터오염 0건, 쇼츠 553개 빈제목 0건/중복 0건, 유튜브 451개 제목 전수확보
- **접근성**: skip-to-content, aria-label, prefers-reduced-motion, WCAG AA contrast 전면 수정
- **애니메이션**: ScrollReveal/StaggerContainer(메인), useScrollReveal훅(서브), globals.css(data-reveal/data-step/countPulse/underlineGrow)
- **폰트**: Pretendard(본문) + Dancing Script(Hero) + Nanum Pen Script(서명)
- **빌드**: tsconfig target es2017+downlevelIteration, next.config redirect, rimraf .next 캐시 자동 삭제
- **카카오맵**: NEXT_PUBLIC_KAKAO_MAP_KEY in .env.local (JavaScript 앱키), 도메인 등록: localhost:3000, 3.39.246.25:5173, ssgl.blogcash.kr
- **배포**: EC2 3.39.246.25:5173 (PM2 shinsegae)

#### v7 주요 변경 요약 (승소사례+의뢰인후기 리뉴얼)
- CasesTabs: 승소사례 카테고리 탭 제거 → "전체 승소사례" 1개만 (필터링은 pill로 분리)
- /cases: 피쳐드카드(2분할, 금액52px+체크리스트) + 일반카드(2열, 좌측보더+금액영역+배지) + extractAmount/extractResultItems 헬퍼
- /reviews: 6탭→2탭(전체후기+언론매체), 미디어 탭은 MediaTabs으로 분리
- /reviews/youtube, /reviews/webtoon: MediaTabs→CasesTabs 교체

#### v8 주요 변경 요약 (전문팀 데이터 원본 사이트 완전 동기화)
- **LawyerTabs 8탭 원본 일치**: 변호사소개 / 이혼소송총괄팀 / 재산분할팀 / 위자료팀 / 친권·양육권팀 / 가족관계(친자)팀 / 형사사건팀 / 신청사건팀
- **팀 구성 원본 복원**: 상간자소송팀(삭제) → 친권·양육권팀(추가), 상속팀→가족관계(친자)팀, 형사팀→형사사건팀, 보전처분·사전처분팀→신청사건팀
- **팀 slug 변경**: custody(신규), family-relations(←inheritance), applications(←injunction), adultery-suit(삭제)
- **박경내 변호사 추가**: id 19, 친권·양육권팀 팀장 (lawyers.json 19명으로 증가)
- **teams.json 전면 재작성**: specialties/process/cases 전부 원본 사이트(team.php) verbatim 일치
  - process: string[] → {name, desc}[] 객체로 변경 (상세 설명 포함)
  - cases: details[] 필드 추가 (원본의 번호 매긴 상세 설명 전문)
  - specialties: 괄호 내 설명, "등", "대응", "수립" 등 누락 텍스트 전부 복원
- **팀 상세페이지 컴포넌트 업데이트**: process desc 표시, cases details 번호 리스트 표시
- **이전 slug 리다이렉트 3개 추가**: injunction→applications, inheritance→family-relations, adultery-suit→divorce-general

#### v9 주요 변경 요약 (승소사례 상세페이지 퀄리티 업 + 데이터 정합성)
- **page.tsx 서버/클라이언트 분리**: page.tsx(서버, generateMetadata+JSON-LD) + CaseDetailClient.tsx(클라이언트, UI)
- **SEO**: generateMetadata(title/desc/OG), JSON-LD(@type:Article, headline, datePublished, author, publisher:LegalService)
- **라이트박스 접근성**: ESC닫기, 좌우화살표 이동, body scroll lock (useEffect keydown + overflow:hidden)
- **이미지 에러핸들링**: ImageFallback 컴포넌트(ImageOff아이콘+"이미지를 불러올 수 없습니다"), 메인/썸네일/라이트박스 전부 onError 적용
- **공유/인쇄**: ShareButtons(URL복사+공유+인쇄), navigator.clipboard+"복사됨"토스트, navigator.share fallback, @media print(사이드바/CTA숨김, A4)
- **배너 개선**: h1 "{카테고리} 승소사례" 동적표시, 사례 제목 미리보기(line-clamp-1), 브레드크럼 카테고리 단계 추가
- **결과 블록 강화**: 금액있음→큰숫자(기존유지), 금액없고결과있음→burgundy-50배경+gold보더+체크아이콘, 결과없음→에메랄드 승소뱃지
- **면책 조항**: Info아이콘+"본 사례는 의뢰인의 개인정보 보호를 위해 일부 내용이 수정되었으며..." (관련사례 위)
- **데이터 정합성 복구**: cases_all.json 콘텐츠잘림 6건 복구, 변호사누락 141건 복원, result 정리 585건, summary 보강 770건, zero-width문자 전수제거
- **크롤링 500자잘림 21건 재크롤링**: k_id 42~234 중 23건(언론소개사례) 원본에서 전문 재취득 (최대 1,878자)

#### v10 주요 변경 요약 (AboutTabs 5탭 축소 + 신세계로 시스템 독립 페이지)
- **AboutTabs 9탭→5탭**: 인사말/가족법전문제1호/52년법조전통/신세계로시스템/오시는길 (미디어/변호사소개/히스토리/전문팀 삭제)
- **/about/system 독립 페이지 신규**: greeting?tab=3 리다이렉트 → 풀 페이지로 전환
  - 원본 사이트(system.php+team.php) 데이터 100% 반영
  - 4대 강점 탭 전환: 전문성(systemimg_all+미디어로고5개+차별성인용) / 사관학교(인용+교육이미지+mogef인증마크+통계+이혼상속집중시스템) / 완성형시스템(조직도크림카드+4단계STEP+사후관리) / 다시행복할권리(이미지+인용)
  - 7개 전문팀 시스템: teams.json system필드(points/features/flow/operations) + 7팀 카드 그리드(Link→/about/teams/[slug])
  - 카운트업 4개(52년/18인/7개/94%+), 시스템 이미지 18개 다운로드(/images/system/)
- **경로 업데이트**: AboutTabs/constants.ts/Header.tsx 모두 /about/system으로 통일

#### v11 주요 변경 요약 (CTA 중복 제거 + 전화번호 데이터 소스 통일 + 건수 정합성)
- **팀 상세페이지 하단 CTA 리디자인**: 전화카드+인라인밴드 중복 제거 → 팀별 맞춤 contextual CTA 1개로 통합
  - 다크(`#0F0F1A`) 배경 + 버건디/골드 ambient glow + 골드 악센트 라인
  - teams.json에 `cta` 필드 추가 (headline+description, 7개 팀 전부)
  - 버튼 "무료 사건 분석 요청" 1개만 + 전화번호는 보조 텍스트로 축소
  - 카카오톡/SMS/온라인상담 채널 나열 제거 (FloatingCTA에서 담당)
- **전화번호 하드코딩 전면 제거** (12개 파일): 모든 `tel:` 링크를 `firmData` 데이터 소스로 통일
  - `firmData.main_phone` (1555-5961): Header(5곳), FAQSection, location
  - `firmData.offices[0].phone` (02-594-2800): MobileCTA, SidebarCTA, lawyers/page, lawyers/[id], teams/[slug](2곳), PlaceholderPage, press/[id], reviews/youtube, reviews/webtoon
  - 전화번호 변경 시 firm_info.json 1곳만 수정하면 사이트 전체 반영
- **승소사례 건수 정합성 수정**: 1,061→1,053 (실제 cases_all.json 데이터 기준)
  - cases/page.tsx(STATS+본문), reviews/page.tsx(STATS), Header.tsx(메가메뉴 2곳) 총 4곳 수정
- **디자인 품질 개선**:
  - lawyers/[id] 연락처 폰트: 9px/10px/11px → 12px/13px (접근성 최소기준 충족)
  - cases/page.tsx 전화 아이콘: 인라인 SVG → Lucide `<Phone />` (코드베이스 일관성)
- **접근성 강화**: 모든 `tel:` 링크에 `aria-label` 추가 완료

#### v12 주요 변경 요약 (언론매체 상세페이지 개선 + 뒤로가기 상태 보존)
- **YTN 라디오 상세페이지 유튜브 임베드**: 이미지 대신 YouTube 영상(`4C5BehULHVQ`, 조인섭 변호사의 상담소) 임베드
  - 492건 YTN 라디오 기사 중 483건(98%)이 콘텐츠 빈약 (제목+잘린링크만) — 원본 사이트 자체가 동일 구조
  - `isRadioThin` 판별: 콘텐츠 250자 미만 → 라디오 안내 카드 표시 (프로그램 소개 + "YTN 라디오에서 다시듣기" 외부 링크 버튼)
  - 콘텐츠 있는 YTN 기사(18건)는 유튜브 + 본문 내용 둘 다 표시
- **언론매체 목록 뒤로가기 상태 보존**: `useState` → URL 쿼리 파라미터(`useSearchParams`) 기반으로 전환
  - 필터(`?source=YTN`), 검색(`?q=키워드`), 정렬(`?sort=views`), 페이지(`?page=3`) 전부 URL에 저장
  - 기사 클릭 후 뒤로가기 시 필터/검색/정렬/페이지 상태 완전 복원
  - 검색 입력은 로컬 state + 300ms debounce → URL 반영 (타이핑 성능 유지)
- **헤더 메인 네비게이션 탭 순서 변경**: 업무분야→변호사→승소사례→**신세계로→미디어** (기존: 미디어→신세계로)
- **승소사례(/cases) 레이아웃 개선**:
  - CasesTabs를 Stats 위로 이동 (배너→CasesTabs→Stats 순서)
  - 인기 승소사례 사이드바: `grid` → `flex` 기반(메인 `flex-1` / 사이드바 `w-[280px]`), sticky `top-[96px]`, `lg` 이하 숨김
  - 사이드바 카드: 1~3위 버건디 원형 배지, 제목 `line-clamp-2`, 호버 시 버건디 텍스트
- **의뢰인후기(/reviews) 레이아웃 개선**:
  - CasesTabs를 Stats 위로 이동 + Stats 섹션 완전 제거 (승소사례 전용)
  - 인기 후기 사이드바 제거 → 후기 카드 3열 풀 너비(`lg:grid-cols-3`) 복원

#### v13 주요 변경 요약 (업무분야 메뉴 재설계 + PracticeTabs 2단 구조)
- **업무분야 메가메뉴 재설계**: 원본 사이트(shinsegaelaw.kr) 구조와 1:1 매핑
  - 이혼소송 컬럼: 7개→10개 (부정행위(외도), 가정폭력, 가족관계(친자) 추가)
  - 상간자소송 컬럼: 메인 경로 `/practice/adultery/claim`→`/practice/adultery`로 변경, "소송 절차·주의점" / "소송 시효" 라벨 정리
  - 가사관련 형사소송 컬럼: 서브페이지 나열→"형사소송 안내" 단일 링크, Shield 아이콘 추가
  - "상속 분쟁·유류분 청구 / 콘텐츠 준비 중" 제거 (원본에 콘텐츠 없음)
  - "가정폭력(+형사)" 병합 제거 → 이혼 사유 가정폭력(민사)과 형사소송 분리
- **PracticeTabs 2단 탭 컴포넌트 신규**:
  - 1단(그룹): `Divorce 이혼소송` / `Adultery 상간자소송` / `Criminal 가사관련 형사소송` — 영문 gray 라벨 + 한글 볼드 + 골드 그라데이션 하단 라인
  - 2단(세부): 선택 그룹의 항목만 표시 — 버건디 하단 라인 (기존 탭 패턴 통일)
  - 형사소송(항목 1개)은 2단 숨기고 바로 이동
  - sticky top-[80px], 모바일 가로 스크롤 지원
  - PlaceholderPage(practice 경로 자동 감지), PracticeDetailPage, divorce/page.tsx(afterBanner) 전부 적용
- **업무분야 사이드바 CTA 제거**: PracticeDetailPage에서 SidebarCTA+퀵링크 사이드바 전체 제거 → 1컬럼 max-w-3xl 레이아웃. divorce/page.tsx sidebar prop 제거
- **constants.ts NAV_ITEMS 동기화**: 메가메뉴와 동일한 구조로 업데이트 (이혼준비→이혼준비 가이드, 이혼 개요/이혼준비/주의점 개별 삭제, 경로 통일)
- **media/ lint 에러 수정**: youtube(Users/Award), webtoon(ExternalLink), shorts(useMemo/Eye), column(useMemo 복원) 미사용 import 정리

#### v14 주요 변경 요약 (미디어 4개 서브페이지 신규 + 데이터 대규모 크롤링)
- **미디어 페이지 경로 체계 변경**: /reviews/youtube,webtoon → /media/youtube,webtoon,shorts,column (4개 독립 경로)
- **MediaTabs 라우팅 통일**: 6탭 모두 /media/* 또는 /news, /press 직접 경로 (기존 ?tab=N 쿼리 방식 제거)
- **Header 메가메뉴 업데이트**: "의뢰인후기" → "미디어" 메뉴로 변경, 6개 항목 /media/* 경로 연결
- **constants.ts NAV_ITEMS 동기화**: 미디어 메뉴 /media/* 경로 통일
- **next.config.mjs 리다이렉트 4개 추가**: /reviews/youtube→/media/youtube, /reviews/webtoon→/media/webtoon, /reviews/shorts→/media/shorts, /reviews/column→/media/column
- **/media/youtube 신규**: 2채널카드(조인섭변호사+이혼이야기)+대표영상임베드+통계바(2채널/451+영상/52년/1,053건)+451개영상 4열그리드(16개씩 더보기)+날짜표시+구독배너
- **/media/webtoon 신규**: 인스타히어로(그라디언트+Instagram배지)+5화 에피소드그리드(EP배지+hover효과)+인스타그램팔로우배너(그라디언트)
- **/media/shorts 신규**: 553개 쇼츠 5열 세로카드(9:16비율, 30개씩 더보기)+Shorts뱃지+하단그라디언트+날짜표시+카운트뱃지+구독배너
- **/media/column 신규**: 637건 칼럼+검색+pill필터(전체/YTN라디오/신세계로칼럼+건수)+페이지네이션(12개씩, 54페이지)+인기칼럼사이드바(조회수Top5, 링크연결)
- **/media/column/[id] 신규**: 서버/클라이언트 분리(generateMetadata+JSON-LD)+**콘텐츠 파서(parseContent)**: 이미지 자동 인터리빙(히어로이미지→인트로블록→번호섹션헤딩→인라인이미지→핵심정리박스→해시태그)+공유/인쇄/URL복사+이전/다음네비+관련칼럼+인기칼럼사이드바
  - 소제목 자동감지: 40자 이내, 마침표 미종료, 비해시태그 → 버건디 넘버링 헤딩
  - 이미지 배치: 이미지1=히어로, 이미지2~N=각 소제목 앞 인라인
  - 핵심정리: 태그/YTN클로징 앞 2~3문단 자동감지 → 버건디 summary 박스(체크아이콘+불릿리스트)
  - 인트로블록: 첫 1~2문단 → 버건디 좌측보더+그라디언트 배경
  - 하이라이트인용: 버건디-50 배경+좌측보더+이탤릭 (프로토타입 승인)
- **데이터 대규모 크롤링 (2026-03-26)**:
  - youtube.json: 10→451개 (43배 증가), 제목+날짜+썸네일 전수확보, RSS피드 추가분 21개 포함
  - shorts.json: 0→553개 신규, 제목+날짜+썸네일, shinsegaelaw.kr 70페이지 전수크롤링
  - columns.json: 0→637건 신규, 107페이지 전수크롤링+이미지1,818장 로컬다운로드+푸터오염정제(124만자 제거)
  - webtoon.json: 하드코딩→JSON 데이터 기반으로 전환 (5개 에피소드)
- **사이드바 전면 정비**: SidebarCTA 전체 제거 (6개 파일), 인기항목 위젯 추가 (승소사례Top5+후기Top5+칼럼Top5, 조회수 기반, 링크연결)

#### v15 주요 변경 요약 (메인 섹션 최적화 + 브레드크럼 통일 + 서류작성 도우미)
- **메인 페이지 섹션 최적화**:
  - FAQSection 독립 섹션 제거 → ContactCTA 안에 미니 FAQ 3개 흡수 (비용/비밀보장/기간)
  - DotNavigation 9개→8개 (FAQ dot 제거)
  - 변호사 섹션: 4열 그리드 → Embla 캐러셀 (자동 4초, loop, 마우스멈춤) + 하단 화살표+dot 네비게이션
- **브레드크럼 전체 3단계 통일** (18개 파일):
  - `홈 > 섹션 > 현재페이지` 패턴 적용 (예: `홈 > 신세계로 > 인사말`)
  - "신세계로 소개" → "신세계로" 통일, h1을 현재 페이지명으로 변경
  - /about/teams/[slug]: `홈 > 신세계로 > 전문팀 > {팀이름}`
  - /cases, /reviews, /news, /press, /consultation 전부 3단계
- **팀 상세페이지 히어로 개선**: 다크 그라디언트 오버레이 → 변호사소개와 동일한 `bg-black/50` + `opacity-30` 제거
- **Header 활성 탭 로직 수정**:
  - `/about/teams/*` → "변호사" 탭 활성화 (기존: "신세계로" 탭으로 잘못 활성)
  - `/media/*` → "미디어" 탭 활성화 추가
- **PracticeTabs 메뉴명 수정**:
  - 상간자소송: "위자료 청구"→"상간자 위자료 청구", "절차·주의점"→"소송 절차·주의점", "시효"→"소송 시효"
  - 이혼소송: "자녀문제"→"자녀문제(양육권)", "부정행위"→"부정행위(외도)", "가족관계"→"가족관계(친자)"
- **승소사례 카테고리 순서 통일**: 전체→이혼→재산분할→상간→양육권→상속 (헤더 메뉴와 동일)
- **서류작성 도우미 모달 (DocumentModal)**:
  - ContactCTA "서류작성 도우미" 버튼 클릭 → 모달 팝업 (페이지 이동 없음)
  - 2단계 위자드: Step1 서류선택(이혼합의서/협의이혼신청서/자녀양육합의서/조정신청서) → Step2 정보입력(이름/연락처/이메일)
  - 프로그레스 바, 라디오 선택 UI, 완료 상태(체크아이콘+자동닫힘 2.5초)
  - 배경 클릭/X 버튼으로 닫기, 닫을 때 상태 초기화
- **/consultation FAQ 이전**: 메인에서 제거된 FAQ 10개를 /consultation 페이지 하단에 아코디언으로 배치
  - 번호 배지(01~04 버건디, 05~10 그레이), 클릭 열림/닫힘 CSS grid 애니메이션
  - "인기" 뱃지 제거 (법무법인에 부적합)
- **메인 개선 프로토타입 v5 완성** (prototype_main_v5.html):
  - 디자인 원칙 확정: 밝은 배경=버건디 포인트 / 다크 배경=골드 포인트
  - 섹션 리듬: 밝음→밝음→■다크(CEO)→밝음→밝음→■다크(Reviews)→밝음→■다크(Contact)
  - Trust: 히어로 오버랩 카운터바+권위pill / WhyUs: 2×2 호버카드 / CEO: 풀와이드 다크+감정 인용문 / Cases: 비대칭+금액강조 / Media: 숫자카드+로고밴드(FAQ대체)

#### v16 주요 변경 요약 (글로벌 검색 구현 + 푸터 보완 + 메인 ContactCTA 주소 추가)
- **글로벌 검색 기능 구현** (SearchDropdown 컴포넌트):
  - 헤더 돋보기 클릭 → 글래스모피즘 드롭다운 검색창 (기존 풀스크린 블랙 오버레이 제거)
  - 클라이언트 사이드 실시간 검색 (200ms debounce, 백엔드 불필요)
  - 검색 대상: cases_all(1,053건) + lawyers(22명) + reviews(90건) + press(1,010건) + news(13건) = 2,188건
  - 결과 카테고리별 그룹핑 (승소사례 5건 / 변호사 3명 / 후기 3건 / 언론 3건 / 소식 2건 상한)
  - 골드 아이콘(카테고리 구분) + 밝은 버건디 하이라이트(매칭 텍스트) — 역할 분리 확정
  - 검색어 없으면 인기 태그 10개 + 바로가기 3개 (무료상담/변호사/승소사례)
  - ESC / 바깥 클릭 닫힘, 결과 클릭 시 해당 상세페이지 이동
- **메인 ContactCTA 사무소 주소 추가**: 전화번호 아래에 3개 사무소 주소 표시 (firmData 데이터 소스)
- **푸터 보완**:
  - Practice 컬럼: "가사관련 형사소송" 추가
  - About 컬럼: "신세계로 시스템" 추가
  - Offices 컬럼: 각 사무소 주소 추가
  - 하단 사업자정보: 3개 사무소 전부 표기 (주소 + TEL + FAX + 사업자번호), 광고책임변호사 별도 라인

#### v17 주요 변경 요약 (업무분야 14개 서브페이지 완성 + 메인페이지 전면 리디자인)

##### 업무분야 서브페이지 (v13 확장)
- **PracticeTabs 2단 구조 확정**: 1단(Divorce/Adultery/Criminal 영문gray+한글볼드+골드라인) + 2단(세부항목 버건디라인)
- **PracticePageLayout 공통 컴포넌트**: 통계밴드 + 페이지헤더(명조체) + 키포인트카드(Lucide아이콘+호버그라데이션) + 법률콘텐츠(버건디→골드 좌측바) + 인용밴드(풀와이드) + 팀연결카드(라이트배경) + 승소사례(2열카드+금액강조) + 하단CTA(B1 크림밴드+아웃라인버튼)
- **원본 사이트 데이터 전수 크롤링**: divorce_pages.json(10페이지 20,520자), practice_extra_pages.json(5페이지), criminal_page.json(1페이지) — heroText 포함
- **이미지 11개 다운로드**: /public/images/practice/ (trial-procedure/adultery/police/court, alimony-concept, consensual-procedure/concept, international-concept, adultery-process/caution/statute)
- **인용밴드 콘텐츠 중간 삽입**: 상위 40% 섹션 → 인용밴드(풀와이드) → 나머지 섹션
- **이혼소송 10개**: 이혼준비가이드(+이혼개요+사실혼 통합), 협의이혼, 재판이혼, 위자료, 재산분할, 자녀문제, 부정행위, 가정폭력, 가족관계, 국제이혼
- **상간자소송 3개**: 위자료청구, 절차·주의점(병합), 시효 + claim→adultery, caution→process 리다이렉트
- **형사소송 1개**: 7개 카테고리(통비법/개인정보/정보통신망/폭행/아동학대/사문서위조/횡령배임)
- **팀 연결 매핑**: 이혼→이혼소송총괄팀(김미루), 위자료/부정행위→위자료팀(신진희), 재산분할→재산분할팀(류현주), 자녀→친권양육권팀(박경내), 가정폭력/형사→형사사건팀(이명인), 가족관계→가족관계팀(조윤용)
- **next.config.mjs**: /practice/criminal→/practice/adultery 리다이렉트 제거 (실제 페이지 생성)

##### 메인페이지 전면 리디자인
- **플러그인 5개 설치**: gsap, @studio-freight/lenis(→제거), swiper, countup.js, splitting
- **Gowun Batang 명조체**: next/font/google 로드, tailwind fontFamily serif 등록, 타이틀/인용문만 font-serif 적용 (본문 Pretendard 유지)
- **밝은 톤 전면 전환**: 모든 다크 배경(navy #0f0f1a) 제거 → 화이트(#FFF)/웜크림(#F8F4EE)/연베이지(#F3EDE4) 교차
  - Hero: black/75 오버레이 → from-white/85 화이트그라디언트, 텍스트 다크(#2C2028)
  - TrustIndicators: navy → #F8F4EE 웜크림
  - Lawyers: navy → #F8F4EE 웜크림
  - ContactCTA: navy → #F3EDE4 연베이지
  - MediaSection: white → #F8F4EE 웜크림
  - 텍스트 컬러 통일: 헤드라인 #2C2028 / 본문 #4A3F45 / 보조 #8A7E84
- **Hero 전면 수정**: 감성카피 추가("겨울처럼 길고 힘들었던..."), 영상컨트롤 숨김, 시간표시 제거, SCROLL DOWN 바운스, font-serif 헤드라인
- **ShortcutBar 신규**: Hero 아래 4개 바로가기(이혼상담/상속상담/재산분할/양육권) Lucide 아이콘
- **TrustIndicators**: useCountUp 수정(버그 해결), 숫자 burgundy-600 컬러, font-serif 헤드라인
- **AwardsBanner 신규**: 언론사 로고 배너(KBS/SBS/MBC/JTBC/YTN SVG, 그레이스케일→hover컬러) + 수상경력 Swiper 무한 캐러셀
- **EmotionalCopy 신규**: 명조체 감성 인용문("이혼은 다시 행복할 권리입니다" + 조인섭 대표변호사)
- **WhyUs**: 사진 오버레이 스타일(이미지 위 다크그라디언트+텍스트), parallax-img 클래스
- **CEOSection**: 감성 인용문 blockquote 추가("존엄한 선택"), font-serif
- **Cases**: Swiper 가로스크롤(FreeMode, 1.2/2.3/3.2), 감성카피 추가, font-serif
- **Lawyers**: Embla→Swiper 교체, 대표 2명 대형카드(aspect-4/5) + 나머지 Swiper(8명), font-serif
- **Reviews**: Embla→Swiper 교체(Autoplay, 1.1/2.2/3), 골드별점 5개, 감성카피, font-serif
- **MediaSection 신규**: 유튜브 임베드(4C5BehULHVQ) + 뉴스리스트 4개 2분할
- **ContactCTA**: 감성문구(font-serif "신뢰할 수 있는 이름"), 검색칩 12개, 안심뱃지 3개(비밀보장/24시간/무료), 대형전화번호(52px font-serif)
- **FAQSection**: 메인에서 제거 (서브페이지 /consultation 유지)
- **GSAP ScrollTrigger**: useGsapAnimations 훅(gsap-title fade-up, gsap-grid stagger, parallax-img scrub)
- **Lenis**: 설치 후 제거 (인위적 스크롤 지연 문제)
- **섹션 순서 최종**: Hero→ShortcutBar→TrustIndicators→AwardsBanner→EmotionalCopy→WhyUs→CEOSection→Cases→Lawyers→Reviews→MediaSection→ContactCTA

##### 상담 페이지 프로토타입
- **게시판형 구조 확정** (이사님 요청): 목록(카드형) + 글쓰기(폼) + 상세(비밀번호→답변확인)
- **프로토타입 v2 완성**: 카드형 리스트(카테고리pill+잠금아이콘+답변완료뱃지), 통계밴드(11,673건/98%답변률/24시간), 글쓰기 폼 상단 "최근 답변 완료" 미니카드, 답변 카드(버건디좌측보더+공식답변뱃지), 비밀번호 모달
- **동선 확정**: 헤더 "무료상담 신청" → 바로 글쓰기 / 메뉴 "법률상담" → 게시판 목록 (미구현, 위치 미정)

#### v19 주요 변경 요약 (서브페이지 디자인 리뉴얼 — 신세계로 탭 4개 완료)
- **서브페이지 전수 리뉴얼 착수** (2026-03-31): 탭별 순회하며 디자인/카피/데이터 점검 + 경쟁사(대륜/YK/해외로펌) 비교 기반 개선
- **공통 디자인 패턴 적용**:
  - 배너: h-[220px] md:h-[280px], bg-black/50 오버레이, 브레드크럼 3단계(홈>섹션>현재), 골드 언더라인
  - 헤드라인: font-serif(Gowun Batang) 적용 (인사말/전통/시스템), 오시는길은 Pretendard 유지
  - 배경색: bg-stone-50/bg-[#faf9f7] → bg-[#F8F4EE] 통일 (메인과 일관성)
  - 카드: shadow-[0_4px_20px_rgba(0,0,0,0.06)] + hover:shadow-lg + hover:-translate-y-1
  - 영문 라벨: 12-13px tracking-[0.3em] uppercase font-bold
  - 스크롤 애니메이션: useScrollReveal + data-reveal 전 섹션 적용
  - 레이아웃: max-w-4xl → max-w-6xl 확장 + px-6 md:px-10 여백 증가
  - 글씨 사이즈업: 헤드라인 +4px, 본문 +1~2px, 서브카피 +1px (가운데 모임 해소)

##### /about/greeting (인사말)
- 대표 사진 위 그라디언트 오버레이 + 철학 인용문 (대표별 다른 문구)
- Core Values 3카드 섹션 (전문성/신뢰/존엄) bg-[#F8F4EE]
- 풀와이드 감성 배너 ("OUR PROMISE" 라벨 + 골드 하이라이트 인용)
- 서명 섹션 프리미엄화 (가운데 정렬, 수평 디바이더, 24-32-38px 서체)
- greeting.json 카피 재작성 (짧고 임팩트 있게, "존엄한 선택" 키워드)

##### /about/tradition (52년 법조전통)
- tradition.json 전면 재작성 — headline/turning/quote/distinction 감성카피
- 세대카드: rounded-xl + shadow + hover + bg-[#F0EBE4] + serif 연도 40-44px
- 52년 카운트업: burgundy-500 serif 72-88px + bg-[#F8F4EE]
- 기사카드: shadow + rounded-xl + 패딩/폰트 증가
- 인용밴드: font-serif 17-20px + bg-[#F8F4EE]

##### /about/system (신세계로 시스템)
- 헤드라인: "뛰어난 개인이 아닌, 완벽한 시스템이 승리합니다." + 서브카피
- 통계: firmData import → 인라인 [{52년},{19인},{1053건+},{7개}], 승소율 제거
- bg-[#faf9f7] → bg-[#F8F4EE] 전체 통일
- 팀카드: shadow + rounded-xl, h3 font-serif 26-32px

##### /about/location (오시는 길)
- SubPageHero → 커스텀 배너 (h-220/280px, 브레드크럼 3단계)
- "VISIT US" 헤드라인 섹션 추가 (감성카피 + 서브카피)
- 사무소 탭: 16px + active font-bold
- 지도: Google Maps embed (좌표+주소 기반), 카카오맵 SDK 대응 코드 준비 (NEXT_PUBLIC_KAKAO_MAP_KEY .env.local)
- 교통안내 카드: hover shadow+translate 효과
- 전국 3개 사무소: shadow 카드 + 26-34px 제목
- CTA 밴드: bg-[#F8F4EE] + 버건디 CTA 버튼 + 하단 뱃지(비밀보장/24시간/온라인접수)
- 대표전화: 32-38px 굵은 서체
- MobileCTA 하단 추가
- 글씨체: font-serif 제거 → Pretendard 유지 (사용자 요청: 명조체 가늘어서 안 맞음)

#### v20 주요 변경 요약 (업무분야 서브페이지 커스텀 랜딩 리뉴얼 — 이혼소송 4개 완료)
- **PracticePageLayout → 커스텀 랜딩 페이지 전환**: 제네릭 레이아웃 제거, 페이지별 고유 섹션 구성으로 경쟁사(대륜/YK/kirkland/skadden) 압도
- **공통 랜딩 패턴 확립**:
  - 구조: SubPageHero → PracticeTabs → PracticeRevealWrapper → 커스텀 섹션들 → MobileCTA
  - Hero: 좌정렬 라인+영문라벨 + font-serif 48px 헤드라인 + burgundy CTA pill
  - 프로세스: 4카드 그리드 (넘버링+Lucide아이콘+호버 bg-burgundy-500 전환)
  - 2-col 레이아웃: 영문 골드 라벨 + 설명/카드 좌우 분할
  - Quote Band: 이미지 배경(banner-about/consultation.jpg) + bg-black/60 오버레이 + italic serif 인용
  - Team Link: 원형 아바타 + 팀장명 + 팀 소개 링크 pill
  - CTA: font-serif 헤드라인 + 전화(burgundy) + 카카오톡(outline) 2버튼
  - 배경 교차: white → #F8F4EE → white → #F8F4EE (다크네이비 없음)
  - data-reveal 전 섹션 적용 (PracticeRevealWrapper IO 기반)
- **법률 콘텐츠 정합성 검증**: 모든 페이지를 divorce_pages.json 원본 데이터와 1:1 대조, 누락 섹션 보완 완료
- **변호사광고규정 준수**: "94%+ 의뢰인 소송 만족도" 등 검증 불가 수치 삭제

##### /practice/divorce (이혼준비 가이드)
- PracticePageLayout → 커스텀 9섹션 랜딩
- Hero(2-col 비주얼카드) → Critical 30 Days(4카드) → Preparation Checklist(2-col+1,053건 통계) → Types of Divorce(3카드: 재판상/협의/사실혼) → Contested Divorce(2-col 프로세스) → Quote Band(이미지bg) → Related Areas(4아이콘링크) → Team Link(이혼소송총괄팀·김미루) → CTA("존엄한 선택")
- 원본 17섹션 전수 커버 확인 (사실혼 상세→별도 페이지 링크, 빠른이혼절차→협의이혼 카드에서 커버)

##### /practice/divorce/mutual (협의이혼)
- PracticePageLayout → 커스텀 7섹션 랜딩
- Hero(좌정렬) → 4단계 프로세스(합의→숙려→신고→서류) → Step-by-step+서류체크리스트(2-col) → Important Details(가장이혼 경고+양육비부담조서+소멸시효) → Quote Band → Team Link → CTA("합의 조건 검토받기")
- 가장이혼 유효성 법적 정확도 검증 완료, 위자료 시효 "안 날로부터 3년" 수정
- **포기 합의 시 청구 불가** 경고박스 추가 (원본 데이터 누락분 보완)

##### /practice/divorce/litigation (재판이혼)
- PracticePageLayout → 커스텀 9섹션 랜딩
- Hero → Litigation Process(4카드: 사전처분/가사조사관/조정이혼/유책배우자) → 재판상 이혼이란+민법 840조 6가지(2열 넘버링 그리드)+소멸시효 경고 → 유책배우자+조정전치주의(2-col: 예외요건3개 / 임의조정·강제조정 카드) → 가사조사관+사전처분(2-col: 조사항목4그리드 / 생활비·접근금지·면접교섭 3카드) → 특수쟁점(2피처카드: 다크 "간통과 이혼"+Gavel 장식 / 버건디 "가정폭력과 안전이혼"+Shield 장식) → Quote Band → Team Link(이혼소송총괄팀) → CTA(전화+카카오톡)
- 원본 21섹션 전수 대조 완료 (가정폭력 상세→별도 페이지 위임, 재판이혼 고유 14섹션 전부 포함)

##### /practice/divorce/alimony (위자료)
- PracticePageLayout → 커스텀 8섹션 랜딩
- Hero("정확한 증거가 금액을 결정합니다") → Alimony Process(4카드: 산정/제3자청구/증거확보/민형사병행) → 위자료란+산정기준(9항목 3열 그리드)+증거경고박스 → Quote Band → **청구시효+증거확보전략(2-col, 원본 누락분 추가)** → 청구대상+결정적증거종류(2-col: 상간자·직계존속 카드 / 5종 증거 리스트+위법수집 경고) → Team Link(위자료팀·신진희) → CTA("당신의 권리, 침묵하지 마세요"+전화+온라인 위자료 계산기)
- 변호사광고규정 위반 "94%+ 의뢰인 소송 만족도" 수치 삭제
- 신진희 변호사 사진 섹션 → 다른 탭과 일관된 Quote Band 패턴으로 교체

#### v21 주요 변경 요약 (승소사례+의뢰인후기 목록/상세 페이지 전면 리디자인 + 메가메뉴 정렬 + 뒤로가기 수정)
- **경쟁사 분석**: YK법률사무소, 대륜법무법인, 해람/홀로서기 3곳 비교 → 금액 강조가 가장 큰 차별화 포인트로 확인
- **디자인 원칙**: "금액이 히어로" — 승소 금액을 카드에서 가장 눈에 띄는 요소로 배치, 30년차 디자이너 수준 목표

##### /cases (승소사례 목록 — 전면 리라이트)
- Stats 섹션 완전 제거 → 흰 배경 + font-serif 센터 헤드라인("성과는 기록으로 증명됩니다.")
- **HighlightCard** (1페이지 상단 2개): 골드 상단 악센트 + "BEST" 라벨 + 대형 금액(52px) + 체크리스트 결과항목
- **CaseCard** (3열 그리드): 금액 히어로(28-32px, burgundy) + 카테고리pill + 제목 + 변호사 + 호버 상단 버건디 라인(scale-x 애니메이션)
- **Orphan 카드 방지**: 1페이지 = 하이라이트 2개 + 그리드 9개(3×3), 2페이지~ = 12개(3×4)
- 필터: 센터 정렬 pill(카운트 표시) + 텍스트 정렬 토글(최신순|인기순) + 확장형 검색 아이콘(클릭→인풋 확장)
- 하단 CTA: font-serif 헤드라인 + 전화 버튼 + 감성 카피
- extractAmount/extractShortResult 헬퍼 함수로 금액/결과 파싱
- Framer Motion AnimatePresence + stagger 카드 등장 애니메이션
- **`router.push` → `router.replace`**: 카테고리 필터 변경 시 히스토리 오염 방지 (뒤로가기 정상화)

##### /cases/[id] (승소사례 상세 — 전면 리디자인, Design 2 헤더 + Design 3 바디 조합)
- **Hero 영역 (Design 2 스타일)**: BEST CASE STUDY 라벨 + 제목 내 금액 하이라이트(`highlightAmount`) + Case 번호/분야/조회수 메타라인 + 4컬럼 결과 stat 카드(버건디 강조 금액 카드)
- **변호사 후기 섹션**: 변호사 사진 + 이름/직책 + 대형 장식 인용부호(`"" ""`) + 후기 본문
- **본문 (Design 3 스타일, 2컬럼)**: 좌측 사이드바(사건정보: 관할법원/주요쟁점pill/담당변호사/승소날짜/조회수 + CTA) + 우측 메인(사건개요 + 법률전략 넘버링카드 + 이미지 + CTA)
- **전략 카드 조건부 렌더링**: 2개 이상 → 번호 원형배지 카드 UI, 1개 → 일반 텍스트 (번호 1개만 달린 어색함 방지)
- 모바일: 사이드바 숨김 → 하단에 사건정보 카드 + MobileCTA

##### /reviews (의뢰인후기 목록 — 해림 스타일 리디자인)
- /cases와 동일한 디자인 패턴 통일: 배너 → CasesTabs → 흰 배경 헤드라인 → 필터 → 카드 그리드 → 페이지네이션 → CTA
- **ReviewCard 해림 스타일**: 이미지 비율 `16:10` → `4:3` (세로 높이 확보) + 결과 dot 강조(14px 볼드) + 제목 표시(15px 볼드, line-clamp-2, min-h-[45px]) + 하단 정보(카테고리+담당변호사+날짜) `mt-auto`로 바닥 고정
- `flex flex-col` + `flex-1` 카드 구조: 제목 길이 달라도 하단 정보 영역 균일 정렬
- 필터: 센터 정렬 pill(전체/이혼/재산분할/상간자/양육권/상속/가정폭력) + 확장형 검색
- 헤드라인: "의뢰인의 목소리가 신뢰를 증명합니다." (font-serif)
- CTA: "당신의 이야기도 승리의 기록이 됩니다."

##### 메가메뉴 정렬 수정 (YK 스타일 유지)
- **`navRect` 뷰포트 기준 측정**: `navR.left - headerRect.left` → `navR.left` (뷰포트 기준)으로 수정, 메가메뉴 컬럼이 탭 텍스트 바로 아래에 정확히 정렬
- `window.addEventListener("resize")` 유지 → 화면 비율 바뀌어도 자동 재정렬
- 5컬럼 동시 표시 + 호버 컬럼만 `bg-white` / 나머지 `bg-[#F7F7F7]` (원래 YK 스타일 유지)

##### 뒤로가기/캐시 수정
- **`next.config.mjs` — `staleTimes: { dynamic: 0, static: 0 }`**: Next.js 14 클라이언트 라우터 캐시 비활성화, 뒤로가기 시 fresh 페이지 렌더링
- **`.claude/launch.json` — `autoPort: true`**: 포트 충돌 시 자동 포트 할당

#### v22 주요 변경 요약 (미디어 탭 통합 + 신세계로 소식 전면 리라이트 + 경쟁사 데이터 크롤링)

##### 미디어 탭 통합 (5탭→4탭)
- **유튜브+쇼츠+인스타웹툰 → "영상채널" 통합**: `/media/channel` 신규 페이지 (YouTube 451개 + Shorts 553개 + 웹툰 5화)
- **MediaTabs 4탭**: NEWS(신세계로 소식, 언론보도) / CHANNEL(영상채널) / COLUMN(법률 칼럼)
- **Header 메가메뉴**: "유튜브" → "영상채널", href `/media/channel`
- **constants.ts NAV_ITEMS**: 동기화
- **next.config.mjs 리다이렉트 추가**: `/media/youtube`, `/media/shorts`, `/media/webtoon` → `/media/channel`
- **activeTab 수정**: column 페이지 4→3, column/[id] 4→3

##### 경쟁사 사이트(이혼전문.com) 데이터 크롤링
- **competitor_about_data.json**: 소개 페이지 전체 (리더십, 전문로펌, 인증서, 연혁, 변호사 22명, 사무소 3곳, 7개 전문팀)
- **competitor_casewins.json**: 승소사례 30건
- **competitor_crawl_pages.json**: 기타 페이지 (상담절차, 상담폼, 언론/칼럼, 자유게시판)
- **ihon_crawl_index.json**: 크롤링 메타데이터
- **ihon_image_urls.txt**: 103개 이미지 URL
- **다운로드된 이미지**: lawyers 22개, certificates 19개, about_history 9개, process 4개, board 5개, og 2개

##### /news (신세계로 소식) — 전면 리라이트
- **이전 C-등급 → A 방향으로 재설계**: about 콘텐츠 나열 → 실제 뉴스 페이지로 전환
- **구조**: SubPageHero → MediaTabs → Featured 카드 → Swiper 캐러셀 → 인용밴드 → YTN+홍보영상 → 인증변호사 → 인증서갤러리 → CTA
- **Featured 카드**: news-09(제1호 가족법 전문변호사) 대형 2컬럼 카드 (골드 상단 악센트, FEATURED 배지)
- **Swiper 캐러셀**: competitor_about_data.json의 history_cards 9개 사용 (원본 사이트 데이터+이미지 1:1 매핑)
  - 골드 연도 배지 (24인의 전문가 법률 그룹 / 2021년 / 2020년 / ...)
  - 이미지: /images/ihon-site/about/about_history_01~09.webp
  - slidesPerView 3.2 + Autoplay 5초 + loop + 좌우 화살표 네비게이션 + 슬라이드 카운터
- **인용밴드**: "사회를 향한 따뜻한 마음" + 조두순 사건 + 여가부 장관 표창
- **YTN 라디오 + 홍보영상**: 2컬럼 (YouTube embed + YTN Radio 소개)
- **전문분야 인증 변호사**: 6명 2열 카드 (사진+직위+인증분야 배지)
- **인증서 갤러리**: 3개만 (가족법/상속 등록증서 + 여가부 장관 표창장)
- **카테고리별 색상 pill**: 언론(blue)/소식(emerald)/수상(amber)/특강(violet)/협약(teal)/학회(slate)
- **데이터**: news.json(Featured+Special) + competitor_about_data.json(캐러셀) — 하드코딩 최소화

##### 기타 수정
- **lawyers/[id] 타입 수정**: `lawyers?: string` → `lawyers?: string[]`
- **practice 페이지 lint 수정**: divorce/litigation, divorce/mutual, divorce/page.tsx 미사용 변수 정리

#### v23 주요 변경 요약 (언론보도 목록/상세 전면 리디자인 + YTN 유튜브 ID 크롤링)

##### /press (언론보도 목록 — 전면 리라이트)
- **3열 카드 그리드**: max-w-7xl 풀와이드 + gap-6 md:gap-7 간격
- **ArticleCard**: YouTube 썸네일(YTN) 또는 기사 이미지 + 카테고리pill(방송출연/신문기사) + 날짜 + 제목 + 발췌 + SOURCE 라벨 + "자세히 보기" CTA
- **매체별 pill 필터**: 전체 1010 / YTN 라디오 494 / 머니투데이 101 / 아이뉴스24 85 / 뉴스1 65 / 파이낸셜뉴스 44 / 기타 221 (상호 배타적)
- **헤드라인 /news 탭과 일관성 통일**: "PRESS COVERAGE" 영문 라벨 + "신세계로의 **전문성**, 언론이 먼저 주목합니다" (버건디 키워드) + 골드 디바이더
- **언론사 로고 배너**: KBS/SBS/MBC/JTBC/YTN + "외 70+ 매체"
- **URL 쿼리 상태 보존**: useSearchParams 기반 (source/q/sort/page)
- **배경 교차**: white(헤드라인) → #F8F4EE(카드그리드) → white(CTA)
- **하단 CTA**: font-serif 헤드라인 + 전화 버튼

##### /press/[id] (언론보도 상세 — 전면 리디자인)
- **1컬럼 max-w-3xl**: 사이드바 제거, 깔끔한 읽기 레이아웃
- **카테고리 라벨**: TV APPEARANCE(burgundy, 방송출연) / PRESS COVERAGE(blue, 신문기사)
- **YTN 라디오**: 기사별 실제 YouTube iframe 임베드 (press_youtube_ids.json 매핑) + 라디오 안내 카드("YTN 라디오에서 다시듣기" 외부 링크)
- **콘텐츠 파서**: paragraph/quote/copyright 블록 구분 — 변호사 인용문 자동 감지(이름패턴+귀인키워드 "설명했다/강조했다" 등) → burgundy 좌측보더
- **변호사 프로필 카드**: bg-[#F8F4EE] rounded-2xl + 사진 + "프로필 보기" 링크
- **테이블형 이전/다음 네비게이션**: 2컬럼 카드 대신 간결한 행 형태
- **관련 기사 섹션**: 같은 매체 기사 3개

##### YTN 유튜브 ID 크롤링
- **press_youtube_ids.json 신규**: shinsegaelaw.kr에서 487개 YTN 라디오 기사의 실제 YouTube 영상 ID 크롤링
- **크롤링 스크립트**: scripts/crawl_press_youtube_ids.js (Node.js, 기사 상세페이지에서 YouTube redirect URL 파싱)
- **썸네일 매핑**: `https://img.youtube.com/vi/{VIDEO_ID}/hqdefault.jpg` 패턴으로 기사별 고유 썸네일
- **영상 임베드 매핑**: 상세페이지에서 기사별 실제 YouTube 영상 재생 (기존 하드코딩 `4C5BehULHVQ` 제거)

#### v26 주요 변경 요약 (모바일 UX 전면 최적화 — prototype_mobile_v1 기반 P0~P2 완료)

##### P0 — 즉시 (완료)
- **FloatingCTA → 모바일 하단 고정 바**: 이미 구현됨 확인 (lg:hidden 4버튼 바 + lg 이상 플로팅)
- **모바일 글꼴 크기 전면 조정** (10개 파일):
  - Cases 총 건수 64→36px, "건의 승소사례" 20→16px
  - CEO 이름 32→24px, 본문 17~18→15px, 인용문 22→18px, 링크 20→16px
  - ContactCTA 전화번호 32→28px
  - TrustIndicators 숫자 32→28px, 접미사 18→14px
  - Lawyers 대표 이름 28→22px
  - cases/reviews 배너 h1 text-3xl→text-[22px]
  - 서브페이지 본문 text-[19px]→text-[16px] (system/tradition/location, md:text-[21px] 유지)
- **터치 타겟 44px 보장** (7개 파일):
  - Header 햄버거/닫기/검색 버튼 w-10→w-11 (40→44px)
  - cases/reviews 필터 pill min-h-[44px] + py-2→py-2.5, 검색 버튼 w-8→w-11
  - press 필터 pill min-h-[44px] + py-2→py-2.5, 검색 버튼 w-9→w-11

##### P1 — 이번 주 내 (완료)
- **서브페이지 배너 220→160px** (6개 파일): cases/page, cases/[id], reviews/page, reviews/[id], press/page, press/[id] — 모바일 h-[220px]→h-[160px], md:h-[280px] 유지
- **인사말 모바일 아코디언** (greeting/page.tsx):
  - MobileAccordion 컴포넌트 신규 (CSS grid 접기/펼치기, ChevronDown 아이콘)
  - 대표 소개: 모바일 아코디언(96px 사진+경력3건) / 데스크톱 기존 그리드 유지
  - Core Values: 모바일 아코디언(리스트형) / 데스크톱 3카드 유지
  - Opening paragraph 모바일 18→16px
- **변호사 2열 컴팩트** (lawyers/page.tsx):
  - 팀장/전문변호사: 이미 2열 구현됨 확인
  - 대표변호사 카드: grid-cols-1→grid-cols-2, aspect-square→aspect-[3/4], 하단 경력 모바일 숨김(hidden md:block), 모바일 전용 컴팩트 info(전문분야만)
  - 이름 오버레이 24→18px, 라벨 10→9px

##### P2 — 다음 주 (완료)
- **필터 pill 수평 스크롤**: 이미 구현됨 확인
- **Swiper 스와이프 힌트** (3개 파일): Cases/Lawyers/Reviews 섹션 — "좌우로 스와이프" 텍스트 + 그라디언트 라인, lg:hidden
- **이미지 sizes 최적화**: 메인 섹션 전부 적절한 sizes 확인, cases/[id] + press/[id] 배너 sizes="100vw" 누락분 추가
- **검색바 모바일**: 현재 드롭다운 방식으로 기능적 OK

#### v31 주요 변경 요약 (스크롤 애니메이션 전면 적용 + 이미지 썸네일화 + 텍스트 정리 + 모바일 UX 개선)

##### 스크롤 애니메이션 전면 적용
- **TrustIndicators**: ScrollReveal 신규 추가 — 4개 숫자 스태거 등장 (150ms 간격) + 카운트업
- **ContactCTA 6-Step Process**: 모바일 세로 타임라인 디자인 (골드 원형번호+세로연결선+스텝별 스태거 등장) / 데스크톱 3×2 그리드 카드별 스태거
- **서브페이지 ScrollReveal 신규 적용 (5개 페이지)**:
  - /cases: 헤드라인→필터→하이라이트→카드그리드→CTA
  - /cases/[id]: 히어로→변호사후기→본문
  - /reviews: 헤드라인→필터→카드그리드→CTA
  - /reviews/[id]: 후기본문→이미지→공식답변→변호사→CTA
  - /consultation: 인트로→프로세스→게시판링크→폼→모바일CTA

##### 이미지 썸네일 그리드 전환
- **후기 상세 (/reviews/[id])**: 풀사이즈 이미지 → 정사각형 썸네일 그리드 (1~2장: 2열, 3장+: 3열 모바일/4열 데스크톱) + 호버 확대 아이콘 + 클릭 라이트박스 원본 보기
- **승소사례 상세 (/cases/[id])**: 대형 메인+작은 썸네일 → 균일 정사각형 썸네일 그리드 (1~2장: 2열, 3장+: 3열/4열) + "판결문 원본 N장" 소제목 + 호버 확대 아이콘
- **후기 상세 장식 큰따옴표 제거**: `" "` 데코레이션이 글씨 가림 → 삭제

##### 텍스트/줄바꿈 정리
- **승소사례 콘텐츠 파서 개선**: `parseContentSections`에서 모든 단순 `\n` → 공백 변환, `\n\n`(문단구분)만 보존 → "주요 쟁점은 1심 이혼 기각..." 식으로 자연스럽게 이어붙임
- **승소사례 본문 반응형 글씨**: 18px → 15px(모바일)/18px(데스크톱) 전체 통일 (사건개요/법률전략/변호사후기/기타섹션)
- **Hero 라벨 모바일**: "SINCE 1970 · FAMILY LAW SPECIALISTS" 줄바꿈 방지 — tracking-[0.3em]→tracking-[0.15em], 12px→11px

##### 모바일 레이아웃 개선
- **승소사례 상세 사건정보 위치 이동**: 맨 아래 → 담당변호사 후기 바로 위 (모바일에서 히어로 다음에 바로 사건정보 확인 가능)
- **의뢰인후기 카드 높이 균일화**: motion.div에 h-full 추가, 제목 line-clamp-3 + min-h 고정, 변호사명 line-clamp-1 truncate

#### 예정 작업
- [ ] 업무분야 서브페이지 리뉴얼 계속 (재산분할/자녀문제/부정행위/가정폭력/가족관계/국제이혼/상간자소송3개/형사소송1개 — 10개 남음)
- [ ] 서브페이지 리뉴얼 계속 (구성원 탭)
- [x] 변호사 데이터 업데이트: 19명 → 22명 완료 (신규: 안은경, 정두리, 이재현, 임수미, 전보성; 제거: 김수진, 배수지)
- [ ] 상담 게시판 실제 구현 (프로토타입 v2 → Next.js 코드)
- [ ] /privacy, /terms 페이지 구현
- [ ] Figma 마감

## Commands

All commands run from `frontend/`:

```bash
npm run dev      # Dev server (localhost:3000) — .next 캐시 자동 삭제 후 시작
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

**주의:** shadcn v4 CLI(`npx shadcn@latest add`)는 사용 금지. Tailwind 4 전용이라 호환 안 됨. 컴포넌트는 Radix UI 기반으로 직접 작성.

## EC2 배포

### 서버 정보
- **IP**: 3.39.246.25
- **User**: ubuntu
- **SSH Key**: 배포 시 사용자가 제공 (RSA private key → `/tmp/ec2_key.pem`에 임시 저장, 배포 후 삭제)
- **열린 포트**: 5173, 5174, 3000, 5000
- **PM2 프로세스**: `shinsegae` (포트 5173)
- **서버 경로**: `/home/ubuntu/shinsegae-web/` (Next.js 프로덕션)
- **데이터 경로**: `/home/ubuntu/data/` (JSON, symlink → shinsegae-web/data)
- **접속 URL**: http://3.39.246.25:5173/

### 배포 절차 (한 번에 실행)

```bash
# 0. SSH 키 준비 (사용자가 키 제공 시)
cat > /tmp/ec2_key.pem << 'EOF'
(RSA PRIVATE KEY)
EOF
chmod 600 /tmp/ec2_key.pem

# 1. 로컬 빌드
cd frontend && npm run build

# 2. 배포 패키지 생성
cd .. && tar -czf /tmp/shinsegae-deploy.tar.gz \
  --exclude='frontend/node_modules' \
  --exclude='frontend/.next/cache' \
  data/ frontend/.next/ frontend/public/ frontend/src/ \
  frontend/package.json frontend/package-lock.json \
  frontend/next.config.mjs frontend/tailwind.config.js \
  frontend/postcss.config.mjs frontend/tsconfig.json \
  frontend/.eslintrc.json frontend/next-env.d.ts frontend/components.json

# 3. 업로드
scp -i /tmp/ec2_key.pem -o StrictHostKeyChecking=no \
  /tmp/shinsegae-deploy.tar.gz ubuntu@3.39.246.25:~/shinsegae-deploy.tar.gz

# 4. EC2에서 배포 (SSH 원격 실행)
ssh -i /tmp/ec2_key.pem -o StrictHostKeyChecking=no ubuntu@3.39.246.25 << 'DEPLOY'
set -e
BACKUP_DIR=~/shinsegae-web-backup-$(date +%Y%m%d%H%M%S)
cp -r ~/shinsegae-web "$BACKUP_DIR"
pm2 stop shinsegae 2>/dev/null || true
rm -rf /tmp/deploy-tmp && mkdir -p /tmp/deploy-tmp
tar -xzf ~/shinsegae-deploy.tar.gz -C /tmp/deploy-tmp
cd ~/shinsegae-web
rm -rf ~/data && cp -r /tmp/deploy-tmp/data ~/data
rm -rf src public .next
cp -r /tmp/deploy-tmp/frontend/src ./src
cp -r /tmp/deploy-tmp/frontend/public ./public
cp -r /tmp/deploy-tmp/frontend/.next ./.next
cp /tmp/deploy-tmp/frontend/package.json /tmp/deploy-tmp/frontend/package-lock.json \
   /tmp/deploy-tmp/frontend/next.config.mjs /tmp/deploy-tmp/frontend/tailwind.config.js \
   /tmp/deploy-tmp/frontend/postcss.config.mjs /tmp/deploy-tmp/frontend/tsconfig.json \
   /tmp/deploy-tmp/frontend/.eslintrc.json /tmp/deploy-tmp/frontend/next-env.d.ts \
   /tmp/deploy-tmp/frontend/components.json ./
npm install --production
rm -rf ~/shinsegae-web/data && ln -sf ~/data ~/shinsegae-web/data
pm2 delete shinsegae 2>/dev/null || true
PORT=5173 pm2 start npm --name shinsegae -- start
rm -rf /tmp/deploy-tmp
DEPLOY

# 5. 확인
ssh -i /tmp/ec2_key.pem -o StrictHostKeyChecking=no ubuntu@3.39.246.25 \
  "curl -s -o /dev/null -w '%{http_code}' http://localhost:5173/ && pm2 list"

# 6. 정리
rm -f /tmp/ec2_key.pem /tmp/shinsegae-deploy.tar.gz
```

### 빠른 배포 명령어 (Claude Code에게)
> "배포해줘" 또는 "EC2 올려줘" → 위 절차 자동 실행 (SSH 키 필요 시 요청)

### 롤백
```bash
# 백업에서 복원 (백업 디렉토리명 확인 후)
ssh ubuntu@3.39.246.25 "pm2 stop shinsegae && rm -rf ~/shinsegae-web && cp -r ~/shinsegae-web-backup-YYYYMMDD ~/shinsegae-web && cd ~/shinsegae-web && PORT=5173 pm2 start npm --name shinsegae -- start"
```

## Architecture

```
shinsegaela_website/
├── data/                         # 크롤링된 JSON 데이터 (원본)
│   ├── lawyers.json              # 22명 변호사 (id, name, position, role, specialty, profile_image, career, education, intro)
│   ├── cases.json                # 20건 승소사례 (메인페이지 하이라이트용)
│   ├── cases_all.json            # 1053건 전수 승소사례 (5카테고리, stats, cases[]: id/k_id/category/categories/title/summary/result/result_type/lawyers/winDate/views/hasImages/imageCount)
│   ├── cases_crawled_full.json   # 1053건 원본 크롤링 (content 전문 포함, 아카이브용)
│   ├── cases_crawled_v2.json    # 1053건 v2 크롤링 (meta+cases, 최신)
│   ├── reviews.json              # 90건 의뢰인 후기 (title, case_type, lawyer, content, result, image, images[], date, views, reply, replyAuthor, contentSource, k_id)
│   ├── press.json                # 1010건 언론기사 (meta, articles[]: k_id/title/date/source/lawyer/views/content/images/localImages)
│   ├── practice_areas.json       # 4대 전문분야 + subcategories
│   ├── firm_info.json            # 법인정보, 사무소 3곳, 연락처
│   ├── youtube.json              # 채널 2개 + 최근 영상 10개
│   ├── whyus.json                # WhyUs 4패널 데이터
│   ├── news.json                 # 뉴스 13개 항목 (id, title, year, desc, category, importance, image, link, relatedLawyer)
│   ├── greeting.json             # 인사말 (대표2명, 인사말 7단락, 클로징, 서명, 하이라이트)
│   ├── no1.json                  # 가족법전문 제1호 (헤드라인, 통계, 자격요건, 등록, 클로징, 기사)
│   ├── tradition.json            # 52년 법조전통 (headline 4줄, turning, intro, generations, stat, article, quote 2단락, distinction, closing)
│   ├── faq.json                  # FAQ 10개 (question, answer, popular)
│   ├── awards.json               # 수상/경력 7개 (title, year)
│   ├── teams.json                # 7개 전문팀 (meta, system, teams[]: slug, name, leader, tagline, description, specialties, process[{name,desc}], leaderCredentials, cases[{title,result,details[]}])
│   ├── navigation.json           # 네비게이션 구조
│   ├── competitor_about_data.json # 경쟁사(이혼전문.com) 소개페이지 크롤링 (리더십/전문로펌/인증서/연혁/변호사22명/사무소3곳)
│   ├── competitor_casewins.json  # 경쟁사 승소사례 30건
│   ├── competitor_crawl_pages.json # 경쟁사 기타 페이지 (상담절차/폼/언론/게시판)
│   ├── ihon_crawl_index.json     # 경쟁사 크롤링 메타데이터
│   ├── ihon_image_urls.txt       # 경쟁사 이미지 URL 103개
│   └── press_youtube_ids.json    # YTN 라디오 기사별 YouTube 영상 ID 487개 매핑 (k_id → videoId)
├── public/images/                # 원본 이미지 보관
└── frontend/                     # Next.js 14 App Router
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx        # Root layout (Pretendard CDN, metadata, skip-to-content, ScrollToTop)
    │   │   ├── page.tsx          # 메인 페이지 (9개 섹션 + DotNavigation)
    │   │   ├── globals.css       # Tailwind base + 버건디 테마 CSS 변수 + 커스텀 클래스 + prefers-reduced-motion
    │   │   ├── about/            # 인사말, 변호사, 전문팀(7개), 오시는길, + placeholder
    │   │   ├── cases/            # 승소사례 목록(6카테고리) + 상세([id])
    │   │   ├── consultation/     # 상담신청
    │   │   ├── practice/         # 이혼소송(+11세부), 상간자소송(+4세부), 형사소송(+4세부)
    │   │   └── reviews/          # 후기(6탭), 후기상세([id]), 유튜브, 웹툰, redirect(media/column/shorts)
    │   ├── components/
    │   │   ├── layout/           # Header, Footer, FloatingCTA, ScrollToTop, StickyConsultationBar, SubPageLayout
    │   │   ├── sections/         # Hero, ShortcutBar, TrustIndicators, AwardsBadge, WhyUs, CEOSection, Cases, Lawyers, News, Reviews, FAQSection, ContactCTA (+주석: PracticeAreas, ConsultationProcess)
    │   │   ├── shared/           # SubPageHero, Breadcrumb, SidebarCTA, MobileCTA, AboutTabs, MediaTabs, LawyerTabs, CasesTabs
    │   │   ├── templates/        # PlaceholderPage, PracticeDetailPage, PracticeAreaTemplate
    │   │   ├── ui/               # shadcn/ui 컴포넌트 (Radix UI 기반, Tailwind 3 호환) + DotNavigation
    │   │   └── ScrollReveal.tsx  # SSR-safe 스크롤 애니메이션 (IO 기반)
    │   ├── hooks/
    │   │   └── useScrollReveal.ts  # data-reveal/data-step 스크롤 애니메이션 훅
    │   └── lib/
    │       ├── utils.ts          # cn() (tailwind-merge + clsx)
    │       ├── constants.ts      # SITE_CONFIG, OFFICES, NAV_ITEMS, SOCIAL_LINKS
    │       ├── hooks.ts          # useCountUp (네이티브 IO)
    │       ├── motion.ts         # Framer Motion 공통 variants (서브페이지용)
    │       └── consultation-context.tsx  # 상담 모달 Context
    ├── data/                     # JSON 복사본 (import용)
    ├── public/
    │   ├── images/
    │   │   ├── attorneys/        # 변호사 프로필 이미지
    │   │   ├── office/           # 사무실, 슬라이드, 배너 7개 (banner-about/cases/divorce/adultery/inheritance/consultation/reviews)
    │   │   ├── reviews/          # 의뢰인 후기 이미지 90개 (review-01~90)
    │   │   └── etc/              # newimg(뉴스12), youtube(11), webtoon(5), 아이콘
    │   └── videos/               # hero-bg.mp4
    └── tailwind.config.js        # 디자인 토큰 (JS, CommonJS — TS 아님!)
```

## Tech Stack

- **Next.js 14.2** (App Router, RSC) — NOT 15
- **Tailwind CSS 3.4** + `tailwindcss-animate` — NOT Tailwind 4
- **Radix UI** primitives (dialog, label, select, separator, slot, tabs) — NOT @base-ui/react
- **Framer Motion 12** — 서브페이지 애니메이션용 (메인 섹션은 ScrollReveal로 대체)
- **Embla Carousel** (+ autoplay) for sliders
- **Lucide React** for icons
- **Pretendard** webfont (CDN variable subset) + **Dancing Script** (Hero 필기체)
- **class-variance-authority** + **clsx** + **tailwind-merge**
- **rimraf** — dev 서버 .next 캐시 자동 삭제

## 디자인 규칙 (절대 변경 금지)

### 컬러 팔레트

| 용도 | 컬러 | Tailwind |
|------|------|----------|
| Primary (버건디) | #9B2335 ~ #7B2D3B | `burgundy-500` ~ `burgundy-600` |
| Accent (골드) | #C9A84C / #D4AF37 | `gold-400` ~ `gold-500` |
| Dark sections | #1A1A2E / #0F0F1A | `navy-800` ~ `navy-900` |
| WhyUs bg | #faf9f7 | `bg-[#faf9f7]` |
| Light bg | #FDF2F4 / stone-50 | `burgundy-50` / `stone-50` |

### 레이아웃 규칙
- 섹션 여백: `py-20 md:py-28 lg:py-36` (대부분) 또는 `py-24 md:py-32 lg:py-40` (News)
- 컨테이너: `max-w-7xl mx-auto px-6 md:px-8`
- 카드 둥글기: `rounded-2xl` 또는 `rounded-[12px]`
- 섹션 헤더 패턴: 영문 소제목(tracking-[0.3em], uppercase) → 한글 대제목(text-4xl md:text-5xl) → 골드라인(w-12 h-[2px]) → 설명

### 애니메이션 규칙
- 메인 섹션: `ScrollReveal` / `StaggerContainer` (네이티브 IO 기반, SSR-safe)
- 서브페이지: Framer Motion `motion.div` 사용 가능
- ease: `[0.25, 0.46, 0.45, 0.94] as const` (타입 안전)
- 각 섹션별 고유 호버 효과 (border-top 슬라이드, 보더 확장, 이미지 줌 등)

### CSS 변수 (globals.css)
- `--primary`: HSL `351 66% 37%` (burgundy-500)
- `--accent`: HSL `43 72% 52%` (gold-400)
- `--radius`: `0.75rem`
- `@keyframes badgeFadeIn`, `scrollBounce` 정의
- `@media (prefers-reduced-motion: reduce)` 지원

### 서브페이지 배너
- `SubPageHero` 컴포넌트에 `bannerImage` prop으로 배경 사진 지정
- 이미지 위 `bg-black/50` 오버레이 + 브레드크럼 + 제목 + 골드 언더라인
- `bannerImage` 없으면 다크(#0f0f1a) + 버건디 빛번짐 fallback

## 데이터 규칙

- **하드코딩 절대 금지** — 반드시 `data/` JSON에서 import
- JSON import 패턴: `import data from "@/../../data/lawyers.json"`
- 이미지 경로: JSON의 `profile_image` 필드값 → `/images/attorneys/cho-inseop.jpg`
- firm_info.json의 사무소/전화번호 직접 사용
- 카카오톡 URL: `https://pf.kakao.com/_ExcxoAu/chat`

## 주의사항

- **색상 임의 변경 금지** — 버건디/골드/네이비 유지
- **기존 컴포넌트 함부로 삭제 금지** — 수정은 OK, 삭제는 확인 후
- **tailwind.config는 .js (CommonJS)** — .ts로 변환 시 jiti ESM 충돌 발생
- **shadcn v4 CLI 사용 금지** — @base-ui/react, tw-animate-css 등 Tailwind 4 전용
- Framer Motion ease 배열은 반드시 `as const` 붙일 것 (타입 에러 방지)
- `lang="ko"` on `<html>`, 한국어 UI, 영문은 섹션 라벨/메타만
- 메인 섹션 스크롤 애니메이션은 `ScrollReveal` 사용 (Framer Motion whileInView 사용 금지 — hydration 타이밍 이슈)
- `useCountUp` 훅은 네이티브 IO 사용 (Framer Motion useInView 사용 금지)

## Conventions

- `@/` import alias for all project imports
- Component naming: PascalCase, sections/ 하위에 섹션별 파일
- Data import: JSON 파일 직접 import (API route 없음, 정적 빌드)
- Animation: 메인→ScrollReveal, 서브→Framer Motion 또는 인라인
- Constants: `@/lib/constants`의 SITE_CONFIG, OFFICES, NAV_ITEMS 등
- 서브페이지: PlaceholderPage (준비중) 또는 PracticeDetailPage (실제 콘텐츠) 템플릿 사용
