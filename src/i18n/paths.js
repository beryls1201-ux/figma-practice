/**
 * 주소(URL) 도우미 — 언어를 주소 맨 앞에 둠 (/en/…, /ko/…)
 *   메뉴 데이터(src/data/menu.js)의 href는 언어 없는 주소 ('/visitor-info/group-tour')
 *   화면에 넣을 때 localizeMenu로 '/en/visitor-info/group-tour'처럼 바꿈
 */
import { LANGUAGES } from './strings';

// '/visitor-info/group-tour' + 'ko' → '/ko/visitor-info/group-tour'
export const withLang = (lang, path = '/') => (path === '/' ? `/${lang}` : `/${lang}${path}`);

// 사이트가 올라간 주소 앞부분 (vite.config.js의 base, 예: '/figma-practice'). 끝의 '/'는 뗌
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

// 화면의 <a href>에 넣을 주소: 앞부분을 붙여 새 탭으로 열어도 맞는 주소가 되게 함
//   (navigate()·<Link>에는 withLang을 씀 — 라우터가 앞부분을 알아서 붙임)
export const linkWithLang = (lang, path) => `${BASE}${withLang(lang, path)}`;

// <a href>의 주소 → 라우터 주소 (앞부분 떼기): '/figma-practice/en' → '/en'
export const fromHref = (href) =>
  BASE && (href === BASE || href.startsWith(`${BASE}/`)) ? href.slice(BASE.length) || '/' : href;

// 메뉴 데이터의 모든 하위 메뉴 주소에 언어 붙이기 (<a href>용)
export const localizeMenu = (menu, lang) =>
  menu.map((item) => ({
    ...item,
    children: item.children.map((child) => ({ ...child, href: linkWithLang(lang, child.href) })),
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
