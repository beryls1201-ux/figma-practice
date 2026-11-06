import Logo from '../../icon/Logo/Logo';
import DesktopMainMenu from '../../navigation/DesktopMainMenu/DesktopMainMenu';
import './DesktopHeader.css';

/**
 * DesktopHeader — Figma "헤더-상단고정메뉴" (데크스탑-메인 node 231:1187)
 *   최상단메뉴: 왼쪽 로고(홈 링크) + 오른쪽 상단버튼모음(검색상자 · 언어선택 등)
 *   아래: 메인메뉴(데스크탑) — 대메뉴 탭 + 메가메뉴
 * 스크롤해도 화면 위에 붙어 있음 (sticky)
 *
 * @param {object[]} menuItems  메뉴 데이터 (src/data/menu.js)
 * @param {string} currentId    현재 페이지의 하위 메뉴 id
 * @param {React.ReactNode} notice  메가메뉴 아래 공지 문구
 * @param {string} menuLabel   대메뉴 영역 이름 (화면낭독기용, 기본 "Main menu")
 * @param {string} homeHref     로고를 눌렀을 때 이동할 주소
 * @param {string} homeLabel    로고 링크 이름 (기본 "Suwon Museum of Art")
 * @param {React.ReactNode} children  오른쪽 버튼들 (예: <SearchButton />, <LanguageSelect />)
 */
export default function DesktopHeader({
  menuItems = [],
  currentId,
  notice,
  menuLabel = 'Main menu',
  homeHref = '/',
  homeLabel = 'Suwon Museum of Art',
  children,
  className = '',
}) {
  return (
    <header className={['desktop-header', className].filter(Boolean).join(' ')}>
      {/* 최상단메뉴 */}
      <div className="desktop-header__top">
        <a href={homeHref} className="desktop-header__home">
          <Logo variant="desktop" alt={homeLabel} />
        </a>
        {/* 상단버튼모음 */}
        <div className="desktop-header__actions">{children}</div>
      </div>

      <DesktopMainMenu items={menuItems} currentId={currentId} notice={notice} label={menuLabel} />
    </header>
  );
}
