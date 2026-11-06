import IconSwap from '../../icon/IconSwap/IconSwap';
import './Checkbox.css';

/**
 * Checkbox — Figma "체크박스" (node 879:6332)
 *   Property 1=논클릭 → 아이콘-8(radio, 빈 동그라미)
 *   Property 1=클릭   → 아이콘-7(radio-checked, 채운 동그라미)
 * 실제 동작은 체크박스(<input type="checkbox">)이고, 겉모양만 Figma 동그라미로 표시
 * 둘 중 하나만 고르는 항목(예: 도슨트 요청)은 type="radio" + 같은 name으로 사용
 *
 * @param {'checkbox'|'radio'} type  동작 방식 (기본 checkbox)
 * @param {boolean} checked   선택 상태
 * @param {function} onChange 선택이 바뀔 때 실행할 함수 (event를 받음)
 * @param {React.ReactNode} children  글자 (예: "English Docent Request")
 */
export default function Checkbox({
  type = 'checkbox',
  checked = false,
  onChange,
  children,
  className = '',
  ...rest
}) {
  return (
    <label className={['checkbox', className].filter(Boolean).join(' ')}>
      <input
        type={type}
        className="checkbox__input sr-only"
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <IconSwap
        name={checked ? 'radio-checked' : 'radio'}
        size={20}
        className="checkbox__mark"
      />
      <span className="checkbox__text">{children}</span>
    </label>
  );
}
