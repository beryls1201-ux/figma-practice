import './Button.css';

/**
 * Button — 알약 모양 버튼
 * Figma: 수원시립미술관포털
 *   size="medium" (기본) : 필터 탭 버튼 (node 159:3803)
 *   size="large"         : "버튼" Apply 버튼 (node 879:6279, 비활성화/활성화)
 *
 * @param {'medium'|'large'} size  버튼 크기
 * @param {boolean} selected  선택(활성화) 상태 (검은 배경 + 흰 글자)
 * @param {boolean} wide      좌우 여백 23px ("All"처럼 짧은 글자용). 기본은 16px
 * @param {function} onClick  클릭 시 실행할 함수
 * @param {React.ReactNode} children  버튼 글자
 */
export default function Button({
  size = 'medium',
  selected = false,
  wide = false,
  onClick,
  children,
  className = '',
  ...rest
}) {
  const classNames = [
    'button',
    size === 'large' && 'button--large',
    selected && 'button--selected',
    wide && 'button--wide',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classNames}
      aria-pressed={selected}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
