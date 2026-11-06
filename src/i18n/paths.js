/**
 * 주소(URL) 도우미 — 언어를 주소 맨 앞에 둠 (/en/…, /ko/…)
 *   메뉴 데이터(src/data/menu.js)의 href는 언어 없는 주소 ('/visitor-info/group-tour')
 *   화면에 넣을 때 localizeMenu로 '/en/visitor-info/group-tour'처럼 바꿈
 */
import { LANGUAGES } from './strings';

// '/visitor-info/group-tour' + 'ko' → '/ko/visitor-info/group-tour'
export const withLang = (lang, path = '/') => (path === '/' ? `/${lang}` : `/${lang}${path}`);

// 메뉴 데이터의 모든 하위 메뉴 주소에 언어 붙이기
export const localizeMenu = (menu, lang) =>
  menu.map((item) => ({
    ...item,
    children: item.children.map((child) => ({ ...child, href: withLang(lang, child.href) })),
  }));

// 지금 주소의 언어만 바꾸기: '/en/visitor-info/group-tour' → '/ko/visitor-info/group-tour'
export function swapLanguage(pathname, lang) {
  const parts = pathname.split('/');
  if (LANGUAGES.includes(parts[1])) parts[1] = lang;
  else parts.splice(1, 0, lang);
  return parts.join('/').replace(/\/$/, '') || `/${lang}`;
}

// 주소 마지막 부분 = 하위 메뉴 id ('/en/visitor-info/group-tour' → 'group-tour')
export const currentMenuId = (pathname) => pathname.split('/').filter(Boolean)[2];
