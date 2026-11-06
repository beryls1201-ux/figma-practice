import './TopMenu.css';

/**
 * TopMenu — Figma "상위메뉴" (node 879:6414)
 * 탭 모양 메뉴 링크 (Menu/PC/Bold 16px SemiBold)
 *   Property 1=논클릭 → 평소 (회색)
 *   Property 1=클릭   → 현재 메뉴 (검정 + 아래 밑줄)
 *   마우스 올림·키보드 포커스 → 검정 글자 (밑줄 없음)
 *
 * @param {string} href      이동할 주소
 * @param {boolean} current  지금 보고 있는 메뉴인지 (aria-current 표시)
 * @param {boolean} active   밑줄 모양만 표시 (메가메뉴에서 마우스가 있는 열, 화면낭독기 표시 없음)
 * @param {React.ReactNode} children  메뉴 이름 (예: "Visitor Info")
 */
export default function TopMenu({
  href,
  current = false,
  active = false,
  children,
  className = '',
  ...rest
}) {
  const classNames = ['top-menu', (current || active) && 'top-menu--current', className]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={href}
      className={classNames}
      aria-current={current ? 'page' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
