import IconSwap from '../../icon/IconSwap/IconSwap';
import './Button2.css';

/**
 * Button2 — Figma "버튼2" (node 879:6286)
 * 아이콘 + 글자 버튼 (모바일 메뉴 열기/닫기 등)
 *   Property 1=메뉴 → 아이콘-2(menu)  + "Menu"
 *   Property 1=닫기 → 아이콘-3(close) + "Close"
 *
 * @param {'menu'|'close'} type  버튼 종류
 * @param {function} onClick  클릭 시 실행할 함수
 * @param {React.ReactNode} children  글자 (국문 화면 등에서 바꿀 때). 없으면 Figma 글자 사용
 */
const LABELS = {
  menu: 'Menu',
  close: 'Close',
};

export default function Button2({
  type = 'menu',
  onClick,
  children,
  className = '',
  ...rest
}) {
  return (
    <button
      type="button"
      className={['button2', className].filter(Boolean).join(' ')}
      onClick={onClick}
      {...rest}
    >
      <IconSwap name={type} />
      <span>{children ?? LABELS[type]}</span>
    </button>
  );
}
