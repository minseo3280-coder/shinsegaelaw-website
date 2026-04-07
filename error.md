# ERROR LOG

## 1. Cannot find module './XXX.js' (Webpack Runtime Error)

**날짜:** 2026-03-18

**에러 메시지:**
```
Server Error
Error: Cannot find module './948.js'
Require stack:
- .next/server/webpack-runtime.js
- .next/server/pages/_document.js
...
```

**원인:**
- `npm run build` 실행 후 `.next/` 폴더에 production 빌드 캐시가 생성됨
- 이 상태에서 `npm run dev`를 실행하면 dev 서버가 production 빌드의 캐시된 chunk 파일(948.js 등)을 참조하려다 충돌
- **build와 dev의 webpack chunk ID가 다르기 때문에 발생**
- 코드 변경 후 build → dev 전환 시 거의 100% 재현됨

**해결:**
```bash
rm -rf .next
npm run dev
```

**예방:**
- `npm run build`로 빌드 확인 후 dev 서버 재시작 시 **반드시 `.next` 폴더 삭제**
- 또는 dev 서버 켜둔 채로 코드 수정하면 HMR이 알아서 처리하므로 build 불필요
- dev 확인 중에는 `npm run build` 실행하지 말 것 — 캐시 충돌 원인

**통합 해결 명령어 (포트 + 캐시 한번에):**
```bash
npx kill-port 3000 3001 3002 3003; sleep 1 && rm -rf .next && npm run dev
```
> 이 프로젝트에서 흰 화면/모듈 에러 발생 시 위 명령어 하나로 해결됨 (Day 1~2 합계 14회+ 발생)
> **Claude Code 규칙**: npm run build 후 dev 서버 시작 시 반드시 이 명령어를 먼저 실행할 것
> **근본 원인**: build가 .next/ 폴더에 production chunk를 생성 → dev가 다른 chunk ID로 참조 → 충돌

**package.json dev 스크립트 자동 캐시 삭제:**
```json
"dev": "npx rimraf .next && next dev"
```
> `rimraf`는 devDependencies에 설치되어 있지만 글로벌 설치가 아니므로 bash에서 직접 `rimraf` 명령 불가
> 반드시 `npx rimraf`로 실행해야 함 (2026-03-19 수정)

---

## 2. F5 시 TrustIndicators 0으로 표시 + 변호사 사진 미로드

**날짜:** 2026-03-18

**증상:** 새로고침 시 52년/23인/7개/94% 대신 0년/0인/0개/0% 표시. 변호사 사진도 안 뜸. 두 번째 F5에야 정상.

**원인:**
- `useCountUp` 훅의 `useInView` (framer-motion)가 첫 로드 시 뷰포트 감지 실패 — `amount` 기본값(`"some"`)이 요소가 일부 보일 때만 트리거하므로 타이밍에 따라 놓침
- Image 컴포넌트에 `sizes` 미지정으로 Next.js lazy loading 최적화가 제대로 동작하지 않음

**해결:**
- `src/lib/hooks.ts`: `useInView`에 `amount: 0` 추가 + `hasStarted` ref로 중복 실행 방지
- `src/components/sections/Lawyers.tsx`: 대표변호사/캐러셀 Image에 `sizes` 속성 추가

---

## 3. F5 새로고침 시 글씨/이벤트 안 뜨는 현상 (FOIC)

**날짜:** 2026-03-18

**증상:** F5 또는 Ctrl+Shift+R 시 페이지가 로드되지만 텍스트와 애니메이션이 안 보임. 한번 더 새로고침하면 정상.

**원인:**
- Framer Motion의 `initial={{ opacity: 0 }}` 때문
- SSR/SSG로 HTML이 먼저 렌더링될 때 Framer Motion이 `style="opacity: 0"` 인라인 스타일을 넣음
- JS 번들이 로드되어 hydration이 완료될 때까지 모든 `motion.div` 콘텐츠가 투명
- 느린 네트워크/첫 방문 시 1~3초간 빈 화면으로 보임

**해결:**
1. `globals.css`에 CSS 오버라이드 추가:
```css
body:not(.hydrated) [style] {
  opacity: 1 !important;
  transform: none !important;
}
```
2. `HydrationReady.tsx` 컴포넌트 생성 — JS 로드 후 `body.classList.add("hydrated")`
3. Hydration 전: CSS가 `opacity: 1 !important`로 콘텐츠 보이게 강제
4. Hydration 후: `.hydrated` 클래스 추가되면 CSS 규칙 비활성화 → Framer Motion이 정상 제어

**예방:**
- Hero 같은 Above-the-fold 섹션은 Framer Motion `initial/animate` 대신 CSS @keyframes 사용
- `tailwind.config.js`에 `hero-1` ~ `hero-scroll` 애니메이션 등록됨
- 스크롤로 보이는 섹션은 `whileInView`를 쓰되, FOIC 방지 CSS가 보호

---

## 4. Port already in use

**에러:** `Port 3000 is in use, trying 3001 instead.`

**원인:** 이전 dev 서버 프로세스가 종료되지 않고 포트를 점유

**해결:**
```bash
# Windows
taskkill /f /im node.exe
# 또는 특정 포트 해제
npx kill-port 3000
```

---

## 5. build 후 dev 서버 충돌 (2026-03-19 재발)

**증상:** `npm run build` 실행 후 dev 서버가 안 뜨거나 흰 화면

**원인:** build가 `.next/`에 production chunk 생성 → dev가 다른 chunk ID로 참조 → 충돌 (에러 #1과 동일 원인)

**해결:** error.md #1의 통합 명령어로 해결
```bash
npx kill-port 3000 3001 3002 3003; rm -rf .next && npm run dev
```

**재발 방지:**
- dev 확인 중에 `npm run build` 실행하지 말 것
- build 확인이 필요하면 build 후 반드시 `.next` 삭제 후 dev 재시작
- `package.json`의 dev 스크립트에 `npx rimraf .next &&` 자동 삭제 포함되어 있으나, bash 환경에서 직접 실행 시에는 수동 삭제 필요

> **Claude Code 규칙 (2026-03-19 추가):**
> `npm run build` 실행 후에는 **무조건** 아래 명령어로 dev 서버를 시작할 것:
> ```bash
> npx kill-port 3000 3001 3002 3003 2>/dev/null; rm -rf .next && npm run dev
> ```
> build 체크 빈도를 최소화하고, 가능하면 dev 서버 상태에서 HMR로 확인할 것

---

## 6. "missing required error components, refreshing..." 무한 루프

**날짜:** 2026-03-25

**증상:** 브라우저에 "missing required error components, refreshing..." 메시지가 뜨며 페이지가 무한 새로고침되거나 로드되지 않음

**원인:**
- `npm run build` 후 `.next/` 폴더에 production 빌드 캐시가 남아있는 상태에서 `npm run dev` 실행
- production 빌드의 error boundary 컴포넌트와 dev 서버의 error boundary가 충돌
- Next.js 내부적으로 `_error.js`, `error.js` 등 에러 컴포넌트의 chunk ID 불일치로 발생
- **에러 #1, #5와 동일한 근본 원인** (build/dev 캐시 충돌)

**해결:**
```bash
# 1. 기존 프로세스 모두 종료
taskkill /F /IM node.exe
# 2. .next 캐시 완전 삭제 후 dev 서버 재시작
rm -rf .next && npm run dev
```

**또는 통합 명령어:**
```bash
npx kill-port 3000 3001 3002 3003 2>/dev/null; rm -rf .next && npm run dev
```

**예방 (Claude Code 필수 규칙):**
- `npm run build`로 빌드 확인 후 dev 서버 시작 시 **반드시** `.next` 폴더 삭제 + 기존 node 프로세스 종료
- build와 dev를 번갈아 실행하지 말 것 — build 확인이 끝나면 무조건 캐시 삭제
- **build 성공 확인 후 사용자에게 "dev 서버 재시작 시 캐시 삭제 필요" 안내할 것**
