import Icon from '../../icon/Icon/Icon';
import './SideMenuChild.css';

/**
 * SideMenuChild — Figma "사이드메뉴_하위메뉴" (node 879:6340)
 * LNB 하위 메뉴 링크 (Menu/PC/Under 15px SemiBold)
 *   Property 1=비활성화 → 평소 (회색)
 *   Property 1=활성화   → 마우스 올림·키보드 포커스 (검정)
 *   Property 1=선택     → 현재 페이지 (파란 배경 + 파란 글자 + ▶)
 *
 * @param {string} href      이동할 주소
 * @param {boolean} current  지금 보고 있는 페이지인지 (aria-current="page")
 * @param {React.ReactNode} children  메뉴 이름 (예: "Programs & Workshops")
 */
export default function SideMenuChild({
  href,
  current = false,
  children,
  className = '',
  ...rest
}) {
  const classNames = [
    'side-menu-child',
    current && 'side-menu-child--current',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={href}
      className={classNames}
      aria-current={current ? 'page' : undefined}
      {...rest}
    >
      <span className="side-menu-child__text">{children}</span>
      {current && <Icon name="arrow-drop-down" className="side-menu-child__arrow" />}
    </a>
  );
}
