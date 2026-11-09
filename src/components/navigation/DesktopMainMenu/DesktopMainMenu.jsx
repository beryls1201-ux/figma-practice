import { useRef, useState } from 'react';
import TopMenu from '../TopMenu/TopMenu';
import MenuNotice from '../MenuNotice/MenuNotice';
import { firstEnabledHref } from '../../../data/menu';
import './DesktopMainMenu.css';

/**
 * DesktopMainMenu — Figma "메인메뉴(데스크탑)" (node 132:2151)
 *   Property 1=접힘   → 대메뉴 7개 탭(상위메뉴)만
 *   Property 1=펼침N  → 7열 메가메뉴 전체 + 공지(메뉴-유의사항), N번째 탭에 밑줄
 * 동작 (PRD FR-06, CLAUDE.md 3.4)
 *   - 탭에 마우스를 올리거나 Tab 포커스가 오면 바로 열림 (지연 없음)
 *   - 마우스가 있는(포커스된) 열의 탭에 밑줄
 *   - 마우스가 메뉴 밖으로 나가거나, 포커스가 메뉴 밖으로 나가거나, Esc를 누르면 닫힘
 *   - 패널은 불투명 흰 배경으로 아래 내용 위에 겹쳐 표시
 *
 * @param {object[]} items    메뉴 데이터 (src/data/menu.js의 menuEn·menuKo)
 * @param {string} currentId  현재 페이지의 하위 메뉴 id
 * @param {React.ReactNode} notice  공지 문구 (없으면 공지 상자 숨김)
 * @param {string} label      화면낭독기용 메뉴 이름 (기본 "Main menu", 국문 "주메뉴")
 */
export default function DesktopMainMenu({
  items = [],
  currentId,
  notice,
  label = 'Main menu',
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const navRef = useRef(null);
  const tabRefs = useRef({});

  const currentSectionId = items.find((item) =>
    item.children?.some((child) => child.id === currentId),
  )?.id;

  const show = (id) => {
    setOpen(true);
    setActiveId(id);
  };

  const close = () => {
    setOpen(false);
    setActiveId(null);
  };

  // Esc: 닫고, 패널 안에 있던 포커스는 해당 탭으로 돌려놓기
  const handleKeyDown = (event) => {
    if (event.key !== 'Escape' || !open) return;
    const tab = tabRefs.current[activeId];
    close();
    if (tab && navRef.current?.querySelector('.desktop-main-menu__panel')?.contains(document.activeElement)) {
      tab.focus();
    }
  };

  // 포커스가 메뉴 밖으로 나가면 닫기
  const handleBlur = (event) => {
    if (!navRef.current?.contains(event.relatedTarget)) close();
  };

  return (
    <nav
      ref={navRef}
      className={['desktop-main-menu', open && 'desktop-main-menu--open', className]
        .filter(Boolean)
        .join(' ')}
      aria-label={label}
      onMouseLeave={close}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      {/* 헤더-상단메뉴-접힘: 대메뉴 탭 */}
      <ul className="desktop-main-menu__tabs">
        {items.map((item) => {
          const isCurrentSection = item.id === currentSectionId;
          const href = firstEnabledHref(item);
          return (
            <li key={item.id} className="desktop-main-menu__tab">
              <TopMenu
                ref={(node) => {
                  tabRefs.current[item.id] = node;
                }}
                // 이동할 수 있는 하위 메뉴가 없으면 눌러도 이동하지 않음 (메가메뉴 열기만)
                href={href ?? '#'}
                onClick={href ? undefined : (event) => event.preventDefault()}
                active={(open && activeId === item.id) || isCurrentSection}
                aria-current={isCurrentSection ? 'true' : undefined}
                onMouseEnter={() => show(item.id)}
                onFocus={() => show(item.id)}
              >
                {item.label}
              </TopMenu>
            </li>
          );
        })}
      </ul>

      {/* 헤더-상단메뉴-펼침: 7열 하위 메뉴 + 공지 */}
      <div className="desktop-main-menu__panel" hidden={!open}>
        <div className="desktop-main-menu__columns">
          {items.map((item) => (
            <ul
              key={item.id}
              className="desktop-main-menu__column"
              aria-label={item.label}
              onMouseEnter={() => setActiveId(item.id)}
            >
              {item.children?.map((child) => {
                const isCurrent = child.id === currentId;
                return (
                  <li key={child.id}>
                    {/* 비활성 메뉴: href가 없어 눌러도 이동하지 않음 */}
                    <a
                      href={child.disabled ? undefined : child.href}
                      role={child.disabled ? 'link' : undefined}
                      aria-disabled={child.disabled ? 'true' : undefined}
                      className={[
                        'desktop-main-menu__link',
                        isCurrent && 'desktop-main-menu__link--current',
                        child.disabled && 'desktop-main-menu__link--disabled',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-current={isCurrent ? 'page' : undefined}
                      onFocus={() => setActiveId(item.id)}
                    >
                      {child.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>

        {notice && <MenuNotice>{notice}</MenuNotice>}
      </div>
    </nav>
  );
}
