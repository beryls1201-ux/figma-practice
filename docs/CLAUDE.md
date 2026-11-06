# CLAUDE.md — 수원시립미술관 포털 (SUMA Portal)

이 파일은 Claude가 이 프로젝트에서 작업할 때 따르는 규칙입니다. 기획 내용은 [`docs/PRD.md`](./PRD.md)를 기준으로 합니다.
**PRD에 없거나 애매한 내용은 추측해서 구현하지 말고, 먼저 사용자에게 질문합니다.**

---

## 1. 사용자

- 이 서비스는 **코딩 초보자**가 만듭니다.
- 모든 설명과 답변은 **한국어**로, 전문 용어는 처음 쓸 때 쉬운 말로 풀어서 설명합니다.
- 한 번에 큰 변경을 하지 말고, **작은 단위로 나눠 작업**하고 단계마다 무엇을 바꿨는지 알려 줍니다.
- 코드를 바꾼 뒤에는 "어떤 파일을, 왜, 어떻게 바꿨는지"와 "확인하는 방법(`npm run dev` 후 어디를 보면 되는지)"을 함께 알려 줍니다.
- 선택지가 있으면 추천안 하나와 이유를 짧게 제시하고, 사용자가 고르게 합니다.

## 2. 기술 스택 (변경 금지)

| 구분 | 사용 기술 |
| :--- | :--- |
| UI 라이브러리 | React 19 (`react`, `react-dom`) |
| 언어 | JavaScript (`.jsx`). TypeScript 사용하지 않음 |
| 빌드 도구 | Vite (`@vitejs/plugin-react`) |
| 스타일 | 기본 CSS + CSS 변수(`src/styles/tokens.css`). CSS 프레임워크·CSS-in-JS 사용하지 않음 |
| 린트 | oxlint (`.oxlintrc.json`) |
| 폰트 | Pretendard GOV 로컬 파일 (`src/fonts`, `src/styles/fonts.css`). CDN 사용하지 않음 |
| 라우팅 | `react-router-dom` — **유일하게 추가 설치를 허용한 패키지** |

- 위 목록 외의 패키지는 **설치·추가하지 않습니다.** 필요해 보이면 이유를 설명하고 먼저 허락을 받습니다.
- 기존 패키지의 버전 업그레이드, 빌드·린트 설정 변경도 먼저 묻습니다.

**명령어**

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # oxlint 검사
```

## 3. 디자인 규칙

### 3.1 디자인 출처

- 디자인은 **Figma MCP를 통해 구현**합니다. 원본: Figma `수원시립미술관포털` → `핸드오프 문서` 페이지.
- 화면별 세부 레이아웃은 구현 단계에서 **사이즈별 Figma 링크**로 전달받습니다. 링크가 없는 화면은 임의로 디자인하지 말고 링크를 요청합니다.
- Figma 값과 PRD가 다르면 구현 전에 질문합니다.

### 3.2 토큰·스타일

- 토큰 이름은 Figma 변수 경로를 영문 kebab-case로 바꾼 것입니다 (예: `Page&Container/Text_sub` → `--color-page-container-text-sub`).
- 컴포넌트에서 색상은 **시맨틱 토큰**(`--color-page-container-*`, `--color-buttons-*`, `--color-cards-*`, `--color-gnb-lnb-*` 등)만 사용합니다. 원시 팔레트(`--neutral-*`, `--system-*`)나 색상 값(`#xxxxxx`)을 직접 쓰지 않습니다.
- 간격·모서리·그림자는 `--spacing-*`, `--radius-*`, `--shadow-image` 토큰을 사용합니다 (Figma `Spacing/*`, `Radius/*`, `Shadow/Image`).
- 폰트는 `src/fonts`의 Pretendard GOV(Regular 400 / SemiBold 600 / Bold 700)를 `fonts.css`에서 등록해 사용하고, 크기·행간은 `--text-size-*`, `--text-height-*`(rem), 굵기는 `--text-weight-*`를 사용합니다.
- 텍스트 스타일은 `typography.css`의 `.text-*` 클래스를 우선 사용합니다.
- 필요한 토큰이 없으면 직접 값을 쓰지 말고 토큰 추가 여부를 질문합니다.
- 스타일 파일 순서(`tokens → fonts → reset → base → typography → global`)는 바꾸지 않습니다.
- 컴포넌트 스타일은 `components/종류/컴포넌트명/컴포넌트명.css`에 두고 해당 컴포넌트에서 import합니다 (종류 폴더는 4.4 참고).

### 3.3 반응형 (PRD 5.6)

- **모바일 우선(Mobile First)**: 기본 스타일은 모바일, 미디어쿼리는 `min-width`로만 확장합니다.
- 브레이크포인트는 2단계만 사용합니다. 태블릿 구간은 따로 두지 않습니다.

| 구간 | 뷰포트 | 디자인 기준 너비 | 적용 방식 |
| :--- | :--- | :--- | :--- |
| 모바일 | 0~767px | 360px | 기본 스타일 |
| 데스크톱 | 768px 이상 | 1920px | `@media (min-width: 768px)` |

- 레이아웃: 데스크톱은 콘텐츠 1200px, 12-Column(Gutter 24px, Margin 24px). 서브 화면은 LNB 3칼럼 + 본문 9칼럼. 모바일은 4-Column(Gutter 16px, Margin 16px), 콘텐츠 폭은 뷰포트 − 32px.
- 폰트 크기는 `rem`으로 지정하고, 모바일·데스크톱 크기를 각각 지정합니다. 768px~1919px 구간은 화면 전체 비례 축소를 따르므로 개별 폰트 크기를 지정하지 않습니다.
- **데스크톱 비례 축소 (PRD 5.6, B-18 해소)**: 768px 이상에서 1920px 디자인을 `body`의 `zoom: var(--page-zoom)`으로 줄여 보여 줍니다(`global.css`). 비율은 `App.jsx`가 계산합니다: 화면 너비 ÷ 1920, 최소 0.7, 최대 1. 데스크톱 스타일은 **1920px 시안 값 그대로** 쓰고, 중간 크기용 값을 따로 만들지 않습니다. 최소 70%보다 좁은 화면(약 1344px 이하)은 넘치지 않게 배치(열 수 등)만 바뀌도록 합니다.
- 본문 기본 텍스트 17px 이상, 행간 150%.
- 이미지·미디어는 `max-width: 100%`.

### 3.4 접근성 (PRD 5.4, FR-11)

- 텍스트 명도 대비 **4.5:1 이상**. 메가메뉴는 반투명이 아닌 **불투명 단색 배경**.
- 메뉴의 비활성 회색 글자는 Figma 값(`#888780`, 흰 배경 대비 3.6:1) 대신 `#5f5e5a`(토큰 `--color-page-container-text-address`, 대비 6.5:1)를 사용합니다 (PRD 5.4). 적용 대상: 사이드메뉴_상위메뉴·사이드메뉴_하위메뉴 "비활성화", 상위메뉴 "논클릭". 이후 다른 컴포넌트에서 글자색으로 `#888780`(`Text_under`, `Buttons/Stroke` 등)이 나와도 같은 토큰으로 바꿔 사용합니다. 테두리·선 색으로 쓰인 `#888780`은 바꾸지 않습니다.
- 모바일 터치 영역 **최소 44px(2.75rem)**.
- viewport 설정에서 사용자 확대를 막지 않습니다 (`user-scalable=no`, `maximum-scale=1` 금지).
- 이미지에는 `alt`, 링크·버튼·입력 요소에는 이름(라벨)을 제공합니다. 아이콘만 있는 버튼은 `.sr-only` 텍스트나 `aria-label`을 붙입니다.
- 페이지마다 `<main>` 영역을 하나 둡니다.
- 마우스 호버로 열리는 것은 키보드 `Tab` 포커스로도 열리고, 같은 시각 표시를 제공합니다.
- 레이어(언어 선택, 메가메뉴 등)는 선택 후·바깥 클릭·`Esc`로 닫힙니다.
- 모바일 메뉴(Drawer)에는 상단에 닫기(X) 버튼을 둡니다.

### 3.5 표기 규칙 (PRD 5.1)

- 영문 기관명은 **`Suwon Museum of Art`** (전치사 `of` 소문자).
- 같은 메뉴는 PC·모바일·본문에서 같은 명칭을 씁니다.

## 4. 서비스 구조

### 4.1 서비스 개요

- 수원시립미술관 웹사이트의 **국문·영문 정보 격차를 없애는** 개선 프로젝트입니다.
- **국문과 영문을 모두 구현**하며, 두 언어의 대메뉴·하위 메뉴 구조와 순서는 항상 같게 유지합니다 (메뉴 동등성).
- 주 사용자: 국내 거주 외국인 방문객 (PRD 2장, Persona Emily). 목표는 원하는 정보에 2~3클릭, 15초 이내 도달.

### 4.2 메뉴 구조 (PRD 부록 A)

| 영문 대메뉴 | 영문 하위 메뉴 | 국문 대응 |
| :--- | :--- | :--- |
| Visitor Info | Hours & Admission / Group Tour Reservation / Venue Rental Info / Membership Info / Directions | **관람 안내** — 이용 안내 / 단체 관람 예약 / 대관 안내 / 멤버십 안내 / 오시는 길 |
| Exhibitions | Current Exhibitions / Upcoming Exhibitions / Past Exhibitions / Online Exhibitions | **전시** — 현재 전시 / 예정 전시 / 지난 전시 / 온라인 전시 |
| Education | Programs & Workshops / Children & Family | **교육** — 프로그램 및 워크숍 / 어린이 및 가족 |
| Cultural Programs | Events & Performances | **문화 프로그램** — 행사 및 공연 |
| Library & Collection | Art Library / Archive / Collection | **라이브러리 및 소장품** — 아트 라이브러리 / 아카이브 / 소장품 |
| News & PR | News / Press Releases / Newsletter / FAQ / Survey | **뉴스 및 홍보** — 뉴스 / 보도자료 / 뉴스레터 / 자주 묻는 질문 / 설문조사 |
| About Museum | Greetings/Introduction / Suwon Museum of Art / Suwon Manseok Gallery / Suwon Art Space Gwanggyo / Suwon Northern Gallery | **미술관 소개** — 인사말/소개 / 수원시립미술관 / 수원만석전시관 / 수원아트스페이스광교 / 수원북부전시관 |

- 메뉴 데이터는 `src/data/menu.js` 한 곳에서 관리하고(`menuEn`, `menuKo`, 같은 구조), GNB·Drawer·LNB가 같은 데이터를 사용합니다. 영문·국문 메뉴 이름은 모두 Figma 문구 변수 "Text(Language)" 기준입니다.

### 4.3 주요 화면 (PRD 4장)

| 화면 | 요구사항 | 핵심 내용 |
| :--- | :--- | :--- |
| 헤더·GNB·메가메뉴 | FR-01, FR-06 | PC: 7개 대메뉴 가로 1열 상시 노출, 불투명 메가메뉴 |
| 모바일 메뉴(Drawer) | FR-01, FR-09 | 같은 7개 대메뉴, 대메뉴별 펼침, 상단 닫기(X) |
| 언어 선택 | FR-08 | 현재 언어 표시, 선택 후·바깥 클릭·`Esc`로 닫힘 |
| 교육·문화 프로그램·도서관 목록 | FR-03 | LNB + 카드 목록(모바일 1열), 필터 탭, English Available 태그, 신청 상태 |
| 프로그램 신청 폼 | FR-04 | 항목·검증 규칙 미정 (질문 필요) |
| 단체관람 예약 폼 | FR-05 | 입력 항목, 오류 시 입력창 아래 문구 + 상단 요약, 입력값 유지 |

### 4.4 폴더 구조

```
src/
├─ assets/icons/      # SVG 아이콘
├─ assets/images/     # 배너·카드 이미지
├─ components/        # 공통 컴포넌트 (종류/컴포넌트명/컴포넌트명.jsx + .css)
│  ├─ button/         # 버튼 (Button, Button2, ButtonSmall, SearchButton)
│  ├─ card/           # 카드·배너와 그 부품 (InfoCard, MainInfoCards, MainBanner, ImageFrame, ExhibitionType)
│  ├─ form/           # 입력 폼 (FormField, TextInput, DateInput, Checkbox, NoticeList)
│  ├─ icon/           # 아이콘·로고 (Icon, IconSwap, IconSwapLarge, Logo)
│  ├─ layout/         # 화면 틀 (MobileHeader, DesktopHeader)
│  ├─ navigation/     # 메뉴·현재 위치·언어 선택
│  └─ popup/          # 팝업 (Modal, PopupSymbol, …Popup)
├─ data/              # 카드·메뉴 등 화면에 넣을 데이터 (.js)
├─ fonts/             # Pretendard GOV 폰트 파일 (.woff2)
├─ i18n/              # 언어 전환 (figma-strings.json · strings.js · LanguageProvider · useLanguage · format)
├─ pages/             # 페이지 단위 컴포넌트
├─ styles/            # tokens / fonts / reset / base / typography / global
├─ App.jsx, App.css
├─ index.css          # 스타일 진입점
└─ main.jsx
docs/                 # README.md, PRD.md, CLAUDE.md
CLAUDE.md             # 연결 파일 (@docs/CLAUDE.md 한 줄)
```

- **파일 두는 곳**
  - 사진·포스터(`.jpg`, `.png`)는 `src/assets/images/`에 둡니다. 파일 이름은 Figma 이름 기준입니다 (예: Figma `이미지-01` → `image-01.jpg`).
  - 아이콘(`.svg`)은 `src/assets/icons/`에 둡니다. 색은 SVG 파일이 아니라 CSS 토큰으로 칠합니다 (`Icon` 컴포넌트).
  - 화면에 들어가는 글자 데이터(카드 목록, 메뉴 데이터 등)는 `src/data/`에 둡니다. 이미지는 `assets`에서 가져다 씁니다.
  - 폰트는 `src/fonts/`에 둡니다.
- **화면 글자 (국문·영문)**: 화면에 보이는 글자와 화면낭독기용 이름표는 코드에 직접 쓰지 않고 `useLanguage()`의 `t('키')`로 씁니다. 키는 Figma 문구 변수 "Text(Language)" 이름입니다 (`src/i18n/figma-strings.json`, Figma에서 프로그램으로 받은 파일 — 손으로 고치지 않음). Figma에 없는 문구는 `src/i18n/strings.js`의 `CODE_STRINGS`에 영문·국문을 함께 추가하고, 새 번역은 먼저 질문합니다. 날짜 표기는 `src/i18n/format.js`를 씁니다. 컴포넌트는 글자를 props로 받고, 화면(`pages/`)에서 `t()` 결과를 넘깁니다.
- **컴포넌트 종류 폴더**: 새 컴포넌트는 위 7개 종류 중 알맞은 폴더에 만듭니다. 어디에도 맞지 않으면 새 종류 폴더를 만들기 전에 질문합니다. 다른 종류의 컴포넌트를 불러올 때는 `../../종류/컴포넌트명/컴포넌트명` 경로를 씁니다.
- **`.md` 문서는 `docs/` 폴더에만 만듭니다.** 유일한 예외는 루트 `CLAUDE.md`(이 파일을 자동으로 읽기 위한 한 줄짜리 연결 파일)입니다. 루트 `CLAUDE.md`에는 내용을 추가하지 않습니다.

- 새 폴더를 만들거나 구조를 바꿀 때는 먼저 질문합니다.
- URL 구조(예: 언어별 경로 `/ko/...`, `/en/...`)는 아직 정해지지 않았습니다. 첫 라우팅 작업 전에 질문합니다.

## 5. 안전 규칙

1. **모르면 묻기**: PRD에 "추가 확인 필요"로 표시된 항목(부록 B)이나 애매한 부분은 추측하지 말고 질문합니다.
2. **패키지 설치 금지**: `react-router-dom` 외에는 설치하지 않습니다. `npm install`로 무언가 추가하기 전에 반드시 확인합니다.
3. **삭제·덮어쓰기 전 확인**: 파일·폴더 삭제, 기존 파일 전체 교체, 대량 수정은 대상을 먼저 보여 주고 허락을 받습니다.
4. **범위 지키기**: 요청받은 작업만 합니다. 관련 없는 파일 정리·리팩터링은 제안만 하고 임의로 하지 않습니다.
5. **작업 후 검증**: 코드를 바꾼 뒤 `npm run lint`와 `npm run build`를 실행하고, 실패하면 숨기지 말고 오류 내용을 그대로 알려 줍니다.
6. **개인정보·외부 전송 금지**: 신청·예약 폼은 화면과 입력 검증만 구현합니다. 실제 서버 전송, 이메일 발송, 외부 API 연결은 하지 않으며 필요하면 먼저 질문합니다. 실제 개인정보를 예시 데이터로 쓰지 않습니다.
7. **비밀 정보 금지**: API 키, 토큰, 비밀번호를 코드나 문서에 쓰지 않습니다.
8. **Git**: 커밋·푸시는 사용자가 요청할 때만 합니다.
9. **문서 동기화**: 기획이 바뀌는 결정(브레이크포인트, 메뉴 구조 등)이 생기면 `docs/PRD.md`도 함께 고칠지 묻습니다.
