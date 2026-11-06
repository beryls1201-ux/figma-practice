import { useState } from 'react';
import MobileMenuGroup from '../MobileMenuGroup/MobileMenuGroup';
import './MobileMainMenu.css';

/**
 * MobileMainMenu — Figma "메인메뉴(모바일)" (node 231:6244)
 *   Property 1=메인                → 모두 닫힘
 *   Property 1=메인(Visitor Info 등) → 해당 대메뉴만 펼침
 * 한 번에 하나만 펼쳐지고, 현재 페이지가 속한 대메뉴는 처음부터 펼쳐짐
 * (Drawer 틀·닫기 버튼은 별도. 이 컴포넌트는 메뉴 목록만)
 *
 * @param {object[]} items     메뉴 데이터 (src/data/menu.js의 menuEn 등)
 * @param {string} currentId   현재 페이지의 하위 메뉴 id
 * @param {string} label       화면낭독기용 메뉴 이름 (기본 "Main menu", 국문 "주메뉴")
 */
export default function MobileMainMenu({ items = [], currentId, label = 'Main menu', className = '' }) {
  const [openId, setOpenId] = useState(
    () => items.find((item) => item.children?.some((child) => child.id === currentId))?.id ?? null,
  );

  return (
    <nav className={['mobile-main-menu', className].filter(Boolean).join(' ')} aria-label={label}>
      <ul className="mobile-main-menu__list">
        {items.map((item) => (
          <MobileMenuGroup
            key={item.id}
            item={item}
            currentId={currentId}
            expanded={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </ul>
    </nav>
  );
}
