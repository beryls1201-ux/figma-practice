# 수원시립미술관 영문 포털 (SUMA Portal)

React + Vite + JavaScript + 기본 CSS(CSS 변수) 구조

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # oxlint
```

## 폴더 구조

```
src/
├─ assets/
│  ├─ icons/          # SVG 아이콘
│  └─ images/         # 배너·카드 이미지
├─ components/        # 공통 컴포넌트 (종류/컴포넌트명/컴포넌트명.jsx + .css)
│  ├─ button/         # 버튼
│  ├─ card/           # 카드·배너
│  ├─ form/           # 입력 폼
│  ├─ icon/           # 아이콘·로고
│  ├─ layout/         # 화면 틀 (헤더)
│  ├─ navigation/     # 메뉴·현재 위치·언어 선택
│  └─ popup/          # 팝업
├─ data/              # 카드·메뉴 등 화면에 넣을 데이터 (.js)
├─ fonts/             # Pretendard GOV 폰트 파일 (.woff2)
├─ i18n/              # 언어 전환 (Figma 문구 변수 영문·국문, t() 번역 함수)
├─ pages/             # 페이지 단위 컴포넌트
├─ styles/
│  ├─ fonts.css       # @font-face 폰트 등록
│  ├─ reset.css       # 브라우저 기본 스타일 초기화
│  ├─ base.css        # HTML 요소 기본 스타일 (body·제목·링크)
│  ├─ tokens.css      # 디자인 토큰 (컬러·타이포·간격·radius)
│  ├─ typography.css  # 텍스트 스타일 클래스 (.text-*)
│  └─ global.css      # 전역 유틸리티
├─ App.jsx / App.css
├─ index.css          # 스타일 진입점 (tokens → fonts → reset → base → typography → global)
└─ main.jsx
docs/                 # 모든 .md 문서는 여기에만 둠
├─ README.md          # 프로젝트 소개·실행 방법 (이 파일)
├─ PRD.md             # 기획 문서
└─ CLAUDE.md          # Claude 작업 규칙
CLAUDE.md             # 연결 파일 (@docs/CLAUDE.md 한 줄, 예외로 루트 유지)
```

## 디자인 기준

- Figma: 수원시립미술관포털 → `핸드오프 문서` 페이지
- 폰트: Pretendard GOV 로컬 파일 (`src/fonts`, `src/styles/fonts.css`)
- 컴포넌트에서는 `tokens.css`의 **시맨틱 토큰**(`--color-*`)만 사용
- 상세 규칙은 [CLAUDE.md](./CLAUDE.md), 기획은 [PRD.md](./PRD.md) 참고
