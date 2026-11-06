import './SideMenuParent.css';

/**
 * SideMenuParent — Figma "사이드메뉴_상위메뉴" (node 879:6356)
 * LNB 대메뉴 링크 (Menu/PC/Bold 16px SemiBold)
 *   Property 1=비활성화 → 평소 (회색)
 *   Property 1=활성화   → 마우스 올림·키보드 포커스·현재 메뉴 (검정)
 *
 * @param {string} href      이동할 주소
 * @param {boolean} current  지금 보고 있는 메뉴인지 (aria-current 표시)
 * @param {React.ReactNode} children  메뉴 이름 (예: "Visitor Info")
 */
export default function SideMenuParent({
  href,
  current = false,
  children,
  className = '',
  ...rest
}) {
  const classNames = [
    'side-menu-parent',
    current && 'side-menu-parent--current',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={href}
      className={classNames}
      aria-current={current ? 'true' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
