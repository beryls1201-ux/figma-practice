import './ButtonSmall.css';

/**
 * ButtonSmall — Figma "Button - Small" (node 25:1430)
 * 팝업 안에서 쓰는 작은 사각 버튼 (Button/Medium 15px Bold, 최소 너비 64px)
 *   variant="filled"   : 검은 배경 + 흰 글자 (OK, Go to Main Page)
 *   variant="outlined" : 흰 배경 + 테두리 2px (View Reservation Details)
 *   variant="text"     : 글자만 (Cancel)
 *
 * @param {'filled'|'outlined'|'text'} variant  버튼 종류
 * @param {boolean} block     가로 꽉 채우기
 * @param {function} onClick  클릭 시 실행할 함수
 * @param {React.ReactNode} children  버튼 글자
 */
export default function ButtonSmall({
  variant = 'filled',
  block = false,
  type = 'button',
  onClick,
  children,
  className = '',
  ...rest
}) {
  const classNames = [
    'button-small',
    `button-small--${variant}`,
    block && 'button-small--block',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classNames} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
