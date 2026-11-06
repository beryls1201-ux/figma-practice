import SideMenuParent from '../SideMenuParent/SideMenuParent';
import SideMenuChild from '../SideMenuChild/SideMenuChild';
import './DesktopSideMenu.css';

/**
 * DesktopSideMenu — Figma "메인메뉴_사이드(데스크탑)" (node 165:6549, LNB)
 *   Property 1=기본    → 대메뉴 모두 접힘
 *   Property 1=선택N   → N번째 대메뉴 펼침, 마우스 올린 하위 메뉴는 검정
 *   Property 1=선택N-2 → 현재 페이지 하위 메뉴: 파란 배경 + ▶ (SideMenuChild "선택")
 * 현재 페이지가 속한 대메뉴만 펼치고, 다른 대메뉴는 그 대메뉴로 이동하는 링크
 *
 * @param {object[]} items    메뉴 데이터 (src/data/menu.js의 menuEn·menuKo)
 * @param {string} currentId  현재 페이지의 하위 메뉴 id
 * @param {string} label      화면낭독기용 메뉴 이름 (기본 "Section menu", 국문 "하위 메뉴")
 */
export default function DesktopSideMenu({
  items = [],
  currentId,
  label = 'Section menu',
  className = '',
}) {
  const currentSectionId = items.find((item) =>
    item.children?.some((child) => child.id === currentId),
  )?.id;

  return (
    <nav className={['desktop-side-menu', className].filter(Boolean).join(' ')} aria-label={label}>
      <ul>
        {items.map((item) => {
          const isCurrentSection = item.id === currentSectionId;
          return (
            <li key={item.id}>
              {/* 사이드메뉴_상위메뉴 */}
              <SideMenuParent
                href={item.children?.[0]?.href ?? '#'}
                current={isCurrentSection}
                className="desktop-side-menu__parent"
              >
                {item.label}
              </SideMenuParent>

              {/* 메뉴-하위메뉴 */}
              {isCurrentSection && (
                <ul className="desktop-side-menu__children">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <SideMenuChild href={child.href} current={child.id === currentId}>
                        {child.label}
                      </SideMenuChild>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
