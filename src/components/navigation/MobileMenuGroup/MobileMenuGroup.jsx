import { useId } from 'react';
import IconSwap from '../../icon/IconSwap/IconSwap';
import './MobileMenuGroup.css';

/**
 * MobileMenuGroup — Figma "메뉴-상위메뉴" + "메뉴-하위메뉴" (메인메뉴(모바일) 안의 한 묶음)
 *   상위메뉴: 누르면 하위 메뉴가 펼쳐짐 (닫힘: 회색 + ▼ / 펼침: 검정 + ▲)
 *   하위메뉴: 베이지 배경의 링크 목록. 현재 페이지만 검정
 *
 * @param {{id, label, children: {id, label, href}[]}} item  대메뉴 하나 (src/data/menu.js 형식)
 * @param {boolean} expanded   펼침 여부
 * @param {function} onToggle  상위메뉴를 눌렀을 때
 * @param {string} currentId   현재 페이지의 하위 메뉴 id (aria-current="page")
 */
export default function MobileMenuGroup({ item, expanded = false, onToggle, currentId, className = '' }) {
  const panelId = useId();

  return (
    <li
      className={['mobile-menu-group', expanded && 'mobile-menu-group--expanded', className]
        .filter(Boolean)
        .join(' ')}
    >
      {/* 메뉴-상위메뉴 */}
      <button
        type="button"
        className="mobile-menu-group__parent"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{item.label}</span>
        <IconSwap name="arrow-down" className="mobile-menu-group__arrow" />
      </button>

      {/* 메뉴-하위메뉴 */}
      <ul id={panelId} className="mobile-menu-group__panel" hidden={!expanded}>
        {item.children?.map((child) => {
          const isCurrent = child.id === currentId;
          return (
            <li key={child.id}>
              <a
                href={child.href}
                className={[
                  'mobile-menu-group__link',
                  isCurrent && 'mobile-menu-group__link--current',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {child.label}
              </a>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
