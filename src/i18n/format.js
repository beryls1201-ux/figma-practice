/**
 * 날짜·시간 표기 — Figma 문구 변수의 예시 형식을 따름
 *   locale        : 날짜 계산용 언어 코드
 *   fieldDate     : 예약 폼 날짜 칸  (input_date&time)        en "2026. Oct. 31. Sat, 02:00 PM" / ko "2026. 10. 31. 토요일, 오후 02:00"
 *   summaryDate   : 성공 팝업 일시   (Message_title1_body1-2) en "Sat, Oct 24, 2:00 PM"          / ko "10월 24일 (토) 오후 2:00"
 */
export const LOCALES = { en: 'en-US', ko: 'ko-KR' };

const part = (date, locale, options) => date.toLocaleString(locale, options);

export function formatFieldDate(date, lang) {
  const locale = LOCALES[lang];
  const time = part(date, locale, { hour: '2-digit', minute: '2-digit', hour12: true });
  if (lang === 'ko') {
    const weekday = part(date, locale, { weekday: 'long' });
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}. ${weekday}, ${time}`;
  }
  const month = part(date, locale, { month: 'short' });
  const weekday = part(date, locale, { weekday: 'short' });
  return `${date.getFullYear()}. ${month}. ${date.getDate()}. ${weekday}, ${time}`;
}

export function formatSummaryDate(date, lang) {
  const locale = LOCALES[lang];
  if (lang === 'ko') {
    const weekday = part(date, locale, { weekday: 'short' });
    const time = part(date, locale, { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${weekday}) ${time}`;
  }
  return part(date, locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
