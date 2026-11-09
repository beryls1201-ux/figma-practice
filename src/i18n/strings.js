/**
 * 화면 문구 (영어 · 한국어)
 *
 * 1) figma-strings.json — Figma 문구 변수 "Text(Language)" 135개를 그대로 옮긴 파일
 *    (영어 모드 → en, 한국어 모드 → ko). 키 이름은 Figma 변수 이름 그대로
 *    Figma 문구가 바뀌면 이 파일을 다시 받아서 교체하세요. 손으로 고치지 않습니다.
 * 2) FIGMA_FIXES — Figma 국문 값 중 고쳐서 쓰는 것 (디자이너 확인 전 임시 결정)
 * 3) CODE_STRINGS — Figma에 없는 화면낭독기용 이름표·안내 문구 (번역안 승인 2026-11-06)
 *
 * 사용: t('Main_menu1') → 현재 언어 문구, t('visitorsCount', { n: 25 }) → "{n}" 자리 채움
 */
import figmaStrings from './figma-strings.json';

export const LANGUAGES = ['en', 'ko'];
export const DEFAULT_LANGUAGE = 'en';

// Figma 값을 고쳐서 쓰는 것 — TODO: 디자이너 확인 후 Figma도 같이 수정
const FIGMA_FIXES = {
  // 에러 팝업 제목인데 Figma 국문이 성공 문구("예약 확인 안내 메일이 … 전송되었습니다.")로 되어 있음
  Message_title2: { ko: '예약 내용을 확인해 주세요' },
  // Figma 국문 오타: "학인증" → "확인증"
  Subtitle4_body2: { ko: '예약 확인증 수신용 이메일 입력' },
  // 한국어 화면의 현재 언어가 "영어"로 되어 있음 → "국어" (button2-2 국문 값과 같게)
  // (LanguageSelect는 목록 값 button2-1·button2-2를 쓰므로 지금은 참고용)
  Current_Lang: { ko: '국어' },
};

// Figma 변수에 없는 문구 (화면낭독기용 이름표 등)
const CODE_STRINGS = {
  siteName: { en: 'Suwon Museum of Art', ko: '수원시립미술관' },
  mainMenuLabel: { en: 'Main menu', ko: '주메뉴' },
  sectionMenuLabel: { en: 'Section menu', ko: '하위 메뉴' },
  filterLabel: { en: 'Filter by audience', ko: '대상별 보기' },
  breadcrumbLabel: { en: 'Breadcrumb', ko: '현재 위치' },
  languageLabel: { en: 'Language', ko: '언어 선택' },
  // 언어선택 목록의 화면낭독기용 이름 (현재 화면 언어로)
  langEnglish: { en: 'English', ko: '영어' },
  langKorean: { en: 'Korean', ko: '한국어' },
  prevMonth: { en: 'Previous month', ko: '이전 달' },
  nextMonth: { en: 'Next month', ko: '다음 달' },
  required: { en: 'required', ko: '필수' },
  noPrograms: { en: 'No programs available.', ko: '해당하는 프로그램이 없습니다.' },
  noDate: { en: 'Select a date', ko: '날짜를 선택해 주세요' },
  // 아직 화면(디자인)이 없는 메뉴를 열었을 때 (ComingSoonPage)
  comingSoonTitle: { en: 'Coming soon', ko: '준비 중입니다' },
  comingSoonBody: { en: 'This page is being prepared.', ko: '이 페이지는 준비 중입니다.' },
  // Figma 예시 "25 visitors" / "방문객 25명"과 같은 형식
  visitorsCount: { en: '{n} visitors', ko: '방문객 {n}명' },
  // 푸터 (실제 사이트 하단 기준, 영문 번역안 승인 2026-11-09)
  footerPolicyLabel: { en: 'Site policies', ko: '이용 정책' },
  footerPrivacy: { en: 'Privacy Policy', ko: '개인정보처리방침' },
  footerTerms: { en: 'Terms of Use', ko: '이용약관' },
  footerEmailRefusal: { en: 'Refusal of Unauthorized Email Collection', ko: '이메일무단수집거부' },
  footerSnsLabel: { en: 'Social media', ko: '소셜 미디어' },
  snsInstagram: { en: 'Instagram', ko: '인스타그램' },
  snsFacebook: { en: 'Facebook', ko: '페이스북' },
  snsYoutube: { en: 'YouTube', ko: '유튜브' },
  snsBlog: { en: 'Naver Blog', ko: '네이버 블로그' },
  snsKakao: { en: 'KakaoTalk Channel', ko: '카카오톡 채널' },
  newWindow: { en: '(opens in a new window)', ko: '(새 창)' },
  footerAddress: {
    en: '833 Jeongjo-ro, Paldal-gu, Suwon-si, Gyeonggi-do (16252)',
    ko: '(우 16252) 경기도 수원시 팔달구 정조로 833 (신풍동)',
  },
  footerTel: { en: 'TEL. 031-5191-3800', ko: 'TEL. 031-5191-3800' },
  footerNotice: {
    en: 'No content on this website may be reproduced without permission.',
    ko: '홈페이지의 모든 내용들은 무단 복제가 불가합니다.',
  },
  footerCopyright: {
    en: 'Copyright © 2019 Suwon Museum of Art. All rights reserved.',
    ko: 'Copyright © 2019 Suwon Museum of Art. All rights reserved.',
  },
};

export const STRINGS = { ...figmaStrings, ...CODE_STRINGS };
for (const [key, fix] of Object.entries(FIGMA_FIXES)) {
  STRINGS[key] = { ...STRINGS[key], ...fix };
}

/**
 * 문구 꺼내기
 * @param {'en'|'ko'} lang  언어
 * @param {string} key      문구 키 (Figma 변수 이름 또는 CODE_STRINGS 키)
 * @param {object} vars     "{이름}" 자리에 넣을 값 (예: { email: 'a@b.com' })
 */
export function translate(lang, key, vars) {
  const entry = STRINGS[key];
  if (!entry) {
    if (import.meta.env.DEV) console.warn(`[i18n] 없는 문구 키: ${key}`);
    return key;
  }
  let text = entry[lang] ?? entry[DEFAULT_LANGUAGE];
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}
